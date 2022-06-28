import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { InterruptedExecutionException } from './interrupted.execution.exception';
import { catchError } from 'rxjs/operators';
import { AbstractImageException } from '../core';

@Injectable()
export class ImageExceptionsInterceptor implements NestInterceptor {
  public static get instance(): ImageExceptionsInterceptor {
    return new ImageExceptionsInterceptor();
  }

  private handler = (error) => {
    if (error instanceof AbstractImageException) {
      return throwError(
        () =>
          new InterruptedExecutionException(
            `A uncaught exception was thrown. ${error.message}`,
          ),
      );
    }
    return throwError(() => error);
  };

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(catchError(this.handler));
  }
}
