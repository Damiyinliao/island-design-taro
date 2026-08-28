import type { App } from 'vue'
import { componentList, components } from './component-list'
import { IslandAnimateModal, IslandImage, IslandNavbar, IslandText } from './components'

export { IslandAnimateModal, IslandImage, IslandNavbar, IslandText, componentList }
export type { IslandAnimateModalProps, IslandImageProps, IslandNavbarProps, IslandTextProps } from './components'

export default {
  install(app: App) {
    components.forEach((component) => {
      app.use(component)
    })
  },
}
