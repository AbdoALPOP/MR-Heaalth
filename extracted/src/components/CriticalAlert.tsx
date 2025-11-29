import React, { useState, useEffect } from 'react';
import { AlertTriangle, X, Clock } from 'lucide-react';
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

interface CriticalAlertProps {
  medicines: Medicine[];
  onDismiss: () => void;
  onViewMedicines: () => void;
}

export function CriticalAlert({ medicines, onDismiss, onViewMedicines }: CriticalAlertProps) {
  const { language, criticalNotifications } = useSettings();
  const t = translations[language];
  const [overdueMedicines, setOverdueMedicines] = useState<Array<{ medicine: Medicine; time: string; minutesLate: number }>>([]);

  useEffect(() => {
    if (!criticalNotifications) return;

    const checkOverdue = () => {
      const now = new Date();
      const today = now.toDateString();
      const overdue: Array<{ medicine: Medicine; time: string; minutesLate: number }> = [];

      medicines.forEach(med => {
        med.times.forEach(time => {
          const key = `${today}-${time}`;
          if (!med.taken?.[key]) {
            const [hours, minutes] = time.split(':').map(Number);
            const scheduleTime = new Date();
            scheduleTime.setHours(hours, minutes, 0);
            
            const diffMinutes = Math.floor((now.getTime() - scheduleTime.getTime()) / (1000 * 60));
            
            // Show critical alert if more than 30 minutes late
            if (diffMinutes >= 30) {
              overdue.push({ medicine: med, time, minutesLate: diffMinutes });
            }
          }
        });
      });

      setOverdueMedicines(overdue);
    };

    checkOverdue();
    const interval = setInterval(checkOverdue, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [medicines, criticalNotifications]);

  if (!criticalNotifications || overdueMedicines.length === 0) return null;

  const formatLateTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} ${t.minutesLate}`;
    } else {
      const hours = Math.floor(minutes / 60);
      return `${hours} ${t.hoursLate}`;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white dark:bg-gray-800 rounded-3xl max-w-md w-full shadow-2xl animate-bounce-in">
        {/* Header */}
        <div className="bg-gradient-to-br from-red-600 to-red-700 dark:from-red-700 dark:to-red-800 text-white p-6 rounded-t-3xl relative">
          <button
            onClick={onDismiss}
            className="absolute top-4 left-4 p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-white/20 p-3 rounded-full animate-pulse">
              <AlertTriangle size={28} />
            </div>
            <div>
              <h2 className="text-xl">{t.criticalAlert}</h2>
              <p className="text-red-100 text-sm">{overdueMedicines.length} {language === 'ar' ? 'دواء متأخر' : 'overdue medication(s)'}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {t.overdueMessage}
          </p>

          <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
            {overdueMedicines.map(({ medicine, time, minutesLate }, index) => (
              <div
                key={`${medicine.id}-${time}`}
                className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-red-900 dark:text-red-300 mb-1">{medicine.name}</h3>
                    <p className="text-red-700 dark:text-red-400 text-sm mb-2">{medicine.dosage}</p>
                    <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-xs">
                      <Clock size={14} />
                      <span>{language === 'ar' ? 'الوقت المحدد:' : 'Scheduled:'} {time}</span>
                    </div>
                  </div>
                  <div className="bg-red-600 dark:bg-red-700 text-white px-3 py-1 rounded-full text-xs whitespace-nowrap">
                    {formatLateTime(minutesLate)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onDismiss}
              className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              {t.dismiss}
            </button>
            <button
              onClick={onViewMedicines}
              className="flex-1 px-4 py-3 bg-red-600 dark:bg-red-700 text-white rounded-xl hover:bg-red-700 dark:hover:bg-red-800 transition-colors"
            >
              {t.viewMedicines}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
