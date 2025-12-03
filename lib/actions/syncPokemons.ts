'use server'

import { getPokemonDetail, getPokemonEvolution, getPokemonSpecies } from "../pokeAPI"

async function fetchPokemonData(p:{name:string, url:string}) {
  try {
    const detail = await getPokemonDetail(p.url)
    const species = await getPokemonSpecies(detail.species.url)
    const evolution = await getPokemonEvolution(species.evolution_chain.url)

    return {
      id:detail.id,
      name_en: detail.name,
      name_ko: species.names.find(n=>n.language.name==='ko')?.name ?? "",
      image_url: detail.sprites.other['official-artwork'].front_default,
      types: detail.types.map(t=>t.type.name),
      evolution: buildEvolutionInfo(evolution.chain, detail.name),
    }
  } catch(error){
    console.error(`fetchPokemonData ${p.name} 처리 실패: `,error)
    return null
  }
}

function buildEvolutionInfo(evolChain:any, pokemonName:string) {
  let evolStage = -1;
  
  function dfs(cursor:any, next:any, line:number) {
    // TODO 연습문제
  }

  const evolInfo:any =[]
  dfs(evolChain, evolInfo, 1)
  return {evolInfo, evolStage}

}