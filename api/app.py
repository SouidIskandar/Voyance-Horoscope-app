from flask import Flask, jsonify
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
import re

app = Flask(__name__)
CORS(app)

def clean_text(text):
    # Remove extra whitespace and newlines
    return re.sub(r'\s+', ' ', text).strip()

def scrape_horoscope(sign, timeframe='daily'):
    url = f'https://www.horoscope.com/us/horoscopes/general/horoscope-general-daily-{timeframe}.aspx?sign={sign}'
    
    try:
        response = requests.get(url)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Find the main prediction text
        prediction_div = soup.find('div', class_='main-horoscope')
        if prediction_div:
            prediction = clean_text(prediction_div.p.text)
        else:
            prediction = "Unable to fetch horoscope prediction at this time."

        # Generate some additional data based on the text length
        text_length = len(prediction)
        lucky_number = (text_length % 9) + 1
        
        # Map numbers to colors for lucky color
        colors = ['Red', 'Blue', 'Green', 'Purple', 'Orange', 'Yellow', 'Pink', 'White', 'Black']
        lucky_color = colors[lucky_number - 1]
        
        # Map numbers to moods
        moods = ['Energetic', 'Calm', 'Inspired', 'Focused', 'Creative', 'Peaceful', 'Excited', 'Balanced', 'Motivated']
        mood = moods[lucky_number - 1]
        
        return {
            'prediction': prediction,
            'lucky_number': lucky_number,
            'lucky_color': lucky_color,
            'mood': mood
        }
    except Exception as e:
        return {
            'prediction': 'Unable to fetch horoscope at this time. Please try again later.',
            'lucky_number': 7,
            'lucky_color': 'Blue',
            'mood': 'Contemplative'
        }

@app.route('/horoscope/<sign>/<timeframe>')
def get_horoscope(sign, timeframe):
    # Map zodiac signs to their corresponding numbers on horoscope.com
    sign_numbers = {
        'aries': 1, 'taurus': 2, 'gemini': 3, 'cancer': 4,
        'leo': 5, 'virgo': 6, 'libra': 7, 'scorpio': 8,
        'sagittarius': 9, 'capricorn': 10, 'aquarius': 11, 'pisces': 12
    }
    
    sign = sign.lower()
    if sign not in sign_numbers:
        return jsonify({'error': 'Invalid zodiac sign'}), 400
        
    timeframes = ['daily', 'weekly', 'monthly', 'yearly']
    if timeframe not in timeframes:
        return jsonify({'error': 'Invalid timeframe'}), 400
    
    horoscope = scrape_horoscope(sign_numbers[sign], timeframe)
    return jsonify(horoscope)

if __name__ == '__main__':
    app.run(port=3001)