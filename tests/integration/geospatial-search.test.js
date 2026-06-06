const puppeteer = require('puppeteer');

describe('Geospatial Search', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  it('should filter using radius', async () => {
    await page.goto('http://localhost:3006/properties');
    await page.type('[data-testid="search-radius-slider"]', '10');
    const resultsCount = await page.$eval('[data-testid="results-count"]', el => el.textContent);
    expect(resultsCount).toBeTruthy();
  });
});
