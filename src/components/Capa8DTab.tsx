import React, { useState } from 'react';
import { useQms } from '../context/QmsContext';
import { Capa8D } from '../types/qms';
import { ReportModal8D } from './ReportModal8D';
import {
  FileCheck,
  CheckCircle2,
  Clock,
  Printer,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Edit3,
} from 'lucide-react';

export const Capa8DTab: React.FC = () => {
  const { capaList, selected8D, setSelected8D, update8D, canClose8D, setActiveTab } = useQms();

  const [activeCapa, setActiveCapa] = useState<Capa8D>(selected8D || capaList[0]);
  const [showPrintModal, setShowPrintModal] = useState(false);

  const handleToggleQuarantineVerified = () => {
    const updated = !activeCapa.d3QuarantineVerified;
    update8D(activeCapa.id, { d3QuarantineVerified: updated });
    setActiveCapa({ ...activeCapa, d3QuarantineVerified: updated });
  };

  const handleToggleEffective = () => {
    const updated = !activeCapa.d6IsEffective;
    update8D(activeCapa.id, { d6IsEffective: updated });
    setActiveCapa({ ...activeCapa, d6IsEffective: updated });
  };

  const handleToggleSop = () => {
    const updated = !activeCapa.d7SopUpdated;
    update8D(activeCapa.id, { d7SopUpdated: updated });
    setActiveCapa({ ...activeCapa, d7SopUpdated: updated });
  };

  const handleAttemptClose = () => {
    const check = canClose8D(activeCapa);
    if (!check.canClose) {
      alert(`【無法結案警告】\n${check.reason}`);
      return;
    }

    const signOffDate = new Date().toISOString().slice(0, 10);
    update8D(activeCapa.id, {
      d8Status: 'CLOSED',
      d8SignOffDate: signOffDate,
      completedDate: signOffDate,
    });
    setActiveCapa({
      ...activeCapa,
      d8Status: 'CLOSED',
      d8SignOffDate: signOffDate,
      completedDate: signOffDate,
    });
    alert('【結案成功】本件 8D 改善案經品保、工程主管審核通過，正式結案！防再發規範已發布生效。');
  };

  return (
    <div className="space-y-5">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-lg border border-slate-200">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-emerald-700" />
            F07 改善對策追蹤與 8D 報告管理
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            D1~D8 完整流程治理 · 改善證據驗證 · 強制防呆：未完成組裝驗證嚴禁結案
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPrintModal(true)}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            匯出 / 列印 8D 報告
          </button>
        </div>
      </div>

      {/* Enforcement Warning Box */}
      <div className="bg-slate-900 text-white p-3.5 rounded-lg flex items-start gap-3 text-xs">
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-semibold text-white">8D 結案驗收硬性卡控 (Sign-off Rule Engine)：</div>
          <div className="text-slate-300 leading-relaxed text-[11px]">
            1. D3 圍堵措施必須確認庫存 100% 隔離管制。 2. D6 必須關聯 F05 組裝推拉力驗證 (20±5N) 且經判定 PASS 有效。 3. D7 必須落實 SOP 與 FMEA 修訂。三項條件缺一不可結案！
          </div>
        </div>
      </div>

      {/* 8D Steps Visual Navigator */}
      <div className="bg-white rounded-lg border border-slate-200 p-4 space-y-4">
        <div className="flex items-center justify-between border-b pb-2 border-slate-100">
          <div className="flex items-center gap-3">
            <span className="font-mono font-bold text-slate-900">{activeCapa.id}</span>
            <span className="text-xs font-semibold text-slate-700 truncate max-w-md">
              {activeCapa.title}
            </span>
          </div>
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded ${
              activeCapa.d8Status === 'CLOSED'
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-amber-100 text-amber-800'
            }`}
          >
            狀態：{activeCapa.d8Status === 'CLOSED' ? '已審核結案' : '執行與驗證中'}
          </span>
        </div>

        {/* 8 Disciplines Cards Accordion */}
        <div className="space-y-3 text-xs">
          {/* D1 Team */}
          <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 space-y-2">
            <div className="flex items-center justify-between font-bold text-slate-800">
              <span>D1: 改善小組建立 (Team Formation)</span>
              <span className="font-mono text-slate-400 text-[10px]">Leader: {activeCapa.d1TeamLeader}</span>
            </div>
            <div className="text-slate-600 text-[11px]">
              跨部門團隊：{activeCapa.d1Members.join(' · ')}
            </div>
          </div>

          {/* D2 Problem Description */}
          <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 space-y-1.5">
            <div className="font-bold text-slate-800">D2: 問題陳述 (Problem Description)</div>
            <div className="text-slate-700 text-[11px] leading-relaxed whitespace-pre-line bg-white p-2.5 rounded border border-slate-100">
              {activeCapa.d2ProblemDescription}
            </div>
          </div>

          {/* D3 Containment & Quarantine Checkbox */}
          <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 space-y-2">
            <div className="flex items-center justify-between font-bold text-slate-800">
              <span>D3: 緊急圍堵措施與隔離 (Interim Containment)</span>
              <button
                onClick={handleToggleQuarantineVerified}
                className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors cursor-pointer ${
                  activeCapa.d3QuarantineVerified
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-red-100 text-red-800 border border-red-300'
                }`}
              >
                {activeCapa.d3QuarantineVerified ? '✓ 庫存已隔離確認' : '✗ 庫存待確認'}
              </button>
            </div>
            <div className="text-slate-700 text-[11px] leading-relaxed whitespace-pre-line bg-white p-2.5 rounded border border-slate-100">
              {activeCapa.d3ContainmentActions}
            </div>
          </div>

          {/* D4 Root Cause Analysis */}
          <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 space-y-2">
            <div className="flex items-center justify-between font-bold text-slate-800">
              <span>D4: 根本原因確認 (Occurrence & Escape Root Causes)</span>
              <button
                onClick={() => setActiveTab('rootcause')}
                className="text-blue-600 hover:underline text-[11px] font-medium"
              >
                查看 5WHY/魚骨圖 (F06) →
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
              <div className="bg-red-50/70 p-2.5 rounded border border-red-100">
                <span className="font-semibold text-red-900 block mb-1">發生原因 (Occurrence):</span>
                <span className="text-slate-700 leading-relaxed">{activeCapa.d4OccurRootCause}</span>
              </div>
              <div className="bg-amber-50/70 p-2.5 rounded border border-amber-100">
                <span className="font-semibold text-amber-900 block mb-1">流出原因 (Escape):</span>
                <span className="text-slate-700 leading-relaxed">{activeCapa.d4EscapeRootCause}</span>
              </div>
            </div>
          </div>

          {/* D5 Permanent Actions */}
          <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 space-y-2">
            <div className="flex items-center justify-between font-bold text-slate-800">
              <span>D5: 擬定永久改善對策 (Permanent Corrective Actions - PCA)</span>
              <button
                onClick={() => setActiveTab('parameters')}
                className="text-blue-600 hover:underline text-[11px] font-medium"
              >
                查看射出工藝參數與模具維護 (F08) →
              </button>
            </div>
            <div className="text-slate-700 text-[11px] leading-relaxed whitespace-pre-line bg-white p-2.5 rounded border border-slate-100 font-mono">
              {activeCapa.d5PermanentActions}
            </div>
          </div>

          {/* D6 Execution & Verification */}
          <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 space-y-2">
            <div className="flex items-center justify-between font-bold text-slate-800">
              <span>D6: 對策實施與效果驗證 (Execution & Verification)</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('assembly')}
                  className="text-blue-600 hover:underline text-[11px]"
                >
                  前往組裝功能推拉力測試 (F05) →
                </button>
                <button
                  onClick={handleToggleEffective}
                  className={`px-2 py-0.5 rounded text-[10px] font-semibold cursor-pointer ${
                    activeCapa.d6IsEffective
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-red-100 text-red-800 border border-red-300'
                  }`}
                >
                  {activeCapa.d6IsEffective ? '✓ 驗證有效 (PASS)' : '✗ 尚未驗證 (FAIL)'}
                </button>
              </div>
            </div>
            <div className="text-slate-700 text-[11px] leading-relaxed bg-white p-2.5 rounded border border-slate-100">
              {activeCapa.d6ExecutionEvidence}
            </div>
          </div>

          {/* D7 Preventive Standardization */}
          <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 space-y-2">
            <div className="flex items-center justify-between font-bold text-slate-800">
              <span>D7: 預防再發標準化 (Standardization & FMEA)</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleToggleSop}
                  className={`px-2 py-0.5 rounded text-[10px] font-semibold cursor-pointer ${
                    activeCapa.d7SopUpdated
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {activeCapa.d7SopUpdated ? '✓ SOP 已修訂' : '✗ SOP 待更新'}
                </button>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  ✓ FMEA 已修訂
                </span>
              </div>
            </div>
            <div className="text-slate-700 text-[11px] leading-relaxed whitespace-pre-line bg-white p-2.5 rounded border border-slate-100">
              {activeCapa.d7PreventiveStandardization}
            </div>
          </div>

          {/* D8 Sign-off & Close Action */}
          <div className="p-4 rounded-lg border border-slate-300 bg-white space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900 text-xs">
                  D8: 專案結案審核 (Champion Sign-off & Closure)
                </div>
                <div className="text-[11px] text-slate-500">
                  審核主管：{activeCapa.d8Champion} · 預定完成：{activeCapa.dueDate}
                </div>
              </div>

              {activeCapa.d8Status !== 'CLOSED' ? (
                <button
                  onClick={handleAttemptClose}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded font-bold text-xs transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  核准結案並更新標準
                </button>
              ) : (
                <div className="text-right">
                  <div className="font-bold text-emerald-700 flex items-center gap-1 justify-end">
                    <CheckCircle2 className="w-4 h-4" />
                    已由主管審核結案
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    結案簽核時間：{activeCapa.d8SignOffDate}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Printable Modal */}
      {showPrintModal && (
        <ReportModal8D capa={activeCapa} onClose={() => setShowPrintModal(false)} />
      )}
    </div>
  );
};
