import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class FindStoreInput {
  @Field(() => Int, { nullable: true })
  _id: string;

  @Field({ nullable: true })
  name: string;
}
