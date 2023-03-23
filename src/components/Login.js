import React, { Component } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import '../styles/login.css';
import LoginNavBar from './LoginNavBar';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginId: '', password: '', success: false, errormsg: '', session: []
        }
    }
    setValues = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });

    }
    submitHandler = (event) => {
        event.preventDefault();
        let err = <b>Incorrect UserName or Password!!!</b>;
        const user = {
            loginId: this.state.loginId,
            password: this.state.password
        };
        axios.post("http://localhost:8082/api/v1.0/tweets/login", user)
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
            return <Navigate to="/home" />;
        }
        return (
            <div className="fontStyle">
                <LoginNavBar />
                <div class="formbody">
                    <div className="container" id="logincontainer">
                        <div className="login-div">
                            <b class="loginTitle">Login</b>
                        </div>
                        <div className="form-div">
                            <form name="loginform" onSubmit={this.submitHandler} style={{ paddingBottom: '10%' }}>
                                <div className="form-group">
                                    <input type="text" id="input-control" class="form-control" aria-describedby="emailHelp"
                                        placeholder="User Name" name="loginId" onChange={this.setValues} required />
                                </div>
                                <div className="form-group">
                                    <input type="password" id="input-control" class="form-control" placeholder="Password" name="password"
                                        required onChange={this.setValues} />
                                </div>
                                <div className="forgotPwd"><a href="/forgotPassword">Forgot password?</a></div>
                                <div className="error_msg">{this.state.errormsg}</div>
                                <div className="buttonAlign">
                                    <button type="submit" className="btn btn-primary btn-block" id="button" >Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Login