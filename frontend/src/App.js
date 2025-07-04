import React from 'react';
import './App.css';
import ServiceForm from './components/ServiceForm';
import ServiceList from './components/ServiceList';

function App() {
  return (
    <div className="app-container">
      <div className="left-side">
        <h1>📞 Hyderabad Services Phonebook</h1>
        <ServiceForm />
      </div>
      <div className="right-side">
        <ServiceList />
      </div>
    </div>
  );
}

export default App;
