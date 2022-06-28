import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { AbstractRuntimeException } from '../core';
import { catchError } from 'rxjs/operators';

@Injectable()
export class RuntimeExceptionsInterceptor implements NestInterceptor {
  public static get instance(): RuntimeExceptionsInterceptor {
    return new RuntimeExceptionsInterceptor();
  }

  private handler = (error) => {
    if (error instanceof HttpException) {
      return throwError(() => error);
    }

    Logger.error(error.stack);

    if (error instanceof AbstractRuntimeException) {
      return throwError(() => error.toHttpException());
    }

    return throwError(
      () =>
        new InternalServerErrorException(
          `Unhandled exception ${error.message}`,
        ),
    );
  };

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(catchError(this.handler));
  }
}
