import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateClientDto } from '../../domain/dto/create-client.dto';
import { ClientService } from '../services/client.service';
import { Public } from 'src/core/decorators/jwt-public.decorator';
import { ListClientDto } from '../../domain/dto/list-client.dto';

@Controller('client')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Public()
  @Get()
  list(@Query() query: ListClientDto) {
    return this.clientService.listClients(query);
  }

  @Public()
  @Post()
  create(@Body() body: CreateClientDto) {
    return this.clientService.createClient(body);
  }
}
