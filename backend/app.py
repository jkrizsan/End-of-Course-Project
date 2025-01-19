import json
from flask import Flask
from flask_restful import Api
from routes.stock_routes import StockResource
from flask_cors import CORS

# Load configuration from JSON file
def load_config():
    with open('config.json') as config_file:
        return json.load(config_file)

config = load_config()

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": config['CORS_ORIGINS']}})  # Use the configured origin

api = Api(app)
api.add_resource(StockResource, '/api/stocks/<string:stock>')

if __name__ == '__main__':
    app.run(debug=config['DEBUG'])  # Use the configured debug setting