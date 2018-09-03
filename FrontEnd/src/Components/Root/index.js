import React, { Component } from "react";

import Auth from "../Auth";
import UserInfo from "../UserInfo";

import "./root.scss";

export class Root extends Component {
  state = {
    isUserLogIn: false
  };

  logInUser = () => this.setState({ isUserLogIn: true });
  logOutUser = () => this.setState({ isUserLogIn: false });

  render() {
    const { isUserLogIn } = this.state;

    return (
      <div className="page-wrapper">
        {isUserLogIn ? <UserInfo /> : <Auth />}
      </div>
    );
  }
}

export default Root;
