import React, { Component } from "react";
import PropTypes from "prop-types";

import "./user-info.css"; // Import styles for this component

export class UserInfo extends Component {
  static propTypes = {
    logOutUser: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired
  };

  render() {
    const { name, surname, email, logOutUser } = this.props; // Destructuring values from props

    return (
      <div className="user-info__wrapper">
        <h1 className="user-info__header">User info</h1>
        <table className="user-info__table">
          <tbody>
            <tr>
              <td>Name: </td>
              <td>{name}</td>
            </tr>
            <tr>
              <td>Surname: </td>
              <td>{surname}</td>
            </tr>
            <tr>
              <td>Email: </td>
              <td>{email}</td>
            </tr>
          </tbody>
        </table>
        <button onClick={logOutUser} className="form-button">
          LogOut
        </button>
      </div>
    );
  }
}

export default UserInfo;
