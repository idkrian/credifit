<template>
  <div
    class="flex flex-col justify-center items-center shadow-lg rounded-lg px-6 py-8 w-[40rem] gap-8"
  >
    <component :is="steps[stepStore.currentStep]"></component>
  </div>
</template>

<script setup>
import { useStepStore } from "~/stores/steps";
import LoanTotalValue from "./LoanRequestSteps/LoanTotalValue";
import LoanParcels from "./LoanRequestSteps/LoanParcels";
import LoanResume from "./LoanRequestSteps/LoanResume";
import EmployeeLoans from "./LoanRequestSteps/EmployeeLoans";

const steps = [LoanTotalValue, LoanParcels, LoanResume, EmployeeLoans];
const stepStore = useStepStore();
</script>

<style scoped>
button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
