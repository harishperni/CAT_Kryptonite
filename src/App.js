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
  const [numberOfRooms, setNumberOfRooms] = useState(0); // Initialize with a numeric value

  const handleSubmit = async (query) => {
    try {
      setResults([]);
      const response = await axios.get(`http://localhost:5002/structures?q=${query}&structureType=${structureTypeFilter}&minPrice=${minPrice}&maxPrice=${maxPrice}&minSqft=${minSqft}&maxSqft=${maxSqft}&numRooms=${numberOfRooms}`);
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
  }, [structureTypeFilter, minPrice, maxPrice, minSqft, maxSqft, numberOfRooms]);

  return (
    <div className="container">
      <Navbar />
      <div className="App">
        <center><h1>Structure Search</h1></center>
        <SearchBar onSubmit={handleSubmit} />
        {error && <p className="error">{error}</p>}
        <div className="filters">
          <div className="filter-column">
            <h2>Structure Type</h2>
            <select value={structureTypeFilter} onChange={(e) => setStructureTypeFilter(e.target.value)}>
              <option value="">All</option>
              <option value="office">Office</option>
              <option value="residential">Residential</option>
            </select>
          </div>
          <div className="filter-column">
            <h2>Price Range</h2>
            <input type="range" min="0" max="3000" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
            <p>Min: ${minPrice}</p>
            <input type="range" min="0" max="3000" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
            <p>Max: ${maxPrice}</p>
          </div>
          <div className="filter-column">
            <h2>Number of Rooms</h2>
            <input type="range" min="1" max="10" value={numberOfRooms} onChange={(e) => setNumberOfRooms(e.target.value)} />
            <p>Number of Rooms: {numberOfRooms}</p>
          </div>
          <div className="filter-column">
            <h2>Sq.ft Range</h2>
            <input type="range" min="0" max="5000" value={minSqft} onChange={(e) => setMinSqft(e.target.value)} />
            <p>Min: {minSqft} sq.ft</p>
            <input type="range" min="0" max="5000" value={maxSqft} onChange={(e) => setMaxSqft(e.target.value)} />
            <p>Max: {maxSqft} sq.ft</p>
          </div>
        </div>
        <ul className="results">
          {results.map((structure, index) => (
            <li key={index} className="result-item">
              <p><strong>Structure ID:</strong> {structure.structure_id}</p>
              <p><strong>Structure Type:</strong> {structure.structure_type}</p>
              <p><strong>User ID:</strong> {structure.user_id}</p>
              <p><strong>Tags:</strong> {structure.tags.join(', ')}</p>
              <p><strong>Price:</strong> ${structure.price}</p>
              <p><strong>Number of Rooms:</strong> {structure.number_of_rooms}</p>
              <p><strong>Designed by:</strong> {structure.designed_by}</p>
              <p><strong>Dimensions in sq.ft:</strong> {structure.dimensions_in_sqft}</p>
              <div className="images">
                {JSON.parse(structure.images).map((image, i) => (
                  <img key={i} src={image} alt={`Image ${i}`} className="result-image" />
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
