import React, { useState } from 'react';
import { THEORY_TOPICS } from '../data/theoryTopicsData';
import { MathFormula, MathText } from './MathFormula';
import {
  BookOpen,
  AlertOctagon,
  CheckCircle2,
  Lightbulb,
  ChevronRight,
  Search,
} from 'lucide-react';

export const TheoryHandbook: React.FC = () => {
  const [selectedTopicId, setSelectedTopicId] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showSolution, setShowSolution] = useState<boolean>(true);

  const filteredTopics = THEORY_TOPICS.filter((t) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      t.title.toLowerCase().includes(q) ||
      t.subtitle.toLowerCase().includes(q) ||
      t.summaryPoints.some((p) => p.toLowerCase().includes(q))
    );
  });

  const activeTopic =
    THEORY_TOPICS.find((t) => t.id === selectedTopicId) || THEORY_TOPICS[0];

  const [showMobileList, setShowMobileList] = useState<boolean>(false);

  return (
    <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-6 items-start">
      {/* MOBILE / TABLET QUICK TOPIC BAR (< lg) */}
      <div className="lg:hidden bg-[#111C30] border border-slate-800 rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <label htmlFor="mobile-topic-dropdown" className="text-xs font-semibold text-cyan-400 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" />
            <span>Chọn nhanh 1 trong 12 Chuyên đề SGK:</span>
          </label>
          <span className="text-[11px] font-mono text-slate-400">
            {activeTopic.id}/12
          </span>
        </div>

        {/* Dropdown Selector */}
        <select
          id="mobile-topic-dropdown"
          value={selectedTopicId}
          onChange={(e) => setSelectedTopicId(Number(e.target.value))}
          className="w-full bg-[#090F1D] border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-400 font-medium"
        >
          {THEORY_TOPICS.map((t) => (
            <option key={t.id} value={t.id} className="bg-[#090F1D] text-white">
              {t.code}: {t.title}
            </option>
          ))}
        </select>

        {/* Horizontal Chips for 1-Tap Switching */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
          {THEORY_TOPICS.map((t) => {
            const isSel = t.id === selectedTopicId;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setSelectedTopicId(t.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono whitespace-nowrap shrink-0 transition-colors ${
                  isSel
                    ? 'bg-cyan-500/25 border border-cyan-400 text-cyan-200 font-bold'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                CĐ {t.id}
              </button>
            );
          })}
        </div>

        {/* Mobile Toggle Full Directory Button */}
        <button
          type="button"
          onClick={() => setShowMobileList((v) => !v)}
          className="text-xs text-slate-400 hover:text-cyan-300 flex items-center justify-center gap-1 w-full pt-1"
        >
          <span>{showMobileList ? 'Thu gọn danh mục tìm kiếm' : 'Tìm kiếm & xem chi tiết danh mục 12 chủ đề'}</span>
          <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showMobileList ? 'rotate-90' : ''}`} />
        </button>
      </div>

      {/* FULL SIDEBAR: Permanent on Desktop (lg:col-span-4), Collapsible on Mobile (< lg) */}
      <div
        className={`${
          showMobileList ? 'block' : 'hidden lg:block'
        } lg:col-span-4 min-w-0 bg-[#111C30] border border-slate-800 rounded-2xl p-4 space-y-3`}
      >
        <div className="flex items-center justify-between px-1">
          <h2 className="text-base font-semibold text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-cyan-400 shrink-0" />
            Danh mục 12 Chuyên đề SGK
          </h2>
          <span className="text-xs font-mono tabular-nums text-slate-400 shrink-0">
            {filteredTopics.length}/12 chủ đề
          </span>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm chuyên đề (VD: C-14, ZnS, độ hụt khối...)"
            className="w-full pl-9 pr-3 py-2 bg-[#090F1D] border border-slate-800 rounded-xl text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Topic List */}
        <div className="space-y-1.5 max-h-[560px] overflow-y-auto pr-1">
          {filteredTopics.map((topic) => {
            const isActive = topic.id === activeTopic.id;
            return (
              <button
                key={topic.id}
                type="button"
                onClick={() => {
                  setSelectedTopicId(topic.id);
                  setShowMobileList(false);
                }}
                className={`w-full text-left p-3 rounded-xl border transition-all flex items-start justify-between gap-2 ${
                  isActive
                    ? 'bg-cyan-950/85 border-cyan-500/60 text-white shadow-sm'
                    : 'bg-slate-900/60 border-slate-800/80 text-slate-300 hover:bg-slate-900 hover:border-slate-700'
                }`}
              >
                <div className="space-y-0.5 min-w-0">
                  <div className="text-[11px] font-mono tabular-nums text-cyan-400 font-semibold">
                    {topic.code}
                  </div>
                  <div className="text-xs font-semibold text-slate-100 leading-snug">
                    {topic.title}
                  </div>
                </div>
                <ChevronRight
                  className={`w-4 h-4 shrink-0 mt-1 transition-transform ${
                    isActive ? 'text-cyan-400 translate-x-0.5' : 'text-slate-600'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* RIGHT CONTENT AREA: Detailed Theory, KaTeX Formulas & Exam Traps Table (8 cols) */}
      <div className="lg:col-span-8 min-w-0 space-y-6">
        {/* Topic Header Card */}
        <div className="bg-[#111C30] border border-slate-800 rounded-2xl p-4 sm:p-6 space-y-4 sm:space-y-5">
          <div className="border-b border-slate-800 pb-4 flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
            <div className="space-y-1 min-w-0 flex-1">
              <div className="text-[11px] sm:text-xs font-mono tabular-nums text-cyan-400 font-semibold">
                {activeTopic.code} · Chương trình Vật lý 12 GDPT Mới
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {activeTopic.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{activeTopic.subtitle}</p>
            </div>

            {/* Prev / Next Navigation Buttons */}
            <div className="flex items-center gap-2 shrink-0 self-stretch sm:self-auto justify-between sm:justify-end pt-1 sm:pt-0">
              <button
                type="button"
                disabled={activeTopic.id <= 1}
                onClick={() => setSelectedTopicId((id) => Math.max(1, id - 1))}
                className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-medium text-slate-200 hover:bg-slate-800 disabled:opacity-40 transition-colors text-center"
              >
                ← Chủ đề trước
              </button>
              <button
                type="button"
                disabled={activeTopic.id >= 12}
                onClick={() => setSelectedTopicId((id) => Math.min(12, id + 1))}
                className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-xs font-semibold text-white disabled:opacity-40 transition-colors text-center"
              >
                Chủ đề tiếp →
              </button>
            </div>
          </div>

          {/* Section 1: Core Textbook Theory Points */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-cyan-300">
              I. Trọng tâm Lý thuyết Chuẩn SGK
            </h3>
            <div className="space-y-2.5">
              {activeTopic.summaryPoints.map((pt, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[#090F1D] border border-slate-800/90 text-sm text-slate-200 leading-relaxed flex items-start gap-3 min-w-0"
                >
                  <span className="font-mono text-xs font-bold text-cyan-400 mt-0.5 shrink-0 tabular-nums">
                    0{idx + 1}.
                  </span>
                  <MathText text={pt} className="flex-1 min-w-0 break-words" />
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Key Formulas with KaTeX */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-semibold text-violet-300">
              II. Hệ thống Công thức Cốt lõi
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {activeTopic.formulas.map((fm, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#090F1D] border border-slate-800 space-y-2 min-w-0"
                >
                  <div className="text-xs font-semibold text-slate-300">
                    {fm.title}
                  </div>
                  <div className="py-2 px-4 rounded-lg bg-slate-900/90 border border-slate-800/80 overflow-x-auto max-w-full">
                    <MathFormula tex={fm.latex} block />
                  </div>
                  <p className="text-xs text-slate-400">{fm.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Bảng "Bẫy Đề Thi Cần Tránh" */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-semibold text-amber-300 flex items-center gap-2">
              <AlertOctagon className="w-4 h-4 text-amber-400 shrink-0" />
              III. Bảng Phân tích Bẫy Đề thi Cần tránh
            </h3>
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left border-collapse text-xs sm:text-sm min-w-[480px]">
                <thead>
                  <tr className="bg-slate-900/95 border-b border-slate-800">
                    <th className="p-3.5 font-semibold text-rose-300 w-5/12 border-r border-slate-800">
                      ▲ Sai lầm / Bẫy thường gặp
                    </th>
                    <th className="p-3.5 font-semibold text-emerald-300 w-7/12">
                      ● Bản chất đúng chuẩn SGK Vật lý 12
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 bg-[#090F1D]">
                  {activeTopic.examTraps.map((item, idx) => (
                    <tr key={idx}>
                      <td className="p-3.5 text-slate-300 align-top border-r border-slate-800 leading-relaxed">
                        {item.trap}
                      </td>
                      <td className="p-3.5 text-slate-200 align-top leading-relaxed">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{item.correction}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 4: Worked Example */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-cyan-300 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                IV. Bài toán Vận dụng Điển hình
              </h3>
              <button
                type="button"
                onClick={() => setShowSolution((v) => !v)}
                className="text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                {showSolution ? 'Ẩn lời giải' : 'Xem lời giải chi tiết'}
              </button>
            </div>

            <div className="text-sm text-slate-200 leading-relaxed">
              <strong className="text-white">Đề bài: </strong>
              <MathText text={activeTopic.workedExample.question} />
            </div>

            {showSolution && (
              <div className="p-3.5 rounded-lg bg-[#090F1D] border border-slate-800 text-sm text-emerald-200 leading-relaxed">
                <strong className="text-emerald-400">Hướng dẫn giải: </strong>
                <MathText text={activeTopic.workedExample.solution} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
