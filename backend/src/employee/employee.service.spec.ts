import { Test, TestingModule } from "@nestjs/testing";
import { EmployeeService } from "./employee.service";
import { PrismaService } from "../prisma.service";
import { NotFoundException } from "@nestjs/common";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { AuthEmployeeDto } from "./dto/auth-employee.dto";
import { Prisma } from "@prisma/client";

describe("EmployeeService", () => {
  let service: EmployeeService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmployeeService,
        {
          provide: PrismaService,
          useValue: {
            employee: {
              findUnique: jest.fn(),
              findUniqueOrThrow: jest.fn(),
              create: jest.fn(),
              findMany: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<EmployeeService>(EmployeeService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("isUniqueEmail", () => {
    it("should throw a NotFoundException if email already exists", async () => {
      const data: any = {
        id: 1,
        name: "Test",
        cpf: "12345678900",
        email: "teste@gmail.com",
        password: "senha",
        salary: new Prisma.Decimal(1000),
        companyId: 1,
      };
      jest.spyOn(prisma.employee, "findUnique").mockResolvedValue(data);

      await expect(service["isUniqueEmail"](data)).rejects.toThrow(NotFoundException);
    });

    it("should not throw if email does not exist", async () => {
      const data: CreateEmployeeDto = {
        id: 1,
        name: "Test",
        cpf: "12345678900",
        email: "teste@gmail.com",
        password: "senha",
        salary: new Prisma.Decimal(1000),
        companyId: 1,
      };
      jest.spyOn(prisma.employee, "findUnique").mockResolvedValue(null);

      await expect(service["isUniqueEmail"](data)).resolves.not.toThrow();
    });
  });

  describe("isUniqueCpf", () => {
    it("should throw a NotFoundException if cpf already exists", async () => {
      const data: any = {
        id: 1,
        name: "Test",
        cpf: "12345678900",
        email: "teste@gmail.com",
        password: "senha",
        salary: new Prisma.Decimal(1000),
        companyId: 1,
      };
      jest.spyOn(prisma.employee, "findUnique").mockResolvedValue(data);

      await expect(service["isUniqueCpf"](data)).rejects.toThrow(NotFoundException);
    });

    it("should not throw if cpf does not exist", async () => {
      const data: CreateEmployeeDto = {
        id: 1,
        name: "Test",
        cpf: "12345678900",
        email: "teste@gmail.com",
        password: "senha",
        salary: new Prisma.Decimal(1000),
        companyId: 1,
      };
      jest.spyOn(prisma.employee, "findUnique").mockResolvedValue(null);

      await expect(service["isUniqueCpf"](data)).resolves.not.toThrow();
    });
  });

  describe("validateId", () => {
    it("should throw a NotFoundException if id is not a number", async () => {
      await expect(service["validateId"](NaN)).rejects.toThrow(NotFoundException);
    });
  });

  describe("auth", () => {
    it("should authenticate the employee", async () => {
      const data: AuthEmployeeDto = {
        email: "teste@gmail.com",
        password: "senha",
      };
      const employee = { ...data, id: 1, name: "Test", salary: new Prisma.Decimal(1000), companyId: 1, cpf: "12324215242" };
      jest.spyOn(prisma.employee, "findUniqueOrThrow").mockResolvedValue(employee);

      const result = await service.auth(data);
      expect(result).toEqual(expect.objectContaining({ email: "teste@gmail.com" }));
      expect(result).not.toHaveProperty("senha");
    });
  });

  describe("create", () => {
    it("should create a new employee", async () => {
      const data: any = {
        id: 1,
        name: "Test",
        cpf: "12345678900",
        email: "teste@gmail.com",
        password: "senha",
        salary: new Prisma.Decimal("1000"),
        companyId: 1,
      };
      const employee = { ...data, id: 1 };
      jest.spyOn(prisma.employee, "create").mockResolvedValue(employee);

      const result = await service.create(data);
      expect(result).toEqual(expect.objectContaining({ email: "teste@gmail.com" }));
      expect(result).not.toHaveProperty("senha");
    });
  });

  describe("findAll", () => {
    it("should return an array of employees", async () => {
      const employees = [{ id: 1, name: "Test", cpf: "12345678900", email: "teste@gmail.com", password: "senha", salary: new Prisma.Decimal(1000), companyId: 1 }];
      jest.spyOn(prisma.employee, "findMany").mockResolvedValue(employees);

      const result = await service.findAll();
      expect(result).toEqual(employees);
    });
  });

  describe("findOne", () => {
    it("should find an employee by id", async () => {
      const employee = { id: 1, name: "Test", cpf: "12345678900", email: "teste@gmail.com", password: "senha", salary: new Prisma.Decimal(1000), companyId: 1 };
      jest.spyOn(prisma.employee, "findUnique").mockResolvedValue(employee);

      const result = await service.findOne(1);
      expect(result).toEqual(employee);
    });
  });

  describe("update", () => {
    it("should update an employee", async () => {
      const data: any = {
        name: "Updated Test",
        cpf: "12345678900",
        email: "update@gmail.com",
        password: "senha",
        salary: new Prisma.Decimal(2000),
        companyId: 1,
      };
      const employee = { ...data, id: 1 };
      jest.spyOn(prisma.employee, "update").mockResolvedValue(employee);

      const result = await service.update(1, data);
      expect(result).toEqual(employee);
    });

    it("should throw a NotFoundException if employee is not found", async () => {
      const data: UpdateEmployeeDto = {
        name: "Updated Test",
        cpf: "12345678900",
        email: "update@gmail.com",
        password: "senha",
        salary: new Prisma.Decimal(2000),
        companyId: 1,
      };
      jest.spyOn(prisma.employee, "update").mockResolvedValue(null);

      await expect(service.update(1, data)).rejects.toThrow(NotFoundException);
    });
  });

  describe("remove", () => {
    it("should remove an employee", async () => {
      const employee = { id: 1, name: "Test", cpf: "12345678900", email: "teste@gmail.com", password: "senha", salary: new Prisma.Decimal(1000), companyId: 1 };
      jest.spyOn(prisma.employee, "delete").mockResolvedValue(employee);

      const result = await service.remove(1);
      expect(result).toEqual(employee);
    });
  });
});
