import { Test, TestingModule } from "@nestjs/testing";
import { LoanController } from "./loan.controller";
import { LoanService } from "./loan.service";
import { CreateLoanDto } from "./dto/create-loan.dto";

describe("LoanController", () => {
  let controller: LoanController;
  let service: LoanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoanController],
      providers: [
        {
          provide: LoanService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<LoanController>(LoanController);
    service = module.get<LoanService>(LoanService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("create", () => {
    it("should create a new loan", async () => {
      const createLoanDto: CreateLoanDto = {
        companyName: "Test Company",
        loanPlot: 5,
        loanTotalValue: 10000,
        loanMonths: 12,
        date: new Date(),
        salary: 5000,
        employeeId: 1,
      };

      const result = { id: 1, ...createLoanDto };

      jest.spyOn(service, "create").mockResolvedValueOnce(result as any);

      expect(await controller.create(createLoanDto)).toEqual(result);
      expect(service.create).toHaveBeenCalledWith(createLoanDto);
    });
  });

  describe("findAll", () => {
    it("should return an array of loans", async () => {
      const result = [{ id: 1, companyName: "Test Company" }];
      jest.spyOn(service, "findAll").mockResolvedValueOnce(result as any);

      expect(await controller.findAll()).toEqual(result);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe("findOne", () => {
    it("should return a single loan by id", async () => {
      const result = { id: 1, companyName: "Test Company" };
      jest.spyOn(service, "findOne").mockResolvedValueOnce(result as any);

      expect(await controller.findOne("1")).toEqual(result);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });
});
