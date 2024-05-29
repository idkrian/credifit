<template>
  <ClientOnly>
    <div class="flex bg-[#FFE5D5] p-4 rounded-xl">
      <div class="pr-4">
        <img src="../assets/betina.png" alt="betina" class="w-12" />
      </div>
      <p class="text-xl">
        Você solicitou seu empréstimo! Agora aguarde as etapas de análises serem
        concluídas!
      </p>
    </div>
    <Accordion
      type="single"
      class="w-full grid grid-cols-1 gap-4 max-h-[20rem] overflow-y-auto"
      collapsible
      :default-value="defaultValue"
    >
      <AccordionItem
        v-for="item in accordionItems"
        :key="item.value"
        :value="item.value"
      >
        <AccordionTrigger class="uppercase font-bold text-md">
          <div class="items-center justify-center align-middle">
            <Icon :name="item.icon" color="black" class="size-5" />
            {{ item.title }}
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div
            class="flex p-4 bg-green-300 rounded-full w-fit gap-4 items-center"
          >
            <Icon :name="item.icon" color="green" class="size-6" />
            <p class="text-lg">Crédito Aprovado</p>
          </div>
          <div class="w-full grid grid-cols-2 my-6 gap-6">
            <div>
              <p class="font-semibold text-lg">Empresa</p>
              <p>R$10.000,00</p>
            </div>
            <div>
              <p class="font-semibold text-lg">Número de parcelas</p>
              <p>R$10.000,00</p>
            </div>
            <div>
              <p class="font-semibold text-lg">Próximo Vencimento</p>
              <p>2x R$ 5.000,00</p>
            </div>
            <div>
              <p class="font-semibold text-lg">Valor da Parcela</p>
              <p>2x R$ 5.000,00</p>
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

const defaultValue = "item-1";

const accordionItems = [
  {
    value: "item-1",
    icon: "lets-icons:done-ring-round",
    title: "SOLICITAÇÃO DE EMPRÉSTIMO 01",
    content: "Yes. It adheres to the WAI-ARIA design pattern.",
  },
  {
    value: "item-2",
    icon: "ph:clock-clockwise-fill",
    title: "EMPRÉSTIMO CORRENTE 01",
    content:
      "Yes. It's unstyled by default, giving you freedom over the look and feel.",
  },
];
</script>
