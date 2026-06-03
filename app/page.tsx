import { ThemeSwitcher } from "@/components/theme-switcher";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Suspense } from "react";
import ArticleCard from "@/components/article-card";

async function Posts() {
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
          <ArticleCard 
            key={post.id}
            slug={post.slug}
            title={post.title}
            author={authorName}
            />
        )})}
      </div>
  )
}

export default async function Home() {
  

  return (
    <main className="min-h-screen flex flex-col items-center">
      {/* Article Display */}
      <Suspense fallback={<p className="text-gray-500">Loading latest stories...</p>}>
        <Posts />
      </Suspense>
      

      <ThemeSwitcher></ThemeSwitcher>
    </main>
  );
}
