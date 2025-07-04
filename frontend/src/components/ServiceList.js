import React, { useState } from 'react';
import axios from 'axios';
import Rating from './Rating';

function ServiceList() {
  const [filters, setFilters] = useState({
    area: '',
    service: '',
    name: ''
  });

  const [results, setResults] = useState([]);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const search = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/services/search', {
        params: filters
      });
      setResults(res.data);
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  return (
    <div>
      <div className="search-box">
        <h2>🔍 Search Service Providers</h2>
        <div className="search-bar">
          <input
            name="area"
            type="text"
            placeholder="Search by Area (e.g., Ameerpet)"
            value={filters.area}
            onChange={handleChange}
          />
          <input
            name="service"
            type="text"
            placeholder="Search by Service (e.g., Plumber)"
            value={filters.service}
            onChange={handleChange}
          />
          <input
            name="name"
            type="text"
            placeholder="Search by Name"
            value={filters.name}
            onChange={handleChange}
          />
          <button onClick={search}>Search</button>
        </div>
      </div>

      {results.length === 0 && (
        <p style={{ textAlign: 'center', color: '#999' }}>No services found.</p>
      )}

      {results.length > 0 &&
        results.map((s) => (
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
