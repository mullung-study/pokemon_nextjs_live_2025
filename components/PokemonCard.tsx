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
  // TODO session, favorites, showDialog, isFavorited 추가
  const typeConfig = getTypeConfig(pokemon?.types[0])
   // TODO handleStarClick 만들기

  return (
    <Link href={`/pokemon/${pokemon?.id}`}>
      <Card 
        className={cn(
          "w-full", // TODO relative 추가
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
            // TODO button 추가
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
    //TODO FavoriteDialog 추가 + Fragment로 감싸기
  )
}
