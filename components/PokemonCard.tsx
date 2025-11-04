// "use client"

import { PokemonProps } from "@/lib/pokeAPI";
import { getTypeConfig } from "@/lib/pokemonTypes";
import Link from "next/link";
// import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { cn } from "@/lib/utils";
import TypeBadge from "./TypeBadge";
import Image from "next/image";

export default function PokemonCard({pokemon}:{pokemon:PokemonProps}) {
  // const [pokemon, setPokemon] = useState<PokemonProps | null>(null);

  // useEffect( () => {
  //   async function fetchData(){
  //     const data = await getPokemon(id)
  //     setPokemon(data);
  //   }
  //   fetchData();
  // }, [])
  
  // if (!pokemon) return <div>Loading...</div>
  const typeConfig = getTypeConfig(pokemon?.types[0])
  return (
    <Link href={`/pokemon/${pokemon?.id}`}>
      <Card 
        className={cn(
          "w-full",
          "rounded-md",
          "hover:opacity-80",
          "hover:scale-105",
          "transition-all",
          "duration-200",
          "hover:cursor-pointer",
          "ring-2",
          typeConfig.ringClass
        )}
      >
          <CardHeader className="flex justify-center">
            <CardTitle className="text-xl font-bold">
              {pokemon?.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center gap-2">
              {pokemon?.types.map((t,i)=> <TypeBadge key={i} typeName={t}/>)}
            </div>
            <Image src={pokemon?.image} alt={pokemon?.name} width={100} height={100} className="w-full h-full"/>
          </CardContent>
      </Card>
    </Link>
  )
}
