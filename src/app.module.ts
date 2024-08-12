import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GenresModule } from './modules/genres/genres.module';
import { AuthorsModule } from './modules/authors/authors.module';
import { BooksModule } from './modules/books/books.module';
import { MembersModule } from './modules/members/members.module';
import { LoansModule } from './modules/loans/loans.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import environments from './configs/environments';
import { DataSource } from 'typeorm';
import { DatabaseModule } from './configs/modules/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [environments],
    }),
    TypeOrmModule.forRootAsync({
      name: 'default',
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        type: config.get<'mssql'>('database.type'),
        host: config.get<string>('database.host'),
        username: config.get<string>('database.username'),
        password: config.get<string>('database.password'),
        synchronize: false,
        options: { trustServerCertificate: true, useUTC: true },
        database: config.get<string>('database.databaseName'),
        entities: ['dist/entities/**/*.entity{.ts,.js}'],
      }),
      inject: [ConfigService],
    }),
    DatabaseModule.forRoot(),
    GenresModule,
    AuthorsModule,
    BooksModule,
    MembersModule,
    LoansModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  private static dataSourceCache = new Map<string, DataSource>();

  static getDataSourceCache(): Map<string, DataSource> {
    return this.dataSourceCache;
  }
}
