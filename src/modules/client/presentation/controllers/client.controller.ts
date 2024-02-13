import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateClientDto } from '../../domain/dto/create-client.dto';
import { ClientService } from '../services/client.service';
import { ListClientDto } from '../../domain/dto/list-client.dto';
import { ToggleClientRetiredDto } from '../../domain/dto/toggle-retired-client.dto';
import { ToggleClientSleepingDto } from '../../domain/dto/toggle-sleeping-client.dto';
import { UpdateClientDto } from '../../domain/dto/update-client.dto';

@Controller('client')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Get(':clientId')
  getById(@Param('clientId') clientId: string) {
    return this.clientService.getClientById(clientId);
  }

  @Get()
  list(@Query() query: ListClientDto) {
    return this.clientService.listClients(query);
  }

  @Post()
  create(@Body() body: CreateClientDto) {
    return this.clientService.createClient(body);
  }

  @Patch('retired/:clientId')
  toggleRetiredById(
    @Param('clientId') clientId: string,
    @Body() body: ToggleClientRetiredDto,
  ) {
    return this.clientService.toggleClientRetiredById(clientId, body);
  }

  @Patch('sleeping/:clientId')
  toggleSleepingById(
    @Param('clientId') clientId: string,
    @Body() body: ToggleClientSleepingDto,
  ) {
    return this.clientService.toggleClientSleepingById(clientId, body);
  }

  @Put(':clientId')
  updateClient(
    @Body() body: UpdateClientDto,
    @Param('clientId') clientId: string,
  ) {
    return this.clientService.updateClient(clientId, body);
  }
}
