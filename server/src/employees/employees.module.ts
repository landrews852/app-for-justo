import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesResolver } from './employees.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Item, ItemSchema } from 'src/items/entities/item.entity';
import { User, UserSchema } from 'src/users/entities/user.entity';
import { Employee, EmployeeSchema } from './entities/employee.entity';
import { ItemsService } from 'src/items/items.service';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Item.name, schema: ItemSchema },
      { name: User.name, schema: UserSchema },
      { name: Employee.name, schema: EmployeeSchema },
    ]),
  ],
  providers: [EmployeesResolver, EmployeesService, ItemsService, UsersService],
})
export class EmployeesModule {}
