import React, { Component } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import '../styles/login.css';
import LoginNavBar from './LoginNavBar';

class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginId: '', newPassword: '', success: false, errormsg: '', session: []
        }
    }
    setValues = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });

    }
    submitHandler = (event) => {
        event.preventDefault();
        let err = <b>Invalid UserName.</b>;
        const user = {
            newPassword: this.state.newPassword
        };
        axios.post("http://localhost:8082/api/v1.0/tweets/" + this.state.loginId + "/forgot", user)
            .then(response => {
                console.log(response.data);
                this.setState({ success: true, session: response.data });
                sessionStorage.setItem("tokenSuccess", this.state.success);
                sessionStorage.setItem("token", this.state.session.token);
                sessionStorage.setItem("id", this.state.session.id);

            })
            .catch(error => {
                console.log(error.response.data.message);
                this.setState({ success: false, errormsg: err });
                sessionStorage.setItem("tokenSuccess", this.state.success);
                sessionStorage.setItem("token", this.state.session.token);
                sessionStorage.setItem("id", this.state.session.id);
            });

    }
    render() {
        if (this.state.success) {
            return <Navigate to="/login" />;
        }
        return (
            <div className="fontStyle">
                <LoginNavBar />
                <div class="formbody">
                    <div className="container" id="logincontainer">
                        <div className="login-div">
                            <b class="loginTitle">Reset Password</b>
                        </div>
                        <div className="form-div">
                            <form name="loginform" onSubmit={this.submitHandler} style={{ paddingBottom: '10%' }}>
                                <div className="form-group">
                                    <input type="text" id="input-control" class="form-control" aria-describedby="emailHelp"
                                        placeholder="User Name" name="loginId" onChange={this.setValues} required />
                                </div>
                                <div className="form-group">
                                    <input type="password" id="input-control" class="form-control" placeholder="Password" name="newPassword"
                                        required onChange={this.setValues} />
                                </div>
                                <div className="error_msg">{this.state.errormsg}</div>
                                <div className="buttonAlign">
                                    <button type="submit" className="btn btn-primary btn-block" id="button" >Reset</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ForgotPassword