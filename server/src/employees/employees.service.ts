import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEmployeeInput } from './dto/create-employee.input';
import { UpdateEmployeeInput } from './dto/update-employee.input';
import { Employee, EmployeeDocument } from './entities/employee.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>,
  ) {}

  async create(employee: CreateEmployeeInput) {
    return this.employeeModel.create(employee);
  }

  async update(employee: UpdateEmployeeInput) {
    return await this.employeeModel.findByIdAndUpdate(
      employee._id,
      {
        $set: {
          name: employee.name,
          email: employee.email,
          position: employee.position,
        },
      },
      { new: true },
    );
  }

  async findAll() {
    return this.employeeModel.find().lean();
  }

  async findOne(input) {
    const employee = this.employeeModel
      .findOne({ email: { input } }, function (err, docs) {
        if (err) {
          console.log(err);
        } else {
          console.log('Result: ', docs);
          return docs;
        }
      })
      .lean()
      .clone();

    if (employee) return employee;
    else return Error("There's a problem with your search");
  }

  async findById(input: string) {
    const employee = this.employeeModel.findById(input);
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
