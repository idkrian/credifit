import { Module } from "@nestjs/common";
import { LoanService } from "./loan.service";
import { LoanController } from "./loan.controller";
import { PrismaService } from "src/prisma.service";
import { HttpModule } from "@nestjs/axios";

@Module({
  controllers: [LoanController],
  imports: [HttpModule],
  providers: [LoanService, PrismaService],
})
export class LoanModule {}
