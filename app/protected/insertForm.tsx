'use client'

import { useActionState, useEffect, useRef, useState } from 'react';
import { insertPost } from './insertPostServer';
import TagInput from '@/components/TagInput';

export default function NewPostForm() {
  const [state, formAction, isPending] = useActionState(insertPost, null);
  const formRef = useRef(null);
  const [tagResetKey, setTagResetKey] = useState(0);

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset(); 
      setTagResetKey(prev => prev + 1); 
    }
  }, [state]);

  return (
    <main className="p-8 max-w-5xl">
      <h1 className="text-2xl font-bold mb-4">Create a New Post</h1>
      
      <form action={formAction} ref={formRef} className="flex flex-col gap-4">
        
        <div className="flex flex-col">
          <label htmlFor="title" className="font-semibold mb-1">Title</label>
          <input 
            type="text" 
            id="title" 
            name="title"
            required 
            // Add defaultValue right here:
            defaultValue={state?.values?.title || ''} 
            className="border border-gray-300 p-2 rounded text-black"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="author" className="font-semibold mb-1">Author</label>
          <input 
            type="text" 
            id="author" 
            name="author"
            required 
            // Add defaultValue right here:
            defaultValue={state?.values?.author || ''} 
            className="border border-gray-300 p-2 rounded text-black"
          />
        </div>

        <TagInput key={tagResetKey} />

        <div className="flex flex-col">
          <label htmlFor="content" className="font-semibold mb-1">Content</label>
          <textarea 
            id="content" 
            name="content" 
            required 
            rows={4}
            // Add defaultValue right here:
            defaultValue={state?.values?.content || ''} 
            className="border border-gray-300 p-2 rounded text-black"
          />
        </div>

        {state && (
          <div className={`p-3 rounded text-sm font-medium ${state.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {state.message}
          </div>
        )}

        <button 
          type="submit" 
          disabled={isPending}
          className="bg-gray-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isPending ? 'Submitting...' : 'Submit Post'}
        </button>
      </form>
    </main>
  );
}