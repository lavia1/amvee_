import React, { useState, useEffect } from "react";
import axios from 'axios';
import Fuse from "fuse.js"; // Import Fuse.js
import './search.css';

const Search = ({ onSearchResults }) => {
  const [searchQuery, setSearchQuery] = useState(''); 
  const [parts, setParts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchParts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/parts");
        setParts(response.data);
      } catch (error) {
        setError('Error fetching parts');
        console.error("Error fetching parts:", error);
      }
    };
    fetchParts();
  }, []);

  const handleSearch = () => {
    if (!searchQuery) {
      setError('Please enter a search term');
      onSearchResults([]);
      return;
    }

    setError('');

    const fuseOptions = {
      includeScore: true,
      keys: ["name", "part_number"], 
      threshold: 0.3, 
    };

    const fuse = new Fuse(parts, fuseOptions);
    let results = fuse.search(searchQuery).map(result => result.item);

    if (!results.length) {
      const partNumberResults = parts.filter(part =>
        part.part_number.toString().includes(searchQuery)
      );
      results = results.concat(partNumberResults);
    }

    results = Array.from(new Set(results.map(a => a.id))).map(id =>
      results.find(a => a.id === id)
    );

    onSearchResults(results);  
  };

  return (
    <div className="search-container">
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Hae nimellä tai varaosanumerolla"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />

        <button
          onClick={handleSearch}
          className="search-button fa fa-search"
        >
        </button>
      </div>

      {error && <p className="search-error">{error}</p>}
    </div>
  );
};

export default Search;
