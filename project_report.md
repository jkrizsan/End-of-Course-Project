# Main Obstaclesents
- The Pre-Defined requirements were rather human readable/understandable than clear for LLM
- Sometimes had to show some real example (url, link) to explain what I want as a result from the LLM
- Sometimes LLM has not considered some issues as real problems,
  for ex.: NaN values in the JSON what received from the backend, LLM tried to fix it on the frontend however the issue
  was on the backend side.

# Results of the project
- Basic React website to display market prices for a couple of stocks
- User able to change the time window (start, end dates) and time period (what a candlestick represent, days, weeks,...)
- Also possible to add some basic indicators to the chart, it is useful for further stock analyses
- The business logic and data operations are implemented in a separated Python app, the UI access the data 
    from the backend via REST API calls

# Contribution with the LLM
- In iterative way, requested a new feature/fix, then implemented and checked the results myself, then explained the 
    issues to the LLM and requested to fix it, sometimes it took hours, but finally got the requested results
- I made some mistakes, for example when tried to explain the request considered LLM as a human being.
- Sometimes I requested too big features.
- I learned a lot about the work together with LLM
- Majority of the code was done by the LLM.

# Possible Next Steps
- Add more stock to display
- Add more indicators to display
- Make possible to display more indicators at the same time
- Enhance the indicators support with indicator signals display as well
- Add multiuser and authentication support
- Add stick price forecasting support