<template>
  <div :class="gridClass">
    <BaseCard
      v-for="dog in props.dogs"
      :key="dog.id"
      :dog="dog"
      :mode="props.mode"
      @click="handleCardClick"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Dog } from "@/types/dog";
import { gridVariants } from "./BaseCardGrid.variants";
import type { ModeVariant } from "./BaseCardGrid.const";
import BaseCard from "@/components/molecules/BaseCard/BaseCard.vue";

interface Props {
  dogs: Dog[];
  mode: ModeVariant;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  click: [dog: Dog];
}>();

const gridClass = computed(() => gridVariants({ mode: props.mode }));

const handleCardClick = (dog: Dog): void => {
  emit("click", dog);
};
</script>
