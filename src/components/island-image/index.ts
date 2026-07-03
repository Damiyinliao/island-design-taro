import { withInstall } from '../../utils'
import IslandImage from './index.vue'
import './style.css'

const InstalledIslandImage = withInstall(IslandImage)

export type { IslandImageProps } from './types'
export { InstalledIslandImage as IslandImage }
export default InstalledIslandImage
