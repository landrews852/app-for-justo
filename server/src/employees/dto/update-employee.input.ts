import { CreateEmployeeInput } from './create-employee.input';
import { InputType, Field, ID, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateEmployeeInput extends PartialType(CreateEmployeeInput) {
  @Field(() => ID)
  _id: string;
}
