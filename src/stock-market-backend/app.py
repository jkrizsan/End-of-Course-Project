from flask import Flask
from flask_restful import Api
from routes.stock_routes import StockResource
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

print(app.config)

api = Api(app)

api.add_resource(StockResource, '/api/stocks/<string:stock>')


if __name__ == '__main__':
    app.run(debug=True)