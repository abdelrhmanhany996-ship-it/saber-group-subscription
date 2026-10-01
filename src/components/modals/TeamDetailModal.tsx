import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Users, CreditCard, Sparkles, DollarSign } from 'lucide-react';

export const TeamDetailModal: React.FC = () => {
  const { selectedTeamForDetails, setSelectedTeamForDetails, users, subscriptions, t } = useApp();

  if (!selectedTeamForDetails) return null;

  const team = selectedTeamForDetails;
  const teamMembers = users.filter((u) => u.teamId === team.id || u.teamName === team.name);
  const teamSubs = subscriptions.filter((s) => s.teamId === team.id || s.teamName === team.name);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-base shadow-sm"
              style={{ backgroundColor: team.color }}
            >
              {team.name[0]}
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">{team.name}</h3>
              <p className="text-xs text-slate-500">{team.description}</p>
            </div>
          </div>

          <button
            onClick={() => setSelectedTeamForDetails(null)}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-center">
            <div>
              <span className="text-[10px] text-slate-500 block">الأعضاء</span>
              <span className="text-base font-bold text-slate-900">{teamMembers.length} أعضاء</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block">الأدوات المستعملة</span>
              <span className="text-base font-bold text-slate-900">{teamSubs.length} أدوات</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 block">التكلفة الشهرية</span>
              <span className="text-base font-mono font-bold text-indigo-600">${team.monthlyCost}/mo</span>
            </div>
          </div>

          {/* Members List */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
              {t('teamMembers')} ({teamMembers.length})
            </h4>
            <div className="space-y-2">
              {teamMembers.map((m) => (
                <div key={m.id} className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={m.avatar} alt={m.name} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">{m.name}</span>
                      <span className="text-[11px] text-slate-500">{m.role}</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-slate-100 text-slate-600">
                    {m.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Subscriptions & Cost Breakdown */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
              {t('assignedSubscriptions')} والتكلفة
            </h4>
            <div className="space-y-2">
              {teamSubs.length === 0 ? (
                <p className="text-xs text-slate-400 py-2">لا توجد اشتراكات مباشرة مخصصة لهذا الفريق.</p>
              ) : (
                teamSubs.map((s) => (
                  <div key={s.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">{s.toolName} ({s.planName})</span>
                      <span className="text-[11px] text-slate-500">المالك: {s.ownerName}</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-indigo-600">${s.cost}/mo</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 flex justify-end bg-slate-50">
          <button
            onClick={() => setSelectedTeamForDetails(null)}
            className="px-5 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
