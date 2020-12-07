import React from 'react';
import configJson from './config';
import ContactTab from './components/ContactTab';
import './App.scss';

function App() {

  return (
    <div>
      <h1 className="t-a-center">{configJson.title}</h1>
      <ContactTab config={configJson} />
    </div>
  );
}

export default App;
