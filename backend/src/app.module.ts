import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { EmployeeModule } from "./employee/employee.module";
import { PrismaService } from "./prisma.service";
import { CompanyModule } from './company/company.module';

@Module({
  imports: [EmployeeModule, CompanyModule],
  providers: [AppService, PrismaService],
})
export class AppModule {}
