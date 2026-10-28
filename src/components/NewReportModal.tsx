import React, { useState } from 'react';
import { useQms } from '../context/QmsContext';
import { DefectReport, DefectSeverity } from '../types/qms';
import { AlertTriangle, Upload, X } from 'lucide-react';

interface NewReportModalProps {
  onClose: () => void;
}

export const NewReportModal: React.FC<NewReportModalProps> = ({ onClose }) => {
  const { addDefectReport, setActiveTab } = useQms();

  const [customerName, setCustomerName] = useState('信邦精密車用電子');
  const [partNumber, setPartNumber] = useState('PRT-2026-X88');
  const [partName, setPartName] = useState('智能儀表控制模組-公扣導向扣件');
  const [workOrder, setWorkOrder] = useState('WO-202610-049');
  const [lotNumber, setLotNumber] = useState('LOT-20261026-N01');
  const [machineId, setMachineId] = useState('180T-02');
  const [moldId, setMoldId] = useState('MD-2024-A08');
  const [cavityNumber, setCavityNumber] = useState('Cavity #2');
  const [defectLocation, setDefectLocation] = useState('卡扣側壁導向滑塊面');
  const [defectQty, setDefectQty] = useState(12);
  const [inspectedQty, setInspectedQty] = useState(300);
  const [severity, setSeverity] = useState<DefectSeverity>('Severe');
  const [discoveryStage, setDiscoveryStage] = useState<DefectReport['discoveryStage']>('客戶組裝線反饋');
  const [reportedBy, setReportedBy] = useState('林品保 (QA Engineer)');
  const [assignedDept, setAssignedDept] = useState<DefectReport['assignedDept']>('模具修造組');
  const [responsiblePerson, setResponsiblePerson] = useState('張志豪 (模具主任)');
  const [description, setDescription] = useState('自動組裝機壓入卡扣時推力過大超載，目視檢驗卡扣滑道有深溝拖痕拉傷。');
  const [photoUrl, setPhotoUrl] = useState('/src/assets/images/scuff_defect_part_1793073211872.jpg');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Strict validation
    if (!customerName || !partNumber || !workOrder || !lotNumber || !machineId || !moldId || !defectLocation) {
      alert('請填妥所有必要欄位（客戶、料號、工單、批號、機台、模具、異常位置）');
      return;
    }

    if (defectQty <= 0 || inspectedQty <= 0) {
      alert('異常數量與檢驗數量必須大於 0');
      return;
    }

    const defectRate = Number(((defectQty / inspectedQty) * 100).toFixed(2));
    const now = new Date();
    const tempDate = new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString().slice(0, 16).replace('T', ' ');
    const permDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);

    const created = addDefectReport({
      customerName,
      partNumber,
      partName,
      workOrder,
      lotNumber,
      machineId,
      moldId,
      cavityNumber,
      defectLocation,
      defectQty,
      inspectedQty,
      defectRate,
      severity,
      discoveryStage,
      discoveryDate: now.toISOString().slice(0, 16).replace('T', ' '),
      reportedBy,
      assignedDept,
      responsiblePerson,
      targetTempDate: tempDate,
      targetPermDate: permDate,
      status: 'Pending',
      photoUrl,
      description,
    });

    onClose();
    setActiveTab('reports');
    alert(`品質異常單 ${created.id} 已成功開立！已自動指派 24H 臨時對策與責任人 ${responsiblePerson}。`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full my-8 p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-3 border-slate-200">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h3 className="text-base font-bold text-slate-900">
              F01 開立品質異常通報單 (Quality Defect Notification)
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-bold p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {/* Row 1: Customer & Discovery */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-medium mb-1">客戶名稱 *</label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-medium mb-1">發現來源階段 *</label>
              <select
                value={discoveryStage}
                onChange={(e) => setDiscoveryStage(e.target.value as any)}
                className="w-full border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none"
              >
                <option value="客戶組裝線反饋">客戶組裝線反饋 (客訴)</option>
                <option value="首件檢驗">首件檢驗 (開班/換模)</option>
                <option value="製程巡檢">製程巡檢 (IPQC)</option>
                <option value="末件檢驗">末件檢驗 (收班)</option>
                <option value="出貨檢驗">出貨檢驗 (OQC)</option>
              </select>
            </div>
          </div>

          {/* Row 2: Part Number & Name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-medium mb-1">產品料號 (Part No.) *</label>
              <input
                type="text"
                required
                value={partNumber}
                onChange={(e) => setPartNumber(e.target.value)}
                className="w-full border border-slate-200 rounded px-2.5 py-1.5 font-mono focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-medium mb-1">產品品名</label>
              <input
                type="text"
                value={partName}
                onChange={(e) => setPartName(e.target.value)}
                className="w-full border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none"
              />
            </div>
          </div>

          {/* Row 3: Work Order, Lot, Machine, Mold */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-2.5 rounded border border-slate-100">
            <div>
              <label className="block text-slate-600 text-[11px] font-medium mb-1">工單編號 *</label>
              <input
                type="text"
                required
                value={workOrder}
                onChange={(e) => setWorkOrder(e.target.value)}
                className="w-full border border-slate-200 rounded px-2 py-1 font-mono text-xs bg-white"
              />
            </div>
            <div>
              <label className="block text-slate-600 text-[11px] font-medium mb-1">生產批號 *</label>
              <input
                type="text"
                required
                value={lotNumber}
                onChange={(e) => setLotNumber(e.target.value)}
                className="w-full border border-slate-200 rounded px-2 py-1 font-mono text-xs bg-white"
              />
            </div>
            <div>
              <label className="block text-slate-600 text-[11px] font-medium mb-1">射出機台 *</label>
              <input
                type="text"
                required
                value={machineId}
                onChange={(e) => setMachineId(e.target.value)}
                className="w-full border border-slate-200 rounded px-2 py-1 text-xs bg-white"
              />
            </div>
            <div>
              <label className="block text-slate-600 text-[11px] font-medium mb-1">模具與穴號 *</label>
              <input
                type="text"
                required
                value={moldId}
                onChange={(e) => setMoldId(e.target.value)}
                className="w-full border border-slate-200 rounded px-2 py-1 font-mono text-xs bg-white"
              />
            </div>
          </div>

          {/* Row 4: Defect Location, Qty, Severity */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-700 font-medium mb-1">異常具體位置 *</label>
              <input
                type="text"
                required
                value={defectLocation}
                onChange={(e) => setDefectLocation(e.target.value)}
                placeholder="如 卡扣側壁導向滑塊面"
                className="w-full border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-medium mb-1">不良數量 / 檢驗數 *</label>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min={1}
                  required
                  value={defectQty}
                  onChange={(e) => setDefectQty(Number(e.target.value))}
                  className="w-1/2 border border-slate-200 rounded px-2 py-1.5 text-center font-mono"
                />
                <span className="text-slate-400">/</span>
                <input
                  type="number"
                  min={1}
                  required
                  value={inspectedQty}
                  onChange={(e) => setInspectedQty(Number(e.target.value))}
                  className="w-1/2 border border-slate-200 rounded px-2 py-1.5 text-center font-mono"
                />
              </div>
            </div>
            <div>
              <label className="block text-slate-700 font-medium mb-1">缺陷嚴重度</label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value as DefectSeverity)}
                className="w-full border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none"
              >
                <option value="Minor">Minor (輕微微刮)</option>
                <option value="Moderate">Moderate (中度擦傷)</option>
                <option value="Severe">Severe (嚴重拉傷卡死)</option>
                <option value="Critical">Critical (致命斷裂)</option>
              </select>
            </div>
          </div>

          {/* Row 5: Dept & Responsible */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-slate-700 font-medium mb-1">指派責任單位 *</label>
              <select
                value={assignedDept}
                onChange={(e) => setAssignedDept(e.target.value as any)}
                className="w-full border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none"
              >
                <option value="模具修造組">模具修造組</option>
                <option value="射出成形課">射出成形課</option>
                <option value="品保工程組">品保工程組</option>
                <option value="產品研發部">產品研發部</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-700 font-medium mb-1">責任人 *</label>
              <input
                type="text"
                required
                value={responsiblePerson}
                onChange={(e) => setResponsiblePerson(e.target.value)}
                className="w-full border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-700 font-medium mb-1">通報人員</label>
              <input
                type="text"
                value={reportedBy}
                onChange={(e) => setReportedBy(e.target.value)}
                className="w-full border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none"
              />
            </div>
          </div>

          {/* Row 6: Description */}
          <div>
            <label className="block text-slate-700 font-medium mb-1">異常狀況詳細陳述 (5W2H) *</label>
            <textarea
              required
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-slate-200 rounded px-2.5 py-1.5 focus:outline-none leading-relaxed"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">
              * 送出後系統將自動發送 24H SLA 警報通知責任主管
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded cursor-pointer"
              >
                取消
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded transition-colors shadow-xs cursor-pointer"
              >
                確認送出異常通報
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
