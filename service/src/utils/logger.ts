import { Logger, createLogger, format, transports } from 'winston'
import { __dirname } from '../configs/path.js'

const { colorize, simple, timestamp, errors, printf } = format

export const customLogger: Logger = createLogger({
  format: format.combine(
    colorize(),
    simple(),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    printf(
      ({ level, message, timestamp, stack }) => `[${timestamp}] [${level}] ${stack || message}`,
    ),
  ),
  transports: [
    new transports.File({
      maxsize: 5120000,
      maxFiles: 5,
      filename: `${__dirname}/../logs/log-api.log`,
    }),
    new transports.Console({
      level: 'debug',
    }),
  ],
})
