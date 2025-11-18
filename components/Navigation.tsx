"use client"// TODO use client 추가

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import Link from "next/link";
import { FaMoon, FaSun } from "react-icons/fa6";
import LoginButton from "./loginButton";
import { useSession } from "next-auth/react";
import { useUserStore } from "@/store/userStore";


export function Navigation(){

  const {theme, setTheme} = useTheme();
  const [mouted, setMouted] = useState(false);

  const {data:session} = useSession()
  const loadFavorites = useUserStore((state)=>state.loadFavorites)

  useEffect(()=> {
    setMouted(true)
  }, [])

  useEffect( ()=> {
    loadFavorites(session)
  }, [session, loadFavorites])
  
  return (
    <nav className="border-b mx-3">
      <div className="container flex h-14 max-w-screen-2xl justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="cursor-target">
            <h2>포켓몬 도감</h2>
          </Link>
          <Link href="/about" className="cursor-target">
            <h2>About</h2>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {mouted && (
            <>
              <LoginButton />
              <Button
                variant="ghost"
                size="sm"
                onClick={()=>setTheme(theme==='dark' ? "light" : "dark")}
                className="cursor-target"
              >
                {theme === "dark" ? (
                  <FaSun className="text-yellow-500"/>
                ) : (
                  <FaMoon className="text-yellow-500"/>
                )}
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}