import yfinance as yf
import pandas as pd
from datetime import datetime, timedelta
from models.stock_model import StockModel

class StockService:
    def get_stock_data(self, stock: str, start_date: str = None, end_date: str = None, time_format: str = 'day', indicator: str = None) -> dict:
        """Fetch and return stock data based on the parameters."""
        start_date, end_date = self._set_default_dates(start_date, end_date)

        try:
            stock_data = yf.download(stock, start=start_date, end=end_date)

            if stock_data.empty:
                return {'error': 'Stock data not found'}, 404

            stock_data.reset_index(inplace=True)
            stock_data.columns = [col[0] if isinstance(col, tuple) else col for col in stock_data.columns]

            # Create the model
            model = StockModel(stock_data)

            # Ensure 'Date' is in datetime format
            model.data['Date'] = pd.to_datetime(model.data['Date'])

            # Aggregate stock data
            aggregated_data = model.aggregate_data(time_format)

            # Create a new model with aggregated data
            aggregated_model = StockModel(aggregated_data)

            # Calculate indicators if requested
            if indicator:
                self._calculate_indicators(aggregated_model, indicator)

            aggregated_model.data['Date'] = aggregated_model.data['Date'].dt.strftime('%Y-%m-%d')

            return aggregated_model.to_dict()
        except Exception as e:
            print(f"Error fetching stock data: {e}")  # Log the error
            return {'error': str(e)}, 500

    def _set_default_dates(self, start_date: str, end_date: str) -> tuple:
        """Set default start and end dates if not provided."""
        if start_date is None:
            end_date = datetime.now()
            start_date = end_date - timedelta(days=60)
        return start_date, end_date

    def _calculate_indicators(self, model: StockModel, indicator: str) -> None:
        """Calculate the requested indicators."""
        if indicator == 'SMA' or indicator is None:
            model.calculate_sma()
        if indicator == 'EMA':
            model.calculate_ema()
        if indicator == 'BOLL':
            model.calculate_bollinger_bands()