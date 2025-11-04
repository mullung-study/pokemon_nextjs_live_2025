import { getTypeConfig, PokemonTypeKey } from "@/lib/pokemonTypes";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";


export default function TypeBadge({typeName}:{typeName:PokemonTypeKey}) {
  const typeConfig = getTypeConfig(typeName);
  const IconEl = typeConfig.icon
  return (
    <Badge
      className={cn(
        typeConfig.bgClass,
        typeConfig.textClass,
        "ring-2",
        typeConfig.ringClass,
        "font-semibold",
        "flex items-center gap-1.5"
      )}
    >
        <IconEl />
        <span>{typeConfig.displayName}</span>
    </Badge>
  )
}