import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Employee } from 'src/employees/entities/employee.entity';
// import { Store } from 'src/stores/entities/store.entity';
import { User } from 'src/users/entities/user.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
// import { History } from 'src/histories/entities/history.entity';
// import { BaseSchema } from '../common/base.schema';

export type ItemDocument = Item & mongoose.Document;

@Schema()
@ObjectType()
export class Item {
  // @Field()
  // readonly _id: mongoose.ObjectId;

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

  // @Prop({
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: History.name,
  //   default: [],
  // })
  // @Field(() => [History], { nullable: true })
  // history: History[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @Field(() => User, { nullable: true })
  createdBy: string;
}

export const ItemSchema = SchemaFactory.createForClass(Item);

// ItemSchema.index({ User: 1 });
