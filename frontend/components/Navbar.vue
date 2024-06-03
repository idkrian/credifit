<template>
  <ClientOnly>
    <div
      class="bg-[#057D88] w-full h-16 px-6 flex items-center justify-between"
    >
      <NuxtLink to="/Auth">
        <img src="~/assets/CredifitLogo.png" alt="Logo" />
      </NuxtLink>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div class="flex justify-center items-center gap-2">
            <Icon name="iconamoon:profile" color="white" class="size-6" />

            <p class="text-white font-bold">Diego Viana</p>
            <Icon name="mingcute:down-fill" color="white" class="size-5" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </ClientOnly>
</template>

<script>
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
export default {
  name: "Navbar",
};
</script>
