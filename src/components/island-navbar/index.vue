<template>
  <view class="island-navbar" :style="rootStyle">
    <view class="island-navbar__inner">
      <view class="island-navbar__left">
        <view
          v-if="props.backIcon"
          class="island-navbar__back"
          hover-class="island-navbar__back--active"
          :hover-stay-time="100"
          aria-role="button"
          aria-label="返回"
          @tap="handleBack"
        >
          <view class="island-navbar__back-icon" />
        </view>
        <view v-if="showHomeButton" class="island-navbar__home" aria-role="button" aria-label="首页" @tap="handleHomeClick">
          <slot name="home">
            <view class="island-navbar__home-icon" />
          </slot>
        </view>
      </view>
      <view class="island-navbar__center" @tap="handleTitleClick">
        <slot name="center">
          <text class="island-navbar__title">{{ props.title }}</text>
        </slot>
      </view>
      <view class="island-navbar__right">
        <slot name="right"></slot>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import Taro, { getCurrentPages } from '@tarojs/taro'
import { computed, onMounted, ref } from 'vue'
import type { IslandNavbarProps } from './types'

defineOptions({
  name: 'IslandNavbar',
})

const props = withDefaults(defineProps<IslandNavbarProps>(), {
  backIcon: true,
  background: 'transparent',
  placeholder: true,
  showHomeIcon: false,
  homeUrl: '',
})

const emit = defineEmits<{
  back: []
  'title-click': []
  'home-click': []
  load: [navbarHeight: number]
}>()

const navPaddingLeft = ref(20)
const navHeight = ref(80)
const statusHeight = ref(44)
const navRightWidth = ref(0)
const showHomeButton = ref(false)

const rootStyle = computed(() => ({
  height: `${props.placeholder ? navHeight.value : 0}px`,
  '--island-navbar-background': props.background,
  '--island-navbar-height': `${navHeight.value}px`,
  '--island-navbar-padding-left': `${navPaddingLeft.value}px`,
  '--island-navbar-status-bar-height': `${statusHeight.value}px`,
  '--island-navbar-right-width': `${navRightWidth.value}px`,
}))

function handleBack() {
  emit('back')

  if (props.backFunc) {
    props.backFunc()
    return
  }

  Taro.navigateBack()
}

function handleTitleClick() {
  emit('title-click')
}

function handleHomeClick() {
  emit('home-click')

  if (props.homeUrl) {
    Taro.switchTab({ url: props.homeUrl })
  }
}

function setHomeButton() {
  if (!props.showHomeIcon) return

  const pages = getCurrentPages()

  if (pages.length === 1) {
    showHomeButton.value = true
  }
}

function setNavHeight() {
  const deviceInfo = Taro.getDeviceInfo()
  const windowInfo = Taro.getWindowInfo()
  const statusBarHeight = windowInfo.statusBarHeight || (deviceInfo.platform === 'android' ? 48 : 44)
  const capsuleInfo = Taro.getMenuButtonBoundingClientRect()
  const navRightPadding = windowInfo.windowWidth - capsuleInfo.right
  const navbarHeight = statusBarHeight + capsuleInfo.height + (capsuleInfo.top - statusBarHeight) * 2

  navHeight.value = navbarHeight
  navPaddingLeft.value = navRightPadding
  navRightWidth.value = navRightPadding + capsuleInfo.width
  statusHeight.value = statusBarHeight
  emit('load', navbarHeight)
}

onMounted(() => {
  setNavHeight()
  setHomeButton()
})
</script>
