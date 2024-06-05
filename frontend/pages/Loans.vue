<template>
  <div
    v-if="employeeData.hasOwnProperty('companyName')"
    class="flex flex-col justify-center items-center shadow-lg rounded-lg px-6 py-8 w-full gap-8 h-full"
  >
    <div class="flex flex-col items-center justify-center gap-6">
      <Icon name="mingcute:alert-fill" color="orange" class="size-24" />

      <p class="text-center text-md">
        Apenas usuários contratados em empresas conveniadas podem consultar seus
        empréstimos.
      </p>
      <p class="text-center text-md">
        Faça login ou registre um novo funcionário para ter acesso a página.
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
  <div v-else class="flex flex-col m-16 p-4 h-full shadow-inner">
    <ClientOnly>
      <div class="flex p-4 rounded-xl">
        <p class="text-xl font-semibold text-[#057D88]">
          Suas Solicitações de empréstimo
        </p>
      </div>
      <div v-if="error">{{ error }}</div>
      <div v-if="pending">
        <Skeleton class="h-[125px] w-[250px] rounded-xl" />
      </div>
      <Accordion
        type="single"
        class="w-full grid grid-cols-1 gap-4 max-h-[40rem] overflow-y-auto"
        collapsible
        v-else
      >
        <AccordionItem
          v-for="loan in loanData"
          v-if="!pending"
          :key="loan.id"
          :value="String(loan.id)"
        >
          <AccordionTrigger class="uppercase font-bold text-md">
            <div class="items-center justify-center align-middle">
              <Icon
                :name="
                  loan.approved
                    ? 'lets-icons:done-ring-round'
                    : 'ph:clock-clockwise-fill'
                "
                :color="loan.approved ? 'green' : 'red'"
                class="size-5"
              />
              Solicitação de Empréstimo {{ loan.id }}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div
              :class="`flex p-4 rounded-full w-fit gap-4 items-center ${
                loan.approved ? 'bg-green-300' : 'bg-red-400'
              }`"
            >
              <Icon
                :name="
                  loan.approved
                    ? 'lets-icons:done-ring-round'
                    : 'ph:clock-clockwise-fill'
                "
                :color="loan.approved ? 'green' : 'black'"
                class="size-6"
              />
              <p class="text-lg">
                {{ loan.approved ? "Crédito Aprovado" : "Reprovado por Score" }}
              </p>
            </div>
            <div class="w-full grid grid-cols-2 my-6 gap-6">
              <div>
                <p class="font-semibold text-lg">Empresa</p>
                <p>{{ loan.companyName }}</p>
              </div>
              <div>
                <p class="font-semibold text-lg">Próximos Vencimentos</p>
                <p v-for="parcel in parcelMonths(loan.date, loan.loanMonths)">
                  {{ parcel }}
                </p>
              </div>
              <div>
                <p class="font-semibold text-lg">Total Financiado</p>
                <p>{{ loan.loanTotalValue }}</p>
              </div>
              <div>
                <p class="font-semibold text-lg">Valor da Parcela</p>
                <p>{{ loan.loanMonths }}x de {{ loan.loanPlot }}</p>
              </div>
              <div>
                <p class="font-semibold text-lg">Número de parcelas</p>
                <p>{{ loan.loanMonths }}x</p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import type { EmployeeProp } from "../helpers/interfaces";
const employeeCookie = useCookie("employeeData");
const employeeData = JSON.parse(JSON.stringify(employeeCookie.value!));
const parcelMonths = (date: Date, months: number) => {
  let monthsArray = [];
  for (let i = 0; i < months; i++) {
    monthsArray.push(
      new Date(
        new Date(date).setMonth(new Date(date).getMonth() + i)
      ).toLocaleDateString("pt-BR")
    );
  }
  return monthsArray;
};
const { data, pending, error } = await useFetch<EmployeeProp>(
  `http://localhost:3001/employee/${employeeData.id}`
);

const loanData = data.value!.loans;
</script>
