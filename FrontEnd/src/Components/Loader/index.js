import React from "react";
import PropTypes from "prop-types";

import "./loader.css"; // Import styles for this component

// Create Loader func component & destructuring values from props
const Loader = ({ dimmer }) => {
  return (
    <div className={dimmer ? "loader-wrapper dimmer-wrap" : "loader-wrapper"}>
      <div className="loader" />
    </div>
  );
};

Loader.propTypes = {
  dimmer: PropTypes.bool
};

Loader.defaultProps = {
  dimmer: true
};

export default Loader;
