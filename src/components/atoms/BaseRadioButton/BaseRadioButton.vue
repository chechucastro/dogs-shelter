<template>
  <div :class="radioButtonClass">
    <el-radio-group
      :model-value="props.modelValue"
      :size="props.size"
      @update:model-value="handleChange"
    >
      <el-radio-button
        v-for="option in props.options"
        :key="option.value"
        :value="option.value"
      >
        <el-icon v-if="option.icon" class="mr-1">
          <component :is="option.icon" />
        </el-icon>
        <span :class="option.hideTextOnMobile ? 'hidden sm:inline' : ''">
          {{ option.label }}
        </span>
      </el-radio-button>
    </el-radio-group>
  </div>
</template>

<script setup lang="ts">
import { computed, type Component } from "vue";
import { radioButtonVariants } from "./BaseRadioButton.variants";
import type { SizeVariant } from "./BaseRadioButton.const";

export interface RadioOption {
  value: string;
  label: string;
  icon?: Component;
  hideTextOnMobile?: boolean;
}

interface Props {
  modelValue: string;
  options: RadioOption[];
  size?: SizeVariant;
  customClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: "default",
});

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const radioButtonClass = computed(() => {
  const variantClass = radioButtonVariants({ size: props.size });
  return props.customClass ? `${variantClass} ${props.customClass}` : variantClass;
});

const handleChange = (value: string): void => {
  emit("update:modelValue", value);
};
</script>
