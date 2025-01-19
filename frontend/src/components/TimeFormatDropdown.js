import React from 'react';

const TimeFormatDropdown = ({ timeFormats, selectedFormat, setSelectedFormat }) => {
  return (
    <select value={selectedFormat} onChange={(e) => setSelectedFormat(e.target.value)}>
      {timeFormats.map((format) => (
        <option key={format} value={format}>
          {format}
        </option>
      ))}
    </select>
  );
};

export default TimeFormatDropdown;