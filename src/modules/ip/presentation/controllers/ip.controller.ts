import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
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

  @Get(':ipAddressId')
  getById(@Param('ipAddressId') ipAddressId: number) {
    return this.ipService.getIpById(ipAddressId);
  }

  @Get()
  list(@Query() query: ListIpDto) {
    return this.ipService.listIp(query);
  }

  @Delete(':ipAddressId')
  DeleteIpByIdUsecase(@Param('ipAddressId') ipAddressId: number) {
    return this.ipService.deleteIpById(ipAddressId);
  }
}
