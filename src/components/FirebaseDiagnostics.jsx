import React, { useState } from 'react';
import { runFirebaseDiagnostics, generateTroubleshootingSteps } from '../utils/firebaseDiagnostics';

const FirebaseDiagnostics = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const runDiagnostics = async () => {
    setLoading(true);
    setError(null);
    try {
      const diagnosticResults = await runFirebaseDiagnostics();
      setResults(diagnosticResults);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'connected': return 'green';
      case 'authenticated': return 'green';
      case 'read_only': return 'orange';
      case 'not_authenticated': return 'orange';
      case 'blocked': return 'red';
      case 'error': return 'red';
      default: return 'gray';
    }
  };

  const troubleshootingSteps = results ? generateTroubleshootingSteps(results) : [];

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Firebase Connectivity Diagnostics</h2>
      
      <button 
        onClick={runDiagnostics} 
        disabled={loading}
        style={{
          padding: '10px 20px',
          backgroundColor: loading ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: loading ? 'not-allowed' : 'pointer',
          marginBottom: '20px'
        }}
      >
        {loading ? 'Running Diagnostics...' : 'Run Diagnostics'}
      </button>

      {error && (
        <div style={{ color: 'red', padding: '10px', backgroundColor: '#ffebee', marginBottom: '20px' }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {results && (
        <div>
          <h3>Diagnostic Results</h3>
          
          {/* Network Status */}
          <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <h4>🌐 Network Connectivity</h4>
            <p>
              <strong>Status:</strong> 
              <span style={{ color: getStatusColor(results.network.status), marginLeft: '10px' }}>
                {results.network.status.toUpperCase()}
              </span>
            </p>
            {results.network.details.status && (
              <p><strong>HTTP Status:</strong> {results.network.details.status}</p>
            )}
            {results.network.details.error && (
              <p><strong>Error:</strong> {results.network.details.error}</p>
            )}
          </div>

          {/* Auth Status */}
          <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <h4>🔐 Authentication</h4>
            <p>
              <strong>Status:</strong> 
              <span style={{ color: getStatusColor(results.auth.status), marginLeft: '10px' }}>
                {results.auth.status.replace('_', ' ').toUpperCase()}
              </span>
            </p>
            {results.auth.details.email && (
              <p><strong>Email:</strong> {results.auth.details.email}</p>
            )}
            {results.auth.details.uid && (
              <p><strong>User ID:</strong> {results.auth.details.uid}</p>
            )}
            {results.auth.details.error && (
              <p><strong>Error:</strong> {results.auth.details.error}</p>
            )}
          </div>

          {/* Firestore Status */}
          <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
            <h4>🗄️ Firestore Database</h4>
            <p>
              <strong>Status:</strong> 
              <span style={{ color: getStatusColor(results.firestore.status), marginLeft: '10px' }}>
                {results.firestore.status.replace('_', ' ').toUpperCase()}
              </span>
            </p>
            {results.firestore.details.canRead !== undefined && (
              <p><strong>Can Read:</strong> {results.firestore.details.canRead ? 'Yes' : 'No'}</p>
            )}
            {results.firestore.details.canWrite !== undefined && (
              <p><strong>Can Write:</strong> {results.firestore.details.canWrite ? 'Yes' : 'No'}</p>
            )}
            {results.firestore.details.error && (
              <p><strong>Error:</strong> {results.firestore.details.error}</p>
            )}
            {results.firestore.details.code && (
              <p><strong>Error Code:</strong> {results.firestore.details.code}</p>
            )}
          </div>

          {/* Troubleshooting */}
          {troubleshootingSteps.length > 0 && (
            <div>
              <h3>🔧 Troubleshooting Steps</h3>
              {troubleshootingSteps.map((step, index) => (
                <div key={index} style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
                  <h4 style={{ color: '#dc3545' }}>{step.category}: {step.issue}</h4>
                  <ul>
                    {step.solutions.map((solution, solIndex) => (
                      <li key={solIndex} style={{ marginBottom: '5px' }}>{solution}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FirebaseDiagnostics;
