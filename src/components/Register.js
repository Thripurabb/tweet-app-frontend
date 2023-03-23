import React, { Component } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import '../styles/register.css';
import LoginNavBar from './LoginNavBar';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginId: '', firstName: '', lastName: '', email: '', password: '', confirmPassword: '', contactNumber: '',
            registered: false, userDetails: [], errorMsg: "", isError: false
        };
    }
    setValues = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });

    }
    // validateHandler = (event) =>{
    //     event.preventDefault();
    //     axios.get("http://localhost:8082/api/v1.0/tweets/allusers")
    //     .then(response => response.data)
    //     .then((data) => {
    //         this.setState({ userDetails: data });
    //         var listOfUserIds = this.state.userDetails.map((user) => (user.loginId));
    //         if (listOfUserIds.includes(this.state.loginId))
    //             console.log("*******" + this.state.userDetails.map((user) => (user.loginId)).includes(this.state.loginId));
    //     });
    //     if (this.state.userDetails.map((user) => (user.loginId)).includes(this.state.loginId)) {
    //         this.setState({ registered: false });

    //     }
    //     else{
    //         this.submitHandler();
    //     }
    // }
    submitHandler = (event) => {
        event.preventDefault();
        const userInfo = {
            loginId: this.state.loginId,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            contactNumber: this.state.contactNumber
        };
        if (this.state.loginId === "" || this.state.firstName === "" || this.state.lastName === "" || this.state.email === "" || this.state.password === "" || this.state.confirmPassword === "" || this.state.contactNumber === "") {
            this.setState({ registered: false, isError: true, errorMsg: "All fields are mandatory." });
            console.log("All fields are mandatory.");
        }
        else if (this.state.password !== this.state.confirmPassword) {
            this.setState({ registered: false, isError: true, errorMsg: "Password and Re-enter Paswword fields must be same." });
            console.log("Password and Re-enter Paswword fields must be same.");
        }
        else {
            axios.post("http://localhost:8082/api/v1.0/tweets/register", userInfo)
                .then(console.log("Data saved successfully!!!"))
                .then(
                    this.setState({ registered: true, isError: false })
                )
                .catch(error => {
                    console.log(error.response.data.message);
                    this.setState({ registered: false, isError: true, errorMsg: "Login Id and Email should be unique." });
                    console.log("Login Id and Email should be unique.");
                });
        }

    }

    render() {

        return (
            <div className="fontStyle">
                <LoginNavBar />
                {this.state.registered && <div>
                    <div className="container" id="registercontainer">
                        <div className="success-msg">
                            Registered successfully! Please login...
                        </div>
                    </div>
                </div>}
                {!this.state.registered && <div class="formbody">
                    <div className="container" id="registercontainer">
                        {this.state.isError && <div className="error-div">
                            <p style={{ margin: '0px', fontWeight: '600' }}>{this.state.errorMsg}</p>
                        </div>}
                        <div className="register-div">
                            <b class="registerTitle">Register</b>
                        </div>
                        <div className="form-div">
                            <form name="registerform" onSubmit={this.submitHandler} style={{ paddingBottom: '10%' }}>
                                <div className="form-group">
                                    <input type="text" id="input-control" class="form-control" aria-describedby="emailHelp"
                                        placeholder="Login Id" name="loginId" onChange={this.setValues} />
                                </div>
                                <div className="form-group" >
                                    <input type="text" id="input-control" class="form-control" aria-describedby="emailHelp"
                                        placeholder="First Name" name="firstName" onChange={this.setValues} />
                                </div>
                                <div className="form-group" >
                                    <input type="text" id="input-control" class="form-control" aria-describedby="emailHelp"
                                        placeholder="Last Name" name="lastName" onChange={this.setValues} />
                                </div>
                                <div className="form-group" >
                                    <input type="text" id="input-control" class="form-control" aria-describedby="emailHelp"
                                        placeholder="Email" name="email" onChange={this.setValues} />
                                </div>
                                <div className="form-group">
                                    <input type="password" id="input-control" class="form-control" placeholder="Password" name="password"
                                        onChange={this.setValues} />
                                </div>
                                <div className="form-group">
                                    <input type="password" id="input-control" class="form-control" placeholder="Re-enter Password" name="confirmPassword"
                                        onChange={this.setValues} />
                                </div>
                                <div className="form-group" >
                                    <input type="text" id="input-control" class="form-control" aria-describedby="emailHelp"
                                        placeholder="Phone Number" name="contactNumber" onChange={this.setValues} />
                                </div>
                                <div className="buttonAlign">
                                    <button type="submit" className="btn btn-primary btn-block" id="button" >Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>}
            </div>
        );
    }

}
export default Home;