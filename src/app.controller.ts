import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: 'Basic hello world for testing the API',
    operationId: 'getHello',
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
