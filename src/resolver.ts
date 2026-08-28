export interface IslandDesignTaroResolverOptions {
  importStyle?: boolean
}

interface ComponentResolveResult {
  name: string
  from: string
  sideEffects?: string
}

interface ComponentResolver {
  type: 'component'
  resolve: (name: string) => ComponentResolveResult | undefined
}

const packageName = 'island-design-taro'
const stylePath = `${packageName}/style.css`
const componentNames = new Set(['IslandAnimateModal', 'IslandImage', 'IslandNavbar', 'IslandText'])

export default function IslandDesignTaroResolver(options: IslandDesignTaroResolverOptions = {}): ComponentResolver {
  const { importStyle = true } = options

  return {
    type: 'component',
    resolve: (name) => {
      if (!componentNames.has(name)) return undefined

      return {
        name,
        from: packageName,
        sideEffects: importStyle ? stylePath : undefined,
      }
    },
  }
}
