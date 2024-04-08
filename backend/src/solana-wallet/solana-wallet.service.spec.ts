import { Test, TestingModule } from '@nestjs/testing';
import { SolanaWalletService } from './solana-wallet.service';

describe('SolanaWalletService', () => {
  let service: SolanaWalletService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SolanaWalletService],
    }).compile();

    service = module.get<SolanaWalletService>(SolanaWalletService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
