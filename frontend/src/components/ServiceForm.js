import React, { useState } from 'react';
import axios from 'axios';

function ServiceForm() {
  const [name, setName] = useState('');
  const [service, setService] = useState('');
  const [area, setArea] = useState('');
  const [phone, setPhone] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [message, setMessage] = useState('');

  const submit = async () => {
    try {
      const res = await axios.post("https://hyderabad-phonebook.onrender.com/api/services/add", {
        name,
        service,
        area,
        phone,
        secretKey,
      });
      setMessage("✅ Service added successfully!");
      // Reset form
      setName('');
      setService('');
      setArea('');
      setPhone('');
      setSecretKey('');
    } catch (err) {
      setMessage("❌ " + (err.response?.data || "Error adding service."));
    }
  };

  const deleteEntry = async () => {
    try {
      const res = await axios.delete("http://localhost:5000/api/services/delete", {
        data: { phone, secretKey },
      });
      setMessage("🗑️ Service deleted successfully!");
      // Reset form
      setName('');
      setService('');
      setArea('');
      setPhone('');
      setSecretKey('');
    } catch (err) {
      setMessage("❌ " + (err.response?.data || "Error deleting service."));
    }
  };

  return (
    <div className="service-form">
      <h2>📋 Add or Delete Service</h2>

      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter your service (e.g., plumber)"
        value={service}
        onChange={(e) => setService(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter area (e.g., Ameerpet)"
        value={area}
        onChange={(e) => setArea(e.target.value)}
      />

      <input
        type="text"
        placeholder="Enter phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter secret key"
        value={secretKey}
        onChange={(e) => setSecretKey(e.target.value)}
      />

      <div style={{ marginTop: '10px' }}>
        <button onClick={submit}>Add Service</button>
        <button onClick={deleteEntry} style={{ marginLeft: '10px', backgroundColor: '#e74c3c', color: 'white' }}>
          Delete My Entry
        </button>
      </div>

      {message && <p style={{ marginTop: '15px', color: '#444' }}>{message}</p>}
    </div>
  );
}

export default ServiceForm;
