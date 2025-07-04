import React, { useState, useEffect } from 'react';
import ServiceForm from './components/ServiceForm';
import ServiceList from './components/ServiceList';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : '';
  }, [darkMode]);

  return (
    <div>
      <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
      </button>
      <h2 style={{ textAlign: 'center', marginTop: 60 }}>📞 Hyderabad Services Phonebook</h2>
      <ServiceForm />
      <ServiceList />
    </div>
  );
}

export default App;
