import React, { useContext } from 'react';
import Tab from './Tab';
import { ContactContext } from './ContactTab';

function TabNav() {
  const { contacts, tabs, activeTab, setActiveTab, setShowContent } = useContext(ContactContext);

  function getLastNameCount(contacts, alphabet) {
    return contacts?.filter(contact => contact.name.last[0].toLowerCase() === alphabet).length;
  }

  function switchTabs(tab) {
    setShowContent(false);
    setActiveTab(tab);
  }

  return (
    <div>
      <div className="nav nav-tabs">
        {tabs?.map((tab) => {
          return (
            <Tab
              tab={tab}
              key={tab}
              count={getLastNameCount(contacts, tab)}
              isActive={activeTab === tab}
              switchTabs={switchTabs} />
          );
        })}
      </div>
    </div>
  );
}

export default TabNav;
