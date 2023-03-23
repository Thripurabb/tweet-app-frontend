import React, { Component } from 'react';
import Navbar from './NavBar';
import LoginNavBar from './LoginNavBar';
import '../styles/home.css';
import userAvatar from '../images/user-avatar.jpg';
import axios from 'axios';

class ViewAndReplyTweet extends Component {
    constructor(props) {
        super(props);
        var currentDate = new Date();
        this.state = {
            authorized: (sessionStorage.getItem("tokenSuccess") === 'true'),
            loginId: sessionStorage.getItem("id"), tweetInfo: [], session: [],
            date: currentDate.toLocaleString(), tweetDescription: "", likesCount: 0, commentDescription: "",
            errorMsg: "", isError: false
        };
        this.likeTweet = this.likeTweet.bind(this);
    }
    componentDidMount = () => {
        const headers = {
            'Authorization': sessionStorage.getItem("token")
        };
        var tweetId = parseInt(window.location.pathname.split("/")[2]);
        if (tweetId) {
            axios.get("http://localhost:8082/api/v1.0/tweets/" + sessionStorage.getItem("id") + "/" + tweetId, { headers })
                .then(response => {
                    this.setState({ tweetInfo: response.data });
                    // console.log(this.state.tweetInfo.commentsList);
                })
                .catch(error => {
                    console.log(error.response.data.message);
                    if (error.response.data.message === "User Not Found") {
                        this.setState({ authorized: false, errorMsg: "User Not Found" })
                    }
                    else if (error.response.data.message === "Tweet Not Found") {
                        this.setState({ authorized: false, errorMsg: "Tweet Not Found" })
                    }
                    else if (error.response.data.message === "Service down.Please,try again later...") {
                        this.setState({ authorized: false, errorMsg: "Service down. Please, try again later..." })
                    }
                    else if (error.response.data.message === "Session Expired") {
                        this.setState({ authorized: false, errorMsg: "Please login to continue..." })
                        sessionStorage.setItem("tokenSuccess", false);
                        sessionStorage.setItem("token", this.state.session.token);
                        sessionStorage.setItem("id", this.state.session.id);
                    }
                    else {
                        this.setState({ authorized: false, errorMsg: "Please login to continue..." })
                        sessionStorage.setItem("tokenSuccess", false);
                        sessionStorage.setItem("token", this.state.session.token);
                        sessionStorage.setItem("id", this.state.session.id);
                    }

                });
        }
    }
    setValues = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });

    }
    submitHandler = (event) => {
        event.preventDefault();
        var tweetId = parseInt(window.location.pathname.split("/")[2]);
        const comment = {
            userId: this.state.loginId,
            commentDescription: this.state.commentDescription,
            timeStamp: this.state.date
        };
        const headers = {
            'Authorization': sessionStorage.getItem("token")
        };
        if (this.state.commentDescription.length > 144) {
            this.setState({ isError: true, errorMsg: "Comment should not go beyond 144 characters." });
        }
        else {
            axios.post("http://localhost:8082/api/v1.0/tweets/" + this.state.loginId + "/reply/" + tweetId + "/", comment, { headers })
                .then(response => {
                    console.log(response.data);
                    this.setState({ isError: false })
                })
                .catch(error => {
                    console.log(error.response.data.message);
                    if (error.response.data.message === "User Not Found") {
                        this.setState({ authorized: false, errorMsg: "User Not Found" })
                    }
                    else if (error.response.data.message === "Tweet Not Found") {
                        this.setState({ authorized: false, errorMsg: "Tweet Not Found" })
                    }
                    else if (error.response.data.message === "Service down.Please,try again later...") {
                        this.setState({ authorized: false, errorMsg: "Service down. Please, try again later..." })
                    }
                    else if (error.response.data.message === "Session Expired") {
                        this.setState({ authorized: false, errorMsg: "Please login to continue..." })
                        sessionStorage.setItem("tokenSuccess", false);
                        sessionStorage.setItem("token", this.state.session.token);
                        sessionStorage.setItem("id", this.state.session.id);
                    }
                    else {
                        this.setState({ authorized: false, errorMsg: "Please login to continue..." })
                        sessionStorage.setItem("tokenSuccess", false);
                        sessionStorage.setItem("token", this.state.session.token);
                        sessionStorage.setItem("id", this.state.session.id);
                    }
                });
        }
    }
    likeTweet = (count) => {
        const headers = {
            'Authorization': sessionStorage.getItem("token")
        };
        const tweet = {
            tweetDescription: this.state.tweetInfo.tweetDescription,
            likesCount: count,
            userId: this.state.tweetInfo.loginId,
            timeStamp: this.state.tweetInfo.timeStamp
        };
        var tweetId = parseInt(window.location.pathname.split("/")[2]);
        axios.put("http://localhost:8082/api/v1.0/tweets/"+sessionStorage.getItem("id")+"/like/"+tweetId,tweet, {headers})
        .then(response => {
            console.log("Likes count updated!");
        })
        .catch(error => {
            console.log(error.response.data.message);
            if (error.response.data.message === "User Not Found") {
                this.setState({ authorized: false, errorMsg: "User Not Found" })
            }
            else if (error.response.data.message === "Tweet Not Found") {
                this.setState({ authorized: false, errorMsg: "Tweet Not Found" })
            }
            else if (error.response.data.message === "Service down.Please,try again later...") {
                this.setState({ authorized: false, errorMsg: "Service down. Please, try again later..." })
            }
            else if (error.response.data.message === "Session Expired") {
                this.setState({ authorized: false, errorMsg: "Please login to continue..." })
                sessionStorage.setItem("tokenSuccess", false);
                sessionStorage.setItem("token", this.state.session.token);
                sessionStorage.setItem("id", this.state.session.id);
            }
            else {
                this.setState({ authorized: false, errorMsg: "Please login to continue..." })
                sessionStorage.setItem("tokenSuccess", false);
                sessionStorage.setItem("token", this.state.session.token);
                sessionStorage.setItem("id", this.state.session.id);
            }

        });
    }
    render() {
        return (
            <div>
                {!(this.state.authorized) && <div className="fontStyle" >
                    <LoginNavBar />
                    <div className="sessionExpiredMsg">
                        <h3>{this.state.errorMsg}</h3>
                    </div>
                </div>}
                {this.state.authorized && <div className="fontStyle" >
                    <Navbar />
                    <div className="homeDiv">
                        <div className="avatar">
                            <img src={userAvatar} alt="userAvatar" height="100px" width="100px" />
                        </div>
                        <div className="tweetDiv">
                            <div className="tweetListDiv">
                                <div className="userAllTweetDiv" style={{ width: '', margin: '0' }}>
                                    <div className="avatarIcon">
                                        <img src={userAvatar} alt="userAvatar" height="20px" width="20px" style={{ paddingTop: '10px' }} />
                                    </div>
                                    <div className="infoDiv">
                                        <p><b>{"@" + this.state.tweetInfo.userId}</b>
                                            <b style={{ float: 'right', fontWeight: '100' }}>{this.state.tweetInfo.timeStamp}</b>
                                        </p>
                                        <div className="allTweetDes">
                                            {this.state.tweetInfo.tweetDescription}
                                            <p style={{margin:'0px 10px 0px 0px',float:'right'}}><i className="far fa-heart" style={{color:"red"}}></i>&nbsp;&nbsp;{this.state.tweetInfo.likesCount}</p>
                                            <p style={{margin:'0px 10px 0px 0px',float:'right'}}><a style={{cursor:"pointer",fontWeight:'600'}} onClick={()=>{this.likeTweet(1)}}>Like</a> &nbsp; <a style={{cursor:"pointer",fontWeight:'600'}} onClick={()=>{this.likeTweet(-1)}}>DisLike</a></p>
                                            <br /><br />
                                            <div className="infoDiv">
                                                <form className="postTweetForm" name="postTweet" onSubmit={this.submitHandler}>
                                                    <div className="form-group">
                                                        <textarea className="tweetDesText" name="commentDescription" rows="3" cols="40" placeholder="Post a reply..." onChange={this.setValues} style={{ borderStyle: "dotted" }}></textarea>
                                                    </div>
                                                    {this.state.isError && <div className="error-div" style={{ padding: '5px', margin: '0px', width: '94%' }}>
                                            <p style={{ margin: '0px', fontWeight: '600' }}>{this.state.errorMsg}</p>
                                        </div>}
                                                    <div className="postBtn">
                                                        <button type="submit" className="btn btn-primary btn-block" id="enterbutton" >Enter</button>
                                                    </div>
                                                </form>
                                            </div>
                                            {this.state.tweetInfo.commentsList !== null ?
                                                this.state.tweetInfo.commentsList?.map((commentObj, i) => (
                                                    <div className="userAllCommentDiv" key={i}>
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

                            </div>
                        </div>
                    </div>
                </div>}
            </div>
        );
    }

}
export default ViewAndReplyTweet;