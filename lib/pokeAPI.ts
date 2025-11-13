import { PokemonTypeKey } from "./pokemonTypes";

export interface PokemonProps {
  id: number,
  name: string;
  types: PokemonTypeKey[];
  image: string;
}

export async function getPokemon(id:number): Promise<PokemonProps> {
  try {
    // console.log(`${id} API Called`)
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
      next: { revalidate: 3600 }
    })
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
  const res = await fetch(`https://pokeapi.co/api/v2/type/${typeName}`, {next:{revalidate:86400}})
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