import { Controller, Get } from '@nestjs/common';
import { Category } from '../backend/category/domain';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    const entity = new Category({ name: 'RAFAEL' });
    console.log(entity);

    return this.appService.getHello();
  }
}
