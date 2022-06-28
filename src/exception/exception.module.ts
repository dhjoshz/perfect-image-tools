import { Module } from '@nestjs/common';
import { Exceptions } from './index';

@Module({
  providers: [...Exceptions],
  exports: [...Exceptions],
})
export class ExceptionModule {}
