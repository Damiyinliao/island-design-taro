<template>
  <view
    class="island-text"
    :class="{
      'island-text--one-line': props.lineCount === 1,
      'island-text--multiple-lines': props.lineCount > 1,
    }"
    :style="textWrapperStyle"
  >
    <slot v-if="$slots.inner" name="inner"></slot>
    <slot v-else>
      <text v-if="props.text">{{ props.text }}</text>
    </slot>
  </view>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { IslandTextProps } from './types'

defineOptions({
  name: 'IslandText',
})

const props = withDefaults(defineProps<IslandTextProps>(), {
  color: '#181818',
  weight: 500,
  size: 28,
  lineCount: 1,
  isActive: false,
  activeColor: '',
})

const textWrapperStyle = computed(() => ({
  color: props.isActive ? props.activeColor || props.color : props.color,
  fontWeight: props.weight,
  fontSize: `${props.size}rpx`,
  WebkitLineClamp: props.lineCount > 0 ? props.lineCount : 'unset',
}))
</script>
