<template>
  <div class="dog-timeline-view mx-auto px-4 py-6 max-w-[1000px]">
    <BaseButton type="link" @click="goBack" custom-class="mb-4">
      <el-icon class="mr-1"><ArrowLeft /></el-icon>
      Back to Details
    </BaseButton>

    <div v-if="!userStore.isAdmin" class="mb-4">
      <el-alert
        title="Access Denied"
        description="Only admin users can view the timeline."
        type="warning"
        :closable="false"
        show-icon
      />
    </div>

    <div v-else>
      <div v-if="loading" class="flex justify-center items-center py-12">
        <el-icon class="is-loading text-black" :size="48">
          <Loading />
        </el-icon>
      </div>

      <div v-else-if="error" class="mb-4">
        <el-alert :title="error" type="error" :closable="false" show-icon />
      </div>

      <div v-else-if="dog">
        <h1 class="text-3xl font-bold text-black mb-2">
          Timeline for {{ dog.name }}
        </h1>
        <p class="text-gray-600 mb-6">
          {{ dog.breed }}
        </p>

        <div class="bg-white rounded-lg shadow-md p-6">
          <DogTimeline :timeline="timeline" :dog-name="dog.name" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft, Loading } from "@element-plus/icons-vue";
import { useDogTimeline } from "@/composables/useDogTimeline";
import DogTimeline from "@/components/organisms/BaseDogTable/DogTimeline.vue";
import BaseButton from "@/components/atoms/BaseButton/BaseButton.vue";

const { dog, timeline, loading, error, userStore, goBack } = useDogTimeline();
</script>
