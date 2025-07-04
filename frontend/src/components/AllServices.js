import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AllServices() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/services/search?area=')
      .then((res) => setServices(res.data));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold my-4">All Approved Services</h2>
      {services.map(s => (
        <div key={s.id} className="border p-3 mb-3 rounded shadow">
          <p><strong>{s.name}</strong> - {s.service}</p>
          <p>{s.area} - {s.phone}</p>
          <p>⭐ {s.rating?.toFixed(1)}</p>
        </div>
      ))}
    </div>
  );
}

export default AllServices;
