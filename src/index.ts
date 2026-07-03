import type { App } from 'vue'
import { componentList, components } from './component-list'
import { IslandAnimateModal, IslandImage, IslandNavbar } from './components'

export { IslandAnimateModal, IslandImage, IslandNavbar, componentList }
export type { IslandAnimateModalProps, IslandImageProps, IslandNavbarProps } from './components'

export default {
  install(app: App) {
    components.forEach((component) => {
      app.use(component)
    })
  },
}
