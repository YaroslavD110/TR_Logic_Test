import React, { Component } from "react";
import PropTypes from "prop-types";

import Tab from "../Tab"; // Import Tab component
import LogIn from "../LogIn"; // Import LogIn component
import SignUp from "../SignUp"; // Import SignUp component

import "./auth.css"; // Import styles for this component

export class Auth extends Component {
  static propTypes = {
    logInUser: PropTypes.func.isRequired
  };

  render() {
    return (
      <div className="form-wrapper">
        <Tab
          tabs={[
            {
              tabID: 1, // Tab id (must be unique)
              tabTitle: "LogIn", // Tab title (text in tab controls)
              tabComponent: <LogIn logInUser={this.props.logInUser} /> // Jsx component which will be rendered in tab content
            },
            {
              tabID: 2, // Tab id (must be unique)
              tabTitle: "SignUp", // Tab title (text in tab controls)
              tabComponent: <SignUp logInUser={this.props.logInUser} /> // Jsx component which will be rendered in tab content
            }
          ]}
        />
      </div>
    );
  }
}

export default Auth;
