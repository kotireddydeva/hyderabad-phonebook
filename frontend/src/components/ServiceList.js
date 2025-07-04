import React, { useState } from 'react';
import axios from 'axios';
import Rating from './Rating';

function ServiceList() {
  const [area, setArea] = useState('');
  const [service, setService] = useState('');
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('');

  const areaOptions = ['Kukatpally', 'Ameerpet', 'Bachupally', 'Kushayiguda'];
  const serviceOptions = ['Electrician', 'Plumber', 'Carpenter', 'Painter', 'Mechanic'];

  const search = async () => {
    if (!area && !service) {
      setMessage("❌ Please select at least area or service to search.");
      setResults([]);
      return;
    }

    try {
      const res = await axios.get(`https://hyderabad-phonebook.onrender.com/api/services/search`, {
        params: { area, service }
      });
      setResults(res.data);
      setMessage(res.data.length ? '' : 'No services found.');
    } catch (err) {
      setMessage("❌ Error searching services.");
    }
  };

  return (
    <div>
      <div className="search-box">
        <h2>🔍 Search Service Providers</h2>

        <div className="search-bar">
          <select value={area} onChange={(e) => setArea(e.target.value)}>
            <option value="">Select Area</option>
            {areaOptions.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>

          <select value={service} onChange={(e) => setService(e.target.value)}>
            <option value="">Select Service</option>
            {serviceOptions.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <button onClick={search}>Search</button>
        </div>
      </div>

      {message && (
        <p style={{ textAlign: 'center', color: '#999' }}>{message}</p>
      )}

      {results.map((s) => (
        <div key={s.id} className="service-card">
          <h3>{s.name}</h3>
          <p><strong>Service:</strong> {s.service}</p>
          <p><strong>Area:</strong> {s.area}</p>
          <p><strong>Phone:</strong> {s.phone}</p>
          <Rating id={s.id} rating={s.rating} />
        </div>
      ))}
    </div>
  );
}

export default ServiceList;
