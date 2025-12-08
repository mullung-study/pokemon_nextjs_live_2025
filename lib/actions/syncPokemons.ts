'use server'

import { PokemonsFromSupabase, PokemonWithEvol } from "@/types/pokemon"
import { getPokemonDetail, getPokemonEvolution, getPokemonSpecies, getPokemonSummaries } from "../pokeAPI"
import { supabase } from "../supabase"

async function fetchPokemonData(p:{name:string, url:string}) {
  try {
    const detail = await getPokemonDetail(p.url)
    const species = await getPokemonSpecies(detail.species.url)
    const evolution = await getPokemonEvolution(species.evolution_chain.url)

    return {
      id:detail.id,
      name_en: detail.name,
      name_ko: species.names.find(n=>n.language.name==='ko')?.name ?? "",
      image_url: detail.sprites.other['official-artwork'].front_default ?? "",
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
    if(cursor.species.name === pokemonName) evolStage = line;
    const node = {
      id: cursor.species.url.split('/')[6],
      name: cursor.species.name,
      next:[]
    }
    next.push(node)
    if(!cursor.evolves_to || cursor.evolves_to.length===0) return;
    for (const child of cursor.evolves_to) {
      dfs(child, node.next, line+1)
    }
  }

  const evolInfo:any =[]
  dfs(evolChain, evolInfo, 1)
  return {evolInfo, evolStage}

}

export async function syncPokemon(offset:number=0, limit:number=300) {
  const pokemons =  await getPokemonSummaries(offset, limit)
  const details:(PokemonWithEvol[] | null) = [];

  if (!pokemons || pokemons.length === 0 ) {
    return { upserted:0 }
  }

  for(let i=0; i<pokemons.length; i+=10) {
    const batch = pokemons.slice(i, i+10)
    const batchReseults = await Promise.all(
      batch.map(p=>fetchPokemonData(p))
    );
    details.push(...batchReseults.filter((item)=>item !== null))
  }

  return await updatePokemonsToDB(details)
}

async function updatePokemonsToDB(details: PokemonsFromSupabase[]) {
  const validDetails = details.filter(result=>result !== null)

  if(validDetails.length===0) {
    return { upserted:0 }
  }

  const {error} = await supabase.from('pokemons').upsert(
    validDetails.map(pokemon=>{
      return {
        ...pokemon, updated_at: new Date().toISOString()
      }
    }),
    { onConflict: 'id'}
  )

  if (error) {
    console.error('updatePokemonsToDB 업데이트 실패:', error)
    throw new Error(`DB 업데이트 실패: ${error.message}`)
  }

  return { upserted: validDetails.length }
}

export async function syncMissingPokemons() {
  const allIds = Array.from({ length: 1025 }, (_, i) => i + 1)

  const { data: existingPokemons } = await supabase
    .from('pokemons')
    .select('id')

  const existingIds = existingPokemons?.map((p) => p.id) || []
  const missingIds = allIds.filter((id) => !existingIds.includes(id))

  if (missingIds.length === 0) {
    return { upserted: 0, message: '누락된 포켓몬이 없습니다.' }
  }

  console.log(`누락된 포켓몬 ${missingIds.length}개 발견:`, missingIds)

  const details = []
  for (const id of missingIds) {
    const pokemon = {
      name: `pokemon-${id}`,
      url: `https://pokeapi.co/api/v2/pokemon/${id}`,
    }

    const data = await fetchPokemonData(pokemon)
    if (data) {
      details.push(data)
    }
  }

  const result = await updatePokemonsToDB(details)

  return {
    ...result,
    missingCount: missingIds.length,
    message: `누락된 ${missingIds.length}개 중 ${result?.upserted}개 업데이트 완료`,
  }
}