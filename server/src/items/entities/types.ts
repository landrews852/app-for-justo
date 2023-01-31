import { ObjectType } from '@nestjs/graphql';
import { ItemHistory } from './item.entity';

@ObjectType({ isAbstract: true })
export class StoreItemHistory extends ItemHistory {}

@ObjectType({ isAbstract: true })
export class EmployeeItemHistory extends ItemHistory {}
