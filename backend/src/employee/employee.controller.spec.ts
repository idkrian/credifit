import { Test, TestingModule } from "@nestjs/testing";
import { EmployeeController } from "./employee.controller";
import { EmployeeService } from "./employee.service";
import { PrismaService } from "../../src/prisma.service";

describe("EmployeeController", () => {
  let employeeController: EmployeeController;
  let employeeService: EmployeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [EmployeeService, PrismaService],
    }).compile();

    employeeController = module.get<EmployeeController>(EmployeeController);
    employeeService = module.get<EmployeeService>(EmployeeService);
  });

  it("should be defined", () => {
    expect(employeeController).toBeDefined();
    expect(employeeService).toBeDefined();
  });
});
