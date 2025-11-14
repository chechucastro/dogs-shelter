<template>
  <el-skeleton
    :class="skeletonClass"
    :loading="true"
    animated
  >
    <template #template>
      <el-skeleton-item
        :class="sizeClass"
        variant="image"
      />
    </template>
  </el-skeleton>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { imageLoaderVariants } from "./BaseImageLoader.variants";
import type { SizeVariant } from "./BaseImageLoader.const";

interface Props {
  size?: SizeVariant;
  customClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  size: "medium",
  customClass: "",
});

const sizeClass = computed(() => imageLoaderVariants({ size: props.size }));

const skeletonClass = computed(() => {
  return props.customClass ? `w-full ${props.customClass}` : "w-full";
});
</script>

