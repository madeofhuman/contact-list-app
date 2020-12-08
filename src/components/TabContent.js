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

  return (
    <div className="tab-content">
      <div className="contact-list">
        {activeContacts?.map(contact => {
          return (<button
                    className="contact-item"
                    key={contact.login.uuid}
                    data-testid={contact.login.uuid}
                    onClick={(e) => displayContact(e, contact)}>
                      {contact.name.first}, {contact.name.last.toUpperCase()}
                  </button>);
        })}
      </div>
      {showContent && selectedContact && popupLayoutData ? (
        <ContactPopup contact={selectedContact} layoutData={popupLayoutData} closePopup={closePopup} />
      ) : null}
    </div>
  );
};

export default TabContent;
