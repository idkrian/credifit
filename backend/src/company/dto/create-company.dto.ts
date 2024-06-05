import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateCompanyDto {
  @IsString({ message: "O campo deve ser uma string!" })
  name: string;

  @IsString({ message: "O campo deve ser uma string!" })
  companyName: string;

  @IsString({ message: "O campo deve ser uma string!" })
  @IsNotEmpty({ message: "O campo CNPJ é obrigatório!" })
  @Length(14, 14, { message: "O CNPJ deve conter apenas os 14 digitos" })
  cnpj: string;

  @IsString({ message: "O campo deve ser uma string!" })
  @IsNotEmpty({ message: "O campo cpf é obrigatório!" })
  @Length(11, 11, { message: "O CPF deve conter apenas os 11 digitos" })
  cpf: string;

  @IsString({ message: "O campo deve ser uma string!" })
  @IsEmail({}, { message: "O campo deve ser um email!" })
  @IsNotEmpty({ message: "O campo email é obrigatório!" })
  email: string;

  password: string;
}
