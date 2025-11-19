// FavoriteDialog.tsx
import { addFavoriteAction, removeFavoriteAction } from "@/lib/actions/favorites";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";
import { useUserStore } from "@/store/userStore";

interface FavoriteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void; // setShowDialog -> 창 닫기 위해 가져옴
  pokemonId: number; 
  pokemonName: string;
}

export default function FavoriteDialog({
  open, onOpenChange, pokemonId, pokemonName
}: FavoriteProps) {
  const {favorites, addFavorite, removeFavorite} = useUserStore()

  const isFavorited = favorites.includes(pokemonId);
  
  async function handleConfirm() {

    if(isFavorited) {
      await removeFavoriteAction(pokemonId)
      removeFavorite(pokemonId)
    } else {
      await addFavoriteAction(pokemonId)
      addFavorite(pokemonId)
    }
    onOpenChange(false);
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-xs!">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isFavorited ? `${pokemonName} 찜하기 취소` : `${pokemonName} 찜하기`}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isFavorited ? '찜 목록에서 제거하시겠습니까?' : '찜 목록에 추가하시겠습니까?'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>확인</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}