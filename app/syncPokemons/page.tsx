"use client"

import { Button } from "@/components/ui/button"
import { syncMissingPokemons, syncPokemon } from "@/lib/actions/syncPokemons"
import { useState } from "react"

export default function SyncTest() {
  const [loading, setLoading] = useState(false)

  async function handleSync(offset:number, limit:number) {
    setLoading(true)
    const range = `${offset+1} ~ ${offset + limit}`
    try {
      const res = await syncPokemon(offset, limit)
      alert(`${range} 동기화 완료! 업데이트: ${res?.upserted}개`) 
    } catch (error) {
      console.error(error)
      alert(`${range} 동기화 실패: ` + (error instanceof Error ? error.message : '알 수 없는 오류'))
    } finally {
      setLoading(false)
    }
  }

  async function handleSyncMissing() {
    setLoading(true)
    try {
      const res = await syncMissingPokemons()
      alert(res.message || `누락된 포켓몬 동기화 완료. 업데이트: ${res.upserted}`) 
    } catch (error) {
      console.error(error)
      alert(`누락된 포켓몬 동기화 실패: ` + (error instanceof Error ? error.message : '알 수 없는 오류'))
    } finally {
      setLoading(false)
    }
  }  

  return (
    <div className="container mx-10 p-4">
      <h1 className="text-4xl font-bold mb-4">포켓몬 동기화</h1>
      <div className="flex flex-col gap-2 w-50">
        <Button onClick={()=>handleSync(0, 300)} disabled={loading}>
          {loading ? "동기화 중..." : "1~300"}
        </Button>
        <Button onClick={()=>handleSync(300, 300)} disabled={loading}>
          {loading ? "동기화 중..." : "301~600"}
        </Button>
        <Button onClick={()=>handleSync(600, 300)} disabled={loading}>
          {loading ? "동기화 중..." : "601~900"}
        </Button>
        <Button onClick={()=>handleSync(900, 300)} disabled={loading}>
          {loading ? "동기화 중..." : "901~1200"}
        </Button>
        
        <div className="border-t my-2"></div>
        <Button onClick={()=>handleSyncMissing()} disabled={loading}>
          {loading ? "동기화 중..." : "누락된 포켓몬 동기화"}
        </Button>
      </div>
    </div>
  )
}