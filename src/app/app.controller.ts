import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Category } from '../backend/category/domain';
import { AppService } from './app.service';

@ApiTags('helth-check')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    const entity = new Category({ name: 'RAFAEL' });
    return this.appService.getHello();
  }
}
