import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateIpDto } from '../../domain/dto/create-ip.dto';
import { IpService } from '../services/ip.service';
import { ListIpDto } from '../../domain/dto/list-ip.dto';

@Controller('ip-address')
export class IpController {
  constructor(private ipService: IpService) {}

  @Post()
  create(@Body() body: CreateIpDto) {
    return this.ipService.createIp(body);
  }

  @Get()
  list(@Query() query: ListIpDto) {
    return this.ipService.listIp(query);
  }
}
