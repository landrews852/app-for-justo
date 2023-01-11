import { ID, ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type HistoryDocument = History & mongoose.Document;

enum action {
  In = 'in',
  Out = 'out',
}

@Schema({ timestamps: true })
@ObjectType()
export class History {
  @Field(() => ID)
  _id: string;

  @Prop({ required: true })
  @Field()
  type: string;

  @Prop({ required: true })
  @Field()
  relationID: string;

  @Field()
  action: action;

  @Field()
  date: Date;
}

export const HistorySchema = SchemaFactory.createForClass(History);
