import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { EmployeesService } from './employees.service';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeInput } from './dto/create-employee.input';
import { UpdateEmployeeInput } from './dto/update-employee.input';
import { FindEmployeeInput } from './dto/find-employee.input';

@Resolver(() => Employee)
export class EmployeesResolver {
  constructor(private readonly employeesService: EmployeesService) {}

  @Mutation(() => Employee)
  async createEmployee(
    @Args('createEmployeeInput') createEmployeeInput: CreateEmployeeInput,
  ) {
    return this.employeesService.create(createEmployeeInput);
  }

  @Mutation(() => Employee)
  async updateItem(@Args('input') employee: UpdateEmployeeInput) {
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

  // @Mutation(() => Employee)
  // removeEmployee(@Args('_id', { type: () => Int }) _id: string) {
  //   return this.employeesService.remove(_id);
  // }

  // @Query(() => Employee, { name: 'employee' })
  // async findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.employeesService.findOne(id);
  // }

  // @Query(() => Employee)
  // async employee(@Args('input') input: FindEmployeeInput) {
  //   return this.employeesService.findById(input._id);
  // }
}
