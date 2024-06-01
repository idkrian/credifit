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
              @click="stepStore.incrementStep"
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
const stepStore = useStepStore();
</script>
