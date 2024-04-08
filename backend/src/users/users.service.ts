import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from './users.schema';
import { SolanaWalletService } from 'src/solana-wallet/solana-wallet.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private solanaWalletService: SolanaWalletService
    ) { }

    public async create(username: string, password: string): Promise<User> {
        const user = new this.userModel({
            username,
            password
        });

        // @ts-ignore
        await this.solanaWalletService.create(user._id);

        return user.save();
    }

    public async findById(userId: string): Promise<User | null> {
        return this.userModel.findById(userId).exec();
    }

    public async findByUsername(username: string): Promise<User | null> {
        return this.userModel.findOne({ username }).exec();
    }
}
