import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GameDocument = HydratedDocument<Game>;

@Schema()
export class Game {
    @Prop({
        type: String,
        required: true
    })
    title: string;

    @Prop({
        type: String,
        required: true
    })
    image: number;

    @Prop({
        type: Number,
        required: true
    })
    price: number;
}

export const GameSchema = SchemaFactory.createForClass(Game);
