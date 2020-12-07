import React, { useState, useEffect, createContext } from 'react';
import PropTypes from 'prop-types';
import TabNav from './TabNav';
import TabContent from './TabContent';

export const ContactContext = createContext({});

function ContactTab(props) {
  const [contacts, setContacts] = useState([]);
  const [activeTab, setActiveTab] = useState('a');
  const [showContent, setShowContent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${props.config.userUrl}?results=${props.config.numberCards}`)
      .then(resp => resp.json())
      .then(data => {
        setContacts(sortAlphabetically(data.results));
      })
      .catch(err => console.log(err));
  }, [props.config.userUrl, props.config.numberCards]);

  function sortAlphabetically(data) {
    return data
      .sort((a, b) => {
        return (a.name.last < b.name.last) ? -1 : (a.name.last > b.name.last) ? 1 : 0;
      });
  }

  return (
    <div className="contact-tab">
      {contacts.length ? (
        <ContactContext.Provider
          value={{ contacts, tabs: props.config.tabs, activeTab, setActiveTab, showContent, setShowContent }}>
          <TabNav />
          <TabContent />
        </ContactContext.Provider>
      ) : <h4 className="t-a-center">Loading Contacts...</h4>}
    </div>
  );
}

ContactTab.propTypes = {
  config: PropTypes.shape({
    title: PropTypes.string,
    userUrl: PropTypes.string,
    numberCards: PropTypes.number,
    tabs: PropTypes.arrayOf(PropTypes.string)
  }),
};

export default ContactTab;
