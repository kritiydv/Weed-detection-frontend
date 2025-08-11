import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ImageUpload from '../components/ImageUpload';
import WeedInfoCard from '../components/WeedInfoCard';
import VoiceOutput from '../components/VoiceOutput';
import LanguageToggle from '../components/LanguageToggle';

const Detect = () => {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language || 'en');
  const [results, setResults] = useState(null);

  const handleLangChange = (newLang) => {
    setLang(newLang);
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div
        className="h-48 w-full bg-cover bg-center rounded-xl shadow"
        style={{ backgroundImage: `url("/8c417cd5-b105-46e7-bc6e-06f4bd4d7238.png")` }}
      >
        <div className="bg-black bg-opacity-30 h-full flex items-center justify-center rounded-xl">
          <h2 className="text-white text-3xl font-bold">{t('detect.bannerTitle')}</h2>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-green-700">{t('detect.uploadHeading')}</h2>
          <LanguageToggle lang={lang} setLang={handleLangChange} />
        </div>

        <ImageUpload onResult={setResults} />

        {results && (
          <div className="mt-6">
            {results.annotated_image && (
              <div className="mb-4">
                <img
                  src={`http://localhost:5000/${results.annotated_image}`}
                  alt={t('detect.annotatedImageAlt')}
                  className="max-w-full rounded shadow"
                />
              </div>
            )}
            {Array.isArray(results.detected_weeds) && results.detected_weeds.length > 0 ? (
              results.detected_weeds.map((weed, i) => (
                <div key={i} className="bg-gray-50 p-4 rounded-xl shadow mb-4">
                  <WeedInfoCard weed={weed} lang={lang} />
                  <VoiceOutput
                    text={
                      lang === 'hi'
                        ? weed.description_hi || weed.details || weed.description_en
                        : weed.description_en
                    }
                    lang={lang}
                  />
                </div>
              ))
            ) : (
              <p className="text-gray-600">{t('detect.noWeeds')}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Detect;
