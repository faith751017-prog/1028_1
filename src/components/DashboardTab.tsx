import React from 'react';
import { useQms } from '../context/QmsContext';
import {
  TrendingDown,
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertOctagon,
  ArrowRight,
  Eye,
  Sliders,
  Sparkles,
} from 'lucide-react';

export const DashboardTab: React.FC = () => {
  const { kpiStats, defectReports, capaList, setActiveTab } = useQms();

  const pendingReports = defectReports.filter((r) => r.status !== 'Closed');

  const monthlyTrend = [
    { month: '5月 (基準)', defectRate: 4.8, complaints: 8, note: '客戶端卡扣組裝頻發卡滯' },
    { month: '6月', defectRate: 4.2, complaints: 6, note: '啟動專案，建立首件檢驗' },
    { month: '7月', defectRate: 3.1, complaints: 4, note: '公模仁初步研磨' },
    { month: '8月', defectRate: 1.8, complaints: 2, note: '導入 5WHY 魚骨圖分析' },
    { month: '9月', defectRate: 0.9, complaints: 1, note: '拔模角加大至 1.8° 且調降保壓' },
    { month: '10月 (當前)', defectRate: 0.42, complaints: 0, note: '全面數位化 8D 追蹤與 AI 輔助' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner / Core Objective */}
      <div className="bg-slate-900 text-white rounded-xl p-6 relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
            Quality Management System · Injection Molding CAPA
          </div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">
            塑膠射出產品組裝拉傷改善 · 數位品質管理平台
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            系統以「品質異常數位化管理」為核心，貫徹「預防拉傷、攔截不良、追蹤改善、防止再發」之全流程品質防護，整合異常通報、批次追溯隔離、5WHY魚骨原因分析、8D對策驗證與 AI 視覺輔助檢驗。
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-5 text-xs">
            <button
              onClick={() => setActiveTab('reports')}
              className="px-3 py-1.5 bg-white text-slate-900 rounded-md font-semibold hover:bg-slate-100 transition-colors cursor-pointer"
            >
              檢視待處理異常 ({pendingReports.length})
            </button>
            <button
              onClick={() => setActiveTab('capa8d')}
              className="px-3 py-1.5 bg-slate-800 text-white rounded-md font-medium hover:bg-slate-700 transition-colors cursor-pointer"
            >
              8D 改善進度追蹤
            </button>
            <button
              onClick={() => setActiveTab('ai-vision')}
              className="px-3 py-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-md font-medium hover:bg-amber-500/30 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              啟動 AI 影像拉傷判定
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid (Section V: 系統 KPI 與計算方式) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* KPI 1: 拉傷不良率 */}
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <div className="text-xs text-slate-500 font-medium mb-1">拉傷不良率</div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 tabular-nums font-mono">
              {kpiStats.scuffDefectRate}%
            </span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center">
              <TrendingDown className="w-3 h-3 mr-0.5" />
              -{kpiStats.defectReductionPct}%
            </span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400">
            基準 {kpiStats.baselineDefectRate}% · 目標下降 ≥50%
          </div>
        </div>

        {/* KPI 2: 客戶組裝異常件數 */}
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <div className="text-xs text-slate-500 font-medium mb-1">客戶組裝異常件數</div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 tabular-nums font-mono">
              {kpiStats.customerComplaintCount} 件
            </span>
            <span className="text-xs font-semibold text-emerald-600">
              -100% 達成
            </span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400">
            基準月 8 件 · 目標下降 ≥80%
          </div>
        </div>

        {/* KPI 3: 改善準時完成率 */}
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <div className="text-xs text-slate-500 font-medium mb-1">改善準時完成率</div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 tabular-nums font-mono">
              {kpiStats.capaOnTimeRate}%
            </span>
            <span className="text-xs font-medium text-emerald-600 flex items-center">
              <CheckCircle2 className="w-3 h-3 mr-0.5" />
              達標
            </span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400">
            期限內對策完成率 · 目標 ≥95%
          </div>
        </div>

        {/* KPI 4: 檢驗紀錄完整率 */}
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <div className="text-xs text-slate-500 font-medium mb-1">檢驗紀錄完整率</div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 tabular-nums font-mono">
              {kpiStats.inspectionCompletenessRate}%
            </span>
            <span className="text-xs font-medium text-emerald-600">
              優良
            </span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400">
            首/巡/末/出貨紀錄 · 目標 ≥98%
          </div>
        </div>

        {/* KPI 5: 客訴再發件數 */}
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <div className="text-xs text-slate-500 font-medium mb-1">客訴再發件數</div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-emerald-600 tabular-nums font-mono">
              {kpiStats.recurrentComplaints} 件
            </span>
            <span className="text-xs font-medium text-emerald-700">
              零再發
            </span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400">
            同原因防再發目標 · 0 件
          </div>
        </div>

        {/* KPI 6: AI 視覺拉傷檢出率 */}
        <div className="bg-white p-4 rounded-lg border border-slate-200">
          <div className="text-xs text-slate-500 font-medium mb-1">AI 視覺檢出率</div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 tabular-nums font-mono">
              {kpiStats.aiDetectionAccuracy}%
            </span>
            <span className="text-xs font-medium text-blue-600">
              試行合格
            </span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400">
            正確檢出率 · 試行目標 ≥95%
          </div>
        </div>
      </div>

      {/* Workflow Cycle (Section IV: 系統作業流程) */}
      <div className="bg-white rounded-lg border border-slate-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">系統標準作業流程 (SOP Execution Flow)</h2>
            <p className="text-xs text-slate-500 mt-0.5">貫徹嚴謹封閉式品質改善循環，未完成組裝驗證嚴禁結案</p>
          </div>
          <span className="text-xs text-slate-400 font-mono">ISO 9001 / IATF 16949 Compliant</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { step: '01', title: '異常通報 (F01)', desc: '登錄料號機台與照片，立案指派 SLA', tab: 'reports', status: '進行中' },
            { step: '02', title: '批次追溯 (F02)', desc: '關聯原料批次，紅標庫存隔離', tab: 'traceability', status: '嚴格控管' },
            { step: '03', title: '原因分析 (F06)', desc: '5WHY & 魚骨圖發生/流出雙軸診斷', tab: 'rootcause', status: '分析完成' },
            { step: '04', title: '8D對策追蹤 (F07)', desc: '拔模角修正/鏡面拋光/保壓優化', tab: 'capa8d', status: '執行中' },
            { step: '05', title: '組裝驗證 (F05)', desc: '推拉力計實測嵌合力 (20±5N)', tab: 'assembly', status: '合格放行' },
            { step: '06', title: '防再發標準 (F03)', desc: '更新數位限度樣品與工藝 SOP', tab: 'standards', status: '結案標準' },
          ].map((item, index) => (
            <div
              key={index}
              onClick={() => setActiveTab(item.tab)}
              className="p-3 rounded-lg border border-slate-200 bg-slate-50/60 hover:bg-slate-100 transition-colors cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1">
                  <span>STEP {item.step}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="text-xs font-semibold text-slate-800 mb-1 group-hover:text-slate-900">
                  {item.title}
                </div>
                <div className="text-[11px] text-slate-500 leading-relaxed">
                  {item.desc}
                </div>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px]">
                <span className="text-slate-500">當前狀態</span>
                <span className="font-semibold text-slate-700">{item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Section: Trend Chart & Active Cases */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trend Analysis (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  近 6 個月拉傷不良率與組裝客訴驟降趨勢
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  自導入模具鏡面超音波拋光、拔模斜度 1.8° 及保壓調降後，組裝不良徹底清零
                </p>
              </div>
              <span className="text-xs font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                改善成效達標 -91.2%
              </span>
            </div>

            {/* Visual Bar/Line Chart Simulation */}
            <div className="space-y-3 my-4">
              {monthlyTrend.map((m, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-slate-700 w-28">{m.month}</span>
                    <span className="text-slate-500 text-[11px] truncate flex-1 px-3">
                      {m.note}
                    </span>
                    <div className="text-right tabular-nums font-mono shrink-0">
                      <span className="font-semibold text-slate-900">{m.defectRate}%</span>
                      <span className="text-slate-400 mx-1.5">/</span>
                      <span className={`text-[11px] ${m.complaints > 0 ? 'text-red-600 font-semibold' : 'text-emerald-600'}`}>
                        {m.complaints} 件客訴
                      </span>
                    </div>
                  </div>
                  {/* Progress track */}
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden flex">
                    <div
                      className={`h-full transition-all duration-500 ${
                        idx === monthlyTrend.length - 1
                          ? 'bg-emerald-500'
                          : idx >= 3
                          ? 'bg-blue-500'
                          : 'bg-red-400'
                      }`}
                      style={{ width: `${(m.defectRate / 5) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>統計範圍：射出成形一廠、二廠全產線累計檢驗</span>
            <button
              onClick={() => setActiveTab('parameters')}
              className="text-blue-600 hover:underline flex items-center gap-1 font-medium"
            >
              檢視成形參數前後對比 (F08) <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Priority Action Card (1 col) */}
        <div className="bg-white rounded-lg border border-slate-200 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-slate-900">待跟進重大異常 (F01)</h3>
              <span className="text-xs text-red-600 font-medium">SLA 監控中</span>
            </div>

            <div className="space-y-3">
              {pendingReports.map((report) => (
                <div
                  key={report.id}
                  onClick={() => setActiveTab('reports')}
                  className="p-3 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors cursor-pointer bg-slate-50/50"
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-mono font-semibold text-slate-800">{report.id}</span>
                    <span className="text-red-700 font-medium text-[11px]">
                      {report.severity === 'Severe' ? '嚴重拉傷' : '一般異常'}
                    </span>
                  </div>
                  <div className="text-xs text-slate-700 font-medium mb-1">
                    {report.partNumber} · {report.customerName}
                  </div>
                  <div className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                    {report.description}
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-slate-200/80 flex items-center justify-between text-[10px] text-slate-500">
                    <span>責任人：{report.responsiblePerson.split(' ')[0]}</span>
                    <span className="font-mono text-amber-700">24H 期限倒數</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => setActiveTab('traceability')}
              className="text-xs text-slate-700 hover:text-slate-900 font-medium flex items-center gap-1"
            >
              檢查隔離庫存 (F02) <ArrowRight className="w-3 h-3" />
            </button>
            <button
              onClick={() => setActiveTab('standards')}
              className="text-xs text-blue-600 hover:underline font-medium"
            >
              比對限度樣品 (F03)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
