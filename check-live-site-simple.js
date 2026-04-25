const { chromium } = require('playwright');

(async () => {
  console.log('Starting Playwright check...');
  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    
    console.log('Navigating to https://ctrlshiftit.ca...');
    await page.goto('https://ctrlshiftit.ca', { waitUntil: 'networkidle', timeout: 60000 });

    const content = await page.content();
    console.log('Page content length:', content.length);
    
    const hasFreeTools = content.includes('Free Tools');
    console.log('Contains "Free Tools":', hasFreeTools);

    const hasRelocation = content.includes('office-it-relocation');
    console.log('Contains "office-it-relocation":', hasRelocation);

    // Take a screenshot of the top of the page
    await page.screenshot({ path: 'live-site-header.png' });
    console.log('Screenshot saved to live-site-header.png');

  } catch (err) {
    console.error('Error:', err);
  } finally {
    if (browser) await browser.close();
  }
})();
