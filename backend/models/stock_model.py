import pandas as pd

class StockModel:
    def __init__(self, data: pd.DataFrame):
        self.data = data

    def aggregate_data(self, time_format: str) -> pd.DataFrame:
        """Aggregate stock data based on the specified time format."""
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

    def calculate_sma(self, window: int = 14) -> None:
        """Calculate the Simple Moving Average (SMA)."""
        if len(self.data) >= window:
            self.data['SMA'] = self.data['Close'].rolling(window=window).mean()
        else:
            self.data['SMA'] = 0.0
        self.data['SMA'] = self.data['SMA'].fillna(0.0)

    def calculate_ema(self, span: int = 14) -> None:
        """Calculate the Exponential Moving Average (EMA)."""
        self.data['EMA'] = self.data['Close'].ewm(span=span, adjust=False).mean()

    def calculate_bollinger_bands(self, window: int = 20, k: int = 2) -> None:
        """Calculate Bollinger Bands."""
        self.data['Middle Band'] = self.data['Close'].rolling(window=window).mean()
        self.data['Upper Band'] = self.data['Middle Band'] + (k * self.data['Close'].rolling(window=window).std())
        self.data['Lower Band'] = self.data['Middle Band'] - (k * self.data['Close'].rolling(window=window).std())

        # Fill NaN values with 0.0 for all bands
        self.data['Upper Band'] = self.data['Upper Band'].fillna(0.0)
        self.data['Lower Band'] = self.data['Lower Band'].fillna(0.0)
        self.data['Middle Band'] = self.data['Middle Band'].fillna(0.0)

    def to_dict(self) -> list:
        """Convert the DataFrame to a list of dictionaries."""
        return self.data.to_dict(orient='records')