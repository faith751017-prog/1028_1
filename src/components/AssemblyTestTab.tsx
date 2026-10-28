import React, { useState } from 'react';
import { useQms } from '../context/QmsContext';
import { AssemblyVerification } from '../types/qms';
import {
  Wrench,
  Plus,
  CheckCircle2,
  XCircle,
  Gauge,
  ArrowRight,
  ShieldAlert,
  SlidersHorizontal,
} from 'lucide-react';

export const AssemblyTestTab: React.FC = () => {
  const { assemblyTests, addAssemblyTest, setActiveTab } = useQms();

  const [showAddModal, setShowAddModal] = useState(false);

  // New Assembly Test Form state
  const [partNumber, setPartNumber] = useState('PRT-2026-X88');
  const [lotNumber, setLotNumber] = useState('LOT-20261026-X01 (試模批)');
  const [sampleQty, setSampleQty] = useState(30);
  const [passedQty, setPassedQty] = useState(30);
  const [insertionForceN, setInsertionForceN] = useState(19.4);
  const [pullForceN, setPullForceN] = useState(40.2);
  const [assemblySmoothness, setAssemblySmoothness] = useState<AssemblyVerification['assemblySmoothness']>('極佳順暢');
  const [debrisObserved, setDebrisObserved] = useState(false);
  const [tester, setTester] = useState('陳驗證員 (Quality Lab)');
  const [testEquipment, setTestEquipment] = useState('Mark-10 數位高精度推拉力機 (EQ-CAL-202604)');
  const [feedbackToCAPA, setFeedbackToCAPA] = useState('改善對策有效：拔模斜度 1.8° 且保壓降至 85MPa 後，裝配嵌合手感順暢，無任何塑料碎屑。');

  const handleCreateTest = (e: React.FormEvent) => {
    e.preventDefault();

    const passRate = sampleQty > 0 ? Number(((passedQty / sampleQty) * 100).toFixed(1)) : 100;
    const isForcePass = insertionForceN >= 15 && insertionForceN <= 25 && pullForceN >= 35;
    const conclusion = passRate >= 95 && isForcePass && !debrisObserved ? 'PASS' : 'FAIL';

    addAssemblyTest({
      testDate: new Date().toISOString().slice(0, 16).replace('T', ' '),
      partNumber,
      lotNumber,
      sampleQty: Number(sampleQty),
      passedQty: Number(passedQty),
      passRate,
      insertionForceN: Number(insertionForceN),
      pullForceN: Number(pullForceN),
      assemblySmoothness,
      debrisObserved,
      tester,
      testEquipment,
      conclusion,
      feedbackToCAPA,
    });

    setShowAddModal(false);
    alert(`組裝功能驗證紀錄已建立！結論：${conclusion}`);
  };

  return (
    <div className="space-y-5">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-lg border border-slate-200">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Wrench className="w-4 h-4 text-slate-800" />
            F05 組裝功能驗證 (Assembly Functional Testing)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            推拉力規格量測 (嵌合力 20±5N / 拔出力 ≥35N) · 滑動手感評定 · 塑料脫屑檢驗 · 結案必要防呆前提
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          登錄組裝驗證測試
        </button>
      </div>

      {/* Assembly Photo & Engineering Benchmarking Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Visual Lab Test Setup (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-lg border border-slate-200 overflow-hidden flex flex-col justify-between">
          <div>
            <div className="h-52 bg-slate-900 relative">
              <img
                src="/src/assets/images/assembly_force_test_1793073213841.jpg"
                alt="組裝推拉力數位量測作業"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-xs text-white text-[11px] font-mono px-2 py-0.5 rounded">
                Mark-10 數位高精度推拉力測試
              </div>
            </div>

            <div className="p-4 space-y-2 text-xs">
              <div className="font-bold text-slate-900">組裝卡扣關鍵物理檢驗規格</div>
              <ul className="space-y-1.5 text-slate-600">
                <li className="flex justify-between border-b border-slate-100 pb-1">
                  <span>嵌合裝配推力 (Insertion Force):</span>
                  <strong className="text-slate-800 font-mono">20 ± 5 N (15~25N)</strong>
                </li>
                <li className="flex justify-between border-b border-slate-100 pb-1">
                  <span>拔出鎖緊力 (Pull/Retention Force):</span>
                  <strong className="text-slate-800 font-mono">≥ 35 N (防止行車震動脫落)</strong>
                </li>
                <li className="flex justify-between border-b border-slate-100 pb-1">
                  <span>外觀微粒脫屑判定 (Debris Check):</span>
                  <strong className="text-emerald-700">0 顆粒 (防落入PCB短路)</strong>
                </li>
                <li className="flex justify-between">
                  <span>組裝手感判定 (Tactile Quality):</span>
                  <strong className="text-slate-800">順暢無卡滯、無段落擦傷感</strong>
                </li>
              </ul>
            </div>
          </div>

          <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs flex items-center justify-between text-slate-500">
            <span>連結 8D 永久對策驗證</span>
            <button
              onClick={() => setActiveTab('capa8d')}
              className="text-blue-600 hover:underline flex items-center gap-1 font-medium"
            >
              檢視 8D 驗證記錄 (F07) <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Test Records Cards (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="text-xs font-semibold text-slate-500 px-1 flex items-center justify-between">
            <span>歷史組裝驗證紀錄 ({assemblyTests.length})</span>
            <span className="text-[11px] text-slate-400">對策實施前後效果比對</span>
          </div>

          <div className="space-y-3 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
            {assemblyTests.map((t) => (
              <div
                key={t.id}
                className="bg-white rounded-lg border border-slate-200 p-4 space-y-3 text-xs"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-900">{t.id}</span>
                    <span className="text-[11px] text-slate-400 font-mono">{t.testDate}</span>
                  </div>
                  <span
                    className={`font-bold px-2 py-0.5 rounded text-[11px] flex items-center gap-1 ${
                      t.conclusion === 'PASS'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-red-50 text-red-700'
                    }`}
                  >
                    {t.conclusion === 'PASS' ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5" />
                    )}
                    驗證結論：{t.conclusion}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-400">產品料號：</span>
                    <span className="font-mono font-semibold text-slate-800">{t.partNumber}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">測試批號：</span>
                    <span className="font-mono text-slate-800">{t.lotNumber}</span>
                  </div>
                </div>

                {/* Force Metrics Grid */}
                <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded border border-slate-100 text-center">
                  <div>
                    <div className="text-slate-400 text-[10px]">裝配推力 (20±5N)</div>
                    <div
                      className={`text-sm font-bold font-mono ${
                        t.insertionForceN >= 15 && t.insertionForceN <= 25
                          ? 'text-emerald-700'
                          : 'text-red-700'
                      }`}
                    >
                      {t.insertionForceN} N
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-[10px]">拔出力 (≥35N)</div>
                    <div
                      className={`text-sm font-bold font-mono ${
                        t.pullForceN >= 35 ? 'text-emerald-700' : 'text-red-700'
                      }`}
                    >
                      {t.pullForceN} N
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-[10px]">樣品合格率</div>
                    <div className="text-sm font-bold font-mono text-slate-900">
                      {t.passedQty}/{t.sampleQty} ({t.passRate}%)
                    </div>
                  </div>
                </div>

                <div className="space-y-1 text-[11px] text-slate-600">
                  <div className="flex items-center justify-between">
                    <span>
                      手感評級：<strong className="text-slate-800">{t.assemblySmoothness}</strong>
                    </span>
                    <span>
                      塑料脫屑：
                      <strong className={t.debrisObserved ? 'text-red-600' : 'text-emerald-600'}>
                        {t.debrisObserved ? '有脫屑 (NG)' : '無脫屑 (OK)'}
                      </strong>
                    </span>
                  </div>
                  <div className="bg-slate-50 p-2 rounded text-slate-700 leading-relaxed font-mono">
                    {t.feedbackToCAPA}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                  <span>檢驗人員：{t.tester}</span>
                  <span className="truncate max-w-[240px]">{t.testEquipment}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-5 space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-slate-200">
              <h3 className="text-sm font-bold text-slate-900">登錄組裝功能驗證紀錄 (F05)</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTest} className="space-y-3 text-xs">
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
                  <label className="block text-slate-600 font-medium mb-1">測試批號 *</label>
                  <input
                    type="text"
                    value={lotNumber}
                    onChange={(e) => setLotNumber(e.target.value)}
                    className="w-full border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">測試樣本數 (pcs) *</label>
                  <input
                    type="number"
                    min={1}
                    value={sampleQty}
                    onChange={(e) => setSampleQty(Number(e.target.value))}
                    className="w-full border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">合格數量 (pcs) *</label>
                  <input
                    type="number"
                    min={0}
                    max={sampleQty}
                    value={passedQty}
                    onChange={(e) => setPassedQty(Number(e.target.value))}
                    className="w-full border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-2.5 rounded border border-slate-100">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">
                    嵌合推力 (規格 20±5N) *
                  </label>
                  <input
                    type="number"
                    step={0.1}
                    value={insertionForceN}
                    onChange={(e) => setInsertionForceN(Number(e.target.value))}
                    className="w-full border border-slate-200 rounded px-2.5 py-1.5 bg-white focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">
                    拔出鎖定力 (規格 ≥35N) *
                  </label>
                  <input
                    type="number"
                    step={0.1}
                    value={pullForceN}
                    onChange={(e) => setPullForceN(Number(e.target.value))}
                    className="w-full border border-slate-200 rounded px-2.5 py-1.5 bg-white focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">組裝滑動手感</label>
                  <select
                    value={assemblySmoothness}
                    onChange={(e) => setAssemblySmoothness(e.target.value as any)}
                    className="w-full border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none"
                  >
                    <option value="極佳順暢">極佳順暢 (無阻力)</option>
                    <option value="正常無刮感">正常無刮感</option>
                    <option value="輕微摩擦">輕微摩擦 (偏緊)</option>
                    <option value="嚴重卡滯拉傷">嚴重卡滯拉傷 (卡死超載)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">是否觀察到塑料脫屑？</label>
                  <select
                    value={debrisObserved ? 'true' : 'false'}
                    onChange={(e) => setDebrisObserved(e.target.value === 'true')}
                    className="w-full border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none"
                  >
                    <option value="false">否 (潔淨無塑料屑)</option>
                    <option value="true">是 (有微粒脫屑 NG)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">驗證回饋意見 (Feedback to CAPA)</label>
                <textarea
                  rows={2}
                  value={feedbackToCAPA}
                  onChange={(e) => setFeedbackToCAPA(e.target.value)}
                  className="w-full border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none"
                />
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
                  確認建立驗證紀錄
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
