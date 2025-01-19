from flask import request, jsonify
from flask_restful import Resource
from services.stock_service import StockService
from datetime import datetime

class StockResource(Resource):
    def __init__(self):
        self.service = StockService()

    def get(self, stock):
        start_date = request.args.get('start_date')
        end_date = request.args.get('end_date')
        time_format = request.args.get('time_format', 'day')
        indicator = request.args.get('indicator')

        # Validate the date format if provided
        self._validate_date(start_date, 'start_date')
        self._validate_date(end_date, 'end_date')

        # Get stock data from the service
        data = self.service.get_stock_data(stock, start_date, end_date, time_format, indicator)
        return jsonify(data)

    def _validate_date(self, date_str, param_name):
        if date_str:
            try:
                datetime.strptime(date_str, '%Y-%m-%d')
            except ValueError:
                raise ValueError(f'Invalid {param_name} format. Use YYYY-MM-DD.')