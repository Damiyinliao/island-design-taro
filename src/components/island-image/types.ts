import type { ImageProps } from '@tarojs/components'

export interface IslandImageProps {
  size?: number
  width?: number | string
  height?: number
  radius?: number | string
  src?: string
  mode?: keyof ImageProps.Mode
  preview?: boolean
}
