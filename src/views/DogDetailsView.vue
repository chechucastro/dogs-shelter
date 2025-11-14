<template>
  <div>
    <BaseCard
      shadow="always"
      body-style="spacious"
      custom-class="container mx-auto max-w-[1200px]"
    >
      <BaseButton link @click="goBack" custom-class="mb-4">
        <el-icon class="mr-1"><ArrowLeft /></el-icon>
        Back to List
      </BaseButton>

      <div v-if="loading" class="flex justify-center items-center py-12">
        <el-icon class="is-loading text-black" :size="48">
          <Loading />
        </el-icon>
      </div>

      <div v-else-if="error" class="mb-4">
        <el-alert :title="error" type="error" :closable="false" show-icon />
      </div>

      <div v-else-if="dog">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <BaseImage :image-url="dog.imageUrl" :alt="dog.name" size="large" />
          </div>

          <div class="space-y-4">
            <div>
              <h1 class="text-3xl font-bold text-black mb-2">
                {{ dog.name }}
              </h1>
              <p class="text-base text-gray-600">
                {{ dog.breed }}
              </p>
            </div>

            <el-divider />

            <div class="grid grid-cols-2 gap-4">
              <div v-if="dog.age" class="flex flex-col">
                <span class="text-sm text-gray-500 font-medium">Age:</span>
                <span class="text-base text-black font-semibold">{{ dog.age }}</span>
              </div>
              <div v-if="dog.weight" class="flex flex-col">
                <span class="text-sm text-gray-500 font-medium">Weight:</span>
                <span class="text-base text-black font-semibold"
                  >{{ dog.weight }} kg</span
                >
              </div>
              <div v-if="dog.height" class="flex flex-col">
                <span class="text-sm text-gray-500 font-medium">Height:</span>
                <span class="text-base text-black font-semibold"
                  >{{ dog.height }} cm</span
                >
              </div>
              <div v-if="dog.birthDate" class="flex flex-col">
                <span class="text-sm text-gray-500 font-medium">Birth Date:</span>
                <span class="text-base text-black font-semibold">{{
                  formatDate(dog.birthDate)
                }}</span>
              </div>
            </div>

            <div v-if="temperamentArray.length > 0">
              <h3 class="font-semibold text-black mb-2">Temperament:</h3>
              <div class="flex flex-wrap gap-2">
                <el-tag v-for="trait in temperamentArray" :key="trait" type="info">
                  {{ trait }}
                </el-tag>
              </div>
            </div>

            <div v-if="dog.description">
              <h3 class="font-semibold text-black mb-2">This breed is for:</h3>
              <p class="text-gray-600">
                {{ dog.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </BaseCard>

    <BaseCard
      v-if="canShowContent && !isAdmin"
      shadow="never"
      body-style="default"
      custom-class="container mx-auto max-w-[1200px] mt-6 bg-blue-50 border border-blue-200"
    >
      <p class="text-blue-800 font-medium text-center">
        Log in as Admin to see the {{ dog?.name }} timeline.
      </p>
    </BaseCard>

    <BaseCard
      v-if="canShowTimeline"
      shadow="always"
      body-style="spacious"
      custom-class="container mx-auto max-w-[1200px] mt-6"
    >
      <div v-if="timelineLoading" class="flex justify-center items-center py-12">
        <el-icon class="is-loading text-black" :size="48">
          <Loading />
        </el-icon>
      </div>

      <div v-else-if="timelineError" class="mb-4">
        <el-alert :title="timelineError" type="error" :closable="false" show-icon />
      </div>

      <div v-else-if="hasTimelineEvents" class="py-6">
        <DogTimeline :timeline="timeline" :dog-name="dog?.name || ''" />
      </div>

      <div v-else>
        <p class="text-gray-600">
          No timeline events available for {{ dog?.name || "this dog" }}.
        </p>
      </div>
    </BaseCard>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { ArrowLeft, Loading } from "@element-plus/icons-vue";
import { useDogDetails } from "@/composables/useDogDetails";
import { parseTemperament } from "@/utils/dog.utils";
import BaseImage from "@/components/atoms/BaseImage/BaseImage.vue";
import DogTimeline from "@/components/organisms/BaseDogTable/DogTimeline.vue";
import BaseButton from "@/components/atoms/BaseButton/BaseButton.vue";
import BaseCard from "@/components/atoms/BaseCard/BaseCard.vue";

const {
  dog,
  loading,
  error,
  userStore,
  formatDate,
  goBack,
  timeline,
  timelineLoading,
  timelineError,
} = useDogDetails();

const temperamentArray = computed(() => parseTemperament(dog.value?.temperament));

const canShowContent = computed(() => dog.value && !loading.value && !error.value);

const isAdmin = computed(() => userStore.isAdmin);

const canShowTimeline = computed(() => canShowContent.value && isAdmin.value);

const hasTimelineEvents = computed(() => timeline.value && timeline.value.length > 0);
</script>
