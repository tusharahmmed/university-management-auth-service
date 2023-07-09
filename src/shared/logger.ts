import path from 'path';
import process from 'process';
import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
const { combine, timestamp, label, printf } = format;

// custom fromat
const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const secounds = date.getSeconds();

  return ` [${label}] ${level}: ${message} at ${date.toDateString()} ${hours}:${minutes}:${secounds}`;
});

// info logger
const logger = createLogger({
  level: 'info',
  format: combine(label({ label: 'log' }), timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'success',
        'phu-%DATE%.log',
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

// error logger
const errorLogger = createLogger({
  level: 'error',
  format: combine(label({ label: 'log' }), timestamp(), myFormat),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'errors',
        'phu-%DATE%.log',
      ),
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
});

export { errorLogger, logger };
