import { InputType, Field, ID } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@InputType()
export class AddHistoryInput {
  @Field(() => ID)
  _id: string;

  // @Field(() => GraphQLJSONObject)
  // itemHistory: JSON;

  @Field()
  relationId: string;

  @Field()
  relationName: string;

  @Field()
  ownerType: string;

  @Field()
  date: string;
}
