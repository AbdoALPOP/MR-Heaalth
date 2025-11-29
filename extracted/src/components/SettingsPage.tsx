import React from 'react';
import { ArrowRight, Sun, Moon, Globe, Bell, BellRing, Volume2, Vibrate } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import { translations } from '../utils/translations';

interface SettingsPageProps {
  onBack: () => void;
}

export function SettingsPage({ onBack }: SettingsPageProps) {
  const { theme, language, criticalNotifications, toggleTheme, setLanguage, toggleCriticalNotifications } = useSettings();
  const t = translations[language];

  return (
    <div className="max-w-lg mx-auto min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-700 dark:to-blue-900 text-white p-6 sticky top-0 z-10">
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity"
        >
          <ArrowRight size={24} />
          <span>{t.back}</span>
        </button>
        <h1 className="mb-1">{t.generalSettings}</h1>
        <p className="text-blue-100 text-sm mt-1">{t.advancedSettings}</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Appearance */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="mb-4 flex items-center gap-2 dark:text-white">
            <Sun size={20} className="text-blue-600 dark:text-blue-400" />
            {t.appearance}
          </h3>
          
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => theme === 'dark' && toggleTheme()}
              className={`p-4 rounded-xl border-2 transition-all ${
                theme === 'light'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
              }`}
            >
              <Sun size={24} className={`mx-auto mb-2 ${theme === 'light' ? 'text-blue-600' : 'text-gray-400'}`} />
              <p className={`text-sm ${theme === 'light' ? 'text-blue-700 dark:text-blue-300' : 'text-gray-600 dark:text-gray-400'}`}>
                {t.lightMode}
              </p>
            </button>
            
            <button
              onClick={() => theme === 'light' && toggleTheme()}
              className={`p-4 rounded-xl border-2 transition-all ${
                theme === 'dark'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
              }`}
            >
              <Moon size={24} className={`mx-auto mb-2 ${theme === 'dark' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`} />
              <p className={`text-sm ${theme === 'dark' ? 'text-blue-700 dark:text-blue-300' : 'text-gray-600 dark:text-gray-400'}`}>
                {t.darkMode}
              </p>
            </button>
          </div>
        </div>

        {/* Language */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="mb-4 flex items-center gap-2 dark:text-white">
            <Globe size={20} className="text-blue-600 dark:text-blue-400" />
            {t.language}
          </h3>
          
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setLanguage('ar')}
              className={`p-4 rounded-xl border-2 transition-all ${
                language === 'ar'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
              }`}
            >
              <p className={`text-lg mb-1 ${language === 'ar' ? 'text-blue-700 dark:text-blue-300' : 'text-gray-600 dark:text-gray-400'}`}>
                🇸🇦
              </p>
              <p className={`text-sm ${language === 'ar' ? 'text-blue-700 dark:text-blue-300' : 'text-gray-600 dark:text-gray-400'}`}>
                {t.arabic}
              </p>
            </button>
            
            <button
              onClick={() => setLanguage('en')}
              className={`p-4 rounded-xl border-2 transition-all ${
                language === 'en'
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                  : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
              }`}
            >
              <p className={`text-lg mb-1 ${language === 'en' ? 'text-blue-700 dark:text-blue-300' : 'text-gray-600 dark:text-gray-400'}`}>
                🇺🇸
              </p>
              <p className={`text-sm ${language === 'en' ? 'text-blue-700 dark:text-blue-300' : 'text-gray-600 dark:text-gray-400'}`}>
                {t.english}
              </p>
            </button>
          </div>
        </div>

        {/* Critical Notifications */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="mb-4 flex items-center gap-2 dark:text-white">
            <BellRing size={20} className="text-red-600 dark:text-red-400" />
            {t.criticalNotifications}
          </h3>
          
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-1">
                {t.criticalNotificationsDesc}
              </p>
            </div>
            <button
              onClick={toggleCriticalNotifications}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                criticalNotifications ? 'bg-red-600' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  criticalNotifications ? (language === 'ar' ? 'translate-x-1' : 'translate-x-6') : (language === 'ar' ? 'translate-x-6' : 'translate-x-1')
                }`}
              />
            </button>
          </div>

          {criticalNotifications && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-3">
              <p className="text-red-800 dark:text-red-300 text-sm flex items-center gap-2">
                <BellRing size={16} />
                {language === 'ar' 
                  ? 'سيتم إرسال إشعارات حرجة للأدوية المتأخرة أكثر من 30 دقيقة'
                  : 'Critical alerts will be sent for medications delayed more than 30 minutes'
                }
              </p>
            </div>
          )}
        </div>

        {/* Notification Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="mb-4 flex items-center gap-2 dark:text-white">
            <Bell size={20} className="text-blue-600 dark:text-blue-400" />
            {t.notificationSettings}
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell size={20} className="text-gray-600 dark:text-gray-400" />
                <span className="text-sm dark:text-gray-300">{t.enableNotifications}</span>
              </div>
              <button
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600"
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${language === 'ar' ? 'translate-x-1' : 'translate-x-6'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Volume2 size={20} className="text-gray-600 dark:text-gray-400" />
                <span className="text-sm dark:text-gray-300">{t.reminderSound}</span>
              </div>
              <button
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600"
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${language === 'ar' ? 'translate-x-1' : 'translate-x-6'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Vibrate size={20} className="text-gray-600 dark:text-gray-400" />
                <span className="text-sm dark:text-gray-300">{t.vibration}</span>
              </div>
              <button
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600"
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${language === 'ar' ? 'translate-x-1' : 'translate-x-6'}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
