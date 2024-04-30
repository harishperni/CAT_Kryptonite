import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import Footer from './components/Footer';
import axios from 'axios';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [structureTypeFilter, setStructureTypeFilter] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(3000);
  const [minSqft, setMinSqft] = useState(0);
  const [maxSqft, setMaxSqft] = useState(5000);

  const handleSubmit = async (query) => {
    try {
      setResults([]);
      const response = await axios.get(`http://localhost:5002/structures?q=${query}&structureType=${structureTypeFilter}&minPrice=${minPrice}&maxPrice=${maxPrice}&minSqft=${minSqft}&maxSqft=${maxSqft}`);
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

  useEffect(() => {
    handleSubmit('');
  }, [structureTypeFilter, minPrice, maxPrice, minSqft, maxSqft]);

  return (
    <div className="container">
      <Navbar />
      <div className="App">
        <h1>Structure Search</h1>
        <SearchBar onSubmit={handleSubmit} />
        {error && <p className="error">{error}</p>}
        <div className="filters">
          <h2>Filters</h2>
          <div className="filter-group">
            <label>Structure Type: </label>
            <select value={structureTypeFilter} onChange={(e) => setStructureTypeFilter(e.target.value)}>
              <option value="">All</option>
              <option value="office">Office</option>
              <option value="residential">Residential</option>
              {/* Add more options as needed */}
            </select>
          </div>
          <br></br>
          <div className="filter-group">
            <label>Price Range:</label>
            <input type="range" min="0" max="3000" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
            <br></br>
            <p>Minimum Price: ${minPrice}</p>
            <input type="range" min="0" max="3000" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
            <p>Maximum Price: ${maxPrice}</p>
          </div>

        </div>
        <ul>
          {results.map((structure, index) => (
            <li key={index}>
              <p>Structure ID: {structure.structure_id}</p>
              <p>Structure Type: {structure.structure_type}</p>
              <p>User ID: {structure.user_id}</p>
              <p>Tags: {structure.tags.join(', ')}</p>
              <p>Price: ${structure.price}</p>
              <p>Number of Rooms: {structure.number_of_rooms}</p>
              <p>Designed by: {structure.designed_by}</p>
              <p>Dimensions in sq.ft: {structure.dimensions_in_sqft}</p>
              <div className="images">
                {JSON.parse(structure.images).map((image, i) => (
                  <img key={i} src={image} alt={`Image ${i}`} />
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
}

export default App;
