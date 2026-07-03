<template>
  <view class="island-animate-modal">
    <view
      v-if="maskVisible"
      class="island-animate-modal__mask"
      :style="{ zIndex: props.zIndex }"
      :class="{
        'island-animate-modal__mask--enter': isMaskEntering,
        'island-animate-modal__mask--leave': isMaskLeaving,
      }"
      @tap.stop="onMaskClick"
      @animationend="onMaskAnimationEnd"
    ></view>
    <view
      v-if="modalVisible"
      class="island-animate-modal__container"
      :style="{ zIndex: props.zIndex + 1 }"
      :class="{
        'island-animate-modal__container--enter': isEntering,
        'island-animate-modal__container--leave': isLeaving,
      }"
      @animationend="onModalAnimationEnd"
      @tap.stop
    >
      <slot></slot>
      <view v-if="props.showClose" class="island-animate-modal__close" @tap="onCloseClick">
        <view class="island-animate-modal__close-icon"></view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import type { IslandAnimateModalProps } from './types'

defineOptions({
  name: 'IslandAnimateModal',
})

const props = withDefaults(defineProps<IslandAnimateModalProps>(), {
  keepMaskOnLeave: false,
  showClose: true,
  zIndex: 9999,
})

const emit = defineEmits<{
  'update:visible': [visible: boolean]
  maskClick: []
  close: []
  afterEnter: []
  afterLeave: []
}>()

const modalVisible = ref(false)
const maskVisible = ref(false)
const isEntering = ref(false)
const isLeaving = ref(false)
const isMaskEntering = ref(false)
const isMaskLeaving = ref(false)

function startEnterAnimation() {
  isEntering.value = true
  isLeaving.value = false
}

function startLeaveAnimation() {
  isEntering.value = false
  isLeaving.value = true
}

function startMaskEnterAnimation() {
  isMaskEntering.value = true
  isMaskLeaving.value = false
}

function startMaskLeaveAnimation() {
  isMaskEntering.value = false
  isMaskLeaving.value = true
}

function openModal() {
  if (!maskVisible.value) {
    maskVisible.value = true
    startMaskEnterAnimation()
  }

  modalVisible.value = true
  nextTick(() => {
    if (!props.visible || isLeaving.value) return
    startEnterAnimation()
  })
}

function closeModal() {
  if (!modalVisible.value || isLeaving.value) return

  if (!props.keepMaskOnLeave) {
    startMaskLeaveAnimation()
  }

  startLeaveAnimation()
}

function onMaskClick() {
  emit('maskClick')
}

function onCloseClick() {
  emit('close')
}

function onModalAnimationEnd() {
  if (isEntering.value) {
    isEntering.value = false
    emit('afterEnter')
    return
  }

  if (!isLeaving.value) return

  isLeaving.value = false
  modalVisible.value = false
  emit('afterLeave')
}

function onMaskAnimationEnd() {
  if (isMaskEntering.value) {
    isMaskEntering.value = false
    return
  }

  if (!isMaskLeaving.value) return

  isMaskLeaving.value = false
  maskVisible.value = false
}

watch(
  () => props.visible,
  (visible) => {
    if (visible) {
      openModal()
      return
    }

    closeModal()
  },
  { immediate: true },
)
</script>
