const puppeteer = require('puppeteer');

describe('Location Autocomplete', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  it('should filter properties based on location', async () => {
    await page.goto('http://localhost:3006/properties');
    await page.type('[data-testid="location-autocomplete"]', 'San Francisco');
    const resultsCount = await page.$eval('[data-testid="results-count"]', el => el.textContent);
    expect(resultsCount).toBeTruthy();
  });
});
