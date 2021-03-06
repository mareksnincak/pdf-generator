import { createLogger, format, transports } from 'winston';
import config from '@config';

const logFormat = format.combine(
  format.timestamp(),
  format.errors({ stack: true }),
  format.splat(),
  format.json(),
);

const logger = createLogger({
  level: config.env === 'production' ? 'info' : 'debug',
  format: logFormat,
  transports: [
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' }),
  ],
});

if (config.env !== 'production') {
  logger.add(
    new transports.Console({
      format: format.combine(logFormat, format.colorize(), format.simple()),
    }),
  );
}

export default logger;
