import { Controller, Get } from '@nestjs/common';

@Controller('health-check')
export class HealthCheckController {
  @Get()
  checkHealth() {
    return `I'm Alive`;
  }
}
