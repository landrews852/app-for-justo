import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { EmployeesService } from './employees.service';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeInput } from './dto/create-employee.input';
import { UpdateEmployeeInput } from './dto/update-employee.input';
import { FindEmployeeInput } from './dto/find-employee.input';
import { HistoryService } from 'src/histories/history.service';

@Resolver(() => Employee)
export class EmployeesResolver {
  constructor(
    private employeesService: EmployeesService,
    private historyService: HistoryService,
  ) {}

  @Mutation(() => Employee)
  async createEmployee(@Args('input') employee: CreateEmployeeInput) {
    return this.employeesService.create(employee);
  }

  @Mutation(() => Employee)
  async updateEmployee(@Args('input') employee: UpdateEmployeeInput) {
    console.log(employee);
    return this.employeesService.update(employee);
  }

  @Query(() => [Employee], { name: 'employees' })
  async findAll() {
    return this.employeesService.findAll();
  }

  @Query(() => Employee, { name: 'employee' })
  async employee(@Args('input') input: FindEmployeeInput) {
    if (input._id) {
      return this.employeesService.findById(input._id);
    }
    if (input.email) {
      return this.employeesService.findOne(input.email);
    } else
      return Error(
        'Es necesario el "Correo" o el "ID" para realizar la búsqueda',
      );
  }

  @Mutation(() => Employee)
  async deleteEmployee(@Args('_id') _id: string) {
    return await this.employeesService.delete(_id);
  }

  @ResolveField(() => History)
  async employeeHistory(@Parent() parent: Employee) {
    return this.historyService.findByRelationId(parent._id);
  }
}
