import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { User } from 'src/users/users.schema';

export type SolanaWalletDocument = HydratedDocument<SolanaWallet>;

@Schema()
export class SolanaWallet {
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    })
    owner: User;

    @Prop({
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true
    })
    address: string;

    // TODO: encrypt private key
    @Prop({
        type: mongoose.Schema.Types.Buffer,
        required: true
    })
    privateKey: Buffer;
}

export const SolanaWalletSchema = SchemaFactory.createForClass(SolanaWallet);
