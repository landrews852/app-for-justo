import { ID, ObjectType, Field } from '@nestjs/graphql';
import { Item } from 'src/items/entities/item.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { EmployeeHistory } from './types';
import { History } from 'src/histories/entities/history.entity';

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
    type: Array<mongoose.Schema.Types.ObjectId>,
    ref: History.name,
    default: [],
  })
  @Field(() => [History])
  employeeHistory: History[];
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);

EmployeeSchema.index({ User: 1 });
