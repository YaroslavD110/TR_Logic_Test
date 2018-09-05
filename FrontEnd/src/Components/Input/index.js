import React, { Component } from "react";
import PropTypes from "prop-types";

import "./input.css"; // Import styles for this component

class Input extends Component {
  static defaultProps = {
    placeholder: "",
    isValid: false,
    value: ""
  };

  static propTypes = {
    icon: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    isFormSubmited: PropTypes.bool.isRequired,
    isValid: PropTypes.bool.isRequired,
    setFieldData: PropTypes.func.isRequired
  };

  state = {
    isFocus: false, // Form focus state
    error: this.props.validator(this.props.value) // Set default errors with form fields validator method
  };

  // Handle in and out focus events
  _handleFocusIn = () => this.setState({ isFocus: true });
  _handleFocusOut = () => this.setState({ isFocus: false });

  // Handle input event
  _handleInput = e => this._validateForm(e.target.value);

  // Function which validate form values
  _validateForm = value => {
    // Trim spaces around string
    value = value.trim();
    // Validate value
    const error = this.props.validator(value);
    // Set index to local state & set filed value and validity to global state
    this.setState({ error }, () => {
      if (error) {
        this.props.setFieldData({ value, isValid: false });
      } else {
        this.props.setFieldData({ value, isValid: true });
      }
    });
  };

  render() {
    const {
      type,
      name,
      placeholder,
      isValid,
      icon,
      isFormSubmited
    } = this.props; // Destructuring values from state
    const { isFocus, error } = this.state; // Destructuring values from props

    // Create class names for different input status
    const classNameForFocusInput = isFocus
      ? "form-input__box form-input__box-active"
      : "form-input__box";
    const classNameForErrorInput =
      !isValid && isFormSubmited ? "form-input__box-invalid" : "";

    return (
      <div className="form-input__wrapper">
        {!isValid && // If field value is invalid and form was submited show index message
          isFormSubmited && (
            <label className="form-input__label-error">{error}</label>
          )}
        <div className={`${classNameForFocusInput} ${classNameForErrorInput}`}>
          <i className="material-icons form-input__icon-type">{icon}</i>
          <input
            onFocus={this._handleFocusIn}
            onBlur={this._handleFocusOut}
            onInput={this._handleInput}
            placeholder={placeholder}
            className="form-input"
            name={name}
            type={type}
          />
          {isValid && ( // If field value is valid show success icon
            <i className="material-icons form-input__icon-valid">
              check_circle_outline
            </i>
          )}
        </div>
      </div>
    );
  }
}

export default Input;
