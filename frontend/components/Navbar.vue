<template>
  <ClientOnly>
    <div
      class="bg-[#057D88] w-full h-16 px-6 flex items-center justify-between"
    >
      <NuxtLink to="/">
        <img src="~/assets/CredifitLogo.png" alt="Logo" />
      </NuxtLink>
      <DropdownMenu v-if="employeeData !== undefined">
        <DropdownMenuTrigger>
          <div class="flex justify-center items-center gap-2">
            <Icon name="iconamoon:profile" color="white" class="size-6" />

            <p class="text-white font-bold">{{ employeeData?.name! }}</p>
            <Icon name="mingcute:down-fill" color="white" class="size-5" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent v-if="employeeData.hasOwnProperty('companyName')">
          <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Perfil</DropdownMenuItem>
          <DropdownMenuItem>Criar perfil de Funcionário</DropdownMenuItem>
          <DropdownMenuItem>Sair</DropdownMenuItem>
        </DropdownMenuContent>
        <DropdownMenuContent v-else>
          <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Perfil</DropdownMenuItem>
          <DropdownMenuItem>Sair</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const employeeCookie = useCookie("employeeData");

let employeeData: any;
if (employeeCookie.value !== undefined) {
  employeeData = JSON.parse(JSON.stringify(employeeCookie.value!));
}
</script>
