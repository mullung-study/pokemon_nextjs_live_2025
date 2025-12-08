export interface PokemonsFromSupabase {
  id: number
  name_en: string
  name_ko: string
  image_url: string
  types: string[]
}

export interface EvolutionNode {
  id: string
  name: string
  next: EvolutionNode[]
}

export interface Evolution {
  evolInfo: EvolutionNode[]
  evolStage: number
}

export interface PokemonWithEvol extends PokemonsFromSupabase {
  evolution: Evolution
}