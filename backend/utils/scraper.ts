import axios from 'axios';
import * as cheerio from 'cheerio';

const MAX_SCRAPED_LENGTH = 15000;

export async function scrapeUrlText(url: string): Promise<string> {
  try {
    // Basic validation
    new URL(url);
    
    // Fetch HTML
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; StackHoundBot/1.0; +http://stackhound.io)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      timeout: 10000, // 10 second timeout
    });

    const html = response.data;
    
    if (typeof html !== 'string') {
      return `Error: Expected HTML response, got ${typeof html}`;
    }

    // Parse with cheerio
    const $ = cheerio.load(html);

    // Remove unwanted elements that add noise or aren't visible text
    $('script, style, noscript, svg, img, iframe, object, embed, video, audio').remove();

    // Extract text from the body
    let text = $('body').text();
    
    // Fallback if there's no body tag
    if (!text || text.trim() === '') {
      text = $.root().text();
    }

    // Clean up whitespace: replace multiple spaces/newlines with a single space
    text = text.replace(/\s+/g, ' ').trim();

    if (!text) {
      return 'Error: No readable text found on this page.';
    }

    // Truncate to avoid blowing up context window
    if (text.length > MAX_SCRAPED_LENGTH) {
      text = text.substring(0, MAX_SCRAPED_LENGTH) + '...\n[TRUNCATED]';
    }

    return text;
  } catch (error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      return `Error: Could not scrape URL. Server responded with status ${error.response.status}.`;
    } else if (error.request) {
      // The request was made but no response was received
      return 'Error: Could not scrape URL. No response received from server (might be down or blocking scrapers).';
    } else if (error instanceof TypeError && error.message === 'Invalid URL') {
      return 'Error: The provided URL is invalid.';
    } else {
      // Something happened in setting up the request that triggered an Error
      return `Error: Scraping failed. ${error.message}`;
    }
  }
}
