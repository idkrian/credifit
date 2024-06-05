export interface LoanProp {
  id: number;
  companyName: string;
  loanPlot: number;
  loanTotalValue: number;
  loanMonths: number;
  date: Date;
  approved: boolean;
  salary: number;
}

export interface EmployeeProp {
  name: string;
  cpf: string;
  email: string;
  password: string;
  salary: number;
  companyId: number;
  loans: LoanProp[];
}
