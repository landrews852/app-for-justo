import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class FindHistoryInput {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Field({ nullable: true })
  relationId: string;
}
