import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('health-check')
@Controller('health-check')
export class HealthCheckController {
  @ApiOkResponse({
    description: 'Get Service status',
  })
  @Get()
  checkHealth() {
    return `I'm Alive`;
  }
}
