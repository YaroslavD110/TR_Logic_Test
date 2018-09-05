import React, { Component } from "react";
import PropTypes from "prop-types";

import "./tab.css"; // Import styles for this component

class Tab extends Component {
  static propTypes = {
    tabs: PropTypes.arrayOf(
      PropTypes.shape({
        tabID: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
          PropTypes.symbol
        ]).isRequired,
        tabTitle: PropTypes.string.isRequired,
        tabComponent: PropTypes.element.isRequired
      })
    ).isRequired
  };

  state = {
    activeTab: this.props.tabs[0] // Set default active tab
  };

  // Handle tab controls item click and toggle tabs
  _setNewActiveTab = tabID => event => {
    event.preventDefault(); // Prevent default logic
    this.setState({
      // Set new active tab by his id
      activeTab: this.props.tabs.find(tab => tab.tabID === tabID)
    });
  };

  render() {
    const { tabs } = this.props; // Destructuring values from props
    const { activeTab } = this.state; // Destructuring values from state

    return (
      <div className="tab-wrapper">
        <div className="tab-controls">
          {tabs.map((
            tab // Maping all existing tabs
          ) => (
            <button
              className={
                tab.tabID === activeTab.tabID
                  ? "tab-controls__item tab-controls__item-active"
                  : "tab-controls__item"
              }
              onClick={this._setNewActiveTab(tab.tabID)}
              key={tab.tabID}
            >
              {tab.tabTitle}
            </button>
          ))}
        </div>
        <div className="tab-content">{activeTab.tabComponent}</div>
      </div>
    );
  }
}

export default Tab;
