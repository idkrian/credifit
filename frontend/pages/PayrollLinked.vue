<template>
  <ClientOnly>
    <div class="flex flex-col align-middle justify-center items-center h-full">
      <div class="flex flex-col items-center gap-8">
        <div class="flex self-start">
          <NuxtLink to="/">
            <Icon name="mingcute:left-line" color="black" class="size-16" />
          </NuxtLink>
          <div>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/"> Home </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Crédito Consignado</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <p class="text-3xl text-[#057D88]">Crédito Consignado</p>
          </div>
        </div>
        <div
          v-if="employeeData.hasOwnProperty('companyName')"
          class="flex flex-col justify-center items-center shadow-lg rounded-lg px-6 py-8 w-[40rem] gap-8"
        >
          <div class="flex flex-col items-center justify-center gap-6">
            <Icon name="mingcute:alert-fill" color="orange" class="size-24" />

            <p class="text-center text-md">
              Apenas usuários contratados em empresas conveniadas podem
              solicitar um empréstimo.
            </p>
            <p class="text-center text-md">
              Faça Login como funcionário para ter acesso a página.
            </p>
            <NuxtLink
              to="/EmployeeAuth"
              class="bg-[#057D88] w-56 px-6 py-3 rounded-full text-white font-semibold text-center"
            >
              Fazer Login como Funcionário
            </NuxtLink>
          </div>
        </div>
        <div
          v-else
          class="flex flex-col justify-center items-center shadow-lg rounded-lg px-6 py-8 w-[40rem] gap-8"
        >
          <Stepper />
          <div class="flex gap-4 self-end">
            <button
              :class="`border-2 w-56  px-6 py-4 rounded-full font-bold ${
                stepStore.currentStep == 0
                  ? 'border-slate-300 text-slate-300'
                  : 'border-[#057D88] text-[#057D88]'
              }`"
              @click="stepStore.decrementStep"
              :disabled="stepStore.currentStep == 0"
            >
              Voltar
            </button>
            <button
              class="bg-[#057D88] w-56 px-6 py-4 rounded-full text-white font-bold"
              @click="
                stepStore.currentStep === 2
                  ? submitLoan()
                  : stepStore.incrementStep()
              "
            >
              {{
                stepStore.currentStep === 0
                  ? "Simular Empréstimo"
                  : stepStore.currentStep === 1
                  ? "Seguinte"
                  : stepStore.currentStep === 2
                  ? "Solicitar Empréstimo"
                  : stepStore.currentStep === 3
                  ? "Novo Empréstimo"
                  : "Seguinte"
              }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useStepStore } from "~/stores/steps";
import { useEmployeeDataStore } from "~/stores/employeeOrder";
const stepStore = useStepStore();
const employeeDataStore = useEmployeeDataStore();
const employeeCookie = useCookie("employeeData");
const router = useRouter();
onMounted(() => {
  if (employeeCookie.value === undefined) {
    router.push("/");
  }
});
const employeeData = JSON.parse(JSON.stringify(employeeCookie.value!));
console.log(employeeData.hasOwnProperty("companyName"));

const submitLoan = async () => {
  const loanData = {
    ...employeeDataStore.employee,
    salary: employeeData.salary,
    companyName: "Seguros Securitizadora",
    date: new Date(),
  };
  try {
    await $fetch("http://localhost:3001/loan", {
      method: "POST",
      body: loanData,
    });
    stepStore.incrementStep();
  } catch (error) {
    console.log(error);
  }
};
</script>
