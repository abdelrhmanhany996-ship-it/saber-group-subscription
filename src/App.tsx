import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { TopNav } from './components/layout/TopNav';
import { MobileNav } from './components/layout/MobileNav';
import { ToastContainer } from './components/common/ToastContainer';

// Views
import { LoginPage } from './components/views/LoginPage';
import { DashboardScreen } from './components/views/DashboardScreen';
import { SubscriptionsScreen } from './components/views/SubscriptionsScreen';
import { AccountsScreen } from './components/views/AccountsScreen';
import { UsersScreen } from './components/views/UsersScreen';
import { TeamsScreen } from './components/views/TeamsScreen';
import { AiToolsScreen } from './components/views/AiToolsScreen';
import { ArchiveScreen } from './components/views/ArchiveScreen';
import { ExpensesScreen } from './components/views/ExpensesScreen';
import { RenewalsScreen } from './components/views/RenewalsScreen';
import { NotificationsScreen } from './components/views/NotificationsScreen';
import { SettingsScreen } from './components/views/SettingsScreen';
import { UsageTrackingScreen } from './components/views/UsageTrackingScreen';
import { ApprovalsScreen } from './components/views/ApprovalsScreen';
import { AuditSecurityScreen } from './components/views/AuditSecurityScreen';
import { AutomationScreen } from './components/views/AutomationScreen';
import { AiAssistantScreen } from './components/views/AiAssistantScreen';

// Modals
import { AddSubscriptionModal } from './components/modals/AddSubscriptionModal';
import { SubscriptionDetailModal } from './components/modals/SubscriptionDetailModal';
import { AssignUsersModal } from './components/modals/AssignUsersModal';
import { UserProfileModal } from './components/modals/UserProfileModal';
import { TeamDetailModal } from './components/modals/TeamDetailModal';
import { GlobalSearchModal } from './components/modals/GlobalSearchModal';
import { Bot } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentUser, activeTab, setActiveTab } = useApp();

  if (!currentUser) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col md:flex-row text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-500 selection:text-white transition-colors duration-200 relative">
      {/* Collapsible Sidebar */}
      <Sidebar />

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Navigation Bar */}
        <TopNav />

        {/* View Content Canvas */}
        <main className="flex-1 p-4 lg:p-8 max-w-7xl w-full mx-auto overflow-y-auto">
          {activeTab === 'dashboard' && <DashboardScreen />}
          {activeTab === 'subscriptions' && <SubscriptionsScreen />}
          {activeTab === 'accounts' && <AccountsScreen />}
          {activeTab === 'usage-tracking' && <UsageTrackingScreen />}
          {activeTab === 'audit-security' && <AuditSecurityScreen />}
          {activeTab === 'automation' && <AutomationScreen />}
          {activeTab === 'users' && <UsersScreen />}
          {activeTab === 'teams' && <TeamsScreen />}
          {activeTab === 'ai-tools' && <AiToolsScreen />}
          {activeTab === 'archive' && <ArchiveScreen />}
          {activeTab === 'expenses' && <ExpensesScreen />}
          {activeTab === 'renewals' && <RenewalsScreen />}
          {activeTab === 'notifications' && <NotificationsScreen />}
          {activeTab === 'settings' && <SettingsScreen />}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <MobileNav />

      {/* Interactive Modals */}
      <AddSubscriptionModal />
      <SubscriptionDetailModal />
      <AssignUsersModal />
      <UserProfileModal />
      <TeamDetailModal />
      <GlobalSearchModal />

      {/* Action Feedback Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
