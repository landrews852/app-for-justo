import { ObjectType, Field, ID } from '@nestjs/graphql';
// import { Schema } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Employee } from 'src/employees/entities/employee.entity';
import { Store } from 'src/stores/entities/store.entity';

@ObjectType()
export class ItemHistory {
  @Field()
  whereId: string;

  @Field()
  enter: Date;

  @Field()
  out: Date;
}
// var ItemHistory = new mongoose.Schema({
//   // export type ItemHistory = {
//   _id: mongoose.Types.ObjectId,
//   whereId: Employee | Store | string,
//   enter: Date,
//   out: Date,
// });

// export type ItemHistory = {
//   _id: Employee | Store | unknown;
// };
