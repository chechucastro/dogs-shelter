<template>
  <el-button
    :type="props.type"
    :size="props.size"
    :class="buttonClass"
    :disabled="props.disabled"
    :loading="props.loading"
    @click="handleClick"
  >
    <slot name="default" />
  </el-button>
</template>

<script setup lang="ts">
import { computed, type VNode } from "vue";
import { buttonVariants } from "./BaseButton.variants";
import type { TypeVariant, SizeVariant } from "./BaseButton.const";

interface Props {
  type?: TypeVariant;
  size?: SizeVariant;
  customClass?: string;
  disabled?: boolean;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: "default",
  size: "default",
  customClass: "",
  disabled: false,
  loading: false,
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

defineSlots<{
  default?: () => VNode[];
}>();

const buttonClass = computed(() => {
  const variantClass = buttonVariants({ type: props.type, size: props.size });
  return props.customClass ? `${variantClass} ${props.customClass}` : variantClass;
});

const handleClick = (event: MouseEvent): void => {
  emit("click", event);
};
</script>
