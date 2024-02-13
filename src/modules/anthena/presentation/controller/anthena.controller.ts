import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AnthenaService } from '../services/anthena.service';
import { CreateAnthenaDto } from '../../domain/dto/create-anthena.dto';
import { ListAnthenaDto } from '../../domain/dto/list-anthena.dto';

@Controller('anthena')
export class AnthenaController {
  constructor(private anthenaService: AnthenaService) {}

  @Post()
  create(@Body() body: CreateAnthenaDto) {
    return this.anthenaService.createAnthena(body);
  }

  @Get()
  list(@Query() query: ListAnthenaDto) {
    return this.anthenaService.listAnthena(query);
  }
}
