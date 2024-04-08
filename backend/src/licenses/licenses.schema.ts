import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

import { Game } from '../games/games.schema';
import { User } from '../users/users.schema';

export type LicenseDocument = HydratedDocument<License>;

@Schema()
export class License {
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    })
    owner: User;

    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game',
        required: true
    })
    game: Game;
}

export const LicenseSchema = SchemaFactory.createForClass(License);
