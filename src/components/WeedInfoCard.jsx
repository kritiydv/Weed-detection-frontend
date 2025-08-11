import React, { useEffect } from 'react';
import VoiceOutput from './VoiceOutput';
import { useTranslation } from 'react-i18next';

export default function WeedInfoCard({ weed, lang }) {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n]);

  // Dynamically fetch values based on language
  const name = lang === 'hi' ? weed.name_hi || weed.name : weed.name_en || weed.name;
  const description = lang === 'hi' ? weed.description_hi || weed.description : weed.description_en || weed.description;

  return (
    <div className="border p-4 rounded-xl shadow bg-white">
      <h2 className="text-xl font-bold mb-1">{name}</h2>
      <p className="text-sm text-gray-700 mb-2">{description}</p>

      <VoiceOutput text={description} lang={lang} />

      <ul className="mt-3 text-sm list-disc list-inside space-y-1">
        <li><strong>{t('scientific_name')}:</strong> {weed.scientific_name || t('not_available')}</li>
        <li><strong>{t('season')}:</strong> {weed.growth_season || t('not_available')}</li>
        <li><strong>{t('harmful')}:</strong> {weed.harmful ? t('yes') : t('no')}</li>
        <li><strong>{t('precautions')}:</strong> {weed.precautions || t('not_available')}</li>
        <li><strong>{t('eco_impact')}:</strong> {weed.eco_impact || t('not_available')}</li>
        <li><strong>{t('organic_control')}:</strong> {weed.organic_control || t('not_available')}</li>
        <li><strong>{t('herbicides')}:</strong> {(weed.herbicides || []).join(', ') || t('not_available')}</li>
        <li><strong>{t('affected_crops')}:</strong> {(weed.affected_crops || []).join(', ') || t('not_available')}</li>
        <li><strong>{t('common_states')}:</strong> {(weed.common_in_states || []).join(', ') || t('not_available')}</li>
      </ul>
    </div>
  );
}
