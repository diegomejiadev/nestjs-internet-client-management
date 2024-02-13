import { Injectable } from '@nestjs/common';
import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from './create-client.dto';

@Injectable()
export class UpdateClientDto extends PartialType(CreateClientDto) {}
