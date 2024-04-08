import { Module } from '@nestjs/common';
import { SolanaWalletService } from './solana-wallet.service';
import { MongooseModule } from '@nestjs/mongoose';

import { SolanaWallet, SolanaWalletSchema } from './solana-wallet.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: SolanaWallet.name, schema: SolanaWalletSchema }])],
  providers: [SolanaWalletService],
  exports: [SolanaWalletService]
})
export class SolanaWalletModule { }
