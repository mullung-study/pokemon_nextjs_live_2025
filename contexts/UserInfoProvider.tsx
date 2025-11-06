"use client"

import { Dispatch, ReactNode, SetStateAction, useContext, useEffect } from "react";

interface UserInfoContextType {
  favorites: number[];    
  setFavorites: Dispatch<SetStateAction<number[]>>;
}
// TODO UserInfoContext 만들기


export function UserInfoProvider({children}:{children:ReactNode}) {
  // TODO session 확인하기, favorites 추가

  useEffect(()=> {
    const getUserFavorites = async () => {
      // TODO session 정보 있으면 DB에서 favorites 불러오기 
    }
    getUserFavorites()
  }, [session])
  return (
    <UserInfoContext.Provider value={{favorites, setFavorites}}>
      {children}
    </UserInfoContext.Provider>
  )
}

export const useUserInfo = () => useContext(UserInfoContext);