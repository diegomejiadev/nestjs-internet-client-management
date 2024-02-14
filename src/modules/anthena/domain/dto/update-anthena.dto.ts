import { PartialType } from '@nestjs/mapped-types';
import { CreateAnthenaDto } from './create-anthena.dto';

export class UpdateAnthenaDto extends PartialType(CreateAnthenaDto) {}
