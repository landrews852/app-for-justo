import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export class ItemHistory {
  @Field(() => ID)
  itemHistoryId: string;

  @Field()
  relationId: string;

  @Field()
  relationName: string;

  @Field()
  ownerType: string;

  @Field()
  date: string;
}
