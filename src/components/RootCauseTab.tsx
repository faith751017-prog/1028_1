import React, { useState } from 'react';
import { useQms } from '../context/QmsContext';
import { FishboneData } from '../types/qms';
import {
  HelpCircle,
  Plus,
  GitBranch,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Users,
  Cpu,
  Package,
  FileText,
  Thermometer,
  Ruler,
} from 'lucide-react';

export const RootCauseTab: React.FC = () => {
  const { fiveWhyList, updateFiveWhy, fishbone, addFishboneCause, setActiveTab } = useQms();

  const [activeCategory, setActiveCategory] = useState<keyof FishboneData>('method');
  const [newCauseInput, setNewCauseInput] = useState('');

  const handleAddCause = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCauseInput.trim()) return;
    addFishboneCause(activeCategory, newCauseInput);
    setNewCauseInput('');
  };

  const fishboneCategories: Array<{
    key: keyof FishboneData;
    label: string;
    english: string;
    icon: any;
    desc: string;
  }> = [
    { key: 'man', label: '人 (Man)', english: '人員與操作作業', icon: Users, desc: '技術員調機經驗、巡檢標準落實、保養清潔落實' },
    { key: 'machine', label: '機 (Machine)', english: '射出機台與模具機構', icon: Cpu, desc: '頂針磨耗微凸、公模溫冷卻水管積垢溫差、頂出機構不同步' },
    { key: 'material', label: '料 (Material)', english: '塑料材料特性與批次', icon: Package, desc: 'ABS次料摻配比、熔融流動指數波動、塑料含水率高' },
    { key: 'method', label: '法 (Method)', english: '模具工藝與成型參數', icon: FileText, desc: '拔模斜度不足 0.8°、鏡面逆紋拋光咬模、第二段保壓過高 110MPa' },
    { key: 'environment', label: '環 (Environment)', english: '車間作業環境溫濕度', icon: Thermometer, desc: '夏季模具冷卻水路結露、環境溫差影響塑料成型結晶收縮率' },
    { key: 'measurement', label: '測 (Measurement)', english: '檢驗手法與量具', icon: Ruler, desc: '缺乏卡扣側壁微觀拉傷限度樣品、線上未配置即時推拉力測試治具' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-lg border border-slate-200">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-slate-800" />
            F06 根本原因分析管理 (5WHY · 魚骨圖 · 發生/流出原因)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            5 階段縱深推理 · 6M 魚骨成因分類 · 分離發生根本原因 (Occurrence) 與 流出根本原因 (Escape)
          </p>
        </div>

        <button
          onClick={() => setActiveTab('capa8d')}
          className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          將原因帶入 8D D4 (F07) <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Occurrence vs Escape Dual Axis Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Occurrence Root Cause */}
        <div className="bg-red-50/60 border border-red-200 rounded-lg p-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-red-900">
            <span className="flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-red-600" />
              發生根本原因 (Occurrence Root Cause)
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 bg-red-100 rounded text-red-800">
              為什麼會產生拉傷？
            </span>
          </div>
          <div className="text-xs text-slate-700 leading-relaxed font-medium">
            模具公模仁卡扣側壁<strong>拔模斜度僅 0.8°</strong> (遠低於深筋標準 1.5°~2.0°)，且研磨拋光方向與頂出方向垂直造成<strong>逆紋咬模</strong>；現場調機技師為消除外觀縮水將<strong>第二段保壓加至 110MPa</strong>，導致膠料過度緻密並產生強烈收縮包緊力，在快速頂出瞬間劇烈剪切拉傷。
          </div>
        </div>

        {/* Escape Root Cause */}
        <div className="bg-amber-50/60 border border-amber-200 rounded-lg p-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-amber-900">
            <span className="flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              流出根本原因 (Escape / Detection Root Cause)
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 bg-amber-100 rounded text-amber-800">
              為什麼巡檢未能攔截？
            </span>
          </div>
          <div className="text-xs text-slate-700 leading-relaxed font-medium">
            現行製程巡檢標準僅定義首件尺寸與外觀大項，<strong>缺乏「卡扣組裝面微觀拉傷」的數位限度樣品 (Boundary Sample)</strong>，且線上未配備組裝配合件嵌合推拉力計進行量化驗證，導致首批拉傷品未被判定為不良而流出至客戶端。
          </div>
        </div>
      </div>

      {/* 5-WHY Analysis Section */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 space-y-4">
        <div className="flex items-center justify-between border-b pb-3 border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-blue-600" />
              5-WHY 深入推理分析鏈條 (Five-Why Root Cause Chain)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              逐層深掘真實成因，避免停留在表面現象（點擊各層答案可即時更新編輯）
            </p>
          </div>
          <span className="text-xs text-slate-400 font-mono">5-Level Inquiry</span>
        </div>

        <div className="space-y-3">
          {fiveWhyList.map((item, index) => (
            <div
              key={index}
              className="p-3.5 rounded-lg border border-slate-200 bg-slate-50/50 space-y-2 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 font-mono">{item.question}</span>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded font-mono ${
                    item.category === 'Escape'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {item.category === 'Escape' ? '流出原因 (Escape)' : '發生原因 (Occurrence)'}
                </span>
              </div>

              <textarea
                rows={2}
                value={item.answer}
                onChange={(e) => updateFiveWhy(index, e.target.value)}
                className="w-full text-xs text-slate-800 bg-white border border-slate-200 rounded p-2 focus:outline-none focus:ring-1 focus:ring-slate-900 leading-relaxed"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Fishbone Diagram (Ishikawa 6M) */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3 border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              魚骨圖原因分析 (Ishikawa 6M Diagram)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              分析人、機、料、法、環、測 6 大要素中造成組裝拉傷的潛在因子
            </p>
          </div>

          <form onSubmit={handleAddCause} className="flex gap-2">
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value as keyof FishboneData)}
              className="text-xs border border-slate-200 rounded px-2 py-1 bg-white focus:outline-none"
            >
              {fishboneCategories.map((c) => (
                <option key={c.key} value={c.key}>
                  {c.label}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={newCauseInput}
              onChange={(e) => setNewCauseInput(e.target.value)}
              placeholder="新增潛在因子..."
              className="text-xs border border-slate-200 rounded px-2.5 py-1 focus:outline-none w-48"
            />
            <button
              type="submit"
              className="px-3 py-1 bg-slate-900 text-white rounded text-xs font-semibold hover:bg-slate-800 transition-colors"
            >
              加入魚骨
            </button>
          </form>
        </div>

        {/* 6M Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {fishboneCategories.map((cat) => {
            const Icon = cat.icon;
            const causes = fishbone[cat.key] || [];
            return (
              <div
                key={cat.key}
                className="bg-slate-50 rounded-lg border border-slate-200 p-3.5 space-y-2 text-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 font-bold text-slate-900 mb-1 border-b border-slate-200 pb-1.5">
                    <Icon className="w-4 h-4 text-slate-600" />
                    <span>{cat.label}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mb-2">{cat.desc}</div>

                  <ul className="space-y-1.5">
                    {causes.map((c, i) => (
                      <li
                        key={i}
                        className="bg-white p-2 rounded border border-slate-200 text-slate-700 text-[11px] flex items-start gap-1.5 leading-snug"
                      >
                        <span className="text-slate-400 font-mono text-[10px] mt-0.5">•</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 text-[10px] text-slate-400 text-right">
                  累計 {causes.length} 項分析因子
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
