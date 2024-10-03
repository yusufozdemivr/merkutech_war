from flask import Flask, jsonify
import requests
from bs4 import BeautifulSoup
import re
from threading import Timer

app = Flask(__name__)

# Variable to store parsed data
parsed_data = {}

# Function to scrape and parse the Wikipedia page
def scrape_data():
    global parsed_data
    try:
        response = requests.get("https://tr.wikipedia.org/wiki/Hamas-%C4%B0srail_Sava%C5%9F%C4%B1")
        html = response.text
        soup = BeautifulSoup(html, 'html.parser')
        
        # Extract the casualties section (update the index as needed)
        casualties_html = soup.find_all('tr')[18]  # Adjust this if the index changes
        casualties_text = casualties_html.get_text()
        
        # Find the numbers using regex
        matches = re.findall(r'(\d+\.?\d*)\+', casualties_text)
        
        # Parse and store the data
        parsed_data = {
            'palestine': {
                'killed': matches[0],
                'injured': matches[1],
                'missing': matches[2]
            },
            'israel': {
                'killed': matches[3],
                'injured': matches[4],
                'missing': matches[5],
                'abducted': matches[6]
            }
        }
        print("Data updated:", parsed_data)
    except Exception as e:
        print("Error while scraping:", e)

# Timer function to refresh data every 10 minutes
def refresh_data():
    scrape_data()
    Timer(600, refresh_data).start()  # Refresh every 600 seconds (10 minutes)

# Flask route to expose the parsed data via an API endpoint
@app.route('/casualties', methods=['GET'])
def get_casualties():
    return jsonify(parsed_data)

if __name__ == '__main__':
    scrape_data()  # Initial data scrape
    refresh_data()  # Start the periodic refresh
    app.run(debug=True)
