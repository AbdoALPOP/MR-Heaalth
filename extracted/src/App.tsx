import React, { useState } from 'react';
import { SettingsProvider, useSettings } from './contexts/SettingsContext';
import { HomePage } from './components/HomePage';
import { AddMedicine } from './components/AddMedicine';
import { Measurements } from './components/Measurements';
import { Statistics } from './components/Statistics';
import { Profile } from './components/Profile';
import { CriticalAlert } from './components/CriticalAlert';
import { Home, Plus, Activity, BarChart3, User } from 'lucide-react';
import { translations } from './utils/translations';

type Page = 'home' | 'add' | 'measurements' | 'statistics' | 'profile';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [showCriticalAlert, setShowCriticalAlert] = useState(false);
  const { language } = useSettings();
  const t = translations[language];

  const medicines = JSON.parse(localStorage.getItem('medicines') || '[]');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onAddMedicine={() => setCurrentPage('add')} onShowCriticalAlert={() => setShowCriticalAlert(true)} />;
      case 'add':
        return <AddMedicine onBack={() => setCurrentPage('home')} />;
      case 'measurements':
        return <Measurements />;
      case 'statistics':
        return <Statistics />;
      case 'profile':
        return <Profile />;
      default:
        return <HomePage onAddMedicine={() => setCurrentPage('add')} onShowCriticalAlert={() => setShowCriticalAlert(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20">
      {renderPage()}
      
      {/* Critical Alert */}
      {showCriticalAlert && (
        <CriticalAlert
          medicines={medicines}
          onDismiss={() => setShowCriticalAlert(false)}
          onViewMedicines={() => {
            setShowCriticalAlert(false);
            setCurrentPage('home');
          }}
        />
      )}
      
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg">
        <div className="max-w-lg mx-auto px-4">
          <div className="flex justify-around items-center h-16">
            <button
              onClick={() => setCurrentPage('home')}
              className={`flex flex-col items-center justify-center flex-1 ${
                currentPage === 'home' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <Home size={24} />
              <span className="text-xs mt-1">{t.home}</span>
            </button>
            
            <button
              onClick={() => setCurrentPage('measurements')}
              className={`flex flex-col items-center justify-center flex-1 ${
                currentPage === 'measurements' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <Activity size={24} />
              <span className="text-xs mt-1">{t.measurements}</span>
            </button>
            
            <button
              onClick={() => setCurrentPage('add')}
              className="flex flex-col items-center justify-center flex-1 -mt-6"
            >
              <div className="bg-blue-600 dark:bg-blue-700 rounded-full p-4 shadow-lg">
                <Plus size={28} className="text-white" />
              </div>
            </button>
            
            <button
              onClick={() => setCurrentPage('statistics')}
              className={`flex flex-col items-center justify-center flex-1 ${
                currentPage === 'statistics' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <BarChart3 size={24} />
              <span className="text-xs mt-1">{t.statistics}</span>
            </button>
            
            <button
              onClick={() => setCurrentPage('profile')}
              className={`flex flex-col items-center justify-center flex-1 ${
                currentPage === 'profile' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <User size={24} />
              <span className="text-xs mt-1">{t.profile}</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <AppContent />
    </SettingsProvider>
  );
}
