import PuppeteerHandler from '@handlers/puppeteer';

export default async () => {
  return PuppeteerHandler.generatePdf();
};
