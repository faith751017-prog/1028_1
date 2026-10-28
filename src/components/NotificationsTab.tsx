import React from 'react';
import { useQms } from '../context/QmsContext';
import {
  BellRing,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight,
  CheckCheck,
} from 'lucide-react';

export const NotificationsTab: React.FC = () => {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead, setActiveTab } = useQms();

  const handleAction = (n: any) => {
    markNotificationAsRead(n.id);
    if (n.type === 'QUARANTINE') {
      setActiveTab('traceability');
    } else if (n.type === 'ALERT') {
      setActiveTab('reports');
    } else if (n.type === 'PASS') {
      setActiveTab('capa8d');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-lg border border-slate-200">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <BellRing className="w-4 h-4 text-slate-800" />
            F10 異常即時通知與待辦警示 (Alerts & Action Tasks)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            新增異常通報 · 逾期未改善預警 · 組裝驗證不合格重測提醒 · 批次隔離放行防呆
          </p>
        </div>

        <button
          onClick={markAllNotificationsAsRead}
          className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <CheckCheck className="w-3.5 h-3.5" />
          標記全部為已讀
        </button>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-lg border border-slate-200 divide-y divide-slate-100">
        {notifications.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400">目前沒有未讀警示或待辦項目</div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`p-4 flex items-start justify-between gap-4 transition-colors ${
                !n.read ? 'bg-slate-50/80' : 'hover:bg-slate-50/40'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-white border border-slate-200 shadow-2xs mt-0.5">
                  {n.type === 'QUARANTINE' ? (
                    <ShieldAlert className="w-4 h-4 text-red-600" />
                  ) : n.type === 'ALERT' ? (
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-900">{n.title}</span>
                    {!n.read && (
                      <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                    )}
                    <span className="text-[10px] text-slate-400 font-mono">
                      {n.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                    {n.message}
                  </p>
                  {n.linkedId && (
                    <div className="text-[11px] font-mono text-slate-400">
                      關聯編號：{n.linkedId}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleAction(n)}
                  className="px-3 py-1.5 bg-slate-900 text-white rounded text-xs font-semibold hover:bg-slate-800 flex items-center gap-1 cursor-pointer shadow-2xs"
                >
                  前往處置 <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
