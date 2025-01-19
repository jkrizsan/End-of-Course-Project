import React, { useState } from 'react';
import CandlestickChart from './components/Chart/CandlestickChart';
import Dropdown from './components/Dropdown/Dropdown';
import DatePickerComponent from './components/DatePicker/DatePickerComponent';
import TechnicalIndicators from './components/Indicators/TechnicalIndicators';
import TimeFormatDropdown from './components/TimeFormatDropdown/TimeFormatDropdown';
import useFetchData from './hooks/useFetchData';
import './styles.css';

const App = () => {
    const [selectedStock, setSelectedStock] = useState('AAPL');
    const [startDate, setStartDate] = useState(new Date('2022-01-01'));
    const [endDate, setEndDate] = useState(new Date());
    const [indicators, setIndicators] = useState([]);
    const [selectedFormat, setSelectedFormat] = useState('day');

    const { data, loading, error, refetch } = useFetchData(selectedStock, startDate, endDate, selectedFormat, indicators);

    const stocks = ['AAPL', 'META', '^GSPC'];
    const stockOptions = {
        AAPL: "Apple",
        META: "Facebook",
        "^GSPC": "S&P 500",
    };
    const timeFormats = ['day', 'week', 'month'];

    const handleIndicatorChange = (updatedIndicators) => {
        setIndicators(updatedIndicators);
        refetch(selectedStock, startDate, endDate, selectedFormat, updatedIndicators); // Call refetch with updated indicators
    };

    return (
        <div className="App">
            <h1>Stock Market Data</h1>
            {error && <div className="error">{error}</div>}
            {loading && <div className="loading">Loading...</div>}
            <Dropdown stocks={stocks} selectedStock={selectedStock} setSelectedStock={setSelectedStock} stockOptions={stockOptions} />
            <DatePickerComponent startDate={startDate} setStartDate={setStartDate} />
            <DatePickerComponent startDate={endDate} setStartDate={setEndDate} />
            <TimeFormatDropdown timeFormats={timeFormats} selectedFormat={selectedFormat} setSelectedFormat={setSelectedFormat} />
            <TechnicalIndicators indicators={indicators} setIndicators={handleIndicatorChange} />
            {data.length > 0 ? (
                <CandlestickChart data={data} width={800} height={400} indicators={indicators} />
            ) : (
                <div>No data available for the selected stock.</div>
            )}
        </div>
    );
};

export default App;