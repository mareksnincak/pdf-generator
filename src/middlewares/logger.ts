import morgan from 'morgan';
import logger from '@logger';
import {
  isHttpError,
  isClientHttpError,
  isServerHttpError,
} from '@utils/error';

export const httpLogger = morgan('short', {
  stream: { write: (message) => logger.info(message) },
  skip: (_req, res) => isHttpError(res.statusCode),
});

export const clientHttpErrorLogger = morgan('short', {
  stream: { write: (message) => logger.warn(message) },
  skip: (_req, res) => !isClientHttpError(res.statusCode),
});

export const serverHttpErrorLogger = morgan('short', {
  stream: { write: (message) => logger.error(message) },
  skip: (_req, res) => !isServerHttpError(res.statusCode),
});
