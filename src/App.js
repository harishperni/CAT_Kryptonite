import React, { useState } from 'react';
import SearchBar from './SearchBar'; // Importing the SearchBar component
import Footer from './components/Footer'; // Importing the Footer component
import axios from 'axios'; // Importing axios for making HTTP requests
//import Navbar from './components/Navbar'; // Import the Navbar component
import './App.css'; // Importing the CSS file for styling

function App() {
  // State variables to manage search results and errors
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  // Function to handle form submissions
  const handleSubmit = async (query) => {
    try {
      // Clear previous results
      setResults([]);
      // Send a GET request to the server with the search query
      const response = await axios.get(`http://localhost:5002/structures?q=${query}`);
      // Update state with the received data if there are results
      if (response.data.length === 0) {
        setError('No results found for the specified query.');
      } else {
        setResults(response.data);
        setError('');
      }
    } catch (error) {
      // Handle errors if the request fails
      console.error('Error fetching data:', error);
      setError('An error occurred while fetching data.');
    }
  };

  return (
    <div className="container">
            <Navbar/> {/* Include the Navbar component */}

      <div className="App">
        {/* Display the main heading */}
        <h1>Structure Search</h1>
        {/* Render the SearchBar component and pass the handleSubmit function */}
        <SearchBar onSubmit={handleSubmit} />
        {/* Display error message if there is an error */}
        {error && <p className="error">{error}</p>}
        {/* Render the search results */}
        <ul>
          {results.map((structure, index) => (
            <li key={index}>
              {/* Display details of each structure */}
              <p>Structure ID: {structure.structure_id}</p>
              <p>Structure Type: {structure.structure_type}</p>
              <p>User ID: {structure.user_id}</p>
              <p>Tags: {structure.tags.join(', ')}</p>
              <p>Price: ${structure.price}</p>
              <p>Number of Rooms: {structure.number_of_rooms}</p>
              <p>Designed by: {structure.designed_by}</p>
              <p>Dimensions in sq.ft: {structure.dimensions_in_sqft}</p>
            </li>
          ))}
        </ul>
        {/* Render the Footer component */}
        <Footer />
      </div>
    </div>
  );
}

export default App;
