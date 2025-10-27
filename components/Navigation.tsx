// TODO use client 추가

import { useEffect, useState } from "react";
import { Button } from "./ui/button";


export function Navigation(){
  // TODO useTheme 적용
  // TODO useState + useEffect로 mounted 적용 - 클라이언트에서 theme이 준비될 때까지 버튼을 숨김
  return (
    <nav className="border-b mx-3">
      <div className="container flex h-14 max-w-screen-2xl justify-between">
        <div className="flex items-center gap-4">
          <h2>포켓몬 도감</h2>
          <h2>About</h2>
        </div>
        <div className="flex items-center gap-4">
          // TODO 테마 버튼 만들기
        </div>
      </div>
    </nav>
  )
}