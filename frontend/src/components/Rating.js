import React, { useState } from 'react';
import axios from 'axios';

function Rating({ id, rating }) {
  const [stars, setStars] = useState(0);

  const submitRating = async () => {
    if (stars === 0) return;
    await axios.post(`https://hyderabad-phonebook.onrender.com/api/services/rate/${id}`, { rating: stars });
    alert('Thanks for rating!');
  };

  return (
    <div className="rating-box">
  <p>Current Rating: {rating ? rating.toFixed(1) : 'No rating yet'}</p>
  <select onChange={(e) => setStars(Number(e.target.value))}>
    <option value={0}>Rate</option>
    {[1,2,3,4,5].map(n => (
      <option key={n} value={n}>{n} Star</option>
    ))}
  </select>
  <button onClick={submitRating}>Submit</button>
</div>

  );
}

export default Rating;

