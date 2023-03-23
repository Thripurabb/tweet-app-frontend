import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { Component } from 'react';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import ViewAndReplyTweet from './components/ViewAndReplyTweet';
import UserTweet from './components/UserTweet';
import SearchPage from './components/SearchPage';
import ForgotPassword from './components/ForgotPassword';
class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="fontStyle">
        <BrowserRouter>
          <Routes>
            <Route exact path="/login" element={<Login  />} />
            <Route exact path="/register" element={<Register  />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/tweet/:id" element={<ViewAndReplyTweet />} />
            <Route exact path="/userTweets/:id" element={<UserTweet />} />
            <Route exact path="/search" element={<SearchPage />} />
            <Route exact path="/forgotPassword" element={<ForgotPassword />} />
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;