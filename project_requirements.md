# Project Requirements

## Architecture Overview
- Frontend: React
- Backend: Python REST APIs

## Frontend Features
- The UI should display the market prices for Apple, Facebook, and S&P 500 stocks, which can be selected from a dropdown list.
- The UI should display the market prices as candlesticks; a red candle indicates a bear market, while a green candle represents bull market movements.
- Users can set the time window using a date picker, which includes an "Apply" button.
- Users can select the time format (what each candle represents) from a dropdown list. Supported formats: day, week, month.
- Users can add technical indicators from a provided list.
- Users should be able to zoom in/out on the price chart.
- Supported Indicators: RSI 14, Bollinger Bands, SMA (users can add more than one and set the time period individually).
- A button for a menu allows users to set up AI training details, time window, prediction days, etc.
- A button to forecast market prices for up to 3 days. The forecast should be based on a 60-day prediction period.
- The forecast button is not available until the training is complete.
- The forecasted prices must be viewable on the same chart as the historical data, displayed as bullet points.
- Loading effect: After the user performs any actions, a loading effect should be shown until the action is completed.
- The UI will use REST APIs to access data from the backend.
- In case of any errors, the UI must display a basic error message along with an "OK" button for acknowledgment. Technical details do not need to be displayed.

## Backend Features
- Python REST APIs should return meaningful response codes, such as 200 OK, etc.
- Market prices must be loaded from an open market API (e.g., Yahoo Finance).
- The backend must be able to store data in case the user wants to add indicators or forecast market trends.
- The backend must be able to calculate indicator values (RSI 14, Bollinger Bands, SMA with multiple time period options).
- If a user requests to forecast market prices, the system should choose at least a 1-year training period.
- Follow clean code principles, SOLID design principles, and best practices for design patterns.
- The code needs to be unit testable, and unit tests should be generated for it.
- Generate Postman integration tests.