import { ThemeSwitcher } from "@/components/theme-switcher";
import Link from "next/link";
import Image from "next/image";
import classicPainting from './classic-painting.png';
import { createClient } from "@/lib/supabase/client";
import { Suspense } from "react";

async function Articles() {
  const supa = await createClient()

  const { data : posts, error } = await supa.from("articles").select("id, title, slug, authors:author_id(name)").limit(10)
  console.log(posts)

  if (error) {
    console.log(error)
  }

  return (
      <div className="grid grid-cols-1 md:grid-cols-3">
        {posts?.map((post) => {
          
          {/* @ts-ignore */}
          const authorName = post.authors?.name

          return (
          <Link key={post.id} href={`/articles/${post.slug}`}>
            <div className="p-4 border rounded-lg shadow-sm">
              <h2 className="text-xl font-bold">{post.title}</h2>
              <h2>
                By: {authorName}
              </h2>
            </div>
          </Link>
        )})}
      </div>
  )
}

export default async function Home() {
  

  return (
    <main className="min-h-screen flex flex-col items-center">
      {/* Hero */}
      <div className="relative w-full h-64 overflow-hidden">
        {/* 1. The Image (Base layer) */}
        <Image 
          src={classicPainting} 
          alt="classical painting" 
          fill={true} 
          className="relative z-0 object-cover object-center" 
          priority
        />
        
        {/* 2. The Tint Overlay (Middle layer) */}
        <div className="absolute inset-0 z-10 bg-black/40 mix-blend-multiply" />
        
        {/* 3. The Text Container (Top layer) */}
        <div className="absolute inset-0 z-20 flex items-center justify-center text-white">
          <h1 className="text-4xl font-bold tracking-wide drop-shadow-lg">
            Aaron Cantu&apos;s Blog
          </h1>
        </div>
      </div>

      {/* Article Display */}
      <Suspense fallback={<p className="text-gray-500">Loading latest stories...</p>}>
        <Articles />
      </Suspense>
      

      <ThemeSwitcher></ThemeSwitcher>
    </main>
  );
}
