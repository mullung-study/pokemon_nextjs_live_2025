"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";


interface UserData {
  id: number;
  oauth_id: string;
  name: string | null;
  email: string | null;
  data: {
    points: number;
  };
  created_at:string;
}

export default function LoginButton() {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<UserData | null>(null)
  
  useEffect( () => {
    const fetchUserData = async () => {
      if(session) {
        const res = await fetch('/api/users')
        const data = await res.json();
        console.log("DB 유저 정보: ", data)
        setUserData(data);
      }
    }
    fetchUserData()
  }, [session])
  if (status === "loading") {
    return <Button disabled>로딩중...</Button>
  }
  
  if (session) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex flex-col item-end">
          <span className="text-sm">{session.user?.name}님</span>
          {userData && (
            <Badge variant="secondary">
              {userData.data.points.toLocaleString()}P
            </Badge>
          )}
        </div>
        <Button onClick={() => signOut()}>로그아웃</Button>
      </div>
    )
  }
  
  return <Button onClick={() => signIn()}>로그인</Button>
}