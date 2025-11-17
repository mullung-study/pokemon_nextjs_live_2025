"use client"
import Galaxy from "@/components/Galaxy";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({error, reset}:{error:Error, reset:()=>void}) {
  return (
    <div>
      <div className="absolute inset-0 -z-10">
        <Galaxy />
      </div>
      <div className="flex flex-col items-center justify-center m-10">
        <h1 className="text-4xl font-bold">Error</h1>
        <p className="text-xl text-muted-foreground">포켓몬 불러오기 실패</p>
        <p className="text-sm text-muted-foreground">{error.message}</p>
        <div className="flex gap-4">
          <Button onClick={reset}>다시 시도</Button>
          <Button asChild>
            <Link href="/">홈으로</Link>
          </Button>
        </div>
        
      </div>
    </div>
  )
}