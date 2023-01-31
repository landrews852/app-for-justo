// import { ObjectType, Field, ID, InterfaceType } from '@nestjs/graphql';
// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import * as mongoose from 'mongoose';
// import { User } from 'src/users/entities/user.entity';

// export type ItemDocument = Item & mongoose.Document;

// @Schema()
// @ObjectType()
// export class Item {
//   @Field(() => ID)
//   _id: string;

//   @Prop({ required: true })
//   @Field()
//   name: string;

//   @Prop({ required: true })
//   @Field()
//   model: string;

//   @Prop({ unique: true, required: true })
//   @Field()
//   serialNumber: string;

//   @Prop({
//     type: Array,
//     ref: 'ItemHistory',
//     default: [],
//   })
//   @Field(() => [ItemHistory])
//   itemHistory: ItemHistory[];

//   @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
//   @Field(() => User, { nullable: true })
//   createdBy: string;
// }

// const resolveItemHistoryType = (
//   itemHistory: ItemHistory,
// ): typeof StoreItemHistory | typeof EmployeeItemHistory => {
//   switch (itemHistory.ownerType) {
//     case 'Bodega':
//       return StoreItemHistory;
//     case 'Empleado':
//       return EmployeeItemHistory;
//     default:
//       return null;
//   }
// };

// @InterfaceType({ isAbstract: true, resolveType: resolveItemHistoryType })
// export class ItemHistory extends Item {
//   @Field()
//   relationId: string;

//   @Field()
//   ownerType?: string;

//   @Field()
//   date: Date;
// }

// @ObjectType({ isAbstract: true })
// class StoreItemHistory extends ItemHistory {}

// @ObjectType({ isAbstract: true })
// class EmployeeItemHistory extends ItemHistory {}

// export const ItemSchema = SchemaFactory.createForClass(Item);

// ItemSchema.index({ createdBy: 1 });

import { ObjectType, Field, ID, InterfaceType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/entities/user.entity';

export type ItemDocument = Item & mongoose.Document;

@Schema()
@ObjectType()
export class Item {
  @Field(() => ID)
  _id: string;

  @Prop({ required: true })
  @Field()
  name: string;

  @Prop({ required: true })
  @Field()
  model: string;

  @Prop({ unique: true, required: true })
  @Field()
  serialNumber: string;

  @Prop({
    type: Array,
    ref: 'ItemHistory',
    default: [],
  })
  @Field(() => [ItemHistory])
  itemHistory: ItemHistory[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @Field(() => User, { nullable: true })
  createdBy: string;
}

const resolveItemHistoryType = (
  itemHistory: ItemHistory,
): typeof StoreItemHistory | typeof EmployeeItemHistory => {
  switch (itemHistory.ownerType) {
    case 'Bodega':
      return StoreItemHistory;
    case 'Empleado':
      return EmployeeItemHistory;
    default:
      return null;
  }
};

@InterfaceType({ isAbstract: true, resolveType: resolveItemHistoryType })
export class ItemHistory {
  @Field()
  relationId: string;

  @Field()
  ownerType?: string;

  @Field()
  date: Date;
}

@ObjectType({ isAbstract: true })
export class StoreItemHistory extends ItemHistory {}

@ObjectType({ isAbstract: true })
export class EmployeeItemHistory extends ItemHistory {}

export const ItemSchema = SchemaFactory.createForClass(Item);

ItemSchema.index({ createdBy: 1 });
