import React, { useEffect, useRef, useState } from 'react';
import { MathFormula } from './MathFormula';
import {
  Play,
  Pause,
  RotateCcw,
  Sliders,
  Activity,
  TrendingDown,
  Layers,
} from 'lucide-react';

interface IsotopeDecayPreset {
  id: string;
  label: string;
  reactionTex: string;
  T: number;
  unit: string;
  unitToSeconds: number;
  A_parent: number;
  A_daughter: number;
}

const DECAY_PRESETS: IsotopeDecayPreset[] = [
  {
    id: 'I131',
    label: '¹³¹₅₃I (Iodine-131)',
    reactionTex: '{}^{131}_{53}\\text{I} \\rightarrow \\beta^- + {}^{131}_{54}\\text{Xe}',
    T: 8.0,
    unit: 'ngày',
    unitToSeconds: 86400,
    A_parent: 131,
    A_daughter: 131,
  },
  {
    id: 'Po210',
    label: '²¹⁰₈₄Po (Polonium-210)',
    reactionTex: '{}^{210}_{84}\\text{Po} \\rightarrow \\alpha + {}^{206}_{82}\\text{Pb}',
    T: 138,
    unit: 'ngày',
    unitToSeconds: 86400,
    A_parent: 210,
    A_daughter: 206,
  },
  {
    id: 'Na24',
    label: '²⁴₁₁Na (Sodium-24)',
    reactionTex: '{}^{24}_{11}\\text{Na} \\rightarrow \\beta^- + {}^{24}_{12}\\text{Mg}',
    T: 15.0,
    unit: 'giờ',
    unitToSeconds: 3600,
    A_parent: 24,
    A_daughter: 24,
  },
  {
    id: 'Co60',
    label: '⁶⁰₂₇Co (Cobalt-60)',
    reactionTex: '{}^{60}_{27}\\text{Co} \\rightarrow \\beta^- + {}^{60}_{28}\\text{Ni}',
    T: 5.27,
    unit: 'năm',
    unitToSeconds: 365.25 * 86400,
    A_parent: 60,
    A_daughter: 60,
  },
  {
    id: 'C14',
    label: '¹⁴₆C (Carbon-14)',
    reactionTex: '{}^{14}_{6}\\text{C} \\rightarrow \\beta^- + {}^{14}_{7}\\text{N}',
    T: 5730,
    unit: 'năm',
    unitToSeconds: 365.25 * 86400,
    A_parent: 14,
    A_daughter: 14,
  },
];

export const RadioactiveDecayGraph: React.FC = () => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('I131');
  const [halfLifeT, setHalfLifeT] = useState<number>(8.0);
  const [timeUnit, setTimeUnit] = useState<string>('ngày');
  const [timeT, setTimeT] = useState<number>(12.0);
  const [initialN0, setInitialN0] = useState<number>(100); // * 10^20 hạt
  const [A_parent, setAParent] = useState<number>(131);
  const [A_daughter, setADaughter] = useState<number>(131);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [showDaughterCurve, setShowDaughterCurve] = useState<boolean>(true);
  const [showHalfLifeGrid, setShowHalfLifeGrid] = useState<boolean>(true);

  const graphCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const isScrubbingRef = useRef<boolean>(false);

  const maxTimeOnAxis = halfLifeT * 5;

  const handleSelectPreset = (preset: IsotopeDecayPreset) => {
    setSelectedPresetId(preset.id);
    setHalfLifeT(preset.T);
    setTimeUnit(preset.unit);
    setTimeT(Number((preset.T * 1.5).toFixed(2)));
    setAParent(preset.A_parent);
    setADaughter(preset.A_daughter);
    setIsPlaying(false);
  };

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setTimeT((prev) => {
        const step = (halfLifeT * 5) / 250;
        if (prev + step >= halfLifeT * 5) {
          setIsPlaying(false);
          return Number((halfLifeT * 5).toFixed(2));
        }
        return Number((prev + step).toFixed(2));
      });
    }, 30);
    return () => clearInterval(interval);
  }, [isPlaying, halfLifeT]);

  // Derived Physics Quantities
  const k = timeT / Math.max(0.0001, halfLifeT);
  const fractionRemaining = Math.pow(2, -k);
  const fractionDecayed = 1 - fractionRemaining;
  const N_t = initialN0 * fractionRemaining;
  const deltaN_t = initialN0 * fractionDecayed;
  const ratioDaughterToParent = Math.pow(2, k) - 1;
  const massRatioDaughterToParent = (A_daughter / A_parent) * ratioDaughterToParent;

  const N_A = 6.022e23;
  const m0_grams = ((initialN0 * 1e20) / N_A) * A_parent;
  const m_remaining_grams = m0_grams * fractionRemaining;
  const m_daughter_grams = m0_grams * (A_daughter / A_parent) * fractionDecayed;

  // Render Interactive Canvas Graph
  useEffect(() => {
    const canvas = graphCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);

    ctx.save();
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    const padLeft = 68;
    const padRight = 46;
    const padTop = 38;
    const padBottom = 52;
    const plotW = Math.max(100, width - padLeft - padRight);
    const plotH = Math.max(100, height - padTop - padBottom);

    // Background
    ctx.fillStyle = '#090F1D';
    ctx.fillRect(0, 0, width, height);

    const tMax = halfLifeT * 5;
    const xOfT = (tVal: number) => padLeft + (tVal / tMax) * plotW;
    const yOfN = (nVal: number) => padTop + plotH - (nVal / initialN0) * plotH;

    // Horizontal percentage grid lines
    const yLevels = [
      { frac: 1.0, label: 'N₀ (100%)' },
      { frac: 0.75, label: '0,75 N₀' },
      { frac: 0.5, label: '0,50 N₀' },
      { frac: 0.25, label: '0,25 N₀' },
      { frac: 0.125, label: '0,125 N₀' },
      { frac: 0, label: '0' },
    ];

    yLevels.forEach((lvl) => {
      const y = yOfN(initialN0 * lvl.frac);
      ctx.strokeStyle =
        lvl.frac === 0.5 ? 'rgba(148, 163, 184, 0.35)' : 'rgba(51, 65, 85, 0.35)';
      ctx.lineWidth = 1;
      ctx.setLineDash(lvl.frac === 0.5 ? [5, 5] : []);
      ctx.beginPath();
      ctx.moveTo(padLeft, y);
      ctx.lineTo(padLeft + plotW, y);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#94A3B8';
      ctx.font = '500 11px "IBM Plex Mono", monospace';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(lvl.label, padLeft - 8, y);
    });

    // Vertical Half-Life Grid Lines (T, 2T, 3T, 4T, 5T)
    for (let m = 0; m <= 5; m++) {
      const tVal = m * halfLifeT;
      const x = xOfT(tVal);

      if (showHalfLifeGrid && m > 0) {
        ctx.strokeStyle =
          m === 1 ? 'rgba(245, 158, 11, 0.4)' : 'rgba(51, 65, 85, 0.4)';
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(x, padTop);
        ctx.lineTo(x, padTop + plotH);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      ctx.fillStyle = m === 1 ? '#FCD34D' : '#94A3B8';
      ctx.font = '500 11px "IBM Plex Mono", monospace';
      ctx.textAlign = m === 5 ? 'right' : m === 0 ? 'center' : 'center';
      ctx.textBaseline = 'top';
      const label =
        m === 0
          ? '0'
          : width < 480
          ? `${m}T`
          : `${m}T (${Number(tVal.toFixed(1))})`;
      ctx.fillText(label, m === 5 ? x + 12 : x, padTop + plotH + 10);
    }

    // Axes
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(padLeft, padTop);
    ctx.lineTo(padLeft, padTop + plotH);
    ctx.lineTo(padLeft + plotW, padTop + plotH);
    ctx.stroke();

    // Axis Titles
    ctx.fillStyle = '#CBD5E1';
    ctx.font = '600 12px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`Số hạt nhân (×10²⁰ hạt)`, padLeft, padTop - 16);
    ctx.textAlign = 'right';
    ctx.fillText(`Thời gian t (${timeUnit})`, padLeft + plotW, padTop + plotH + 30);

    // 1. Draw Daughter Nuclei Growth Curve ΔN(t) = N0 * (1 - 2^(-t/T))
    if (showDaughterCurve) {
      ctx.strokeStyle = '#10B981';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let px = 0; px <= plotW; px += 2) {
        const tSample = (px / plotW) * tMax;
        const nVal = initialN0 * (1 - Math.pow(2, -tSample / halfLifeT));
        const x = padLeft + px;
        const y = yOfN(nVal);
        if (px === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.fillStyle = 'rgba(16, 185, 129, 0.06)';
      ctx.lineTo(padLeft + plotW, padTop + plotH);
      ctx.lineTo(padLeft, padTop + plotH);
      ctx.closePath();
      ctx.fill();
    }

    // 2. Draw Parent Nuclei Decay Curve N(t) = N0 * 2^(-t/T)
    ctx.strokeStyle = '#06B6D4';
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let px = 0; px <= plotW; px += 2) {
      const tSample = (px / plotW) * tMax;
      const nVal = initialN0 * Math.pow(2, -tSample / halfLifeT);
      const x = padLeft + px;
      const y = yOfN(nVal);
      if (px === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Area fill under Parent curve up to current time t
    const curX = xOfT(Math.min(timeT, tMax));
    ctx.fillStyle = 'rgba(6, 182, 212, 0.12)';
    ctx.beginPath();
    ctx.moveTo(padLeft, yOfN(initialN0));
    for (let px = 0; px <= curX - padLeft; px += 2) {
      const tSample = (px / plotW) * tMax;
      const nVal = initialN0 * Math.pow(2, -tSample / halfLifeT);
      ctx.lineTo(padLeft + px, yOfN(nVal));
    }
    ctx.lineTo(curX, padTop + plotH);
    ctx.lineTo(padLeft, padTop + plotH);
    ctx.closePath();
    ctx.fill();

    // Mark intersection at t = T, N = 0.5 N0
    if (showDaughterCurve) {
      const interX = xOfT(halfLifeT);
      const interY = yOfN(initialN0 * 0.5);
      ctx.fillStyle = '#F59E0B';
      ctx.beginPath();
      ctx.arc(interX, interY, 5, 0, Math.PI * 2);
      ctx.fill();

      // Only draw text label if current scrubber isn't right on top of t=T
      if (Math.abs(curX - interX) > 35) {
        ctx.fillStyle = '#FDE68A';
        ctx.font = '600 11px "IBM Plex Mono", monospace';
        ctx.textAlign = 'left';
        ctx.fillText('Giao điểm t = T (50%)', interX + 8, interY - 8);
      }
    }

    // Current time t vertical scrubber line & points
    const curYParent = yOfN(N_t);
    const curYDaughter = yOfN(deltaN_t);

    ctx.strokeStyle = '#F8FAFC';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(curX, padTop);
    ctx.lineTo(curX, padTop + plotH);
    ctx.stroke();
    ctx.setLineDash([]);

    // Parent marker dot
    ctx.fillStyle = '#06B6D4';
    ctx.beginPath();
    ctx.arc(curX, curYParent, 6.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Daughter marker dot
    if (showDaughterCurve) {
      ctx.fillStyle = '#10B981';
      ctx.beginPath();
      ctx.arc(curX, curYDaughter, 6.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Dynamically sized Floating Readout Tag on Canvas (Never overflows box)
    const line1 = `t = ${timeT.toFixed(2)} ${timeUnit} (${k.toFixed(2)}T)`;
    const line2 = `N(t) = ${N_t.toFixed(2)} (${(fractionRemaining * 100).toFixed(1)}%)`;
    const line3 = `ΔN(t) = ${deltaN_t.toFixed(2)} (${(fractionDecayed * 100).toFixed(1)}%)`;

    ctx.font = '600 11px "IBM Plex Mono", monospace';
    const maxLineW = Math.max(
      ctx.measureText(line1).width,
      ctx.measureText(line2).width,
      ctx.measureText(line3).width
    );

    const boxW = Math.ceil(maxLineW + 24);
    const boxH = 68;
    let boxX = curX + 14;
    if (boxX + boxW > width - padRight) {
      boxX = Math.max(padLeft + 6, curX - boxW - 14);
    }
    const boxY = Math.max(
      padTop + 6,
      Math.min(curYParent - 24, padTop + plotH - boxH - 6)
    );

    ctx.fillStyle = 'rgba(15, 23, 42, 0.94)';
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.5)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(boxX, boxY, boxW, boxH, 8);
    ctx.fill();
    ctx.stroke();

    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = '#F8FAFC';
    ctx.fillText(line1, boxX + 12, boxY + 19);
    ctx.fillStyle = '#22D3EE';
    ctx.fillText(line2, boxX + 12, boxY + 38);
    ctx.fillStyle = '#34D399';
    ctx.fillText(line3, boxX + 12, boxY + 56);

    ctx.restore();
  }, [
    halfLifeT,
    timeT,
    initialN0,
    timeUnit,
    showDaughterCurve,
    showHalfLifeGrid,
    N_t,
    deltaN_t,
    k,
    fractionRemaining,
    fractionDecayed,
  ]);

  const updateTimeFromCanvasEvent = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = graphCanvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const padLeft = 68;
    const padRight = 46;
    const plotW = Math.max(100, rect.width - padLeft - padRight);
    const relX = Math.max(0, Math.min(plotW, e.clientX - rect.left - padLeft));
    const newT = (relX / plotW) * (halfLifeT * 5);
    setTimeT(Number(newT.toFixed(2)));
  };

  const currentPreset =
    DECAY_PRESETS.find((p) => p.id === selectedPresetId) || DECAY_PRESETS[0];

  const parentCellsCount = Math.round(fractionRemaining * 100);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* LEFT ZONE: Interactive Exponential Graph & 100-Nuclei Visual Matrix (7 cols) */}
        <div className="lg:col-span-7 min-w-0 flex flex-col gap-5">
          <div className="bg-[#111C30] border border-slate-800 rounded-2xl overflow-hidden flex flex-col">
            {/* Top Graph Header */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 bg-[#0D1627] border-b border-slate-800">
              <div className="min-w-0">
                <h2 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-cyan-400 shrink-0" />
                  <span className="truncate">Đồ thị Định luật Phóng xạ theo Thời gian</span>
                </h2>
                <p className="text-xs text-slate-400">
                  Bấm hoặc kéo trực tiếp trên đồ thị để khảo sát số hạt nhân tại thời điểm <MathFormula tex="t" /> bất kì
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowDaughterCurve((v) => !v)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap shrink-0 ${
                    showDaughterCurve
                      ? 'bg-emerald-950/80 border-emerald-600/50 text-emerald-300'
                      : 'bg-slate-900 border-slate-700 text-slate-400'
                  }`}
                >
                  Đường cong hạt con ΔN(t)
                </button>
                <button
                  type="button"
                  onClick={() => setShowHalfLifeGrid((v) => !v)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap shrink-0 ${
                    showHalfLifeGrid
                      ? 'bg-amber-950/80 border-amber-600/50 text-amber-300'
                      : 'bg-slate-900 border-slate-700 text-slate-400'
                  }`}
                >
                  Mốc chu kì k·T
                </button>
              </div>
            </div>

            {/* Interactive Graph Canvas */}
            <div className="relative h-[370px] w-full select-none">
              <canvas
                ref={graphCanvasRef}
                onPointerDown={(e) => {
                  isScrubbingRef.current = true;
                  updateTimeFromCanvasEvent(e);
                }}
                onPointerMove={(e) => {
                  if (isScrubbingRef.current) updateTimeFromCanvasEvent(e);
                }}
                onPointerUp={() => {
                  isScrubbingRef.current = false;
                }}
                onPointerLeave={() => {
                  isScrubbingRef.current = false;
                }}
                className="w-full h-full block cursor-crosshair touch-none"
              />
            </div>

            {/* Graph Legend */}
            <div className="px-5 py-3 bg-[#0D1627] border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm bg-cyan-400 inline-block shrink-0" />
                  <span className="text-slate-300">
                    Hạt mẹ còn lại: <MathFormula tex="N(t) = N_0 \cdot 2^{-t/T}" />
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm bg-emerald-400 inline-block shrink-0" />
                  <span className="text-slate-300">
                    Hạt con sinh ra: <MathFormula tex="\Delta N(t) = N_0(1 - 2^{-t/T})" />
                  </span>
                </div>
              </div>
              <div className="font-mono text-slate-400 tabular-nums overflow-x-auto">
                Phương trình: <MathFormula tex={currentPreset.reactionTex} />
              </div>
            </div>
          </div>

          {/* Visual 100-Atom Decay Matrix */}
          <div className="bg-[#111C30] border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Mô hình trực quan 100 phần tử mẫu tại t = {timeT.toFixed(2)} {timeUnit}</span>
              </h3>
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono tabular-nums">
                <span className="text-cyan-300">● {parentCellsCount}% Hạt mẹ chưa phân rã</span>
                <span className="text-emerald-300">● {100 - parentCellsCount}% Đã thành hạt con</span>
              </div>
            </div>

            <div className="grid grid-cols-10 sm:grid-cols-20 gap-1.5 p-3 bg-[#090F1D] border border-slate-800/80 rounded-xl">
              {Array.from({ length: 100 }).map((_, idx) => {
                const isParent = idx < parentCellsCount;
                return (
                  <div
                    key={idx}
                    className={`h-3.5 rounded-sm transition-colors duration-150 ${
                      isParent
                        ? 'bg-cyan-500 shadow-[0_0_6px_rgba(6,182,212,0.45)]'
                        : 'bg-emerald-500/45 border border-emerald-500/40'
                    }`}
                    title={isParent ? 'Hạt nhân mẹ (chưa phân rã)' : 'Hạt nhân con (đã phân rã)'}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT ZONE: Sliders & Quantitative Telemetry (5 cols) */}
        <div className="lg:col-span-5 min-w-0 flex flex-col gap-5">
          {/* Isotope Presets & Sliders Deck */}
          <div className="bg-[#111C30] border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base font-semibold text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-cyan-400 shrink-0" />
                Bảng điều khiển tham số
              </h3>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (timeT >= maxTimeOnAxis) setTimeT(0);
                    setIsPlaying((v) => !v);
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  {isPlaying ? 'Tạm dừng' : 'Chạy thời gian t'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsPlaying(false);
                    setTimeT(halfLifeT);
                  }}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                  title="Đặt về t = T"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Preset Selector */}
            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 block">
                Chọn đồng vị phóng xạ trong SGK:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2">
                {DECAY_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleSelectPreset(preset)}
                    className={`px-3 py-2 rounded-xl border text-left text-xs transition-colors min-w-0 ${
                      selectedPresetId === preset.id
                        ? 'bg-cyan-950/90 border-cyan-400 text-white font-semibold'
                        : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:bg-slate-900'
                    }`}
                  >
                    <div className="truncate">{preset.label}</div>
                    <div className="text-[11px] font-mono tabular-nums text-cyan-400 truncate">
                      T = {preset.T} {preset.unit}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Slider 1: Half-life T */}
            <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <label htmlFor="slider-T" className="font-medium text-slate-300">
                  1. Chu kì bán rã (<MathFormula tex="T" />):
                </label>
                <span className="font-mono tabular-nums font-bold text-amber-300">
                  T = {halfLifeT} {timeUnit}
                </span>
              </div>
              <input
                id="slider-T"
                type="range"
                min={1}
                max={200}
                step={0.5}
                value={Math.min(200, halfLifeT)}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setHalfLifeT(val);
                  if (timeT > val * 5) setTimeT(val * 2);
                }}
                className="w-full"
              />
            </div>

            {/* Slider 2: Time t */}
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <label htmlFor="slider-t" className="font-medium text-slate-300">
                  2. Thời gian khảo sát (<MathFormula tex="t" />):
                </label>
                <span className="font-mono tabular-nums font-bold text-cyan-300">
                  t = {timeT.toFixed(2)} {timeUnit} ({k.toFixed(2)}T)
                </span>
              </div>
              <input
                id="slider-t"
                type="range"
                min={0}
                max={maxTimeOnAxis}
                step={maxTimeOnAxis / 200}
                value={Math.min(maxTimeOnAxis, timeT)}
                onChange={(e) => {
                  setIsPlaying(false);
                  setTimeT(Number(e.target.value));
                }}
                className="w-full"
              />
              {/* Quick Jump Buttons: t = 0.5T, T, 1.5T, 2T, 3T, 4T */}
              <div className="grid grid-cols-6 gap-1.5 pt-1">
                {[0.5, 1, 1.5, 2, 3, 4].map((mult) => (
                  <button
                    key={mult}
                    type="button"
                    onClick={() => {
                      setIsPlaying(false);
                      setTimeT(Number((mult * halfLifeT).toFixed(2)));
                    }}
                    className={`py-1 rounded-md text-[11px] font-mono tabular-nums border transition-colors ${
                      Math.abs(k - mult) < 0.03
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 font-semibold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {mult}T
                  </button>
                ))}
              </div>
            </div>

            {/* Slider 3: Initial Quantity N0 */}
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <label htmlFor="slider-N0" className="font-medium text-slate-300">
                  3. Số hạt ban đầu (<MathFormula tex="N_0" />):
                </label>
                <span className="font-mono tabular-nums font-bold text-slate-200">
                  {initialN0} × 10²⁰ hạt (m₀ ≈ {m0_grams.toFixed(2)} g)
                </span>
              </div>
              <input
                id="slider-N0"
                type="range"
                min={10}
                max={500}
                step={10}
                value={initialN0}
                onChange={(e) => setInitialN0(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>

          {/* Quantitative Readouts & Daughter/Parent Ratio Card */}
          <div className="bg-[#111C30] border border-slate-800 rounded-2xl p-5 flex-1 flex flex-col justify-between space-y-4">
            <h3 className="text-base font-semibold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Kết quả giải tích tại t = {timeT.toFixed(2)} {timeUnit}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 min-w-0">
                <span className="text-xs text-slate-400 block mb-1">
                  Hạt nhân mẹ còn lại <MathFormula tex="N(t)" />
                </span>
                <div className="font-mono tabular-nums text-lg font-bold text-cyan-300 truncate">
                  {N_t.toFixed(2)} × 10²⁰
                </div>
                <div className="text-xs font-mono tabular-nums text-slate-400 mt-0.5">
                  Còn {(fractionRemaining * 100).toFixed(2)}% · m(t) = {m_remaining_grams.toFixed(3)} g
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 min-w-0">
                <span className="text-xs text-slate-400 block mb-1">
                  Hạt nhân con tạo thành <MathFormula tex="\Delta N(t)" />
                </span>
                <div className="font-mono tabular-nums text-lg font-bold text-emerald-300 truncate">
                  {deltaN_t.toFixed(2)} × 10²⁰
                </div>
                <div className="text-xs font-mono tabular-nums text-slate-400 mt-0.5">
                  Phân rã {(fractionDecayed * 100).toFixed(2)}% · m_con = {m_daughter_grams.toFixed(3)} g
                </div>
              </div>
            </div>

            {/* Daughter-to-Parent Ratio Highlight */}
            <div className="p-4 rounded-xl bg-slate-900/95 border border-amber-500/30 space-y-2 overflow-x-auto">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-semibold text-amber-300">
                  Tỉ số số hạt nhân Con / Mẹ tại thời điểm t:
                </span>
                <span className="font-mono tabular-nums text-base font-bold text-amber-300">
                  {ratioDaughterToParent.toFixed(3)}
                </span>
              </div>
              <div className="text-xs text-slate-300 overflow-x-auto py-0.5">
                <MathFormula
                  tex={`\\frac{N_{\\text{con}}}{N_{\\text{mẹ}}} = 2^{t/T} - 1 = 2^{${k.toFixed(
                    2
                  )}} - 1 = ${ratioDaughterToParent.toFixed(3)}`}
                />
              </div>
              <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="text-slate-400">
                  Tỉ số khối lượng Con / Mẹ (<MathFormula tex="\frac{m_{\text{con}}}{m_{\text{mẹ}}} = \frac{A_{\text{con}}}{A_{\text{mẹ}}}(2^{t/T}-1)" />):
                </span>
                <span className="font-mono tabular-nums font-semibold text-emerald-300">
                  {massRatioDaughterToParent.toFixed(3)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
