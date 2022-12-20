import { ID, ObjectType, Field, HideField } from '@nestjs/graphql';
import { Item } from 'src/items/entities/item.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type UserDocument = User & mongoose.Document;

@Schema({ timestamps: true })
@ObjectType()
export class User {
  @Field(() => ID)
  _id: any;

  @Prop({ required: true })
  @Field()
  username: string;

  @Prop({ unique: true, required: true })
  @Field()
  email: string;

  @Prop({ required: true })
  @HideField()
  @Field()
  password: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Item.name, default: [] })
  @Field(() => [Item])
  itemsCreated?: Item[];
}

export const UserSchema = SchemaFactory.createForClass(User);
