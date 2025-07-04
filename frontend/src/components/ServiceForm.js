import React, { useState } from 'react';
import axios from 'axios';

function ServiceForm() {
  const [formData, setFormData] = useState({
    name: '',
    service: '',
    area: '',
    phone: '',
    secretKey: ''
  });

  const [message, setMessage] = useState('');

  const areaOptions = ['Kukatpally', 'Ameerpet', 'Bachupally', 'Kushayiguda'];
  const serviceOptions = ['Electrician', 'Plumber', 'Carpenter', 'Painter', 'Mechanic'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { name, service, area, phone, secretKey } = formData;
    if (!name || !service || !area || !phone || !secretKey) {
      return setMessage('❗All fields are required.');
    }

    try {
      const res = await axios.post('https://hyderabad-phonebook.onrender.com/api/services/add', formData);
      if (res.data.success) {
        setMessage('✅ Service added successfully!');
        setFormData({ name: '', service: '', area: '', phone: '', secretKey: '' });
      }
    } catch (err) {
      if (err.response?.status === 409) {
        setMessage('⚠️ This phone number already exists.');
      } else {
        setMessage('❌ Error adding service.');
      }
    }
  };

  return (
    <div className="form-box">
      <h2>➕ Add Service Provider</h2>

      <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />

      <select name="service" value={formData.service} onChange={handleChange}>
        <option value="">Select Service</option>
        {serviceOptions.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>

      <select name="area" value={formData.area} onChange={handleChange}>
        <option value="">Select Area</option>
        {areaOptions.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>

      <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
      <input name="secretKey" value={formData.secretKey} onChange={handleChange} placeholder="Secret Key (for delete)" />

      <button onClick={handleSubmit}>Submit</button>

      {message && <p className="msg">{message}</p>}
    </div>
  );
}

export default ServiceForm;
