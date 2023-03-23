import React, { Component } from 'react';
import Navbar from './NavBar';
import LoginNavBar from './LoginNavBar';
import '../styles/userTweet.css';
import userAvatar from '../images/user-avatar.jpg';
import axios from 'axios';
import { Link } from "react-router-dom";

class UserTweet extends Component {
    constructor(props) {
        super(props);
        var currentDate = new Date();
        this.state = {
            authorized: (sessionStorage.getItem("tokenSuccess") === 'true'),
            loginId: sessionStorage.getItem("id"), tweetList: [], tweetInfo: [], session: [],
            date: currentDate.toLocaleString(), tweetDescription: "",
            errorMsg: "", isError: false, tweetObject: [], iNo: 0
        };

    }
    componentDidMount = () => {
        const headers = {
            'Authorization': sessionStorage.getItem("token")
        };
        axios.get("http://localhost:8082/api/v1.0/tweets/" + this.state.loginId, { headers })
            .then(response => {
                this.setState({ tweetList: response.data });
                console.log(this.state.tweetList)
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
    setValues = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });

    }
    displayUpdateForm = (obj, i) => {
        document.getElementById(`updateTweet${i}`).style.display = "block";
        document.getElementById(`tweetDescriptionTxt${i}`).style.display = "none";
        this.setState({ tweetDescription: obj.tweetDescription, tweetObject: obj, iNo: i })
    }
    deleteTweet = (obj, i) => {
        const headers = {
            'Authorization': sessionStorage.getItem("token")
        };
        axios.delete("http://localhost:8082/api/v1.0/tweets/" + this.state.loginId + "/delete/" + obj.tweetId, { headers })
            .then(response => {
                console.log("Tweet Removed Successfully!");
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
    submitHandler = (event) => {
        event.preventDefault();
        const headers = {
            'Authorization': sessionStorage.getItem("token")
        };
        const tweet = {
            tweetDescription: this.state.tweetDescription,
            likesCount: this.state.tweetObject.likesCount,
            userId: this.state.tweetObject.userId,
            timeStamp: this.state.date
        };
        if (this.state.tweetDescription === "" || this.state.tweetDescription === null) {
            this.setState({ isError: true, errorMsg: "Required*" });
        }
        else if (this.state.tweetDescription.length > 144) {
            this.setState({ isError: true, errorMsg: "Tweet should not go beyond 144 characters." });
        }
        else {
            axios.put("http://localhost:8082/api/v1.0/tweets/" + this.state.loginId + "/update/" + this.state.tweetObject.tweetId, tweet, { headers })
                .then(response => {
                    this.setState({ tweetInfo: response.data });
                    document.getElementById(`updateTweet${this.state.iNo}`).style.display = "none";
                    document.getElementById(`tweetDescriptionTxt${this.state.iNo}`).style.display = "block";
                    console.log(this.state.tweetInfo)
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
                                {this.state.tweetList == null ?
                                    <p>No tweets available..</p> :
                                    this.state.tweetList.map((tweetObj, i) => (
                                        <div className="userAllTweetDiv" style={{ width: '', marginTop: '0px' }}>
                                            <div className="avatarIcon">
                                                <img src={userAvatar} alt="userAvatar" height="20px" width="20px" style={{ paddingTop: '10px' }} />
                                            </div>
                                            <div className="infoDiv">
                                                <p><b>{"@" + tweetObj.userId}</b>
                                                    <b style={{ float: 'right', fontWeight: '100' }}>{tweetObj.timeStamp}
                                                        <a onClick={() => { this.displayUpdateForm(tweetObj, i) }} style={{ marginLeft: '20px', cursor: 'pointer' }}>
                                                            <i class='far fa-edit' style={{ color: '#551a8b' }}></i>
                                                        </a>
                                                        <a onClick={() => { this.deleteTweet(tweetObj, i) }} style={{ marginLeft: '20px', cursor: 'pointer' }}>
                                                            <i class='far fa-trash-alt' style={{ color: 'red' }}></i>
                                                        </a>
                                                    </b>
                                                </p>
                                                <form className="updateTweetForm" id={"updateTweet" + i} name="postTweet" style={{ display: "none" }} onSubmit={this.submitHandler}>
                                                    <div className="form-group">
                                                        <textarea className="tweetDesText" name="tweetDescription" rows="4" cols="40" placeholder="Post a tweet..." required onChange={this.setValues} value={this.state.tweetDescription}></textarea>
                                                    </div>
                                                    {this.state.isError && <div className="error-div" style={{ padding: '5px', margin: '0px', width: '94%' }}>
                                                        <p style={{ margin: '0px', fontWeight: '600' }}>{this.state.errorMsg}</p>
                                                    </div>}
                                                    <div className="postBtn">
                                                        <button type="submit" className="btn btn-primary btn-block" id="button"  >Update</button>
                                                    </div>
                                                </form>
                                                <div className="allTweetDes">
                                                    <b style={{ fontWeight: '100', display: 'block' }} id={"tweetDescriptionTxt" + i}> {tweetObj.tweetDescription}</b>
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
export default UserTweet;