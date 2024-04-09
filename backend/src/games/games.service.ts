import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Game } from './games.schema';
import { LicensesService } from '../licenses/licenses.service';
import { UsersService } from '../users/users.service';
import { SolanaWalletService } from '../solana-wallet/solana-wallet.service';

@Injectable()
export class GamesService {
    constructor(
        @InjectModel(Game.name) private gameModel: Model<Game>,
        private readonly usersService: UsersService,
        private readonly solanaWalletService: SolanaWalletService,
        private readonly licensesService: LicensesService
    ) { }

    public getAll(): Promise<Game[]> {
        return this.gameModel.find().exec();
    }

    public async buy(gameId: string, userId: string) {
        const user = await this.usersService.findById(userId);

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const game = await this.gameModel.findById(gameId);

        if (!game) {
            throw new NotFoundException('Game not found');
        }

        const transferResult = await this.solanaWalletService.transfer(
            // TODO: Remove hardcoded wallet address
            // @ts-ignore
            user._id, "2p9xH5AkrFc6Q89JXAivtt1faghUTGJpzxx3upc9r89Z", game.price
        );

        // TODO: Check transfer result
        console.log(transferResult);

        return this.licensesService.create(userId, gameId);
    }
}
