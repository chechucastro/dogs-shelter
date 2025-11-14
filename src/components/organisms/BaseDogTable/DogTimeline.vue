<template>
  <div class="p-4 sm:w-1/2 mx-auto">
    <h2 v-if="props.dogName" class="text-2xl font-bold text-black mb-4">
      Timeline for {{ props.dogName }}
    </h2>
    <el-timeline>
      <el-timeline-item
        v-for="event in props.timeline"
        :key="event.id"
        :timestamp="formatDate(event.date)"
        :type="getEventType(event.type)"
        placement="top"
      >
        <h4 class="font-semibold text-black">
          {{ event.title }}
        </h4>
        <p class="text-gray-600 mt-1">
          {{ event.description }}
        </p>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script setup lang="ts">
import type { TimelineEvent } from "@/types/dog";
import { formatDate } from "@/utils/date.utils";
import { useTimelineEvent } from "@/composables/useTimelineEvent";

interface Props {
  timeline: TimelineEvent[];
  dogName?: string;
}

const props = defineProps<Props>();

const { getEventType } = useTimelineEvent();
</script>
