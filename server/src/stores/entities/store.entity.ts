import { ID, ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { History } from 'src/histories/entities/history.entity';
import { StoreHistory } from './types';

export type StoreDocument = Store & mongoose.Document;

@Schema({ timestamps: true })
@ObjectType()
export class Store {
  @Field(() => ID)
  _id: string;

  @Prop({ unique: true, required: true })
  @Field()
  name: string;

  @Prop({ required: true })
  @Field()
  location: string;

  @Prop({
    type: StoreHistory,
    ref: 'StoreHistory',
    default: [],
  })
  @Field(() => [StoreHistory])
  history: StoreHistory;
}

export const StoreSchema = SchemaFactory.createForClass(Store);
