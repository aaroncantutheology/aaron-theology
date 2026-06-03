'use server'

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function insertPost(prevState, formData) {
  const supabase = await createClient();

  const title = formData.get('title');
  const author = formData.get('author');
  const content = formData.get('content');
  const tagsString = formData.get('tags');
  const slug = formData.get('slug');
  
  // 1. Bundle the values so we can return them if something fails
  const submittedValues = {
    title: title || '',
    author: author || '',
    content: content || '',
    slug: slug || ''
  };

  // Basic Validation
  if (!title || !content || !author) {
    return { 
      success: false, 
      message: 'Title, Author, Slug, and Content are required.',
      values: submittedValues // <--- Return values here
    };
  }

  const authors = await supabase.from('authors').select('id').eq('name', author)

  if (authors !== null && authors.data.length == 0) {
    return { 
      success: false, 
      message: 'Failed to create post. The author is not in the database.',
      values: submittedValues // <--- Return values here
    };
  }

  const author_id = authors.data[0].id

  const tagsArray = tagsString ? JSON.parse(tagsString) : [];
  console.log(tagsArray)

  const { data, error } = await supabase
    .from('articles')
    .insert([
      { title, content, author_id, slug, tags: tagsArray },
    ]);

  if (error) {
    console.error('Database Error:', error);
    return { 
      success: false, 
      message: 'Failed to create post. Please try again.',
      values: submittedValues // <--- Return values here
    };
  }

  revalidatePath('/');
  
  // On true success, we don't need to return the values
  return { success: true, message: 'Post created successfully!' };
}