import React, { useState, useEffect } from 'react';
import { TrendingUp, Calendar, Download, CheckCircle, Flame, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface Medicine {
  id: string;
  name: string;
  dosage: string;
  times: string[];
  type: string;
  taken?: { [key: string]: boolean };
}

export function Statistics() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [measurements, setMeasurements] = useState<any[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'year'>('week');

  useEffect(() => {
    const storedMeds = localStorage.getItem('medicines');
    if (storedMeds) {
      setMedicines(JSON.parse(storedMeds));
    }

    const storedMeasurements = localStorage.getItem('measurements');
    if (storedMeasurements) {
      setMeasurements(JSON.parse(storedMeasurements));
    }
  }, []);

  const getAdherenceData = () => {
    const days = selectedPeriod === 'week' ? 7 : selectedPeriod === 'month' ? 30 : 365;
    const data = [];
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateString = date.toDateString();
      
      let total = 0;
      let taken = 0;

      medicines.forEach(med => {
        total += med.times.length;
        med.times.forEach(time => {
          if (med.taken?.[`${dateString}-${time}`]) {
            taken++;
          }
        });
      });

      data.push({
        date: `${date.getDate()}/${date.getMonth() + 1}`,
        percentage: total > 0 ? Math.round((taken / total) * 100) : 0
      });
    }

    return data;
  };

  const getMedicineTypeDistribution = () => {
    const distribution: { [key: string]: number } = {};
    
    medicines.forEach(med => {
      distribution[med.type] = (distribution[med.type] || 0) + 1;
    });

    return Object.entries(distribution).map(([name, value]) => ({
      name,
      value
    }));
  };

  const getOverallAdherence = () => {
    const data = getAdherenceData();
    if (data.length === 0) return 0;
    const sum = data.reduce((acc, curr) => acc + curr.percentage, 0);
    return Math.round(sum / data.length);
  };

  const getStreak = () => {
    const stored = localStorage.getItem('streak');
    return stored ? parseInt(stored) : 0;
  };

  const getTotalMedicines = () => {
    return medicines.length;
  };

  const getTotalDoses = () => {
    return medicines.reduce((sum, med) => sum + med.times.length, 0);
  };

  const generatePDFReport = () => {
    alert('سيتم إنشاء تقرير PDF قريباً!\n\nسيتضمن التقرير:\n- نسبة الالتزام\n- قائمة الأدوية\n- القياسات الصحية\n- الإحصائيات العامة');
  };

  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#6366f1'];

  return (
    <div className="max-w-lg mx-auto min-h-screen bg-gray-50 pb-4">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-600 to-green-800 text-white p-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="mb-1">الإحصائيات</h1>
            <p className="text-green-100 text-sm">تتبع تقدمك الصحي</p>
          </div>
          <button
            onClick={generatePDFReport}
            className="bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-colors"
          >
            <Download size={24} />
          </button>
        </div>

        {/* Period Selector */}
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedPeriod('week')}
            className={`flex-1 px-4 py-2 rounded-xl transition-all ${
              selectedPeriod === 'week'
                ? 'bg-white text-green-700'
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            أسبوع
          </button>
          <button
            onClick={() => setSelectedPeriod('month')}
            className={`flex-1 px-4 py-2 rounded-xl transition-all ${
              selectedPeriod === 'month'
                ? 'bg-white text-green-700'
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            شهر
          </button>
          <button
            onClick={() => setSelectedPeriod('year')}
            className={`flex-1 px-4 py-2 rounded-xl transition-all ${
              selectedPeriod === 'year'
                ? 'bg-white text-green-700'
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            سنة
          </button>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-4 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle size={24} />
            </div>
            <p className="text-3xl mb-1">{getOverallAdherence()}%</p>
            <p className="text-blue-100 text-sm">نسبة الالتزام</p>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl p-4 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <Flame size={24} />
            </div>
            <p className="text-3xl mb-1">{getStreak()}</p>
            <p className="text-orange-100 text-sm">سلسلة الأيام</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-4 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <Activity size={24} />
            </div>
            <p className="text-3xl mb-1">{getTotalMedicines()}</p>
            <p className="text-purple-100 text-sm">الأدوية النشطة</p>
          </div>

          <div className="bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-2xl p-4 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={24} />
            </div>
            <p className="text-3xl mb-1">{getTotalDoses()}</p>
            <p className="text-pink-100 text-sm">جرعات يومية</p>
          </div>
        </div>

        {/* Adherence Chart */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
          <h3 className="mb-4 flex items-center gap-2">
            <TrendingUp size={20} className="text-green-600" />
            نسبة الالتزام
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={getAdherenceData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="percentage" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Medicine Type Distribution */}
        {medicines.length > 0 && (
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
            <h3 className="mb-4">توزيع أنواع الأدوية</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={getMedicineTypeDistribution()}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {getMedicineTypeDistribution().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Medicine List */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200">
          <h3 className="mb-4">قائمة الأدوية الحالية</h3>
          {medicines.length === 0 ? (
            <p className="text-gray-500 text-center py-4">لا توجد أدوية مضافة</p>
          ) : (
            <div className="space-y-3">
              {medicines.map(med => (
                <div key={med.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <div>
                    <p className="text-sm mb-1">{med.name}</p>
                    <p className="text-gray-600 text-xs">{med.dosage}</p>
                  </div>
                  <div className="text-left">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                      {med.times.length} مرة/يوم
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Export Report */}
        <button
          onClick={generatePDFReport}
          className="w-full bg-green-600 text-white py-4 rounded-xl hover:bg-green-700 transition-colors shadow-lg flex items-center justify-center gap-2"
        >
          <Download size={20} />
          تصدير تقرير PDF
        </button>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
          <p className="text-blue-900 text-sm">
            💡 يمكنك مشاركة التقرير مع طبيبك لمتابعة التقدم الصحي بشكل أفضل
          </p>
        </div>
      </div>
    </div>
  );
}
