import { ObjectType, Field } from '@nestjs/graphql';

enum action {
  In = 'in',
  Out = 'out',
}

@ObjectType()
export class ItemHistory {
  @Field()
  _id: string;

  @Field()
  whereName: string;

  @Field({ nullable: true })
  email: string;

  @Field()
  action: action;

  @Field()
  date: Date;
}
