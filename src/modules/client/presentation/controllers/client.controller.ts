import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateClientDto } from '../../domain/dto/create-client.dto';
import { ClientService } from '../services/client.service';
import { ListClientDto } from '../../domain/dto/list-client.dto';

@Controller('client')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Get()
  list(@Query() query: ListClientDto) {
    return this.clientService.listClients(query);
  }

  @Post()
  create(@Body() body: CreateClientDto) {
    return this.clientService.createClient(body);
  }
}
