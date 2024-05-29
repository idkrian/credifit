<template>
  <ClientOnly>
    <p class="self-start text-[#057D88] font-bold text-xl">
      Simular Empréstimo
    </p>
    <div class="flex bg-[#FFE5D5] p-4 rounded-xl">
      <div class="pr-4">
        <img src="../assets/betina.png" alt="betina" class="w-12" />
      </div>
      <p class="text-xl">
        Escolha a opção de parcelamento que melhor funcionar para você:
      </p>
    </div>
    <p
      class="bg-[#EAEDED] py-2 px-4 rounded-2xl text-[#004F56] text-3xl font-semibold"
    >
      R$ 5000
    </p>
    <ToggleGroup type="single" class="w-full">
      <div class="w-full grid grid-cols-2 gap-2">
        <ToggleGroupItem
          value="1x"
          aria-label="1x"
          class="h-16 w-full border-l-8 border-orange-500 shadow-md"
        >
          <button>1x</button>
        </ToggleGroupItem>
        <ToggleGroupItem
          value="2x"
          aria-label="2x"
          class="h-16 w-full border-l-8 border-orange-500 shadow-md"
        >
          <button>2x</button>
        </ToggleGroupItem>
        <ToggleGroupItem
          value="3x"
          aria-label="3x"
          class="h-16 w-full border-l-8 border-orange-500 shadow-md"
        >
          <button>3x</button>
        </ToggleGroupItem>
        <ToggleGroupItem
          value="4x"
          aria-label="4x"
          class="h-16 w-full border-l-8 border-orange-500 shadow-md"
        >
          <button>4x</button>
        </ToggleGroupItem>
      </div>
    </ToggleGroup>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
</script>
