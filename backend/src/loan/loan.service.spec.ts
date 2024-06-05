import { Test, TestingModule } from "@nestjs/testing";
import { LoanService } from "./loan.service";
import { PrismaService } from "../prisma.service";
import { HttpService } from "@nestjs/axios";
import { of } from "rxjs";
import { CreateLoanDto } from "./dto/create-loan.dto";
import { AxiosResponse } from "axios";

describe("LoanService", () => {
  let service: LoanService;
  let prismaService: PrismaService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoanService,
        {
          provide: PrismaService,
          useValue: {
            loan: {
              create: jest.fn(),
              findMany: jest.fn(),
              findFirst: jest.fn(),
            },
          },
        },
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<LoanService>(LoanService);
    prismaService = module.get<PrismaService>(PrismaService);
    httpService = module.get<HttpService>(HttpService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("getApprovalStatus", () => {
    it("should return true for valid salary and score combinations", () => {
      expect(service.getApprovalStatus(2000, 400)).toBe(true);
      expect(service.getApprovalStatus(4000, 500)).toBe(true);
      expect(service.getApprovalStatus(8000, 600)).toBe(true);
      expect(service.getApprovalStatus(12000, 700)).toBe(true);
    });

    it("should return false for invalid salary and score combinations", () => {
      expect(service.getApprovalStatus(2000, 399)).toBe(false);
      expect(service.getApprovalStatus(4000, 499)).toBe(false);
      expect(service.getApprovalStatus(8000, 599)).toBe(false);
      expect(service.getApprovalStatus(12000, 699)).toBe(false);
      expect(service.getApprovalStatus(13000, 800)).toBe(false);
    });
  });

  describe("create", () => {
    it("should create a loan", async () => {
      const loanDto: CreateLoanDto = {
        companyName: "Test Company",
        loanPlot: 5,
        loanTotalValue: 10000,
        loanMonths: 12,
        date: new Date(),
        salary: 5000,
        employeeId: 1,
      };

      const mockResponse: AxiosResponse = {
        data: { score: 600 },
        status: 200,
        statusText: "OK",
        headers: {},
        config: {
          headers: undefined,
        },
      };

      jest.spyOn(httpService, "get").mockImplementationOnce(() => of(mockResponse));
      jest.spyOn(prismaService.loan, "create").mockResolvedValueOnce(loanDto as any);

      const result = await service.create(loanDto);

      expect(result).toEqual(loanDto);
      expect(httpService.get).toHaveBeenCalled();
      expect(prismaService.loan.create).toHaveBeenCalledWith({
        data: {
          companyName: loanDto.companyName,
          loanPlot: loanDto.loanPlot,
          loanTotalValue: loanDto.loanTotalValue,
          loanMonths: loanDto.loanMonths,
          date: loanDto.date,
          approved: true,
          salary: loanDto.salary,
          employee: { connect: { id: loanDto.employeeId } },
        },
      });
    });
  });

  describe("findAll", () => {
    it("should return all loans", async () => {
      const loans = [{ id: 1, companyName: "Test Company" }];
      jest.spyOn(prismaService.loan, "findMany").mockResolvedValueOnce(loans as any);

      const result = await service.findAll();
      expect(result).toEqual(loans);
      expect(prismaService.loan.findMany).toHaveBeenCalled();
    });
  });

  describe("findOne", () => {
    it("should return a loan by id", async () => {
      const loan = { id: 1, companyName: "Test Company" };
      jest.spyOn(prismaService.loan, "findFirst").mockResolvedValueOnce(loan as any);

      const result = await service.findOne(1);
      expect(result).toEqual(loan);
      expect(prismaService.loan.findFirst).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });
});
