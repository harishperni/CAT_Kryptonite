import React, { useState } from 'react';
import '/Users/harishperni/test-app/client/src/components/SearchBar.css'; // Import the CSS file for styling

function SearchBar({ onSubmit }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setQuery(inputValue);
    // Add logic here to fetch suggestions based on the current input value
    // For example, make an API call or filter a list of suggestions locally
    const newSuggestions = getSuggestions(inputValue);
    setSuggestions(newSuggestions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(query);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setSuggestions([]); // Clear suggestions when a suggestion is clicked
  };

  const getSuggestions = (inputValue) => {
    // Example implementation of getting suggestions based on input value
    const suggestions = ['office', 'residential', 'apartment', 'commercial'];
    return suggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  return (
    <form className="SearchBar" onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search..."
        list="suggestions-list"
      />
      <datalist id="suggestions-list">
        {suggestions.map((suggestion, index) => (
          <option key={index} value={suggestion} />
        ))}
      </datalist>
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
