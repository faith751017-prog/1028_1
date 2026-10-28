import React, { useState } from 'react';
import { useQms } from '../context/QmsContext';
import { TraceabilityLot, QuarantineStatus } from '../types/qms';
import {
  GitFork,
  Search,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Building2,
  Package,
  Layers,
  ArrowRight,
  Lock,
  Unlock,
} from 'lucide-react';

export const TraceabilityTab: React.FC = () => {
  const { traceabilityLots, updateLotQuarantine, setActiveTab } = useQms();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLot, setSelectedLot] = useState<TraceabilityLot | null>(traceabilityLots[0] || null);
  const [statusNote, setStatusNote] = useState('');

  const filteredLots = traceabilityLots.filter(
    (lot) =>
      lot.lotNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lot.workOrder.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lot.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lot.machineId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lot.moldId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeLot = selectedLot || filteredLots[0] || null;

  const handleQuarantineChange = (newStatus: QuarantineStatus) => {
    if (!activeLot) return;
    const note = statusNote.trim() || `品保工程師手動更新隔離狀態為 ${newStatus}`;
    updateLotQuarantine(activeLot.lotNumber, newStatus, note);
    setStatusNote('');
    alert(`批號 ${activeLot.lotNumber} 隔離管制狀態已更新為：${newStatus}`);
  };

  return (
    <div className="space-y-5">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-lg border border-slate-200">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <GitFork className="w-4 h-4 text-blue-600" />
            F02 異常批次追溯與庫存隔離管制
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            原料批次 · 機台模具 · 庫存紅標封存 · 出貨客戶召回防護 · 嚴格防止不合格品流入客戶組裝線
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="依批號 / 工單 / 料號 / 機台搜尋..."
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900"
          />
        </div>
      </div>

      {/* Critical Verification Notice Box */}
      <div className="bg-amber-50/80 border border-amber-200 p-3.5 rounded-lg flex items-start gap-2.5 text-xs text-amber-900">
        <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-semibold">功能規格驗收標準強制規範：</span>
          可依批號查詢原料、生產工單及出貨紀錄；<strong>缺少來源驗證數據時必須強制標示「待確認 (Pending Source Data)」，嚴格禁止系統自動將其視為安全放行批次！</strong>
        </div>
      </div>

      {/* Master Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Lots List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-semibold text-slate-500 px-1 flex items-center justify-between">
            <span>生產批次列表 ({filteredLots.length})</span>
            <span className="text-[11px] text-slate-400">點選查看隔離管制</span>
          </div>

          <div className="space-y-2.5 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
            {filteredLots.map((lot) => {
              const isSelected = activeLot?.lotNumber === lot.lotNumber;
              return (
                <div
                  key={lot.lotNumber}
                  onClick={() => setSelectedLot(lot)}
                  className={`p-4 rounded-lg border transition-all cursor-pointer text-xs ${
                    isSelected
                      ? 'bg-white border-slate-900 shadow-sm ring-1 ring-slate-900'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-mono font-bold text-slate-900">{lot.lotNumber}</span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        lot.quarantineStatus === 'QUARANTINED'
                          ? 'bg-red-100 text-red-800'
                          : lot.quarantineStatus === 'RELEASED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {lot.quarantineStatus === 'QUARANTINED' && '紅標隔離中'}
                      {lot.quarantineStatus === 'RELEASED' && '合格放行'}
                      {lot.quarantineStatus === 'PENDING_CONFIRMATION' && '待確認 (禁止出庫)'}
                      {lot.quarantineStatus === 'SCRAPPED' && '已報廢'}
                    </span>
                  </div>

                  <div className="font-semibold text-slate-800 mb-1">
                    {lot.partNumber} · 工單 {lot.workOrder}
                  </div>

                  <div className="text-slate-500 text-[11px] mb-2 flex items-center gap-2">
                    <span>機台：{lot.machineId}</span>
                    <span>·</span>
                    <span>模具：{lot.moldId}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-[11px] tabular-nums">
                    <div>
                      <div className="text-slate-400 text-[10px]">總產量</div>
                      <div className="font-mono font-medium text-slate-800">{lot.totalProducedQty}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-[10px]">隔離數量</div>
                      <div className={`font-mono font-bold ${lot.quarantineQty > 0 ? 'text-red-600' : 'text-slate-600'}`}>
                        {lot.quarantineQty}
                      </div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-[10px]">已出貨客戶</div>
                      <div className="font-mono font-medium text-slate-800">{lot.shippedQty}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Detail Pane (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-lg border border-slate-200 p-5 space-y-5">
          {activeLot ? (
            <>
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold font-mono text-slate-900">
                      {activeLot.lotNumber}
                    </span>
                    <span className="text-xs font-mono px-2 py-0.5 bg-slate-100 rounded text-slate-700">
                      工單: {activeLot.workOrder}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    生產日期：{activeLot.productionDate} · 受影響客戶：{activeLot.customerName}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('reports')}
                    className="px-2.5 py-1 text-xs border border-slate-200 rounded hover:bg-slate-50 text-slate-700 flex items-center gap-1 cursor-pointer"
                  >
                    關聯異常通報 (F01) <ArrowRight className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => setActiveTab('assembly')}
                    className="px-2.5 py-1 text-xs bg-slate-900 text-white rounded hover:bg-slate-800 flex items-center gap-1 cursor-pointer"
                  >
                    組裝功能驗證 (F05) <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Lot Genealogy / Traceability Tree */}
              <div className="space-y-3">
                <div className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5 text-slate-500" />
                  批次溯源完整鏈條 (Traceability Chain)
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-50 p-3 rounded border border-slate-100 space-y-1.5">
                    <div className="text-slate-400 text-[10px] uppercase font-semibold">上游原料膠粒 (Raw Material)</div>
                    <div className="font-semibold text-slate-800">{activeLot.rawMaterial}</div>
                    <div className="text-slate-500 font-mono text-[11px]">批號：{activeLot.materialLot}</div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded border border-slate-100 space-y-1.5">
                    <div className="text-slate-400 text-[10px] uppercase font-semibold">成型機台與模具 (Equipment)</div>
                    <div className="font-semibold text-slate-800">射出機：{activeLot.machineId}</div>
                    <div className="text-slate-500 font-mono text-[11px]">模具編號：{activeLot.moldId}</div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded border border-slate-100 space-y-1.5">
                    <div className="text-slate-400 text-[10px] uppercase font-semibold">庫存隔離現況 (Quarantine Area)</div>
                    <div className="font-semibold text-red-700">{activeLot.quarantineLocation}</div>
                    <div className="text-slate-500 tabular-nums font-mono text-[11px]">
                      隔離量：{activeLot.quarantineQty} pcs / 總量：{activeLot.totalProducedQty} pcs
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded border border-slate-100 space-y-1.5">
                    <div className="text-slate-400 text-[10px] uppercase font-semibold">出貨流向 (Shipping Status)</div>
                    <div className="font-semibold text-slate-800">{activeLot.customerName}</div>
                    <div className="text-slate-500 tabular-nums font-mono text-[11px]">
                      已出貨：{activeLot.shippedQty} pcs {activeLot.shippedQty > 0 ? '(需駐廠全檢/召回)' : '(未流出)'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions Taken & Traceability Log */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-slate-700">隔離與出貨處置處置紀錄</div>
                <div className="bg-slate-50 p-3 rounded border border-slate-200 text-xs text-slate-700 leading-relaxed font-mono">
                  {activeLot.actionsTaken}
                </div>
              </div>

              {/* Quarantine Action Controls */}
              <div className="pt-4 border-t border-slate-200 space-y-3">
                <div className="text-xs font-semibold text-slate-800 flex items-center justify-between">
                  <span>庫存隔離管制操作 (Quarantine Authority)</span>
                  <span className="text-[11px] text-slate-400">僅限品保/生管主管簽核</span>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={statusNote}
                    onChange={(e) => setStatusNote(e.target.value)}
                    placeholder="輸入隔離理由、檢驗批示或特採簽核單號..."
                    className="flex-1 text-xs border border-slate-200 rounded px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    onClick={() => handleQuarantineChange('QUARANTINED')}
                    className="px-3 py-1.5 bg-red-600 text-white rounded text-xs font-semibold hover:bg-red-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    執行紅標庫存隔離 (Quarantine)
                  </button>
                  <button
                    onClick={() => handleQuarantineChange('RELEASED')}
                    className="px-3 py-1.5 bg-emerald-600 text-white rounded text-xs font-semibold hover:bg-emerald-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Unlock className="w-3.5 h-3.5" />
                    組裝驗證合格 · 放行 (Release)
                  </button>
                  <button
                    onClick={() => handleQuarantineChange('PENDING_CONFIRMATION')}
                    className="px-3 py-1.5 bg-amber-500 text-white rounded text-xs font-semibold hover:bg-amber-600 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <AlertTriangle className="w-3.5 h-3.5" />
                    標記為待確認 (Pending Source Data)
                  </button>
                  <button
                    onClick={() => handleQuarantineChange('SCRAPPED')}
                    className="px-3 py-1.5 bg-slate-700 text-white rounded text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    不良拉傷批次報廢 (Scrap)
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="p-12 text-center text-xs text-slate-400">請由左側選擇生產批次</div>
          )}
        </div>
      </div>
    </div>
  );
};
