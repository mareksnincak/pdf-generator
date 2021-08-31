import AppError from '@errors/AppError';
import logger from '@logger';
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

type TErrorResponse = {
  status: string;
  detail?: any;
};

const DEFAULT_ERROR = httpStatus.INTERNAL_SERVER_ERROR;

const handleErrors = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const response: TErrorResponse = {
    status: httpStatus[`${DEFAULT_ERROR}_NAME`] as string,
  };

  if (err instanceof AppError) {
    if (err.message) {
      logger.warn(err.message);
    }

    response.status = httpStatus[`${err.statusCode}_NAME`] as string;

    if (err.detail) {
      response.detail = err.detail;
    }
    return res.status(err.statusCode).send(response);
  }

  logger.error(err);

  return res.status(DEFAULT_ERROR).send(response);
};

export default handleErrors;
