import React, { useState } from 'react';

const Search = ({ handleSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    handleSearch(value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        style={{backgroundColor: "transparent", borderStyle: "solid", borderColor: "black", outline: "none", color: "black"}}
        onChange={handleChange}
        className='inputBox'
      />
    </div>
  );
};

export default Search;
