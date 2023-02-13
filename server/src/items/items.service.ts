import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateItemInput } from './dto/create-item.input';
import { UpdateItemInput } from './dto/update-item.input';
import { Item, ItemDocument } from './entities/item.entity';
// import { AddHistoryInput } from './dto/add-history.input';
// import { v1 as uuidv1 } from 'uuid';

@Injectable()
export class ItemsService {
  constructor(@InjectModel(Item.name) private itemModel: Model<ItemDocument>) {}

  async create(item: CreateItemInput) {
    return await this.itemModel.create(item);
  }

  async update(item: UpdateItemInput) {
    return await this.itemModel.findByIdAndUpdate(
      item._id,
      {
        $set: {
          name: item.name,
          model: item.model,
          serialNumber: item.serialNumber,
          createdBy: item.createdBy,
        },
      },
      { new: true },
    );
  }

  // async addHistory(history: AddHistoryInput) {
  //   const { relationId, relationName, ownerType, date } = history;
  //   const id = uuidv1();

  //   return await this.itemModel.findByIdAndUpdate(
  //     history._id,
  //     {
  //       $push: {
  //         itemHistory: {
  //           itemHistoryId: id,
  //           relationId,
  //           relationName,
  //           ownerType,
  //           date,
  //         },
  //       },
  //     },
  //     { new: true },
  //   );
  // }

  async findAll() {
    return await this.itemModel.find().lean();
  }

  async findBySerialNumber(input) {
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

  async findUserById(userId: string) {
    return await this.itemModel.find({ createdBy: userId });
  }

  async delete(_id: string) {
    return await this.itemModel.findByIdAndDelete(_id);
  }
}
