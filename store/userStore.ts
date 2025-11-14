import { create } from "zustand";

interface UserState {
  favorites: number[];
  setFavorites: (favorites:number[]) => void;
  addFavorite: (id:number) => void;
  removeFavorite: (id:number) => void;
  loadFavorites: (session:any) => Promise<void>
}

export const useUserStore = create<UserState>( (set)=> {
  return {
    favorites: [],
    setFavorites: (favorites) => set({favorites}),
    addFavorite: (id) => set(state=>({favorites:[...state.favorites, id]})),
    removeFavorite: (id) => set(state=> {
      return {favorites:state.favorites.filter(t=>t!==id)}
    }),
    loadFavorites: async (session) => {
      if (!session) {
        set({favorites:[]})
        return
      }
      try {
        const data = await fetch('/api/favorites').then(res=>res.json())
        const favoriteIds = data.map((f:{pokemon_id:number})=>f.pokemon_id)
        set({favorites:favoriteIds})
      } catch(error) {
        console.error('loadFavorites Error: ', error)
        set({favorites:[]})
      }
    }
  }
} )