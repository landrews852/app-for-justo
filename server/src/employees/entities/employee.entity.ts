import { ID, ObjectType, Field } from '@nestjs/graphql';
import { Item } from 'src/items/entities/item.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { EmployeeHistory } from './types';

export type EmployeeDocument = Employee & mongoose.Document;

@Schema()
@ObjectType()
export class Employee {
  @Field(() => ID)
  _id: string;

  @Prop({ unique: true, required: true })
  @Field()
  email: string;

  @Prop({ required: true })
  @Field()
  name: string;

  @Prop()
  @Field()
  position: string;

  @Prop({
    type: EmployeeHistory,
    ref: 'EmployeeHistory',
    default: [],
  })
  @Field(() => [EmployeeHistory])
  employeeHistory: EmployeeHistory[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Item' })
  @Field(() => [Item])
  itemsInPossession?: Item[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @Field(() => User, { nullable: true })
  createdBy: User | string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);

EmployeeSchema.index({ User: 1 });
