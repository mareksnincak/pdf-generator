import { createLogger, format, transports } from "winston";
import config from "@config";

const logger = createLogger({
  level: config.env === "production" ? "info" : "debug",
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    new transports.File({ filename: "quick-start-error.log", level: "error" }),
    new transports.File({ filename: "quick-start-combined.log" }),
  ],
});

if (config.env !== "production") {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    })
  );
}

export default logger;