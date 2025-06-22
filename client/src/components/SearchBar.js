import { useState } from "react";

export default function SearchBar({ onSearch, placeholder = "🔍 Search by title, volume, or type..." }) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleInput = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // Pass to parent
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="relative">
        {/* Anime glow effect background */}
        <div className={`absolute inset-0 rounded-full transition-all duration-500 ${
          isFocused 
            ? 'bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-orange-500/20 blur-sm scale-105' 
            : 'bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-orange-500/10 blur-sm'
        }`}></div>
        
        {/* Main search input */}
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={handleInput}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className={`w-full px-6 py-4 pl-12 pr-12 rounded-full border-2 text-gray-800 bg-white/90 backdrop-blur-md shadow-xl placeholder:text-gray-400 text-lg transition-all duration-300 ${
              isFocused
                ? 'border-gradient-to-r from-pink-500 via-purple-500 to-orange-500 ring-4 ring-pink-300/30 scale-[1.02]'
                : 'border-pink-300 hover:border-pink-400'
            }`}
            style={{
              background: isFocused 
                ? 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,240,245,0.95) 100%)'
                : 'rgba(255,255,255,0.9)'
            }}
          />
          
          {/* Search icon */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <svg 
              className={`w-6 h-6 transition-colors duration-300 ${
                isFocused ? 'text-pink-500' : 'text-gray-400'
              }`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </div>
          
          {/* Clear button */}
          {query && (
            <button
              onClick={handleClear}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <svg 
                className="w-5 h-5 text-gray-400 hover:text-gray-600" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M6 18L18 6M6 6l12 12" 
                />
              </svg>
            </button>
          )}
        </div>
        
        {/* Anime sparkle effects */}
        {isFocused && (
          <>
            <div className="absolute -top-2 -left-2 w-4 h-4 bg-yellow-300 rounded-full animate-ping opacity-75"></div>
            <div className="absolute -top-1 -right-3 w-3 h-3 bg-pink-400 rounded-full animate-pulse opacity-75"></div>
            <div className="absolute -bottom-2 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-bounce opacity-75"></div>
            <div className="absolute -bottom-1 right-1/4 w-3 h-3 bg-orange-400 rounded-full animate-pulse opacity-75"></div>
          </>
        )}
      </div>
      
      {/* Search suggestions/status */}
      {query && (
        <div className="mt-3 text-center">
          <p className="text-sm text-gray-600">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 text-pink-700">
              <span className="mr-1">🔍</span>
              Searching for "{query}"
            </span>
          </p>
        </div>
      )}
    </div>
  );
}