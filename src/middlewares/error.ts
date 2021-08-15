import AppError from '@errors/AppError';
import logger from '@logger';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

interface IErrorResponse {
  status: string;
  detail?: any;
}

const DEFAULT_ERROR = httpStatus.INTERNAL_SERVER_ERROR;

const handleErrors = (err: Error, _req: Request, res: Response) => {
  const response: IErrorResponse = {
    status: httpStatus[`${DEFAULT_ERROR}_NAME`] as string,
  };

  if (err instanceof AppError) {
    logger.warn(err.message);

    response.status = httpStatus[`${err.statusCode}_NAME`] as string;

    if (err.detail) {
      response.detail = err.detail;
    }
    return res.status(err.statusCode).send(response);
  }

  logger.error(err.stack);

  return res.status(DEFAULT_ERROR).send(response);
};

export default handleErrors;
