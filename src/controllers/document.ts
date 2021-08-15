import { NextFunction, Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import DocumentRepository from '@repositories/Document';

export const generateDocument = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { templateId, data } = req.body;

    const documentRepository = getCustomRepository(DocumentRepository);
    const document = await documentRepository.createDocument(templateId, data);

    res.send(document.toPublicJson());
  } catch (err) {
    next(err);
  }
};
