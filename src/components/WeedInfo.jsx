// src/components/WeedInfo.jsx

function speak(text, lang = "en") {
  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = lang === "hi" ? "hi-IN" : "en-US";
  window.speechSynthesis.speak(msg);
}
export default function WeedInfo({ data, lang }) {
  const textToSpeak = lang === "hi"
    ? `${data.language_translations?.hi}. ${data.details_hi || ''}`
    : `${data.language_translations?.en || data.name}. ${data.details}`;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold">{textToSpeak}</h2>

      <button
        className="mt-2 px-4 py-2 bg-green-600 text-white rounded"
        onClick={() => speak(textToSpeak, lang)}
      >
        🔊 Speak
      </button>

      <p className="mt-4">{lang === "hi" ? data.details_hi : data.details}</p>
    </div>
  );
}

