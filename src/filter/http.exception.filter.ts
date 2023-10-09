import {
  HttpException,
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { LoggerService } from '../common/logger/logger.service';

@Catch(HttpException)
export class HttpExceptionFilterClass implements ExceptionFilter {
  private readonly Logger: LoggerService;
  constructor() {
    this.Logger = new LoggerService();
  }
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const exceptionRes: any = exception.getResponse();

    this.Logger.error(
      `当前请求路径是:${request.url}，请求方法是:${request.method}`,
      `错误信息为：${JSON.stringify(exceptionRes)}`,
    );

    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(exceptionRes);
  }
}
