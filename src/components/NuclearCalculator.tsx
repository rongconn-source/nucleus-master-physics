import React, { useState } from 'react';
import { KNOWN_ISOTOPES, PHYSICAL_CONSTANTS } from '../data/nuclearData';
import { MathFormula } from './MathFormula';
import {
  Calculator,
  Atom,
  Activity,
  FlaskConical,
  Target,
  Zap,
  Gauge,
} from 'lucide-react';

type TimeUnitKey = 's' | 'min' | 'h' | 'd' | 'y';

const TIME_UNIT_SECONDS: Record<TimeUnitKey, { label: string; seconds: number }> = {
  s: { label: 'giây (s)', seconds: 1 },
  min: { label: 'phút', seconds: 60 },
  h: { label: 'giờ', seconds: 3600 },
  d: { label: 'ngày', seconds: 86400 },
  y: { label: 'năm (365,25 ngày)', seconds: 365.25 * 86400 },
};

type CalculatorMode =
  | 'binding'
  | 'decay'
  | 'applied'
  | 'scintillation'
  | 'kinetics'
  | 'relativity';

export const NuclearCalculator: React.FC = () => {
  const [activeMode, setActiveMode] = useState<CalculatorMode>('binding');

  // Mode 1 State: Binding Energy Calculator
  const [calcZ, setCalcZ] = useState<number>(26);
  const [calcA, setCalcA] = useState<number>(56);
  const [calcMx, setCalcMx] = useState<number>(55.92067);
  const [calcMp, setCalcMp] = useState<number>(1.00728);
  const [calcMn, setCalcMn] = useState<number>(1.00866);

  // Mode 2 State: Radioactive Decay Law Calculator
  const [m0Grams, setM0Grams] = useState<number>(210);
  const [AParent, setAParent] = useState<number>(210);
  const [ADaughter, setADaughter] = useState<number>(206);
  const [halfLifeVal, setHalfLifeVal] = useState<number>(138);
  const [halfLifeUnit, setHalfLifeUnit] = useState<TimeUnitKey>('d');
  const [timeVal, setTimeVal] = useState<number>(276);
  const [timeUnit, setTimeUnit] = useState<TimeUnitKey>('d');

  // Mode 3 State: Applied Problems (C-14, Na-24, U-Pb)
  const [c14H0, setC14H0] = useState<number>(0.25);
  const [c14H, setC14H] = useState<number>(0.1768);
  const [c14T, setC14T] = useState<number>(5730);

  const [na24V0, setNa24V0] = useState<number>(10); // cm3
  const [na24H0, setNa24H0] = useState<number>(20000); // Bq
  const [na24TimeH, setNa24TimeH] = useState<number>(6); // hours
  const [na24Vm, setNa24Vm] = useState<number>(10); // cm3
  const [na24Hm, setNa24Hm] = useState<number>(30.3); // Bq

  const [uPbMassRatio, setUPbMassRatio] = useState<number>(0.25); // m_Pb / m_U
  const [u238T, setU238T] = useState<number>(4.5); // 10^9 years

  // Mode 4 State: ZnS Scintillation Screen (Chủ đề 11)
  const [scintN0, setScintN0] = useState<number>(1e14);
  const [scintTVal, setScintTVal] = useState<number>(138);
  const [scintTUnit, setScintTUnit] = useState<TimeUnitKey>('d');
  const [scintTimeVal, setScintTimeVal] = useState<number>(1);
  const [scintTimeUnit, setScintTimeUnit] = useState<TimeUnitKey>('d');
  const [scintDistanceCm, setScintDistanceCm] = useState<number>(10); // R in cm
  const [scintAreaCm2, setScintAreaCm2] = useState<number>(3.1416); // S in cm2

  // Mode 5 State: Decay Kinetics Parent at Rest (Chủ đề 12)
  const [kinParentA, setKinParentA] = useState<number>(210);
  const [kinDeltaEMeV, setKinDeltaEMeV] = useState<number>(5.4);

  // Mode 6 State: Einstein Relativity (Chủ đề 4)
  const [relParticle, setRelParticle] = useState<'electron' | 'proton' | 'custom'>('proton');
  const [relM0U, setRelM0U] = useState<number>(1.00728);
  const [relBeta, setRelBeta] = useState<number>(0.6); // v/c

  // Mode 1 Calculations
  const calcN = Math.max(0, calcA - calcZ);
  const totalNucleonsU = calcZ * calcMp + calcN * calcMn;
  const deltaMU = Math.max(0, totalNucleonsU - calcMx);
  const deltaMKg = deltaMU * PHYSICAL_CONSTANTS.u_to_kg;
  const wLkMeV = deltaMU * PHYSICAL_CONSTANTS.u_to_MeV;
  const wLkJoule = wLkMeV * PHYSICAL_CONSTANTS.MeV_to_J;
  const wLkrMeV = calcA > 0 ? wLkMeV / calcA : 0;
  const radiusFm = PHYSICAL_CONSTANTS.r0_fm * Math.pow(Math.max(1, calcA), 1 / 3);

  // Mode 2 Calculations
  const T_sec = halfLifeVal * TIME_UNIT_SECONDS[halfLifeUnit].seconds;
  const t_sec = timeVal * TIME_UNIT_SECONDS[timeUnit].seconds;
  const ratioT = T_sec > 0 ? t_sec / T_sec : 0;
  const lambdaSec = T_sec > 0 ? Math.LN2 / T_sec : 0;
  const remainFraction = Math.pow(2, -ratioT);
  const decayedFraction = 1 - remainFraction;

  const N0_atoms = AParent > 0 ? (m0Grams / AParent) * PHYSICAL_CONSTANTS.N_A : 0;
  const Nt_atoms = N0_atoms * remainFraction;
  const deltaN_atoms = N0_atoms * decayedFraction;
  const mt_grams = m0Grams * remainFraction;
  const mDaughter_grams =
    AParent > 0 ? m0Grams * (ADaughter / AParent) * decayedFraction : 0;

  const H0_Bq = lambdaSec * N0_atoms;
  const Ht_Bq = lambdaSec * Nt_atoms;
  const H0_Ci = H0_Bq / PHYSICAL_CONSTANTS.Ci_to_Bq;
  const Ht_Ci = Ht_Bq / PHYSICAL_CONSTANTS.Ci_to_Bq;

  const ratioDaughterParentCount = Nt_atoms > 0 ? deltaN_atoms / Nt_atoms : 0;
  const ratioDaughterParentMass = mt_grams > 0 ? mDaughter_grams / mt_grams : 0;

  // Mode 3 Calculations
  const c14AgeYears =
    c14H > 0 && c14H0 > 0 && c14H <= c14H0
      ? (c14T / Math.LN2) * Math.log(c14H0 / c14H)
      : 0;

  const na24DecayFactor = Math.pow(2, -na24TimeH / 15);
  const na24RemainingActivityBq = na24H0 * na24DecayFactor;
  const na24BloodVolumeCm3 =
    na24Hm > 0 ? (na24RemainingActivityBq / na24Hm) * na24Vm : 0;
  const na24BloodVolumeLiters = na24BloodVolumeCm3 / 1000;

  const uPbAtomRatio = uPbMassRatio * (238 / 206);
  const rockAgeBillionYears =
    u238T > 0 && uPbAtomRatio >= 0
      ? (u238T / Math.LN2) * Math.log(1 + uPbAtomRatio)
      : 0;
  const rockAgeYears = rockAgeBillionYears * 1e9;

  // Mode 4 Calculations: ZnS Screen
  const scintT_sec = scintTVal * TIME_UNIT_SECONDS[scintTUnit].seconds;
  const scint_t_sec = scintTimeVal * TIME_UNIT_SECONDS[scintTimeUnit].seconds;
  const scintSphereAreaCm2 = 4 * Math.PI * Math.pow(Math.max(0.1, scintDistanceCm), 2);
  const scintSolidAngleRatio = Math.min(1, Math.max(0, scintAreaCm2 / scintSphereAreaCm2));
  const scintDecayFraction =
    scintT_sec > 0 ? 1 - Math.pow(2, -scint_t_sec / scintT_sec) : 0;
  const scintTotalDecays = scintN0 * scintDecayFraction;
  const scintHitsOnScreen = scintTotalDecays * scintSolidAngleRatio;
  const scintCountRatePerSec =
    scint_t_sec > 0 ? scintHitsOnScreen / scint_t_sec : 0;

  // Mode 5 Calculations: Decay Kinetics
  const kinDaughterA = Math.max(1, kinParentA - 4);
  const kinAlphaEnergyMeV = kinParentA > 0 ? (kinDaughterA / kinParentA) * kinDeltaEMeV : 0;
  const kinDaughterEnergyMeV = kinParentA > 0 ? (4 / kinParentA) * kinDeltaEMeV : 0;
  const kinAlphaPercent = kinParentA > 0 ? (kinDaughterA / kinParentA) * 100 : 0;
  const kinDaughterPercent = kinParentA > 0 ? (4 / kinParentA) * 100 : 0;
  const mAlphaKg = 4.0015 * PHYSICAL_CONSTANTS.u_to_kg;
  const KAlphaJ = kinAlphaEnergyMeV * PHYSICAL_CONSTANTS.MeV_to_J;
  const vAlphaMPerS = Math.sqrt((2 * Math.max(0, KAlphaJ)) / mAlphaKg);
  const vDaughterMPerS = vAlphaMPerS * (4 / kinDaughterA);

  // Mode 6 Calculations: Relativity
  const relGamma =
    relBeta >= 0 && relBeta < 1 ? 1 / Math.sqrt(1 - relBeta * relBeta) : 1;
  const relM0Kg = relM0U * PHYSICAL_CONSTANTS.u_to_kg;
  const relMKg = relM0Kg * relGamma;
  const relE0MeV = relM0U * PHYSICAL_CONSTANTS.u_to_MeV;
  const relEMeV = relE0MeV * relGamma;
  const relKMeV = relEMeV - relE0MeV;
  const relKClassicMeV = 0.5 * relE0MeV * relBeta * relBeta;

  return (
    <div className="space-y-6">
      {/* Top Header & Mode Switcher */}
      <div className="bg-[#111C30] border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Calculator className="w-5 h-5 text-cyan-400" />
            Máy tính Hạt nhân & Giải nhanh Bài toán SGK
          </h2>
          <p className="text-xs text-slate-400">
            Tính chính xác 6 chuyên đề trọng tâm: Δm, W_lkr, H (Bq/Ci), ¹⁴C, ²⁴Na, Mẫu đá U-Pb, Màn ZnS & Động học
          </p>
        </div>

        {/* 6 Mode Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#090F1D] border border-slate-800 rounded-xl max-w-full overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveMode('binding')}
            className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${
              activeMode === 'binding'
                ? 'bg-cyan-600 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Atom className="w-3.5 h-3.5" />
            1. Độ hụt khối & W_lk
          </button>
          <button
            type="button"
            onClick={() => setActiveMode('decay')}
            className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${
              activeMode === 'decay'
                ? 'bg-cyan-600 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            2. Định luật Phóng xạ & H
          </button>
          <button
            type="button"
            onClick={() => setActiveMode('applied')}
            className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${
              activeMode === 'applied'
                ? 'bg-cyan-600 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FlaskConical className="w-3.5 h-3.5" />
            3. ¹⁴C, ²⁴Na & Đá U-Pb
          </button>
          <button
            type="button"
            onClick={() => setActiveMode('scintillation')}
            className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${
              activeMode === 'scintillation'
                ? 'bg-cyan-600 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Target className="w-3.5 h-3.5" />
            4. Màn ZnS
          </button>
          <button
            type="button"
            onClick={() => setActiveMode('kinetics')}
            className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${
              activeMode === 'kinetics'
                ? 'bg-cyan-600 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            5. Động năng Mẹ đứng yên
          </button>
          <button
            type="button"
            onClick={() => setActiveMode('relativity')}
            className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${
              activeMode === 'relativity'
                ? 'bg-cyan-600 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Gauge className="w-3.5 h-3.5" />
            6. Thuyết tương đối
          </button>
        </div>
      </div>

      {/* MODE 1: MASS DEFECT & BINDING ENERGY */}
      {activeMode === 'binding' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Input Panel (5 cols) */}
          <div className="lg:col-span-5 min-w-0 bg-[#111C30] border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-base font-semibold text-white">
              Nhập thông số hạt nhân <MathFormula tex="{}^{A}_{Z}\text{X}" />
            </h3>

            {/* Quick Isotope Loader */}
            <div className="space-y-1.5">
              <span className="text-xs text-slate-400 block">
                Nạp nhanh số liệu chuẩn từ SGK:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {KNOWN_ISOTOPES.filter((i) => i.A > 1 && i.isPreset).map((iso) => (
                  <button
                    key={`${iso.Z}-${iso.A}`}
                    type="button"
                    onClick={() => {
                      setCalcZ(iso.Z);
                      setCalcA(iso.A);
                      setCalcMx(iso.massU);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-[#090F1D] hover:bg-slate-800 border border-slate-700 text-xs font-mono text-cyan-300 transition-colors"
                  >
                    <sup>{iso.A}</sup>
                    <sub>{iso.Z}</sub>
                    {iso.symbol}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="text-xs text-slate-300 block mb-1">
                  Nguyên tử số <MathFormula tex="Z" /> (số proton)
                </label>
                <input
                  type="number"
                  min={1}
                  max={118}
                  value={calcZ}
                  onChange={(e) => setCalcZ(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-3 py-2 rounded-xl bg-[#090F1D] border border-slate-700 font-mono text-sm text-cyan-400 tabular-nums focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">
                  Số khối <MathFormula tex="A" /> (tổng nucleon)
                </label>
                <input
                  type="number"
                  min={calcZ}
                  value={calcA}
                  onChange={(e) =>
                    setCalcA(Math.max(calcZ, parseInt(e.target.value) || calcZ))
                  }
                  className="w-full px-3 py-2 rounded-xl bg-[#090F1D] border border-slate-700 font-mono text-sm text-white tabular-nums focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-300 block mb-1">
                Khối lượng thực tế hạt nhân <MathFormula tex="m_X\text{ (amu)}" />
              </label>
              <input
                type="number"
                step="0.00001"
                value={calcMx}
                onChange={(e) => setCalcMx(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-xl bg-[#090F1D] border border-slate-700 font-mono text-sm text-emerald-300 tabular-nums focus:outline-none focus:border-cyan-500"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Tổng nucleon riêng lẻ: {totalNucleonsU.toFixed(5)} amu
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1 border-t border-slate-800/80">
              <div>
                <label className="text-[11px] text-slate-400 block mb-0.5">
                  <MathFormula tex="m_p\text{ (amu)}" />
                </label>
                <input
                  type="number"
                  step="0.00001"
                  value={calcMp}
                  onChange={(e) => setCalcMp(parseFloat(e.target.value) || 1.00728)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-[#090F1D] border border-slate-800 font-mono text-xs text-slate-300"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-0.5">
                  <MathFormula tex="m_n\text{ (amu)}" />
                </label>
                <input
                  type="number"
                  step="0.00001"
                  value={calcMn}
                  onChange={(e) => setCalcMn(parseFloat(e.target.value) || 1.00866)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-[#090F1D] border border-slate-800 font-mono text-xs text-slate-300"
                />
              </div>
            </div>
          </div>

          {/* Results Panel (7 cols) */}
          <div className="lg:col-span-7 min-w-0 bg-[#111C30] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
            <div>
              <h3 className="text-base font-semibold text-white mb-3">
                Kết quả Tính toán Năng lượng Liên kết
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-[#090F1D] border border-slate-800">
                  <span className="text-xs text-slate-400 block mb-0.5">
                    Độ hụt khối <MathFormula tex="\Delta m" />
                  </span>
                  <span className="font-mono tabular-nums text-lg font-bold text-amber-400">
                    {deltaMU.toFixed(5)} amu
                  </span>
                  <span className="text-[11px] font-mono tabular-nums text-slate-500 block">
                    = {deltaMKg.toExponential(4)} kg
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#090F1D] border border-slate-800">
                  <span className="text-xs text-slate-400 block mb-0.5">
                    Năng lượng liên kết <MathFormula tex="W_{\text{lk}}" />
                  </span>
                  <span className="font-mono tabular-nums text-lg font-bold text-cyan-400">
                    {wLkMeV.toFixed(3)} MeV
                  </span>
                  <span className="text-[11px] font-mono tabular-nums text-slate-500 block">
                    = {wLkJoule.toExponential(4)} J
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#090F1D] border border-cyan-500/30">
                  <span className="text-xs text-slate-400 block mb-0.5">
                    Năng lượng LK riêng <MathFormula tex="W_{\text{lkr}}" /> (độ bền)
                  </span>
                  <span className="font-mono tabular-nums text-xl font-bold text-emerald-300">
                    {wLkrMeV.toFixed(4)} MeV/nucleon
                  </span>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    {wLkrMeV >= 8.5
                      ? 'Rất bền vững (Đỉnh Fe-56)'
                      : wLkrMeV >= 7.5
                      ? 'Tương đối bền vững'
                      : 'Kém bền vững'}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#090F1D] border border-slate-800">
                  <span className="text-xs text-slate-400 block mb-0.5">
                    Bán kính hạt nhân <MathFormula tex="R" />
                  </span>
                  <span className="font-mono tabular-nums text-lg font-bold text-purple-400">
                    {radiusFm.toFixed(2)} fm
                  </span>
                  <span className="text-[11px] font-mono tabular-nums text-slate-500 block">
                    = {(radiusFm * 1e-15).toExponential(3)} m
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#090F1D] border border-slate-800 text-xs text-slate-300 space-y-1">
              <div className="font-semibold text-slate-200">Các bước tính chuẩn:</div>
              <div>
                1. <MathFormula tex="\Delta m = [Z \cdot m_p + (A - Z) \cdot m_n] - m_X" />
              </div>
              <div>
                2. <MathFormula tex="W_{\text{lk}} = \Delta m \cdot 931,5\text{ (MeV)}" />
              </div>
              <div>
                3. <MathFormula tex="W_{\text{lkr}} = \frac{W_{\text{lk}}}{A}\text{ (MeV/nucleon)}" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: RADIOACTIVE DECAY LAW & ACTIVITY */}
      {activeMode === 'decay' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-5 min-w-0 bg-[#111C30] border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-base font-semibold text-white">
              Thông số Ban đầu & Chu kì Bán rã
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-300 block mb-1">
                  Khối lượng ban đầu <MathFormula tex="m_0\text{ (g)}" />
                </label>
                <input
                  type="number"
                  step="any"
                  value={m0Grams}
                  onChange={(e) => setM0Grams(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl bg-[#090F1D] border border-slate-700 font-mono text-sm text-cyan-400 tabular-nums focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">
                  Số khối hạt mẹ <MathFormula tex="A_{\text{mẹ}}" />
                </label>
                <input
                  type="number"
                  value={AParent}
                  onChange={(e) => setAParent(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-3 py-2 rounded-xl bg-[#090F1D] border border-slate-700 font-mono text-sm text-white tabular-nums focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-300 block mb-1">
                Số khối hạt nhân con <MathFormula tex="A_{\text{con}}" />
              </label>
              <input
                type="number"
                value={ADaughter}
                onChange={(e) => setADaughter(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-3 py-2 rounded-xl bg-[#090F1D] border border-slate-700 font-mono text-sm text-emerald-300 tabular-nums focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <label className="text-xs text-slate-300 block mb-1">
                  Chu kì bán rã <MathFormula tex="T" />
                </label>
                <input
                  type="number"
                  step="any"
                  value={halfLifeVal}
                  onChange={(e) => setHalfLifeVal(parseFloat(e.target.value) || 1)}
                  className="w-full px-3 py-2 rounded-xl bg-[#090F1D] border border-slate-700 font-mono text-sm text-amber-300 tabular-nums focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300 block mb-1">Đơn vị T</label>
                <select
                  value={halfLifeUnit}
                  onChange={(e) => setHalfLifeUnit(e.target.value as TimeUnitKey)}
                  className="w-full px-2 py-2 rounded-xl bg-[#090F1D] border border-slate-700 font-mono text-xs text-white focus:outline-none"
                >
                  {Object.entries(TIME_UNIT_SECONDS).map(([key, item]) => (
                    <option key={key} value={key}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <label className="text-xs text-slate-300 block mb-1">
                  Thời gian trôi qua <MathFormula tex="t" />
                </label>
                <input
                  type="number"
                  step="any"
                  value={timeVal}
                  onChange={(e) => setTimeVal(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl bg-[#090F1D] border border-slate-700 font-mono text-sm text-purple-300 tabular-nums focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300 block mb-1">Đơn vị t</label>
                <select
                  value={timeUnit}
                  onChange={(e) => setTimeUnit(e.target.value as TimeUnitKey)}
                  className="w-full px-2 py-2 rounded-xl bg-[#090F1D] border border-slate-700 font-mono text-xs text-white focus:outline-none"
                >
                  {Object.entries(TIME_UNIT_SECONDS).map(([key, item]) => (
                    <option key={key} value={key}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-[#090F1D] border border-slate-800 text-xs font-mono text-slate-400">
              Số chu kì đã trôi qua: <span className="text-cyan-300 font-bold">{ratioT.toFixed(3)} T</span>
            </div>
          </div>

          <div className="lg:col-span-7 min-w-0 bg-[#111C30] border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-base font-semibold text-white">
              Kết quả Phân rã & Hoạt độ Phóng xạ
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-[#090F1D] border border-cyan-500/30">
                <span className="text-xs text-slate-400 block mb-0.5">
                  Khối lượng Mẹ còn lại <MathFormula tex="m(t)" />
                </span>
                <span className="font-mono tabular-nums text-xl font-bold text-cyan-300">
                  {mt_grams.toFixed(4)} g
                </span>
                <span className="text-[11px] text-slate-400 block">
                  ({(remainFraction * 100).toFixed(2)}% ban đầu)
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#090F1D] border border-emerald-500/30">
                <span className="text-xs text-slate-400 block mb-0.5">
                  Khối lượng Con sinh ra <MathFormula tex="m_{\text{con}}(t)" />
                </span>
                <span className="font-mono tabular-nums text-xl font-bold text-emerald-300">
                  {mDaughter_grams.toFixed(4)} g
                </span>
                <span className="text-[11px] text-slate-400 block">
                  (Đã phân rã: {(decayedFraction * 100).toFixed(2)}%)
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#090F1D] border border-slate-800">
                <span className="text-xs text-slate-400 block mb-0.5">
                  Độ phóng xạ tức thời <MathFormula tex="H(t)" />
                </span>
                <span className="font-mono tabular-nums text-lg font-bold text-amber-400">
                  {Ht_Bq.toExponential(4)} Bq
                </span>
                <span className="text-[11px] font-mono tabular-nums text-slate-400 block">
                  = {Ht_Ci.toFixed(3)} Ci
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#090F1D] border border-slate-800">
                <span className="text-xs text-slate-400 block mb-0.5">
                  Độ phóng xạ ban đầu <MathFormula tex="H_0" />
                </span>
                <span className="font-mono tabular-nums text-lg font-bold text-slate-300">
                  {H0_Bq.toExponential(4)} Bq
                </span>
                <span className="text-[11px] font-mono tabular-nums text-slate-400 block">
                  = {H0_Ci.toFixed(3)} Ci
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#090F1D] border border-slate-800 text-xs font-mono tabular-nums space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-400">Số hạt ban đầu N₀:</span>
                <span className="text-slate-200">{N0_atoms.toExponential(4)} hạt</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Số hạt mẹ còn lại N(t):</span>
                <span className="text-cyan-300">{Nt_atoms.toExponential(4)} hạt</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Số hạt con sinh ra ΔN(t):</span>
                <span className="text-emerald-300">{deltaN_atoms.toExponential(4)} hạt</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Tỉ số hạt Con / Mẹ (2^(t/T) - 1):</span>
                <span className="text-amber-300 font-bold">
                  {ratioDaughterParentCount.toFixed(4)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Tỉ số khối lượng Con / Mẹ:</span>
                <span className="text-emerald-300 font-bold">
                  {ratioDaughterParentMass.toFixed(4)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Hằng số phóng xạ λ (hệ SI):</span>
                <span className="text-violet-300">{lambdaSec.toExponential(4)} s⁻¹</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: APPLIED ARCHETYPES (C-14, Na-24 & U-Pb Rock Dating) */}
      {activeMode === 'applied' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Carbon-14 Archaeological Dating */}
          <div className="bg-[#111C30] border border-slate-800 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-white">
                1. Định tuổi Cổ vật bằng <MathFormula tex="{}^{14}_{6}\text{C}" />
              </h3>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Mẫu tươi H₀</label>
                  <input
                    type="number"
                    step="0.01"
                    value={c14H0}
                    onChange={(e) => setC14H0(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#090F1D] border border-slate-700 font-mono text-xs text-white tabular-nums"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Mẫu cổ H</label>
                  <input
                    type="number"
                    step="0.01"
                    value={c14H}
                    onChange={(e) => setC14H(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#090F1D] border border-slate-700 font-mono text-xs text-cyan-300 tabular-nums"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Chu kì T (năm)</label>
                <input
                  type="number"
                  value={c14T}
                  onChange={(e) => setC14T(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-[#090F1D] border border-slate-700 font-mono text-xs text-amber-300 tabular-nums"
                />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#090F1D] border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Niên đại cổ vật t:</span>
                <span className="font-mono tabular-nums text-lg font-bold text-amber-400">
                  {Math.round(c14AgeYears).toLocaleString('vi-VN')} năm
                </span>
              </div>
              <div className="text-[11px] text-slate-500 font-mono">
                t = T · log₂(H₀ / H)
              </div>
            </div>
          </div>

          {/* Card 2: Sodium-24 Blood Volume Dilution */}
          <div className="bg-[#111C30] border border-slate-800 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-white">
                2. Đo Thể tích Máu bằng <MathFormula tex="{}^{24}_{11}\text{Na}" />
              </h3>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Tiêm H₀ (Bq)</label>
                  <input
                    type="number"
                    value={na24H0}
                    onChange={(e) => setNa24H0(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded-xl bg-[#090F1D] border border-slate-700 font-mono text-xs text-white tabular-nums"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Chờ t (giờ)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={na24TimeH}
                    onChange={(e) => setNa24TimeH(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded-xl bg-[#090F1D] border border-slate-700 font-mono text-xs text-amber-300 tabular-nums"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Mẫu V_m (cm³)</label>
                  <input
                    type="number"
                    value={na24Vm}
                    onChange={(e) => setNa24Vm(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded-xl bg-[#090F1D] border border-slate-700 font-mono text-xs text-white tabular-nums"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 block mb-1">Mẫu H_m (Bq)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={na24Hm}
                    onChange={(e) => setNa24Hm(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded-xl bg-[#090F1D] border border-slate-700 font-mono text-xs text-cyan-300 tabular-nums"
                  />
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#090F1D] border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Thể tích máu V:</span>
                <span className="font-mono tabular-nums text-lg font-bold text-cyan-300">
                  {na24BloodVolumeLiters.toFixed(2)} lít ({na24BloodVolumeCm3.toFixed(0)} cm³)
                </span>
              </div>
              <div className="text-[11px] text-slate-500 font-mono">
                V = V_m · [H₀ · 2^(-t/T)] / H_m
              </div>
            </div>
          </div>

          {/* Card 3: Uranium-Lead Geological Rock Dating */}
          <div className="bg-[#111C30] border border-slate-800 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="text-base font-semibold text-white">
                3. Định tuổi Mẫu đá bằng <MathFormula tex="{}^{238}\text{U} \rightarrow {}^{206}\text{Pb}" />
              </h3>

              <div>
                <label className="text-xs text-slate-400 block mb-1">
                  Tỉ số khối lượng <MathFormula tex="m_{\text{Pb}} / m_{\text{U}}" />
                </label>
                <input
                  type="number"
                  step="0.05"
                  value={uPbMassRatio}
                  onChange={(e) => setUPbMassRatio(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="w-full px-3 py-2 rounded-xl bg-[#090F1D] border border-slate-700 font-mono text-sm text-cyan-300 tabular-nums"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">
                  Chu kì bán rã <MathFormula tex="T\text{ (tỉ năm)}" />
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={u238T}
                  onChange={(e) => setU238T(Math.max(0.1, parseFloat(e.target.value) || 4.5))}
                  className="w-full px-3 py-2 rounded-xl bg-[#090F1D] border border-slate-700 font-mono text-sm text-amber-300 tabular-nums"
                />
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#090F1D] border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Tuổi mẫu đá t:</span>
                <span className="font-mono tabular-nums text-lg font-bold text-emerald-400">
                  {rockAgeBillionYears.toFixed(3)} tỉ năm
                </span>
              </div>
              <div className="text-[11px] text-slate-500 font-mono">
                = {rockAgeYears.toExponential(3)} năm
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 4: ZNS SCINTILLATION SCREEN (Chủ đề 11) */}
      {activeMode === 'scintillation' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-5 min-w-0 bg-[#111C30] border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-base font-semibold text-white">
              Thông số Thí nghiệm Màn Huỳnh quang ZnS
            </h3>

            <div>
              <label className="text-xs text-slate-300 block mb-1">
                Số hạt phóng xạ ban đầu <MathFormula tex="N_0" /> (hạt)
              </label>
              <input
                type="number"
                step="any"
                value={scintN0}
                onChange={(e) => setScintN0(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-xl bg-[#090F1D] border border-slate-700 font-mono text-sm text-cyan-400 tabular-nums"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <label className="text-xs text-slate-300 block mb-1">Chu kì bán rã T</label>
                <input
                  type="number"
                  value={scintTVal}
                  onChange={(e) => setScintTVal(parseFloat(e.target.value) || 1)}
                  className="w-full px-3 py-2 rounded-xl bg-[#090F1D] border border-slate-700 font-mono text-sm text-amber-300 tabular-nums"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300 block mb-1">Đơn vị</label>
                <select
                  value={scintTUnit}
                  onChange={(e) => setScintTUnit(e.target.value as TimeUnitKey)}
                  className="w-full px-2 py-2 rounded-xl bg-[#090F1D] border border-slate-700 font-mono text-xs text-white"
                >
                  {Object.entries(TIME_UNIT_SECONDS).map(([key, item]) => (
                    <option key={key} value={key}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2">
                <label className="text-xs text-slate-300 block mb-1">Thời gian đếm t</label>
                <input
                  type="number"
                  value={scintTimeVal}
                  onChange={(e) => setScintTimeVal(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded-xl bg-[#090F1D] border border-slate-700 font-mono text-sm text-purple-300 tabular-nums"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300 block mb-1">Đơn vị</label>
                <select
                  value={scintTimeUnit}
                  onChange={(e) => setScintTimeUnit(e.target.value as TimeUnitKey)}
                  className="w-full px-2 py-2 rounded-xl bg-[#090F1D] border border-slate-700 font-mono text-xs text-white"
                >
                  {Object.entries(TIME_UNIT_SECONDS).map(([key, item]) => (
                    <option key={key} value={key}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-slate-300 block mb-1">
                  Khoảng cách <MathFormula tex="R\text{ (cm)}" />
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={scintDistanceCm}
                  onChange={(e) => setScintDistanceCm(parseFloat(e.target.value) || 1)}
                  className="w-full px-3 py-2 rounded-xl bg-[#090F1D] border border-slate-700 font-mono text-sm text-white tabular-nums"
                />
              </div>
              <div>
                <label className="text-xs text-slate-300 block mb-1">
                  Diện tích màn <MathFormula tex="S\text{ (cm}^2\text{)}" />
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={scintAreaCm2}
                  onChange={(e) => setScintAreaCm2(parseFloat(e.target.value) || 0.1)}
                  className="w-full px-3 py-2 rounded-xl bg-[#090F1D] border border-slate-700 font-mono text-sm text-white tabular-nums"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 min-w-0 bg-[#111C30] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
            <div>
              <h3 className="text-base font-semibold text-white mb-3">
                Kết quả Số Chấm sáng Huỳnh quang
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-[#090F1D] border border-cyan-500/30">
                  <span className="text-xs text-slate-400 block mb-0.5">
                    Số chấm sáng trên màn <MathFormula tex="n" />
                  </span>
                  <span className="font-mono tabular-nums text-2xl font-bold text-cyan-300">
                    {scintHitsOnScreen >= 1e6
                      ? scintHitsOnScreen.toExponential(4)
                      : Math.round(scintHitsOnScreen).toLocaleString('vi-VN')}{' '}
                    chấm
                  </span>
                  <span className="text-[11px] text-slate-400 block">
                    (bằng số hạt α đập vào màn)
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#090F1D] border border-slate-800">
                  <span className="text-xs text-slate-400 block mb-0.5">
                    Tốc độ đếm xung trung bình
                  </span>
                  <span className="font-mono tabular-nums text-xl font-bold text-emerald-300">
                    {scintCountRatePerSec >= 1e4
                      ? scintCountRatePerSec.toExponential(3)
                      : scintCountRatePerSec.toFixed(1)}{' '}
                    xung/s
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#090F1D] border border-slate-800">
                  <span className="text-xs text-slate-400 block mb-0.5">
                    Tỉ số góc khối <MathFormula tex="\frac{S}{4\pi R^2}" />
                  </span>
                  <span className="font-mono tabular-nums text-lg font-bold text-purple-300">
                    {scintSolidAngleRatio.toExponential(4)}
                  </span>
                  <span className="text-[11px] text-slate-500 block">
                    Diện tích cầu: {scintSphereAreaCm2.toFixed(1)} cm²
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#090F1D] border border-slate-800">
                  <span className="text-xs text-slate-400 block mb-0.5">
                    Tổng số phân rã nguồn <MathFormula tex="\Delta N" />
                  </span>
                  <span className="font-mono tabular-nums text-lg font-bold text-amber-300">
                    {scintTotalDecays.toExponential(4)} hạt
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#090F1D] border border-slate-800 text-xs text-slate-300 space-y-1">
              <div className="font-semibold text-slate-200">Công thức định lượng:</div>
              <div>
                <MathFormula tex="n = \Delta N \cdot \frac{S}{4\pi R^2} = N_0 \left(1 - 2^{-t/T}\right) \frac{S}{4\pi R^2}" />
              </div>
              <div className="text-slate-400">
                Nếu dịch chuyển màn ra xa gấp $k$ lần thì số chấm sáng giảm đi $k^2$ lần.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 5: DECAY KINETICS PARENT AT REST (Chủ đề 12) */}
      {activeMode === 'kinetics' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-5 min-w-0 bg-[#111C30] border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-base font-semibold text-white">
              Phân rã Alpha từ Hạt nhân Mẹ Đứng yên
            </h3>

            {/* Presets */}
            <div className="space-y-1.5">
              <span className="text-xs text-slate-400 block">Chọn nhanh phản ứng mẫu:</span>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: '²¹⁰Po → α + ²⁰⁶Pb', A: 210, E: 5.4 },
                  { name: '²²⁶Ra → α + ²²²Rn', A: 226, E: 4.87 },
                  { name: '²³⁸U → α + ²³⁴Th', A: 238, E: 4.27 },
                ].map((p) => (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => {
                      setKinParentA(p.A);
                      setKinDeltaEMeV(p.E);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-[#090F1D] hover:bg-slate-800 border border-slate-700 text-xs font-mono text-cyan-300"
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-300 block mb-1">
                Số khối hạt nhân mẹ <MathFormula tex="A_X" />
              </label>
              <input
                type="number"
                min={5}
                value={kinParentA}
                onChange={(e) => setKinParentA(Math.max(5, parseInt(e.target.value) || 5))}
                className="w-full px-3 py-2 rounded-xl bg-[#090F1D] border border-slate-700 font-mono text-sm text-cyan-400 tabular-nums"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Hạt con sinh ra có số khối: <MathFormula tex={`A_Y = ${kinDaughterA}`} />
              </span>
            </div>

            <div>
              <label className="text-xs text-slate-300 block mb-1">
                Năng lượng tỏa ra của phân rã <MathFormula tex="\Delta E\text{ (MeV)}" />
              </label>
              <input
                type="number"
                step="0.01"
                value={kinDeltaEMeV}
                onChange={(e) => setKinDeltaEMeV(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 rounded-xl bg-[#090F1D] border border-slate-700 font-mono text-sm text-emerald-300 tabular-nums"
              />
            </div>
          </div>

          <div className="lg:col-span-7 min-w-0 bg-[#111C30] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
            <div>
              <h3 className="text-base font-semibold text-white mb-3">
                Phân bố Động năng & Vận tốc
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-[#090F1D] border border-cyan-500/30">
                  <span className="text-xs text-slate-400 block mb-0.5">
                    Động năng hạt <MathFormula tex="K_\alpha" />
                  </span>
                  <span className="font-mono tabular-nums text-xl font-bold text-cyan-300">
                    {kinAlphaEnergyMeV.toFixed(3)} MeV
                  </span>
                  <span className="text-[11px] text-slate-400 block">
                    (Chiếm {kinAlphaPercent.toFixed(2)}% năng lượng tỏa)
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 block">
                    v_α ≈ {(vAlphaMPerS / 1e6).toFixed(2)} · 10⁶ m/s
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#090F1D] border border-emerald-500/30">
                  <span className="text-xs text-slate-400 block mb-0.5">
                    Động năng hạt con <MathFormula tex="K_Y" /> (giật lùi)
                  </span>
                  <span className="font-mono tabular-nums text-xl font-bold text-emerald-300">
                    {kinDaughterEnergyMeV.toFixed(4)} MeV
                  </span>
                  <span className="text-[11px] text-slate-400 block">
                    (Chiếm {kinDaughterPercent.toFixed(2)}% năng lượng tỏa)
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 block">
                    v_Y ≈ {(vDaughterMPerS / 1e3).toFixed(1)} km/s
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#090F1D] border border-slate-800 text-xs text-slate-300 space-y-1">
              <div className="font-semibold text-slate-200">Bảo toàn Động lượng & Động năng:</div>
              <div>
                <MathFormula tex="\vec{p}_\alpha + \vec{p}_Y = \vec{0} \implies p_\alpha = p_Y \implies \frac{K_\alpha}{K_Y} = \frac{m_Y}{m_\alpha} \approx \frac{A_Y}{4}" />
              </div>
              <div>
                <MathFormula tex="K_\alpha = \frac{A_Y}{A_X} \Delta E; \quad K_Y = \frac{4}{A_X} \Delta E" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 6: EINSTEIN RELATIVITY (Chủ đề 4) */}
      {activeMode === 'relativity' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-5 min-w-0 bg-[#111C30] border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-base font-semibold text-white">
              Động học Tương đối tính Einstein
            </h3>

            {/* Presets */}
            <div className="space-y-1.5">
              <span className="text-xs text-slate-400 block">Chọn loại hạt:</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setRelParticle('electron');
                    setRelM0U(0.00054858);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                    relParticle === 'electron'
                      ? 'bg-cyan-600 text-white'
                      : 'bg-[#090F1D] text-slate-400 hover:text-white border border-slate-700'
                  }`}
                >
                  Electron (0,511 MeV/c²)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRelParticle('proton');
                    setRelM0U(1.00728);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                    relParticle === 'proton'
                      ? 'bg-cyan-600 text-white'
                      : 'bg-[#090F1D] text-slate-400 hover:text-white border border-slate-700'
                  }`}
                >
                  Proton (938,3 MeV/c²)
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-300 block mb-1">
                Khối lượng nghỉ <MathFormula tex="m_0\text{ (amu)}" />
              </label>
              <input
                type="number"
                step="0.00001"
                value={relM0U}
                onChange={(e) => {
                  setRelParticle('custom');
                  setRelM0U(parseFloat(e.target.value) || 0);
                }}
                className="w-full px-3 py-2 rounded-xl bg-[#090F1D] border border-slate-700 font-mono text-sm text-cyan-400 tabular-nums"
              />
              <span className="text-[11px] text-slate-500 mt-1 block">
                Năng lượng nghỉ: <MathFormula tex={`E_0 = ${relE0MeV.toFixed(3)}\text{ MeV}`} />
              </span>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs text-slate-300">
                  Tốc độ chuyển động <MathFormula tex="\beta = v/c" />
                </label>
                <span className="font-mono text-xs text-amber-300 font-bold">
                  {(relBeta * 100).toFixed(1)}% c
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={0.999}
                step={0.005}
                value={relBeta}
                onChange={(e) => setRelBeta(parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>0</span>
                <span>0,5c</span>
                <span>0,8c</span>
                <span>0,999c</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 min-w-0 bg-[#111C30] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
            <div>
              <h3 className="text-base font-semibold text-white mb-3">
                Kết quả Khối lượng động & Động năng
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-[#090F1D] border border-slate-800">
                  <span className="text-xs text-slate-400 block mb-0.5">
                    Hệ số Lorentz <MathFormula tex="\gamma = 1/\sqrt{1 - v^2/c^2}" />
                  </span>
                  <span className="font-mono tabular-nums text-xl font-bold text-purple-300">
                    {relGamma.toFixed(4)}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#090F1D] border border-slate-800">
                  <span className="text-xs text-slate-400 block mb-0.5">
                    Khối lượng động <MathFormula tex="m = \gamma m_0" />
                  </span>
                  <span className="font-mono tabular-nums text-xl font-bold text-cyan-300">
                    {(relM0U * relGamma).toFixed(5)} amu
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 block">
                    = {relMKg.toExponential(4)} kg
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#090F1D] border border-cyan-500/30">
                  <span className="text-xs text-slate-400 block mb-0.5">
                    Động năng tương đối tính <MathFormula tex="K = (m - m_0)c^2" />
                  </span>
                  <span className="font-mono tabular-nums text-xl font-bold text-amber-300">
                    {relKMeV.toFixed(3)} MeV
                  </span>
                  <span className="text-[11px] text-slate-400 block">
                    Động năng cổ điển: {relKClassicMeV.toFixed(3)} MeV
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#090F1D] border border-slate-800">
                  <span className="text-xs text-slate-400 block mb-0.5">
                    Năng lượng toàn phần <MathFormula tex="E = mc^2 = E_0 + K" />
                  </span>
                  <span className="font-mono tabular-nums text-xl font-bold text-emerald-300">
                    {relEMeV.toFixed(3)} MeV
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#090F1D] border border-slate-800 text-xs text-slate-300 space-y-1">
              <div className="font-semibold text-slate-200">Công thức cơ bản:</div>
              <div>
                <MathFormula tex="E = mc^2 = \frac{m_0 c^2}{\sqrt{1 - v^2/c^2}}; \quad K = (m - m_0)c^2 = (\gamma - 1)E_0" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
