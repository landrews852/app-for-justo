import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import employees from 'src/data/employees';
import { CreateEmployeeInput } from './dto/create-employee.input';
import { Employee, EmployeeDocument } from './entities/employee.entity';
// import { UpdateEmployeeInput } from './dto/update-employee.input';

@Injectable()
export class EmployeesService {
  employees: Partial<Employee>[];
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>,
  ) {
    this.employees = employees;
  }

  async create(employee: CreateEmployeeInput) {
    return this.employeeModel.create(employee);
  }

  async findAll() {
    return this.employeeModel.find().lean();
  }

  async findOne(input) {
    const employee = this.employeeModel.findOne(
      { serialNumber: { input } },
      function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          console.log('Result: ', docs);
        }
      },
    );
    if (employee) return employee;
    else return Error("There's a problem with your search");
  }

  // update(id: number, updateEmployeeInput: UpdateEmployeeInput) {
  //   return `This action updates a #${id} employee`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} employee`;
  // }
}
