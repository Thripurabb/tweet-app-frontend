import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/navbar.css';
import Logo from '../images/tweet-app-logo.jpg';
class Navbar extends Component
{
    render()
    {
        return(
            <div className="fontStyle">
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark" id="head-nav" >
            
                <div class="navbar-header"  style={{display:"inline-block",width:'15%',padding:'30px'}}>
                    <a class="tweetApplogo"><img src={Logo} alt="logo" height="40px" width="40px"></img></a>
                    <a class="navbar-brand logoTxt"  >Tweet App</a>
                </div>
                <div class="collapse navbar-collapse justify-content-end"  style={{display:"inline-block",width:'80%'}} >
                    <div class="navbar-nav navbar-right" >
                            <NavLink to="/login" style={{margin:'5%'}} class="nav-item nav-link"><b >Login</b></NavLink>
                            <NavLink to="/register" style={{margin:'5%'}} class="nav-item nav-link "><b >Register</b></NavLink>
                    </div>
                </div>
                
        </nav>
        
        </div>

        );
    }
}
export default Navbar;