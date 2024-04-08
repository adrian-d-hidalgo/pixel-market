import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GamesModule } from './games/games.module';
import { LicensesModule } from './licenses/licenses.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SolanaWalletModule } from './solana-wallet/solana-wallet.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    GamesModule,
    LicensesModule,
    UsersModule,
    AuthModule,
    SolanaWalletModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
