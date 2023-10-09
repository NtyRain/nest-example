import { Logger as log4jsLogger, configure, getLogger } from 'log4js';
import * as path from 'path';
import { Injectable } from '@nestjs/common';
@Injectable()
export class LoggerService {
  log4js: log4jsLogger;
  constructor() {
    configure({
      appenders: {
        console: {
          type: 'console',
        },
        app: {
          type: 'dateFile',
          filename: path.resolve('./logs', 'app.log'),
          pattern: 'yyyy-MM-dd',
          keepFileExt: true,
          alwaysIncludePattern: true,
          numBackups: 10,
        },
      },
      categories: {
        default: {
          appenders: ['console', 'app'],
          level: 'info',
        },
      },
    });
    this.log4js = getLogger();
  }

  error(message: any, trace: string) {
    this.log4js.error(message, trace);
  }
}
