export interface ElementInfo {
  Z: number;
  symbol: string;
  nameVi: string;
  nameIUPAC: string;
}

export interface KnownIsotope {
  Z: number;
  N: number;
  A: number;
  symbol: string;
  name: string;
  massU: number; // Khối lượng hạt nhân m_X (amu) chuẩn bài tập SGK
  isStable: boolean;
  decayMode: 'stable' | 'alpha' | 'beta-' | 'beta+';
  halfLife: string;
  halfLifeSeconds?: number;
  description: string;
  isPreset?: boolean;
}

export const PHYSICAL_CONSTANTS = {
  m_p: 1.00728, // amu (chuẩn SGK Vật lý 12)
  m_n: 1.00866, // amu (chuẩn SGK Vật lý 12)
  m_e: 0.0005486, // amu
  u_to_MeV: 931.5, // 1 amu.c^2 = 931.5 MeV
  u_to_kg: 1.66055e-27, // kg
  MeV_to_J: 1.6e-13, // J
  N_A: 6.022e23, // mol^-1
  Ci_to_Bq: 3.7e10, // 1 Ci = 3.7 * 10^10 Bq
  r0_fm: 1.2, // R = 1.2 * A^(1/3) fm
};

export const ELEMENTS: Record<number, ElementInfo> = {
  0: { Z: 0, symbol: 'n', nameVi: 'Neutron tự do', nameIUPAC: 'Neutron' },
  1: { Z: 1, symbol: 'H', nameVi: 'Hiđrô', nameIUPAC: 'Hydrogen' },
  2: { Z: 2, symbol: 'He', nameVi: 'Hêli', nameIUPAC: 'Helium' },
  3: { Z: 3, symbol: 'Li', nameVi: 'Liti', nameIUPAC: 'Lithium' },
  4: { Z: 4, symbol: 'Be', nameVi: 'Bêri', nameIUPAC: 'Beryllium' },
  5: { Z: 5, symbol: 'B', nameVi: 'Bo', nameIUPAC: 'Boron' },
  6: { Z: 6, symbol: 'C', nameVi: 'Cacbon', nameIUPAC: 'Carbon' },
  7: { Z: 7, symbol: 'N', nameVi: 'Nitơ', nameIUPAC: 'Nitrogen' },
  8: { Z: 8, symbol: 'O', nameVi: 'Ôxi', nameIUPAC: 'Oxygen' },
  9: { Z: 9, symbol: 'F', nameVi: 'Flo', nameIUPAC: 'Fluorine' },
  10: { Z: 10, symbol: 'Ne', nameVi: 'Nêon', nameIUPAC: 'Neon' },
  11: { Z: 11, symbol: 'Na', nameVi: 'Natri', nameIUPAC: 'Sodium' },
  12: { Z: 12, symbol: 'Mg', nameVi: 'Magiê', nameIUPAC: 'Magnesium' },
  13: { Z: 13, symbol: 'Al', nameVi: 'Nhôm', nameIUPAC: 'Aluminium' },
  14: { Z: 14, symbol: 'Si', nameVi: 'Silic', nameIUPAC: 'Silicon' },
  15: { Z: 15, symbol: 'P', nameVi: 'Phốtpho', nameIUPAC: 'Phosphorus' },
  16: { Z: 16, symbol: 'S', nameVi: 'Lưu huỳnh', nameIUPAC: 'Sulfur' },
  17: { Z: 17, symbol: 'Cl', nameVi: 'Clo', nameIUPAC: 'Chlorine' },
  18: { Z: 18, symbol: 'Ar', nameVi: 'Acgon', nameIUPAC: 'Argon' },
  19: { Z: 19, symbol: 'K', nameVi: 'Kali', nameIUPAC: 'Potassium' },
  20: { Z: 20, symbol: 'Ca', nameVi: 'Canxi', nameIUPAC: 'Calcium' },
  24: { Z: 24, symbol: 'Cr', nameVi: 'Crôm', nameIUPAC: 'Chromium' },
  25: { Z: 25, symbol: 'Mn', nameVi: 'Mangan', nameIUPAC: 'Manganese' },
  26: { Z: 26, symbol: 'Fe', nameVi: 'Sắt', nameIUPAC: 'Iron' },
  27: { Z: 27, symbol: 'Co', nameVi: 'Côban', nameIUPAC: 'Cobalt' },
  28: { Z: 28, symbol: 'Ni', nameVi: 'Niken', nameIUPAC: 'Nickel' },
  29: { Z: 29, symbol: 'Cu', nameVi: 'Đồng', nameIUPAC: 'Copper' },
  30: { Z: 30, symbol: 'Zn', nameVi: 'Kẽm', nameIUPAC: 'Zinc' },
  38: { Z: 38, symbol: 'Sr', nameVi: 'Stronti', nameIUPAC: 'Strontium' },
  53: { Z: 53, symbol: 'I', nameVi: 'Iốt', nameIUPAC: 'Iodine' },
  54: { Z: 54, symbol: 'Xe', nameVi: 'Xênon', nameIUPAC: 'Xenon' },
  55: { Z: 55, symbol: 'Cs', nameVi: 'Xêsi', nameIUPAC: 'Caesium' },
  56: { Z: 56, symbol: 'Ba', nameVi: 'Bari', nameIUPAC: 'Barium' },
  82: { Z: 82, symbol: 'Pb', nameVi: 'Chì', nameIUPAC: 'Lead' },
  83: { Z: 83, symbol: 'Bi', nameVi: 'Bitmut', nameIUPAC: 'Bismuth' },
  84: { Z: 84, symbol: 'Po', nameVi: 'Pôlôni', nameIUPAC: 'Polonium' },
  86: { Z: 86, symbol: 'Rn', nameVi: 'Rađôn', nameIUPAC: 'Radon' },
  88: { Z: 88, symbol: 'Ra', nameVi: 'Rađi', nameIUPAC: 'Radium' },
  90: { Z: 90, symbol: 'Th', nameVi: 'Thôri', nameIUPAC: 'Thorium' },
  92: { Z: 92, symbol: 'U', nameVi: 'Urani', nameIUPAC: 'Uranium' },
  94: { Z: 94, symbol: 'Pu', nameVi: 'Plutôni', nameIUPAC: 'Plutonium' },
};

export function getElementInfo(Z: number): ElementInfo {
  if (ELEMENTS[Z]) return ELEMENTS[Z];
  const fallbackSymbols = [
    'n','H','He','Li','Be','B','C','N','O','F','Ne','Na','Mg','Al','Si','P','S','Cl','Ar','K','Ca',
    'Sc','Ti','V','Cr','Mn','Fe','Co','Ni','Cu','Zn','Ga','Ge','As','Se','Br','Kr','Rb','Sr','Y','Zr',
    'Nb','Mo','Tc','Ru','Rh','Pd','Ag','Cd','In','Sn','Sb','Te','I','Xe','Cs','Ba','La','Ce','Pr','Nd',
    'Pm','Sm','Eu','Gd','Tb','Dy','Ho','Er','Tm','Yb','Lu','Hf','Ta','W','Re','Os','Ir','Pt','Au','Hg',
    'Tl','Pb','Bi','Po','At','Rn','Fr','Ra','Ac','Th','Pa','U','Np','Pu','Am','Cm'
  ];
  const sym = fallbackSymbols[Z] || `E${Z}`;
  return {
    Z,
    symbol: sym,
    nameVi: `Nguyên tố Z=${Z}`,
    nameIUPAC: sym,
  };
}

export const KNOWN_ISOTOPES: KnownIsotope[] = [
  {
    Z: 1,
    N: 0,
    A: 1,
    symbol: 'H',
    name: 'Hydrogen-1 (Protium)',
    massU: 1.00728,
    isStable: true,
    decayMode: 'stable',
    halfLife: 'Bền vững (∞)',
    description: 'Hạt nhân nguyên tử Hydrogen thông thường, chỉ gồm 1 proton duy nhất (không có độ hụt khối).',
    isPreset: true,
  },
  {
    Z: 1,
    N: 1,
    A: 2,
    symbol: 'H',
    name: 'Deuterium (D hay ²H)',
    massU: 2.0136,
    isStable: true,
    decayMode: 'stable',
    halfLife: 'Bền vững (∞)',
    description: 'Đồng vị bền của Hydrogen (hiđrô nặng), nhiên liệu quan trọng trong phản ứng nhiệt hạch.',
    isPreset: true,
  },
  {
    Z: 1,
    N: 2,
    A: 3,
    symbol: 'H',
    name: 'Tritium (T hay ³H)',
    massU: 3.01605,
    isStable: false,
    decayMode: 'beta-',
    halfLife: '12,32 năm',
    halfLifeSeconds: 12.32 * 365.25 * 86400,
    description: 'Đồng vị phóng xạ β⁻ của Hydrogen (hiđrô siêu nặng), dùng trong tổng hợp nhiệt hạch D + T → α + n.',
    isPreset: true,
  },
  {
    Z: 2,
    N: 1,
    A: 3,
    symbol: 'He',
    name: 'Helium-3 (³He)',
    massU: 3.01493,
    isStable: true,
    decayMode: 'stable',
    halfLife: 'Bền vững (∞)',
    description: 'Đồng vị nhẹ bền vững của nguyên tố Helium, sản phẩm từ phân rã β⁻ của Tritium.',
    isPreset: false,
  },
  {
    Z: 2,
    N: 2,
    A: 4,
    symbol: 'He',
    name: 'Helium-4 (Hạt α - ⁴He)',
    massU: 4.0015,
    isStable: true,
    decayMode: 'stable',
    halfLife: 'Bền vững (∞)',
    description: 'Hạt nhân Helium-4 (hạt alpha), có năng lượng liên kết riêng rất lớn (~7,07 MeV/nucleon) so với các hạt nhân nhẹ lân cận.',
    isPreset: true,
  },
  {
    Z: 3,
    N: 3,
    A: 6,
    symbol: 'Li',
    name: 'Lithium-6 (⁶Li)',
    massU: 6.01347,
    isStable: true,
    decayMode: 'stable',
    halfLife: 'Bền vững (∞)',
    description: 'Đồng vị bền của Lithium, dùng để tái tạo Tritium khi bắn phá bằng neutron.',
    isPreset: false,
  },
  {
    Z: 3,
    N: 4,
    A: 7,
    symbol: 'Li',
    name: 'Lithium-7 (⁷Li)',
    massU: 7.01436,
    isStable: true,
    decayMode: 'stable',
    halfLife: 'Bền vững (∞)',
    description: 'Đồng vị phổ biến nhất của Lithium (chiếm 92,4% trong tự nhiên).',
    isPreset: true,
  },
  {
    Z: 6,
    N: 5,
    A: 11,
    symbol: 'C',
    name: 'Carbon-11 (¹¹C)',
    massU: 11.00814,
    isStable: false,
    decayMode: 'beta+',
    halfLife: '20,36 phút',
    halfLifeSeconds: 20.36 * 60,
    description: 'Đồng vị phóng xạ β⁺ điển hình dùng trong chụp cắt lớp phát xạ positron (PET) y học.',
    isPreset: true,
  },
  {
    Z: 6,
    N: 6,
    A: 12,
    symbol: 'C',
    name: 'Carbon-12 (¹²C)',
    massU: 11.99671,
    isStable: true,
    decayMode: 'stable',
    halfLife: 'Bền vững (∞)',
    description: 'Đồng vị chuẩn dùng để định nghĩa đơn vị khối lượng nguyên tử: 1 amu = 1/12 khối lượng nguyên tử ¹²C.',
    isPreset: true,
  },
  {
    Z: 6,
    N: 8,
    A: 14,
    symbol: 'C',
    name: 'Carbon-14 (¹⁴C)',
    massU: 13.99995,
    isStable: false,
    decayMode: 'beta-',
    halfLife: '5730 năm',
    halfLifeSeconds: 5730 * 365.25 * 86400,
    description: 'Đồng vị phóng xạ β⁻ dùng để xác định niên đại cổ vật có nguồn gốc sinh vật (khảo cổ học).',
    isPreset: true,
  },
  {
    Z: 7,
    N: 7,
    A: 14,
    symbol: 'N',
    name: 'Nitrogen-14 (¹⁴N)',
    massU: 13.99923,
    isStable: true,
    decayMode: 'stable',
    halfLife: 'Bền vững (∞)',
    description: 'Hạt nhân bền tạo thành sau khi ¹⁴C phóng xạ β⁻, hoặc dùng trong phản ứng hạt nhân nhân tạo đầu tiên của Rutherford.',
    isPreset: false,
  },
  {
    Z: 8,
    N: 8,
    A: 16,
    symbol: 'O',
    name: 'Oxygen-16 (¹⁶O)',
    massU: 15.99052,
    isStable: true,
    decayMode: 'stable',
    halfLife: 'Bền vững (∞)',
    description: 'Hạt nhân hai lần thần kỳ (Z=8, N=8), rất bền vững trong tự nhiên.',
    isPreset: true,
  },
  {
    Z: 11,
    N: 13,
    A: 24,
    symbol: 'Na',
    name: 'Sodium-24 (²⁴Na)',
    massU: 23.99096,
    isStable: false,
    decayMode: 'beta-',
    halfLife: '15,0 giờ',
    halfLifeSeconds: 15 * 3600,
    description: 'Đồng vị phóng xạ β⁻ dùng làm chất đánh dấu phóng xạ đo thể tích máu và khảo sát tuần hoàn máu trong y học.',
    isPreset: true,
  },
  {
    Z: 13,
    N: 14,
    A: 27,
    symbol: 'Al',
    name: 'Aluminium-27 (²⁷Al)',
    massU: 26.97439,
    isStable: true,
    decayMode: 'stable',
    halfLife: 'Bền vững (∞)',
    description: 'Đồng vị bền duy nhất trong tự nhiên của Nhôm, thường xuất hiện trong các bài toán tính độ hụt khối SGK.',
    isPreset: true,
  },
  {
    Z: 26,
    N: 30,
    A: 56,
    symbol: 'Fe',
    name: 'Iron-56 (⁵⁶Fe)',
    massU: 55.92067,
    isStable: true,
    decayMode: 'stable',
    halfLife: 'Bền vững (∞)',
    description: 'Hạt nhân nằm ở đỉnh đường cong năng lượng liên kết riêng (W_lkr ≈ 8,8 MeV/nucleon), thuộc nhóm bền vững nhất tự nhiên.',
    isPreset: true,
  },
  {
    Z: 27,
    N: 33,
    A: 60,
    symbol: 'Co',
    name: 'Cobalt-60 (⁶⁰Co)',
    massU: 59.91901,
    isStable: false,
    decayMode: 'beta-',
    halfLife: '5,27 năm',
    halfLifeSeconds: 5.27 * 365.25 * 86400,
    description: 'Nguồn phóng xạ β⁻ và tia γ mạnh dùng trong xạ trị ung thư ("dao gamma") và chiếu xạ bảo quản nông sản.',
    isPreset: true,
  },
  {
    Z: 53,
    N: 78,
    A: 131,
    symbol: 'I',
    name: 'Iodine-131 (¹³¹I)',
    massU: 130.87705,
    isStable: false,
    decayMode: 'beta-',
    halfLife: '8,0 ngày',
    halfLifeSeconds: 8.0 * 86400,
    description: 'Dược chất phóng xạ β⁻ và γ kinh điển dùng để chẩn đoán và điều trị bệnh bướu cổ, ung thư tuyến giáp.',
    isPreset: true,
  },
  {
    Z: 82,
    N: 124,
    A: 206,
    symbol: 'Pb',
    name: 'Lead-206 (²⁰⁶Pb)',
    massU: 205.92945,
    isStable: true,
    decayMode: 'stable',
    halfLife: 'Bền vững (∞)',
    description: 'Hạt nhân chì bền vững — sản phẩm cuối cùng của chuỗi phân rã ²³⁸U và phóng xạ α của ²¹⁰Po.',
    isPreset: false,
  },
  {
    Z: 84,
    N: 126,
    A: 210,
    symbol: 'Po',
    name: 'Polonium-210 (²¹⁰Po)',
    massU: 209.93678,
    isStable: false,
    decayMode: 'alpha',
    halfLife: '138 ngày',
    halfLifeSeconds: 138 * 86400,
    description: 'Đồng vị phóng xạ α kinh điển nhất trong đề thi THPT: ²¹⁰Po → α + ²⁰⁶Pb với T = 138 ngày.',
    isPreset: true,
  },
  {
    Z: 86,
    N: 136,
    A: 222,
    symbol: 'Rn',
    name: 'Radon-222 (²²²Rn)',
    massU: 221.9703,
    isStable: false,
    decayMode: 'alpha',
    halfLife: '3,8 ngày',
    halfLifeSeconds: 3.8 * 86400,
    description: 'Khí hiếm phóng xạ α sinh ra từ sự phân rã của Radium-226.',
    isPreset: false,
  },
  {
    Z: 88,
    N: 138,
    A: 226,
    symbol: 'Ra',
    name: 'Radium-226 (²²⁶Ra)',
    massU: 225.9771,
    isStable: false,
    decayMode: 'alpha',
    halfLife: '1600 năm',
    halfLifeSeconds: 1600 * 365.25 * 86400,
    description: 'Nguyên tố phóng xạ α do vợ chồng Marie & Pierre Curie khám phá, cơ sở định nghĩa đơn vị Curie (Ci) ban đầu.',
    isPreset: true,
  },
  {
    Z: 92,
    N: 143,
    A: 235,
    symbol: 'U',
    name: 'Uranium-235 (²³⁵U)',
    massU: 234.9934,
    isStable: false,
    decayMode: 'alpha',
    halfLife: '7,04 × 10⁸ năm',
    halfLifeSeconds: 7.04e8 * 365.25 * 86400,
    description: 'Nhiên liệu phân hạch hạt nhân chủ chốt trong lò phản ứng điện hạt nhân (~200 MeV mỗi phân hạch khi hấp thụ neutron chậm).',
    isPreset: true,
  },
  {
    Z: 92,
    N: 146,
    A: 238,
    symbol: 'U',
    name: 'Uranium-238 (²³⁸U)',
    massU: 238.0003,
    isStable: false,
    decayMode: 'alpha',
    halfLife: '4,47 × 10⁹ năm',
    halfLifeSeconds: 4.47e9 * 365.25 * 86400,
    description: 'Đồng vị phổ biến nhất của Uranium (99,27%), dùng trong bài toán xác định tuổi Trái Đất qua tỉ số ²⁰⁶Pb/²³⁸U.',
    isPreset: true,
  },
];

export interface NuclideAnalysis {
  Z: number;
  N: number;
  A: number;
  symbol: string;
  elementNameVi: string;
  isotopeName: string;
  massU: number;
  totalNucleonMassU: number;
  deltaM_u: number;
  deltaM_kg: number;
  W_lk_MeV: number;
  W_lkr_MeV: number;
  radiusFm: number;
  isStable: boolean;
  decayMode: 'stable' | 'alpha' | 'beta-' | 'beta+';
  halfLife: string;
  description: string;
}

/**
 * Calculates full nuclear physics properties for any (Z, N) pair.
 * Uses exact textbook experimental masses if in KNOWN_ISOTOPES,
 * or Semi-Empirical Mass Formula (Weizsäcker) for custom combinations.
 */
export function analyzeNuclide(Z: number, N: number): NuclideAnalysis {
  const A = Z + N;
  const elem = getElementInfo(Z);

  if (A === 0) {
    return {
      Z: 0,
      N: 0,
      A: 0,
      symbol: '-',
      elementNameVi: 'Chân không',
      isotopeName: 'Chưa có nucleon',
      massU: 0,
      totalNucleonMassU: 0,
      deltaM_u: 0,
      deltaM_kg: 0,
      W_lk_MeV: 0,
      W_lkr_MeV: 0,
      radiusFm: 0,
      isStable: true,
      decayMode: 'stable',
      halfLife: '-',
      description: 'Hãy thêm Proton (p⁺) hoặc Neutron (n⁰) để tạo dựng hạt nhân.',
    };
  }

  if (Z === 0 && N === 1) {
    return {
      Z: 0,
      N: 1,
      A: 1,
      symbol: 'n',
      elementNameVi: 'Neutron tự do',
      isotopeName: 'Neutron (¹₀n)',
      massU: PHYSICAL_CONSTANTS.m_n,
      totalNucleonMassU: PHYSICAL_CONSTANTS.m_n,
      deltaM_u: 0,
      deltaM_kg: 0,
      W_lk_MeV: 0,
      W_lkr_MeV: 0,
      radiusFm: 1.2,
      isStable: false,
      decayMode: 'beta-',
      halfLife: '10,2 phút',
      description: 'Neutron tự do ngoài hạt nhân không bền, tự phân rã β⁻ thành proton, electron và phản neutrino: n → p + e⁻ + ν̃_e.',
    };
  }

  const known = KNOWN_ISOTOPES.find((iso) => iso.Z === Z && iso.N === N);
  const totalNucleonMassU = Z * PHYSICAL_CONSTANTS.m_p + N * PHYSICAL_CONSTANTS.m_n;
  const radiusFm = PHYSICAL_CONSTANTS.r0_fm * Math.pow(A, 1 / 3);

  if (known) {
    const deltaM_u = Math.max(0, totalNucleonMassU - known.massU);
    const W_lk_MeV = deltaM_u * PHYSICAL_CONSTANTS.u_to_MeV;
    const W_lkr_MeV = A > 1 ? W_lk_MeV / A : 0;

    return {
      Z,
      N,
      A,
      symbol: known.symbol,
      elementNameVi: elem.nameVi,
      isotopeName: known.name,
      massU: known.massU,
      totalNucleonMassU,
      deltaM_u,
      deltaM_kg: deltaM_u * PHYSICAL_CONSTANTS.u_to_kg,
      W_lk_MeV,
      W_lkr_MeV,
      radiusFm,
      isStable: known.isStable,
      decayMode: known.decayMode,
      halfLife: known.halfLife,
      description: known.description,
    };
  }

  // Semi-Empirical Weizsäcker Binding Energy Formula for arbitrary (Z, N)
  const aV = 15.75;
  const aS = 17.8;
  const aC = 0.711;
  const aA = 23.7;
  let deltaPair = 0;
  if (A > 1) {
    if (Z % 2 === 0 && N % 2 === 0) deltaPair = 11.18 / Math.pow(A, 0.5);
    else if (Z % 2 === 1 && N % 2 === 1) deltaPair = -11.18 / Math.pow(A, 0.5);
  }

  let W_lk_MeV =
    aV * A -
    aS * Math.pow(A, 2 / 3) -
    (aC * Z * (Z - 1)) / Math.pow(A, 1 / 3) -
    (aA * Math.pow(A - 2 * Z, 2)) / A +
    deltaPair;

  if (A === 1 || W_lk_MeV < 0) W_lk_MeV = 0;

  const deltaM_u = W_lk_MeV / PHYSICAL_CONSTANTS.u_to_MeV;
  const massU = totalNucleonMassU - deltaM_u;
  const W_lkr_MeV = A > 1 ? W_lk_MeV / A : 0;

  // Determine stability valley (Belt of Stability)
  const idealN = Z <= 20 ? Z : Z * (1 + 0.0075 * Math.pow(Z, 2 / 3) * 2.1);
  const nDiff = N - idealN;

  let isStable = false;
  let decayMode: 'stable' | 'alpha' | 'beta-' | 'beta+' = 'beta-';
  let halfLife = 'Không bền (Phóng xạ)';

  if (Z > 82 || A > 209) {
    isStable = false;
    decayMode = 'alpha';
    halfLife = 'Phóng xạ α / β';
  } else if (Z === 0) {
    isStable = false;
    decayMode = 'beta-';
    halfLife = 'Không bền (cụm neutron)';
  } else if (N === 0 && Z > 1) {
    isStable = false;
    decayMode = 'beta+';
    halfLife = '< 10⁻²¹ s (Đẩy tĩnh điện Coulomb)';
  } else if (Math.abs(nDiff) <= (Z <= 10 ? 0.6 : 1.35)) {
    isStable = true;
    decayMode = 'stable';
    halfLife = 'Bền vững (∞)';
  } else if (nDiff > 0) {
    isStable = false;
    decayMode = 'beta-';
    halfLife = 'Phóng xạ β⁻ (Thừa neutron)';
  } else {
    isStable = false;
    decayMode = 'beta+';
    halfLife = 'Phóng xạ β⁺ (Thừa proton)';
  }

  const description = isStable
    ? `Hạt nhân ${elem.nameVi}-${A} nằm trong thung lũng bền vững với tỉ số N/Z = ${(N / Math.max(1, Z)).toFixed(2)} cân bằng giữa lực hạt nhân và lực đẩy tĩnh điện.`
    : decayMode === 'alpha'
    ? `Hạt nhân nặng (Z = ${Z} > 82), lực đẩy tĩnh điện Coulomb giữa các proton lớn nên có xu hướng phóng xạ hạt α (⁴₂He) để tạo hạt nhân con bền hơn.`
    : decayMode === 'beta-'
    ? `Hạt nhân thừa neutron so với cấu hình bền (N/Z = ${(N / Math.max(1, Z)).toFixed(2)}), có xu hướng phóng xạ β⁻ (biến đổi 1 neutron thành 1 proton).`
    : `Hạt nhân thừa proton so với cấu hình bền (N/Z = ${(N / Math.max(1, Z)).toFixed(2)}), có xu hướng phóng xạ β⁺ (biến đổi 1 proton thành 1 neutron).`;

  return {
    Z,
    N,
    A,
    symbol: elem.symbol,
    elementNameVi: elem.nameVi,
    isotopeName: `${elem.nameIUPAC}-${A} (${A}${elem.symbol})`,
    massU,
    totalNucleonMassU,
    deltaM_u,
    deltaM_kg: deltaM_u * PHYSICAL_CONSTANTS.u_to_kg,
    W_lk_MeV,
    W_lkr_MeV,
    radiusFm,
    isStable,
    decayMode,
    halfLife,
    description,
  };
}
