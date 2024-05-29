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
      :max="20000"
      :step="1000"
      :class="cn('w-3/5', $attrs.class ?? '')"
    />
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";

const modelValue = ref([2000]);
</script>
