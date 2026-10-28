import React, { useState } from 'react';
import { useQms } from '../context/QmsContext';
import {
  Camera,
  Sparkles,
  Upload,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ShieldAlert,
  ArrowRight,
  Layers,
  Loader2,
} from 'lucide-react';

export const AiVisionTab: React.FC = () => {
  const { setActiveTab } = useQms();

  const sampleImages = [
    {
      id: 'sample-1',
      title: '典型卡扣滑道嚴重縱向拉傷 (NG 拒收樣品)',
      url: '/src/assets/images/scuff_defect_part_1793073211872.jpg',
      partNumber: 'PRT-2026-X88',
      context: '客戶反饋自動化組裝時卡死，側壁發現深溝拖花與脫屑',
    },
    {
      id: 'sample-2',
      title: '良品黃金限度樣品 (Golden Sample OK)',
      url: '/src/assets/images/golden_limit_sample_1793073214092.jpg',
      partNumber: 'PRT-2026-X88',
      context: '模具超音波鏡面拋光且拔模斜度 1.8° 後之試模合格件',
    },
    {
      id: 'sample-3',
      title: '模仁入子與頂針表面 (模修檢驗)',
      url: '/src/assets/images/mold_core_cavity_1793073212266.jpg',
      partNumber: 'MD-2024-A08',
      context: '檢測模仁側壁拋光方向與頂針高低差配合面',
    },
    {
      id: 'sample-4',
      title: '組裝嵌合推力測試 (功能檢驗)',
      url: '/src/assets/images/assembly_force_test_1793073213841.jpg',
      partNumber: 'PRT-2026-X88',
      context: 'Mark-10 數位推拉力治具卡扣裝配驗證',
    },
  ];

  const [selectedSample, setSelectedSample] = useState(sampleImages[0]);
  const [customImageBase64, setCustomImageBase64] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const activeImageUrl = customImageBase64 || selectedSample.url;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setCustomImageBase64(reader.result as string);
      setAnalysisResult(null);
      setErrorMsg(null);
    };
    reader.readAsDataURL(file);
  };

  const handleRunAiInspection = async () => {
    setAnalyzing(true);
    setErrorMsg(null);
    try {
      let imagePayload = customImageBase64;

      if (!imagePayload) {
        // Fetch the local sample image and convert to base64
        const resp = await fetch(selectedSample.url);
        const blob = await resp.blob();
        imagePayload = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        });
      }

      const res = await fetch('/api/ai/vision-inspect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: imagePayload,
          partNumber: selectedSample.partNumber,
          inspectionType: 'AI 視覺輔助拉傷與表面缺陷檢測',
          defectContext: selectedSample.context,
        }),
      });

      const data = await res.json();
      if (data.success && data.result) {
        setAnalysisResult(data.result);
      } else {
        throw new Error(data.error || 'AI 伺服器分析回應失敗');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || '辨識發生異常，請重試');
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-lg border border-slate-200">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Camera className="w-4 h-4 text-purple-600" />
            F11 AI 影像輔助判定 (AI Visual Galling & Scratch Inspection)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            基於 Gemini 3.8 Flash 多模態視覺神經網絡 · 辨識卡扣縱向拉傷、脫模拖痕、塑料撕裂白化與組裝風險評估
          </p>
        </div>

        <button
          onClick={handleRunAiInspection}
          disabled={analyzing}
          className="px-4 py-2 text-xs font-semibold text-white bg-purple-700 hover:bg-purple-800 disabled:opacity-50 rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer shadow-sm"
        >
          {analyzing ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              AI 視覺模型深度推理中...
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              執行 AI 影像拉傷分析
            </>
          )}
        </button>
      </div>

      {/* Preset Samples Selector */}
      <div className="bg-white rounded-lg border border-slate-200 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-700">
            快速選擇測試樣品照片（或點右方上傳現場照片）：
          </span>
          <label className="text-xs font-medium text-blue-600 hover:underline cursor-pointer flex items-center gap-1">
            <Upload className="w-3.5 h-3.5" />
            上傳自訂照片
            <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          </label>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {sampleImages.map((s) => {
            const isSelected = !customImageBase64 && selectedSample.id === s.id;
            return (
              <div
                key={s.id}
                onClick={() => {
                  setSelectedSample(s);
                  setCustomImageBase64(null);
                  setAnalysisResult(null);
                  setErrorMsg(null);
                }}
                className={`p-2.5 rounded-lg border transition-all cursor-pointer text-xs ${
                  isSelected
                    ? 'border-purple-600 ring-1 ring-purple-600 bg-purple-50/30'
                    : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                }`}
              >
                <div className="h-24 bg-slate-900 rounded overflow-hidden mb-1.5">
                  <img
                    src={s.url}
                    alt={s.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="font-semibold text-slate-800 text-[11px] truncate">{s.title}</div>
                <div className="text-[10px] text-slate-400 font-mono">{s.partNumber}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Two Column Inspection View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Photo Inspector (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-lg border border-slate-200 p-4 space-y-3 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
              <span>待測影像檢驗視窗 (Inspection Viewport)</span>
              {customImageBase64 ? (
                <span className="text-[10px] text-purple-700 font-mono bg-purple-50 px-2 py-0.5 rounded">
                  自訂上傳照片
                </span>
              ) : (
                <span className="text-[10px] text-slate-400 font-mono">示範樣品庫</span>
              )}
            </div>

            <div className="relative rounded-lg overflow-hidden bg-slate-950 border border-slate-300 min-h-[300px] flex items-center justify-center">
              <img
                src={activeImageUrl}
                alt="Inspection Target"
                referrerPolicy="no-referrer"
                className="w-full max-h-[380px] object-contain"
              />

              {/* Bounding Box Visual Overlay if defect detected */}
              {analysisResult?.defectDetected && (
                <div className="absolute inset-x-8 top-12 bottom-16 border-2 border-dashed border-red-500 bg-red-500/10 rounded flex flex-col justify-between p-2 pointer-events-none">
                  <span className="bg-red-600 text-white font-mono text-[10px] px-1.5 py-0.5 rounded w-max">
                    DEFECT AREA: {analysisResult.severity}
                  </span>
                  <span className="bg-black/75 text-white font-mono text-[9px] px-1.5 py-0.5 rounded w-max">
                    Confidence: {(analysisResult.confidence * 100).toFixed(0)}%
                  </span>
                </div>
              )}
            </div>

            <div className="text-xs text-slate-500 leading-relaxed bg-slate-50 p-2.5 rounded border border-slate-100">
              <strong>檢驗料號：</strong>{selectedSample.partNumber} · <strong>檢驗工況：</strong>{selectedSample.context}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-400 text-[11px]">相機光源：LED 環形無影檢驗燈</span>
            <button
              onClick={() => setActiveTab('standards')}
              className="text-blue-600 hover:underline font-medium text-[11px]"
            >
              開啟 F03 限度樣品庫比對 →
            </button>
          </div>
        </div>

        {/* Right AI Diagnosis Report (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-lg border border-slate-200 p-5 space-y-4">
          <div className="flex items-center justify-between border-b pb-3 border-slate-100">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <h3 className="text-sm font-bold text-slate-900">
                AI 視覺缺陷診斷分析報告 (AI Vision Report)
              </h3>
            </div>
            {analysisResult && (
              <span className="text-xs font-mono text-slate-400">
                Model: Gemini 3.8 Flash
              </span>
            )}
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 rounded text-xs text-red-800 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {analyzing ? (
            <div className="py-20 flex flex-col items-center justify-center text-slate-500 space-y-3">
              <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
              <div className="text-xs font-medium text-slate-700">正在傳送多模態照片至 AI 進行微觀特徵萃取...</div>
              <div className="text-[11px] text-slate-400">分析卡扣縱向拖花 · 剪切撕裂痕跡 · 尺寸應力評估</div>
            </div>
          ) : analysisResult ? (
            <div className="space-y-4 text-xs">
              {/* Verdict Banner */}
              <div
                className={`p-3.5 rounded-lg border flex items-center justify-between ${
                  analysisResult.acceptanceDisposition === 'REJECT'
                    ? 'bg-red-50 border-red-200 text-red-900'
                    : analysisResult.acceptanceDisposition === 'ACCEPT'
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-amber-50 border-amber-200 text-amber-900'
                }`}
              >
                <div>
                  <div className="font-bold text-sm flex items-center gap-1.5">
                    {analysisResult.acceptanceDisposition === 'REJECT' ? (
                      <XCircle className="w-4 h-4 text-red-600" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    )}
                    允收判定建議：{analysisResult.acceptanceDisposition}
                  </div>
                  <div className="text-[11px] mt-0.5 opacity-85">
                    缺陷類別：<strong>{analysisResult.defectType}</strong> · 嚴重度：<strong>{analysisResult.severity}</strong>
                  </div>
                </div>

                <div className="text-right font-mono tabular-nums">
                  <div className="text-[10px] opacity-75">判定信心度</div>
                  <div className="text-lg font-bold">
                    {(analysisResult.confidence * 100).toFixed(1)}%
                  </div>
                </div>
              </div>

              {/* Dimensions and Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-slate-50 p-3 rounded border border-slate-100">
                  <div className="text-slate-400 text-[10px] font-semibold mb-1">疑似拉傷位置 (Location)</div>
                  <div className="text-slate-800 font-medium">{analysisResult.affectedArea}</div>
                </div>
                <div className="bg-slate-50 p-3 rounded border border-slate-100">
                  <div className="text-slate-400 text-[10px] font-semibold mb-1">嚴重程度與尺寸估計 (Dimensions)</div>
                  <div className="text-slate-800 font-medium font-mono text-[11px]">
                    {analysisResult.scuffDimensionsEst}
                  </div>
                </div>
              </div>

              {/* Visual Features List */}
              <div className="space-y-1.5">
                <div className="font-semibold text-slate-800">特徵辨識分析 (Visual Key Features)：</div>
                <ul className="space-y-1 bg-slate-50 p-3 rounded border border-slate-100 text-slate-700 text-[11px]">
                  {analysisResult.visualFeatures?.map((f: string, i: number) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-purple-600 font-bold">•</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Suspected Root Causes */}
              <div className="space-y-1.5">
                <div className="font-semibold text-slate-800">模具與成形潛在成因推論 (Suspected Causes)：</div>
                <ul className="space-y-1 bg-slate-50 p-3 rounded border border-slate-100 text-slate-700 text-[11px]">
                  {analysisResult.suspectedRootCauses?.map((c: string, i: number) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-amber-600 font-bold">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Assembly Risk Assessment */}
              <div className="p-3 bg-slate-900 text-white rounded space-y-1">
                <div className="font-semibold text-amber-300 text-[11px]">
                  客戶端組裝裝配風險評估 (Customer Assembly Impact)：
                </div>
                <div className="text-slate-200 text-[11px] leading-relaxed">
                  {analysisResult.assemblyRiskAssessment}
                </div>
              </div>

              {/* Suggested Actions */}
              <div className="space-y-1.5">
                <div className="font-semibold text-slate-800">建議立即可行改善對策 (Suggested Actions)：</div>
                <ul className="space-y-1 text-slate-700 text-[11px]">
                  {analysisResult.suggestedCorrectiveActions?.map((act: string, i: number) => (
                    <li key={i} className="bg-emerald-50/60 p-2 rounded border border-emerald-100 flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Fast Action Buttons */}
              <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setActiveTab('reports')}
                  className="px-3 py-1.5 bg-slate-900 text-white rounded text-xs font-semibold hover:bg-slate-800 transition-colors"
                >
                  帶入 F01 開立異常通報單
                </button>
                <button
                  onClick={() => setActiveTab('traceability')}
                  className="px-3 py-1.5 bg-red-600 text-white rounded text-xs font-semibold hover:bg-red-700 transition-colors"
                >
                  啟動 F02 批次隔離
                </button>
              </div>
            </div>
          ) : (
            <div className="py-20 text-center text-slate-400 text-xs space-y-2">
              <Camera className="w-8 h-8 mx-auto text-slate-300" />
              <div>請點擊上方按鈕「執行 AI 影像拉傷分析」以啟動神經網路診斷</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
