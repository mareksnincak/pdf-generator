import morgan from 'morgan';
import logger from '@logger';
import httpStatus from 'http-status';

export const successLogger = morgan('short', {
  stream: { write: (message) => logger.info(message) },
  skip: (_req, res) => res.statusCode >= httpStatus.BAD_REQUEST,
});

export const clientErrorLogger = morgan('short', {
  stream: { write: (message) => logger.warn(message) },
  skip: (_req, res) => res.statusCode < httpStatus.BAD_REQUEST,
});

export const serverErrorLogger = morgan('short', {
  stream: { write: (message) => logger.error(message) },
  skip: (_req, res) => res.statusCode < httpStatus.INTERNAL_SERVER_ERROR,
});
