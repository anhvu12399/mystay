const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  // Set window size
  await page.setViewport({ width: 1200, height: 800 });
  
  // Set User-Agent to avoid bot detection
  await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

  console.log('Navigating to Agoda...');
  await page.goto('https://www.agoda.com/my-way/hotel/ho-chi-minh-city-vn.html?cid=1844104&ds=JF03WYmxlkkPzWF%2F', {
    waitUntil: 'networkidle2',
    timeout: 60000
  });

  console.log('Page loaded. Scrolling down to trigger lazy loading...');
  
  // Scroll down incrementally
  for (let i = 0; i < 10; i++) {
    await page.evaluate(() => window.scrollBy(0, 800));
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Click on "Room photos and details" for Apartment with Balcony if possible
  // Let's find all buttons or links with text "Căn hộ" or "Apartment" or "Room photos"
  console.log('Attempting to click "Room photos and details" to open the gallery...');
  try {
    const links = await page.$$('span, a, button, div');
    for (const link of links) {
      const text = await page.evaluate(el => el.textContent, link);
      if (text && (text.includes('Room photos') || text.includes('Xem ảnh và chi tiết') || text.includes('photos and details'))) {
        await link.click();
        console.log('Clicked a gallery link:', text.trim());
        await new Promise(resolve => setTimeout(resolve, 3000)); // Wait for modal
        break;
      }
    }
  } catch (err) {
    console.log('Click failed or not needed:', err.message);
  }

  // Extract all images
  const images = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('img'))
      .map(img => img.src)
      .filter(src => src && (src.includes('pix8.agoda.net/hotelImages') || src.includes('pix6.agoda.net/hotelImages') || src.includes('agoda.net/hotelImages')));
  });

  const uniqueImages = [...new Set(images)];
  console.log(`Found ${uniqueImages.length} unique room images:`, uniqueImages);

  fs.writeFileSync('apartment_images.json', JSON.stringify(uniqueImages, null, 2));
  
  await browser.close();
})();
