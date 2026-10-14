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
import {
  Atom,
  TrendingDown,
  BookOpen,
  Award,
  Calculator,
  ChevronDown,
  Info,
} from 'lucide-react';

type ModuleTab = 'lab' | 'graph' | 'theory' | 'exam' | 'calculator';

interface NavItem {
  id: ModuleTab;
  label: string;
  mobileLabel: string;
  shortDesc: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: 'lab',
    label: 'Phòng thí nghiệm',
    mobileLabel: 'Phòng TN',
    shortDesc: 'Tạo dựng hạt nhân & kích hoạt phân rã 60 FPS',
    icon: Atom,
  },
  {
    id: 'graph',
    label: 'Đồ thị phóng xạ',
    mobileLabel: 'Đồ thị',
    shortDesc: 'Đường cong N(t), ΔN(t) & tỉ số con/mẹ',
    icon: TrendingDown,
  },
  {
    id: 'theory',
    label: 'Sổ tay 12 chủ đề',
    mobileLabel: 'Sổ tay',
    shortDesc: 'Lý thuyết chuẩn SGK mới & bẫy đề thi',
    icon: BookOpen,
  },
  {
    id: 'exam',
    label: 'Đề thi 2025–2026',
    mobileLabel: 'Đề thi',
    shortDesc: 'Trắc nghiệm 4 lựa chọn, Đúng/Sai & Trả lời ngắn',
    icon: Award,
  },
  {
    id: 'calculator',
    label: 'Máy tính hạt nhân',
    mobileLabel: 'Máy tính',
    shortDesc: 'Giải nhanh Δm, W_lkr, H (Bq/Ci), ¹⁴C & ²⁴Na',
    icon: Calculator,
  },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<ModuleTab>('lab');
  const [showConstantsMobile, setShowConstantsMobile] = useState<boolean>(false);

  const activeItem = NAV_ITEMS.find((i) => i.id === activeTab) || NAV_ITEMS[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#0B1120] text-slate-100 overflow-x-hidden pb-16 sm:pb-0">
      {/* Top Header - Responsive for Mobile, Tablet, Laptop, Desktop */}
      <header className="sticky top-0 z-30 flex items-center justify-between gap-3 px-3.5 sm:px-6 py-2.5 sm:py-3.5 bg-[#0B1120]/95 backdrop-blur-md border-b border-slate-800/90">
        {/* Brand */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('lab');
          }}
          className="flex items-center gap-2 font-display text-base sm:text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 hover:text-cyan-300 transition-colors"
        >
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-tr from-cyan-600 to-sky-400 flex items-center justify-center text-slate-950 font-black shadow-sm">
            ⚛
          </div>
          <span>Vật lý Hạt nhân 12</span>
        </a>

        {/* Desktop Navigation Links (>= lg) */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-7 text-sm font-medium">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`py-1 border-b-2 flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'border-cyan-400 text-white font-semibold'
                    : 'border-transparent text-slate-400 hover:text-slate-100 hover:border-slate-700'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Primary Action Button */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab(activeTab === 'exam' ? 'lab' : 'exam')}
            className="px-3 sm:px-3.5 py-1.5 sm:py-2 text-xs font-semibold text-slate-950 bg-cyan-400 rounded-lg hover:bg-cyan-300 active:scale-95 transition-all whitespace-nowrap shrink-0 shadow-sm"
          >
            {activeTab === 'exam' ? 'Mở Phòng TN' : 'Thi thử 2025'}
          </button>
        </div>
      </header>

      {/* Tablet Sub-Navigation Strip (visible between sm and lg) */}
      <div className="hidden sm:flex lg:hidden items-center gap-1.5 overflow-x-auto no-scrollbar px-4 py-2 bg-[#0D1627] border-b border-slate-800">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors ${
                isActive
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Content Container */}
      <main className="flex-1 w-full max-w-[1400px] mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
        {/* Contextual Workspace Header & Quick Physical Constants Strip */}
        <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-3 pb-3 sm:pb-4 border-b border-slate-800/80">
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2 text-[11px] sm:text-xs text-cyan-400 font-medium">
              <span>Chương 4 · Vật lý Hạt nhân & Phóng xạ</span>
              <span aria-hidden="true">·</span>
              <span>GDPT 2018</span>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight">
              {activeItem.label}{' '}
              <span className="text-slate-400 font-normal text-sm sm:text-lg block sm:inline mt-0.5 sm:mt-0">
                — {activeItem.shortDesc}
              </span>
            </h1>
          </div>

          {/* Constants Bar - Mobile Collapsible, Desktop Always Visible */}
          <div className="shrink-0">
            {/* Mobile Toggle Button */}
            <div className="sm:hidden flex items-center justify-between">
              <button
                type="button"
                onClick={() => setShowConstantsMobile((v) => !v)}
                className="text-[11px] text-cyan-400 flex items-center gap-1 hover:underline py-1"
              >
                <Info className="w-3.5 h-3.5" />
                <span>{showConstantsMobile ? 'Ẩn hằng số vật lý' : 'Xem hằng số chuẩn SGK'}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${showConstantsMobile ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Constants Text */}
            <div
              className={`${
                showConstantsMobile ? 'flex' : 'hidden sm:flex'
              } flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] sm:text-xs text-slate-400 font-mono tabular-nums bg-slate-900/60 sm:bg-transparent p-2 sm:p-0 rounded-lg sm:rounded-none border border-slate-800/80 sm:border-none mt-1 sm:mt-0`}
            >
              <span>
                <MathFormula tex="m_p = 1,00728\text{ amu}" />
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>
                <MathFormula tex="m_n = 1,00866\text{ amu}" />
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>
                <MathFormula tex="1\text{ u}\cdot c^2 = 931,5\text{ MeV}" />
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>
                <MathFormula tex="1\text{ Ci} = 3,7\cdot 10^{10}\text{ Bq}" />
              </span>
            </div>
          </div>
        </section>

        {/* Active Module Workspace */}
        <section className="min-w-0">
          {activeTab === 'lab' && <NucleusBuilderLab />}
          {activeTab === 'graph' && <RadioactiveDecayGraph />}
          {activeTab === 'theory' && <TheoryHandbook />}
          {activeTab === 'exam' && <ExamBank2025 />}
          {activeTab === 'calculator' && <NuclearCalculator />}
        </section>
      </main>

      {/* Mobile Bottom Navigation Bar (< sm) - Gold standard for Mobile UX */}
      <nav
        aria-label="Điều hướng di động"
        className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0B1120]/95 backdrop-blur-lg border-t border-slate-800 px-2 py-1.5 safe-area-bottom shadow-2xl"
      >
        <div className="grid grid-cols-5 gap-1 items-center">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all ${
                  isActive
                    ? 'text-cyan-400 bg-cyan-500/10 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 mb-0.5 ${isActive ? 'text-cyan-400 scale-110' : 'text-slate-400'}`} />
                <span className="text-[10px] leading-tight truncate">{item.mobileLabel}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Quiet Footer */}
      <footer className="border-t border-slate-800/80 py-4 sm:py-5 px-4 sm:px-6 text-center text-xs text-slate-500">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            Học liệu Tương tác Vật lý Hạt nhân & Phóng xạ Lớp 12 (GDPT 2018)
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[11px] sm:text-xs">
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
