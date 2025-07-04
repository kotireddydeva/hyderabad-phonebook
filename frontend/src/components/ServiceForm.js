import React, { useState } from 'react';
import axios from 'axios';

function ServiceForm() {
  const [name, setName] = useState('');
  const [service, setService] = useState('');
  const [area, setArea] = useState('');
  const [phone, setPhone] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [message, setMessage] = useState('');

  const areaOptions = ['Kukatpally', 'Ameerpet', 'Bachupally', 'Kushayiguda'];
  const serviceOptions = ['Electrician', 'Plumber', 'Carpenter', 'Painter', 'Mechanic'];

  const submit = async () => {
    if (!name || !service || !area || !phone || !secretKey) {
      setMessage("❌ All fields are required.");
      return;
    }

    try {
      await axios.post("https://hyderabad-phonebook.onrender.com/api/services/add", {
        name,
        service,
        area,
        phone,
        secretKey,
      });
      setMessage("✅ Service added successfully!");
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
    if (!phone || !secretKey) {
      setMessage("❌ Phone and Secret Key are required to delete.");
      return;
    }

    try {
      await axios.delete("https://hyderabad-phonebook.onrender.com/api/services/delete", {
        data: { phone, secretKey },
      });
      setMessage("🗑️ Service deleted successfully!");
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

      <select value={service} onChange={(e) => setService(e.target.value)}>
        <option value="">Select Service</option>
        {serviceOptions.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      <select value={area} onChange={(e) => setArea(e.target.value)}>
        <option value="">Select Area</option>
        {areaOptions.map((a) => (
          <option key={a} value={a}>{a}</option>
        ))}
      </select>

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
        <button
          onClick={deleteEntry}
          style={{ marginLeft: '10px', backgroundColor: '#e74c3c', color: 'white' }}
        >
          Delete My Entry
        </button>
      </div>

      {message && <p style={{ marginTop: '15px', color: '#444' }}>{message}</p>}
    </div>
  );
}

export default ServiceForm;
