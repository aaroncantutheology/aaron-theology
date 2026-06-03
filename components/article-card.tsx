import Link from "next/link"

export default function ArticleCard({ slug, author, title } : { slug : string, author : string | null, title : string,  }) {
    return (
          <Link href={`/posts/${slug}`}>
            <div className="p-4 border rounded-lg shadow-sm">
              <h2 className="text-xl font-bold">{title}</h2>
              <h2>
                By: {author}
              </h2>
            </div>
          </Link>
        )
}