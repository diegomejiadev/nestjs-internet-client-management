import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AnthenaService } from '../services/anthena.service';
import { CreateAnthenaDto } from '../../domain/dto/create-anthena.dto';
import { ListAnthenaDto } from '../../domain/dto/list-anthena.dto';
import { UpdateAnthenaDto } from '../../domain/dto/update-anthena.dto';

@Controller('anthena')
export class AnthenaController {
  constructor(private anthenaService: AnthenaService) {}

  @Post()
  create(@Body() body: CreateAnthenaDto) {
    return this.anthenaService.createAnthena(body);
  }

  @Get(':anthenaId')
  getById(@Param('anthenaId') anthenaId: string) {
    return this.anthenaService.getAnthenaById(anthenaId);
  }

  @Get()
  list(@Query() query: ListAnthenaDto) {
    return this.anthenaService.listAnthena(query);
  }

  @Delete(':anthenaId')
  deleteById(@Param('anthenaId') anthenaId: string) {
    return this.anthenaService.deleteAnthenaById(anthenaId);
  }

  @Put(':anthenaId')
  update(
    @Param('anthenaId') anthenaId: string,
    @Body() body: UpdateAnthenaDto,
  ) {
    return this.anthenaService.updateAnthena(anthenaId, body);
  }
}
