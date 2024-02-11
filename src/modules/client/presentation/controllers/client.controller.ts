import { Body, Controller, Post } from '@nestjs/common';
import { CreateClientDto } from '../../domain/dto/create-client.dto';
import { ClientService } from '../services/client.service';
import { Public } from 'src/core/decorators/jwt-public.decorator';

@Controller('client')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Public()
  @Post()
  create(@Body() body: CreateClientDto) {
    return this.clientService.createClient(body);
  }
}
