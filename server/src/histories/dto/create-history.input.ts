import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateHistoryInput {
  @Field()
  item: string;

  @Field()
  relationId: string;

  @Field()
  relationName: string;

  @Field()
  ownerType: string;

  @Field()
  date: string;
}
