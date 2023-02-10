import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateHistoryInput } from './dto/create-history.input';
import { UpdateHistoryInput } from './dto/update-history.input';
import { History, HistoryDocument } from './entities/history.entity';

@Injectable()
export class HistoryService {
  constructor(
    @InjectModel(History.name) private historyModel: Model<HistoryDocument>,
  ) {}

  async create(history: CreateHistoryInput) {
    return await this.historyModel.create(history);
  }

  async update(history: UpdateHistoryInput) {
    return await this.historyModel.findByIdAndUpdate(
      history._id,
      {
        $set: {
          item: history.item,
          relationId: history.relationId,
          relationName: history.relationName,
          ownerType: history.ownerType,
          date: history.date,
        },
      },
      { new: true },
    );
  }

  async findAll() {
    return this.historyModel.find().lean();
  }

  async findByRelationId(input) {
    const history = await this.historyModel
      .find({ relationId: input }, function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          console.log('Result: ', docs);
          return docs;
        }
      })
      .lean()
      .clone();

    if (history) return history;
    else return Error("There's a problem with your search");
  }

  async findById(input: string) {
    const history = this.historyModel.findById(input);
    if (history) return history;
    else return Error("There's a problem with your search");
  }

  async delete(_id: string) {
    return await this.historyModel.findByIdAndDelete(_id);
  }

  async findByItemId(itemId: string) {
    return await this.historyModel.find({ item: itemId });
  }
}
