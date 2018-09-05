import React, { Component } from "react";
import { ToastContainer } from "react-toastify";

import Auth from "../Auth"; // Import Auth component
import UserInfo from "../UserInfo"; // Import UserInfo component

import "./root.css"; // Import styles for this component
import "react-toastify/dist/ReactToastify.css"; // Import styles to toasts

export class Root extends Component {
  state = {
    isUserLogIn: false, // Create state for login user status
    userInfo: null // User information state
  };

  // Login user in aplication
  logInUser = userInfo => this.setState({ isUserLogIn: true, userInfo });
  // Logout user from aplication
  logOutUser = () => this.setState({ isUserLogIn: false, userInfo: null });

  render() {
    const { isUserLogIn, userInfo } = this.state; // Destructuring values from state

    return (
      <div className="page-wrapper">
        {isUserLogIn ? ( // If user login - show user information card
          <UserInfo logOutUser={this.logOutUser} {...userInfo} />
        ) : (
          // else show auth panel
          <Auth logInUser={this.logInUser} />
        )}
        <ToastContainer // Toasts container
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
      </div>
    );
  }
}

export default Root;
