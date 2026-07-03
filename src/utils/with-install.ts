import type { App, Component } from 'vue'

export type WithInstall<T> = T & {
  install(app: App): void
}

export const withInstall = <T extends Component>(component: T) => {
  const installedComponent = component as WithInstall<T>

  installedComponent.install = (app: App) => {
    if (installedComponent.name) {
      app.component(installedComponent.name, installedComponent)
    }
  }

  return installedComponent
}
