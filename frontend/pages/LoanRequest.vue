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
              Faça login ou registre um novo funcionário para ter acesso a
              página.
            </p>
            <div class="flex gap-4">
              <NuxtLink
                to="/EmployeeAuth"
                class="border-2 border-[#057D88] text-[#057D88] w-56 px-6 py-3 rounded-full font-semibold text-center"
              >
                Autenticar Funcionário
              </NuxtLink>
              <NuxtLink
                to="/EmployeeCreation"
                class="bg-[#057D88] w-56 px-6 py-3 rounded-full text-white font-semibold text-center"
              >
                Registrar Funcionário
              </NuxtLink>
            </div>
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
              :disabled="stepStore.currentStep === 1 && employeeDataStore.employee?.loanPlot! == null"
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
import { useToast } from "~/components/ui/toast";
const stepStore = useStepStore();
const employeeDataStore = useEmployeeDataStore();
const employeeCookie = useCookie("employeeData");
const router = useRouter();
const { toast } = useToast();

onMounted(() => {
  if (employeeCookie.value === undefined) {
    router.push("/");
  }
});
const employeeData = JSON.parse(JSON.stringify(employeeCookie.value!));
let step2Active = ref(0);
watch(employeeDataStore, () => {
  step2Active.value = employeeDataStore.employee?.loanPlot!;
});
watch(stepStore, () => {
  if (stepStore.currentStep === 0) {
    employeeDataStore.clearEmployee();
  }
});

const submitLoan = async () => {
  const loanData = {
    ...employeeDataStore.employee,
    salary: employeeData.salary,
    companyName: "Seguros Securitizadora",
    date: new Date(),
    employeeId: employeeData.id,
  };
  try {
    await $fetch("http://localhost:3001/loan", {
      method: "POST",
      body: loanData,
      onResponseError({ response }) {
        console.error(
          "Erro na resposta:",
          response._data.message || "Erro desconhecido"
        );
        toast({
          title: "Erro!",
          description: response._data.message || "Erro desconhecido",
          variant: "destructive",
        });
      },
    });
    stepStore.incrementStep();
  } catch (error) {
    console.log(error);
  }
};
</script>
