import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsResolver } from './items.resolver';
import { UsersService } from 'src/users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from './entities/item.entity';
import { User, UserSchema } from 'src/users/entities/user.entity';
import { EmployeesService } from 'src/employees/employees.service';
import {
  Employee,
  EmployeeSchema,
} from 'src/employees/entities/employee.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Item.name, schema: ItemSchema },
      { name: User.name, schema: UserSchema },
      { name: Employee.name, schema: EmployeeSchema },
    ]),
  ],
  providers: [ItemsResolver, ItemsService, EmployeesService, UsersService],
})
export class ItemsModule {}
