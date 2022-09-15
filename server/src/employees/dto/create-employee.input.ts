import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateEmployeeInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  position: string;
}
