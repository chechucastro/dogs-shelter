<template>
  <el-skeleton :loading="props.loading" :animated="props.animated" :class="skeletonClass">
    <template #template>
      <slot name="template" />
    </template>
    <template #default>
      <slot name="default" />
    </template>
  </el-skeleton>
</template>

<script setup lang="ts">
import { computed, type VNode } from 'vue'
import { skeletonVariants } from './BaseSkeleton.variants'

interface Props {
  loading?: boolean
  animated?: boolean
  customClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  loading: true,
  animated: true,
  customClass: '',
})

defineSlots<{
  template?: () => VNode[]
  default?: () => VNode[]
}>()

const skeletonClass = computed(() => {
  const variantClass = skeletonVariants()
  return props.customClass ? `${variantClass} ${props.customClass}` : variantClass
})
</script>
