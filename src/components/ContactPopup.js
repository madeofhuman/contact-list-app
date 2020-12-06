import React from 'react';
import PropTypes from 'prop-types';

function ContactPopup(props) {
  const containerStyle = {
    zIndex: 1,
    position: 'absolute',
    width: props.layoutData.width,
    height: '300px',
    top: props.layoutData.top - 2,
    left: props.layoutData.left,
    border: '1px solid gray',
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'spaceBetween'
  }

  return (
    <div style={containerStyle}>
      <a href='#' onClick={props.closePopup}>X</a>
      <div><img src={props.contact.picture.large} /></div>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <h1>{props.contact.name.last.toUpperCase()}, {props.contact.name.first.toLowerCase()}</h1>
        <div style={{display: 'grid', gridTemplateColumns: '100px 1fr'}}>
          <b>e-mail</b>{props.contact.email}
          <b>phone</b>{props.contact.phone}
          <b>street</b>{props.contact.location.street.number}&nbsp;{props.contact.location.street.name}
          <b>city</b>{props.contact.location.city}
          <b>state</b>{props.contact.location.state}
          <b>postcode</b>{props.contact.location.postcode}
        </div>
      </div>
      <div style={{transform: 'rotate(90deg)', width: 'auto', backgroundColor: 'red', height: 'max-content', color: '#fff', padding: '5px', position: 'absolute', right: '-50px', zIndex: 2, top: '80px'}}>
        USERNAME {props.contact.login.username}
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
