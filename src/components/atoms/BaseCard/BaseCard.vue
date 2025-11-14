<template>
  <el-card
    :class="cardClass"
    :shadow="props.shadow"
    :body-style="computedBodyStyle"
    @click="handleClick"
  >
    <template v-if="$slots.header" #header>
      <slot name="header" />
    </template>
    <template #default>
      <slot name="default" />
      <slot v-if="$slots.body" name="body" />
    </template>
  </el-card>
</template>

<script setup lang="ts">
import { computed, type VNode } from "vue";
import { cardVariants } from "./BaseCard.variants";
import { BODY_STYLE_PADDING } from "./BaseCard.const";
import type { ShadowVariant, BodyStyleVariant } from "./BaseCard.const";

interface Props {
  shadow?: ShadowVariant;
  bodyStyle?: BodyStyleVariant;
  customClass?: string;
  bodyStyleOverride?: string | Record<string, string>;
}

const props = withDefaults(defineProps<Props>(), {
  shadow: "always",
  bodyStyle: "default",
  customClass: "",
  bodyStyleOverride: undefined,
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

defineSlots<{
  default?: () => VNode[];
  header?: () => VNode[];
  body?: () => VNode[];
}>();

const computedBodyStyle = computed(() => {
  if (props.bodyStyleOverride) {
    return props.bodyStyleOverride;
  }

  const padding = BODY_STYLE_PADDING[props.bodyStyle];
  if (!padding) {
    return undefined;
  }

  return { padding };
});

const cardClass = computed(() => {
  const variantClass = cardVariants({
    shadow: props.shadow,
    bodyStyle: props.bodyStyle,
  });
  return props.customClass ? `${variantClass} ${props.customClass}` : variantClass;
});

const handleClick = (event: MouseEvent): void => {
  emit("click", event);
};
</script>
