import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryResolver } from './history.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from 'src/items/entities/item.entity';
import { User, UserSchema } from 'src/users/entities/user.entity';
import {
  Employee,
  EmployeeSchema,
} from 'src/employees/entities/employee.entity';
import { History, HistorySchema } from './entities/history.entity';
import { Store, StoreSchema } from 'src/stores/entities/store.entity';
import { ItemsService } from 'src/items/items.service';
import { EmployeesService } from 'src/employees/employees.service';
import { UsersService } from 'src/users/users.service';
import { StoresService } from 'src/stores/stores.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Item.name, schema: ItemSchema },
      { name: User.name, schema: UserSchema },
      { name: Employee.name, schema: EmployeeSchema },
      { name: Store.name, schema: StoreSchema },
      { name: History.name, schema: HistorySchema },
    ]),
  ],
  providers: [
    HistoryResolver,
    HistoryService,
    ItemsService,
    EmployeesService,
    UsersService,
    StoresService,
  ],
})
export class HistoryModule {}
