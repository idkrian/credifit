<script setup lang="ts">
import { type HTMLAttributes, computed } from "vue";
import type { SliderRootEmits, SliderRootProps } from "radix-vue";
import {
  SliderRange,
  SliderRoot,
  SliderThumb,
  SliderTrack,
  useForwardPropsEmits,
} from "radix-vue";
import { cn } from "@/lib/utils";

const props = defineProps<
  SliderRootProps & { class?: HTMLAttributes["class"] }
>();
const emits = defineEmits<SliderRootEmits>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <SliderRoot
    :class="
      cn(
        'relative flex w-full touch-none select-none items-center',
        props.class
      )
    "
    v-bind="forwarded"
  >
    <SliderTrack
      class="relative h-4 w-full grow overflow-hidden rounded-full bg-[#EAEDED] dark:bg-[#EAEDED]"
    >
      <SliderRange class="absolute h-full bg-[#32B7B7] dark:bg-[#32B7B7]" />
    </SliderTrack>
    <SliderThumb
      v-for="(_, key) in modelValue"
      :key="key"
      class="block h-6 w-6 rounded-full border border-white bg-[#057D88] ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-slate-50 dark:bg-slate-950 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300"
    />
  </SliderRoot>
</template>
