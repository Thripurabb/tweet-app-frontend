import React, { Component } from 'react';
import Navbar from './NavBar';
import LoginNavBar from './LoginNavBar';
import '../styles/userTweet.css';
import '../styles/searchPage.css';
import userAvatar from '../images/user-avatar.jpg';
import axios from 'axios';

class SearchPage extends Component {
    constructor(props) {
        super(props);
        var currentDate = new Date();
        this.state = {
            authorized: (sessionStorage.getItem("tokenSuccess") === 'true'),
            loginId: sessionStorage.getItem("id"),
            date: currentDate.toLocaleString(), usersList: [], userSearchList: [], userName: '',
            errorMsg: "", isError: false, searched: false, session: []
        };

    }
    componentDidMount = () => {
        const headers = {
            'Authorization': sessionStorage.getItem("token")
        };
        axios.get("http://localhost:8082/api/v1.0/tweets/users/all", { headers })
            .then(response => {
                this.setState({ usersList: response.data });
                console.log(this.state.usersList)
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
    searchUserFn = () => {
        const headers = {
            'Authorization': sessionStorage.getItem("token")
        };
        if (this.state.userName === "" || this.state.userName === null) {
            this.setState({ searched: false })
        }
        else {
            axios.get("http://localhost:8082/api/v1.0/tweets/user/search/" + this.state.userName, { headers })
                .then(response => {
                    this.setState({ userSearchList: response.data, searched: true });
                    console.log(this.state.userSearchList);
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
                    <div className="searchDiv">
                        <div className="form-group" style={{ textAlign: "center" }}>
                            <input type="text" id="userName" class="form-control" aria-describedby="emailHelp"
                                placeholder="Search by name" name="userName" onChange={this.setValues} required />
                            <button type="submit" className="btn btn-primary btn-block" id="searchbutton" onClick={() => { this.searchUserFn() }} >Search</button>
                        </div>
                        {!this.state.searched && <div className="userContainer">
                            {this.state.usersList.map((userObj) => (
                                <div className="userCard">
                                    <div className="avatar">
                                        <img src={userAvatar} alt="userAvatar" height="40px" width="40px" />
                                    </div>
                                    <div className="tweetDiv">
                                        <b>@{userObj.loginId}</b>
                                        <p>{userObj.firstName + " " + userObj.lastName}</p>
                                    </div>
                                </div>
                            ))}

                        </div>}
                        {this.state.searched && <div className="userContainer">
                            {this.state.userSearchList.map((userObj) => (
                                <div className="userCard">
                                    <div className="avatar">
                                        <img src={userAvatar} alt="userAvatar" height="40px" width="40px" />
                                    </div>
                                    <div className="tweetDiv">
                                        <b>@{userObj.loginId}</b>
                                        <p>{userObj.firstName + " " + userObj.lastName}</p>
                                    </div>
                                </div>
                            ))}
                        </div>}
                    </div>
                </div>}
            </div>
        );
    }

}
export default SearchPage;