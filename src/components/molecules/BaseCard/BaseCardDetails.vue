<template>
  <div class="mt-4 space-y-2 text-center">
    <div class="text-sm text-black">
      <span class="font-medium">Breed:</span>
      <span class="ml-2">{{ breed }}</span>
    </div>
    <div class="text-sm text-black">
      <span class="font-medium">Registration:</span>
      <span class="ml-2">{{ registration || NOT_AVAILABLE }}</span>
    </div>
    <div class="text-sm text-black">
      <span class="font-medium">Birthdate:</span>
      <span class="ml-2">{{ birthDateDisplay }}</span>
    </div>
    <div v-if="showLatestActivity" class="text-sm text-black">
      <span class="font-medium">Latest timeline activity:</span>
      <span class="ml-2">{{ latestActivityDisplay }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NOT_AVAILABLE } from "./BaseCard.const";

interface Props {
  breed: string;
  registration?: string;
  birthDateDisplay: string;
  latestActivityDisplay: string;
  showLatestActivity: boolean;
}

defineProps<Props>();
</script>

