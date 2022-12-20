import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsService } from './items.service';
import { ItemsResolver } from './items.resolver';
import { Item, ItemSchema } from './entities/item.entity';
import { UsersService } from 'src/users/users.service';
import { User, UserSchema } from 'src/users/entities/user.entity';
import { EmployeesService } from 'src/employees/employees.service';
import {
  Employee,
  EmployeeSchema,
} from 'src/employees/entities/employee.entity';
import { StoresService } from 'src/stores/stores.service';
import { Store, StoreSchema } from 'src/stores/entities/store.entity';
import { HistoryService } from 'src/histories/history.service';
import { History, HistorySchema } from 'src/histories/entities/history.entity';

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
    ItemsResolver,
    ItemsService,
    EmployeesService,
    UsersService,
    StoresService,
    HistoryService,
  ],
})
export class ItemsModule {}
