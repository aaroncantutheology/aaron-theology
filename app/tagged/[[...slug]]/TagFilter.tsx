// app/tags/[slug]/TagFilter.tsx
"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client"; // Make sure to use the client version here
import ArticleCard from "@/components/article-card";

interface TagFilterProps {
    allTags: string[];
    initialTag: string;
}

export default function TagFilter({ allTags, initialTag }: TagFilterProps) {
    // Initialize state with the tag from the URL slug
    const [selectedTags, setSelectedTags] = useState<string[]>(
        initialTag ? [initialTag] : []
    );
    const [articles, setArticles] = useState<any[]|null>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const supabase = createClient();

    // Fetch articles whenever the selectedTags array changes
    useEffect(() => {
        async function fetchArticles() {
            if (selectedTags.length === 0) {
                const { data, error } = await supabase
                .from('articles')
                .select('*')

                setArticles(data);
                return;
            }

            setLoading(true);

            // NOTE: This query assumes the 'tags' column in your articles table is an array (e.g., text[]).
            // If your 'tags' column is a single string, change `.overlaps` to `.in('tags', selectedTags)`
            const { data, error } = await supabase
                .from('articles')
                .select('*')
                .overlaps('tags', selectedTags); 

            if (error) {
                console.error("Error fetching articles:", error);
            } else if (data) {
                setArticles(data);
            }
            
            setLoading(false);
        }

        fetchArticles();
    }, [selectedTags]);

    // Handle button clicks to select/deselect tags
    const toggleTag = (tag: string) => {
        setSelectedTags((prevTags) => 
            prevTags.includes(tag)
                ? prevTags.filter(t => t !== tag) // Remove if already selected
                : [...prevTags, tag]              // Add if not selected
        );
    };

    return (
        <div className="space-y-8">
            {/* 1. Interactive Tag Buttons */}
            <div className="flex flex-wrap gap-3">
                {allTags.map((tag, idx) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                        <button
                            key={idx}
                            onClick={() => toggleTag(tag)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                                isSelected 
                                    ? "bg-gray-600 text-white border-gray-600 hover:bg-gray-700" 
                                    : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                            }`}
                        >
                            {tag}
                        </button>
                    );
                })}
            </div>

            {/* 2. Display the Articles */}
            <div>
                {loading ? (
                    <p className="text-slate-500 animate-pulse">Fetching articles...</p>
                ) : articles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {articles.map((article) => (
                            <ArticleCard
                                key={article.id}
                                title={article.title}
                                author={'Aaron Cantu'}
                                slug={article.slug}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-slate-500">No articles found for the selected tags.</p>
                )}
            </div>
        </div>
    );
}