import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class FindItemInput {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  model: string;

  @Field({ nullable: true })
  serialNumber: string;
}
