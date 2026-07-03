import { withInstall } from '../../utils'
import IslandAnimateModal from './index.vue'
import './style.css'

const InstalledIslandAnimateModal = withInstall(IslandAnimateModal)

export type { IslandAnimateModalProps } from './types'
export { InstalledIslandAnimateModal as IslandAnimateModal }
export default InstalledIslandAnimateModal
