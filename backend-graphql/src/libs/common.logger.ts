import winston from 'winston';
import { ImyFormat } from './types';
const { combine, printf } = winston.format;


const myFormat = printf(({ level, message, service } : any) => {
  let jsonString = `{ "message": "${level === 'error' ? (message) : (message)}"`;
  jsonString += `, "level": "${level}", "service": "${(service)}" }`;
  return jsonString;
});


function createLogger(service : string) {
  return winston.createLogger({
    levels: winston.config.syslog.levels,
    defaultMeta: {
      service,
    },
    format: combine(myFormat),
    transports: [new winston.transports.Console()],
  });
}

const lmsLogger = createLogger('LMS-service')

export {
    lmsLogger
}