import { Prisma } from "@prisma/client";
import { IsString, IsEmail, IsNotEmpty, Length, IsNumber } from "class-validator";
import { CreateLoanDto } from "src/loan/dto/create-loan.dto";

export class CreateEmployeeDto {
  id: number;
  @IsString({ message: "O campo deve ser uma string!" })
  name?: string;

  @IsString({ message: "O campo deve ser uma string!" })
  @IsNotEmpty({ message: "O campo cpf é obrigatório!" })
  @Length(11, 11, { message: "O CPF deve ter exatamente 11 caracteres" })
  cpf?: string;

  @IsString({ message: "O campo deve ser uma string!" })
  @IsEmail({}, { message: "O campo deve ser um email!" })
  @IsNotEmpty({ message: "O campo email é obrigatório!" })
  email?: string;

  password?: string;

  @IsNotEmpty({ message: "O campo salário é obrigatório!" })
  salary: Prisma.Decimal;
  companyId: number;
  loans?: CreateLoanDto[];
}
