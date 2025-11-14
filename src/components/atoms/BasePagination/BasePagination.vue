<template>
  <div :class="paginationClass">
    <el-pagination
      :current-page="props.currentPage"
      :page-size="props.pageSize"
      :total="props.total"
      :layout="layoutProp"
      @current-change="handlePageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { paginationVariants } from "./BasePagination.variants";
import { LAYOUT_VARIANTS } from "./BasePagination.const";
import type { LayoutVariant, AlignmentVariant } from "./BasePagination.const";

interface Props {
  currentPage: number;
  pageSize: number;
  total: number;
  layout?: LayoutVariant | string;
  alignment?: AlignmentVariant;
  customClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  layout: "simple",
  alignment: "center",
  customClass: "",
});

const emit = defineEmits<{
  "update:currentPage": [page: number];
}>();

const layoutProp = computed(() => {
  if (props.layout in LAYOUT_VARIANTS) {
    return LAYOUT_VARIANTS[props.layout as LayoutVariant];
  }
  return props.layout;
});

const paginationClass = computed(() => {
  const variantClass = paginationVariants({ alignment: props.alignment });
  return props.customClass ? `${variantClass} ${props.customClass}` : variantClass;
});

const handlePageChange = (page: number): void => {
  emit("update:currentPage", page);
};
</script>
