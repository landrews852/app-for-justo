import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import users from 'src/data/users';
// import { InjectModel } from '@nestjs/mongoose';
import { CreateUserInput } from './dto/create-user.input';
// import { UpdateUserInput } from './dto/update-user.input';
// import { FindUserInput } from './dto/find-user.input';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {
  // constructor(@InjectModel(User)) {}

  users: Partial<User>[];
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    this.users = users;
  }

  async createUser(user: CreateUserInput) {
    // this.users = [user, ...this.users];
    return this.userModel.create(user);
  }

  async findAll() {
    return this.userModel.find().lean();
  }

  async findById(id) {
    const user = this.userModel.findById(id);
    if (user) return user;
    else return Error("There's a problem with your search");
    //   const user = this.users.filter((user) => user._id === id);
    //   if (user.length) {
    //     return user[0];
    //   }
    //   return Error("There's a problem with your search");
    //   // user.length ? user[0] : Error("There's a problem with your search");
  }

  // update(_id: number, updateUserInput: UpdateUserInput) {
  //   return `This action updates a #${_id} user`;
  // }

  // remove(_id: number) {
  //   return `This action removes a #${_id} user`;
  // }
}
