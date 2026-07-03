import { withInstall } from '../../utils'
import IslandNavbar from './index.vue'
import './style.css'

const InstalledIslandNavbar = withInstall(IslandNavbar)

export type { IslandNavbarProps } from './types'
export { InstalledIslandNavbar as IslandNavbar }
export default InstalledIslandNavbar
