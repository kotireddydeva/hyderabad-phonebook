import React from 'react';
import './App.css';
import ServiceForm from './components/ServiceForm';
import ServiceList from './components/ServiceList';

function App() {
  return (
    <div>
    <h1>📞 Hyderabad Services Phonebook</h1>
    <div className="app-container">
    
      <div className="left-side">
        <ServiceForm />
      </div>
      <div className="right-side">
        <ServiceList />
      </div>
    </div>
    </div>
  );
}

export default App;
