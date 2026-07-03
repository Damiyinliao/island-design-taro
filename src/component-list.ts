import { IslandAnimateModal, IslandImage, IslandNavbar } from './components'

export const componentList = [
  {
    name: 'IslandImage',
    path: 'island-image',
    title: '图片',
    component: IslandImage,
  },
  {
    name: 'IslandNavbar',
    path: 'island-navbar',
    title: '导航栏',
    component: IslandNavbar,
  },
  {
    name: 'IslandAnimateModal',
    path: 'island-animate-modal',
    title: '动画弹窗',
    component: IslandAnimateModal,
  },
] as const

export const components = componentList.map((item) => item.component)
