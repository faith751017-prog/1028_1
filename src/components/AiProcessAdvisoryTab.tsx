import React, { useState } from 'react';
import { useQms } from '../context/QmsContext';
import {
  Cpu,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Sliders,
  TrendingDown,
  Loader2,
  Layers,
  ArrowRight,
} from 'lucide-react';

export const AiProcessAdvisoryTab: React.FC = () => {
  const { kpiStats, setActiveTab } = useQms();

  // Simulated parameters
  const [packPressureMpa, setPackPressureMpa] = useState<number>(110);
  const [coreTempC, setCoreTempC] = useState<number>(42);
  const [cavityTempC, setCavityTempC] = useState<number>(60);
  const [coolingTimeS, setCoolingTimeS] = useState<number>(11.0);
  const [ejectSpeedMmS, setEjectSpeedMmS] = useState<number>(45);
  const [draftAngleDeg, setDraftAngleDeg] = useState<number>(0.8);

  const [analyzing, setAnalyzing] = useState<boolean>(false);
  const [advisoryResult, setAdvisoryResult] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleRunAdvisory = async () => {
    setAnalyzing(true);
    setErrorMsg(null);
    try {
      const payload = {
        parameters: {
          partNumber: 'PRT-2026-X88',
          moldId: 'MD-2024-A08',
          machineId: '180T-02',
          packPressureMpa,
          coreTempC,
          cavityTempC,
          tempDifference: Math.abs(cavityTempC - coreTempC),
          coolingTimeS,
          ejectSpeedMmS,
          draftAngleDeg,
        },
        currentDefectRate: `${kpiStats.scuffDefectRate}%`,
        historicalContext: '產品組裝位置卡扣外壁拉傷導致客戶自動化裝配卡死 (超載 >45N)',
      };

      const res = await fetch('/api/ai/process-advisory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success && data.advisory) {
        setAdvisoryResult(data.advisory);
      } else {
        throw new Error(data.error || '製程分析伺服器連線失敗');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'AI 預警分析失敗，請重試');
    } finally {
      setAnalyzing(false);
    }
  };

  const handleApplyRecommended = () => {
    setPackPressureMpa(85);
    setCoreTempC(55);
    setCavityTempC(50);
    setCoolingTimeS(13.5);
    setEjectSpeedMmS(18);
    setDraftAngleDeg(1.8);
    alert('已載入推薦最佳化工藝參數！請點擊「分析製程風險」進行預測。');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-lg border border-slate-200">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-amber-600" />
            F12 AI 製程異常預警與成形參數風險診斷
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            模流收縮應力關聯分析 · 動態模擬保壓與模溫差對脫模剪切拉傷之影響 · 智能調機參數建議
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleApplyRecommended}
            className="px-3 py-1.5 text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 rounded font-medium transition-colors cursor-pointer"
          >
            一鍵帶入最佳化標準參數
          </button>
          <button
            onClick={handleRunAdvisory}
            disabled={analyzing}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 disabled:opacity-50 rounded transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
          >
            {analyzing ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                正在進行工藝風險計算...
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                分析製程拉傷風險
              </>
            )}
          </button>
        </div>
      </div>

      {/* Grid: Left Simulator / Right Diagnosis */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Parameter Sliders (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-lg border border-slate-200 p-5 space-y-4">
          <div className="flex items-center justify-between border-b pb-2 border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-slate-600" />
              成型參數即時模擬調整 (Parameter Simulator)
            </h3>
            <span className="text-[11px] text-slate-400 font-mono">180T-02 住友</span>
          </div>

          <div className="space-y-4 text-xs">
            {/* Slider 1: 保壓壓力 */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="font-semibold text-slate-700">第二段保壓壓力 (Pack Pressure)</span>
                <span className={`font-mono font-bold ${packPressureMpa > 95 ? 'text-red-600' : 'text-emerald-700'}`}>
                  {packPressureMpa} MPa
                </span>
              </div>
              <input
                type="range"
                min={75}
                max={125}
                step={1}
                value={packPressureMpa}
                onChange={(e) => setPackPressureMpa(Number(e.target.value))}
                className="w-full accent-slate-900 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>標準 85 MPa</span>
                <span>過高易咬模拉傷 (&gt;100 MPa)</span>
              </div>
            </div>

            {/* Slider 2: 公模溫度 */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="font-semibold text-slate-700">公模溫度 (Core Temp)</span>
                <span className="font-mono font-bold text-slate-800">{coreTempC} °C</span>
              </div>
              <input
                type="range"
                min={30}
                max={75}
                step={1}
                value={coreTempC}
                onChange={(e) => setCoreTempC(Number(e.target.value))}
                className="w-full accent-slate-900 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>過低 (35°C 易收縮包死)</span>
                <span>最佳 55 °C</span>
              </div>
            </div>

            {/* Slider 3: 母模溫度 */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="font-semibold text-slate-700">母模溫度 (Cavity Temp)</span>
                <span className="font-mono font-bold text-slate-800">{cavityTempC} °C</span>
              </div>
              <input
                type="range"
                min={35}
                max={75}
                step={1}
                value={cavityTempC}
                onChange={(e) => setCavityTempC(Number(e.target.value))}
                className="w-full accent-slate-900 cursor-pointer"
              />
              <div className="text-[10px] text-slate-500 font-mono">
                公母模溫差：<strong className={Math.abs(cavityTempC - coreTempC) > 10 ? 'text-red-600' : 'text-emerald-700'}>
                  {Math.abs(cavityTempC - coreTempC)} °C
                </strong> (規範建議 &le; 5°C)
              </div>
            </div>

            {/* Slider 4: 冷卻定型時間 */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="font-semibold text-slate-700">冷卻定型時間 (Cooling Time)</span>
                <span className="font-mono font-bold text-slate-800">{coolingTimeS} s</span>
              </div>
              <input
                type="range"
                min={8}
                max={20}
                step={0.5}
                value={coolingTimeS}
                onChange={(e) => setCoolingTimeS(Number(e.target.value))}
                className="w-full accent-slate-900 cursor-pointer"
              />
            </div>

            {/* Slider 5: 頂出速度 */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="font-semibold text-slate-700">頂出速度 (Ejection Speed)</span>
                <span className={`font-mono font-bold ${ejectSpeedMmS > 30 ? 'text-red-600' : 'text-emerald-700'}`}>
                  {ejectSpeedMmS} mm/s
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={50}
                step={1}
                value={ejectSpeedMmS}
                onChange={(e) => setEjectSpeedMmS(Number(e.target.value))}
                className="w-full accent-slate-900 cursor-pointer"
              />
            </div>

            {/* Slider 6: 模具拔模斜度 */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="font-semibold text-slate-700">卡扣拔模斜度 (Draft Angle)</span>
                <span className={`font-mono font-bold ${draftAngleDeg < 1.2 ? 'text-red-600' : 'text-emerald-700'}`}>
                  {draftAngleDeg}°
                </span>
              </div>
              <input
                type="range"
                min={0.5}
                max={2.5}
                step={0.1}
                value={draftAngleDeg}
                onChange={(e) => setDraftAngleDeg(Number(e.target.value))}
                className="w-full accent-slate-900 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Right Advisory Output (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-lg border border-slate-200 p-5 space-y-4">
          <div className="flex items-center justify-between border-b pb-3 border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              AI 製程預警與工藝優化建言 (AI Process Advisory)
            </h3>
            <span className="text-xs font-mono text-slate-400">Gemini Reasoning</span>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 rounded text-xs text-red-800">
              {errorMsg}
            </div>
          )}

          {analyzing ? (
            <div className="py-20 flex flex-col items-center justify-center text-slate-500 space-y-3">
              <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
              <div className="text-xs font-medium text-slate-700">正在模擬高分子熔體結晶收縮應力與脫模阻力...</div>
            </div>
          ) : advisoryResult ? (
            <div className="space-y-4 text-xs">
              {/* Risk Score Gauge */}
              <div
                className={`p-4 rounded-lg border flex items-center justify-between ${
                  advisoryResult.riskLevel === 'HIGH' || advisoryResult.riskLevel === 'CRITICAL'
                    ? 'bg-red-50 border-red-200 text-red-950'
                    : advisoryResult.riskLevel === 'MEDIUM'
                    ? 'bg-amber-50 border-amber-200 text-amber-950'
                    : 'bg-emerald-50 border-emerald-200 text-emerald-950'
                }`}
              >
                <div>
                  <div className="font-bold text-sm">
                    綜合拉傷脫模風險等級：{advisoryResult.riskLevel}
                  </div>
                  <div className="text-[11px] mt-0.5 opacity-85">
                    {advisoryResult.expectedDefectReduction}
                  </div>
                </div>

                <div className="text-right font-mono tabular-nums">
                  <div className="text-[10px] opacity-75">拉傷風險評分</div>
                  <div className="text-2xl font-bold">
                    {advisoryResult.overallRiskScore} / 100
                  </div>
                </div>
              </div>

              {/* Key Risk Factors */}
              <div className="space-y-1.5">
                <div className="font-bold text-slate-800">主要製程風險因子診斷 (Key Risk Factors)：</div>
                <ul className="space-y-1.5 text-slate-700 text-[11px]">
                  {advisoryResult.keyRiskFactors?.map((f: string, i: number) => (
                    <li key={i} className="bg-slate-50 p-2.5 rounded border border-slate-100 flex items-start gap-1.5 leading-relaxed">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recommended Adjustments Table */}
              <div className="space-y-1.5">
                <div className="font-bold text-slate-800">建議參數微調對策 (Recommended Tuning)：</div>
                <div className="border border-slate-200 rounded overflow-hidden">
                  <table className="w-full text-left text-[11px]">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                      <tr>
                        <th className="p-2">參數項目</th>
                        <th className="p-2">當前數值</th>
                        <th className="p-2">AI 推薦最佳值</th>
                        <th className="p-2">工程機理依據</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {advisoryResult.parameterAdjustments?.map((adj: any, i: number) => (
                        <tr key={i} className="hover:bg-slate-50">
                          <td className="p-2 font-medium text-slate-900">{adj.param}</td>
                          <td className="p-2 font-mono text-red-600">{adj.current}</td>
                          <td className="p-2 font-mono font-bold text-emerald-700">{adj.recommended}</td>
                          <td className="p-2 text-slate-600 leading-snug">{adj.rationale}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Tooling Advice */}
              <div className="p-3 bg-slate-900 text-white rounded text-[11px] space-y-1">
                <div className="font-bold text-amber-300">模具與頂出保養維護方針：</div>
                <div className="text-slate-200 leading-relaxed font-mono">
                  {advisoryResult.moldMaintenanceRecommendation}
                </div>
              </div>

              {/* Action */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setActiveTab('parameters')}
                  className="px-3 py-1.5 bg-slate-900 text-white rounded text-xs font-semibold hover:bg-slate-800 flex items-center gap-1 cursor-pointer"
                >
                  前往成形參數履歷更新 (F08) <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ) : (
            <div className="py-20 text-center text-slate-400 text-xs space-y-2">
              <Cpu className="w-8 h-8 mx-auto text-slate-300" />
              <div>請在左側調整參數後，點擊「分析製程拉傷風險」獲取 AI 預警</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
