import { NextFunction, Request, Response } from 'express';
import DocumentHandler from '@handlers/document';

export const generateDocument = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { templateId, data } = req.body;

    const document = await DocumentHandler.generatePdf(templateId, data);

    res.set('Content-Type', 'application/pdf');
    res.send(document);
  } catch (err) {
    next(err);
  }
};
