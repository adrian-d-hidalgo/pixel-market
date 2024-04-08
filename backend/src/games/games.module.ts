import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { Game, GameSchema } from './games.schema';
import { LicensesModule } from 'src/licenses/licenses.module';
import { UsersModule } from 'src/users/users.module';
import { SolanaWalletModule } from 'src/solana-wallet/solana-wallet.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }]),
    UsersModule,
    SolanaWalletModule,
    LicensesModule
  ],
  controllers: [GamesController],
  providers: [GamesService]
})
export class GamesModule { }
