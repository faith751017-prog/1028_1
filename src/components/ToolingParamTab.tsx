import React, { useState } from 'react';
import { useQms } from '../context/QmsContext';
import { InjectionParameter } from '../types/qms';
import {
  Sliders,
  Wrench,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingDown,
  Sparkles,
} from 'lucide-react';

export const ToolingParamTab: React.FC = () => {
  const { parameters, setActiveTab } = useQms();

  const activeParam = parameters.find((p) => p.status === 'ACTIVE') || parameters[0];
  const previousParam = parameters.find((p) => p.status === 'PREVIOUS') || parameters[1];

  const moldMaintenanceHistory = [
    {
      date: '2026-10-26 06:00',
      moldId: 'MD-2024-A08',
      type: '拔模斜度放電修改 & 鏡面超音波拋光',
      toolmaker: '張志豪 (模具主任)',
      details: '動模仁卡扣側壁放電加工 (EDM) 將拔模斜度由 0.8° 修正至 1.8°；使用 1500# 鑽石研磨膏沿出模脫模方向拋光，粗糙度達 Ra 0.05μm。',
      status: 'VERIFIED',
    },
    {
      date: '2026-10-26 08:30',
      moldId: 'MD-2024-A08',
      type: '表面 TiN 氮化鈦防咬模鍍膜',
      toolmaker: '精耐鍍膜工程 (外協)',
      details: '在卡扣高摩擦滑動面實施 2μm TiN 鍍膜處理，摩擦係數由 0.45 降至 0.15，大幅降低塑料脫模摩擦力。',
      status: 'VERIFIED',
    },
    {
      date: '2026-10-24 10:00',
      moldId: 'MD-2024-A08',
      type: '頂針高低差研磨修整',
      toolmaker: '周維修 (模修技師)',
      details: '檢測發現第 3 號頂針微凸 0.04mm，拆下以平面磨床研磨至與型腔分模面平齊。',
      status: 'VERIFIED',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-lg border border-slate-200">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-slate-800" />
            F08 模具修造履歷與成形工藝參數對比管理
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            模具拔模斜度 (0.8°→1.8°) · 超音波拋光方向 · 射出保壓 (110→85MPa) · 消除拔模收縮包緊力
          </p>
        </div>

        <button
          onClick={() => setActiveTab('ai-process')}
          className="px-3.5 py-1.5 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-500 rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5" />
          啟動 AI 製程異常預警 (F12)
        </button>
      </div>

      {/* Mold Image & Maintenance Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-5 bg-white rounded-lg border border-slate-200 overflow-hidden flex flex-col justify-between">
          <div>
            <div className="h-56 bg-slate-900 relative">
              <img
                src="/src/assets/images/mold_core_cavity_1793073212266.jpg"
                alt="模具型腔動模仁鏡面拋光"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-xs text-white text-[11px] font-mono px-2 py-0.5 rounded">
                MD-2024-A08 動模仁鏡面拋光與拔模角 1.8°
              </div>
            </div>

            <div className="p-4 space-y-2 text-xs">
              <div className="font-bold text-slate-900">模具防止拉傷關鍵工藝要求</div>
              <ul className="space-y-1.5 text-slate-600 text-[11px] leading-relaxed">
                <li className="flex items-start gap-1.5">
                  <span className="font-bold text-emerald-600">✓</span>
                  <span><strong>拔模斜度：</strong>卡扣側壁嚴格 ≥ 1.5° (目前改為 1.8°)。</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="font-bold text-emerald-600">✓</span>
                  <span><strong>拋光方向：</strong>禁止橫向旋轉車削紋，必須沿頂出方向鏡面拋光。</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="font-bold text-emerald-600">✓</span>
                  <span><strong>排氣槽深度：</strong>卡扣末端深度 0.02mm，避免氣阻燒焦與脫模負壓。</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs flex items-center justify-between text-slate-500">
            <span>模仁材質：NAK80 鏡面預硬鋼</span>
            <span className="font-mono text-emerald-700 font-semibold">TiN 鍍膜有效</span>
          </div>
        </div>

        {/* Maintenance History */}
        <div className="lg:col-span-7 bg-white rounded-lg border border-slate-200 p-5 space-y-4">
          <div className="flex items-center justify-between border-b pb-2 border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-slate-700" />
              模具檢修維護履歷紀錄 (Tooling Maintenance History)
            </h3>
            <span className="text-xs text-slate-400 font-mono">MD-2024-A08</span>
          </div>

          <div className="space-y-3">
            {moldMaintenanceHistory.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg border border-slate-200 bg-slate-50/60 space-y-1 text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="font-bold text-slate-800">{item.type}</div>
                  <span className="text-[10px] text-slate-400 font-mono">{item.date}</span>
                </div>
                <div className="text-[11px] text-slate-500">技師：{item.toolmaker}</div>
                <div className="text-[11px] text-slate-700 leading-relaxed font-mono pt-1">
                  {item.details}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Injection Molding Parameter Comparison Table (Before vs After) */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3 border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              成型參數前後對比表 (Molding Parameter Comparison: Before vs After)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              高亮標示造成脫模拉傷的關鍵成型變更項（保壓、模溫差、冷卻定型時間、頂出速度）
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1 font-mono text-emerald-700 font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> 改善後最佳參數 (ACTIVE)
            </span>
            <span className="flex items-center gap-1 font-mono text-slate-400">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300" /> 原始拉傷參數 (PREVIOUS)
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                <th className="py-2.5 px-3">成形成型工藝參數項目</th>
                <th className="py-2.5 px-3">原始異常參數 (Before)</th>
                <th className="py-2.5 px-3">改善後定案參數 (After)</th>
                <th className="py-2.5 px-3">調整幅度 / 差異</th>
                <th className="py-2.5 px-3">防拉傷作用機理說明 (Mechanism)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {/* Row 1: 保壓壓力 */}
              <tr className="bg-amber-50/40 hover:bg-amber-50/70">
                <td className="py-2.5 px-3 font-semibold text-slate-900">第二段保壓壓力 (Pack Pressure)</td>
                <td className="py-2.5 px-3 font-mono text-red-600 font-bold tabular-nums">110 MPa</td>
                <td className="py-2.5 px-3 font-mono text-emerald-700 font-bold tabular-nums">85 MPa</td>
                <td className="py-2.5 px-3 font-mono text-emerald-700 font-bold tabular-nums">-22.7%</td>
                <td className="py-2.5 px-3 text-slate-600 leading-relaxed text-[11px]">
                  <strong>【核心關鍵】</strong>大幅降低型腔膠料過度壓實，消除卡扣強行包緊公模仁之劇烈摩擦。
                </td>
              </tr>

              {/* Row 2: 公模模溫 */}
              <tr className="bg-amber-50/40 hover:bg-amber-50/70">
                <td className="py-2.5 px-3 font-semibold text-slate-900">公模溫度 / 母模溫度 (Mold Temp)</td>
                <td className="py-2.5 px-3 font-mono text-slate-700 tabular-nums">公 42°C / 母 60°C (差 18°C)</td>
                <td className="py-2.5 px-3 font-mono text-emerald-700 font-bold tabular-nums">公 55°C / 母 50°C (差 5°C)</td>
                <td className="py-2.5 px-3 font-mono text-emerald-700 font-bold tabular-nums">溫差大幅縮小</td>
                <td className="py-2.5 px-3 text-slate-600 leading-relaxed text-[11px]">
                  平衡公母模收縮差，消除塑件向公模仁單向過度收縮包死現象。
                </td>
              </tr>

              {/* Row 3: 冷卻時間 */}
              <tr className="hover:bg-slate-50">
                <td className="py-2.5 px-3 font-semibold text-slate-900">冷卻定型時間 (Cooling Time)</td>
                <td className="py-2.5 px-3 font-mono text-slate-700 tabular-nums">11.0 s</td>
                <td className="py-2.5 px-3 font-mono text-emerald-700 font-bold tabular-nums">13.5 s</td>
                <td className="py-2.5 px-3 font-mono text-emerald-700 font-bold tabular-nums">+2.5 s</td>
                <td className="py-2.5 px-3 text-slate-600 leading-relaxed text-[11px]">
                  保證卡扣倒鉤結構塑料內部充分結晶固化，具備足夠抗剪切剛性再頂出。
                </td>
              </tr>

              {/* Row 4: 頂出速度 */}
              <tr className="bg-amber-50/40 hover:bg-amber-50/70">
                <td className="py-2.5 px-3 font-semibold text-slate-900">頂出速度 (Ejection Speed)</td>
                <td className="py-2.5 px-3 font-mono text-red-600 font-bold tabular-nums">45 mm/s (單段高速)</td>
                <td className="py-2.5 px-3 font-mono text-emerald-700 font-bold tabular-nums">18 mm/s (兩段慢-快)</td>
                <td className="py-2.5 px-3 font-mono text-emerald-700 font-bold tabular-nums">-60.0%</td>
                <td className="py-2.5 px-3 text-slate-600 leading-relaxed text-[11px]">
                  初動微動脫模時採用平緩慢速，避免瞬間強烈衝擊剪切導致塑件表面拉花撕裂。
                </td>
              </tr>

              {/* Row 5: 拔模斜度 */}
              <tr className="bg-emerald-50/50 hover:bg-emerald-50/80">
                <td className="py-2.5 px-3 font-semibold text-slate-900">模具拔模斜度 (Draft Angle)</td>
                <td className="py-2.5 px-3 font-mono text-red-600 font-bold tabular-nums">0.8° (不足)</td>
                <td className="py-2.5 px-3 font-mono text-emerald-700 font-bold tabular-nums">1.8° (達標)</td>
                <td className="py-2.5 px-3 font-mono text-emerald-700 font-bold tabular-nums">+1.0° (提升 125%)</td>
                <td className="py-2.5 px-3 text-slate-600 leading-relaxed text-[11px]">
                  開模行程初期迅速脫開模仁接觸，根除接觸面持續滑動磨擦造成的深層刮痕。
                </td>
              </tr>

              {/* Row 6: 拋光方向 */}
              <tr className="hover:bg-slate-50">
                <td className="py-2.5 px-3 font-semibold text-slate-900">模面拋光紋路 (Polish Finish)</td>
                <td className="py-2.5 px-3 font-mono text-slate-700">手工打磨 (垂直逆紋咬模)</td>
                <td className="py-2.5 px-3 font-mono text-emerald-700 font-bold">1500# 超音波沿頂出向</td>
                <td className="py-2.5 px-3 font-mono text-emerald-700 font-bold">鏡面 Ra 0.05μm</td>
                <td className="py-2.5 px-3 text-slate-600 leading-relaxed text-[11px]">
                  消除微觀機械咬合咬模現象，脫模阻力降低 70% 以上。
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
