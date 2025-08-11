import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { FaHome, FaCalendarAlt, FaBug, FaUserMd, FaMicroscope } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

import Home from './pages/Home';
import Calendar from './pages/Calendar';
import Experts from './pages/Experts';
import Report from './pages/Report';
import Detect from './pages/Detect';

import './i18n/i18n';

function App() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
          <h1 className="text-2xl font-bold text-green-700">🌿 WeedGuard</h1>
          
          <div className="flex gap-6 text-sm md:text-base items-center">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md font-medium transition ${isActive ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:text-green-700 hover:bg-green-50'}`
              }
            >
              <FaHome />
              {t('nav.home')}
            </NavLink>

            <NavLink
              to="/detect"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md font-medium transition ${isActive ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:text-green-700 hover:bg-green-50'}`
              }
            >
              <FaMicroscope />
              {t('nav.detect')}
            </NavLink>

            <NavLink
              to="/calendar"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md font-medium transition ${isActive ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:text-green-700 hover:bg-green-50'}`
              }
            >
              <FaCalendarAlt />
              {t('nav.calendar')}
            </NavLink>

            <NavLink
              to="/report"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md font-medium transition ${isActive ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:text-green-700 hover:bg-green-50'}`
              }
            >
              <FaBug />
              {t('nav.report')}
            </NavLink>

            <NavLink
              to="/experts"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md font-medium transition ${isActive ? 'bg-green-100 text-green-700' : 'text-gray-600 hover:text-green-700 hover:bg-green-50'}`
              }
            >
              <FaUserMd />
              {t('nav.experts')}
            </NavLink>

            {/* Language Toggle */}
            <select
              value={i18n.language}
              onChange={(e) => changeLanguage(e.target.value)}
              className="ml-4 border rounded px-2 py-1 text-sm"
            >
              <option value="en">EN</option>
              <option value="hi">हिंदी</option>
            </select>
          </div>
        </nav>

        <main className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/report" element={<Report />} />
            <Route path="/experts" element={<Experts />} />
            <Route path="/detect" element={<Detect />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
