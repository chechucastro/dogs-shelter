<template>
  <el-button-group :class="groupClass">
    <slot name="default" />
  </el-button-group>
</template>

<script setup lang="ts">
import { computed, type VNode } from "vue";
import { buttonGroupVariants } from "./BaseButtonGroup.variants";

interface Props {
  customClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  customClass: "border border-gray-200 shadow-lg",
});

defineSlots<{
  default?: () => VNode[];
}>();

const groupClass = computed(() => {
  const variantClass = buttonGroupVariants();
  return props.customClass ? `${variantClass} ${props.customClass}` : variantClass;
});
</script>
