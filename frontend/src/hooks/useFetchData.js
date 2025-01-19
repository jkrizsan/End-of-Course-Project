import { useState, useEffect, useCallback } from 'react';
import { fetchStockData } from '../api';

const useFetchData = (initialStock, initialStartDate, initialEndDate, initialFormat, initialIndicators) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchData = useCallback(async (stock, startDate, endDate, format, indicators) => {
        setLoading(true);
        setError('');
        try {
            const responseData = await fetchStockData(stock, startDate, endDate, format, indicators);
            if (Array.isArray(responseData) && responseData.length > 0) {
                const transformedData = responseData.map(item => ({
                    date: new Date(item.Date),
                    open: item.Open,
                    high: item.High,
                    low: item.Low,
                    close: item.Close,
                    volume: item.Volume,
                    SMA: item.SMA !== null && !isNaN(item.SMA) ? item.SMA : null,
                    EMA: item.EMA || null,
                    'Upper Band': item['Upper Band'],
                    'Lower Band': item['Lower Band'],
                    'Middle Band': item['Middle Band'],
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
    }, []);

    // Initial fetch on mount
    useEffect(() => {
        fetchData(initialStock, initialStartDate, initialEndDate, initialFormat, initialIndicators);
    }, [initialStock, initialStartDate, initialEndDate, initialFormat, initialIndicators, fetchData]);

    return { data, loading, error, refetch: fetchData };  // Return refetch function
};

export default useFetchData;