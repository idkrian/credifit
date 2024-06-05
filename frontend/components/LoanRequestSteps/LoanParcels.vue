<template>
  <ClientOnly>
    <p class="self-start text-[#057D88] font-bold text-xl">
      Simular Empréstimo
    </p>
    <div class="flex bg-[#FFE5D5] p-4 rounded-xl">
      <div class="pr-4">
        <img src="../../assets/betina.png" alt="betina" class="w-12" />
      </div>
      <p class="text-xl">
        Escolha a opção de parcelamento que melhor funcionar para você:
      </p>
    </div>
    <p
      class="bg-[#EAEDED] py-2 px-4 rounded-2xl text-[#004F56] text-3xl font-semibold"
    >
      R$ {{ Number(employeeDataStore.employee?.loanTotalValue) }}
    </p>
    <ToggleGroup type="single" class="w-full">
      <div class="w-full grid grid-cols-2 gap-2">
        <div v-for="plot in plots">
          <ToggleGroupItem
            :value="String(plot.months)"
            :aria-label="plot.months"
            class="h-16 w-full border-l-8 border-orange-500 shadow-md"
            @click="setEmployeeData(plot.months, plot.plot)"
          >
            <button>{{ plot.months }}x de {{ plot.plot.toFixed(2) }}</button>
          </ToggleGroupItem>
        </div>
      </div>
    </ToggleGroup>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useEmployeeDataStore } from "~/stores/employeeOrder";
const employeeDataStore = useEmployeeDataStore();
const employeeLoanValue = Number(
  employeeDataStore.employee!.loanTotalValue.toFixed(2)
);
const plots = [
  { months: 1, plot: employeeLoanValue },
  { months: 2, plot: employeeLoanValue / 2 },
  { months: 3, plot: employeeLoanValue / 3 },
  { months: 4, plot: employeeLoanValue / 4 },
];

const setEmployeeData = (month: number, plot: number) => {
  employeeDataStore.setEmployee({
    loanMonths: month,
    loanPlot: plot,
    loanTotalValue: employeeLoanValue,
  });
};
</script>
