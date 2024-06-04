import { Test, TestingModule } from "@nestjs/testing";
import { EmployeeService } from "./employee.service";
const fakeEmployees = [
  {
    id: 1,
    name: "Beicin",
    cpf: "64645643671",
    email: "riansouza2@gmail.com",
    password: "1234",
    salary: "2500",
    companyId: 1,
  },
  {
    id: 2,
    name: "João Pedro",
    cpf: "12324212421",
    email: "joao@gmail.com",
    password: "1234",
    salary: "6000",
    companyId: 1,
  },
  {
    id: 3,
    name: "Pedro Silva",
    cpf: "42127612321",
    email: "pedro@gmail.com",
    password: "1234",
    salary: "4222",
    companyId: 1,
  },
];
describe("EmployeeService", () => {
  let service: EmployeeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeService],
    }).compile();

    service = module.get<EmployeeService>(EmployeeService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
