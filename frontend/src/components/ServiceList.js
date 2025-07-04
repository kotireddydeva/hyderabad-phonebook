import React, { useState } from 'react';
import axios from 'axios';
import Rating from './Rating';

function ServiceList() {
  const [area, setArea] = useState('');
  const [service, setService] = useState('');
  const [results, setResults] = useState([]);
  const [deleteData, setDeleteData] = useState({ phone: '', secretKey: '' });
  const [message, setMessage] = useState('');

  const areaOptions = ['Kukatpally', 'Ameerpet', 'Bachupally', 'Kushayiguda'];
  const serviceOptions = ['Electrician', 'Plumber', 'Carpenter', 'Painter', 'Mechanic'];

  const search = async () => {
    if (!area && !service) {
      return setMessage('❗Enter at least Area or Service to search');
    }

    try {
      const res = await axios.get(`https://hyderabad-phonebook.onrender.com/api/services/search`, {
        params: { area, service }
      });
      setResults(res.data);
      setMessage('');
    } catch (err) {
      setMessage('❌ Failed to fetch results');
    }
  };

  const handleDelete = async () => {
    const { phone, secretKey } = deleteData;
    if (!phone || !secretKey) return setMessage('❗Both phone and secret key are required');

    try {
      const res = await axios.post(`https://hyderabad-phonebook.onrender.com/api/services/delete`, deleteData);
      setMessage('✅ Service deleted successfully');
      setDeleteData({ phone: '', secretKey: '' });
      setResults(results.filter(r => r.phone !== phone)); // remove from list
    } catch (err) {
      setMessage('❌ Could not delete. Check phone/secret key');
    }
  };

  return (
    <div>
      <div className="search-box">
        <h2>🔍 Search Service Providers</h2>
        <div className="search-bar">
          <select value={area} onChange={(e) => setArea(e.target.value)}>
            <option value="">Select Area</option>
            {areaOptions.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>

          <select value={service} onChange={(e) => setService(e.target.value)}>
            <option value="">Select Service</option>
            {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>

          <button onClick={search}>Search</button>
        </div>
      </div>

      {message && <p className="msg">{message}</p>}

      {results.length === 0 && <p style={{ textAlign: 'center', color: '#999' }}>No services found.</p>}

      {results.map((s) => (
        <div key={s.id} className="service-card">
          <h3>{s.name}</h3>
          <p><strong>Service:</strong> {s.service}</p>
          <p><strong>Area:</strong> {s.area}</p>
          <p><strong>Phone:</strong> {s.phone}</p>
          <Rating id={s.id} rating={s.rating} />
        </div>
      ))}

      <div className="delete-box">
        <h3>🗑 Delete Your Entry</h3>
        <input
          placeholder="Phone number"
          value={deleteData.phone}
          onChange={(e) => setDeleteData({ ...deleteData, phone: e.target.value })}
        />
        <input
          placeholder="Secret Key"
          value={deleteData.secretKey}
          onChange={(e) => setDeleteData({ ...deleteData, secretKey: e.target.value })}
        />
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default ServiceList;
