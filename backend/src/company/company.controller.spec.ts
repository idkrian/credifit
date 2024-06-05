import { Test, TestingModule } from "@nestjs/testing";
import { CompanyController } from "./company.controller";
import { CompanyService } from "./company.service";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { AuthCompanyDto } from "./dto/auth-company.dto";

describe("CompanyController", () => {
  let controller: CompanyController;
  let service: CompanyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyController],
      providers: [
        {
          provide: CompanyService,
          useValue: {
            auth: jest.fn(),
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CompanyController>(CompanyController);
    service = module.get<CompanyService>(CompanyService);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("auth", () => {
    it("should authenticate a company", async () => {
      const authData: AuthCompanyDto = { email: "teste@gmail.com", password: "senha" };
      const mockCompany = { id: 1, email: "teste@gmail.com" };
      (service.auth as jest.Mock).mockResolvedValue(mockCompany);

      const result = await controller.auth(authData);

      expect(result).toEqual(mockCompany);
      expect(service.auth).toHaveBeenCalledWith(authData);
    });
  });

  describe("create", () => {
    it("should create a company", async () => {
      const createData: any = { email: "teste@gmail.com", cpf: "12345678901", password: "senha" };
      const mockCompany = { id: 1, ...createData };
      (service.create as jest.Mock).mockResolvedValue(mockCompany);

      const result = await controller.create(createData);

      expect(result).toEqual(mockCompany);
      expect(service.create).toHaveBeenCalledWith(createData);
    });
  });

  describe("findAll", () => {
    it("should return an array of companies", async () => {
      const mockCompanies = [{ id: 1, email: "teste@gmail.com" }];
      (service.findAll as jest.Mock).mockResolvedValue(mockCompanies);

      const result = await controller.findAll();

      expect(result).toEqual(mockCompanies);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe("findOne", () => {
    it("should return a company", async () => {
      const mockCompany = { id: 1, email: "teste@gmail.com", employees: [] };
      (service.findOne as jest.Mock).mockResolvedValue(mockCompany);

      const result = await controller.findOne("1");

      expect(result).toEqual(mockCompany);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe("update", () => {
    it("should update a company", async () => {
      const updateData: UpdateCompanyDto = { email: "new@gmail.com", cpf: "12345678901", password: "senha" };
      const mockCompany = { id: 1, ...updateData };
      (service.update as jest.Mock).mockResolvedValue(mockCompany);

      const result = await controller.update("1", updateData);

      expect(result).toEqual(mockCompany);
      expect(service.update).toHaveBeenCalledWith(1, updateData);
    });
  });

  describe("remove", () => {
    it("should remove a company", async () => {
      const mockCompany = { id: 1, email: "teste@gmail.com" };
      (service.remove as jest.Mock).mockResolvedValue(mockCompany);

      const result = await controller.remove("1");

      expect(result).toEqual(mockCompany);
      expect(service.remove).toHaveBeenCalledWith(1);
    });
  });
});
