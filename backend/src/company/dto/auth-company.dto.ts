import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class AuthCompanyDto {
  @IsString({ message: "O campo deve ser uma string!" })
  @IsEmail({}, { message: "O campo deve ser um email!" })
  @IsNotEmpty({ message: "O campo email é obrigatório!" })
  email: string;

  password: string;
}
