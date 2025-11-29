import React, { useState, useEffect } from 'react';
import { User, Users, Plus, Settings, Bell, Shield, Heart, LogOut, Edit2 } from 'lucide-react';
import { SettingsPage } from './SettingsPage';
import { useSettings } from '../contexts/SettingsContext';
import { translations } from '../utils/translations';

interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  color: string;
  isActive: boolean;
}

export function Profile() {
  const { language } = useSettings();
  const t = translations[language];
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [showAddMember, setShowAddMember] = useState(false);
  const [activeMember, setActiveMember] = useState<string>('');
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('familyMembers');
    if (stored) {
      const members = JSON.parse(stored);
      setFamilyMembers(members);
      const active = members.find((m: FamilyMember) => m.isActive);
      if (active) setActiveMember(active.id);
    } else {
      const defaultMember: FamilyMember = {
        id: '1',
        name: 'أحمد محمد',
        relation: 'أنا',
        color: '#3b82f6',
        isActive: true
      };
      setFamilyMembers([defaultMember]);
      setActiveMember(defaultMember.id);
      localStorage.setItem('familyMembers', JSON.stringify([defaultMember]));
    }
  }, []);

  const handleAddMember = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];
    const newMember: FamilyMember = {
      id: Date.now().toString(),
      name: formData.get('name') as string,
      relation: formData.get('relation') as string,
      color: colors[familyMembers.length % colors.length],
      isActive: false
    };

    const updated = [...familyMembers, newMember];
    setFamilyMembers(updated);
    localStorage.setItem('familyMembers', JSON.stringify(updated));
    setShowAddMember(false);
  };

  const switchMember = (memberId: string) => {
    const updated = familyMembers.map(m => ({
      ...m,
      isActive: m.id === memberId
    }));
    setFamilyMembers(updated);
    setActiveMember(memberId);
    localStorage.setItem('familyMembers', JSON.stringify(updated));
  };

  const activeProfile = familyMembers.find(m => m.id === activeMember);

  if (showSettings) {
    return <SettingsPage onBack={() => setShowSettings(false)} />;
  }

  return (
    <div className="max-w-lg mx-auto min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 dark:from-indigo-700 dark:to-indigo-900 text-white p-6 rounded-b-3xl">
        <h1 className="mb-1">{t.profileTitle}</h1>
        <p className="text-indigo-100 dark:text-indigo-200 text-sm">{t.accountSettings}</p>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Active Profile Card */}
        {activeProfile && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-4 mb-4">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl"
                style={{ backgroundColor: activeProfile.color }}
              >
                {activeProfile.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h2>{activeProfile.name}</h2>
                <p className="text-gray-600">{activeProfile.relation}</p>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Edit2 size={20} className="text-gray-600" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div className="text-center">
                <p className="text-2xl text-indigo-600 mb-1">
                  {JSON.parse(localStorage.getItem('medicines') || '[]').length}
                </p>
                <p className="text-gray-600 text-xs">أدوية</p>
              </div>
              <div className="text-center">
                <p className="text-2xl text-indigo-600 mb-1">
                  {parseInt(localStorage.getItem('streak') || '0')}
                </p>
                <p className="text-gray-600 text-xs">أيام متتالية</p>
              </div>
              <div className="text-center">
                <p className="text-2xl text-indigo-600 mb-1">
                  {JSON.parse(localStorage.getItem('measurements') || '[]').length}
                </p>
                <p className="text-gray-600 text-xs">قياسات</p>
              </div>
            </div>
          </div>
        )}

        {/* Family Members */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="flex items-center gap-2 dark:text-white">
              <Users size={20} className="text-indigo-600 dark:text-indigo-400" />
              {t.familyMembers}
            </h3>
            <button
              onClick={() => setShowAddMember(true)}
              className="text-indigo-600 dark:text-indigo-400 text-sm hover:underline"
            >
              + {t.addMember}
            </button>
          </div>

          <div className="space-y-2">
            {familyMembers.map(member => (
              <button
                key={member.id}
                onClick={() => switchMember(member.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                  member.isActive
                    ? 'bg-indigo-50 dark:bg-indigo-900/30 border-2 border-indigo-500 dark:border-indigo-400'
                    : 'bg-gray-50 dark:bg-gray-700/50 border-2 border-transparent hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white"
                  style={{ backgroundColor: member.color }}
                >
                  {member.name.charAt(0)}
                </div>
                <div className={`flex-1 ${language === 'ar' ? 'text-right' : 'text-left'}`}>
                  <p className="text-sm dark:text-white">{member.name}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{member.relation}</p>
                </div>
                {member.isActive && (
                  <div className="w-3 h-3 bg-indigo-600 dark:bg-indigo-400 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Settings Menu */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="mb-4 dark:text-white">{t.settings}</h3>
          
          <div className="space-y-1">
            <button 
              onClick={() => setShowSettings(true)}
              className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-colors"
            >
              <Settings size={20} className="text-gray-600 dark:text-gray-400" />
              <span className="flex-1 text-right dark:text-gray-300">{t.generalSettings}</span>
            </button>
            
            <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-colors">
              <Bell size={20} className="text-gray-600 dark:text-gray-400" />
              <span className={`flex-1 ${language === 'ar' ? 'text-right' : 'text-left'} dark:text-gray-300`}>{t.notifications}</span>
            </button>

            <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-colors">
              <Shield size={20} className="text-gray-600 dark:text-gray-400" />
              <span className={`flex-1 ${language === 'ar' ? 'text-right' : 'text-left'} dark:text-gray-300`}>{t.privacySecurity}</span>
            </button>

            <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition-colors">
              <Heart size={20} className="text-gray-600 dark:text-gray-400" />
              <span className={`flex-1 ${language === 'ar' ? 'text-right' : 'text-left'} dark:text-gray-300`}>{t.healthGoals}</span>
            </button>
          </div>
        </div>

        {/* About */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="mb-4 dark:text-white">{t.aboutApp}</h3>
          
          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <p>{t.version}: 1.0.0</p>
            <p>{t.appDescription}</p>
            <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-500">
                {t.disclaimer}
              </p>
            </div>
          </div>
        </div>

        {/* Logout */}
        <button className="w-full flex items-center justify-center gap-2 p-4 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors border-2 border-red-200 dark:border-red-800">
          <LogOut size={20} />
          {t.logout}
        </button>
      </div>

      {/* Add Member Modal */}
      {showAddMember && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-white dark:bg-gray-800 rounded-t-3xl w-full max-w-lg mx-auto p-6 animate-slide-up">
            <h2 className="mb-4 dark:text-white">{t.addFamilyMember}</h2>
            
            <form onSubmit={handleAddMember} className="space-y-4">
              <div>
                <label className="block mb-2 text-gray-700 dark:text-gray-300">{t.name}</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder={language === 'ar' ? 'مثال: سارة أحمد' : 'e.g: Sarah Ahmed'}
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-xl focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-700 dark:text-gray-300">{t.relation}</label>
                <select
                  name="relation"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white rounded-xl focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none"
                >
                  <option value="">{t.selectRelation}</option>
                  <option value={t.father}>{t.father}</option>
                  <option value={t.mother}>{t.mother}</option>
                  <option value={t.spouse}>{t.spouse}</option>
                  <option value={t.child}>{t.child}</option>
                  <option value={t.sibling}>{t.sibling}</option>
                  <option value={t.pet}>{t.pet}</option>
                  <option value={t.other}>{t.other}</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddMember(false)}
                  className="flex-1 px-4 py-3 border-2 border-gray-200 dark:border-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  {t.cancel}
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-indigo-600 dark:bg-indigo-700 text-white rounded-xl hover:bg-indigo-700 dark:hover:bg-indigo-800 transition-colors"
                >
                  {t.addMember}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
