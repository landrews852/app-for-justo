import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ItemsService } from './items.service';
import { Item } from './entities/item.entity';
import { CreateItemInput } from './dto/create-item.input';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { FindItemInput } from './dto/find-item.input';
import { UpdateItemInput } from './dto/update-item.input';
import { AddHistoryInput } from './dto/add-history.input';

@Resolver(() => Item)
export class ItemsResolver {
  constructor(
    private itemsService: ItemsService,
    private usersService: UsersService,
  ) {}

  @Mutation(() => Item)
  async createItem(@Args('input') item: CreateItemInput) {
    console.log(item);
    return this.itemsService.create(item);
  }

  @Mutation(() => Item)
  async updateItem(@Args('input') item: UpdateItemInput) {
    console.log(item);
    return this.itemsService.update(item);
  }

  @Mutation(() => Item)
  async addHistory(@Args('input') history: AddHistoryInput) {
    console.log(history);
    return this.itemsService.addHistory(history);
  }

  @Query(() => [Item], { name: 'items' })
  async findAll() {
    return this.itemsService.findAll();
  }

  @Query(() => Item)
  async item(@Args('input') input: FindItemInput) {
    if (input._id) {
      return this.itemsService.findById(input._id);
    }
    if (input.serialNumber) {
      return this.itemsService.findBySerialNumber(input.serialNumber);
    } else
      return Error(
        'Es necesario el "Número de serie" o el "ID" para realizar la búsqueda',
      );
  }

  @ResolveField(() => User)
  async createdBy(@Parent() parent: Item) {
    return this.usersService.findById(parent.createdBy);
  }

  @Mutation(() => Item)
  async deleteItem(@Args('_id') _id: string) {
    return await this.itemsService.delete(_id);
  }
}
