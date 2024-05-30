import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { EmployeeModule } from "./employee/employee.module";
import { PrismaService } from "./prisma.service";

@Module({
  imports: [EmployeeModule],
  providers: [AppService, PrismaService],
})
export class AppModule {}
