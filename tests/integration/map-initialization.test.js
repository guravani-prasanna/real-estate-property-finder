const puppeteer = require('puppeteer');

describe('Map Initialization', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
  });

  it('should load map successfully', async () => {
    await page.goto('http://localhost:3006/properties');
    const mapLoaded = await page.waitForSelector('[data-testid="map-loaded"]');
    expect(mapLoaded).toBeTruthy();
  });
});
