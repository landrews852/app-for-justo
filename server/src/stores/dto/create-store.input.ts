import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateStoreInput {
  @Field()
  name: string;

  @Field()
  location: string;
}
