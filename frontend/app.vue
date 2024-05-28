<template>
  <div class="flex flex-col w-screen h-screen">
    <Navbar />
    <NuxtPage />
  </div>
</template>

<script>
import Navbar from "~/components/Navbar.vue";
export default {
  name: "App",
};
</script>
