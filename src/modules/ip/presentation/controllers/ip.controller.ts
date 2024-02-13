import { Body, Controller, Post } from '@nestjs/common';
import { CreateIpDto } from '../../domain/dto/create-ip.dto';
import { IpService } from '../services/ip.service';

@Controller('ip-address')
export class IpController {
  constructor(private ipService: IpService) {}

  @Post()
  create(@Body() body: CreateIpDto) {
    return this.ipService.createIp(body);
  }
}
