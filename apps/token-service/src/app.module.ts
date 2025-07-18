import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfig from './configs/app.config';
import { CqrsModule } from '@nestjs/cqrs';
import { TokensModule } from './modules/tokens/tokens.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './configs/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>({
        type: 'postgres',
        url: config.get('db.url'),
        // entities: [__dirname + '/../**/*.entity.{ts,js}'],
        synchronize: true,
        autoLoadEntities: true
      })
    }),
    CqrsModule.forRoot(),
    TokensModule,
    AuthModule,
  ]
})
export class AppModule {}
