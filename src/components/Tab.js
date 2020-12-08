import React from 'react';
import PropTypes from 'prop-types';

function Tab(props) {
  const active = props.isActive ? 'active' : '';

  function renderTabContent(count) {
    if (count > 0) {
      return (
        <button className={"nav-link " + active} onClick={() => props.switchTabs(props.tab)}>
          <span className="tab-letter">{props.tab}</span>
          &nbsp;
          <sub>{props.count}</sub>
        </button>
      )
    } else {
      return (
        <button className="nav-link disabled" disabled>
          <span className="tab-letter">{props.tab}</span>
          &nbsp;
          <sub>{props.count}</sub>
        </button>
      )
    }
  }

  return (
    <span className="nav-item" key={props.tab}>
      {renderTabContent(props.count)}
    </span>
  );
}

Tab.propTypes = {
  tab: PropTypes.string,
  count: PropTypes.number,
  switchTabs: PropTypes.func,
  isActive: PropTypes.bool,
};

export default Tab;