import React, { useState } from 'react';
import { QmsProvider, useQms } from './context/QmsContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DashboardTab } from './components/DashboardTab';
import { DefectReportTab } from './components/DefectReportTab';
import { TraceabilityTab } from './components/TraceabilityTab';
import { DefectLibraryTab } from './components/DefectLibraryTab';
import { InspectionTab } from './components/InspectionTab';
import { AssemblyTestTab } from './components/AssemblyTestTab';
import { RootCauseTab } from './components/RootCauseTab';
import { Capa8DTab } from './components/Capa8DTab';
import { ToolingParamTab } from './components/ToolingParamTab';
import { NotificationsTab } from './components/NotificationsTab';
import { AiVisionTab } from './components/AiVisionTab';
import { AiProcessAdvisoryTab } from './components/AiProcessAdvisoryTab';
import { NewReportModal } from './components/NewReportModal';

const AppContent: React.FC = () => {
  const { activeTab } = useQms();
  const [showNewReportModal, setShowNewReportModal] = useState(false);

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab />;
      case 'reports':
        return <DefectReportTab onOpenNewReport={() => setShowNewReportModal(true)} />;
      case 'traceability':
        return <TraceabilityTab />;
      case 'standards':
        return <DefectLibraryTab />;
      case 'inspections':
        return <InspectionTab />;
      case 'assembly':
        return <AssemblyTestTab />;
      case 'rootcause':
        return <RootCauseTab />;
      case 'capa8d':
        return <Capa8DTab />;
      case 'parameters':
        return <ToolingParamTab />;
      case 'notifications':
        return <NotificationsTab />;
      case 'ai-vision':
        return <AiVisionTab />;
      case 'ai-process':
        return <AiProcessAdvisoryTab />;
      default:
        return <DashboardTab />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900 selection:bg-slate-900 selection:text-white">
      {/* Top Header */}
      <Header onOpenNewReport={() => setShowNewReportModal(true)} />

      {/* Main Workspace with Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            {renderActiveTab()}
          </div>
        </main>
      </div>

      {/* Quick New Report Modal */}
      {showNewReportModal && (
        <NewReportModal onClose={() => setShowNewReportModal(false)} />
      )}
    </div>
  );
};

export default function App() {
  return (
    <QmsProvider>
      <AppContent />
    </QmsProvider>
  );
}
