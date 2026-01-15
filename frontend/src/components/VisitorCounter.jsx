import React, { useState, useEffect } from 'react';

export default function VisitorCounter() {
  const [count, setCount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get API endpoint - use fallback if env var is missing
    const apiUrl = import.meta.env.VITE_API_ENDPOINT || 
                   'https://4jkx5dyd21.execute-api.us-east-1.amazonaws.com/counter';
    
    console.log('VisitorCounter: API URL from env:', import.meta.env.VITE_API_ENDPOINT);
    console.log('VisitorCounter: Using API URL:', apiUrl);
    
    // First, increment the counter (POST)
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
    })
    .then(response => {
      console.log('VisitorCounter: Response status', response.status);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('VisitorCounter: API response data', data);
      const countValue = data.count || 0;
      console.log('VisitorCounter: Setting count to', countValue);
      setCount(countValue);
      setLoading(false);
    })
    .catch(err => {
      console.error('VisitorCounter: Error fetching visitor count', err);
      setError(err.message);
      // Don't fail completely - show 0 or last known count
      setCount(0);
      setLoading(false);
    });
  }, []);

  // Always show something, even if there's an error
  return (
    <div className="visitor-counter">
      <span className="visitor-label">Visitors: </span>
      <span className="visitor-number">
        {loading ? '...' : (count?.toLocaleString() || '0')}
      </span>
      {error && import.meta.env.DEV && (
        <span style={{color: 'red', fontSize: '10px', display: 'block'}}>
          Error: {error}
        </span>
      )}
    </div>
  );
}