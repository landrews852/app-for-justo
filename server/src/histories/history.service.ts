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

  async update(_id: string, history: UpdateHistoryInput) {
    return await this.historyModel.updateOne(history);
  }

  async findAll() {
    return this.historyModel.find().lean();
  }

  async findById(input: string) {
    const history = this.historyModel.findById(input);
    if (history) return history;
    else return Error("There's a problem with your search");
  }
}
