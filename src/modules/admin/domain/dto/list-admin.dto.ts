import { IsOptional, IsString } from 'class-validator';
import { QueryDto } from 'src/shared/dto/query.dto';

export class ListAdminDto extends QueryDto {
  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  name?: string;
}
