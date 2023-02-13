import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { StoresService } from './stores.service';
import { Store } from './entities/store.entity';
import { CreateStoreInput } from './dto/create-store.input';
import { UpdateStoreInput } from './dto/update-store.input';
import { FindStoreInput } from './dto/find-store.input';
import { HistoryService } from 'src/histories/history.service';
import { History } from 'src/histories/entities/history.entity';

@Resolver(() => Store)
export class StoresResolver {
  constructor(
    private storesService: StoresService,
    private historyService: HistoryService,
  ) {}

  @Mutation(() => Store)
  async createStore(@Args('input') store: CreateStoreInput) {
    console.log(store);
    return this.storesService.create(store);
  }

  @Mutation(() => Store)
  async updateStore(@Args('input') store: UpdateStoreInput) {
    console.log(store);
    return this.storesService.update(store);
  }

  @Query(() => [Store], { name: 'stores' })
  async findAll() {
    return this.storesService.findAll();
  }

  @Query(() => Store)
  async store(@Args('input') input: FindStoreInput) {
    if (input._id) {
      return this.storesService.findById(input._id);
    }
    if (input.name) {
      return this.storesService.findOne(input.name);
    } else
      return Error(
        'Es necesario el "Nombre" o el "ID" para realizar la búsqueda',
      );
  }

  @Mutation(() => Store)
  async deleteStore(@Args('_id') _id: string) {
    return await this.storesService.delete(_id);
  }

  @ResolveField(() => History)
  async storeHistory(@Parent() parent: Store) {
    return this.historyService.findByRelationId(parent._id);
  }
}
