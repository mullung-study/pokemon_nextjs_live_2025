// "use client"
// import { useCounterStore } from "@/store/counterStore"
import Link from "next/link"

export default async function AboutPage() {
  // const {count} = useCounterStore()
  await new Promise(resolve => setTimeout(resolve, 2000));
  return (
    <div className="container mx-10 p-4">
      <h1 className="text-4xl font-bold mb-4">About</h1>
      <p className="text-gray-600 mb-6">
        {/* {count} */}
      </p>
      <Link href="/about">
        About 페이지로 이동
      </Link>
    </div>
  )
}