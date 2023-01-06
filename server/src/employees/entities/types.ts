import { ObjectType, Field } from '@nestjs/graphql';

enum action {
  In = 'in',
  Out = 'out',
}

@ObjectType()
export class EmployeeHistory {
  @Field()
  _id: string;

  @Field()
  itemName: string;

  @Field()
  serialNumber: string;

  @Field()
  action: action;

  @Field()
  date: Date;
}
