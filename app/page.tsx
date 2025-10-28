"use client"

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function Home() {
  
  const [activate, setActivate] = useState(false)
  const [rounded, setRounded] = useState(0)

  const radiusLevels = ["rounded-sm", "rounded-md", "rounded-lg", "rounded-full"];
  return (
    <div>
      <Button 
        onClick={()=>{
          setActivate(prev=>!prev)
          setRounded(prev=>(prev+1)%4)
        }}
        className={
          cn(
            "cursor-pointer",
            "transition",
            "duration-1000",
            activate && ("bg-red-500 hover:bg-red-500/90 text-black"),
            radiusLevels[rounded]
          )
        }
      >버튼</Button>
    </div>
  );
}
