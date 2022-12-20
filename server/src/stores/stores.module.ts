import { Module } from '@nestjs/common';
import { StoresService } from './stores.service';
import { StoresResolver } from './stores.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from 'src/items/entities/item.entity';
import { User, UserSchema } from 'src/users/entities/user.entity';
import {
  Employee,
  EmployeeSchema,
} from 'src/employees/entities/employee.entity';
import { Store, StoreSchema } from './entities/store.entity';
import { History, HistorySchema } from 'src/histories/entities/history.entity';
import { HistoryService } from 'src/histories/history.service';
import { UsersService } from 'src/users/users.service';
import { EmployeesService } from 'src/employees/employees.service';
import { ItemsService } from 'src/items/items.service';

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
    StoresResolver,
    StoresService,
    ItemsService,
    EmployeesService,
    UsersService,
    HistoryService,
  ],
})
export class StoresModule {}
