import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { PrismaService } from "../prisma.service";
import { AuthEmployeeDto } from "./dto/auth-employee.dto";

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) {}

  private async isUniqueEmail(data: CreateEmployeeDto | UpdateEmployeeDto) {
    const email = await this.prisma.employee.findUnique({
      where: { email: data["email"] },
    });
    if (email) {
      throw new NotFoundException([`Este email já existe!`]);
    }
  }
  private async isUniqueCpf(data: CreateEmployeeDto | UpdateEmployeeDto) {
    const cpf = await this.prisma.employee.findUnique({
      where: { cpf: data["cpf"] },
    });
    if (cpf) {
      throw new NotFoundException([`Este CPF já existe!`]);
    }
  }

  private async validateId(id: number) {
    if (isNaN(id)) {
      throw new NotFoundException(["o id deve ser um número!"]);
    }
  }

  async auth(data: AuthEmployeeDto) {
    const employee = await this.prisma.employee.findUniqueOrThrow({
      where: {
        email: data.email,
        password: data.password,
      },
    });
    delete employee.password;
    return employee;
  }
  async create(data: CreateEmployeeDto) {
    await this.isUniqueEmail(data);
    await this.isUniqueCpf(data);

    const employee = await this.prisma.employee.create({
      data: {
        name: data.name,
        cpf: data.cpf,
        email: data.email,
        password: data.password,
        salary: data.salary,
        company: {
          connect: {
            id: data.companyId,
          },
        },
      },
    });
    delete employee.password;
    return employee;
  }

  async findAll() {
    return await this.prisma.employee.findMany();
  }

  async findOne(id: number) {
    await this.validateId(id);
    const employee = await this.prisma.employee.findUnique({ where: { id }, include: { loans: true } });
    if (!employee) {
      throw new NotFoundException(["Este id não foi encontrado!"]);
    }
    return employee;
  }

  async update(id: number, data: UpdateEmployeeDto) {
    await this.validateId(id);
    await this.isUniqueEmail(data);
    await this.isUniqueCpf(data);

    const employee = await this.prisma.employee.update({
      where: { id },
      data: {
        name: data.name,
        cpf: data.cpf,
        email: data.email,
        password: data.password,
        salary: data.salary,
        company: {
          connect: {
            id: data.companyId,
          },
        },
      },
    });
    if (!employee) {
      throw new NotFoundException(["Este id não foi encontrado!"]);
    }
    return employee;
  }

  async remove(id: number) {
    await this.validateId(id);
    return await this.prisma.employee.delete({ where: { id } });
  }
}
