import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ItemHistory } from './types';
import { Employee } from 'src/employees/entities/employee.entity';
import { User } from 'src/users/entities/user.entity';
// import { Store } from 'src/stores/entities/store.entity';

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

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Employee.name })
  // @Field(() => Employee, { nullable: true })
  // whereIsIt: Employee;

  @Prop()
  @Field({ nullable: true })
  whereIsIt: string;

  @Prop({
    type: ItemHistory,
    ref: 'ItemHistory',
    default: [],
  })
  @Field(() => [ItemHistory])
  itemHistory: ItemHistory[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @Field(() => User, { nullable: true })
  createdBy: string;
}

export const ItemSchema = SchemaFactory.createForClass(Item);

// ItemSchema.index({ User: 1, ItemHistory: 1 });
ItemSchema.index({ User: 1 });
