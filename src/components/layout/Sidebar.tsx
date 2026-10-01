import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { NavTab } from '../../types';
import { 
  LayoutDashboard, CreditCard, Users, UsersRound, 
  Sparkles, TrendingUp, CalendarClock, Bell, Settings, 
  LogOut, Cpu, Plus,
  Activity, Zap, Shield, Archive,
  Sun, Moon, AtSign
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    currentUser, 
    logout, 
    notifications, 
    setIsAddWizardOpen,
    isDarkMode,
    toggleDarkMode,
    t, 
    dir 
  } = useApp();

  const [collapsed, setCollapsed] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const navItems: { id: NavTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'dashboard', label: t('dashboard'), icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'subscriptions', label: t('subscriptions'), icon: <CreditCard className="w-5 h-5" /> },
    { id: 'accounts', label: 'حسابات الاشتراكات', icon: <AtSign className="w-5 h-5" /> },
    { id: 'users', label: t('users'), icon: <Users className="w-5 h-5" /> },
    { id: 'teams', label: t('teams'), icon: <UsersRound className="w-5 h-5" /> },
    { id: 'ai-tools', label: t('aiTools'), icon: <Sparkles className="w-5 h-5" /> },
    { id: 'archive', label: 'الأرشيف والمحفوظات', icon: <Archive className="w-5 h-5" /> },
    { id: 'usage-tracking', label: 'تتبع الاستهلاك', icon: <Activity className="w-5 h-5" /> },
    { id: 'expenses', label: t('expenses'), icon: <TrendingUp className="w-5 h-5" /> },
    { id: 'renewals', label: t('renewals'), icon: <CalendarClock className="w-5 h-5" /> },
    { id: 'audit-security', label: 'السجل والأمان', icon: <Shield className="w-5 h-5" /> },
    { id: 'automation', label: 'الأتمتة التلقائية', icon: <Zap className="w-5 h-5" /> },
    { id: 'notifications', label: t('notifications'), icon: <Bell className="w-5 h-5" />, badge: unreadCount },
    { id: 'settings', label: t('settings'), icon: <Settings className="w-5 h-5" /> }
  ];

  return (
    <aside
      className={`hidden md:flex flex-col my-4 ms-4 rounded-3xl backdrop-blur-2xl bg-white/60 dark:bg-slate-900/60 border border-white/50 dark:border-slate-800/50 shadow-2xl shadow-indigo-500/10 transition-all duration-300 ease-out relative z-30 shrink-0 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Floating Header / Brand - CPU Icon is the toggle button */}
      <div className={`h-16 flex items-center border-b border-slate-200/40 dark:border-slate-800/40 ${
        collapsed ? 'justify-center px-0' : 'justify-between px-4'
      }`}>
        <div 
          onClick={() => setCollapsed(!collapsed)}
          className={`flex items-center gap-3 overflow-hidden min-w-0 cursor-pointer group ${
            collapsed ? 'justify-center' : 'w-full'
          }`}
          title={collapsed ? 'توسيع القائمة الجانبية' : 'طي القائمة الجانبية'}
        >
          <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/40 shrink-0 group-hover:scale-110 group-hover:shadow-indigo-500/60 transition-all duration-300">
            <Cpu className="w-5 h-5 shrink-0" />
          </div>
          {!collapsed && (
            <div className="flex flex-col min-w-0 truncate">
              <span className="font-extrabold text-slate-900 dark:text-white tracking-tight leading-none text-xs sm:text-sm truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                Saber Group Subscriptions
              </span>
              <span className="text-[9px] text-indigo-600 dark:text-indigo-400 font-bold truncate mt-1">
                منصة إدارة الاشتراكات
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Floating Quick Add Button */}
      {!collapsed && (
        <div className="p-3">
          <button
            onClick={() => setIsAddWizardOpen(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-2xl shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 ease-out"
          >
            <Plus className="w-4 h-4" />
            <span>{t('quickAdd')}</span>
          </button>
        </div>
      )}

      {/* Dock Navigation Items with Backlight Glow and Zoom Animation */}
      <nav className="flex-1 py-2 px-3 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl font-bold text-xs lg:text-xs transition-all duration-300 ease-out relative ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/40 scale-[1.01]'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-white/80 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white hover:shadow-[0_0_20px_rgba(99,102,241,0.25)] hover:scale-[1.02]'
              } ${collapsed ? 'justify-center px-0' : ''}`}
              title={collapsed ? item.label : undefined}
            >
              <div className={isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500 group-hover:text-indigo-500'}>
                {item.icon}
              </div>

              {!collapsed && <span className="truncate">{item.label}</span>}

              {item.badge && item.badge > 0 ? (
                <span
                  className={`ms-auto px-2 py-0.5 text-[10px] font-mono font-extrabold rounded-full bg-rose-500 text-white shadow-xs ${
                    collapsed ? 'absolute top-1 end-1 p-1 min-w-[18px] text-center' : ''
                  }`}
                >
                  {item.badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </nav>

      {/* Floating Theme Switcher */}
      <div className="px-3 py-2 border-t border-slate-200/40 dark:border-slate-800/40">
        <button
          onClick={toggleDarkMode}
          className={`w-full flex items-center gap-2 px-3 py-2 rounded-2xl text-xs font-bold transition-all duration-300 ease-out ${
            collapsed ? 'justify-center px-0' : 'justify-between'
          } ${
            isDarkMode 
              ? 'bg-slate-800/60 text-amber-300 hover:bg-slate-800 hover:shadow-[0_0_15px_rgba(245,158,11,0.3)] hover:scale-[1.02]' 
              : 'bg-indigo-50/80 text-indigo-700 hover:bg-indigo-100 hover:shadow-[0_0_15px_rgba(99,102,241,0.3)] hover:scale-[1.02]'
          }`}
          title={isDarkMode ? 'التحويل للوضع الفاتح (Light Mode)' : 'التحويل للوضع الداكن (Dark Mode)'}
        >
          <div className="flex items-center gap-2">
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-amber-400 shrink-0" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600 shrink-0" />
            )}
            {!collapsed && (
              <span>{isDarkMode ? 'الوضع الداكن' : 'الوضع الفاتح'}</span>
            )}
          </div>
          {!collapsed && (
            <span className="text-[10px] px-1.5 py-0.5 rounded-lg bg-white/20 font-mono">
              {isDarkMode ? 'Dark' : 'Light'}
            </span>
          )}
        </button>
      </div>

      {/* Floating User Profile Footer */}
      <div className="p-3 border-t border-slate-200/40 dark:border-slate-800/40">
        <div className={`flex items-center gap-2.5 ${collapsed ? 'justify-center' : 'justify-between'}`}>
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
              alt={currentUser?.name}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/40 shrink-0"
            />
            {!collapsed && (
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-extrabold text-slate-900 dark:text-white truncate">
                  {currentUser?.name || 'Ahmed Hassan'}
                </span>
                <span className="text-[10px] text-slate-400 truncate">
                  {currentUser?.role || 'Super Admin'}
                </span>
              </div>
            )}
          </div>

          {!collapsed && (
            <button
              onClick={logout}
              className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 p-1.5 rounded-xl hover:bg-rose-50/80 dark:hover:bg-rose-950/40 transition-colors"
              title={t('logout')}
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};
