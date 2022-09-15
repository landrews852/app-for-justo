import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Employee } from 'src/employees/entities/employee.entity';
// import { Store } from 'src/stores/entities/store.entity';
import { User } from 'src/users/entities/user.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
// import { BaseSchema } from '../common/base.schema';

export type ItemDocument = Item & mongoose.Document;

@Schema()
@ObjectType()
export class Item {
  @Field(() => ID)
  _id: any;

  @Prop({ unique: true, required: true })
  @Field()
  name: string;

  @Prop({ required: true })
  @Field()
  model: string;

  @Prop({ unique: true, required: true })
  @Field()
  serialNumber: string;
  typeKey: '$type';

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Employee.name })
  @Field(() => Employee, { nullable: true })
  whereIsIt: Employee | number;

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Employee.name })
  // @Field(() => Employee, { nullable: true })
  // temporaryOwner: Employee | number;

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Employee.name })
  // @Field(() => Employee, { nullable: true })
  // pastOwners: [Employee] | [number];

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Store.name })
  // @Field(() => Store, { nullable: true })
  // store?: Store | number;

  // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Store.name })
  // @Field(() => Store, { nullable: true })
  // pastStores?: [Store] | [number];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @Field(() => User, { nullable: true })
  createdBy: User | number;
}

export const ItemSchema = SchemaFactory.createForClass(Item);

ItemSchema.index({ User: 1 });
