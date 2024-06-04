<template>
  <ClientOnly>
    <div class="h-full bg-[#f6f6f6]">
      <div class="grid grid-cols-2 h-full px-36 gap-6">
        <div class="self-center">
          <img src="../assets/HomeGirl.png" class="w-[40rem]" alt="" />
        </div>
        <div class="flex flex-col justify-center gap-4">
          <p class="text-[#057D88] font-bold text-3xl">
            Crédito rápido, do tamanho certo e #pensadopravocê
          </p>
          <p class="text-md">
            Tenha crédito para conquistar seus sonhos ou até mesmo para melhorar
            o seu negócio. Somos a Credifit, a plataforma ideal para você
            conseguir crédito de forma simples, rápida e segura.
          </p>
          <DropdownMenu v-if="employeeData == undefined">
            <DropdownMenuTrigger
              class="bg-[#057D88] w-fit text-white px-8 py-3 rounded-xl"
              >Login
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <NuxtLink to="/CompanyAuth" class="cursor-pointer">
                <DropdownMenuItem>Empresa</DropdownMenuItem>
              </NuxtLink>
              <NuxtLink to="/EmployeeAuth" class="cursor-pointer">
                <DropdownMenuItem>Funcionário</DropdownMenuItem>
              </NuxtLink>
            </DropdownMenuContent>
          </DropdownMenu>
          <NuxtLink
            to="/PayrollLinked"
            v-else
            class="bg-[#057D88] w-fit text-white px-8 py-3 rounded-xl"
          >
            Solicitar Crédito
          </NuxtLink>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const employeeCookie = useCookie("employeeData");

const employeeData = ref<any>(
  employeeCookie.value
    ? JSON.parse(JSON.stringify(employeeCookie.value))
    : undefined
);

watch(employeeCookie, (newValue) => {
  employeeData.value = newValue
    ? JSON.parse(JSON.stringify(newValue))
    : undefined;
});
</script>
