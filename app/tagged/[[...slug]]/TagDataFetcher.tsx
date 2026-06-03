// app/tagged/[[...slug]]/TagDataFetcher.tsx
import { createClient } from "@/lib/supabase/server";
import TagFilter from "./TagFilter";

export default async function TagDataFetcher({ 
    paramsPromise 
}: { 
    paramsPromise: Promise<{ slug?: string[] }> 
}) {
    // 1. Await params HERE, safely inside the Suspense boundary
    const resolvedParams = await paramsPromise;
    const slugValue = resolvedParams.slug?.[0] || "";
    const initialTag = decodeURIComponent(slugValue);

    // 2. Await Supabase (reads cookies safely inside Suspense)
    const supa = await createClient();
    const { data: uniqueTags, error } = await supa.rpc('get_unique_tags');

    if (error) {
        console.error("Failed to fetch tags:", error);
    }

    return (
        <TagFilter 
            allTags={uniqueTags || []} 
            initialTag={initialTag} 
        />
    );
}