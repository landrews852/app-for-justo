import { ObjectType, Field, ID, InterfaceType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { History } from 'src/histories/entities/history.entity';
import { User } from 'src/users/entities/user.entity';
// import { ItemHistory } from './itemHistory.entity';

export type ItemDocument = Item & mongoose.Document;

@Schema()
@ObjectType()
export class Item {
  @Field(() => ID)
  _id: string;

  @Prop({ required: true })
  @Field()
  name: string;

  @Prop({ required: true })
  @Field()
  model: string;

  @Prop({ unique: true, required: true })
  @Field()
  serialNumber: string;

  // @Prop({ default: [] })
  // @Field(() => [ItemHistory])
  // itemHistory: ItemHistory[];

  @Prop({
    type: Array<mongoose.Schema.Types.ObjectId>,
    ref: History.name,
    default: [],
  })
  @Field(() => [History], { nullable: true })
  itemHistory?: History[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @Field(() => User, { nullable: true })
  createdBy: string;
}

export const ItemSchema = SchemaFactory.createForClass(Item);

ItemSchema.index({ createdBy: 1 });
