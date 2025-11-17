"use client"
import Galaxy from "@/components/Galaxy";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <div className="absolute inset-0 -z-10">
        <Galaxy />
      </div>
      <div className="flex flex-col items-center justify-center m-10">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-xl text-muted-foreground">포켓몬을 찾을 수 없습니다.</p>
        <p className="text-sm text-muted-foreground">1-1010번 포켓몬만 조회 가능</p>
        <Button asChild>
          <Link href="/">홈으로</Link>
        </Button>
      </div>
    </div>
  )
}