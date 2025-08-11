import React from 'react';

export default function VoiceOutput({ text, lang }) {
  const speak = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-US';
    speechSynthesis.speak(utterance);
  };

  return <button onClick={speak} className="mt-2 bg-yellow-400 text-black px-3 py-1 rounded">🔊 Listen</button>;
}