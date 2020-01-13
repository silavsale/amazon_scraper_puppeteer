const puppeteer = require('puppeteer');

async function scrapeProduct(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [el] = await page.$x('//*[@id="landingImage"]');
    const src = await el.getProperty('src');
    const imageUrl = await src.jsonValue();

    const [el2] = await page.$x('//*[@id="productTitle"]');
    const txt = await el2.getProperty('textContent');
    const title = await txt.jsonValue();

    const [el3] = await page.$x('//*[@id="newBuyBoxPrice"]');
    const text2 = await el3.getProperty('textContent');
    const price = await text2.jsonValue();

    console.log({ imageUrl, title, price });

    browser.close();
}

scrapeProduct('https://www.amazon.ca/Sony-WH1000XM3-Canceling-Headphones-WH-1000XM3/dp/B07G4MNFS1?ref_=ast_bbp_dp&th=1&psc=1');
