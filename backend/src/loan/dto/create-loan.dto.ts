export class CreateLoanDto {
  companyName: string;
  loanPlot: number;
  loanTotalValue: number;
  loanMonths: number;
  date: Date;
  approved: boolean;
  salary: number;
  employeeId: number;
}
