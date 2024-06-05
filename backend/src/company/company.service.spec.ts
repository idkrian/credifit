import { Test, TestingModule } from "@nestjs/testing";
import { NotFoundException } from "@nestjs/common";
import { CompanyService } from "./company.service";
import { PrismaService } from "../prisma.service";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { AuthCompanyDto } from "./dto/auth-company.dto";

describe("CompanyService", () => {
  let service: CompanyService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyService,
        {
          provide: PrismaService,
          useValue: {
            employee: {
              findUnique: jest.fn(),
            },
            company: {
              findUniqueOrThrow: jest.fn(),
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<CompanyService>(CompanyService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("auth", () => {
    it("should authenticate a company", async () => {
      const authData: AuthCompanyDto = { email: "teste@gmail.com", password: "senha" };
      const mockCompany = { id: 1, email: "teste@gmail.com", password: "senha" };
      (prisma.company.findUniqueOrThrow as jest.Mock).mockResolvedValue(mockCompany);

      const result = await service.auth(authData);

      expect(result).toEqual({ id: 1, email: "teste@gmail.com" });
    });
  });

  describe("create", () => {
    it("should create a company", async () => {
      const createData: any = { email: "teste@gmail.com", cpf: "12345678901", password: "senha" };
      const mockCompany = { id: 1, ...createData };
      (prisma.company.create as jest.Mock).mockResolvedValue(mockCompany);

      await service.create(createData);

      expect(prisma.employee.findUnique).toHaveBeenCalledTimes(2);
      expect(prisma.company.create).toHaveBeenCalledWith({ data: createData });
    });

    it("should throw an error if email is not unique", async () => {
      const createData: any = { email: "teste@gmail.com", cpf: "12345678901", password: "senha" };
      (prisma.employee.findUnique as jest.Mock).mockResolvedValueOnce({ email: "teste@gmail.com" });

      await expect(service.create(createData)).rejects.toThrow(NotFoundException);
    });

    it("should throw an error if CPF is not unique", async () => {
      const createData: any = { email: "teste@gmail.com", cpf: "12345678901", password: "senha" };
      (prisma.employee.findUnique as jest.Mock).mockResolvedValueOnce(null);
      (prisma.employee.findUnique as jest.Mock).mockResolvedValueOnce({ cpf: "12345678901" });

      await expect(service.create(createData)).rejects.toThrow(NotFoundException);
    });
  });

  describe("findAll", () => {
    it("should return an array of companies", async () => {
      const mockCompanies = [{ id: 1, email: "teste@gmail.com" }];
      (prisma.company.findMany as jest.Mock).mockResolvedValue(mockCompanies);

      const result = await service.findAll();

      expect(result).toEqual(mockCompanies);
    });
  });

  describe("findOne", () => {
    it("should return a company", async () => {
      const mockCompany = { id: 1, email: "teste@gmail.com", employees: [] };
      (prisma.company.findUnique as jest.Mock).mockResolvedValue(mockCompany);

      const result = await service.findOne(1);

      expect(result).toEqual(mockCompany);
    });

    it("should throw an error if company is not found", async () => {
      (prisma.company.findUnique as jest.Mock).mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe("update", () => {
    it("should update a company", async () => {
      const updateData: UpdateCompanyDto = { email: "new@test.com", cpf: "12345678901", password: "senha" };
      const mockCompany = { id: 1, ...updateData };
      (prisma.company.update as jest.Mock).mockResolvedValue(mockCompany);

      await service.update(1, updateData);

      expect(prisma.company.update).toHaveBeenCalledWith({ where: { id: 1 }, data: updateData });
    });
  });

  describe("remove", () => {
    it("should remove a company", async () => {
      const mockCompany = { id: 1, email: "teste@gmail.com" };
      (prisma.company.delete as jest.Mock).mockResolvedValue(mockCompany);

      const result = await service.remove(1);

      expect(result).toEqual(mockCompany);
    });
  });
});
