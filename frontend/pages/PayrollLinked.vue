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
          <p class="self-start text-[#057D88] font-bold text-xl">
            Simular Empréstimo
          </p>
          <div class="flex bg-[#FFE5D5] p-4 rounded-xl">
            <div class="pr-4">
              <img src="../assets/betina.png" alt="betina" class="w-28" />
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
            :max="50000"
            :step="1000"
            :class="cn('w-3/5', $attrs.class ?? '')"
          />
        </div>

        <div class="flex gap-4 self-end">
          <button
            class="border-2 w-56 border-[#057D88] text-[#057D88] px-6 py-4 rounded-full font-bold"
          >
            Voltar
          </button>
          <button
            class="bg-[#057D88] w-56 px-6 py-4 rounded-full text-white font-bold"
          >
            Simular Empréstimo
          </button>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
const modelValue = ref([3000]);
</script>
