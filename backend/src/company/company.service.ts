import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  private async isUniqueEmail(data: CreateCompanyDto | UpdateCompanyDto) {
    const email = await this.prisma.employee.findUnique({
      where: { email: data["email"] },
    });
    if (email) {
      throw new NotFoundException([`Este email já existe!`]);
    }
  }
  private async isUniqueCpf(data: CreateCompanyDto | UpdateCompanyDto) {
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
  async create(data: CreateCompanyDto) {
    await this.isUniqueEmail(data);
    await this.isUniqueCpf(data);

    return await this.prisma.company.create({ data });
  }

  async findAll() {
    return await this.prisma.company.findMany();
  }

  async findOne(id: number) {
    await this.validateId(id);
    const company = await this.prisma.company.findUnique({ where: { id } });
    if (!company) {
      throw new NotFoundException(["Este id não foi encontrado!"]);
    }
    return company;
  }

  async update(id: number, data: UpdateCompanyDto) {
    await this.validateId(id);
    await this.isUniqueEmail(data);
    await this.isUniqueCpf(data);

    const company = await this.prisma.company.update({ where: { id }, data });
    if (!company) {
      throw new NotFoundException(["Este id não foi encontrado!"]);
    }
    return company;
  }

  async remove(id: number) {
    await this.validateId(id);
    return await this.prisma.company.delete({ where: { id } });
  }
}
