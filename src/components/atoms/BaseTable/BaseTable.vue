<template>
  <el-table
    :data="props.data"
    :stripe="props.stripe"
    :class="tableClass"
    :style="props.style"
  >
    <slot name="default" />
  </el-table>
</template>

<script setup lang="ts">
import { computed, type VNode } from 'vue'
import { tableVariants } from './BaseTable.variants'

interface Props {
  data?: any[]
  stripe?: boolean
  style?: string | Record<string, string>
  customClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  stripe: false,
  style: 'width: 100%',
  customClass: '',
})

defineSlots<{
  default?: () => VNode[]
}>()

const tableClass = computed(() => {
  const variantClass = tableVariants()
  return props.customClass ? `${variantClass} ${props.customClass}` : variantClass
})
</script>

