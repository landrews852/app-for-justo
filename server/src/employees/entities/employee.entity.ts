import { ID, ObjectType, Field } from '@nestjs/graphql';
import { Item } from 'src/items/entities/item.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/entities/user.entity';

export type EmployeeDocument = Employee & mongoose.Document;

@Schema()
@ObjectType()
export class Employee {
  @Field(() => ID)
  _id: number;

  @Prop({ unique: true, required: true })
  @Field()
  email: string;

  @Prop({ required: true })
  @Field()
  name: string;

  @Prop()
  @Field()
  position: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Item' })
  @Field(() => [Item])
  assetsInPossession?: Item[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @Field(() => User, { nullable: true })
  createdBy: User | number;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);

EmployeeSchema.index({ User: 1 });
