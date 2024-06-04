<template>
  <ClientOnly>
    <p class="self-start text-[#057D88] font-bold text-xl">
      Resumo da simulação
    </p>
    <div class="flex bg-[#FFE5D5] p-4 rounded-xl">
      <div class="pr-4">
        <img src="../assets/betina.png" alt="betina" class="w-28" />
      </div>
      <p class="text-xl">
        Pronto! Agora você já pode solicitar o empréstimo e recebê-lo na sua
        Conta Credifit! Veja o resumo da simulação!
      </p>
    </div>
    <div class="w-full grid grid-cols-2 my-6 gap-6">
      <div>
        <p class="font-semibold text-lg">Valor a Creditar</p>
        <p>R${{ employee!.loanTotalValue }}</p>
      </div>
      <div>
        <p class="font-semibold text-lg">Valor a financiar</p>
        <p>R${{ employee!.loanTotalValue }}</p>
      </div>
      <div>
        <p class="font-semibold text-lg">Parcelamento</p>
        <p>
          {{ employee!.loanMonths }}x R$ {{ employee!.loanPlot!.toFixed(2) }}
        </p>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { useEmployeeDataStore } from "~/stores/employeeOrder";
const { employee } = useEmployeeDataStore();
</script>
