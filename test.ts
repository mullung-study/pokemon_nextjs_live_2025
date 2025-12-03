export function buildEvolutionInfo(evolChain:any, pokemonName:string) {
  let evolStage = -1;
  
  function dfs(cursor:any, next:any, line:number) {
    // TODO 연습문제
    if( cursor.species.name===pokemonName) evolStage = line
    const node = {
      id: cursor.species.url.split("/")[6],
      name: cursor.species.name,
      next: []
    }
    next.push(node)
    if (!cursor.evolves_to || cursor.evolves_to.length===0) return;

    for (const child of cursor.evolves_to) {
      dfs(child, node.next, line+1)
    }

  }

  const evolInfo:any =[]
  dfs(evolChain, evolInfo, 1)
  return {evolInfo, evolStage}
}

const response = await fetch("https://pokeapi.co/api/v2/evolution-chain/1")
const data = await response.json()
const result = buildEvolutionInfo(data.chain, "venusaur")
console.log(console.log(JSON.stringify(result, null, 2)))