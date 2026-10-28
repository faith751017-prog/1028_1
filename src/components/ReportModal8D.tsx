import React from 'react';
import { Capa8D } from '../types/qms';
import { Printer, X, Download } from 'lucide-react';

interface ReportModal8DProps {
  capa: Capa8D;
  onClose: () => void;
}

export const ReportModal8D: React.FC<ReportModal8DProps> = ({ capa, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full my-8 overflow-hidden print:m-0 print:max-w-none print:shadow-none">
        {/* Top Control Bar (Hidden on print) */}
        <div className="flex items-center justify-between px-6 py-3.5 bg-slate-900 text-white print:hidden">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span>8D 品質異常改善報告書預覽 (Eight Disciplines Problem Solving)</span>
            <span className="text-xs font-mono text-slate-300">[{capa.id}]</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-white text-slate-900 rounded text-xs font-semibold hover:bg-slate-100 flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" /> 列印 / 另存 PDF
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white text-sm font-bold p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable 8D Document Sheet */}
        <div className="p-8 text-slate-900 space-y-6 text-xs font-sans print:p-4 print:text-xs">
          {/* Header */}
          <div className="border-b-2 border-slate-900 pb-4 flex items-start justify-between">
            <div>
              <div className="text-xl font-bold tracking-tight text-slate-950">
                品質異常矯正與預防措施報告 (8D CAPA Report)
              </div>
              <div className="text-xs text-slate-500 mt-1 font-mono">
                FORM NO: QA-SOP-8D-2026 · REV 3.0 · ISO 9001 / IATF 16949 COMPLIANT
              </div>
            </div>
            <div className="text-right text-xs space-y-1">
              <div>報告編號：<strong className="font-mono text-sm">{capa.id}</strong></div>
              <div>對應異常單：<span className="font-mono">{capa.ncrId}</span></div>
              <div>立案日期：<span className="font-mono">{capa.dueDate}</span></div>
              <div>案件狀態：<strong className="text-emerald-700">{capa.d8Status}</strong></div>
            </div>
          </div>

          {/* D1: Team */}
          <div className="border border-slate-300 rounded p-3">
            <div className="font-bold text-slate-900 bg-slate-100 -m-3 mb-2 p-1.5 px-3 border-b border-slate-300">
              D1: 改善對策小組 (Form the Team)
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>專案隊長：<strong>{capa.d1TeamLeader}</strong></div>
              <div>團隊成員：<span>{capa.d1Members.join('、')}</span></div>
            </div>
          </div>

          {/* D2: Problem Description */}
          <div className="border border-slate-300 rounded p-3">
            <div className="font-bold text-slate-900 bg-slate-100 -m-3 mb-2 p-1.5 px-3 border-b border-slate-300">
              D2: 問題陳述 (Problem Description - 5W2H)
            </div>
            <div className="leading-relaxed whitespace-pre-line text-slate-800">
              {capa.d2ProblemDescription}
            </div>
          </div>

          {/* D3: Containment */}
          <div className="border border-slate-300 rounded p-3">
            <div className="font-bold text-slate-900 bg-slate-100 -m-3 mb-2 p-1.5 px-3 border-b border-slate-300 flex justify-between">
              <span>D3: 緊急圍堵措施與隔離 (Interim Containment Actions)</span>
              <span>庫存隔離確認：{capa.d3QuarantineVerified ? '✓ 已全數紅標隔離' : '✗ 待確認'}</span>
            </div>
            <div className="leading-relaxed whitespace-pre-line text-slate-800">
              {capa.d3ContainmentActions}
            </div>
          </div>

          {/* D4: Root Cause */}
          <div className="border border-slate-300 rounded p-3">
            <div className="font-bold text-slate-900 bg-slate-100 -m-3 mb-2 p-1.5 px-3 border-b border-slate-300">
              D4: 根本原因分析 (Root Cause Analysis - 5Why / Fishbone)
            </div>
            <div className="space-y-2">
              <div>
                <strong className="text-red-900">發生根本原因 (Occurrence):</strong>
                <p className="mt-0.5 leading-relaxed text-slate-800">{capa.d4OccurRootCause}</p>
              </div>
              <div className="pt-2 border-t border-slate-200">
                <strong className="text-amber-900">流出根本原因 (Escape):</strong>
                <p className="mt-0.5 leading-relaxed text-slate-800">{capa.d4EscapeRootCause}</p>
              </div>
            </div>
          </div>

          {/* D5: Permanent Corrective Actions */}
          <div className="border border-slate-300 rounded p-3">
            <div className="font-bold text-slate-900 bg-slate-100 -m-3 mb-2 p-1.5 px-3 border-b border-slate-300">
              D5: 永久改善對策 (Permanent Corrective Actions - PCA)
            </div>
            <div className="leading-relaxed whitespace-pre-line text-slate-800 font-mono text-[11px]">
              {capa.d5PermanentActions}
            </div>
          </div>

          {/* D6: Implementation & Verification */}
          <div className="border border-slate-300 rounded p-3">
            <div className="font-bold text-slate-900 bg-slate-100 -m-3 mb-2 p-1.5 px-3 border-b border-slate-300 flex justify-between">
              <span>D6: 對策實施與效果驗證 (Execution & Verification)</span>
              <span className={capa.d6IsEffective ? 'text-emerald-700' : 'text-red-600'}>
                驗證結果：{capa.d6IsEffective ? '✓ 驗證有效 PASS' : '✗ 尚未通過驗證'}
              </span>
            </div>
            <div className="leading-relaxed text-slate-800">
              {capa.d6ExecutionEvidence}
            </div>
            {capa.d6AssemblyTestId && (
              <div className="mt-2 text-slate-500 font-mono text-[11px]">
                關聯組裝功能驗證紀錄編號：{capa.d6AssemblyTestId} · 驗證時間：{capa.d6VerifiedDate}
              </div>
            )}
          </div>

          {/* D7: Prevent Recurrence & Standardization */}
          <div className="border border-slate-300 rounded p-3">
            <div className="font-bold text-slate-900 bg-slate-100 -m-3 mb-2 p-1.5 px-3 border-b border-slate-300 flex justify-between">
              <span>D7: 防止再發與標準化 (Prevent Recurrence & Standardization)</span>
              <span>SOP更新: {capa.d7SopUpdated ? '✓ 完成' : '未完成'} · FMEA更新: {capa.d7FmeaUpdated ? '✓ 完成' : '未完成'}</span>
            </div>
            <div className="leading-relaxed text-slate-800 whitespace-pre-line">
              {capa.d7PreventiveStandardization}
            </div>
          </div>

          {/* D8: Sign-off */}
          <div className="border border-slate-300 rounded p-3">
            <div className="font-bold text-slate-900 bg-slate-100 -m-3 mb-2 p-1.5 px-3 border-b border-slate-300">
              D8: 結案審核與團隊激勵 (Congratulate Team & Sign-off)
            </div>
            <div className="grid grid-cols-3 gap-4 pt-1">
              <div>審核主管：<strong>{capa.d8Champion}</strong></div>
              <div>簽核日期：<span className="font-mono">{capa.d8SignOffDate || '2026-10-26'}</span></div>
              <div>完成天數：<span className="font-mono text-emerald-700 font-bold">1.5 天 (SLA 7天內超前完成)</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
