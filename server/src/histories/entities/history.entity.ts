import { ID, ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Item } from 'src/items/entities/item.entity';

export type HistoryDocument = History & mongoose.Document;

@Schema({ timestamps: true })
@ObjectType()
export class History {
  @Field(() => ID)
  _id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Item' })
  @Field(() => Item, { nullable: true })
  item: string;

  @Prop({ required: true })
  @Field()
  relationId: string;

  @Prop({ required: true })
  @Field()
  relationName: string;

  // "type" para diferenciar la entidad relacionada
  @Prop({ required: true })
  @Field()
  ownerType: 'Bodega' | 'Empleado';

  @Prop({ required: true })
  @Field()
  date: string;
}

export const HistorySchema = SchemaFactory.createForClass(History);
