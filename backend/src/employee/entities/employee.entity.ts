import { CreateLoanDto } from "src/loan/dto/create-loan.dto";

export class EmployeeEntity {
  name: string;
  cpf: string;
  email: string;
  password: string;
  salary: number;
  companyId: number;
  loans?: CreateLoanDto[];

  constructor(employee?: Partial<EmployeeEntity>) {
    Object.assign(this, employee);
  }
}
