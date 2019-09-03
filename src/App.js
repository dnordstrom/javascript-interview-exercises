import React from 'react';
import CompanyList from './components/CompanyList';
import Notifier from './util/Notifier';
import companies from './api'
import './App.css';

function App() {
  Notifier.requestPermissions();

  return (
    <div className="App">
      <CompanyList companies={companies}></CompanyList>
    </div>
  );
}

export default App;
