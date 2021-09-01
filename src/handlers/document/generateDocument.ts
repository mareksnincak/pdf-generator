import { getCustomRepository } from 'typeorm';
import fs from 'fs/promises';

import MustacheHandler from '@handlers/mustache';
import PuppeteerHandler from '@handlers/puppeteer';
import TemplateRepository from '@repositories/Template';

export default async (templateId: string, data: Record<string, any>) => {
  const templateRepository = getCustomRepository(TemplateRepository);
  const templateEntity = await templateRepository.getOneByIdOrFail(templateId);

  const template = await fs.readFile(templateEntity.path, 'utf-8');
  const html = MustacheHandler.generateHtml(template, data);

  return PuppeteerHandler.generatePdf(html);
};
