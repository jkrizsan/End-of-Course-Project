import React from 'react';

const Dropdown = ({ stocks, selectedStock, setSelectedStock, stockOptions }) => {
  return (
    <select value={selectedStock} onChange={(e) => setSelectedStock(e.target.value)}>
      {stocks.map((stock) => (
        <option key={stock} value={stock}>
          {stockOptions[stock]}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;