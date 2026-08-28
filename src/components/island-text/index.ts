import { withInstall } from '../../utils'
import IslandText from './index.vue'
import './style.css'

const InstalledIslandText = withInstall(IslandText)

export type { IslandTextProps } from './types'
export { InstalledIslandText as IslandText }
export default InstalledIslandText
