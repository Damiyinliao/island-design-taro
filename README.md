# island-design-taro

Taro Vue 组件库。

## 安装

```bash
pnpm add island-design-taro
```

## 自动按需引入

业务项目安装自动组件插件：

```bash
pnpm add -D unplugin-vue-components
```

在 Vite 项目中配置：

```ts
import Components from 'unplugin-vue-components/vite'
import IslandDesignTaroResolver from 'island-design-taro/resolver'

export default {
  plugins: [
    Components({
      resolvers: [IslandDesignTaroResolver()],
    }),
  ],
}
```

配置后可以直接在模板中使用组件，不需要在每个 `.vue` 文件里手动导入：

```vue
<template>
  <IslandNavbar title="页面标题" @load="navbarHeight = $event" />
  <IslandImage src="https://example.com/image.png" :width="160" :height="160" :radius="8" preview />
  <IslandText text="示例文本" color="#181818" :size="28" :weight="500" />
  <IslandAnimateModal v-model:visible="visible" @close="visible = false" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const visible = ref(false)
const navbarHeight = ref(0)
</script>
```

如果不想由 resolver 自动引入样式，可以关闭：

```ts
IslandDesignTaroResolver({ importStyle: false })
```

## 全量注册

```ts
import { createApp } from 'vue'
import IslandDesignTaro from 'island-design-taro'
import 'island-design-taro/style.css'

const app = createApp(App)
app.use(IslandDesignTaro)
```

## 手动按需使用

```vue
<template>
  <IslandImage src="https://example.com/image.png" :width="160" :height="160" :radius="8" preview />
  <IslandNavbar title="页面标题" show-home-icon home-url="/pages/home/index" @load="navbarHeight = $event" />
  <IslandText text="示例文本" :size="28" :line-count="2" />

  <IslandAnimateModal v-model:visible="visible" @close="visible = false" @mask-click="visible = false">
    <view class="demo-modal-content">弹窗内容</view>
  </IslandAnimateModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IslandAnimateModal, IslandImage, IslandNavbar, IslandText } from 'island-design-taro'
import 'island-design-taro/style.css'

const visible = ref(false)
const navbarHeight = ref(0)
</script>
```

也可以按组件路径导入：

```ts
import IslandAnimateModal from 'island-design-taro/components/island-animate-modal'
import IslandImage from 'island-design-taro/components/island-image'
import IslandNavbar from 'island-design-taro/components/island-navbar'
import IslandText from 'island-design-taro/components/island-text'
import 'island-design-taro/style.css'
```

## IslandAnimateModal Props

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `visible` | `boolean` | - | 是否展示弹窗 |
| `keepMaskOnLeave` | `boolean` | `false` | 内容离场时是否保留遮罩 |
| `showClose` | `boolean` | `true` | 是否展示关闭按钮 |
| `zIndex` | `number` | `9999` | 弹窗层级 |

## IslandAnimateModal Events

| 事件 | 说明 |
| --- | --- |
| `update:visible` | 更新展示状态 |
| `mask-click` | 点击遮罩时触发 |
| `close` | 点击关闭按钮时触发 |
| `after-enter` | 入场动画结束后触发 |
| `after-leave` | 离场动画结束后触发 |

## IslandAnimateModal Slots

| 插槽 | 说明 |
| --- | --- |
| `default` | 弹窗内容 |

## IslandImage Props

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `size` | `number` | - | 设置宽高，单位 `rpx` |
| `width` | `number \| string` | - | 宽度，数字单位为 `rpx` |
| `height` | `number` | - | 高度，单位 `rpx` |
| `radius` | `number \| string` | `0` | 圆角，数字单位为 `px` |
| `src` | `string` | - | 图片地址 |
| `mode` | `keyof ImageProps.Mode` | `widthFix` | Taro Image 裁剪模式 |
| `preview` | `boolean` | `false` | 点击后是否预览图片 |

## IslandNavbar Props

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `title` | `string` | - | 标题文本 |
| `backIcon` | `boolean` | `true` | 是否展示返回按钮 |
| `showHomeIcon` | `boolean` | `false` | 当前页面栈为 1 时是否展示首页按钮 |
| `background` | `string` | `transparent` | 导航栏背景 |
| `placeholder` | `boolean` | `true` | 是否保留导航栏占位高度 |
| `homeUrl` | `string` | `/pages/index/index` | 首页按钮跳转地址 |
| `backFunc` | `() => void` | - | 自定义返回逻辑 |

## IslandNavbar Events

| 事件 | 说明 |
| --- | --- |
| `load` | 导航栏高度计算完成后触发，参数为 `navbarHeight` |
| `back` | 点击返回按钮时触发 |
| `title-click` | 点击标题区域时触发 |
| `home-click` | 点击首页按钮时触发 |

## IslandNavbar Slots

| 插槽 | 说明 |
| --- | --- |
| `center` | 自定义标题区域 |
| `home` | 自定义首页图标 |
| `right` | 自定义右侧占位区域 |

## IslandText Props

| 参数 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `color` | `string` | `#181818` | 文字颜色 |
| `weight` | `number` | `500` | 字重 |
| `size` | `number` | `28` | 字号，单位为 `rpx` |
| `lineCount` | `number` | `1` | 最大显示行数，小于等于 `0` 时不限制行数 |
| `isActive` | `boolean` | `false` | 是否使用激活颜色 |
| `activeColor` | `string` | - | 激活状态的文字颜色，未设置时回退到 `color` |
| `text` | `string` | - | 默认文字内容 |

## IslandText Slots

| 插槽 | 说明 |
| --- | --- |
| `default` | 自定义文字内容；未传入时显示 `text` |
| `inner` | 自定义内部内容，优先级高于默认插槽和 `text` |

## 开发

```bash
pnpm install
pnpm run typecheck
pnpm run build
```
