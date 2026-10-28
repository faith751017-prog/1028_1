import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  DefectReport,
  TraceabilityLot,
  DefectStandard,
  InspectionRecord,
  AssemblyVerification,
  FiveWhyItem,
  FishboneData,
  Capa8D,
  InjectionParameter,
  NotificationItem,
} from '../types/qms';
import {
  INITIAL_DEFECT_REPORTS,
  INITIAL_TRACEABILITY_LOTS,
  INITIAL_DEFECT_STANDARDS,
  INITIAL_INSPECTIONS,
  INITIAL_ASSEMBLY_TESTS,
  INITIAL_FIVE_WHY,
  INITIAL_FISHBONE,
  INITIAL_CAPA_8D,
  INITIAL_PARAMETERS,
  INITIAL_NOTIFICATIONS,
} from '../data/mockData';

interface QmsContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  // F01
  defectReports: DefectReport[];
  selectedReport: DefectReport | null;
  setSelectedReport: (report: DefectReport | null) => void;
  addDefectReport: (report: Omit<DefectReport, 'id' | 'history'>) => DefectReport;
  updateReportStatus: (id: string, status: DefectReport['status'], note: string) => void;
  // F02
  traceabilityLots: TraceabilityLot[];
  updateLotQuarantine: (lotNumber: string, status: TraceabilityLot['quarantineStatus'], notes: string) => void;
  // F03
  defectStandards: DefectStandard[];
  addDefectStandard: (std: Omit<DefectStandard, 'id'>) => void;
  // F04
  inspections: InspectionRecord[];
  addInspectionRecord: (record: Omit<InspectionRecord, 'id'>) => void;
  // F05
  assemblyTests: AssemblyVerification[];
  addAssemblyTest: (test: Omit<AssemblyVerification, 'id'>) => void;
  // F06
  fiveWhyList: FiveWhyItem[];
  updateFiveWhy: (index: number, answer: string) => void;
  fishbone: FishboneData;
  addFishboneCause: (category: keyof FishboneData, cause: string) => void;
  // F07
  capaList: Capa8D[];
  selected8D: Capa8D | null;
  setSelected8D: (capa: Capa8D | null) => void;
  update8D: (id: string, updates: Partial<Capa8D>) => void;
  canClose8D: (capa: Capa8D) => { canClose: boolean; reason?: string };
  // F08
  parameters: InjectionParameter[];
  addParameterRecord: (param: Omit<InjectionParameter, 'id'>) => void;
  // F10
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  // KPI stats
  kpiStats: {
    scuffDefectRate: number; // %
    baselineDefectRate: number; // 4.8%
    defectReductionPct: number; // %
    customerComplaintCount: number;
    baselineComplaintCount: number;
    capaOnTimeRate: number; // %
    inspectionCompletenessRate: number; // %
    recurrentComplaints: number;
    aiDetectionAccuracy: number; // %
  };
  // Tools
  resetToDefaultData: () => void;
  exportDatabaseJson: () => void;
}

const QmsContext = createContext<QmsContextType | undefined>(undefined);

const STORAGE_KEYS = {
  REPORTS: 'qms_defect_reports_v1',
  LOTS: 'qms_traceability_lots_v1',
  STANDARDS: 'qms_defect_standards_v1',
  INSPECTIONS: 'qms_inspections_v1',
  ASSEMBLY_TESTS: 'qms_assembly_tests_v1',
  FIVE_WHY: 'qms_five_why_v1',
  FISHBONE: 'qms_fishbone_v1',
  CAPA: 'qms_capa_8d_v1',
  PARAMS: 'qms_parameters_v1',
  NOTIFICATIONS: 'qms_notifications_v1',
};

export const QmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  const [defectReports, setDefectReports] = useState<DefectReport[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.REPORTS);
    return saved ? JSON.parse(saved) : INITIAL_DEFECT_REPORTS;
  });

  const [selectedReport, setSelectedReport] = useState<DefectReport | null>(null);

  const [traceabilityLots, setTraceabilityLots] = useState<TraceabilityLot[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LOTS);
    return saved ? JSON.parse(saved) : INITIAL_TRACEABILITY_LOTS;
  });

  const [defectStandards, setDefectStandards] = useState<DefectStandard[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.STANDARDS);
    return saved ? JSON.parse(saved) : INITIAL_DEFECT_STANDARDS;
  });

  const [inspections, setInspections] = useState<InspectionRecord[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.INSPECTIONS);
    return saved ? JSON.parse(saved) : INITIAL_INSPECTIONS;
  });

  const [assemblyTests, setAssemblyTests] = useState<AssemblyVerification[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ASSEMBLY_TESTS);
    return saved ? JSON.parse(saved) : INITIAL_ASSEMBLY_TESTS;
  });

  const [fiveWhyList, setFiveWhyList] = useState<FiveWhyItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.FIVE_WHY);
    return saved ? JSON.parse(saved) : INITIAL_FIVE_WHY;
  });

  const [fishbone, setFishbone] = useState<FishboneData>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.FISHBONE);
    return saved ? JSON.parse(saved) : INITIAL_FISHBONE;
  });

  const [capaList, setCapaList] = useState<Capa8D[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CAPA);
    return saved ? JSON.parse(saved) : INITIAL_CAPA_8D;
  });

  const [selected8D, setSelected8D] = useState<Capa8D | null>(null);

  const [parameters, setParameters] = useState<InjectionParameter[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PARAMS);
    return saved ? JSON.parse(saved) : INITIAL_PARAMETERS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(defectReports));
  }, [defectReports]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LOTS, JSON.stringify(traceabilityLots));
  }, [traceabilityLots]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STANDARDS, JSON.stringify(defectStandards));
  }, [defectStandards]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INSPECTIONS, JSON.stringify(inspections));
  }, [inspections]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ASSEMBLY_TESTS, JSON.stringify(assemblyTests));
  }, [assemblyTests]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FIVE_WHY, JSON.stringify(fiveWhyList));
  }, [fiveWhyList]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FISHBONE, JSON.stringify(fishbone));
  }, [fishbone]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CAPA, JSON.stringify(capaList));
  }, [capaList]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PARAMS, JSON.stringify(parameters));
  }, [parameters]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  // Actions
  const addDefectReport = (reportData: Omit<DefectReport, 'id' | 'history'>): DefectReport => {
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const count = defectReports.length + 1;
    const newId = `QA-${dateStr}-${String(count).padStart(3, '0')}`;

    const newReport: DefectReport = {
      ...reportData,
      id: newId,
      history: [
        {
          timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
          operator: reportData.reportedBy || '品保通報員',
          action: '建立品質異常單 (F01)',
          comment: `異常數量 ${reportData.defectQty} pcs，不良率 ${reportData.defectRate}%，指派部門：${reportData.assignedDept}`,
        },
      ],
    };

    setDefectReports((prev) => [newReport, ...prev]);

    // Dispatch notification
    const newNotif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      type: 'ALERT',
      title: `新增異常通報 ${newId}`,
      message: `${newReport.partNumber} ${newReport.defectLocation} 不良數量 ${newReport.defectQty} pcs，責任人 ${newReport.responsiblePerson}`,
      timestamp: '剛剛',
      read: false,
      linkedId: newId,
    };
    setNotifications((prev) => [newNotif, ...prev]);

    return newReport;
  };

  const updateReportStatus = (id: string, status: DefectReport['status'], note: string) => {
    setDefectReports((prev) =>
      prev.map((rep) => {
        if (rep.id !== id) return rep;
        return {
          ...rep,
          status,
          history: [
            ...rep.history,
            {
              timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
              operator: '目前登入者 (品保/主管)',
              action: `狀態變更為：${status}`,
              comment: note,
            },
          ],
        };
      })
    );
  };

  const updateLotQuarantine = (lotNumber: string, status: TraceabilityLot['quarantineStatus'], notes: string) => {
    setTraceabilityLots((prev) =>
      prev.map((lot) => {
        if (lot.lotNumber !== lotNumber) return lot;
        return {
          ...lot,
          quarantineStatus: status,
          actionsTaken: `${lot.actionsTaken} [${new Date().toISOString().slice(0, 10)}] 狀態更新為 ${status}: ${notes}`,
        };
      })
    );
  };

  const addDefectStandard = (std: Omit<DefectStandard, 'id'>) => {
    const newStd: DefectStandard = {
      ...std,
      id: `STD-${Date.now().toString().slice(-4)}`,
    };
    setDefectStandards((prev) => [newStd, ...prev]);
  };

  const addInspectionRecord = (record: Omit<InspectionRecord, 'id'>) => {
    const newRecord: InspectionRecord = {
      ...record,
      id: `INSP-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(inspections.length + 1).padStart(2, '0')}`,
    };
    setInspections((prev) => [newRecord, ...prev]);
  };

  const addAssemblyTest = (test: Omit<AssemblyVerification, 'id'>) => {
    const newTest: AssemblyVerification = {
      ...test,
      id: `ASM-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${String(assemblyTests.length + 1).padStart(2, '0')}`,
    };
    setAssemblyTests((prev) => [newTest, ...prev]);
  };

  const updateFiveWhy = (index: number, answer: string) => {
    setFiveWhyList((prev) => {
      const copy = [...prev];
      if (copy[index]) {
        copy[index] = { ...copy[index], answer };
      }
      return copy;
    });
  };

  const addFishboneCause = (category: keyof FishboneData, cause: string) => {
    if (!cause.trim()) return;
    setFishbone((prev) => ({
      ...prev,
      [category]: [...prev[category], cause.trim()],
    }));
  };

  const update8D = (id: string, updates: Partial<Capa8D>) => {
    setCapaList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  // Rule: 未完成效果驗證的案件不得直接結案！
  const canClose8D = (capa: Capa8D): { canClose: boolean; reason?: string } => {
    if (!capa.d6IsEffective) {
      return {
        canClose: false,
        reason: '依功能規格書驗收標準：D6 改善效果尚未驗證有效，不得直接結案！請先於 F05 完成組裝推拉力驗證。',
      };
    }
    if (!capa.d3QuarantineVerified) {
      return {
        canClose: false,
        reason: 'D3 庫存隔離尚未全數落實確認。',
      };
    }
    if (!capa.d7SopUpdated) {
      return {
        canClose: false,
        reason: 'D7 防再發標準化 (SOP更新) 尚未完成。',
      };
    }
    return { canClose: true };
  };

  const addParameterRecord = (param: Omit<InjectionParameter, 'id'>) => {
    const newParam: InjectionParameter = {
      ...param,
      id: `PARAM-${Date.now().toString().slice(-4)}`,
    };
    // set previous active to PREVIOUS
    setParameters((prev) => [
      newParam,
      ...prev.map((p) => ({ ...p, status: 'PREVIOUS' as const })),
    ]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const resetToDefaultData = () => {
    setDefectReports(INITIAL_DEFECT_REPORTS);
    setTraceabilityLots(INITIAL_TRACEABILITY_LOTS);
    setDefectStandards(INITIAL_DEFECT_STANDARDS);
    setInspections(INITIAL_INSPECTIONS);
    setAssemblyTests(INITIAL_ASSEMBLY_TESTS);
    setFiveWhyList(INITIAL_FIVE_WHY);
    setFishbone(INITIAL_FISHBONE);
    setCapaList(INITIAL_CAPA_8D);
    setParameters(INITIAL_PARAMETERS);
    setNotifications(INITIAL_NOTIFICATIONS);
    Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
  };

  const exportDatabaseJson = () => {
    const data = {
      defectReports,
      traceabilityLots,
      defectStandards,
      inspections,
      assemblyTests,
      fiveWhyList,
      fishbone,
      capaList,
      parameters,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Injection_Molding_QMS_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // KPI Calculations based on specification:
  // 拉傷不良率 = 拉傷不良數 ÷ 檢驗總數 × 100%
  const totalInspected = defectReports.reduce((acc, cur) => acc + cur.inspectedQty, 0);
  const totalDefects = defectReports.reduce((acc, cur) => acc + cur.defectQty, 0);
  const scuffDefectRate = totalInspected > 0 ? Number(((totalDefects / totalInspected) * 100).toFixed(2)) : 0.42;

  const baselineDefectRate = 4.80;
  const defectReductionPct = Number((((baselineDefectRate - scuffDefectRate) / baselineDefectRate) * 100).toFixed(1));

  // 客戶組裝異常件數: 當月確認件數 (status !== Closed and discoveryStage === '客戶組裝線反饋')
  const customerComplaintCount = defectReports.filter(
    (r) => r.discoveryStage === '客戶組裝線反饋' && r.status !== 'Closed'
  ).length;
  const baselineComplaintCount = 8;

  // 改善準時完成率 = 期限內完成對策數 ÷ 到期對策數 × 100%
  const completedCapa = capaList.filter((c) => c.d8Status === 'CLOSED').length;
  const totalCapa = capaList.length;
  const capaOnTimeRate = totalCapa > 0 ? Number(((completedCapa / totalCapa) * 100).toFixed(1)) : 96.8;

  // 檢驗紀錄完整率
  const inspectionCompletenessRate = 99.2;
  const recurrentComplaints = 0; // 0 target
  const aiDetectionAccuracy = 96.5;

  return (
    <QmsContext.Provider
      value={{
        activeTab,
        setActiveTab,
        defectReports,
        selectedReport,
        setSelectedReport,
        addDefectReport,
        updateReportStatus,
        traceabilityLots,
        updateLotQuarantine,
        defectStandards,
        addDefectStandard,
        inspections,
        addInspectionRecord,
        assemblyTests,
        addAssemblyTest,
        fiveWhyList,
        updateFiveWhy,
        fishbone,
        addFishboneCause,
        capaList,
        selected8D,
        setSelected8D,
        update8D,
        canClose8D,
        parameters,
        addParameterRecord,
        notifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        kpiStats: {
          scuffDefectRate,
          baselineDefectRate,
          defectReductionPct,
          customerComplaintCount,
          baselineComplaintCount,
          capaOnTimeRate,
          inspectionCompletenessRate,
          recurrentComplaints,
          aiDetectionAccuracy,
        },
        resetToDefaultData,
        exportDatabaseJson,
      }}
    >
      {children}
    </QmsContext.Provider>
  );
};

export const useQms = () => {
  const context = useContext(QmsContext);
  if (!context) {
    throw new Error('useQms must be used within a QmsProvider');
  }
  return context;
};
