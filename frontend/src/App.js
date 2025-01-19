import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CandlestickChart from './components/CandlestickChart';
import Dropdown from './components/Dropdown';
import DatePickerComponent from './components/DatePicker';
import TechnicalIndicators from './components/TechnicalIndicators';
import TimeFormatDropdown from './components/TimeFormatDropdown';
import './styles.css';

const App = () => {
    const [selectedStock, setSelectedStock] = useState('AAPL');
    const [startDate, setStartDate] = useState(new Date('2022-01-01'));
    const [endDate, setEndDate] = useState(new Date());
    const [data, setData] = useState([]);
    const [indicators, setIndicators] = useState([]);
    const [selectedFormat, setSelectedFormat] = useState('day');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const stocks = ['AAPL', 'META', '^GSPC'];
    const stockOptions = {
        AAPL: "Apple",
        META: "Facebook",
        "^GSPC": "S&P 500",
    };
    const timeFormats = ['day', 'week', 'month'];

    const fetchData = async (stock, start, end, format, indicators) => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.get(
                `http://127.0.0.1:5000/api/stocks/${stock}?start_date=${start.toISOString().split('T')[0]}&end_date=${end.toISOString().split('T')[0]}&time_format=${format}&indicator=${indicators.join(',')}`
            );

            if (Array.isArray(response.data) && response.data.length > 0) {
                const transformedData = response.data.map(item => ({
				date: new Date(item.Date),
				open: item.Open,
				high: item.High,
				low: item.Low,
				close: item.Close,
				volume: item.Volume,
				SMA: item.SMA !== null && !isNaN(item.SMA) ? item.SMA : null,
				EMA: item.EMA || null,
				'Upper Band': item['Upper Band'], // Added Upper Band
				'Lower Band': item['Lower Band'], // Added Lower Band
				'Middle Band': item['Middle Band'], // Added Middle Band
			}));

                setData(transformedData);
            } else {
                setData([]);
            }
        } catch (error) {
            console.error("Error fetching data: ", error);
            setError('Error fetching stock data. Please try again.');
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchDataOnMount = async () => {
            await fetchData(selectedStock, startDate, endDate, selectedFormat, indicators);
        };

        fetchDataOnMount();
    }, [selectedStock, startDate, endDate, selectedFormat, indicators]);

    return (
        <div className="App">
            <h1>Stock Market Data</h1>
            {error && <div className="error">{error}</div>}
            {loading && <div className="loading">Loading...</div>}
            <Dropdown stocks={stocks} selectedStock={selectedStock} setSelectedStock={setSelectedStock} stockOptions={stockOptions} />
            <DatePickerComponent startDate={startDate} setStartDate={setStartDate} />
            <DatePickerComponent startDate={endDate} setStartDate={setEndDate} />
            <TimeFormatDropdown timeFormats={timeFormats} selectedFormat={selectedFormat} setSelectedFormat={setSelectedFormat} />
            <TechnicalIndicators indicators={indicators} setIndicators={setIndicators} fetchData={fetchData} selectedStock={selectedStock} startDate={startDate} endDate={endDate} selectedFormat={selectedFormat} />
            {data.length > 0 ? (
                <CandlestickChart data={data} width={800} height={400} indicators={indicators} />
            ) : (
                <div>No data available for the selected stock.</div>
            )}
        </div>
    );
};

export default App;