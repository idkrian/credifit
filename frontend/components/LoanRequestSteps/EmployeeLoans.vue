<template>
  <ClientOnly>
    <div class="flex bg-[#FFE5D5] p-4 rounded-xl">
      <div class="pr-4">
        <img src="../../assets/betina.png" alt="betina" class="w-12" />
      </div>
      <p class="text-xl">
        Você solicitou seu empréstimo! Agora aguarde as etapas de análises serem
        concluídas!
      </p>
    </div>
    <div v-if="error">{{ error }}</div>
    <div v-if="pending">
      <Skeleton class="h-[125px] w-[250px] rounded-xl" />
    </div>
    <Accordion
      type="single"
      class="w-full grid grid-cols-1 gap-4 max-h-[20rem] overflow-y-auto"
      collapsible
      v-else
    >
      <AccordionItem
        v-for="loan in loanData"
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
              <p class="font-semibold text-lg">Próximo Vencimento</p>
              <p>{{ new Date(loan.date).toLocaleDateString() }}</p>
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
</template>

<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import type { EmployeeProp } from "../../helpers/interfaces";
const employeeCookie = useCookie("employeeData");
const employeeData = JSON.parse(JSON.stringify(employeeCookie.value!));

const { data, pending, error } = await useFetch<EmployeeProp>(
  `http://localhost:3001/employee/${employeeData.id}`
);
const loanData = data.value!.loans;
</script>
