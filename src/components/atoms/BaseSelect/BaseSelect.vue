<template>
  <el-select
    :model-value="props.modelValue"
    :placeholder="props.placeholder"
    :clearable="props.clearable"
    :filterable="props.filterable"
    :size="props.size"
    :class="selectClass"
    @update:model-value="handleChange"
  >
    <el-option
      v-for="option in props.options"
      :key="option.value"
      :label="option.label"
      :value="option.value"
    />
  </el-select>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { selectVariants } from "./BaseSelect.variants";
import type { SizeVariant } from "./BaseSelect.const";

export interface SelectOption {
  value: string | number;
  label: string;
}

interface Props {
  modelValue?: string | number;
  options: SelectOption[];
  placeholder?: string;
  clearable?: boolean;
  filterable?: boolean;
  size?: SizeVariant;
  customClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "Please select",
  clearable: false,
  filterable: false,
  size: "default",
});

const emit = defineEmits<{
  "update:modelValue": [value: string | number | undefined];
}>();

const selectClass = computed(() => {
  const variantClass = selectVariants({ size: props.size });
  return props.customClass ? `${variantClass} ${props.customClass}` : variantClass;
});

const handleChange = (value: string | number | undefined): void => {
  emit("update:modelValue", value);
};
</script>

