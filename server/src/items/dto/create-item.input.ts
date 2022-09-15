import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateItemInput {
  @Field()
  name: string;

  @Field()
  model: string;

  @Field()
  serialNumber: string;

  // @Field({ nullable: true })
  // temporaryOwner: string;

  // @Field(() => Int, { nullable: true })
  // pastOwners: number;

  @Field()
  createdBy: string;
}
