import { CreateItemInput } from './create-item.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
// import { Types } from 'mongoose';
// import * as mongoose from 'mongoose';

// type Params = {
//   input: Record<string, number>;
//   _id: Types.ObjectId;
// };

@InputType()
export class UpdateItemInput extends PartialType(CreateItemInput) {
  @Field(() => ID)
  _id: string;
}
