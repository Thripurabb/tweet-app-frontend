import React, { Component } from 'react';
import Navbar from './NavBar';
import LoginNavBar from './LoginNavBar';
import '../styles/home.css';
import userAvatar from '../images/user-avatar.jpg';
import axios from 'axios';
import { Link } from "react-router-dom";

class Home extends Component {
    constructor(props) {
        super(props);
        var currentDate = new Date();
        this.state = {
            authorized: (sessionStorage.getItem("tokenSuccess") === 'true'),
            loginId: sessionStorage.getItem("id"), tweetList: [], session: [],
            // date: (currentDate.getDate()+"/"+currentDate.getMonth()+"/"+currentDate.getFullYear()+"  "+currentDate.getHours()+":"+currentDate.getSeconds())
            date: currentDate.toLocaleString(), tweetDescription: "", likesCount: 0, errorMsg: "", isError: false
        };

    }
    componentDidMount = () => {
        const headers = {
            'Authorization': sessionStorage.getItem("token")
        };
        axios.get("http://localhost:8082/api/v1.0/tweets/all", { headers })
            .then(response => {
                this.setState({ tweetList: response.data });
            })
            .catch(error => {
                console.log(error.response.data.message);
                //if(error.response.data.message === "Session Expired")
                this.setState({ authorized: false })
                sessionStorage.setItem("tokenSuccess", false);
                sessionStorage.setItem("token", this.state.session.token);
                sessionStorage.setItem("id", this.state.session.id);
            });
    }
    setValues = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });

    }
    submitHandler = (event) => {
        event.preventDefault();
        console.log(this.state.tweetDescription.length)

        const tweet = {
            tweetDescription: this.state.tweetDescription,
            likesCount: this.state.likesCount,
            userId: this.state.loginId,
            timeStamp: this.state.date
        };
        const headers = {
            'Authorization': sessionStorage.getItem("token")
        };
        if (this.state.tweetDescription.length > 144) {
            this.setState({ isError: true, errorMsg: "Tweet should not go beyond 144 characters." });
        }
        else {
            axios.post("http://localhost:8082/api/v1.0/tweets/" + this.state.loginId + "/add/", tweet, { headers })
                .then(response => {
                    console.log(response.data);
                    this.setState({ isError: false })
                })
                .catch(error => {
                    console.log(error.response.data.message);
                    this.setState({ authorized: false })
                    sessionStorage.setItem("tokenSuccess", false);
                    sessionStorage.setItem("token", this.state.session.token);
                    sessionStorage.setItem("id", this.state.session.id);
                });
        }
    }
    render() {
        return (
            <div>
                {!(this.state.authorized) && <div className="fontStyle" >
                    <LoginNavBar />
                    <div className="sessionExpiredMsg">
                        <h3>Please login to continue...</h3>
                    </div>
                </div>}
                {this.state.authorized && <div className="fontStyle" >
                    <Navbar />
                    <div className="homeDiv">
                        <div className="avatar">
                            <img src={userAvatar} alt="userAvatar" height="100px" width="100px" />
                        </div>
                        <div className="tweetDiv">
                            <div className="userTweetDiv">
                                <div className="avatarIcon">
                                    <img src={userAvatar} alt="userAvatar" height="40px" width="40px" />
                                </div>
                                <div className="infoDiv">
                                    <p><b>{"@" + this.state.loginId}</b>
                                        <b style={{ float: 'right', fontWeight: '100' }}>{this.state.date}</b>
                                    </p>
                                    <form className="postTweetForm" name="postTweet" onSubmit={this.submitHandler}>
                                        <div className="form-group">
                                            <textarea className="tweetDesText" name="tweetDescription" rows="4" cols="40" placeholder="Post a tweet..." required onChange={this.setValues}></textarea>
                                        </div>
                                        {this.state.isError && <div className="error-div" style={{ padding: '5px', margin: '0px', width: '94%' }}>
                                            <p style={{ margin: '0px', fontWeight: '600' }}>{this.state.errorMsg}</p>
                                        </div>}
                                        <div className="postBtn">
                                            <button type="submit" className="btn btn-primary btn-block" id="button" >Post</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="tweetListDiv">
                                {this.state.tweetList == null ?
                                    <p>No tweets available..</p> :
                                    this.state.tweetList.map((tweetObj) => (
                                        <Link to={"/tweet/" + tweetObj.tweetId} className="tweetLinkDiv">
                                            <div className="userAllTweetDiv" style={{ width: '' }}>
                                                <div className="avatarIcon">
                                                    <img src={userAvatar} alt="userAvatar" height="20px" width="20px" style={{ paddingTop: '10px' }} />
                                                </div>
                                                <div className="infoDiv">
                                                    <p><b>{"@" + tweetObj.userId}</b>
                                                        <b style={{ float: 'right', fontWeight: '100' }}>{tweetObj.timeStamp}</b>
                                                    </p>
                                                    <div className="allTweetDes">
                                                        {tweetObj.tweetDescription}
                                                        <p style={{margin:'0px',float:'right'}}><i className="far fa-heart" style={{color:"red"}}></i>&nbsp;&nbsp;{tweetObj.likesCount}</p>
                                                        <br />
                                                        {tweetObj.commentsList != null ?
                                                            tweetObj.commentsList.map((commentObj) => (
                                                                <div className="userAllCommentDiv" >
                                                                    <div className="avatarIcon">
                                                                        <img style={{ paddingTop: '10px' }} src={userAvatar} alt="userAvatar" height="20px" width="20px" />
                                                                    </div>
                                                                    <div className="infoDiv">
                                                                        <p><b>{"@" + commentObj.userId}</b>
                                                                            <b style={{ float: 'right', fontWeight: '100' }}>{commentObj.timeStamp}</b>
                                                                        </p>
                                                                        <div className="allTweetDes">
                                                                            {commentObj.commentDescription}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )) : {}

                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        );
    }

}
export default Home;