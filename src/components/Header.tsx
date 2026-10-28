import React, { useState } from 'react';
import { useQms } from '../context/QmsContext';
import { Bell, ShieldAlert, FileSpreadsheet, RotateCcw } from 'lucide-react';

interface HeaderProps {
  onOpenNewReport: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenNewReport }) => {
  const { activeTab, setActiveTab, notifications, markAllNotificationsAsRead, resetToDefaultData, exportDatabaseJson } = useQms();
  const [showNotifMenu, setShowNotifMenu] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-8 px-6 py-3.5 bg-white border-b border-slate-200">
      {/* Zone 1: Brand Wordmark (Single text element) */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white font-bold text-sm">
          QM
        </div>
        <span className="text-base font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0">
          塑膠射出品質異常與改善管理系統
        </span>
      </div>

      {/* Zone 2: 5 Concise Nav Links */}
      <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer ${
            activeTab === 'dashboard' ? 'text-slate-900 font-semibold border-b-2 border-slate-900' : ''
          }`}
        >
          品質看板 (F09)
        </button>
        <button
          onClick={() => setActiveTab('reports')}
          className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer ${
            activeTab === 'reports' ? 'text-slate-900 font-semibold border-b-2 border-slate-900' : ''
          }`}
        >
          異常通報 (F01)
        </button>
        <button
          onClick={() => setActiveTab('traceability')}
          className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer ${
            activeTab === 'traceability' ? 'text-slate-900 font-semibold border-b-2 border-slate-900' : ''
          }`}
        >
          批次追溯 (F02)
        </button>
        <button
          onClick={() => setActiveTab('capa8d')}
          className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer ${
            activeTab === 'capa8d' ? 'text-slate-900 font-semibold border-b-2 border-slate-900' : ''
          }`}
        >
          改善對策 (F07)
        </button>
        <button
          onClick={() => setActiveTab('ai-vision')}
          className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer ${
            activeTab === 'ai-vision' ? 'text-slate-900 font-semibold border-b-2 border-slate-900' : ''
          }`}
        >
          AI 輔助檢驗 (F11/F12)
        </button>
      </nav>

      {/* Zone 3: Notification, Tools & Primary Action */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Reset / Backup data tools */}
        <button
          onClick={exportDatabaseJson}
          title="匯出系統資料備份 JSON"
          className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
        >
          <FileSpreadsheet className="w-4 h-4" />
        </button>

        <button
          onClick={() => {
            if (confirm('確定重置回初始示範資料？包含標準模具與拉傷異常數據。')) {
              resetToDefaultData();
            }
          }}
          title="重置回示範資料"
          className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifMenu(!showNotifMenu)}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors relative"
            aria-label="查看通知"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full" />
            )}
          </button>

          {showNotifMenu && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-lg shadow-lg py-2 z-50">
              <div className="flex items-center justify-between px-3 py-1.5 border-b border-slate-100">
                <span className="text-xs font-semibold text-slate-900">品質警示與待辦通知</span>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsAsRead}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    全部已讀
                  </button>
                )}
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                {notifications.length === 0 ? (
                  <div className="p-4 text-xs text-slate-400 text-center">無待處理通知</div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`p-3 text-xs hover:bg-slate-50 transition-colors ${
                        !n.read ? 'bg-slate-50/70' : ''
                      }`}
                    >
                      <div className="flex items-center gap-1.5 mb-1 font-medium text-slate-800">
                        {n.type === 'QUARANTINE' && (
                          <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        )}
                        <span>{n.title}</span>
                        <span className="ml-auto text-[10px] text-slate-400 tabular-nums">
                          {n.timestamp}
                        </span>
                      </div>
                      <p className="text-slate-600 leading-relaxed">{n.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Primary CTA Button */}
        <button
          onClick={onOpenNewReport}
          className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors whitespace-nowrap shrink-0 shadow-sm"
        >
          + 通報新異常 (F01)
        </button>
      </div>
    </header>
  );
};
