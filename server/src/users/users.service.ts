import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
// import { InjectModel } from '@nestjs/mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
// import { UpdateUserInput } from './dto/update-user.input';
// import { FindUserInput } from './dto/find-user.input';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {
  users: Partial<User>[];
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(user: CreateUserInput) {
    return this.userModel.create(user);
  }

  async update(_id: string, user: UpdateUserInput) {
    return await this.userModel.updateOne(user);
  }

  async findAll() {
    return this.userModel.find().lean();
  }

  // async findOne(input) {
  //   const item = await this.userModel
  //     .findOne({ serialNumber: input }, function (err, docs) {
  //       if (err) {
  //         console.log(err);
  //       } else {
  //         console.log('Result: ', docs);
  //         return docs;
  //       }
  //     })
  //     .lean()
  //     .clone();

  //   if (item) return item;
  //   else return Error("There's a problem with your search");
  // }

  async findById(_id: string) {
    const user = this.userModel.findById(_id);
    if (user) return user;
    else return Error("There's a problem with your search");
    //   const user = this.users.filter((user) => user._id === id);
    //   if (user.length) {
    //     return user[0];
    //   }
    //   return Error("There's a problem with your search");
    //   // user.length ? user[0] : Error("There's a problem with your search");
  }
}
