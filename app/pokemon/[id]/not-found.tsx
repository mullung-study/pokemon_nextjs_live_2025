import Link from "next/link";
import { Button } from "@/components/ui/button";
import Galaxy from "@/components/Galaxy";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="absolute inset-0 -z-10">
        <Galaxy />
      </div>
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-xl text-muted-foreground">포켓몬을 찾을 수 없어요</p>
      <p className="text-sm text-muted-foreground">1-1010번 포켓몬만 조회 가능해요</p>
      <Button asChild>
        <Link href="/">홈으로 돌아가기</Link>
      </Button>
    </div>
  );
}