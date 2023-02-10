import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStoreInput } from './dto/create-store.input';
import { UpdateStoreInput } from './dto/update-store.input';
import { Store, StoreDocument } from './entities/store.entity';

@Injectable()
export class StoresService {
  users: Partial<Store>[];
  constructor(
    @InjectModel(Store.name) private storeModel: Model<StoreDocument>,
  ) {}

  async create(store: CreateStoreInput) {
    return await this.storeModel.create(store);
  }

  async update(store: UpdateStoreInput) {
    return await this.storeModel.findByIdAndUpdate(
      store._id,
      {
        $set: {
          name: store.name,
          location: store.location,
        },
      },
      { new: true },
    );
  }

  async findAll() {
    return this.storeModel.find().lean();
  }

  async findOne(input) {
    const store = await this.storeModel
      .findOne({ name: input }, function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          console.log('Result: ', docs);
          return docs;
        }
      })
      .lean()
      .clone();

    if (store) return store;
    else return Error("There's a problem with your search");
  }

  async findById(_id) {
    const store = this.storeModel.findById(_id);
    if (store) return store;
    else return Error("There's a problem with your search");
  }

  async delete(_id: string) {
    return await this.storeModel.findByIdAndDelete(_id);
  }
}
