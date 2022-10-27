import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';
import { Item, ItemDocument } from './entities/item.entity';

@Injectable()
export class ItemsService {
  constructor(@InjectModel(Item.name) private itemModel: Model<ItemDocument>) {}

  async create(item: CreateItemInput) {
    return await this.itemModel.create(item);
  }

  async update(item: UpdateItemInput) {
    const id = item._id;
    console.log('item', item);

    return await this.itemModel.findOneAndUpdate({ id }, { ...item });
  }

  async findAll() {
    return this.itemModel.find().lean();
  }

  async findOne(input) {
    const item = await this.itemModel
      .findOne({ serialNumber: input }, function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          console.log('Result: ', docs);
          return docs;
        }
      })
      .lean()
      .clone();

    if (item) return item;
    else return Error("There's a problem with your search");
  }

  async findById(input: string) {
    const item = this.itemModel.findById(input);
    if (item) return item;
    else return Error("There's a problem with your search");
  }

  async findUserById(userId: any) {
    return this.itemModel.find({ createdBy: userId });
  }

  // remove(id: number) {
  //   return `This action removes a #${id} item`;
  // }
}
