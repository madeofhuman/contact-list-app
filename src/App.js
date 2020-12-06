import React from 'react';
import configJson from './config';
import ContactTab from './components/ContactTab';

function App() {
  const h1Style = {textAlign: 'center'};

  return (
    <div className="App">
      <h1 style={h1Style}>{configJson.title}</h1>
      <ContactTab config={configJson} />
    </div>
  );
}

export default App;
