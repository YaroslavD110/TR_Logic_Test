import React, { Component } from "react";
import PropTypes from "prop-types";

import Form from "./Form"; // Import Form component
import Loader from "./Loader"; // Import Loader component
import { serverUrl } from "../config"; // Import serverUrl from config file
import { errorToast, infoToast } from "../utils/toasts"; // Import toasts caller

// This array describe form inputs
const formFields = [
  {
    icon: "email", // Input icon
    name: "email", // Input name
    type: "email", // Input type
    placeholder: "Enter your email...", // Input placeholder
    validator: value => {
      // This method describe rules
      // to validate input value
      if (!value) {
        return "Email is required!";
      } else if (
        !/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          value
        )
      ) {
        return "Email is invalid!";
      }
      return null;
    }
  },
  {
    icon: "security", // Input icon
    name: "password", // Input name
    type: "password", // Input type
    placeholder: "Enter your password...", // Input placeholder
    validator: value => {
      // This method describe rules
      // to validate input value
      if (!value) {
        return "Password is required!";
      } else if (value.length < 6) {
        return "Password must be longer than 6 characters!";
      }
      return null;
    }
  }
];

class SignIn extends Component {
  static propTypes = {
    logInUser: PropTypes.func.isRequired
  };

  state = {
    showLoader: false // Set loader active state
  };

  // Toggle show/hide form loader
  _toggleLoader = () => this.setState({ showLoader: !this.state.showLoader });

  // Handle form submit
  _handleSubmit = async values => {
    this._toggleLoader(); // Toggle loader to show

    try {
      // Fetch request to server
      let res = await fetch(`${serverUrl}/auth/log-in`, {
        method: "POST", // POST method of request
        body: JSON.stringify(values), // Convert value to json
        headers: {
          // Set headers
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
      // Convert response from json
      res = await res.json();
      // Check errors in response
      if (!res || !res._id) throw res;
      // Hide loader
      this._toggleLoader();
      // Login user
      this.props.logInUser(res);
      // Show success toast
      infoToast("User successfully log in!");
    } catch (err) {
      // Hide loader
      this._toggleLoader();
      // Show toast with index message
      errorToast(err.error);
    }
  };

  render() {
    return (
      <div>
        {this.state.showLoader && <Loader />}
        <Form
          onSubmit={this._handleSubmit}
          className="login-form"
          formFields={formFields}
        />
      </div>
    );
  }
}

export default SignIn;
