/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { NucleusBuilderLab } from './components/NucleusBuilderLab';
import { RadioactiveDecayGraph } from './components/RadioactiveDecayGraph';
import { TheoryHandbook } from './components/TheoryHandbook';
import { ExamBank2025 } from './components/ExamBank2025';
import { NuclearCalculator } from './components/NuclearCalculator';
import { MathFormula } from './components/MathFormula';

type ModuleTab = 'lab' | 'graph' | 'theory' | 'exam' | 'calculator';

const NAV_ITEMS: { id: ModuleTab; label: string; shortDesc: string }[] = [
  {
    id: 'lab',
    label: 'Phòng thí nghiệm',
    shortDesc: 'Tạo dựng hạt nhân & kích hoạt phân rã 60 FPS',
  },
  {
    id: 'graph',
    label: 'Đồ thị phóng xạ',
    shortDesc: 'Đường cong N(t), ΔN(t) & tỉ số con/mẹ',
  },
  {
    id: 'theory',
    label: 'Sổ tay 12 chủ đề',
    shortDesc: 'Lý thuyết chuẩn SGK mới & bẫy đề thi',
  },
  {
    id: 'exam',
    label: 'Đề thi 2025–2026',
    shortDesc: 'Trắc nghiệm 4 lựa chọn, Đúng/Sai & Trả lời ngắn',
  },
  {
    id: 'calculator',
    label: 'Máy tính hạt nhân',
    shortDesc: 'Giải nhanh Δm, W_lkr, H (Bq/Ci), ¹⁴C & ²⁴Na',
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<ModuleTab>('lab');

  return (
    <div className="min-h-screen flex flex-col bg-[#0B1120] text-slate-100 overflow-x-hidden">
      {/* Strict 3-Zone Top Navigation Bar Contract */}
      <header className="sticky top-0 z-30 flex items-center justify-between gap-4 xl:gap-8 px-4 sm:px-6 py-3.5 bg-[#0B1120]/90 backdrop-blur-md border-b border-slate-800/90">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('lab');
          }}
          className="font-display text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0"
        >
          Vật lý Hạt nhân 12
        </a>

        {/* Zone 2: 5 clean single-line text navigation links */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-medium">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`py-1 border-b-2 transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'border-cyan-400 text-white font-semibold'
                    : 'border-transparent text-slate-400 hover:text-slate-100 hover:border-slate-700'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab(activeTab === 'exam' ? 'lab' : 'exam')}
            className="px-3.5 py-2 text-xs font-semibold text-slate-950 bg-cyan-400 rounded-lg hover:bg-cyan-300 transition-colors whitespace-nowrap shrink-0"
          >
            {activeTab === 'exam' ? 'Mở Phòng thí nghiệm' : 'Thi thử Form 2025'}
          </button>
        </div>
      </header>

      {/* Tablet & Mobile Navigation Bar (visible below lg) */}
      <div className="lg:hidden flex items-center gap-1.5 overflow-x-auto px-4 py-2.5 bg-[#0D1627] border-b border-slate-800">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveTab(item.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
              activeTab === item.id
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Main Content Container */}
      <main className="flex-1 w-full max-w-[1380px] mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* Contextual Workspace Header & Quick Physical Constants Strip */}
        <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-4 border-b border-slate-800/80">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-cyan-400 font-medium">
              <span>Chương 4 · Vật lý Hạt nhân & Phóng xạ</span>
              <span aria-hidden="true">·</span>
              <span>Chương trình GDPT 2018</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {NAV_ITEMS.find((i) => i.id === activeTab)?.label} —{' '}
              <span className="text-slate-300 font-normal text-lg sm:text-xl">
                {NAV_ITEMS.find((i) => i.id === activeTab)?.shortDesc}
              </span>
            </h1>
          </div>

          {/* Standard Constants Reference Bar (Unboxed clean text with separators) */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 font-mono tabular-nums">
            <span>
              <MathFormula tex="m_p = 1,00728\text{ amu}" />
            </span>
            <span aria-hidden="true">·</span>
            <span>
              <MathFormula tex="m_n = 1,00866\text{ amu}" />
            </span>
            <span aria-hidden="true">·</span>
            <span>
              <MathFormula tex="1\text{ amu}\cdot c^2 = 931,5\text{ MeV}" />
            </span>
            <span aria-hidden="true">·</span>
            <span>
              <MathFormula tex="1\text{ Ci} = 3,7\cdot 10^{10}\text{ Bq}" />
            </span>
          </div>
        </section>

        {/* Active Module Workspace */}
        <section>
          {activeTab === 'lab' && <NucleusBuilderLab />}
          {activeTab === 'graph' && <RadioactiveDecayGraph />}
          {activeTab === 'theory' && <TheoryHandbook />}
          {activeTab === 'exam' && <ExamBank2025 />}
          {activeTab === 'calculator' && <NuclearCalculator />}
        </section>
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-slate-800/80 py-5 px-6 text-center text-xs text-slate-500">
        <div className="max-w-[1380px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            Học liệu Tương tác Vật lý Hạt nhân & Phóng xạ Lớp 12 (Chương trình GDPT Mới)
          </span>
          <div className="flex items-center gap-3">
            {NAV_ITEMS.map((item, idx) => (
              <React.Fragment key={item.id}>
                {idx > 0 && <span aria-hidden="true">·</span>}
                <button
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className="hover:text-slate-300 transition-colors"
                >
                  {item.label}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
