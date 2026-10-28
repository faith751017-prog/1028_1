import React, { useState } from 'react';
import { useQms } from '../context/QmsContext';
import { InspectionRecord, InspectionStation } from '../types/qms';
import {
  ClipboardCheck,
  Plus,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Filter,
} from 'lucide-react';

export const InspectionTab: React.FC = () => {
  const { inspections, addInspectionRecord, setActiveTab } = useQms();

  const [stationFilter, setStationFilter] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Inspection State
  const [station, setStation] = useState<InspectionStation>('Patrol');
  const [partNumber, setPartNumber] = useState('PRT-2026-X88');
  const [workOrder, setWorkOrder] = useState('WO-202610-048');
  const [lotNumber, setLotNumber] = useState('LOT-20261026-X01');
  const [machineId, setMachineId] = useState('180T-02');
  const [sampleSize, setSampleSize] = useState(10);
  const [scuffStatus, setScuffStatus] = useState<'OK' | 'NG'>('OK');
  const [criticalDimensionMm, setCriticalDimensionMm] = useState(2.41);
  const [inspector, setInspector] = useState('黃巡檢員');
  const [actionNote, setActionNote] = useState('依照 STD-SCR-01 標準比對，拉傷目視 OK，尺寸合格。');

  const filteredInspections = inspections.filter((item) => {
    const matchesStation = stationFilter === 'ALL' || item.station === stationFilter;
    const matchesSearch =
      item.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.workOrder.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.lotNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.inspector.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStation && matchesSearch;
  });

  const handleCreateInspection = (e: React.FormEvent) => {
    e.preventDefault();

    const isDimensionOk = criticalDimensionMm >= 2.35 && criticalDimensionMm <= 2.45;
    const overallResult = scuffStatus === 'OK' && isDimensionOk ? 'PASS' : 'FAIL';

    addInspectionRecord({
      date: new Date().toISOString().slice(0, 10),
      time: new Date().toTimeString().slice(0, 5),
      station,
      partNumber,
      workOrder,
      lotNumber,
      machineId,
      sampleSize: Number(sampleSize),
      scuffStatus,
      criticalDimensionMm: Number(criticalDimensionMm),
      dimensionStatus: isDimensionOk ? 'OK' : 'NG',
      inspector,
      result: overallResult,
      actionNote,
    });

    setShowAddModal(false);
    alert(`檢驗紀錄已成功儲存！判定結果：${overallResult}`);
  };

  const getStationLabel = (st: InspectionStation) => {
    switch (st) {
      case 'FirstArticle':
        return '首件檢驗 (開班/換模)';
      case 'Patrol':
        return '製程巡檢 (每2小時)';
      case 'LastPiece':
        return '末件檢驗 (收班停機)';
      case 'OQC':
        return '出貨檢驗 (AQL 抽樣)';
      default:
        return st;
    }
  };

  const passCount = inspections.filter((i) => i.result === 'PASS').length;
  const failCount = inspections.filter((i) => i.result === 'FAIL').length;
  const passRate = inspections.length > 0 ? ((passCount / inspections.length) * 100).toFixed(1) : '100.0';

  return (
    <div className="space-y-5">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-lg border border-slate-200">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <ClipboardCheck className="w-4 h-4 text-slate-800" />
            F04 檢驗紀錄管理 (首件 / 巡檢 / 末件 / 出貨)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            拉傷判定 · 卡扣嵌合尺寸 (2.40±0.05mm) · 檢驗人員簽核 · 嚴格落實製程首巡末閉環
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-60">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="搜尋料號 / 工單 / 檢驗員..."
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900"
            />
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            登錄檢驗紀錄
          </button>
        </div>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-3.5 rounded-lg border border-slate-200 text-xs">
        <div>
          <span className="text-slate-400 text-[11px]">總檢驗批次</span>
          <div className="text-lg font-bold font-mono text-slate-900">{inspections.length} 筆</div>
        </div>
        <div>
          <span className="text-slate-400 text-[11px]">檢驗合格批</span>
          <div className="text-lg font-bold font-mono text-emerald-600">{passCount} 筆</div>
        </div>
        <div>
          <span className="text-slate-400 text-[11px]">檢驗異常批 (FAIL)</span>
          <div className="text-lg font-bold font-mono text-red-600">{failCount} 筆</div>
        </div>
        <div>
          <span className="text-slate-400 text-[11px]">檢驗合格率</span>
          <div className="text-lg font-bold font-mono text-slate-900">{passRate}%</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 text-xs">
        <span className="text-slate-500 font-medium">檢驗站別：</span>
        {[
          { key: 'ALL', label: '全部站別' },
          { key: 'FirstArticle', label: '首件檢驗' },
          { key: 'Patrol', label: '製程巡檢' },
          { key: 'LastPiece', label: '末件檢驗' },
          { key: 'OQC', label: '出貨檢驗 (OQC)' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setStationFilter(tab.key)}
            className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
              stationFilter === tab.key
                ? 'bg-slate-900 text-white font-medium'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* High Density Table */}
      <div className="bg-white rounded-lg border border-slate-200 overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
              <th className="py-2.5 px-3">紀錄編號 / 日期</th>
              <th className="py-2.5 px-3">檢驗站別</th>
              <th className="py-2.5 px-3">產品料號 / 工單批號</th>
              <th className="py-2.5 px-3">射出機台</th>
              <th className="py-2.5 px-3 text-right">抽樣數</th>
              <th className="py-2.5 px-3">拉傷外觀判定</th>
              <th className="py-2.5 px-3 text-right">關鍵尺寸 (2.40±0.05)</th>
              <th className="py-2.5 px-3">綜合結果</th>
              <th className="py-2.5 px-3">檢驗員</th>
              <th className="py-2.5 px-3">處置說明</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredInspections.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-2.5 px-3">
                  <div className="font-mono font-medium text-slate-900">{row.id}</div>
                  <div className="text-[11px] text-slate-400 font-mono">
                    {row.date} {row.time}
                  </div>
                </td>
                <td className="py-2.5 px-3">
                  <span className="font-medium text-slate-700">{getStationLabel(row.station)}</span>
                </td>
                <td className="py-2.5 px-3">
                  <div className="font-mono font-semibold text-slate-800">{row.partNumber}</div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    {row.workOrder} / {row.lotNumber}
                  </div>
                </td>
                <td className="py-2.5 px-3 font-mono text-slate-700">{row.machineId}</td>
                <td className="py-2.5 px-3 text-right font-mono tabular-nums">{row.sampleSize}</td>
                <td className="py-2.5 px-3">
                  <span
                    className={`font-semibold text-xs ${
                      row.scuffStatus === 'OK' ? 'text-emerald-700' : 'text-red-700'
                    }`}
                  >
                    {row.scuffStatus === 'OK' ? 'OK (無拉傷)' : 'NG (拉傷拖花)'}
                  </span>
                </td>
                <td className="py-2.5 px-3 text-right font-mono tabular-nums">
                  <span className={row.dimensionStatus === 'OK' ? 'text-slate-800' : 'text-red-600 font-bold'}>
                    {row.criticalDimensionMm.toFixed(2)} mm
                  </span>
                </td>
                <td className="py-2.5 px-3">
                  <span
                    className={`inline-flex items-center gap-1 font-bold text-xs ${
                      row.result === 'PASS' ? 'text-emerald-700' : 'text-red-700'
                    }`}
                  >
                    {row.result === 'PASS' ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5 text-red-600" />
                    )}
                    {row.result}
                  </span>
                </td>
                <td className="py-2.5 px-3 font-medium text-slate-700">{row.inspector}</td>
                <td className="py-2.5 px-3 text-slate-600 max-w-xs truncate text-[11px]">
                  {row.actionNote}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-5 space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-slate-200">
              <h3 className="text-sm font-bold text-slate-900">登錄檢驗紀錄 (F04)</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateInspection} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">檢驗站別 *</label>
                  <select
                    value={station}
                    onChange={(e) => setStation(e.target.value as InspectionStation)}
                    className="w-full border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none"
                  >
                    <option value="FirstArticle">首件檢驗 (5 pcs)</option>
                    <option value="Patrol">製程巡檢 (10 pcs)</option>
                    <option value="LastPiece">末件檢驗 (5 pcs)</option>
                    <option value="OQC">出貨檢驗 (125 pcs)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">抽檢數量 (pcs) *</label>
                  <input
                    type="number"
                    min={1}
                    value={sampleSize}
                    onChange={(e) => setSampleSize(Number(e.target.value))}
                    className="w-full border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">料號 *</label>
                  <input
                    type="text"
                    value={partNumber}
                    onChange={(e) => setPartNumber(e.target.value)}
                    className="w-full border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">機台 *</label>
                  <input
                    type="text"
                    value={machineId}
                    onChange={(e) => setMachineId(e.target.value)}
                    className="w-full border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">工單編號</label>
                  <input
                    type="text"
                    value={workOrder}
                    onChange={(e) => setWorkOrder(e.target.value)}
                    className="w-full border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">生產批號</label>
                  <input
                    type="text"
                    value={lotNumber}
                    onChange={(e) => setLotNumber(e.target.value)}
                    className="w-full border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-2.5 rounded border border-slate-100">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">拉傷外觀判定 *</label>
                  <select
                    value={scuffStatus}
                    onChange={(e) => setScuffStatus(e.target.value as 'OK' | 'NG')}
                    className="w-full border border-slate-200 rounded px-2.5 py-1.5 bg-white focus:outline-none"
                  >
                    <option value="OK">OK (無拉傷/符合限度)</option>
                    <option value="NG">NG (有拉傷/超出限度)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">
                    卡扣尺寸 (2.40±0.05 mm)
                  </label>
                  <input
                    type="number"
                    step={0.01}
                    value={criticalDimensionMm}
                    onChange={(e) => setCriticalDimensionMm(Number(e.target.value))}
                    className="w-full border border-slate-200 rounded px-2.5 py-1.5 bg-white focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">檢驗員 *</label>
                  <input
                    type="text"
                    value={inspector}
                    onChange={(e) => setInspector(e.target.value)}
                    className="w-full border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">處置備註</label>
                  <input
                    type="text"
                    value={actionNote}
                    onChange={(e) => setActionNote(e.target.value)}
                    className="w-full border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs bg-slate-900 text-white rounded font-semibold hover:bg-slate-800"
                >
                  確認儲存紀錄
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
