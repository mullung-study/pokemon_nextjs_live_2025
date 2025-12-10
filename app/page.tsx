import PokemonList from "@/components/PokemonList";
import SearchBar from "@/components/SearchBar";
import { redirect } from "next/navigation";



export default async function Home({searchParams}:{searchParams:Promise<{page?:string, type?:string}>}) { // type=fire,water,grass
  const params = await searchParams
  const currentPage = Number(params.page)
  if (isNaN(currentPage) || currentPage < 1) {
    redirect("/?page=1")
  } 

  return (
    <div>
      <SearchBar />
      <PokemonList currentPage={currentPage} />
    </div>
  );
}
