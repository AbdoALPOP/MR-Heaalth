import React, { useState } from 'react';
import { ArrowRight, Pill, Clock, Calendar, Plus, X } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import { translations } from '../utils/translations';

interface AddMedicineProps {
  onBack: () => void;
}

export function AddMedicine({ onBack }: AddMedicineProps) {
  const { language } = useSettings();
  const t = translations[language];
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [type, setType] = useState(t.medicine);
  const [times, setTimes] = useState<string[]>(['08:00']);
  const [frequency, setFrequency] = useState(t.daily);

  const medicineTypes = [t.medicine, t.vitamin, t.supplement, t.birthControl, t.insulin, t.other];
  const frequencyOptions = [t.daily, t.everyTwoDays, t.weekly, t.asNeeded];

  const addTime = () => {
    setTimes([...times, '12:00']);
  };

  const removeTime = (index: number) => {
    if (times.length > 1) {
      setTimes(times.filter((_, i) => i !== index));
    }
  };

  const updateTime = (index: number, value: string) => {
    const newTimes = [...times];
    newTimes[index] = value;
    setTimes(newTimes);
  };

  const handleSave = () => {
    if (!name || !dosage) {
      alert(language === 'ar' ? 'الرجاء إدخال اسم الدواء والجرعة' : 'Please enter medicine name and dosage');
      return;
    }

    const stored = localStorage.getItem('medicines');
    const medicines = stored ? JSON.parse(stored) : [];
    
    const newMedicine = {
      id: Date.now().toString(),
      name,
      dosage,
      type,
      times,
      frequency,
      taken: {}
    };

    medicines.push(newMedicine);
    localStorage.setItem('medicines', JSON.stringify(medicines));
    
    onBack();
  };

  return (
    <div className="max-w-lg mx-auto min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-800 dark:from-blue-700 dark:to-blue-900 text-white p-6 sticky top-0 z-10">
        <button
          onClick={onBack}
          className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity"
        >
          <ArrowRight size={24} />
          <span>{t.back}</span>
        </button>
        <h1>{t.addNewMed}</h1>
        <p className="text-blue-100 dark:text-blue-200 text-sm mt-1">{t.enterMedInfo}</p>
      </div>

      <div className="p-6 space-y-6">
        {/* Medicine Name */}
        <div>
          <label className="block mb-2 text-gray-700 dark:text-gray-300">
            <Pill size={18} className="inline ml-2" />
            {t.medicineName}
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={language === 'ar' ? 'مثال: فيتامين د، أوميغا 3' : 'e.g: Vitamin D, Omega 3'}
            className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors"
          />
        </div>

        {/* Medicine Type */}
        <div>
          <label className="block mb-2 text-gray-700 dark:text-gray-300">{t.medicineType}</label>
          <div className="grid grid-cols-2 gap-2">
            {medicineTypes.map(medType => (
              <button
                key={medType}
                onClick={() => setType(medType)}
                className={`px-4 py-3 rounded-xl border-2 transition-all ${
                  type === medType
                    ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 dark:text-gray-300'
                }`}
              >
                {medType}
              </button>
            ))}
          </div>
        </div>

        {/* Dosage */}
        <div>
          <label className="block mb-2 text-gray-700 dark:text-gray-300">{t.dosage}</label>
          <input
            type="text"
            value={dosage}
            onChange={(e) => setDosage(e.target.value)}
            placeholder={language === 'ar' ? 'مثال: كبسولة واحدة، 5 مل' : 'e.g: One capsule, 5 ml'}
            className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors"
          />
        </div>

        {/* Frequency */}
        <div>
          <label className="block mb-2 text-gray-700 dark:text-gray-300">
            <Calendar size={18} className={language === 'ar' ? 'inline ml-2' : 'inline mr-2'} />
            {t.frequency}
          </label>
          <div className="grid grid-cols-2 gap-2">
            {frequencyOptions.map(freq => (
              <button
                key={freq}
                onClick={() => setFrequency(freq)}
                className={`px-4 py-3 rounded-xl border-2 transition-all ${
                  frequency === freq
                    ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 dark:text-gray-300'
                }`}
              >
                {freq}
              </button>
            ))}
          </div>
        </div>

        {/* Times */}
        <div>
          <label className="block mb-2 text-gray-700 dark:text-gray-300">
            <Clock size={18} className={language === 'ar' ? 'inline ml-2' : 'inline mr-2'} />
            {t.medicationTimes}
          </label>
          <div className="space-y-3">
            {times.map((time, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="time"
                  value={time}
                  onChange={(e) => updateTime(index, e.target.value)}
                  className="flex-1 px-4 py-3 border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-xl focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors"
                />
                {times.length > 1 && (
                  <button
                    onClick={() => removeTime(index)}
                    className="px-4 py-3 border-2 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={addTime}
            className="w-full mt-3 px-4 py-3 border-2 border-dashed border-blue-300 dark:border-blue-700 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            {t.addAnotherTime}
          </button>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full bg-blue-600 dark:bg-blue-700 text-white py-4 rounded-xl hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors shadow-lg"
        >
          {t.saveMedicine}
        </button>
      </div>
    </div>
  );
}
