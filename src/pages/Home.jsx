import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <section className="text-center py-12 px-4 bg-gradient-to-br from-green-50 via-green-100 to-white rounded-xl shadow-md relative overflow-hidden">
        <h1 className="text-4xl font-bold text-green-800 mb-4">
          {t('home.welcome')}
        </h1>
        <p className="text-gray-700 max-w-2xl mx-auto mb-6">
          {t('home.description')}
        </p>
        <Link
          to="/detect"
          className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md transition font-medium"
        >
          {t('home.detectButton')}
        </Link>
      </section>

      {/* Feature Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
          <h3 className="text-lg font-semibold text-green-700 mb-2">
            🌿 {t('home.features.realtimeTitle')}
          </h3>
          <p className="text-gray-600 text-sm">
            {t('home.features.realtimeDesc')}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
          <h3 className="text-lg font-semibold text-green-700 mb-2">
            📅 {t('home.features.calendarTitle')}
          </h3>
          <p className="text-gray-600 text-sm">
            {t('home.features.calendarDesc')}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
          <h3 className="text-lg font-semibold text-green-700 mb-2">
            👨‍🌾 {t('home.features.expertTitle')}
          </h3>
          <p className="text-gray-600 text-sm">
            {t('home.features.expertDesc')}
          </p>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-white p-6 rounded-xl shadow mt-8 text-center">
        <p className="italic text-gray-600">{t('home.testimonial.quote')}</p>
        <p className="font-semibold text-green-700 mt-2">
          {t('home.testimonial.author')}
        </p>
      </section>

      {/* Footer */}
      <footer className="bg-green-700 text-white p-4 mt-12 text-center rounded-t-xl">
        {t('home.footer')}
      </footer>
    </div>
  );
};

export default Home;
