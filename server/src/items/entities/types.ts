import { ObjectType, Field } from '@nestjs/graphql';

enum action {
  in = 'in',
  out = 'out',
}

@ObjectType()
export class ItemHistory {
  // @Field()
  // _id: string;

  @Field()
  relationId: string;

  @Field()
  type: string;

  @Field()
  action: action;

  @Field()
  date: Date;
}
