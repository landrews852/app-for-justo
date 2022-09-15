import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class FindItemInput {
  @Field(() => Int, { nullable: true })
  _id: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  position: string;
}
