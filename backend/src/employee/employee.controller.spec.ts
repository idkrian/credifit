import { Test, TestingModule } from "@nestjs/testing";
import { EmployeeController } from "./employee.controller";
import { EmployeeService } from "./employee.service";
import { AuthEmployeeDto } from "./dto/auth-employee.dto";
import { Prisma } from "@prisma/client";

describe("EmployeeController", () => {
  let controller: EmployeeController;
  let service: EmployeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [
        {
          provide: EmployeeService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            auth: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<EmployeeController>(EmployeeController);
    service = module.get<EmployeeService>(EmployeeService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("create", () => {
    it("should create a new employee", async () => {
      const createEmployeeDto: any = {
        name: "Test",
        cpf: "12345678900",
        email: "teste@gmail.com",
        password: "senha",
        salary: new Prisma.Decimal(1000),
        companyId: 1,
      };
      const result = { id: 1, ...createEmployeeDto };
      jest.spyOn(service, "create").mockResolvedValue(result);

      expect(await controller.create(createEmployeeDto)).toBe(result);
    });
  });

  describe("findAll", () => {
    it("should return an array of employees", async () => {
      const result = [{ id: 1, name: "Test", cpf: "12345678900", email: "teste@gmail.com", password: "senha", salary: new Prisma.Decimal(1000), companyId: 1 }];
      jest.spyOn(service, "findAll").mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe("auth", () => {
    it("should authenticate the employee", async () => {
      const data: AuthEmployeeDto = {
        email: "teste@gmail.com",
        password: "senha",
      };
      const employee = { ...data, id: 1, name: "Test", salary: new Prisma.Decimal(1000), companyId: 1, cpf: "12324215242" };
      jest.spyOn(service, "auth").mockResolvedValue(employee);

      const result = await service.auth(data);
      expect(result).toEqual(expect.objectContaining({ email: "teste@gmail.com" }));
    });
  });

  describe("update", () => {
    it("should update an employee by id", async () => {
      const updateEmployeeDto: any = {
        name: "Updated Test",
        cpf: "12345678900",
        email: "update@gmail.com",
        password: "senha",
        salary: new Prisma.Decimal(1000),
        companyId: 1,
      };
      const result = { id: 1, ...updateEmployeeDto };
      jest.spyOn(service, "update").mockResolvedValue(result);

      expect(await controller.update("1", updateEmployeeDto)).toBe(result);
    });
  });

  describe("remove", () => {
    it("should remove an employee by id", async () => {
      const result = { id: 1, name: "Test", cpf: "12345678900", email: "teste@gmail.com", password: "senha", salary: new Prisma.Decimal(1000), companyId: 1 };
      jest.spyOn(service, "remove").mockResolvedValue(result);

      expect(await controller.remove("1")).toBe(result);
    });
  });
});
