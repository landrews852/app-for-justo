import { ID, ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { History } from 'src/histories/entities/history.entity';

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
    type: Array<mongoose.Schema.Types.ObjectId>,
    ref: History.name,
    default: [],
  })
  @Field(() => [History], { nullable: true })
  storeHistory?: History[];
}

export const StoreSchema = SchemaFactory.createForClass(Store);
