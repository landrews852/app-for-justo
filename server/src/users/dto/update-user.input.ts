import { CreateUserInput } from './create-user.input';
import { InputType, Field, ID, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => ID)
  _id: number;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
