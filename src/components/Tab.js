import React from 'react';
import PropTypes from 'prop-types';

function Tab(props) {
  const active = props.isActive ? 'active' : '';

  function renderTabContent(count) {
    if (count > 0) {
      return (
        <a className={"nav-link " + active} href={`#${props.tab}`} onClick={() => props.switchTabs(props.tab)}>
          <span className="tab-letter">{props.tab}</span>
          &nbsp;
          <sub>{props.count}</sub>
        </a>
      )
    } else {
      return (
        <span className="nav-link disabled" disabled>
          <span className="tab-letter">{props.tab}</span>
          &nbsp;
          <sub>{props.count}</sub>
        </span>
      )
    }
  }

  return (
    <li className="nav-item" key={props.tab}>
      {renderTabContent(props.count)}
    </li>
  );
}

Tab.propTypes = {
  tab: PropTypes.string,
  count: PropTypes.number,
  switchTabs: PropTypes.func,
  isActive: PropTypes.bool,
};

export default Tab;