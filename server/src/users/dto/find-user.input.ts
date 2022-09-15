import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class FindUserInput {
  @Field(() => Int)
  _id: number;
}
