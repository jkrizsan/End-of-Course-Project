# Project Requirements

## Architecture Overview
- Frontend: React
- Backend: Python REST APIs

## Frontend Features
- The UI should display the market prices for Apple, Facebook, and S&P 500 stocks, which can be selected from a dropdown list.
- The UI should display the market prices as candlesticks; a red candle indicates a bear market, while a green candle represents bull market movements.
- Users can set the time window using a date picker.
- Users can select the time format (what each candle represents) from a dropdown list. Supported formats: day, week, month.
- Users can add technical indicators from a provided list.
- Users should be able to zoom in/out on the price chart.
- Supported Indicators: Bollinger Bands, SMA and EMA.
- The UI will use REST APIs to access data from the backend.
- In case of any errors, the UI must display a basic error message along with an "OK" button for acknowledgment. Technical details do not need to be displayed.

## Backend Features
- Python REST APIs should return meaningful response codes, such as 200 OK, etc.
- Market prices must be loaded from an open market API (e.g., Yahoo Finance).
- The backend must be able to calculate indicator values (Bollinger Bands, SMA and EMA).
- Follow clean code principles, SOLID design principles, and best practices for design patterns.
- The code needs to be unit testable.
