import { CreateItemInput } from './create-item.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { ObjectId } from 'mongoose';

@InputType()
export class UpdateItemInput extends PartialType(CreateItemInput) {
  @Field(() => ID, { nullable: true })
  _id: ObjectId;

  // @Field({ nullable: true })
  // name?: string;

  // @Field({ nullable: true })
  // model?: string;

  // @Field({ nullable: true })
  // serialNumber?: string;
}
