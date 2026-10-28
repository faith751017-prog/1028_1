import {
  DefectReport,
  TraceabilityLot,
  DefectStandard,
  InspectionRecord,
  AssemblyVerification,
  FishboneData,
  FiveWhyItem,
  Capa8D,
  InjectionParameter,
  NotificationItem,
} from '../types/qms';

export const INITIAL_DEFECT_REPORTS: DefectReport[] = [
  {
    id: 'QA-20261026-001',
    customerName: '信邦精密車用電子 (Sinbon Mobility)',
    partNumber: 'PRT-2026-X88',
    partName: '智能儀表控制模組-公扣導向扣件 (Upper Clamping Shell)',
    workOrder: 'WO-202610-041',
    lotNumber: 'LOT-20261024-B2',
    machineId: '180T-02 (住友全電動射出機)',
    moldId: 'MD-2024-A08',
    cavityNumber: 'Cavity #2',
    defectLocation: '卡扣嵌合導向滑塊外側壁 (Snap-fit rib flank)',
    defectQty: 38,
    inspectedQty: 800,
    defectRate: 4.75,
    severity: 'Severe',
    discoveryStage: '客戶組裝線反饋',
    discoveryDate: '2026-10-25 14:30',
    reportedBy: '林品保 (QA Engineer)',
    assignedDept: '模具修造組',
    responsiblePerson: '張志豪 (模具主任) / 陳建成 (射出課長)',
    targetTempDate: '2026-10-26 12:00',
    targetPermDate: '2026-11-01 17:00',
    status: 'CorrectiveAction',
    photoUrl: '/src/assets/images/scuff_defect_part_1793073211872.jpg',
    description: '客戶自動化組裝機械臂在下壓外殼嵌合時發生扭矩異常警報 (Torque Overload >45N)，目視發現卡扣滑道側壁有嚴重縱向拖花拉傷，塑料脫屑掉落於電路板上導致組裝卡滯中斷。',
    history: [
      {
        timestamp: '2026-10-25 14:30',
        operator: '林品保',
        action: '建立異常通報 (F01)',
        comment: '接獲客戶端品保信件反饋組裝卡死，確認首批 38 件不良並拍照存證。'
      },
      {
        timestamp: '2026-10-25 15:40',
        operator: '王生管',
        action: '發起批次追溯與隔離 (F02)',
        comment: '追溯工單 WO-202610-041 同批 2,400 件，倉庫成品 1,600 件已貼紅標隔離封存。'
      },
      {
        timestamp: '2026-10-26 09:15',
        operator: '陳建成 (射出課長)',
        action: '完成 5WHY 與魚骨圖分析 (F06)',
        comment: '確立根本原因：公模仁拔模斜度僅 0.8° 且保壓過高 (110MPa)，脫模拉傷。'
      },
      {
        timestamp: '2026-10-26 11:30',
        operator: '張志豪 (模具主任)',
        action: '擬定 8D 永久對策 (F07)',
        comment: '下模修改拔模斜度至 1.8°，以 1500# 鑽石膏依出模方向鏡面拋光，並重設射出保壓段速。'
      }
    ]
  },
  {
    id: 'QA-20261026-002',
    customerName: '光寶智聯網科技 (LiteOn IoT)',
    partNumber: 'PRT-2026-M12',
    partName: '工業網關防護滑動底座 (Gateway Sliding Tray)',
    workOrder: 'WO-202610-043',
    lotNumber: 'LOT-20261025-A1',
    machineId: '150T-04 (東芝液壓伺服機)',
    moldId: 'MD-2023-F02',
    cavityNumber: 'Cavity #1',
    defectLocation: '導軌定位卡槽內部 (Rail Alignment Slot)',
    defectQty: 14,
    inspectedQty: 500,
    defectRate: 2.80,
    severity: 'Moderate',
    discoveryStage: '製程巡檢',
    discoveryDate: '2026-10-26 08:45',
    reportedBy: '黃巡檢員 (IPQC)',
    assignedDept: '射出成形課',
    responsiblePerson: '劉育明 (調機技師)',
    targetTempDate: '2026-10-26 18:00',
    targetPermDate: '2026-11-02 18:00',
    status: 'Analyzing',
    photoUrl: '/src/assets/images/scuff_defect_part_1793073211872.jpg',
    description: '巡檢第 3 批樣品時，發現導軌側壁有些微白化擦痕，組裝手感略緊，推力接近規格上限 24N (上限為 25N)。',
    history: [
      {
        timestamp: '2026-10-26 08:45',
        operator: '黃巡檢員',
        action: '開立巡檢異常單',
        comment: '巡檢抽驗 10 pcs 中有 2 pcs 滑槽擦傷，通知射出機台暫停確認頂出狀況。'
      }
    ]
  },
  {
    id: 'QA-20261024-001',
    customerName: '鴻海精密車載組件 (Foxconn Auto)',
    partNumber: 'PRT-2026-K05',
    partName: '車門控制器嵌合外框 (Door ECU Bezel)',
    workOrder: 'WO-202610-038',
    lotNumber: 'LOT-20261023-C3',
    machineId: '250T-01 (發那科全電射出機)',
    moldId: 'MD-2024-B15',
    cavityNumber: 'Cavity #4',
    defectLocation: '頂針外周與側壁嵌合轉角',
    defectQty: 5,
    inspectedQty: 1200,
    defectRate: 0.42,
    severity: 'Minor',
    discoveryStage: '首件檢驗',
    discoveryDate: '2026-10-24 07:30',
    reportedBy: '蘇檢驗員 (FQC)',
    assignedDept: '模具修造組',
    responsiblePerson: '周維修 (模修技師)',
    targetTempDate: '2026-10-24 16:00',
    targetPermDate: '2026-10-28 17:00',
    status: 'Closed',
    photoUrl: '/src/assets/images/golden_limit_sample_1793073214092.jpg',
    description: '首件開模時頂針微凸 0.04mm，導致成型品脫模時刮傷定位肋條，經拆卸頂針研磨清潔後復模，已驗證合格結案。',
    history: [
      {
        timestamp: '2026-10-24 07:30',
        operator: '蘇檢驗員',
        action: '首件不良通報',
        comment: '頂針微刮，開模調整頂針板行程。'
      },
      {
        timestamp: '2026-10-24 10:15',
        operator: '周維修',
        action: '模具修磨',
        comment: '頂針研磨切齊分模面，重新試模 10 pcs 嵌合正常，品保判定合格。'
      },
      {
        timestamp: '2026-10-24 14:00',
        operator: '林品保主管',
        action: '結案審核 (F07)',
        comment: '首件及連測 50 件尺寸符合標準，組裝力 18.5N，正式結案放行。'
      }
    ]
  }
];

export const INITIAL_TRACEABILITY_LOTS: TraceabilityLot[] = [
  {
    lotNumber: 'LOT-20261024-B2',
    workOrder: 'WO-202610-041',
    partNumber: 'PRT-2026-X88',
    productionDate: '2026-10-24 ~ 10-25 (夜班)',
    machineId: '180T-02',
    moldId: 'MD-2024-A08',
    rawMaterial: '奇美 PA-757 阻燃 ABS (黑色)',
    materialLot: 'CHIMEI-202610-M99 (含水率 0.02%)',
    totalProducedQty: 2400,
    quarantineQty: 1600,
    quarantineStatus: 'QUARANTINED',
    shippedQty: 800,
    customerName: '信邦精密車用電子',
    riskEvaluation: 'HIGH',
    quarantineLocation: '廠內 A-03 號品質待隔離區 (貼紅標封存)',
    actionsTaken: '已通知客戶暫停生產線投料；現場 1,600 pcs 全數逐件全檢，挑出拉傷 76 pcs 報廢，其餘待 8D 改善後進行換貨。'
  },
  {
    lotNumber: 'LOT-20261025-A1',
    workOrder: 'WO-202610-043',
    partNumber: 'PRT-2026-M12',
    productionDate: '2026-10-25 ~ 10-26 (早班)',
    machineId: '150T-04',
    moldId: 'MD-2023-F02',
    rawMaterial: '台化 PC/ABS AC2300',
    materialLot: 'FCFC-2026-0814',
    totalProducedQty: 1200,
    quarantineQty: 600,
    quarantineStatus: 'QUARANTINED',
    shippedQty: 0,
    customerName: '光寶智聯網科技',
    riskEvaluation: 'MEDIUM',
    quarantineLocation: 'B棟生管暫存區 #07',
    actionsTaken: '尚未出貨；生產線正進行參數微調，首批 600 件抽驗比對限度樣品中。'
  },
  {
    lotNumber: 'LOT-20261023-C3',
    workOrder: 'WO-202610-038',
    partNumber: 'PRT-2026-K05',
    productionDate: '2026-10-23',
    machineId: '250T-01',
    moldId: 'MD-2024-B15',
    rawMaterial: 'SABIC Lexan 940A PC',
    materialLot: 'SABIC-2026-P03',
    totalProducedQty: 3000,
    quarantineQty: 0,
    quarantineStatus: 'RELEASED',
    shippedQty: 3000,
    customerName: '鴻海精密車載組件',
    riskEvaluation: 'LOW',
    quarantineLocation: '已放行出貨',
    actionsTaken: '模具頂針修整後全檢放行，客戶反饋組裝良率 100%。'
  },
  {
    lotNumber: 'LOT-20261026-X01',
    workOrder: 'WO-202610-048',
    partNumber: 'PRT-2026-X88',
    productionDate: '2026-10-26 (試模)',
    machineId: '180T-02',
    moldId: 'MD-2024-A08',
    rawMaterial: '奇美 PA-757 阻燃 ABS',
    materialLot: 'CHIMEI-202610-M99',
    totalProducedQty: 200,
    quarantineQty: 200,
    quarantineStatus: 'PENDING_CONFIRMATION',
    shippedQty: 0,
    customerName: '信邦精密車用電子',
    riskEvaluation: 'PENDING_CONFIRMATION',
    quarantineLocation: '模具驗證專用待驗區',
    actionsTaken: '依照驗收規範：缺少來源組裝驗證數據前標註「待確認」，禁止自動視為安全批次。'
  }
];

export const INITIAL_DEFECT_STANDARDS: DefectStandard[] = [
  {
    id: 'STD-001',
    code: 'STD-SCR-01',
    title: '卡扣嵌合導向面拉傷限度標準 (Snap-fit Rib Galling Criteria)',
    defectCategory: '脫模拉傷 (Ejection Galling / Drag marks)',
    locationArea: '卡扣外側滑塊接觸面 (長度 15mm 區域)',
    acceptanceCriteria: '無肉眼可見連續縱向拉痕，表面粗糙度 Ra ≤ 0.4μm，允許極輕微無手感的脫模氣印 (< 1.5mm)。',
    rejectionCriteria: '產生任一條手感可察覺之縱向刮痕、塑料撕裂白化、長度 > 2.0mm 或造成組裝嵌合力 > 25N。',
    sampleLevel: 'Golden Sample (OK)',
    version: 'Rev 2.1',
    approvedByQA: '林品保副理 (2026-10-20)',
    approvedByEng: '許工程處長 (2026-10-20)',
    approvalDate: '2026-10-20',
    imageUrl: '/src/assets/images/golden_limit_sample_1793073214092.jpg',
    notes: '適用於車載儀表卡扣件，此處為客戶自動化機械臂壓入滑道，拉傷極易引發推力過載警報。'
  },
  {
    id: 'STD-002',
    code: 'STD-SCR-02',
    title: '拒收標準樣品：卡扣嚴重複合拉痕與脫屑 (Reject Boundary Sample)',
    defectCategory: '嚴重咬模拉傷 (Severe Cavity Scuff)',
    locationArea: '卡扣倒鉤主受力面及背部滑槽',
    acceptanceCriteria: '不可接受。',
    rejectionCriteria: '縱向拖花深度 > 0.05mm，伴隨刮削塑料顆粒或卡扣根部應力發白。直接判定 NG 拒收。',
    sampleLevel: 'Reject Sample (NG)',
    version: 'Rev 2.0',
    approvedByQA: '林品保副理',
    approvedByEng: '許工程處長',
    approvalDate: '2026-09-15',
    imageUrl: '/src/assets/images/scuff_defect_part_1793073211872.jpg',
    notes: '若首件或巡檢查獲此特徵，必須立即停機通報模具組拆模檢查拋光紋理與拔模斜度。'
  },
  {
    id: 'STD-003',
    code: 'STD-SCR-03',
    title: '模具型腔及頂針配合基準 (Tooling Cavity & Pin Maintenance Spec)',
    defectCategory: '模具機械咬模 (Tooling Galling)',
    locationArea: '動模仁入子與頂針沉孔 (Mold Core Insert & Ejector Pin)',
    acceptanceCriteria: '拔模斜度 ≥ 1.5°，鏡面拋光方向嚴格沿塑料出模頂出軸向（禁止橫向車削或旋轉研磨紋）。',
    rejectionCriteria: '拔模斜度 < 1.0°，型腔表面 Ra > 0.8μm，頂針端面高出分型面 > 0.02mm。',
    sampleLevel: 'Golden Sample (OK)',
    version: 'Rev 1.3',
    approvedByQA: '林品保副理',
    approvedByEng: '張志豪模具主任',
    approvalDate: '2026-08-10',
    imageUrl: '/src/assets/images/mold_core_cavity_1793073212266.jpg',
    notes: '模具每生產 30,000 模次必須進行入子超音波清洗及 TiN 鍍膜檢查。'
  }
];

export const INITIAL_INSPECTIONS: InspectionRecord[] = [
  {
    id: 'INSP-20261026-01',
    date: '2026-10-26',
    time: '08:00',
    station: 'FirstArticle',
    partNumber: 'PRT-2026-X88',
    workOrder: 'WO-202610-048',
    lotNumber: 'LOT-20261026-X01',
    machineId: '180T-02',
    sampleSize: 5,
    scuffStatus: 'OK',
    criticalDimensionMm: 2.41,
    dimensionStatus: 'OK',
    inspector: '蘇品檢',
    result: 'PASS',
    actionNote: '模具拔模角修正為 1.8° 後之試模首件，外觀滑順無拖花拉傷。'
  },
  {
    id: 'INSP-20261025-04',
    date: '2026-10-25',
    time: '14:00',
    station: 'Patrol',
    partNumber: 'PRT-2026-X88',
    workOrder: 'WO-202610-041',
    lotNumber: 'LOT-20261024-B2',
    machineId: '180T-02',
    sampleSize: 10,
    scuffStatus: 'NG',
    criticalDimensionMm: 2.47,
    dimensionStatus: 'NG',
    inspector: '黃巡檢',
    result: 'FAIL',
    actionNote: '發現 2 pcs 卡扣壁有明顯深溝拉傷，尺寸偏厚 0.07mm，開立 QA-20261026-001。'
  },
  {
    id: 'INSP-20261025-02',
    date: '2026-10-25',
    time: '10:00',
    station: 'Patrol',
    partNumber: 'PRT-2026-X88',
    workOrder: 'WO-202610-041',
    lotNumber: 'LOT-20261024-B2',
    machineId: '180T-02',
    sampleSize: 10,
    scuffStatus: 'OK',
    criticalDimensionMm: 2.42,
    dimensionStatus: 'OK',
    inspector: '黃巡檢',
    result: 'PASS',
    actionNote: '巡檢正常，抽樣無顯著異常。'
  },
  {
    id: 'INSP-20261024-06',
    date: '2026-10-24',
    time: '18:00',
    station: 'LastPiece',
    partNumber: 'PRT-2026-X88',
    workOrder: 'WO-202610-041',
    lotNumber: 'LOT-20261024-B2',
    machineId: '180T-02',
    sampleSize: 5,
    scuffStatus: 'OK',
    criticalDimensionMm: 2.43,
    dimensionStatus: 'OK',
    inspector: '李品檢',
    result: 'PASS',
    actionNote: '收班末件檢驗合格，模面塗佈防鏽油保護。'
  },
  {
    id: 'INSP-20261024-01',
    date: '2026-10-24',
    time: '16:30',
    station: 'OQC',
    partNumber: 'PRT-2026-K05',
    workOrder: 'WO-202610-038',
    lotNumber: 'LOT-20261023-C3',
    machineId: '250T-01',
    sampleSize: 125,
    scuffStatus: 'OK',
    criticalDimensionMm: 3.12,
    dimensionStatus: 'OK',
    inspector: '蘇品檢',
    result: 'PASS',
    actionNote: '出貨檢驗依 AQL 0.65 抽檢 125 件，外觀及裝配判定 100% 合格，允收出貨。'
  }
];

export const INITIAL_ASSEMBLY_TESTS: AssemblyVerification[] = [
  {
    id: 'ASM-20261026-01',
    testDate: '2026-10-26 10:30',
    partNumber: 'PRT-2026-X88',
    lotNumber: 'LOT-20261026-X01 (模具改善後試模批)',
    sampleQty: 30,
    passedQty: 30,
    passRate: 100,
    insertionForceN: 19.2, // Spec: 20±5N (15~25N)
    pullForceN: 41.5, // Spec: >=35N
    assemblySmoothness: '極佳順暢',
    debrisObserved: false,
    tester: '陳驗證員 (Quality Lab)',
    testEquipment: 'Mark-10 數位高精度推拉力測試機 (校正編號: EQ-CAL-202604)',
    conclusion: 'PASS',
    feedbackToCAPA: '永久對策有效：拔模斜度由 0.8° 改為 1.8° 且保壓降為 85MPa 後，裝配嵌合推力均勻集中在 18.5~20.4N，手感順暢，無任何摩擦刮屑。'
  },
  {
    id: 'ASM-20261025-01',
    testDate: '2026-10-25 15:10',
    partNumber: 'PRT-2026-X88',
    lotNumber: 'LOT-20261024-B2 (客訴異常批)',
    sampleQty: 25,
    passedQty: 9,
    passRate: 36.0,
    insertionForceN: 48.6, // FAILED (>25N)
    pullForceN: 31.0, // FAILED (<35N 塑料拉裂)
    assemblySmoothness: '嚴重卡滯拉傷',
    debrisObserved: true,
    tester: '陳驗證員 (Quality Lab)',
    testEquipment: 'Mark-10 數位推拉力計',
    conclusion: 'FAIL',
    feedbackToCAPA: '組裝卡扣嚴重阻滯，推力峰值高達 54N，直接造成自動化機械臂超負載停機，並有 0.1mm 黑塑料碎屑剝落。'
  }
];

export const INITIAL_FIVE_WHY: FiveWhyItem[] = [
  {
    level: 1,
    question: 'Why 1: 為什麼客戶端自動化組裝線會卡死停機？',
    answer: '因為產品公母扣件嵌合時摩擦阻力超標 (>45N)，卡扣導向側壁發生嚴重拉傷拖花。',
    category: 'Occurrence'
  },
  {
    level: 2,
    question: 'Why 2: 為什麼卡扣導向側壁會產生深層縱向拉傷？',
    answer: '因為射出成形脫模頂出瞬間，卡扣側壁與模仁產生過大之剪切摩擦咬合。',
    category: 'Occurrence'
  },
  {
    level: 3,
    question: 'Why 3: 為什麼脫模頂出時剪切摩擦力如此巨大？',
    answer: '因為(1)公模仁卡扣側壁拔模斜度僅有 0.8° (不足規範 1.5°)，且(2)射出保壓過高 (110MPa) 導致膠料緻密包緊力過強。',
    category: 'Occurrence'
  },
  {
    level: 4,
    question: 'Why 4: 為什麼模具最初設計拔模角不足且現場使用過高保壓？',
    answer: '產品外觀結構緊湊未做 DFM 充分檢討，射出技術員為消除外觀縮水私自調高第二段保壓，未評估脫模包緊力。',
    category: 'Occurrence'
  },
  {
    level: 5,
    question: 'Why 5: 為什麼製程巡檢未能攔截此拉傷不良品導致流出？ (流出根本原因)',
    answer: '巡檢標準僅有首件全檢，每2小時巡檢僅抽驗常規尺寸，未定義卡扣側壁鏡面外觀限度樣品及組裝推拉力驗證項目。',
    category: 'Escape'
  }
];

export const INITIAL_FISHBONE: FishboneData = {
  man: [
    '調機技師為解縮水私自提升第二段保壓 (+15%)',
    '巡檢員對微微拉傷未依限度標準嚴格攔截',
    '換模組裝未徹底清潔頂針油垢'
  ],
  machine: [
    '射出機台頂出板前後動作略微不同步 (偏心 0.03mm)',
    '公模冷卻水路局部水垢阻塞，溫差達 18°C',
    '頂針端面磨耗產生 0.04mm 高低差'
  ],
  material: [
    'ABS 膠料高批次間熔融指數 (MI) 些微波動',
    '次料添加比例超過標準 15% 導致韌性降低',
    '烘料溫度不足 (實際 75°C < 規範 85°C)'
  ],
  method: [
    '模仁拔模斜度僅 0.8°，未達深腔脫模標準 1.5°~2.0°',
    '模具型腔拋光紋路與頂出方向垂直 (逆紋咬模)',
    '缺乏卡扣嵌合推拉力巡檢量測 SOP'
  ],
  environment: [
    '夏季模具表面易結露，造成瞬間脫模排氣不良',
    '成型車間環境溫濕度劇烈變化影響冷卻速率'
  ],
  measurement: [
    '原檢驗指導書未納入「卡扣手感與拉傷」限度樣品',
    '缺乏線上即時推拉力計夾具驗證',
    '卡尺量測受拉傷毛邊影響讀數失真'
  ]
};

export const INITIAL_CAPA_8D: Capa8D[] = [
  {
    id: '8D-202610-001',
    ncrId: 'QA-20261026-001',
    title: 'PRT-2026-X88 卡扣組裝拉傷導致客戶裝配卡滯 8D 改善專案',
    d1TeamLeader: '陳建成 (射出課長)',
    d1Members: ['張志豪 (模具主任)', '林品保 (品保工程師)', '王生管 (生管主任)', '許工程 (產品開發處長)'],
    d2ProblemDescription: '信邦精密於 2026-10-25 在自動組裝機台反饋批號 LOT-20261024-B2 產品嵌合時推力過大 (>45N) 導致停機，不良率達 4.75% (38/800)。檢驗發現卡扣側壁有嚴重縱向拉痕。',
    d3ContainmentActions: '1. 立即暫停出貨，發出品質警報。\n2. 廠內庫存 1,600 件已貼紅標移入隔離區。\n3. 客戶端剩餘 762 件由我司品保駐廠人員 100% 全檢過濾。',
    d3QuarantineVerified: true,
    d4OccurRootCause: '模仁卡扣側壁拔模斜度僅 0.8°，且現場為解縮水將第二段保壓提升至 110MPa，塑件冷卻後緊包模仁，在頂出瞬間產生強烈剪切拉傷。',
    d4EscapeRootCause: '現行 IPQC 巡檢表僅要求外觀總覽，缺乏卡扣微觀拉傷限度樣品對照，亦無組裝推力日常點檢項目。',
    d5PermanentActions: '1. 【模具改造】修改動模仁卡扣入子，拔模斜度由 0.8° 加大至 1.8°，以 1500# 鑽石研磨膏沿出模方向超音波鏡面拋光，並實施表面 TiN 耐磨防咬鍍膜。\n2. 【成型標準化】重新設定射出工藝視窗：保壓由 110MPa 調降至 85MPa，冷卻定型時間由 11s 延長至 13.5s，採兩段慢速頂出 (18mm/s)。\n3. 【檢驗升級】制定 STD-SCR-01 數位限度樣品，巡檢每班次抽 10 件實施 Mark-10 推力檢驗 (規格 20±5N)。',
    d6ExecutionEvidence: '模具修改工單 MO-2026-881 已於 10-26 06:00 完成，試模 LOT-20261026-X01 經組裝驗證 (ASM-20261026-01) 30 件全部合格 (推力 19.2N)，無拉傷痕跡。',
    d6AssemblyTestId: 'ASM-20261026-01',
    d6VerifiedDate: '2026-10-26 11:00',
    d6IsEffective: true,
    d7PreventiveStandardization: '1. 更新 SOP-INJ-882《精密卡扣件射出工藝與調機規範》\n2. 修訂 DFM 模具設計審查 Check-List：深筋與卡扣拔模角強制 ≥ 1.5°\n3. 導入 AI 視覺輔助檢驗系統於巡檢站，即時偵測拉痕。',
    d7SopUpdated: true,
    d7FmeaUpdated: true,
    d8Champion: '許工程處長 / 總經理核准',
    d8SignOffDate: '2026-10-26 16:30',
    d8Status: 'CLOSED',
    dueDate: '2026-11-01',
    completedDate: '2026-10-26'
  }
];

export const INITIAL_PARAMETERS: InjectionParameter[] = [
  {
    id: 'PARAM-AFTER-01',
    moldId: 'MD-2024-A08',
    machineId: '180T-02',
    changeDate: '2026-10-26 09:00',
    engineer: '陳建成 (射出課長)',
    reason: '8D-202610-001 改善後定案最佳化工藝參數 (消弭拉傷包緊力)',
    status: 'ACTIVE',
    barrelTempC: { zone1: 220, zone2: 235, zone3: 240, nozzle: 245 },
    moldTempC: { core: 55, cavity: 50 }, // 公模提升至 55°C，平衡溫差
    injectionPressureMpa: 82,
    injectionSpeedMmS: 55,
    packPressureMpa: { stage1: 90, stage2: 85 }, // 由 110 降至 85MPa
    packTimeS: 3.2,
    coolingTimeS: 13.5, // 延長定型
    ejectDelayS: 1.5,
    ejectSpeedMmS: 18, // 兩段慢速頂出
    moldDraftModification: '卡扣側壁拔模斜度由 0.8° 改為 1.8°，沿脫模方向超音波鏡面拋光 (Ra 0.05μm) 並做 TiN 鍍膜',
    moldPolishNotes: '1500# 鑽石膏金相拋光，確認無逆向車削痕。'
  },
  {
    id: 'PARAM-BEFORE-01',
    moldId: 'MD-2024-A08',
    machineId: '180T-02',
    changeDate: '2026-10-24 08:00',
    engineer: '王副技師',
    reason: '原始生產參數 (發生拉傷異常批 LOT-20261024-B2)',
    status: 'PREVIOUS',
    barrelTempC: { zone1: 220, zone2: 235, zone3: 245, nozzle: 250 },
    moldTempC: { core: 42, cavity: 60 }, // 溫差高達 18°C 造成嚴重複雜應力
    injectionPressureMpa: 95,
    injectionSpeedMmS: 65,
    packPressureMpa: { stage1: 105, stage2: 110 }, // 過高保壓造成強行咬模
    packTimeS: 4.5,
    coolingTimeS: 11.0,
    ejectDelayS: 0.5,
    ejectSpeedMmS: 45, // 快速頂出導致瞬間剪切拉傷
    moldDraftModification: '原始模仁拔模斜度 0.8°，手工旋轉砂輪打磨，存在逆紋。',
    moldPolishNotes: '已發現局部微咬模痕跡但未排修。'
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'NOTIF-01',
    type: 'QUARANTINE',
    title: '批次隔離警戒中',
    message: '工單 WO-202610-041 (LOT-20261024-B2) 1,600 件仍在 A-03 區隔離，禁止未簽核前出庫！',
    timestamp: '10 分鐘前',
    read: false,
    linkedId: 'LOT-20261024-B2'
  },
  {
    id: 'NOTIF-02',
    type: 'ALERT',
    title: '新品質異常通報 (F01)',
    message: 'PRT-2026-M12 巡檢發現導軌擦痕 (QA-20261026-002)，24H 臨時對策倒數中。',
    timestamp: '1 小時前',
    read: false,
    linkedId: 'QA-20261026-002'
  },
  {
    id: 'NOTIF-03',
    type: 'PASS',
    title: '組裝驗證通過 (F05)',
    message: '試模批 LOT-20261026-X01 組裝推力測試 100% 合格 (19.2N)，8D-202610-001 已核准結案。',
    timestamp: '2 小時前',
    read: true,
    linkedId: '8D-202610-001'
  }
];
