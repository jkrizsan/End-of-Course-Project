import yfinance as yf
import pandas as pd
from datetime import datetime, timedelta
from models.stock_model import StockModel


class StockService:
    def get_stock_data(self, stock, start_date=None, end_date=None, time_format='day', indicator=None):
        start_date, end_date = self._set_default_dates(start_date, end_date)

        try:
            stock_data = yf.download(stock, start=start_date, end=end_date)

            if stock_data.empty:
                return {'error': 'Stock data not found'}, 404

            stock_data.reset_index(inplace=True)
            stock_data.columns = [col[0] if isinstance(col, tuple) else col for col in stock_data.columns]

            model = StockModel(stock_data)

            # Aggregate stock data
            aggregated_data = model.aggregate_data(time_format)

            # Calculate indicators if requested
            if indicator:
                self._calculate_indicators(model, indicator)

            aggregated_data['Date'] = aggregated_data['Date'].dt.strftime('%Y-%m-%d')

            return model.to_dict()
        except Exception as e:
            print(f"Error fetching stock data: {e}")  # Log the error
            return {'error': str(e)}, 500

    def _set_default_dates(self, start_date, end_date):
        if start_date is None:
            end_date = datetime.now()
            start_date = end_date - timedelta(days=60)
        return start_date, end_date

    def _calculate_indicators(self, model, indicator):
        if indicator == 'SMA' or indicator is None:
            model.calculate_sma()
        if indicator == 'EMA':
            model.calculate_ema()
        if indicator == 'BOLL':
            model.calculate_bollinger_bands()