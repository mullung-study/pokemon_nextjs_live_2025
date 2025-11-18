import Galaxy from "@/components/Galaxy"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-10 p-4">
      <div className="absolute inset-0 -z-10">
        <Galaxy />
      </div>
      <Skeleton className="h-10 w-32 mb-4" />
      <Skeleton className="h-6 w-64 mb-6" />
      <Skeleton className="h-6 w-24" />
    </div>
  )
}

