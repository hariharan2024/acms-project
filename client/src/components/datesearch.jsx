import React, { useState } from 'react';


const DateSearch = ({ handleDateSearch }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleStartDateChange = (event) => {
    const value = event.target.value;
    setStartDate(value);
  };

  const handleEndDateChange = (event) => {
    const value = event.target.value;
    setEndDate(value);
  };

  const handleSearch = () => {
    handleDateSearch(startDate, endDate);
  };

  return (
    <div>
      <label htmlFor="start-date">Start Date:</label>
      <input
        type="date"
        id="start-date"
        value={startDate}
        onChange={handleStartDateChange}
      />

      <label htmlFor="end-date">End Date:</label>
      <input
        type="date"
        id="end-date"
        value={endDate}
        onChange={handleEndDateChange}
      />

      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default DateSearch;
