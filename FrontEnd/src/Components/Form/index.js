import React, { Component } from "react";
import PropTypes from "prop-types";

import Input from "../Input"; // Import Input component

import "./form.css"; // Import styles for this component

class Form extends Component {
  static defaultProps = {
    className: ""
  };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    className: PropTypes.string,
    formFields: PropTypes.arrayOf(
      PropTypes.shape({
        icon: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        placeholder: PropTypes.string,
        validator: PropTypes.func.isRequired
      })
    ).isRequired
  };

  state = {
    formFields: this.props.formFields, // Set form fields config in local state
    isFormSubmited: false // State for checking form submit status
  };

  // Set main input values to global state (this component state)
  setFieldData = index => ({ value, isValid }) =>
    this.setState(prevState => ({
      formFields: prevState.formFields.map((filed, fieldIndex) => {
        // Select input which was changed
        if (fieldIndex === index) {
          return {
            ...filed, // Unpacking current field properies
            value, // New input value
            isValid // Input validly
          };
        }
        return filed; // Return field object by default
      })
    }));

  // Check form validity status
  get _isFormValid() {
    // Get form fields from state
    const fields = this.state.formFields;
    // Run loop for checking fields validity status
    for (let i = 0; i < fields.length; i++) {
      // If someone field is invalid cancel from function with false result
      if (!fields[i].isValid) return false;
    }
    return true; // Return true by default
  }

  // Handle form submit
  _handleSubmit = event => {
    event.preventDefault(); // Prevent default logic

    let values = {}; // Create empty values obj
    this.state.formFields.forEach(filed => {
      values[filed.name] = filed.value; // Set in values obj fields
    });

    // Set form submit state
    this.setState({ isFormSubmited: true }, () => {
      if (this._isFormValid) this.props.onSubmit(values); // Trigger onSubmit function if form is valid
    });
  };

  render() {
    const { formFields, isFormSubmited } = this.state; // Destructuring values from state
    const { className } = this.props; // Destructuring values from props

    return (
      <form onSubmit={this._handleSubmit} className={`form ${className}`}>
        {formFields.map((
          field,
          index // Render all fields which was in form fields config
        ) => (
          <Input
            key={field.name}
            setFieldData={this.setFieldData(index)}
            isFormSubmited={isFormSubmited}
            {...field} // Destructuring fields properies in component props
          />
        ))}

        <button type="submit" className="form-button">
          Submit
        </button>
      </form>
    );
  }
}

export default Form;
