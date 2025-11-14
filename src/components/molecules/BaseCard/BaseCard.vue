<template>
  <BaseCard
    :shadow="cardConfig.shadow"
    :body-style="cardConfig.bodyStyle"
    :custom-class="cardClass"
    @click="handleClick"
  >
    <template #header>
      <h3 class="text-center text-lg font-bold font-sans">
        {{ dog.name }}
      </h3>
    </template>

    <BaseImage :image-url="dog.imageUrl" :alt="dog.name" :size="cardConfig.imageSize" />

    <template #body>
      <BaseCardDetails
        v-if="isCardMode"
        :breed="dog.breed"
        :registration="dog.registration"
        :birth-date-display="birthDateDisplay"
        :latest-activity-display="latestActivityDisplay"
        :show-latest-activity="showLatestActivity"
      />
    </template>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Dog } from "@/types/dog";
import { cardVariants } from "@/components/molecules/BaseCard/BaseCard.variants";
import {
  MODE_VARIANTS,
  CARD_CONFIG,
  NOT_AVAILABLE,
} from "@/components/molecules/BaseCard/BaseCard.const";
import type { ModeVariant } from "@/components/molecules/BaseCard/BaseCard.const";
import { formatDate } from "@/utils/date.utils";
import { useUserStore } from "@/stores/user.store";
import { mockTimelineEvents } from "@/mocks/timeline.mock";
import BaseImage from "@/components/atoms/BaseImage/BaseImage.vue";
import BaseCard from "@/components/atoms/BaseCard/BaseCard.vue";
import BaseCardDetails from "./BaseCardDetails.vue";

interface Props {
  dog: Dog;
  mode: ModeVariant;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  click: [dog: Dog];
}>();

const userStore = useUserStore();

const { dog } = props;

// Card configuration
const isCardMode = computed(() => props.mode === MODE_VARIANTS.card);
const cardConfig = computed(() => CARD_CONFIG[props.mode]);
const cardClass = computed(() => cardVariants({ mode: props.mode }));

// Display values
const birthDateDisplay = computed(() =>
  dog.birthDate ? formatDate(dog.birthDate) : NOT_AVAILABLE
);

// Timeline activity - show the same timeline for all dogs
const timeline = computed(() => mockTimelineEvents);
const latestActivity = computed(() => {
  const events = timeline.value;
  return events.length > 0 ? events[events.length - 1] : null;
});

const showLatestActivity = computed(
  () => userStore.isAdmin && latestActivity.value !== null
);

const latestActivityDisplay = computed(() => {
  if (!latestActivity.value) return "";
  const { title, date } = latestActivity.value;
  return `${title} (${formatDate(date)})`;
});

// Event handlers
const handleClick = (): void => {
  emit("click", dog);
};
</script>
