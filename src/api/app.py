from flask import Flask, jsonify
import pandas as pd

app = Flask(__name__)

# Load datasets
dataset = [
    "./data/afghanistan.csv",
    "./data/israel.csv",
    "./data/syrian.csv",
    "./data/ukraine.csv",
]

# Helper function to add unique id to each dataset
def load_and_add_id(filepath, country_name):
    df = pd.read_csv(filepath)
    df['id'] = [f"{country_name}_{i+1}" for i in range(len(df))]  # Add a unique id for each row
    return df.to_dict(orient='records')

# Load datasets and add unique id columns
data_afghanistan = load_and_add_id(dataset[0], 'AFG')
data_israel = load_and_add_id(dataset[1], 'ISR')
data_syrian = load_and_add_id(dataset[2], 'SYR')
data_ukraine = load_and_add_id(dataset[3], 'UKR')

# Merge all data into a single dictionary for convenience
merged_data = {
    "Israel": data_israel,
    "Afghanistan": data_afghanistan,
    "Syrian": data_syrian,
    "Ukraine": data_ukraine
}

@app.route('/')
def home():
    return "Conflict Data API"

@app.route('/api/all')
def all():
    return jsonify(merged_data)

@app.route('/api/afghanistan', methods=['GET'])
def get_afghanistan():
    return jsonify(data_afghanistan)

@app.route('/api/israel', methods=['GET'])
def get_israel():
    return jsonify(data_israel)

@app.route('/api/syrian', methods=['GET'])
def get_syrian():
    return jsonify(data_syrian)

@app.route('/api/ukraine', methods=['GET'])
def get_ukraine():
    return jsonify(data_ukraine)

if __name__ == '__main__':
    app.run(debug=True)
