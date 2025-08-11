import React from 'react';

export default function LanguageToggle({ lang, setLang }) {
  return (
    <div className="flex gap-2 items-center mb-4">
      <span className="font-semibold">🌐 Language:</span>
      <button
        onClick={() => setLang('en')}
        className={`px-3 py-1 rounded ${lang === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        English
      </button>
      <button
        onClick={() => setLang('hi')}
        className={`px-3 py-1 rounded ${lang === 'hi' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        हिंदी
      </button>
    </div>
  );
}
