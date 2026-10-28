export type DefectSeverity = 'Minor' | 'Moderate' | 'Severe' | 'Critical';
export type NCRStatus = 'Pending' | 'Quarantined' | 'Analyzing' | 'CorrectiveAction' | 'Verifying' | 'Closed';
export type InspectionStation = 'FirstArticle' | 'Patrol' | 'LastPiece' | 'OQC';
export type QuarantineStatus = 'QUARANTINED' | 'RELEASED' | 'SCRAPPED' | 'PENDING_CONFIRMATION';

export interface DefectReport {
  id: string; // e.g., QA-20261026-001
  customerName: string;
  partNumber: string;
  partName: string;
  workOrder: string;
  lotNumber: string;
  machineId: string; // e.g., 180T-02
  moldId: string; // e.g., M-2024-A08
  cavityNumber: string;
  defectLocation: string; // e.g., 卡扣裝配導向槽側壁
  defectQty: number;
  inspectedQty: number;
  defectRate: number; // percentage
  severity: DefectSeverity;
  discoveryStage: '首件檢驗' | '製程巡檢' | '末件檢驗' | '出貨檢驗' | '客戶組裝線反饋';
  discoveryDate: string;
  reportedBy: string;
  assignedDept: '射出成形課' | '模具修造組' | '品保工程組' | '產品研發部';
  responsiblePerson: string;
  targetTempDate: string; // 24h SLA
  targetPermDate: string; // 7d SLA
  status: NCRStatus;
  photoUrl: string;
  description: string;
  history: Array<{
    timestamp: string;
    operator: string;
    action: string;
    comment: string;
  }>;
}

export interface TraceabilityLot {
  lotNumber: string;
  workOrder: string;
  partNumber: string;
  productionDate: string;
  machineId: string;
  moldId: string;
  rawMaterial: string;
  materialLot: string;
  totalProducedQty: number;
  quarantineQty: number;
  quarantineStatus: QuarantineStatus;
  shippedQty: number;
  customerName: string;
  riskEvaluation: 'HIGH' | 'MEDIUM' | 'LOW' | 'PENDING_CONFIRMATION';
  quarantineLocation: string;
  actionsTaken: string;
}

export interface DefectStandard {
  id: string;
  code: string; // e.g., STD-SCR-01
  title: string;
  defectCategory: string;
  locationArea: string;
  acceptanceCriteria: string;
  rejectionCriteria: string;
  sampleLevel: 'Golden Sample (OK)' | 'Limit Sample (Conditional OK)' | 'Reject Sample (NG)';
  version: string;
  approvedByQA: string;
  approvedByEng: string;
  approvalDate: string;
  imageUrl: string;
  notes: string;
}

export interface InspectionRecord {
  id: string;
  date: string;
  time: string;
  station: InspectionStation;
  partNumber: string;
  workOrder: string;
  lotNumber: string;
  machineId: string;
  sampleSize: number;
  scuffStatus: 'OK' | 'NG';
  criticalDimensionMm: number; // e.g. 2.40 ± 0.05
  dimensionStatus: 'OK' | 'NG';
  inspector: string;
  result: 'PASS' | 'FAIL';
  actionNote: string;
}

export interface AssemblyVerification {
  id: string;
  testDate: string;
  partNumber: string;
  lotNumber: string;
  sampleQty: number;
  passedQty: number;
  passRate: number;
  insertionForceN: number; // target: 20±5N
  pullForceN: number; // target: >=35N
  assemblySmoothness: '極佳順暢' | '正常無刮感' | '輕微摩擦' | '嚴重卡滯拉傷';
  debrisObserved: boolean;
  tester: string;
  testEquipment: string;
  conclusion: 'PASS' | 'FAIL';
  feedbackToCAPA: string;
}

export interface FiveWhyItem {
  level: number;
  question: string;
  answer: string;
  category: 'Occurrence' | 'Escape' | 'Systemic';
}

export interface FishboneData {
  man: string[];
  machine: string[];
  material: string[];
  method: string[];
  environment: string[];
  measurement: string[];
}

export interface Capa8D {
  id: string; // e.g., 8D-202610-001
  ncrId: string;
  title: string;
  d1TeamLeader: string;
  d1Members: string[];
  d2ProblemDescription: string;
  d3ContainmentActions: string;
  d3QuarantineVerified: boolean;
  d4OccurRootCause: string;
  d4EscapeRootCause: string;
  d5PermanentActions: string;
  d6ExecutionEvidence: string;
  d6AssemblyTestId?: string;
  d6VerifiedDate?: string;
  d6IsEffective: boolean;
  d7PreventiveStandardization: string;
  d7SopUpdated: boolean;
  d7FmeaUpdated: boolean;
  d8Champion: string;
  d8SignOffDate?: string;
  d8Status: 'OPEN' | 'IN_PROGRESS' | 'VERIFYING' | 'CLOSED';
  dueDate: string;
  completedDate?: string;
}

export interface InjectionParameter {
  id: string;
  moldId: string;
  machineId: string;
  changeDate: string;
  engineer: string;
  reason: string;
  status: 'ACTIVE' | 'PREVIOUS';
  // Parameters
  barrelTempC: { zone1: number; zone2: number; zone3: number; nozzle: number };
  moldTempC: { core: number; cavity: number }; // 公模 / 母模
  injectionPressureMpa: number;
  injectionSpeedMmS: number;
  packPressureMpa: { stage1: number; stage2: number };
  packTimeS: number;
  coolingTimeS: number;
  ejectDelayS: number;
  ejectSpeedMmS: number;
  moldDraftModification: string;
  moldPolishNotes: string;
}

export interface NotificationItem {
  id: string;
  type: 'ALERT' | 'OVERDUE' | 'QUARANTINE' | 'PASS';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  linkedId?: string;
}
