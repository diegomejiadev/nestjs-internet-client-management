import { plainToInstance } from 'class-transformer';
import { IsNumber, IsOptional, IsString, validateSync } from 'class-validator';

export enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

class EnvironmentVariables {
  @IsOptional()
  @IsNumber()
  NESTJS_PORT: number;

  @IsString()
  NESTJS_POSTGRES_USER: string;

  @IsString()
  NESTJS_POSTGRES_PASSWORD: string;

  @IsString()
  NESTJS_POSTGRES_DB: string;

  @IsNumber()
  NESTJS_POSTGRES_PORT: number;

  @IsString()
  NESTJS_DATABASE_URL: string;

  @IsString()
  NESTJS_JWT_SECRET: string;

  @IsString()
  NESTJS_JWT_EXPIRE_TIME: string;

  @IsNumber()
  NESTJS_SALT_ROUNDS: number;

  @IsString()
  NESTJS_AWS_S3_REGION_NAME: string;

  @IsString()
  NESTJS_AWS_S3_BUCKET_NAME: string;

  @IsString()
  NESTJS_AWS_S3_IAM_USER_PUBLIC_KEY: string;

  @IsString()
  NESTJS_AWS_S3_IAM_USER_SECRET_KEY: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
