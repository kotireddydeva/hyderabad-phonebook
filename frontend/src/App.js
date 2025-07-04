import React from 'react';
import './App.css';
import ServiceForm from './components/ServiceForm';
import ServiceList from './components/ServiceList';

function App() {
  return (
    
    <div className="app-container">
    <h1>📞 Hyderabad Services Phonebook</h1>
      <div className="left-side">
        <ServiceForm />
      </div>
      <div className="right-side">
        <ServiceList />
      </div>
    </div>
  );
}

export default App;
