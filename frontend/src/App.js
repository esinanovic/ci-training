import React, { useState, useEffect } from 'react';

function App() {
  const [backendStatus, setBackendStatus] = useState('connecting');
  const [dbStatus, setDbStatus] = useState('checking');
  const [apiData, setApiData] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

  useEffect(() => {
    // On appelle directement /api/status qui vérifie Backend + DB
    fetch(`${API_URL}/api/status`)
      .then(response => {
        if (!response.ok) throw new Error('Server error');
        return response.json();
      })
      .then(data => {
        setApiData(data);
        setBackendStatus('Connected');
        // On vérifie si la DB est marquée connectée dans la réponse
        if (data.data?.database?.connected) {
          setDbStatus('Connected');
        } else {
          setDbStatus('Disconnected');
        }
      })
      .catch(error => {
        setBackendStatus('Failed');
        setDbStatus('Unknown');
        console.error('API Error:', error);
      });
  }, [API_URL]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Docker CI/CD Demo</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Statut Backend */}
        <div style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '8px', 
             backgroundColor: backendStatus === 'Connected' ? '#e6fffa' : '#fff5f5' }}>
          <h2>Backend</h2>
          <p>Status: <strong>{backendStatus}</strong></p>
          <p>URL: <code>{API_URL}</code></p>
        </div>

        {/* Statut Database */}
        <div style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '8px', 
             backgroundColor: dbStatus === 'Connected' ? '#e6fffa' : '#fff5f5' }}>
          <h2>Database</h2>
          <p>Status: <strong>{dbStatus}</strong></p>
          {apiData?.data?.database?.version && (
            <small>Ver: {apiData.data.database.version.split(',')[0]}</small>
          )}
        </div>
      </div>

      {/* Données brutes pour le debug */}
      <div style={{ marginTop: '20px', padding: '15px', background: '#f4f4f4', borderRadius: '5px' }}>
        <h3>Full API Response</h3>
        <pre style={{ fontSize: '12px', overflow: 'auto' }}>
          {apiData ? JSON.stringify(apiData, null, 2) : 'Loading data...'}
        </pre>
      </div>
    </div>
  );
}

export default App;