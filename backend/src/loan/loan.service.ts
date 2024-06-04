import { Injectable, Logger } from "@nestjs/common";
import { CreateLoanDto } from "./dto/create-loan.dto";
import { UpdateLoanDto } from "./dto/update-loan.dto";
import { PrismaService } from "src/prisma.service";
import { HttpService } from "@nestjs/axios";
import { AxiosError, AxiosResponse } from "axios";
import { catchError, firstValueFrom } from "rxjs";
interface Prop {
  score: number;
}
@Injectable()
export class LoanService {
  private readonly logger = new Logger();
  constructor(
    private prisma: PrismaService,
    private readonly httpService: HttpService,
  ) {}
  getApprovalStatus(salary: number, score: number) {
    if (salary <= 2000 && score >= 400) {
      return true;
    } else if (salary <= 4000 && score >= 500) {
      return true;
    } else if (salary <= 8000 && score >= 600) {
      return true;
    } else if (salary <= 12000 && score >= 700) {
      return true;
    } else {
      return false;
    }
  }
  async create(loan: CreateLoanDto) {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<Prop>("https://run.mocky.io/v3/ef99c032-8e04-4e6a-ad3e-6f413a9e707a").pipe(
          catchError((error: AxiosError) => {
            this.logger.error(error.response.data);
            throw "Ocorreu um erro!";
          }),
        ),
      );
      const approved = this.getApprovalStatus(loan.salary, data.score);
      return await this.prisma.loan.create({
        data: {
          companyName: loan.companyName,
          loanPlot: loan.loanPlot,
          loanTotalValue: loan.loanTotalValue,
          loanMonths: loan.loanMonths,
          date: loan.date,
          approved: approved,
          salary: loan.salary,
          employee: { connect: { id: loan.employeeId } },
        },
      });
    } catch (error) {
      console.log(error);
    }

    // this.getApprovalStatus(data.salary, score)
  }

  async findAll() {
    return await this.prisma.loan.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.loan.findFirst({ where: { id } });
  }

  async update(id: number, updateLoanDto: UpdateLoanDto) {
    return `This action updates a #${id} loan`;
  }

  async remove(id: number) {
    return `This action removes a #${id} loan`;
  }
}
