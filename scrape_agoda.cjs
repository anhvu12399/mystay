const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');
  
  await page.goto('https://www.agoda.com/vi-vn/my-way/hotel/ho-chi-minh-city-vn.html', { waitUntil: 'networkidle2', timeout: 60000 });
  
  // Wait a bit to ensure images are loaded
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  const images = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('img'))
      .map(img => img.src)
      .filter(src => src && (src.includes('agoda.net/') || src.includes('pix8.agoda.net/')))
  });
  
  fs.writeFileSync('agoda_images.json', JSON.stringify([...new Set(images)], null, 2));
  console.log(`Found ${new Set(images).size} unique images.`);
  
  await browser.close();
})();
