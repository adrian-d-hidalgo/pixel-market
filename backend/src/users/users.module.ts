import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersService } from './users.service';
import { User, UserSchema } from './users.schema';
import { SolanaWalletModule } from 'src/solana-wallet/solana-wallet.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    SolanaWalletModule
  ],
  controllers: [],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule { }
