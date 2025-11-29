import React, { useState, useEffect } from 'react';
import { Activity, Heart, Droplet, Weight, Plus, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useSettings } from '../contexts/SettingsContext';
import { translations } from '../utils/translations';

interface Measurement {
  id: string;
  type: 'blood-pressure' | 'glucose' | 'weight';
  value: string;
  systolic?: number;
  diastolic?: number;
  date: string;
  time: string;
  notes?: string;
}

export function Measurements() {
  const { language } = useSettings();
  const t = translations[language];
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedType, setSelectedType] = useState<'blood-pressure' | 'glucose' | 'weight'>('blood-pressure');
  const [activeTab, setActiveTab] = useState<'blood-pressure' | 'glucose' | 'weight'>('blood-pressure');

  useEffect(() => {
    const stored = localStorage.getItem('measurements');
    if (stored) {
      setMeasurements(JSON.parse(stored));
    } else {
      // Sample data
      const sampleData: Measurement[] = [
        {
          id: '1',
          type: 'blood-pressure',
          value: '120/80',
          systolic: 120,
          diastolic: 80,
          date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          time: '08:00'
        },
        {
          id: '2',
          type: 'blood-pressure',
          value: '118/78',
          systolic: 118,
          diastolic: 78,
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          time: '08:15'
        },
        {
          id: '3',
          type: 'glucose',
          value: '95',
          date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          time: '07:30'
        },
        {
          id: '4',
          type: 'weight',
          value: '75',
          date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          time: '07:00'
        }
      ];
      setMeasurements(sampleData);
      localStorage.setItem('measurements', JSON.stringify(sampleData));
    }
  }, []);

  const filteredMeasurements = measurements
    .filter(m => m.type === activeTab)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const getChartData = () => {
    const filtered = measurements
      .filter(m => m.type === activeTab)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(-7);

    return filtered.map(m => {
      const date = new Date(m.date);
      const label = `${date.getDate()}/${date.getMonth() + 1}`;
      
      if (m.type === 'blood-pressure') {
        return { date: label, systolic: m.systolic, diastolic: m.diastolic };
      } else {
        return { date: label, value: parseFloat(m.value) };
      }
    });
  };

  const getLatestValue = () => {
    if (filteredMeasurements.length === 0) return null;
    return filteredMeasurements[0];
  };

  const getAverageValue = () => {
    if (filteredMeasurements.length === 0) return null;
    
    if (activeTab === 'blood-pressure') {
      const avgSys = Math.round(
        filteredMeasurements.reduce((sum, m) => sum + (m.systolic || 0), 0) / filteredMeasurements.length
      );
      const avgDia = Math.round(
        filteredMeasurements.reduce((sum, m) => sum + (m.diastolic || 0), 0) / filteredMeasurements.length
      );
      return `${avgSys}/${avgDia}`;
    } else {
      const avg = filteredMeasurements.reduce((sum, m) => sum + parseFloat(m.value), 0) / filteredMeasurements.length;
      return avg.toFixed(1);
    }
  };

  const handleAddMeasurement = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    let newMeasurement: Measurement;
    
    if (selectedType === 'blood-pressure') {
      const systolic = parseInt(formData.get('systolic') as string);
      const diastolic = parseInt(formData.get('diastolic') as string);
      newMeasurement = {
        id: Date.now().toString(),
        type: selectedType,
        value: `${systolic}/${diastolic}`,
        systolic,
        diastolic,
        date: new Date().toISOString(),
        time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
        notes: formData.get('notes') as string
      };
    } else {
      const value = formData.get('value') as string;
      newMeasurement = {
        id: Date.now().toString(),
        type: selectedType,
        value,
        date: new Date().toISOString(),
        time: new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
        notes: formData.get('notes') as string
      };
    }

    const updated = [...measurements, newMeasurement];
    setMeasurements(updated);
    localStorage.setItem('measurements', JSON.stringify(updated));
    setShowAddForm(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return t.today;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return t.yesterday;
    } else {
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }
  };

  const getTypeLabel = (type: string) => {
    switch(type) {
      case 'blood-pressure': return t.bloodPressure;
      case 'glucose': return t.glucose;
      case 'weight': return t.weight;
      default: return type;
    }
  };

  return (
    <div className="max-w-lg mx-auto min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-600 to-purple-800 dark:from-purple-700 dark:to-purple-900 text-white p-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="mb-1">{t.healthMeasurements}</h1>
            <p className="text-purple-100 dark:text-purple-200 text-sm">{t.trackHealthRegularly}</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-colors"
          >
            <Plus size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('blood-pressure')}
            className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
              activeTab === 'blood-pressure'
                ? 'bg-white text-purple-700'
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            <Heart size={18} className={language === 'ar' ? 'inline ml-2' : 'inline mr-2'} />
            {t.bloodPressure}
          </button>
          <button
            onClick={() => setActiveTab('glucose')}
            className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
              activeTab === 'glucose'
                ? 'bg-white text-purple-700'
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            <Droplet size={18} className={language === 'ar' ? 'inline ml-2' : 'inline mr-2'} />
            {t.glucose}
          </button>
          <button
            onClick={() => setActiveTab('weight')}
            className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
              activeTab === 'weight'
                ? 'bg-white text-purple-700'
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            <Weight size={18} className={language === 'ar' ? 'inline ml-2' : 'inline mr-2'} />
            {t.weight}
          </button>
        </div>
      </div>

      {/* Add Form Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-white rounded-t-3xl w-full max-w-lg mx-auto p-6 animate-slide-up">
            <h2 className="mb-4">إضافة قياس جديد</h2>
            
            <form onSubmit={handleAddMeasurement} className="space-y-4">
              <div>
                <label className="block mb-2 text-gray-700">نوع القياس</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value as any)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                >
                  <option value="blood-pressure">ضغط الدم</option>
                  <option value="glucose">السكر</option>
                  <option value="weight">الوزن</option>
                </select>
              </div>

              {selectedType === 'blood-pressure' ? (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-gray-700">الانقباضي</label>
                    <input
                      type="number"
                      name="systolic"
                      required
                      placeholder="120"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-gray-700">الانبساطي</label>
                    <input
                      type="number"
                      name="diastolic"
                      required
                      placeholder="80"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block mb-2 text-gray-700">
                    {selectedType === 'glucose' ? 'مستوى السكر (mg/dL)' : 'الوزن (كجم)'}
                  </label>
                  <input
                    type="number"
                    name="value"
                    required
                    step={selectedType === 'weight' ? '0.1' : '1'}
                    placeholder={selectedType === 'glucose' ? '95' : '75'}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none"
                  />
                </div>
              )}

              <div>
                <label className="block mb-2 text-gray-700">ملاحظات (اختياري)</label>
                <textarea
                  name="notes"
                  rows={3}
                  placeholder="أي ملاحظات إضافية..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none resize-none"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors"
                >
                  حفظ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Stats Summary */}
      <div className="px-4 py-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
            <p className="text-gray-600 text-sm mb-1">آخر قياس</p>
            <p className="text-2xl text-purple-600">{getLatestValue()?.value || '-'}</p>
            <p className="text-gray-500 text-xs mt-1">
              {getLatestValue() ? formatDate(getLatestValue()!.date) : ''}
            </p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
            <p className="text-gray-600 text-sm mb-1">المتوسط</p>
            <p className="text-2xl text-purple-600">{getAverageValue() || '-'}</p>
            <p className="text-gray-500 text-xs mt-1">آخر 7 أيام</p>
          </div>
        </div>

        {/* Chart */}
        {filteredMeasurements.length > 0 && (
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 mb-6">
            <h3 className="mb-4">الرسم البياني</h3>
            <ResponsiveContainer width="100%" height={200}>
              {activeTab === 'blood-pressure' ? (
                <LineChart data={getChartData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="systolic" stroke="#8b5cf6" strokeWidth={2} name="الانقباضي" />
                  <Line type="monotone" dataKey="diastolic" stroke="#a78bfa" strokeWidth={2} name="الانبساطي" />
                </LineChart>
              ) : (
                <LineChart data={getChartData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={2} />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        )}

        {/* History */}
        <div>
          <h3 className="mb-4">السجل</h3>
          <div className="space-y-3">
            {filteredMeasurements.length === 0 ? (
              <div className="text-center py-12">
                <Activity size={40} className="mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">لا توجد قياسات مسجلة</p>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="mt-4 text-purple-600 hover:underline"
                >
                  إضافة قياس جديد
                </button>
              </div>
            ) : (
              filteredMeasurements.map(measurement => (
                <div
                  key={measurement.id}
                  className="bg-white rounded-xl p-4 shadow-sm border border-gray-200"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl text-purple-600 mb-1">{measurement.value}</p>
                      <p className="text-gray-600 text-sm">
                        {formatDate(measurement.date)} - {measurement.time}
                      </p>
                      {measurement.notes && (
                        <p className="text-gray-500 text-sm mt-2">{measurement.notes}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
