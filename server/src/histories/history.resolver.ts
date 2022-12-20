import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { HistoryService } from './history.service';
import { History } from './entities/history.entity';
import { CreateHistoryInput } from './dto/create-history.input';
import { UpdateHistoryInput } from './dto/update-history.input';
import { FindHistoryInput } from './dto/find-history.input';

@Resolver(() => History)
export class HistoryResolver {
  constructor(private readonly historyService: HistoryService) {}

  @Mutation(() => History)
  createHistory(@Args('input') history: CreateHistoryInput) {
    return this.historyService.create(history);
  }

  @Mutation(() => History)
  async updateHistory(@Args('input') history: UpdateHistoryInput) {
    console.log(history);
    return this.historyService.update(history._id, history);
  }

  @Query(() => [History], { name: 'history' })
  findAll() {
    return this.historyService.findAll();
  }

  @Query(() => History)
  async history(@Args('input') input: FindHistoryInput) {
    return this.historyService.findById(input._id);
  }
}
