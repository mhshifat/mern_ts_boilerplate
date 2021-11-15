import winston from "winston";

const { NODE_ENV } = process.env;
const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  // eslint-disable-next-line no-param-reassign
  info.level = info.level.toUpperCase();
  return info;
});

const logger = winston.createLogger({
  level: NODE_ENV === "development" ? "debug" : "info",
  format: winston.format.combine(
    enumerateErrorFormat(),
    NODE_ENV === "development"
      ? winston.format.colorize()
      : winston.format.uncolorize(),
    winston.format.splat(),
    winston.format.printf(({ level, message }) => `[ ${level} ] : ${message}`)
  ),
  transports: [
    new winston.transports.Console({
      stderrLevels: ["error"]
    })
  ]
});

logger.stream = {
  // @ts-ignore
  write(message: any, encoding: any) {
    logger.http(message);
  }
};

export default logger;
