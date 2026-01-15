// src/App.js
import React, { useState, useEffect } from 'react';

function App() {
  const [backendStatus, setBackendStatus] = useState('loading');
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    // Teste la connexion au backend
    fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/health`)
      .then(response => response.json())
      .then(data => {
        setBackendStatus('Connected to backend!');
        setApiData(data);
      })
      .catch(error => {
        setBackendStatus('Backend connection failed');
        console.error('API Error:', error);
      });
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Full-Stack Docker Deployment</h1>
      
      <div style={{ margin: '20px 0', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <h2>Frontend Status</h2>
        <p>React app is running on Railway</p>
        <p>API URL: <code>{process.env.REACT_APP_API_URL || 'Not configured'}</code></p>
      </div>

      <div style={{ margin: '20px 0', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <h2>Backend Connection</h2>
        <p>{backendStatus}</p>
        {apiData && (
          <div>
            <p>Backend response:</p>
            <pre>{JSON.stringify(apiData, null, 2)}</pre>
          </div>
        )}
      </div>

      <div style={{ margin: '20px 0', padding: '15px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <h2>Test API Endpoints</h2>
        <button onClick={() => fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/`)}>
          Test Root Endpoint
        </button>
        <button onClick={() => fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/health`)}>
          Test Health Check
        </button>
      </div>
    </div>
  );
}

export default App;