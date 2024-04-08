import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';
import { SolanaWalletService } from '../solana-wallet/solana-wallet.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private solanaWalletService: SolanaWalletService,
        private jwtService: JwtService
    ) { }

    public async signUp(
        username: string,
        pass: string,
    ): Promise<{ access_token: string }> {
        const user = await this.usersService.create(username, pass);

        const access_token = await this.createToken(user);

        return {
            access_token
        };
    }

    public async signIn(
        username: string,
        pass: string,
    ): Promise<{ access_token: string }> {
        const user = await this.usersService.findByUsername(username);

        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }

        const access_token = await this.createToken(user);

        return {
            access_token
        };
    }

    private createToken(user: any) {
        // @ts-ignore
        const payload = { sub: user._id, username: user.username };

        return this.jwtService.signAsync(payload)
    }

    public async profile(userId: string) {
        // TODO: return user profile without secrets
        const user = await this.usersService.findById(userId);

        if (!user) {
            throw new NotFoundException();
        }

        //@ts-ignore
        const solanaWallet = await this.solanaWalletService.findByOwner(user._id);

        if (!solanaWallet) {
            throw new NotFoundException();
        }

        const profile = {
            //@ts-ignore
            id: user._id,
            username: user.username,
            solanaWallet: {
                address: solanaWallet.address,
                balance: solanaWallet.balance
            }
        }

        return profile;
    }
}
