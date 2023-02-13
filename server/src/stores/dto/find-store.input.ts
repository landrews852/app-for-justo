import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class FindStoreInput {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Field({ nullable: true })
  name: string;
}
