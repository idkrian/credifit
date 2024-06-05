import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { EmployeeModule } from "./employee/employee.module";
import { PrismaService } from "./prisma.service";
import { CompanyModule } from "./company/company.module";
import { LoanModule } from "./loan/loan.module";

@Module({
  imports: [EmployeeModule, CompanyModule, LoanModule],
  providers: [AppService, PrismaService],
})
export class AppModule {}

export { PrismaService };
