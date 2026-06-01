import { createClient } from "@/lib/supabase/client"
import { Suspense } from "react"

// 1. The main Page component handles the params and provides the Suspense boundary
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {

  return (
    <main className="max-w-2xl mx-auto px-4 py-10 antialiased font-sans">
      <Suspense fallback={<p className="text-slate-500 text-center">Loading article...</p>}>
        <BlogPostContent paramsPromise={params} />
      </Suspense>
    </main>
  )
}

// 2. The Child component fetches the data inside the Suspense boundary
async function BlogPostContent({ paramsPromise }: { paramsPromise : Promise<{ slug: string }> }) {
  const { slug } = await paramsPromise

  const supa = createClient()
  const { data: post, error } = await supa
    .from("articles")
    .select('title, published_on, content, authors:author_id(name)')
    .eq("slug", slug)
    .single()

  if (error || !post) {
    console.error(error)
    return <p className="text-red-500">Article not found.</p>
  }

  return (
    <article>
      {/* Title */}
      <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl mb-4">
        {post.title}
      </h1>
      
      {/* Author / Meta */}
      <div className="text-sm text-slate-500 mb-6">
        {/* @ts-ignore */}
        By <span className="font-semibold text-slate-800 hover:underline cursor-pointer">{post.authors?.name}</span>
      </div>
      
      {/* Divider */}
      <hr className="border-slate-200 mb-8" />
      
      {/* Content Body */}
      <div className="text-lg text-slate-700 leading-relaxed whitespace-pre-wrap space-y-4">
        {post.content}
      </div>
    </article>
  )
}