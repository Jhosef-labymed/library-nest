import { ConfigService } from '@nestjs/config';
import { REQUEST } from '@nestjs/core';
import { Module, Scope, Global, DynamicModule } from '@nestjs/common';

import { DataSource } from 'typeorm';

import { AppModule } from 'src/app.module';
import { databasesHash } from '../const/databases';

@Global()
@Module({})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    const databaseProvider = {
      provide: DataSource,
      scope: Scope.REQUEST, 
      useFactory: async (config: ConfigService) => {
        const userDatabase = config.get<string>('database.databaseName');

        if (!userDatabase) {
          throw new Error('No user db was found in session');
        }
        const dataSourceCache = AppModule.getDataSourceCache();

        if (dataSourceCache.has(userDatabase)) {
          return dataSourceCache.get(userDatabase)!;
        }

        const databases = databasesHash(config);

        const dataSource = databases[userDatabase];

        if (!dataSource.isInitialized) {
          await dataSource.initialize();
        }

        dataSourceCache.set(userDatabase, dataSource);
        return dataSource;
      },
      inject: [ConfigService, REQUEST],
    };

    return {
      module: DatabaseModule,
      providers: [databaseProvider],
      exports: [databaseProvider],
    };
  }
}
