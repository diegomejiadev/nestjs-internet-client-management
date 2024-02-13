import { Body, Controller, Post } from '@nestjs/common';
import { AnthenaService } from '../services/anthena.service';
import { CreateAnthenaDto } from '../../domain/dto/create-anthena.dto';

@Controller('anthena')
export class AnthenaController {
  constructor(private anthenaService: AnthenaService) {}

  @Post()
  create(@Body() body: CreateAnthenaDto) {
    return this.anthenaService.createAnthena(body);
  }
}
