import React, { useState } from 'react';
import axios from 'axios';

function ServiceForm() {
  const [form, setForm] = useState({
    name: '',
    service: '',
    area: '',
    phone: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/services/add', form);
    alert('Service added!');
    setForm({ name: '', service: '', area: '', phone: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Add Service Provider</h2>
      <input name="name" placeholder="Name" onChange={handleChange} value={form.name} required /><br />
      <input name="service" placeholder="Service (e.g., plumber)" onChange={handleChange} value={form.service} required /><br />
      <input name="area" placeholder="Area (e.g., Kukatpally)" onChange={handleChange} value={form.area} required /><br />
      <input name="phone" placeholder="Phone Number" onChange={handleChange} value={form.phone} required /><br />
      <button type="submit">Add Service</button>
    </form>
  );
}

export default ServiceForm;
