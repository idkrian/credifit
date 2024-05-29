<template>
  <div
    class="flex flex-col justify-center items-center shadow-lg rounded-lg px-6 py-8 w-[40rem] gap-8"
  >
    <component :is="steps[stepStore.currentStep]"></component>
  </div>
</template>

<script setup>
import Step2 from "./Step2.vue";
import Step1 from "./Step1.vue";
import Step3 from "./Step3.vue";
import Step4 from "./Step4.vue";
import { useStepStore } from "~/stores/steps";

const steps = [Step1, Step2, Step3, Step4];
const stepStore = useStepStore();
</script>

<style scoped>
button[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
