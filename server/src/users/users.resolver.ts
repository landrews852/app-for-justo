import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { ItemsService } from 'src/items/items.service';
import { Item } from 'src/items/entities/item.entity';
import { FindUserInput } from './dto/find-user.input';
// import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private usersService: UsersService,
    private itemsService: ItemsService,
  ) {}

  // @Mutation(() => User)
  // async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
  //   return this.usersService.createUser(createUserInput);
  // }

  @Mutation(() => User)
  async createUser(@Args('input') user: CreateUserInput) {
    return this.usersService.createUser(user);
  }

  @Query(() => [User], { name: 'users' })
  async findAll() {
    return this.usersService.findAll();
  }

  // @Query(() => User, { name: 'user' })
  // async findOne(@Args('_id', { type: () => Int }) _id: number) {
  //   return this.usersService.findById(_id);
  // }

  @Query(() => User)
  async user(@Args('input') { _id }: FindUserInput) {
    return this.usersService.findById(_id);
  }

  @ResolveField(() => Item)
  async itemsCreated(@Parent() parent: User) {
    return this.itemsService.findUserById(parent._id);
  }

  // @Mutation(() => User)
  // updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
  //   return this.usersService.update(updateUserInput._id, updateUserInput);
  // }

  // @Mutation(() => User)
  // removeUser(@Args('id', { type: () => Int }) id: number) {
  //   return this.usersService.remove(id);
  // }
}
