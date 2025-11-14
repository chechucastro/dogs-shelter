<template>
  <div class="dog-table-container overflow-x-auto">
    <BaseSkeleton v-if="props.loading" :loading="true" :animated="true">
      <template #template>
        <div class="w-full">
          <!-- Header row -->
          <div
            class="flex items-center justify-around gap-4 py-4 border-b border-gray-300"
          >
            <el-skeleton-item variant="text" class="max-w-[150px]" />
            <el-skeleton-item variant="text" class="w-[96px]" />
            <el-skeleton-item variant="text" class="max-w-[150px] hidden sm:block" />
            <el-skeleton-item variant="text" class="max-w-[150px] hidden sm:block" />
            <el-skeleton-item variant="text" class="max-w-[150px] hidden sm:block" />
            <el-skeleton-item variant="text" class="w-[100px]" />
          </div>
          <!-- Skeleton rows -->
          <div
            v-for="i in 10"
            :key="i"
            class="flex items-center py-3 border-b border-gray-200 justify-around gap-3"
          >
            <el-skeleton-item variant="text" class="sm:max-w-[150px] max-w-[100px]" />
            <el-skeleton-item variant="image" class="w-[96px] h-[96px] rounded-lg" />
            <el-skeleton-item variant="text" class="max-w-[150px] hidden sm:block" />
            <el-skeleton-item variant="text" class="max-w-[150px] hidden sm:block" />
            <el-skeleton-item variant="text" class="max-w-[150px] hidden sm:block" />
            <el-skeleton-item variant="button" class="w-[100px] flex-start" />
          </div>
        </div>
      </template>
    </BaseSkeleton>

    <BaseTable v-else :data="props.dogs" :stripe="true" custom-class="dog-table">
      <el-table-column prop="name" label="Name" :min-width="120" />
      <el-table-column label="Photo" :min-width="100">
        <template #default="{ row }">
          <BaseImage :image-url="row.imageUrl" :alt="row.name" size="small" />
        </template>
      </el-table-column>
      <el-table-column prop="breed" label="Breed" :min-width="120" />
      <el-table-column prop="age" label="Longevity" :min-width="80">
        <template #default="{ row }">
          {{ row.age || "N/A" }}
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="Weight (kg)" :min-width="100">
        <template #default="{ row }">
          {{ row.weight ? `${row.weight} kg` : "N/A" }}
        </template>
      </el-table-column>
      <el-table-column label="Actions" :min-width="100" fixed="right">
        <template #default="{ row }">
          <BaseButton type="primary" size="large" @click="handleView(row)">
            View
          </BaseButton>
        </template>
      </el-table-column>
    </BaseTable>
  </div>
</template>

<script setup lang="ts">
import type { Dog } from "@/types/dog";
import BaseImage from "@/components/atoms/BaseImage/BaseImage.vue";
import BaseButton from "@/components/atoms/BaseButton/BaseButton.vue";
import BaseSkeleton from "@/components/atoms/BaseSkeleton/BaseSkeleton.vue";
import BaseTable from "@/components/atoms/BaseTable/BaseTable.vue";

interface Props {
  dogs: Dog[];
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
});

const emit = defineEmits<{
  view: [dog: Dog];
}>();

const handleView = (dog: Dog): void => {
  emit("view", dog);
};
</script>
