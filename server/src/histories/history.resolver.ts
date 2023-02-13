import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { History } from './entities/history.entity';
import { HistoryService } from './history.service';
import { CreateHistoryInput } from './dto/create-history.input';
import { UpdateHistoryInput } from './dto/update-history.input';
import { FindHistoryInput } from './dto/find-history.input';
import { Item } from '../items/entities/item.entity';
import { ItemsService } from '../items/items.service';

@Resolver(() => History)
export class HistoryResolver {
  constructor(
    private historyService: HistoryService,
    private itemsService: ItemsService,
  ) {}

  @Mutation(() => History)
  async createHistory(@Args('input') history: CreateHistoryInput) {
    console.log(history);
    return this.historyService.create(history);
  }

  @Mutation(() => History)
  async updateHistory(@Args('input') history: UpdateHistoryInput) {
    console.log(history);
    return this.historyService.update(history);
  }

  @Query(() => [History], { name: 'histories' })
  async findAll() {
    return this.historyService.findAll();
  }

  @Query(() => History)
  async history(@Args('input') input: FindHistoryInput) {
    if (input._id) {
      return this.historyService.findById(input._id);
    }
    if (input.relationId) {
      return this.historyService.findByRelationId(input.relationId);
    } else
      return Error(
        'Es necesario el "Número de serie" o el "ID" para realizar la búsqueda',
      );
  }

  @ResolveField(() => Item)
  async item(@Parent() parent: History) {
    return this.itemsService.findById(parent.item);
  }
}
