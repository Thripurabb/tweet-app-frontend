import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/navbar.css';
import Logo from '../images/tweet-app-logo.jpg';
class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginId: sessionStorage.getItem("id")
        };
    }
    render() {
        return (
            <div className="fontStyle">
                <nav class="navbar navbar-expand-lg navbar-dark bg-dark" id="head-nav" >

                    <div class="navbar-header" style={{ display: "inline-block", width: '15%', padding: '30px' }}>
                        <a class="tweetApplogo"><img src={Logo} alt="logo" height="40px" width="40px"></img></a>
                        <a class="navbar-brand logoTxt"  >Tweet App</a>
                    </div>
                    <div class="collapse navbar-collapse justify-content-end" style={{ display: "inline-block", width: '80%' }} >
                        <div class="navbar-nav navbar-right" >
                            <NavLink to="/home" style={{ margin: '5%' }} class="nav-item nav-link " ><b >Home</b></NavLink>
                            <NavLink to={"/userTweets/" + this.state.loginId} style={{ margin: '5%' }} class="nav-item nav-link "><b>Tweets</b></NavLink>
                            <NavLink to="/search" style={{ margin: '5%' }} class="nav-item nav-link "><b >Search</b></NavLink>
                            <NavLink to="/login" onClick={()=>{sessionStorage.clear()}} style={{ margin: '5%' }} class="nav-item nav-link"><b >Logout</b></NavLink>
                        </div>
                    </div>

                </nav>

            </div>

        );
    }
}
export default Navbar;