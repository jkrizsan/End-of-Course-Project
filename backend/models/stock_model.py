import pandas as pd

class StockModel:
    def __init__(self, data):
        self.data = data

    def aggregate_data(self, time_format):
        if time_format == 'day':
            return self.data
        elif time_format == 'week':
            return self.data.resample('W-Mon', on='Date').agg({
                'Open': 'first',
                'High': 'max',
                'Low': 'min',
                'Close': 'last',
                'Volume': 'sum'
            }).reset_index()
        elif time_format == 'month':
            return self.data.resample('M', on='Date').agg({
                'Open': 'first',
                'High': 'max',
                'Low': 'min',
                'Close': 'last',
                'Volume': 'sum'
            }).reset_index()
        else:
            raise ValueError("Invalid time format")

    def calculate_sma(self, window=14):
        if len(self.data) >= window:
            self.data['SMA'] = self.data['Close'].rolling(window=window).mean()
        else:
            self.data['SMA'] = 0.0
        self.data['SMA'].fillna(0.0, inplace=True)

    def calculate_ema(self, span=14):
        self.data['EMA'] = self.data['Close'].ewm(span=span, adjust=False).mean()

    def calculate_bollinger_bands(self, window=20, k=2):
        self.data['Middle Band'] = self.data['Close'].rolling(window=window).mean()
        self.data['Upper Band'] = self.data['Middle Band'] + (k * self.data['Close'].rolling(window=window).std())
        self.data['Lower Band'] = self.data['Middle Band'] - (k * self.data['Close'].rolling(window=window).std())

        self.data['Upper Band'].fillna(0.0, inplace=True)
        self.data['Lower Band'].fillna(0.0, inplace=True)
        self.data['Middle Band'].fillna(0.0, inplace=True)

    def to_dict(self):
        return self.data.to_dict(orient='records')