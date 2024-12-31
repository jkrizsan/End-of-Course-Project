import yfinance as yf
import pandas as pd
from datetime import datetime, timedelta

class StockService:
    def get_stock_data(self, stock, start_date=None, end_date=None):
        if start_date is None:
            end_date = datetime.now()
            start_date = end_date - timedelta(days=60)

        try:
            stock_data = yf.download(stock, start=start_date, end=end_date)

            # Print the stock data for debugging
            print(stock_data)

            if not stock_data.empty:
                # Reset the index to flatten the DataFrame
                stock_data.reset_index(inplace=True)

                # Flatten the column names if necessary
                stock_data.columns = ['_'.join(map(str, col)).strip() if isinstance(col, tuple) else col for col in stock_data.columns.values]

                # Convert the DataFrame to a dictionary format
                return stock_data.to_dict(orient='records')
            return {'error': 'Stock data not found'}, 404
        except Exception as e:
            return {'error': str(e)}, 500