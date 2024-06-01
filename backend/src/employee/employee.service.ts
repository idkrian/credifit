import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}

  private async isUniqueField(data: CreateEmployeeDto | UpdateEmployeeDto, field: string) {
    const employeeEmail = await this.prisma.employee.findUnique({
      where: { email: data[field] },
    });
    if (employeeEmail) {
      throw new NotFoundException([`Este ${field} já existe!`]);
    }

    const employeeCpf = await this.prisma.employee.findUnique({
      where: { cpf: data[field] },
    });
    if (employeeCpf) {
      throw new NotFoundException([`Este ${field} já existe!`]);
    }
  }

  private async validateId(id: number) {
    if (isNaN(id)) {
      throw new NotFoundException(["o id deve ser um número!"]);
    }
  }

  async create(data: CreateEmployeeDto) {
    await this.isUniqueField(data, "email");
    await this.isUniqueField(data, "cpf");

    const createEmployee = await this.prisma.employee.create({ data });
    delete createEmployee.password;
    return createEmployee;
  }

  async findAll() {
    return await this.prisma.employee.findMany();
  }

  async findOne(id: number) {
    await this.validateId(id);
    const employee = await this.prisma.employee.findUnique({ where: { id } });
    if (!employee) {
      throw new NotFoundException(["Este id não foi encontrado!"]);
    }
    return employee;
  }

  async update(id: number, data: UpdateEmployeeDto) {
    await this.validateId(id);
    await this.isUniqueField(data, "email");
    await this.isUniqueField(data, "cpf");

    const employee = await this.prisma.employee.update({ where: { id }, data });
    if (!employee) {
      throw new NotFoundException(["Este id não foi encontrado!"]);
    }
    return employee;
  }

  async remove(id: number) {
    await this.validateId(id);
    const removeEmployee = await this.prisma.employee.delete({ where: { id } });
    return removeEmployee;
  }
}
