import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="container mx-10 p-4">
      <h1 className="text-4xl font-bold mb-4">About</h1>
      <p className="text-gray-600 mb-6">
        React + Shadcn UI + PokeAPI
      </p>
      <Link href="/about/details">
        Details 페이지로 이동
      </Link>
    </div>
  )
}