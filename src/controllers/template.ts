import { NextFunction, Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import TemplateRepository from '@repositories/Template';

export const retrieveTemplate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const templateRepository = getCustomRepository(TemplateRepository);
    const template = await templateRepository.getOneByIdOrFail(id);

    res.send(template.toPublicJson());
  } catch (err) {
    next(err);
  }
};

export const listTemplates = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const type = req.query.type as string | undefined;

    const templateRepository = getCustomRepository(TemplateRepository);
    const templates = await templateRepository.getWithOptionalType({ type });
    const publicTemplates = templates.map((template) =>
      template.toPublicJson(),
    );

    res.send(publicTemplates);
  } catch (err) {
    next(err);
  }
};

export const createTemplate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { type } = req.body;
    const { path } = req.file!;

    const templateRepository = getCustomRepository(TemplateRepository);
    const template = await templateRepository.createTemplate({ type, path });

    res.send(template.toPublicJson());
  } catch (err) {
    next(err);
  }
};

export const deleteTemplate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;

    const templateRepository = getCustomRepository(TemplateRepository);
    await templateRepository.softDelete(id);

    res.send();
  } catch (err) {
    next(err);
  }
};
