import { ConfigService } from '@nestjs/config';
import { SqlServerExtraOptions } from './typeormTypes';

export interface DatabaseOptionsParams {
  configService: ConfigService;
  database: string;
  extraOptions: SqlServerExtraOptions;
  host: string;
  username: string;
  password: string;
}
