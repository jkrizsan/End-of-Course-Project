import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000/api/stocks';

export const fetchStockData = async (stock, start, end, format, indicators) => {
    const response = await axios.get(
        `${API_BASE_URL}/${stock}?start_date=${start.toISOString().split('T')[0]}&end_date=${end.toISOString().split('T')[0]}&time_format=${format}&indicator=${indicators.join(',')}`
    );
    return response.data;
};