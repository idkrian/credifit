interface EmployeeProps {
  loanMonths?: number | null;
  loanTotalValue: number;
  loanPlot: number | null;
}
interface EmployeeState {
  employee: EmployeeProps | null;
}
export const useEmployeeDataStore = defineStore("employeeDataStore", {
  state: (): EmployeeState => ({
    employee: null,
  }),
  actions: {
    setEmployee(employeeData: EmployeeProps) {
      this.employee = employeeData;
    },
    clearEmployee() {
      this.employee = null;
    },
  },
});
