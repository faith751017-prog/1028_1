import React from 'react';
import { useQms } from '../context/QmsContext';
import {
  LayoutDashboard,
  AlertTriangle,
  GitFork,
  Image as ImageIcon,
  ClipboardCheck,
  Wrench,
  HelpCircle,
  FileCheck,
  Sliders,
  BellRing,
  Camera,
  Cpu,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, defectReports, notifications } = useQms();

  const pendingReportsCount = defectReports.filter((r) => r.status !== 'Closed').length;
  const unreadAlertsCount = notifications.filter((n) => !n.read).length;

  const navSections = [
    {
      title: '階段一：異常管理數位化 (必要)',
      badge: 'P1 必要',
      items: [
        { id: 'reports', label: '品質異常通報', code: 'F01', icon: AlertTriangle, count: pendingReportsCount },
        { id: 'traceability', label: '異常批次追溯', code: 'F02', icon: GitFork },
        { id: 'standards', label: '拉傷缺陷管理', code: 'F03', icon: ImageIcon },
        { id: 'inspections', label: '檢驗紀錄管理', code: 'F04', icon: ClipboardCheck },
        { id: 'assembly', label: '組裝功能驗證', code: 'F05', icon: Wrench },
        { id: 'rootcause', label: '原因分析 (5WHY/魚骨)', code: 'F06', icon: HelpCircle },
        { id: 'capa8d', label: '改善對策追蹤 (8D)', code: 'F07', icon: FileCheck },
      ],
    },
    {
      title: '階段二：製程監控與品質分析',
      badge: 'P2 擴充',
      items: [
        { id: 'parameters', label: '模具與成形參數', code: 'F08', icon: Sliders },
        { id: 'dashboard', label: '品質 KPI 看板', code: 'F09', icon: LayoutDashboard },
        { id: 'notifications', label: '異常通知與待辦', code: 'F10', icon: BellRing, count: unreadAlertsCount },
      ],
    },
    {
      title: '階段三：AI 智慧品質管理',
      badge: 'P3 AI',
      items: [
        { id: 'ai-vision', label: 'AI 影像輔助判定', code: 'F11', icon: Camera },
        { id: 'ai-process', label: 'AI 製程異常預警', code: 'F12', icon: Cpu },
      ],
    },
  ];

  return (
    <aside className="w-64 shrink-0 bg-slate-50 border-r border-slate-200 flex flex-col justify-between h-[calc(100vh-57px)] overflow-y-auto">
      <div className="py-4 px-3 space-y-6">
        {navSections.map((sec, idx) => (
          <div key={idx}>
            <div className="flex items-center justify-between px-2.5 mb-2 text-xs font-semibold text-slate-500">
              <span className="tracking-tight">{sec.title}</span>
              <span className="text-[10px] text-slate-400 font-mono">{sec.badge}</span>
            </div>
            <div className="space-y-0.5">
              {sec.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-slate-900 text-white font-semibold shadow-xs'
                        : 'text-slate-700 hover:bg-slate-200/70 hover:text-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                      <span className={`text-[10px] font-mono ${isActive ? 'text-slate-300' : 'text-slate-400'}`}>
                        {item.code}
                      </span>
                      {typeof item.count === 'number' && item.count > 0 && (
                        <span
                          className={`text-[10px] px-1.5 py-0.2 rounded-full tabular-nums font-mono ${
                            isActive ? 'bg-amber-400 text-slate-950 font-bold' : 'bg-red-100 text-red-700 font-semibold'
                          }`}
                        >
                          {item.count}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Info Box */}
      <div className="p-3.5 border-t border-slate-200 bg-white/60 text-xs text-slate-500">
        <div className="text-[11px] font-semibold text-slate-700 mb-0.5">射出拉傷改善專案核心目標</div>
        <div className="text-[11px] leading-relaxed text-slate-500">
          預防拉傷 · 攔截不良 · 追蹤改善 · 防止再發
        </div>
      </div>
    </aside>
  );
};
