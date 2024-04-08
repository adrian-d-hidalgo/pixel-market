import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Connection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL, Keypair, SystemProgram, Transaction, sendAndConfirmTransaction } from "@solana/web3.js";
import { Model } from 'mongoose';

import { SolanaWallet } from './solana-wallet.schema';

@Injectable()
export class SolanaWalletService {
    constructor(@InjectModel(SolanaWallet.name) private solanaWalletModel: Model<SolanaWallet>) { }

    public async create(owner: string): Promise<SolanaWallet> {
        const keypair = Keypair.generate();

        const wallet = new this.solanaWalletModel({
            owner,
            address: keypair.publicKey.toString(),
            privateKey: Buffer.from(keypair.secretKey)
        });

        return wallet.save();
    }

    // TODO: type result
    public async findByOwner(owner: string) {
        const wallet = await this.solanaWalletModel.findOne({ owner }).exec();

        if (!wallet) {
            throw new NotFoundException('Wallet not found');
        }

        const ballance = await this.getWalletBalance(wallet.address);

        const result = {
            address: wallet.address,
            balance: ballance / LAMPORTS_PER_SOL
        }

        return result;
    }

    public getWalletBalance(address: string): Promise<number> {
        const connection = new Connection(clusterApiUrl("devnet"));
        const publicKey = new PublicKey(address);
        return connection.getBalance(publicKey);
    }

    public async transfer(fromOwner: string, toAddress: string, amount: number) {
        const wallet = await this.solanaWalletModel.findOne({ owner: fromOwner }).exec();

        if (!wallet) {
            throw new NotFoundException('Wallet not found');
        }

        const fromPubkey = new PublicKey(wallet.address);
        const toPubkey = new PublicKey(toAddress);

        const connection = new Connection(clusterApiUrl("devnet"));

        const transaction = new Transaction()

        const sendSolInstruction = SystemProgram.transfer({
            fromPubkey,
            toPubkey,
            lamports: LAMPORTS_PER_SOL * amount
        })

        transaction.add(sendSolInstruction);

        const senderKeypair = Keypair.fromSecretKey(new Uint8Array(wallet.privateKey));

        try {
            const signature = await sendAndConfirmTransaction(
                connection,
                transaction,
                [senderKeypair]
            );

            return signature;
        } catch (error) {
            console.error(error);
        }

    }
}
