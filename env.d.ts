declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, any>
  export default component
}

declare module 'vue' {
  export interface GlobalComponents {
    view: DefineComponent<Record<string, any>, object, any>
    image: DefineComponent<Record<string, any>, object, any>
  }
}

export {}
