import React from 'react';
import { useApp } from '../../context/AppContext';
import { NavTab } from '../../types';
import { 
  LayoutDashboard, CreditCard, Users, Sparkles, 
  TrendingUp, Plus
} from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { activeTab, setActiveTab, setIsAddWizardOpen, t } = useApp();

  const primaryTabs: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: t('dashboard'), icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'subscriptions', label: t('subscriptions'), icon: <CreditCard className="w-5 h-5" /> },
    { id: 'users', label: t('users'), icon: <Users className="w-5 h-5" /> },
    { id: 'ai-tools', label: t('aiTools'), icon: <Sparkles className="w-5 h-5" /> },
    { id: 'expenses', label: t('expenses'), icon: <TrendingUp className="w-5 h-5" /> }
  ];

  return (
    <div className="md:hidden fixed bottom-0 start-0 end-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 px-2 py-1.5 z-40 flex items-center justify-around shadow-lg">
      {primaryTabs.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition-colors ${
              isActive ? 'text-indigo-600 dark:text-indigo-400 font-bold' : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            {item.icon}
            <span className="text-[10px] mt-0.5 truncate max-w-[56px]">{item.label}</span>
          </button>
        );
      })}

      {/* Floating Plus CTA on Mobile */}
      <button
        onClick={() => setIsAddWizardOpen(true)}
        className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-md active:scale-95 transition-transform"
        title={t('quickAdd')}
      >
        <Plus className="w-5 h-5" />
      </button>
    </div>
  );
};
