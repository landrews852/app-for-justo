import { CreateItemInput } from './create-item.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
// import { ItemHistory } from '../entities/itemHistory.entity';

@InputType()
export class UpdateItemInput extends PartialType(CreateItemInput) {
  @Field(() => ID)
  _id: string;

  // @Field(() => ItemHistory, { nullable: true })
  // itemHistory: ItemHistory;
}
