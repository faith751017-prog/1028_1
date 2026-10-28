import React, { useState } from 'react';
import { useQms } from '../context/QmsContext';
import { DefectReport, NCRStatus } from '../types/qms';
import {
  AlertTriangle,
  Plus,
  Search,
  Filter,
  Calendar,
  Layers,
  ArrowRight,
  Clock,
  History,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';

interface DefectReportTabProps {
  onOpenNewReport: () => void;
}

export const DefectReportTab: React.FC<DefectReportTabProps> = ({ onOpenNewReport }) => {
  const { defectReports, selectedReport, setSelectedReport, updateReportStatus, setActiveTab } = useQms();

  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState('ALL');
  const [newLogText, setNewLogText] = useState('');
  const [targetStatus, setTargetStatus] = useState<NCRStatus>('Analyzing');

  const filteredReports = defectReports.filter((r) => {
    const matchesSearch =
      r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.workOrder.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.lotNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStage = stageFilter === 'ALL' || r.discoveryStage === stageFilter;
    return matchesSearch && matchesStage;
  });

  const activeReport = selectedReport || filteredReports[0] || null;

  const handleStatusUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeReport) return;
    if (!newLogText.trim()) {
      alert('請輸入處理進度備註說明');
      return;
    }
    updateReportStatus(activeReport.id, targetStatus, newLogText);
    setNewLogText('');
  };

  return (
    <div className="space-y-5">
      {/* Top Toolbar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-lg border border-slate-200">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            F01 品質異常通報與履歷追蹤
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            自動產生唯一異常單號 · 指派責任單位 · 24H臨時對策與7天永久對策 SLA 監控
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="搜尋單號 / 料號 / 客戶 / 工單..."
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900"
            />
          </div>

          <button
            onClick={onOpenNewReport}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            通報新異常
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 text-xs">
        <span className="text-slate-500 font-medium">發現階段篩選：</span>
        {['ALL', '客戶組裝線反饋', '首件檢驗', '製程巡檢', '末件檢驗', '出貨檢驗'].map((stage) => (
          <button
            key={stage}
            onClick={() => setStageFilter(stage)}
            className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
              stageFilter === stage
                ? 'bg-slate-900 text-white font-medium'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {stage === 'ALL' ? '全部來源' : stage}
          </button>
        ))}
      </div>

      {/* Main Master-Detail Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-semibold text-slate-500 px-1 flex items-center justify-between">
            <span>異常案件清單 ({filteredReports.length})</span>
            <span className="text-[11px] text-slate-400">點擊檢視完整履歷</span>
          </div>

          <div className="space-y-2.5 max-h-[calc(100vh-250px)] overflow-y-auto pr-1">
            {filteredReports.length === 0 ? (
              <div className="p-8 text-center bg-white rounded-lg border border-slate-200 text-xs text-slate-400">
                查無符合條件的品質異常單
              </div>
            ) : (
              filteredReports.map((report) => {
                const isSelected = activeReport?.id === report.id;
                return (
                  <div
                    key={report.id}
                    onClick={() => setSelectedReport(report)}
                    className={`p-4 rounded-lg border transition-all cursor-pointer text-xs ${
                      isSelected
                        ? 'bg-white border-slate-900 shadow-sm ring-1 ring-slate-900'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-900">{report.id}</span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {report.discoveryDate.slice(5, 10)}
                        </span>
                      </div>
                      <span
                        className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                          report.status === 'Closed'
                            ? 'bg-emerald-50 text-emerald-700'
                            : report.severity === 'Severe'
                            ? 'bg-red-50 text-red-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {report.status === 'Closed' ? '已結案' : `進行中 · ${report.status}`}
                      </span>
                    </div>

                    <div className="font-semibold text-slate-800 mb-1">
                      {report.partNumber} · {report.partName}
                    </div>

                    <div className="text-slate-500 text-[11px] mb-2">
                      客戶：{report.customerName} · 工單：{report.workOrder}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px]">
                      <div className="text-slate-600">
                        不良數：<span className="font-mono font-semibold text-red-600 tabular-nums">{report.defectQty}</span> / 檢驗 <span className="font-mono tabular-nums">{report.inspectedQty}</span>
                      </div>
                      <div className="text-slate-500 font-mono">
                        不良率 <span className="font-semibold text-red-600">{report.defectRate}%</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Detail Pane (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-lg border border-slate-200 p-5 space-y-5">
          {activeReport ? (
            <>
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold font-mono text-slate-900">
                      {activeReport.id}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      ({activeReport.discoveryStage})
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    建檔時間：{activeReport.discoveryDate} · 通報人：{activeReport.reportedBy}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('traceability')}
                    className="px-2.5 py-1 text-xs border border-slate-200 rounded hover:bg-slate-50 transition-colors flex items-center gap-1 text-slate-700 cursor-pointer"
                  >
                    批次追溯 (F02) <ArrowRight className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => setActiveTab('capa8d')}
                    className="px-2.5 py-1 text-xs bg-slate-900 text-white rounded hover:bg-slate-800 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    進入 8D 對策 (F07) <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Two Column Specs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-2 bg-slate-50 p-3.5 rounded-lg border border-slate-100">
                  <div className="font-semibold text-slate-700 border-b border-slate-200 pb-1 mb-2">
                    基本生產履歷資料
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">客戶名稱：</span>
                    <span className="font-medium text-slate-800">{activeReport.customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">產品料號：</span>
                    <span className="font-mono font-medium text-slate-800">{activeReport.partNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">工單編號：</span>
                    <span className="font-mono font-medium text-slate-800">{activeReport.workOrder}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">生產批號：</span>
                    <span className="font-mono font-medium text-slate-800">{activeReport.lotNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">射出機台：</span>
                    <span className="font-medium text-slate-800">{activeReport.machineId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">模具 / 穴號：</span>
                    <span className="font-mono font-medium text-slate-800">{activeReport.moldId} ({activeReport.cavityNumber})</span>
                  </div>
                </div>

                <div className="space-y-2 bg-slate-50 p-3.5 rounded-lg border border-slate-100">
                  <div className="font-semibold text-slate-700 border-b border-slate-200 pb-1 mb-2">
                    缺陷與指派管制作業
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">拉傷位置：</span>
                    <span className="font-semibold text-red-700">{activeReport.defectLocation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">缺陷嚴重度：</span>
                    <span className="font-medium text-slate-800">{activeReport.severity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">不良 / 檢驗數：</span>
                    <span className="font-mono font-semibold text-slate-800 tabular-nums">
                      {activeReport.defectQty} pcs / {activeReport.inspectedQty} pcs ({activeReport.defectRate}%)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">權責承辦單位：</span>
                    <span className="font-medium text-slate-800">{activeReport.assignedDept}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">責任人：</span>
                    <span className="font-semibold text-slate-900">{activeReport.responsiblePerson}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">SLA 限期：</span>
                    <span className="font-mono text-amber-700">臨時 {activeReport.targetTempDate.slice(5, 16)}</span>
                  </div>
                </div>
              </div>

              {/* Photo & Description */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-slate-700">異常描述與現場照片證據</div>
                <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-md border border-slate-200 leading-relaxed">
                  {activeReport.description}
                </div>

                {activeReport.photoUrl && (
                  <div className="mt-3">
                    <div className="text-[11px] text-slate-500 mb-1.5 flex items-center justify-between">
                      <span>附隨照片紀錄 (已留存品保伺服器)：</span>
                      <button
                        onClick={() => setActiveTab('ai-vision')}
                        className="text-blue-600 hover:underline flex items-center gap-1"
                      >
                        使用 AI 深度辨識此照片 (F11) <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="relative rounded-lg overflow-hidden border border-slate-200 bg-slate-900 max-h-64">
                      <img
                        src={activeReport.photoUrl}
                        alt="拉傷缺陷照片"
                        referrerPolicy="no-referrer"
                        className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* History Timeline */}
              <div className="space-y-3 pt-3 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                    <History className="w-3.5 h-3.5 text-slate-600" />
                    異常處理歷程紀錄 (Audit Trail)
                  </div>
                  <span className="text-[11px] text-slate-400">不可竄改時間戳記</span>
                </div>

                <div className="space-y-2">
                  {activeReport.history.map((h, i) => (
                    <div key={i} className="flex gap-3 text-xs bg-slate-50 p-2.5 rounded border border-slate-100">
                      <div className="text-slate-400 font-mono text-[11px] shrink-0 w-28">
                        {h.timestamp}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-slate-800">
                          {h.action} · <span className="font-normal text-slate-500">{h.operator}</span>
                        </div>
                        <div className="text-slate-600 text-[11px] mt-0.5 leading-relaxed">{h.comment}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Status Log Form */}
                <form onSubmit={handleStatusUpdate} className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-600 font-medium shrink-0">更新案件狀態：</span>
                    <select
                      value={targetStatus}
                      onChange={(e) => setTargetStatus(e.target.value as NCRStatus)}
                      className="text-xs border border-slate-200 rounded px-2 py-1 bg-white focus:outline-none"
                    >
                      <option value="Quarantined">追溯隔離中 (Quarantined)</option>
                      <option value="Analyzing">原因分析 (Analyzing)</option>
                      <option value="CorrectiveAction">對策執行中 (CorrectiveAction)</option>
                      <option value="Verifying">組裝驗證中 (Verifying)</option>
                      <option value="Closed">結案 (Closed)</option>
                    </select>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newLogText}
                      onChange={(e) => setNewLogText(e.target.value)}
                      placeholder="輸入處理進度、改善措施或審核意見..."
                      className="flex-1 text-xs border border-slate-200 rounded px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-slate-900"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-slate-900 text-white rounded text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      送出歷程紀錄
                    </button>
                  </div>
                </form>
              </div>
            </>
          ) : (
            <div className="p-12 text-center text-xs text-slate-400">請由左側選擇異常通報案件</div>
          )}
        </div>
      </div>
    </div>
  );
};
