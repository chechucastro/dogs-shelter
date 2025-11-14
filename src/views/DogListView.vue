<template>
  <BaseCard
    shadow="always"
    body-style="default"
    custom-class="dog-list-view mx-auto max-w-[1400px]"
  >
    <div class="mb-6">
      <div
        class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6"
      >
        <BaseBreedFilter
          :breeds="dogStore.breeds"
          :model-value="selectedBreed"
          @update:model-value="handleBreedChange"
        />

        <BaseRadioButton
          :model-value="viewMode"
          :options="viewModeOptions"
          @update:model-value="(value) => handleViewChange(value as ViewMode)"
        />
      </div>
    </div>

    <div v-if="dogStore.error" class="mb-4">
      <el-alert :title="dogStore.error" type="error" :closable="false" show-icon />
    </div>

    <div v-else>
      <DogTable
        v-if="viewMode === 'table'"
        :dogs="dogStore.dogs"
        :loading="dogStore.loading"
        @view="handleViewDog"
      />

      <BaseCardGrid
        v-else
        :dogs="dogStore.dogs"
        :mode="viewMode === 'cards' ? 'card' : 'mini'"
        @click="handleViewDog"
      />

      <BasePagination
        :current-page="dogStore.currentPage"
        :page-size="dogStore.pageSize"
        :total="dogStore.total"
        @update:current-page="handlePageChange"
      />
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { List, Grid, Menu } from "@element-plus/icons-vue";
import { useDogList } from "@/composables/useDogList";
import BaseBreedFilter from "@/components/molecules/BaseBreedFilter/BaseBreedFilter.vue";
import BaseRadioButton from "@/components/atoms/BaseRadioButton/BaseRadioButton.vue";
import type { RadioOption } from "@/components/atoms/BaseRadioButton/BaseRadioButton.vue";
import type { ViewMode } from "@/components/atoms/BaseRadioButton/BaseRadioButton.const";
import DogTable from "@/components/organisms/BaseDogTable/DogTable.vue";
import BaseCardGrid from "@/components/molecules/BaseCardGrid/BaseCardGrid.vue";
import BasePagination from "@/components/atoms/BasePagination/BasePagination.vue";
import BaseCard from "@/components/atoms/BaseCard/BaseCard.vue";

const {
  dogStore,
  viewMode,
  selectedBreed,
  handleBreedChange,
  handleViewChange,
  handlePageChange,
  handleViewDog,
} = useDogList();

const viewModeOptions = computed<RadioOption[]>(() => [
  {
    value: "table",
    label: "Table",
    icon: List,
    hideTextOnMobile: true,
  },
  {
    value: "cards",
    label: "Cards",
    icon: Grid,
    hideTextOnMobile: true,
  },
  {
    value: "mini-cards",
    label: "Mini",
    icon: Menu,
    hideTextOnMobile: true,
  },
]);
</script>
