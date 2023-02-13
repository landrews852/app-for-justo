import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class FindEmployeeInput {
  @Field(() => ID, { nullable: true })
  _id: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  position: string;
}
