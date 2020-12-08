import React from 'react';
import PropTypes from 'prop-types';

function ContactPopup(props) {
  const dynamicStyle = {
    width: props.layoutData.width,
    top: props.layoutData.top - 2,
    left: props.layoutData.left,
  }

  return (
    <div style={dynamicStyle} className="contact-popup">
      <div className="flex">
        <button className="close-btn" onClick={props.closePopup}>X</button>
        <img src={props.contact.picture.large} alt="Profile photo" />
        <div className="flex-col">
          <h1>{props.contact.name.last.toUpperCase()}, {props.contact.name.first.toLowerCase()}</h1>
          <div className="contact-column">
            <b>e-mail</b>{props.contact.email}
            <b>phone</b>{props.contact.phone}
            <b>street</b>{props.contact.location.street.number}&nbsp;{props.contact.location.street.name}
            <b>city</b>{props.contact.location.city}
            <b>state</b>{props.contact.location.state}
            <b>postcode</b>{props.contact.location.postcode}
          </div>
        </div>
      </div>
      <div className="username-strip">
        USERNAME <small>{props.contact.login.username}</small>
      </div>
    </div>
  );
}

ContactPopup.propTypes = {
  layoutData: PropTypes.shape({
    width: PropTypes.number,
    top: PropTypes.number,
    left: PropTypes.number,
  }),
  closePopup: PropTypes.func,
}

export default ContactPopup;
