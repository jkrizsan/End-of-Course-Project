from flask import Flask, jsonify, request
from flask_restful import Api, Resource
from services.stock_service import StockService
from datetime import datetime

class StockResource(Resource):
    def __init__(self):
        self.service = StockService()

    def get(self, stock):
        start_date = request.args.get('start_date')
        end_date = request.args.get('end_date')

        # Validate the date format if provided
        if start_date:
            try:
                datetime.strptime(start_date, '%Y-%m-%d')
            except ValueError:
                return {'error': 'Invalid start_date format. Use YYYY-MM-DD.'}, 400

        if end_date:
            try:
                datetime.strptime(end_date, '%Y-%m-%d')
            except ValueError:
                return {'error': 'Invalid end_date format. Use YYYY-MM-DD.'}, 400

        # Get stock data from the service
        data = self.service.get_stock_data(stock, start_date, end_date)
        return jsonify(data)