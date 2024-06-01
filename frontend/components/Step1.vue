<template>
  <ClientOnly>
    <p class="self-start text-[#057D88] font-bold text-xl">
      Simular Empréstimo
    </p>
    <div class="flex bg-[#FFE5D5] p-4 rounded-xl">
      <div class="pr-4">
        <img src="../assets/betina.png" alt="betina" class="w-24" />
      </div>
      <p class="text-xl">
        Você possui saldo para Crédito Consignado pela empresa Seguros
        Seguradora. Faça uma simulação! Digite quanto você precisa:
      </p>
    </div>
    <p
      class="bg-[#EAEDED] py-2 px-4 rounded-2xl text-[#004F56] text-3xl font-semibold"
    >
      R$ {{ modelValue[0] }}
    </p>
    <Slider
      v-model="modelValue"
      :max="Number(employeeData?.salary) * 0.35"
      :step="50"
      :class="cn('w-3/5', $attrs.class ?? '')"
      @update:model-value="e => setEmployeeData(e!)"
    />
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { useEmployeeDataStore } from "~/stores/employeeOrder";
const employeeDataStore = useEmployeeDataStore();
const employeeCookie = useCookie("counter");
const employeeData = JSON.parse(JSON.stringify(employeeCookie.value!));
const modelValue = ref([200]);
const setEmployeeData = (data: number[]) => {
  modelValue.value = data;
  employeeDataStore.setEmployee({
    month: null,
    plot: null,
    loanValue: data[0],
  });
};
</script>
