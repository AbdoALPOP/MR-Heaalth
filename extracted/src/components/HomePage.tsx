import React, { useState, useEffect } from 'react';
import { Bell, CheckCircle, Clock, Flame, Calendar, AlertCircle, Activity } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import { translations } from '../utils/translations';

interface Medicine {
  id: string;
  name: string;
  dosage: string;
  times: string[];
  type: string;
  taken?: { [key: string]: boolean };
}

interface HomePageProps {
  onAddMedicine: () => void;
  onShowCriticalAlert: () => void;
}

export function HomePage({ onAddMedicine, onShowCriticalAlert }: HomePageProps) {
  const { language } = useSettings();
  const t = translations[language];
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [streak, setStreak] = useState(0);
  const [todayProgress, setTodayProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Load medicines from localStorage
    const stored = localStorage.getItem('medicines');
    if (stored) {
      setMedicines(JSON.parse(stored));
    } else {
      // Sample data
      const sampleMedicines: Medicine[] = [
        {
          id: '1',
          name: 'أوميغا 3',
          dosage: 'كبسولة واحدة',
          times: ['08:00', '20:00'],
          type: 'مكمل غذائي',
          taken: {}
        },
        {
          id: '2',
          name: 'فيتامين د',
          dosage: 'قرص واحد',
          times: ['09:00'],
          type: 'فيتامين',
          taken: {}
        },
        {
          id: '3',
          name: 'دواء الضغط',
          dosage: 'حبة واحدة',
          times: ['08:00', '18:00'],
          type: 'دواء',
          taken: {}
        }
      ];
      setMedicines(sampleMedicines);
      localStorage.setItem('medicines', JSON.stringify(sampleMedicines));
    }

    // Load streak
    const storedStreak = localStorage.getItem('streak');
    if (storedStreak) {
      setStreak(parseInt(storedStreak));
    } else {
      setStreak(7);
    }

    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Calculate today's progress
    const today = new Date().toDateString();
    let total = 0;
    let completed = 0;

    medicines.forEach(med => {
      total += med.times.length;
      med.times.forEach(time => {
        if (med.taken?.[`${today}-${time}`]) {
          completed++;
        }
      });
    });

    setTodayProgress(total > 0 ? Math.round((completed / total) * 100) : 0);
  }, [medicines]);

  const markAsTaken = (medId: string, time: string) => {
    const today = new Date().toDateString();
    const key = `${today}-${time}`;
    
    const updated = medicines.map(med => {
      if (med.id === medId) {
        return {
          ...med,
          taken: {
            ...med.taken,
            [key]: true
          }
        };
      }
      return med;
    });

    setMedicines(updated);
    localStorage.setItem('medicines', JSON.stringify(updated));
  };

  const isTaken = (med: Medicine, time: string) => {
    const today = new Date().toDateString();
    const key = `${today}-${time}`;
    return med.taken?.[key] || false;
  };

  const getTimeStatus = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const scheduleTime = new Date();
    scheduleTime.setHours(hours, minutes, 0);
    
    const now = currentTime;
    const diffMinutes = (scheduleTime.getTime() - now.getTime()) / (1000 * 60);

    if (diffMinutes < 0) return 'overdue';
    if (diffMinutes < 60) return 'soon';
    return 'upcoming';
  };

  const formatDate = () => {
    const daysAr = [t.sunday, t.monday, t.tuesday, t.wednesday, t.thursday, t.friday, t.saturday];
    const daysEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthsAr = [t.january, t.february, t.march, t.april, t.may, t.june, t.july, t.august, t.september, t.october, t.november, t.december];
    const monthsEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const days = language === 'ar' ? daysAr : daysEn;
    const months = language === 'ar' ? monthsAr : monthsEn;
    
    const day = days[currentTime.getDay()];
    const date = currentTime.getDate();
    const month = months[currentTime.getMonth()];
    const year = currentTime.getFullYear();

    return language === 'ar' ? `${day}، ${date} ${month} ${year}` : `${day}, ${month} ${date}, ${year}`;
  };

  return (
    <div className="max-w-lg mx-auto pb-4">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-700 dark:to-blue-900 text-white p-6 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="mb-1">{t.welcomeBack}</h1>
            <p className="text-blue-100 dark:text-blue-200 text-sm">{formatDate()}</p>
          </div>
          <button 
            onClick={onShowCriticalAlert}
            className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition-colors"
          >
            <Bell size={24} />
          </button>
        </div>

        {/* Streak Counter */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-orange-500 p-3 rounded-full">
                <Flame size={28} />
              </div>
              <div>
                <p className="text-2xl">{streak} {t.days}</p>
                <p className="text-blue-100 dark:text-blue-200 text-sm">{t.streak}</p>
              </div>
            </div>
            <div className="text-center">
              <div className="relative w-16 h-16">
                <svg className="transform -rotate-90" width="64" height="64">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="6"
                    fill="none"
                  />
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="white"
                    strokeWidth="6"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 28}`}
                    strokeDashoffset={`${2 * Math.PI * 28 * (1 - todayProgress / 100)}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm">{todayProgress}%</span>
                </div>
              </div>
              <p className="text-xs text-blue-100 dark:text-blue-200 mt-1">{t.today}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="flex items-center gap-2 dark:text-white">
            <Calendar size={24} className="text-blue-600 dark:text-blue-400" />
            {t.todaySchedule}
          </h2>
          <button
            onClick={onAddMedicine}
            className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
          >
            + {t.addMedicine}
          </button>
        </div>

        {medicines.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <AlertCircle size={40} className="text-gray-400 dark:text-gray-500" />
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{t.noMedicines}</p>
            <button
              onClick={onAddMedicine}
              className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 rounded-xl hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
            >
              {t.addNewMedicine}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {medicines.map(medicine => (
              medicine.times.map(time => {
                const taken = isTaken(medicine, time);
                const status = getTimeStatus(time);
                
                return (
                  <div
                    key={`${medicine.id}-${time}`}
                    className={`bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border-2 transition-all ${
                      taken
                        ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20'
                        : status === 'overdue'
                        ? 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20'
                        : status === 'soon'
                        ? 'border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-3 py-1 rounded-full text-xs ${
                            status === 'overdue'
                              ? 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300'
                              : status === 'soon'
                              ? 'bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300'
                              : 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300'
                          }`}>
                            <Clock size={12} className="inline ml-1" />
                            {time}
                          </span>
                          {taken && (
                            <span className="px-3 py-1 rounded-full text-xs bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300">
                              <CheckCircle size={12} className="inline ml-1" />
                              {t.taken}
                            </span>
                          )}
                        </div>
                        <h3 className="mb-1 dark:text-white">{medicine.name}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{medicine.dosage}</p>
                        <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">{medicine.type}</p>
                      </div>
                      
                      {!taken && (
                        <button
                          onClick={() => markAsTaken(medicine.id, time)}
                          className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded-xl hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors flex items-center gap-2 text-sm"
                        >
                          <CheckCircle size={18} />
                          {t.confirm}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            ))}
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="px-4 mt-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-blue-600 dark:text-blue-400 mb-2">
              <Activity size={24} />
            </div>
            <p className="text-2xl mb-1 dark:text-white">{medicines.length}</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{t.activeMedicines}</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="text-green-600 dark:text-green-400 mb-2">
              <CheckCircle size={24} />
            </div>
            <p className="text-2xl mb-1 dark:text-white">{todayProgress}%</p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{t.adherenceRate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
