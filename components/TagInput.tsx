'use client'

import { useState } from 'react';

export default function TagInput() {
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') e.preventDefault();

    if ((e.key === 'Enter' || e.key === ',') && inputValue.trim() !== '') {
      e.preventDefault();
      const newTag = inputValue.trim();
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setInputValue('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="flex flex-col">
      <label className="font-semibold mb-1">Tags</label>
      
      {/* Visual representation of the tags */}
      <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded focus-within:ring-2 focus-within:ring-blue-500 bg-white">
        {tags.map((tag, index) => (
          <span key={index} className="flex items-center bg-gray-200 text-gray-800 px-2 py-1 rounded text-sm">
            {tag}
            <button type="button" onClick={() => removeTag(tag)} className="ml-2 text-gray-500 hover:text-red-500 font-bold focus:outline-none">
              &times;
            </button>
          </span>
        ))}

        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? "Type and press enter..." : ""}
          className="flex-grow outline-none text-black bg-transparent min-w-[120px]"
        />
      </div>

      {/* CRITICAL FIX: The Hidden Input
        This is the actual element the form submits. It converts the React array 
        into a JSON string so FormData can read it. 
      */}
      <input 
        type="hidden" 
        name="tags" 
        value={JSON.stringify(tags)} 
      />

      <p className="text-xs text-gray-500 mt-1">Press enter or comma to add a tag.</p>
    </div>
  );
}