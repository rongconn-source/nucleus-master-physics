import React, { useState, useMemo } from 'react';
import {
  PART1_QUESTIONS,
  PART2_QUESTIONS,
  PART3_QUESTIONS,
} from '../data/examQuestionsData';
import { MathText } from './MathFormula';
import {
  CheckCircle2,
  XCircle,
  Award,
  RotateCcw,
  Eye,
  FileCheck,
} from 'lucide-react';

export const ExamBank2025: React.FC = () => {
  const [activePartFilter, setActivePartFilter] = useState<'all' | 'part1' | 'part2' | 'part3'>('all');
  const [part1Answers, setPart1Answers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});
  // Part 2 answers: Record<questionId, Record<'a'|'b'|'c'|'d', boolean | undefined>>
  const [part2Answers, setPart2Answers] = useState<
    Record<string, Partial<Record<'a' | 'b' | 'c' | 'd', boolean>>>
  >({});
  const [part3Answers, setPart3Answers] = useState<Record<string, string>>({});

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});

  // Official Ministry of Education 2025-2026 Grading Calculation
  const scoreReport = useMemo(() => {
    // Part 1: 18 questions * 0.25 pt = 4.5 pts
    let p1Correct = 0;
    PART1_QUESTIONS.forEach((q) => {
      if (part1Answers[q.id] === q.correctKey) p1Correct++;
    });
    const p1Score = p1Correct * 0.25;

    // Part 2: 4 questions, each has 4 statements (a, b, c, d).
    // 1 correct -> 0.10 pt; 2 correct -> 0.25 pt; 3 correct -> 0.50 pt; 4 correct -> 1.00 pt. Total = 4.0 pts
    let p2Score = 0;
    let p2StatementsCorrect = 0;
    const p2Breakdown: Record<string, { correctCount: number; pts: number }> = {};

    PART2_QUESTIONS.forEach((q) => {
      const userObj = part2Answers[q.id] || {};
      let cCount = 0;
      q.statements.forEach((st) => {
        if (userObj[st.key] !== undefined && userObj[st.key] === st.isTrue) {
          cCount++;
          p2StatementsCorrect++;
        }
      });
      let qPts = 0;
      if (cCount === 1) qPts = 0.1;
      else if (cCount === 2) qPts = 0.25;
      else if (cCount === 3) qPts = 0.5;
      else if (cCount === 4) qPts = 1.0;

      p2Score += qPts;
      p2Breakdown[q.id] = { correctCount: cCount, pts: qPts };
    });

    // Part 3: 6 questions * 0.25 pt = 1.5 pts
    let p3Correct = 0;
    const p3CorrectMap: Record<string, boolean> = {};
    PART3_QUESTIONS.forEach((q) => {
      const raw = (part3Answers[q.id] || '').trim().replace(',', '.');
      const num = parseFloat(raw);
      const isOk = !isNaN(num) && Math.abs(num - q.correctValue) <= q.tolerance;
      p3CorrectMap[q.id] = isOk;
      if (isOk) p3Correct++;
    });
    const p3Score = p3Correct * 0.25;

    const totalScore = p1Score + p2Score + p3Score;
    return {
      p1Correct,
      p1Score,
      p2StatementsCorrect,
      p2Score,
      p2Breakdown,
      p3Correct,
      p3Score,
      p3CorrectMap,
      totalScore,
    };
  }, [part1Answers, part2Answers, part3Answers]);

  const handleResetExam = () => {
    setPart1Answers({});
    setPart2Answers({});
    setPart3Answers({});
    setIsSubmitted(false);
    setRevealedIds({});
  };

  const toggleRevealQuestion = (id: string) => {
    setRevealedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      {/* Top Exam Control & Live Score Bar */}
      <div className="bg-[#111C30] border border-slate-800 rounded-2xl p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-cyan-400" />
            Đề thi Chuẩn Cấu trúc Mới 2025 – 2026 (Bộ GD&ĐT)
          </h2>
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span>Phần I: 18 câu 4 lựa chọn (4,5đ)</span>
            <span aria-hidden="true">·</span>
            <span>Phần II: 4 câu Đúng/Sai 16 mệnh đề (4,0đ)</span>
            <span aria-hidden="true">·</span>
            <span>Phần III: 6 câu Trả lời ngắn (1,5đ)</span>
          </div>
        </div>

        {/* Part Filter & Grading Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 max-w-full">
          <div className="flex flex-wrap items-center gap-1 p-1 bg-[#090F1D] border border-slate-800 rounded-xl">
            {[
              { id: 'all', label: 'Toàn bộ đề' },
              { id: 'part1', label: 'Phần I (ABCD)' },
              { id: 'part2', label: 'Phần II (Đúng/Sai)' },
              { id: 'part3', label: 'Phần III (Trả lời ngắn)' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActivePartFilter(tab.id as typeof activePartFilter)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  activePartFilter === tab.id
                    ? 'bg-cyan-600 text-white font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setIsSubmitted(true)}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0"
          >
            <FileCheck className="w-4 h-4" />
            Chấm điểm & Giải chi tiết
          </button>

          <button
            type="button"
            onClick={handleResetExam}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1 transition-colors whitespace-nowrap shrink-0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Làm lại
          </button>
        </div>
      </div>

      {/* Graded Summary Banner (Shown when user clicks Chấm điểm) */}
      {isSubmitted && (
        <div className="bg-slate-900/95 border border-emerald-500/40 rounded-2xl p-5 grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-3.5 rounded-xl bg-[#090F1D] border border-slate-800">
            <span className="text-xs text-slate-400 block">Tổng điểm toàn bài</span>
            <span className="font-mono tabular-nums text-2xl font-bold text-emerald-400">
              {scoreReport.totalScore.toFixed(2)} / 10,00 đ
            </span>
          </div>
          <div className="p-3.5 rounded-xl bg-[#090F1D] border border-slate-800">
            <span className="text-xs text-slate-400 block">Phần I (Trắc nghiệm 4 lựa chọn)</span>
            <span className="font-mono tabular-nums text-lg font-bold text-cyan-300">
              {scoreReport.p1Score.toFixed(2)} đ ({scoreReport.p1Correct}/18 câu)
            </span>
          </div>
          <div className="p-3.5 rounded-xl bg-[#090F1D] border border-slate-800">
            <span className="text-xs text-slate-400 block">Phần II (Đúng/Sai lũy tiến)</span>
            <span className="font-mono tabular-nums text-lg font-bold text-violet-300">
              {scoreReport.p2Score.toFixed(2)} đ ({scoreReport.p2StatementsCorrect}/16 ý)
            </span>
          </div>
          <div className="p-3.5 rounded-xl bg-[#090F1D] border border-slate-800">
            <span className="text-xs text-slate-400 block">Phần III (Trả lời ngắn)</span>
            <span className="font-mono tabular-nums text-lg font-bold text-amber-300">
              {scoreReport.p3Score.toFixed(2)} đ ({scoreReport.p3Correct}/6 câu)
            </span>
          </div>
        </div>
      )}

      {/* PART I: 4-OPTION MULTIPLE CHOICE */}
      {(activePartFilter === 'all' || activePartFilter === 'part1') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">
              PHẦN I. Câu trắc nghiệm nhiều phương án lựa chọn (18 câu · 0,25 điểm/câu)
            </h3>
            <span className="text-xs text-slate-400">
              Mỗi câu hỏi thí sinh chỉ chọn một phương án đúng A, B, C hoặc D
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PART1_QUESTIONS.map((q) => {
              const userChoice = part1Answers[q.id];
              const showAns = isSubmitted || revealedIds[q.id];
              return (
                <div
                  key={q.id}
                  className="bg-[#111C30] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono tabular-nums font-bold text-cyan-400">
                        Câu {q.number} · {q.topicTag}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleRevealQuestion(q.id)}
                        className="text-slate-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        {showAns ? 'Ẩn giải' : 'Xem giải'}
                      </button>
                    </div>

                    <div className="text-sm text-slate-100 leading-relaxed">
                      <MathText text={q.question} />
                    </div>

                    <div className="grid grid-cols-1 gap-2 pt-1">
                      {q.options.map((opt) => {
                        const isSelected = userChoice === opt.key;
                        const isCorrect = opt.key === q.correctKey;

                        let btnStyle =
                          'bg-[#090F1D] border-slate-800 text-slate-200 hover:border-slate-700';
                        if (showAns) {
                          if (isCorrect) {
                            btnStyle =
                              'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-semibold';
                          } else if (isSelected && !isCorrect) {
                            btnStyle = 'bg-rose-950/70 border-rose-500 text-rose-200';
                          }
                        } else if (isSelected) {
                          btnStyle =
                            'bg-cyan-950/80 border-cyan-400 text-white font-semibold';
                        }

                        return (
                          <button
                            key={opt.key}
                            type="button"
                            onClick={() =>
                              setPart1Answers((prev) => ({ ...prev, [q.id]: opt.key }))
                            }
                            className={`w-full text-left px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm flex items-center justify-between gap-2 transition-colors ${btnStyle}`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="font-mono font-bold text-xs w-5 h-5 rounded bg-slate-800 flex items-center justify-center shrink-0">
                                {opt.key}
                              </span>
                              <MathText text={opt.text} />
                            </div>
                            {showAns && isCorrect && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            )}
                            {showAns && isSelected && !isCorrect && (
                              <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {showAns && (
                    <div className="p-3.5 rounded-xl bg-[#090F1D] border border-emerald-500/30 text-xs text-slate-200 leading-relaxed">
                      <strong className="text-emerald-400 block mb-1">
                        Đáp án đúng: {q.correctKey} · Hướng dẫn giải:
                      </strong>
                      <MathText text={q.explanation} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* PART II: TRUE / FALSE (4 STATEMENTS PER QUESTION) */}
      {(activePartFilter === 'all' || activePartFilter === 'part2') && (
        <div className="space-y-4 pt-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-base font-bold text-white">
              PHẦN II. Câu trắc nghiệm Đúng / Sai (4 câu · Thang điểm lũy tiến 0,1đ → 0,25đ → 0,5đ → 1,0đ)
            </h3>
            <span className="text-xs text-slate-400">
              Trong mỗi ý a), b), c), d) ở mỗi câu, thí sinh chọn Đúng hoặc Sai
            </span>
          </div>

          <div className="space-y-5">
            {PART2_QUESTIONS.map((q) => {
              const userSt = part2Answers[q.id] || {};
              const showAns = isSubmitted || revealedIds[q.id];
              const bd = scoreReport.p2Breakdown[q.id];

              return (
                <div
                  key={q.id}
                  className="bg-[#111C30] border border-slate-800 rounded-2xl p-5 space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <span className="font-mono text-xs font-bold text-violet-300">
                      Câu {q.number} (Phần II) · {q.topicTag}
                    </span>
                    <div className="flex items-center gap-3">
                      {showAns && bd && (
                        <span className="font-mono text-xs font-bold text-emerald-400 tabular-nums">
                          Đúng {bd.correctCount}/4 ý (+{bd.pts.toFixed(2)} đ)
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => toggleRevealQuestion(q.id)}
                        className="text-xs text-slate-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        {showAns ? 'Ẩn lời giải' : 'Kiểm tra câu này'}
                      </button>
                    </div>
                  </div>

                  {/* Question Stem */}
                  <div className="text-sm text-slate-100 leading-relaxed bg-[#090F1D] border border-slate-800/80 p-4 rounded-xl">
                    <MathText text={q.stem} />
                  </div>

                  {/* 4 Statements Table */}
                  <div className="space-y-2.5">
                    {q.statements.map((st) => {
                      const val = userSt[st.key];
                      const isCorrect = val !== undefined && val === st.isTrue;

                      return (
                        <div
                          key={st.key}
                          className="p-3.5 rounded-xl bg-[#090F1D] border border-slate-800 space-y-2"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="text-xs sm:text-sm text-slate-200 leading-relaxed flex-1">
                              <strong className="font-mono text-cyan-300 mr-1.5">
                                {st.key})
                              </strong>
                              <MathText text={st.text} />
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                type="button"
                                onClick={() =>
                                  setPart2Answers((prev) => ({
                                    ...prev,
                                    [q.id]: { ...(prev[q.id] || {}), [st.key]: true },
                                  }))
                                }
                                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors whitespace-nowrap shrink-0 ${
                                  val === true
                                    ? 'bg-emerald-600 border-emerald-400 text-white'
                                    : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
                                }`}
                              >
                                Đúng
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  setPart2Answers((prev) => ({
                                    ...prev,
                                    [q.id]: { ...(prev[q.id] || {}), [st.key]: false },
                                  }))
                                }
                                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors whitespace-nowrap shrink-0 ${
                                  val === false
                                    ? 'bg-rose-600 border-rose-400 text-white'
                                    : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
                                }`}
                              >
                                Sai
                              </button>
                            </div>
                          </div>

                          {showAns && (
                            <div
                              className={`text-xs pt-2 border-t flex items-start gap-2 ${
                                isCorrect
                                  ? 'border-emerald-900/60 text-emerald-300'
                                  : 'border-rose-900/60 text-amber-200'
                              }`}
                            >
                              {isCorrect ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              ) : (
                                <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                              )}
                              <div>
                                <span className="font-semibold mr-1">
                                  [Đáp án chuẩn: {st.isTrue ? 'ĐÚNG' : 'SAI'}]
                                </span>
                                <MathText text={st.explanation} />
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* PART III: SHORT NUMERICAL ANSWER */}
      {(activePartFilter === 'all' || activePartFilter === 'part3') && (
        <div className="space-y-4 pt-2">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-base font-bold text-white">
              PHẦN III. Câu trắc nghiệm Trả lời ngắn (6 câu · 0,5 điểm/câu)
            </h3>
            <span className="text-xs text-slate-400">
              Điền kết quả số học (hỗ trợ cả dấu phẩy hoặc dấu chấm thập phân)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PART3_QUESTIONS.map((q) => {
              const userVal = part3Answers[q.id] || '';
              const showAns = isSubmitted || revealedIds[q.id];
              const isOk = scoreReport.p3CorrectMap[q.id];

              return (
                <div
                  key={q.id}
                  className="bg-[#111C30] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono tabular-nums font-bold text-amber-400">
                        Câu {q.number} (Phần III) · {q.topicTag}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggleRevealQuestion(q.id)}
                        className="text-slate-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        {showAns ? 'Ẩn giải' : 'Xem giải'}
                      </button>
                    </div>

                    <div className="text-sm text-slate-100 leading-relaxed">
                      <MathText text={q.question} />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <input
                        type="text"
                        value={userVal}
                        onChange={(e) =>
                          setPart3Answers((prev) => ({
                            ...prev,
                            [q.id]: e.target.value,
                          }))
                        }
                        placeholder="Nhập đáp số (VD: 8,36)"
                        className="flex-1 px-3.5 py-2 rounded-xl bg-[#090F1D] border border-slate-700 font-mono text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 tabular-nums"
                      />
                      <span className="text-xs font-mono text-slate-400 shrink-0">
                        ({q.unit})
                      </span>
                    </div>

                    {showAns && (
                      <div
                        className={`p-3.5 rounded-xl bg-[#090F1D] border text-xs leading-relaxed ${
                          isOk ? 'border-emerald-500/40' : 'border-amber-500/40'
                        }`}
                      >
                        <div className="flex items-center gap-2 font-mono font-bold text-emerald-400 mb-1">
                          {isOk ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : (
                            <XCircle className="w-4 h-4 text-amber-400 shrink-0" />
                          )}
                          <span>
                            Đáp số chuẩn: {q.displayAnswer} ({q.unit})
                          </span>
                        </div>
                        <div className="text-slate-200">
                          <MathText text={q.explanation} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
