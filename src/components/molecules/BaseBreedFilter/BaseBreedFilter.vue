<template>
  <div class="mb-4">
    <BaseSelect
      :model-value="props.modelValue"
      :options="selectOptions"
      placeholder="Filter by breed"
      clearable
      filterable
      custom-class="w-full md:w-64"
      @update:model-value="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { DogBreed } from "@/types/dog";
import BaseSelect from "@/components/atoms/BaseSelect/BaseSelect.vue";
import type { SelectOption } from "@/components/atoms/BaseSelect/BaseSelect.vue";

interface Props {
  breeds: DogBreed[];
  modelValue?: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  "update:modelValue": [value: string | undefined];
}>();

const selectOptions = computed<SelectOption[]>(() =>
  props.breeds.map((breed) => ({
    value: breed.name,
    label: breed.name,
  }))
);

const handleChange = (value: string | number | undefined): void => {
  emit("update:modelValue", value as string | undefined);
};
</script>

