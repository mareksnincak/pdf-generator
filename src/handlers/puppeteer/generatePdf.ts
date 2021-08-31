import puppeteer from 'puppeteer';

export default async () => {
  const browser = await puppeteer.launch({
    args: ['--disable-dev-shm-usage'],
  });
  const page = await browser.newPage();

  await page.goto('https://google.com');
  const pdf = await page.pdf({ format: 'a4' });

  await browser.close();
  return pdf;
};
