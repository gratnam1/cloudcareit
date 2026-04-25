const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    console.log('Navigating to https://ctrlshiftit.ca...');
    await page.goto('https://ctrlshiftit.ca', { waitUntil: 'networkidle' });

    // Check for "Free Tools" in the header
    const freeToolsDropdown = await page.locator('nav').filter({ hasText: 'Free Tools' });
    const isFreeToolsVisible = await freeToolsDropdown.isVisible();
    console.log('Free Tools Dropdown visible:', isFreeToolsVisible);

    // Check for "Instant Domain Scan" in the hero section
    const heroBtn = await page.locator('header a').filter({ hasText: 'Instant Domain Scan' });
    const isHeroBtnVisible = await heroBtn.isVisible();
    console.log('Hero "Instant Domain Scan" button visible:', isHeroBtnVisible);

    // Check for "Office IT Relocation" in the bento grid
    const bentoCard = await page.locator('#card-relocation');
    const isBentoCardVisible = await bentoCard.isVisible();
    console.log('Bento "Office IT Relocation" card visible:', isBentoCardVisible);

    // Check for the link in the footer
    const footerLink = await page.locator('footer a[href="/office-it-relocation"]');
    const isFooterLinkVisible = await footerLink.isVisible();
    console.log('Footer "Office IT Relocation" link visible:', isFooterLinkVisible);

  } catch (err) {
    console.error('Error during check:', err);
  } finally {
    await browser.close();
  }
})();
