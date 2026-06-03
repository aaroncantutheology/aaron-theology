// app/tagged/[[...slug]]/page.tsx
import { Suspense } from "react";
import TagDataFetcher from "./TagDataFetcher";

// Notice: No 'async' here anymore!
export default function TaggedPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>
}) {
    return (
        <main className="p-6 max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Explore by Tags</h1>
            
            {/* The Suspense boundary now protects the page from BOTH params and cookies */}
            <Suspense fallback={<p className="text-slate-500 text-center">Loading tags...</p>}>
                <TagDataFetcher paramsPromise={params} />
            </Suspense>
        </main>
    );
}