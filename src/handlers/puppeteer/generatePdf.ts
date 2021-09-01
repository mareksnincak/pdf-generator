import puppeteer from 'puppeteer';

export default async (html: string) => {
  const browser = await puppeteer.launch({
    args: ['--disable-dev-shm-usage'],
  });
  const page = await browser.newPage();
  await page.setContent(html);
  const pdf = await page.pdf({ format: 'a4' });

  await browser.close();
  return pdf;
};
