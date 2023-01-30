import { CreateItemInput } from './create-item.input';
import { InputType, Field, PartialType, ID, ObjectType } from '@nestjs/graphql';
import { GraphQLJSON, GraphQLJSONObject } from 'graphql-type-json';

@InputType()
export class AddHistoryInput {
  @Field(() => ID)
  _id: string;

  @Field(() => GraphQLJSONObject)
  itemHistory: {};
}
