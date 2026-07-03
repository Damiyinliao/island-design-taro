<template>
  <view class="island-image" :style="mainStyle">
    <view v-if="!isLoad" class="island-image__skeleton"></view>
    <image
      class="island-image__inner"
      :lazy-load="true"
      :mode="props.mode"
      :src="props.src || ''"
      @load="handleImageLoad"
      @error="handleError"
      @tap="handlePreview"
    />
  </view>
</template>

<script lang="ts" setup>
import type { CommonEvent } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { computed, ref, watch } from 'vue'
import type { IslandImageProps } from './types'

defineOptions({
  name: 'IslandImage',
})

const props = withDefaults(defineProps<IslandImageProps>(), {
  radius: 0,
  mode: 'widthFix',
  preview: false,
})

const emit = defineEmits<{
  load: [detail: CommonEvent['detail']]
  error: [detail: CommonEvent['detail']]
}>()

const wrapperHeight = computed(() => {
  if (props.height) return `${props.height}rpx`
  if (props.size) return `${props.size}rpx`
  return 'auto'
})

const wrapperWidth = computed(() => {
  if (typeof props.width === 'string') return props.width
  if (typeof props.width === 'number') return `${props.width}rpx`
  if (props.size) return `${props.size}rpx`
  return 'auto'
})

const mainStyle = computed(() => ({
  width: wrapperWidth.value,
  height: wrapperHeight.value,
  borderRadius: typeof props.radius === 'string' ? props.radius : `${props.radius}px`,
  '--island-image-height': wrapperHeight.value,
}))

const isLoad = ref(false)

watch(
  () => props.src,
  () => {
    isLoad.value = false
  },
)

const handleImageLoad = (event: Event) => {
  isLoad.value = true
  emit('load', ((event as unknown) as CommonEvent).detail)
}

const handleError = (event: Event) => {
  const detail = ((event as unknown) as CommonEvent).detail

  isLoad.value = true
  emit('error', detail)

  if (detail?.errMsg) {
    console.warn(detail.errMsg)
  }
}

const handlePreview = () => {
  if (!props.src || !props.preview) return

  Taro.previewImage({
    current: props.src,
    urls: [props.src],
  })
}
</script>
