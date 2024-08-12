import { DataSource } from 'typeorm';
import { DatabaseOptionsParams } from '../interfaces/ITypeorm';
import { ConfigService } from '@nestjs/config';

export const databaseResource = ({
    configService,
    database,
    host,
    extraOptions,
    username,
    password,
  }: DatabaseOptionsParams) =>
    new DataSource({
      type: configService.get<'mssql'>('database.type'),
      username,
      password,
      port: configService.get<number>('database.port'),
      synchronize: false,
      database,
      host,
      options: extraOptions,
      entities: ['dist/entities/**/*.entity{.ts,.js}'],
    });

export const databasesHash = (configService: ConfigService) => ({
    DB_LOCALE: databaseResource({
      configService,
      database: configService.get<string>('database.databaseName'),
      username: configService.get<string>('database.username'),
      password: configService.get<string>('database.password'),
      host: configService.get<string>('database.host'),
      extraOptions: { trustServerCertificate: true, useUTC: true },
    })
  });
  