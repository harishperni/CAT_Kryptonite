import React, { useState } from 'react';
import SearchBar from './SearchBar';
import Footer from './components/Footer';
import axios from 'axios';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async (query) => {
    try {
      setResults([]);
      const response = await axios.get(`http://localhost:5002/structures?q=${query}`);
      if (response.data.length === 0) {
        setError('No results found for the specified query.');
      } else {
        setResults(response.data);
        setError('');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('An error occurred while fetching data.');
    }
  };

  return (
    <div className="container">
      <Navbar />
      <div className="App">
        <h1>Structure Search</h1>
        <SearchBar onSubmit={handleSubmit} />
        {error && <p className="error">{error}</p>}
        <div className="tiles-container">
          {results.map((structure, index) => (
            <a key={index} href={`https://www.google.com`} className="tile-link">
              <div className="tile">
                <p>Structure ID: {structure.structure_id}</p>
                <p>Structure Type: {structure.structure_type}</p>
                <p>User ID: {structure.user_id}</p>
                <p>Tags: {structure.tags.join(', ')}</p>
                <p>Price: ${structure.price}</p>
                <p>Number of Rooms: {structure.number_of_rooms}</p>
                <p>Designed by: {structure.designed_by}</p>
                <p>Dimensions in sq.ft: {structure.dimensions_in_sqft}</p>
              </div>
            </a>
          ))}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
