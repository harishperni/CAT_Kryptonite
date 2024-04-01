// App.js

import React, { useState } from 'react';
import SearchBar from './SearchBar';
import axios from 'axios';
import './App.css';

function App() {
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (query) => {
    try {
      // Clear previous results
      setResults([]);
      const response = await axios.get(`http://localhost:5002/structures?q=${query}`);
      if (response.data.length === 0) {
        setError('No results found.');
      } else {
        setResults(response.data);
        setError('');
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred while fetching data.');
    }
  };

  return (
    <div className="container">
      <div className="App">
        <h1>Structure Search</h1>
        <SearchBar onSubmit={handleSubmit} />
        {error && <p className="error">{error}</p>}
        <ul>
          {results.map((structure, index) => (
            <li key={index}>
              <p>Structure ID: {structure.structure_id}</p>
              <p>Structure Type: {structure.structure_type}</p>
              <p>User ID: {structure.user_id}</p>
              <p>Tags: {structure.tags.join(', ')}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
