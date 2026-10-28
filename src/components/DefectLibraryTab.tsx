import React, { useState } from 'react';
import { useQms } from '../context/QmsContext';
import { DefectStandard } from '../types/qms';
import {
  Image as ImageIcon,
  CheckCircle2,
  XCircle,
  FileCheck2,
  Search,
  Plus,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export const DefectLibraryTab: React.FC = () => {
  const { defectStandards, addDefectStandard, setActiveTab } = useQms();

  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('ALL');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Standard Form state
  const [newCode, setNewCode] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('卡扣側壁縱向拉傷');
  const [newLocation, setNewLocation] = useState('卡扣嵌合導向面');
  const [newAccept, setNewAccept] = useState('無手感連續拖花，Ra ≤ 0.4μm');
  const [newReject, setNewReject] = useState('手感刮傷長度 > 2.0mm，嵌合力 > 25N');
  const [newSampleLevel, setNewSampleLevel] = useState<DefectStandard['sampleLevel']>('Limit Sample (Conditional OK)');
  const [newApprovedQA, setNewApprovedQA] = useState('林品保副理');
  const [newApprovedEng, setNewApprovedEng] = useState('許工程處長');

  const filteredStandards = defectStandards.filter((std) => {
    const matchesSearch =
      std.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      std.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      std.defectCategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
      std.locationArea.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLevel = levelFilter === 'ALL' || std.sampleLevel.includes(levelFilter);
    return matchesSearch && matchesLevel;
  });

  const handleCreateStandard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode || !newTitle) {
      alert('請填寫標準代號與標題');
      return;
    }

    addDefectStandard({
      code: newCode,
      title: newTitle,
      defectCategory: newCategory,
      locationArea: newLocation,
      acceptanceCriteria: newAccept,
      rejectionCriteria: newReject,
      sampleLevel: newSampleLevel,
      version: 'Rev 1.0',
      approvedByQA: newApprovedQA,
      approvedByEng: newApprovedEng,
      approvalDate: new Date().toISOString().slice(0, 10),
      imageUrl: '/src/assets/images/scuff_defect_part_1793073211872.jpg',
      notes: '由品保與工程部共同會簽生效之數位限度樣品判定基準。',
    });

    setShowAddModal(false);
    setNewCode('');
    setNewTitle('');
    alert('數位限度樣品標準已成功建立！');
  };

  return (
    <div className="space-y-5">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-lg border border-slate-200">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-emerald-600" />
            F03 拉傷缺陷管理與數位限度樣品庫
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            黃金樣品 (Golden) · 限度允收 (Limit) · 拒收樣品 (Reject) · 品保與工程雙簽核准履歷
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="搜尋標準代號 / 缺陷特徵..."
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-900"
            />
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            新增限度標準
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 text-xs">
        <span className="text-slate-500 font-medium">樣品等級分類：</span>
        {[
          { key: 'ALL', label: '全部樣品' },
          { key: 'Golden', label: '黃金良品 (Golden OK)' },
          { key: 'Limit', label: '條件限度 (Limit OK)' },
          { key: 'Reject', label: '拒收樣品 (Reject NG)' },
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => setLevelFilter(item.key)}
            className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
              levelFilter === item.key
                ? 'bg-slate-900 text-white font-medium'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredStandards.map((std) => (
          <div
            key={std.id}
            className="bg-white rounded-lg border border-slate-200 overflow-hidden flex flex-col justify-between"
          >
            <div>
              {/* Image Preview Container */}
              <div className="relative h-48 bg-slate-900 overflow-hidden">
                <img
                  src={std.imageUrl}
                  alt={std.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2.5 left-2.5">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded shadow-sm ${
                      std.sampleLevel.includes('Golden')
                        ? 'bg-emerald-600 text-white'
                        : std.sampleLevel.includes('Reject')
                        ? 'bg-red-600 text-white'
                        : 'bg-amber-500 text-white'
                    }`}
                  >
                    {std.sampleLevel}
                  </span>
                </div>
                <div className="absolute bottom-2.5 right-2.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded">
                  {std.version}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                <div>
                  <div className="text-[11px] font-mono text-slate-400">{std.code}</div>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">{std.title}</h3>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-baseline gap-1">
                    <span className="text-slate-400 text-[11px] shrink-0">位置：</span>
                    <span className="font-medium text-slate-800">{std.locationArea}</span>
                  </div>

                  <div className="bg-emerald-50/60 p-2 rounded border border-emerald-100 text-[11px]">
                    <div className="text-emerald-800 font-semibold flex items-center gap-1 mb-0.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      允收標準 (Acceptance Criteria)
                    </div>
                    <div className="text-slate-700 leading-relaxed">{std.acceptanceCriteria}</div>
                  </div>

                  <div className="bg-red-50/60 p-2 rounded border border-red-100 text-[11px]">
                    <div className="text-red-800 font-semibold flex items-center gap-1 mb-0.5">
                      <XCircle className="w-3 h-3 text-red-600" />
                      拒收判據 (Rejection Criteria)
                    </div>
                    <div className="text-slate-700 leading-relaxed">{std.rejectionCriteria}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Sign-off Info */}
            <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 text-[11px] flex flex-col gap-1 text-slate-500">
              <div className="flex items-center justify-between">
                <span>品保簽核：<strong className="text-slate-700">{std.approvedByQA}</strong></span>
                <span>工程簽核：<strong className="text-slate-700">{std.approvedByEng}</strong></span>
              </div>
              <div className="flex items-center justify-between pt-1 text-[10px] text-slate-400">
                <span>生效日期：{std.approvalDate}</span>
                <button
                  onClick={() => setActiveTab('ai-vision')}
                  className="text-blue-600 hover:underline flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" /> AI 比對
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-lg w-full p-5 space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-slate-200">
              <h3 className="text-sm font-bold text-slate-900">建立數位限度樣品標準 (F03)</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateStandard} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">標準代號 (Code) *</label>
                  <input
                    type="text"
                    required
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value)}
                    placeholder="如 STD-SCR-04"
                    className="w-full border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">樣品等級 *</label>
                  <select
                    value={newSampleLevel}
                    onChange={(e) => setNewSampleLevel(e.target.value as DefectStandard['sampleLevel'])}
                    className="w-full border border-slate-200 rounded px-2 py-1.5 focus:outline-none"
                  >
                    <option value="Golden Sample (OK)">Golden Sample (良品標準)</option>
                    <option value="Limit Sample (Conditional OK)">Limit Sample (條件限度)</option>
                    <option value="Reject Sample (NG)">Reject Sample (拒收不良)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">標準樣品標題 *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="如 卡扣側壁微觀刮痕允收限度基準"
                  className="w-full border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">缺陷類別</label>
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">關鍵部位</label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">允收標準說明 (Accept)</label>
                <textarea
                  rows={2}
                  value={newAccept}
                  onChange={(e) => setNewAccept(e.target.value)}
                  className="w-full border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-medium mb-1">拒收判據說明 (Reject)</label>
                <textarea
                  rows={2}
                  value={newReject}
                  onChange={(e) => setNewReject(e.target.value)}
                  className="w-full border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">品保核准人</label>
                  <input
                    type="text"
                    value={newApprovedQA}
                    onChange={(e) => setNewApprovedQA(e.target.value)}
                    className="w-full border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">工程核准人</label>
                  <input
                    type="text"
                    value={newApprovedEng}
                    onChange={(e) => setNewApprovedEng(e.target.value)}
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
                  審核並發布標準
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
