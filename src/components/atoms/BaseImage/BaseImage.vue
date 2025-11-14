<template>
  <div class="flex items-center justify-center">
    <el-image
      v-if="props.imageUrl"
      :src="props.imageUrl"
      :alt="props.alt"
      :class="sizeClass"
      :lazy="props.lazy"
      :fit="props.fit"
    >
      <template #loading>
        <BaseImageLoader :size="props.size" />
      </template>
      <template #error>
        <div
          class="bg-gray-200 rounded-lg flex items-center justify-center"
          :class="sizeClass"
        >
          <el-icon :size="iconSize">
            <Picture />
          </el-icon>
        </div>
      </template>
    </el-image>
    <div
      v-else
      class="bg-gray-200 rounded-lg flex items-center justify-center"
      :class="sizeClass"
    >
      <el-icon :size="iconSize">
        <Picture />
      </el-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Picture } from '@element-plus/icons-vue'
import { imageSizeVariants } from '@/components/atoms/BaseImage/BaseImage.variants'
import { ICON_SIZES, type SizeVariant } from '@/components/atoms/BaseImage/BaseImage.const'
import BaseImageLoader from '@/components/atoms/BaseImageLoader/BaseImageLoader.vue'

interface Props {
  imageUrl?: string
  alt?: string
  size?: SizeVariant
  lazy?: boolean
  fit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
}

const props = withDefaults(defineProps<Props>(), {
  alt: 'Image',
  size: 'medium',
  lazy: true,
  fit: 'cover',

})

const sizeClass = computed(() => imageSizeVariants({ size: props.size }))

const iconSize = computed((): number => {
  return ICON_SIZES[props.size]
})
</script>
