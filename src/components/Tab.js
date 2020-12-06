import React from 'react';
import PropTypes from 'prop-types';

function Tab(props) {
  const active = props.isActive ? 'active' : '';

  return (
    <li className="nav-item" key={props.tab}>
      {props.count > 0 ? (
        <a className={"nav-link " + active} href={`#${props.tab}`} onClick={() => props.switchTabs(props.tab)}>
          <span style={{fontSize: '1.5em'}}>{props.tab}</span>
          &nbsp;
          <sub>{props.count}</sub>
        </a>
      ) : (
        <a className="nav-link disabled" href={`#${props.tab}`} disabled>
          <span style={{fontSize: '1.5em'}}>{props.tab}</span>
          &nbsp;
          <sub>{props.count}</sub>
        </a>
      )}
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