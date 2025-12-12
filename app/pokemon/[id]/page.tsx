import PokemonCard from "@/components/PokemonCard"
import { notFound } from "next/navigation";
import { getPokemonById } from "@/lib/actions/pokemonData";
import { Metadata } from "next";

export async function generateMetadata({params}:{params:Promise<{id:string}>}):Promise<Metadata> {
  const {id} = await params;
  const pokemon = await getPokemonById(Number(id));

  if (!pokemon) {
    return {title: "포켓몬을 찾을 수 없습니다"};
  }

  return {
    title: pokemon.name_ko,
    description: `${pokemon.name_ko}의 상세정보`
  }
}

export default async function PokemonDetails({params}:{params:Promise<{id:string}>}) {

  const {id} = await params
  const pokemon = await getPokemonById(Number(id));

  if (!pokemon) {
    notFound()
  }
  return (
    <div className="flex justify-center m-4" >
      <PokemonCard pokemon={
        {
          id:pokemon.id,
          name:pokemon.name_ko || pokemon.name_en,
          types:pokemon.types,
          image:pokemon.image_url
        }
      } />
    </div>
  )
}
