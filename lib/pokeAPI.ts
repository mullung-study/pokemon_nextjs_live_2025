import { PokemonTypeKey } from "./pokemonTypes";

const POKE_API_BASE = "https://pokeapi.co/api/v2";

export interface PokemonProps {
  id: number,
  name: string;
  types: PokemonTypeKey[];
  image: string;
}

export async function getPokemon(id:number): Promise<PokemonProps> {
  try {
    // console.log(`${id} API Called`)
    const res = await fetch(`${POKE_API_BASE}/pokemon/${id}`, {
      next: { revalidate: 3600 }
    })
    if (res.status === 404) {
      throw new Error("NOT_FOUND")
    }
    if (!res.ok) throw new Error(`PokeAPI fetch failed : ${res.status} ${res.statusText}`)
    const data = await res.json();
    return {
      id: data.id,
      name: data.name,
      types: data.types.map((t:{type: {name:string}})=> t.type.name),
      image: data.sprites.other["official-artwork"].front_default,
    }
  } catch (err){
    console.log(err);
    throw err;  
  }
}

export async function getPokemonIdByType(typeName:string):Promise<number[]>{
  const res = await fetch(`${POKE_API_BASE}/type/${typeName}`, {next:{revalidate:86400}})
  if (!res.ok) return []

  const data = await res.json()
  return data.pokemon.map( (p: {pokemon:{url:string}}) => {
    const id = parseInt(p.pokemon.url.split('/')[6])
    return id
  }).filter((id:number) => id <= 1010)
} // [1,2,3, 10, 11, 35, ...] type=grass,fire => ['grass', 'fire']

export async function getPokemonIdByTypes(types: string[]): Promise<number[]> {
  if (types.length === 0){
    return []
  }
  const res = await Promise.all( types.map(type=>getPokemonIdByType(type)))
  // [ [1,2,3, 10, 11], [4,5,6, 9, 11] ] -> [1,2,3,4,5,6,9,10,11]  하나의 배열로 합치고, 중복제거, 정렬하기
  // const flat = []
  // for (let arr of res) {
  //   flat.push(...arr)
  // }
  // const set = new Set(flat)
  // return [...set].sort((a,b)=>a-b)
  return [...new Set(res.flat())].sort((a,b)=>a-b)
}

interface PokemonDetailProps {
  id:number;
  name:string;
  types: {type: {name:string}}[];
  sprites: { other: { ["official-artwork"]: { front_default: string } } };
  species: {url: string}
}

interface PokemonSpeciesProp {
  name: string;
  names: {language: {name:string}, name:string}[];
  evolution_chain: {url:string};
}

interface PokemonEvolutionChainProp {
  chain: {
    species: {name:string};
    evolves_to: PokemonEvolutionChainProp['chain'][];
  }
}

export async function getPokemonSummaries(offset=0, limit=300): Promise<{name:string,url:string}[]> {
  const res = await fetch(`${POKE_API_BASE}/pokemon?offset=${offset}&limit=${limit}`)
  if (!res.ok) throw new Error(`getPokemonSummaries Error, offset=${offset}, limit=${limit}`)
  const data = await res.json()
  return data.result;
}

export async function getPokemonDetail(url:string): Promise<PokemonDetailProps> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`getPokemonDetail, url: ${url}`);
  return await res.json();
} 

export async function getPokemonSpecies(url:string): Promise<PokemonSpeciesProp> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`getPokemonSpecies, url: ${url}`);
  return await res.json();
}

export async function getPokemonEvolution(url:string): Promise<PokemonEvolutionChainProp> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`getPokemonEvolution, url: ${url}`);
  return await res.json();
}