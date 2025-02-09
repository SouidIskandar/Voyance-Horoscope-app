import express from 'express';
import cors from 'cors';
import axios from 'axios';
import * as cheerio from 'cheerio';

const app = express();
app.use(cors());

const cleanText = (text) => {
  // Remove extra whitespace, newlines, and any special characters
  return text.replace(/\s+/g, ' ')
    .replace(/[\u00A0-\u9999<>&]/g, (i) => `&#${i.charCodeAt(0)};`)
    .trim();
};

async function scrapeHoroscope(sign, timeframe = 'daily') {
  try {
    // Construct the URL based on the timeframe
    let url;
    switch (timeframe) {
      case 'weekly':
        url = `https://www.horoscope.com/us/horoscopes/general/horoscope-general-weekly.aspx?sign=${sign}`;
        break;
      case 'monthly':
        url = `https://www.horoscope.com/us/horoscopes/general/horoscope-general-monthly.aspx?sign=${sign}`;
        break;
      case 'yearly':
        url = `https://www.horoscope.com/us/horoscopes/general/horoscope-general-yearly-2024.aspx?sign=${sign}`;
        break;
      default:
        url = `https://www.horoscope.com/us/horoscopes/general/horoscope-general-daily-today.aspx?sign=${sign}`;
    }

    // Set headers to mimic a browser request
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
      'Connection': 'keep-alive',
    };

    const response = await axios.get(url, { headers });
    const $ = cheerio.load(response.data);
    
    // Find the main prediction text using multiple possible selectors
    let predictionText = '';
    const mainHoroscope = $('.main-horoscope p').first();
    const mainContent = $('.main-content p').first();
    
    if (mainHoroscope.length) {
      predictionText = mainHoroscope.text();
    } else if (mainContent.length) {
      predictionText = mainContent.text();
    }

    // Clean and validate the prediction text
    const prediction = predictionText ? cleanText(predictionText) : 
      "Unable to fetch horoscope prediction at this time.";

    // Generate consistent supplementary data based on the text
    const textHash = prediction.split('').reduce((acc, char) => {
      return acc + char.charCodeAt(0);
    }, 0);

    const colors = [
      'Mystic Purple', 'Ocean Blue', 'Forest Green', 'Ruby Red', 
      'Golden Yellow', 'Midnight Black', 'Crystal White', 'Sunset Orange', 
      'Rose Pink', 'Emerald Green', 'Royal Blue', 'Deep Purple'
    ];

    const moods = [
      'Inspired', 'Peaceful', 'Energetic', 'Creative', 
      'Focused', 'Balanced', 'Motivated', 'Contemplative',
      'Enthusiastic', 'Determined', 'Optimistic', 'Serene'
    ];

    // Use the text hash to generate consistent supplementary data
    const luckyNumber = (textHash % 12) + 1;
    const luckyColor = colors[textHash % colors.length];
    const mood = moods[textHash % moods.length];

    // Add date information
    const date = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    return {
      prediction,
      lucky_number: luckyNumber,
      lucky_color: luckyColor,
      mood,
      date,
      timeframe
    };
  } catch (error) {
    console.error('Error scraping horoscope:', error);
    return {
      prediction: 'Unable to fetch horoscope at this time. Please try again later.',
      lucky_number: 7,
      lucky_color: 'Mystic Blue',
      mood: 'Contemplative',
      date: new Date().toLocaleDateString(),
      timeframe,
      error: error.message
    };
  }
}

const signNumbers = {
  'aries': 1, 'taurus': 2, 'gemini': 3, 'cancer': 4,
  'leo': 5, 'virgo': 6, 'libra': 7, 'scorpio': 8,
  'sagittarius': 9, 'capricorn': 10, 'aquarius': 11, 'pisces': 12
};

app.get('/horoscope/:sign/:timeframe', async (req, res) => {
  const { sign, timeframe } = req.params;
  const signLower = sign.toLowerCase();

  if (!signNumbers[signLower]) {
    return res.status(400).json({ 
      error: 'Invalid zodiac sign',
      message: 'Please provide a valid zodiac sign.'
    });
  }

  const validTimeframes = ['daily', 'weekly', 'monthly', 'yearly'];
  if (!validTimeframes.includes(timeframe)) {
    return res.status(400).json({ 
      error: 'Invalid timeframe',
      message: 'Please provide a valid timeframe: daily, weekly, monthly, or yearly.'
    });
  }

  try {
    const horoscope = await scrapeHoroscope(signNumbers[signLower], timeframe);
    res.json(horoscope);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch horoscope',
      message: 'An error occurred while fetching your horoscope. Please try again later.',
      details: error.message
    });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});