import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateItemInput {
  @Field()
  name: string;

  @Field()
  model: string;

  @Field()
  serialNumber: string;

  // @Field()
  // whereIsIt?: string;

  @Field()
  createdBy: string;
}
