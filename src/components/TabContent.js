import React, { useState, useContext } from 'react';
import { ContactContext } from './ContactTab';
import ContactPopup from './ContactPopup';

function TabContent() {
  const { contacts, activeTab, showContent, setShowContent } = useContext(ContactContext);
  const [selectedContact, setSelectedContact] = useState({});
  const [popupLayoutData, setPopupLayoutData] = useState({});

  const activeContacts = contacts
    .filter(contact => contact.name.last[0].toLowerCase() === activeTab);

  function displayContact(e, contact) {
    if (contact.login.uuid !== selectedContact?.login?.uuid) {
      setSelectedContact(contact);
      setShowContent(true);
      setPopupLayoutData({
        top: e.target.getBoundingClientRect().bottom,
        left: e.target.getBoundingClientRect().left,
        width: e.target.getBoundingClientRect().width
      })
    } else {
      closePopup();
    }
  }

  function closePopup() {
    setShowContent(false);
    setSelectedContact({});
  }

  const containerStyle = {
    paddingTop: '50px',
    borderLeft: '1px solid #8080803d',
    borderRight: '1px solid #8080803d',
    borderBottom: '1px solid #8080803d',
    paddingBottom: '10px'
  };

  const ulStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: '1rem',
    listStyle: 'none',
    padding: '0 40px'
  };

  const liStyle = {
    borderBottom: '1px dashed grey',
    padding: '0 0 7px 8px',
    cursor: 'pointer'
  };

  return (
    <div style={containerStyle}>
      <ul style={ulStyle}>
        {activeContacts?.map(contact => {
          return <li style={liStyle} key={contact.login.uuid} onClick={(e) => displayContact(e, contact)}>{contact.name.first}, {contact.name.last.toUpperCase()}</li>
        })}
      </ul>
      {showContent && selectedContact && popupLayoutData ? (
        <ContactPopup contact={selectedContact} layoutData={popupLayoutData} closePopup={closePopup} />
      ) : null}
    </div>
  );
};

export default TabContent;
