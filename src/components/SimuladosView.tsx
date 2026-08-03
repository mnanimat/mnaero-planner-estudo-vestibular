import React, { useState, useEffect, useRef } from 'react';
import { Play, Clock, CheckCircle2, XCircle, AlertCircle, Bookmark, ChevronLeft, ChevronRight, Award, RotateCcw, Youtube, HelpCircle, FileText, ExternalLink, BarChart3, ArrowRight } from 'lucide-react';
import { SimuladoExam, SimuladoQuestion, QuestionAttempt, SimuladoResult, UserProfile } from '../types';
import { ITA_SIMULADOS } from '../data/simuladosData';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface SimuladosViewProps {
  currentUserProfile: UserProfile | null;
  onOpenLoginModal: () => void;
}

export const SimuladosView: React.FC<SimuladosViewProps> = ({ currentUserProfile, onOpenLoginModal }) => {
  const [activeExam, setActiveExam] = useState<SimuladoExam | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [attempts, setAttempts] = useState<Record<string, QuestionAttempt>>({});
  
  // Timer states
  const [totalTimeSeconds, setTotalTimeSeconds] = useState<number>(0);
  const [questionTimes, setQuestionTimes] = useState<Record<string, number>>({});
  const [isExamRunning, setIsExamRunning] = useState<boolean>(false);
  
  // Completed result state
  const [completedResult, setCompletedResult] = useState<SimuladoResult | null>(null);
  const [pastResults, setPastResults] = useState<SimuladoResult[]>(() => {
    try {
      const saved = localStorage.getItem('mnaero_simulados_results');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Active question timer
  const currentQuestionId = activeExam?.questions[currentQuestionIndex]?.id;

  useEffect(() => {
    let interval: any = null;
    if (isExamRunning) {
      interval = setInterval(() => {
        setTotalTimeSeconds((prev) => prev + 1);
        if (currentQuestionId) {
          setQuestionTimes((prev) => ({
            ...prev,
            [currentQuestionId]: (prev[currentQuestionId] || 0) + 1
          }));
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isExamRunning, currentQuestionId]);

  // Save past results to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mnaero_simulados_results', JSON.stringify(pastResults));
    } catch (e) {
      console.error('Failed to save simulado results:', e);
    }
  }, [pastResults]);

  const handleStartExam = (exam: SimuladoExam) => {
    setActiveExam(exam);
    setCurrentQuestionIndex(0);
    setAttempts({});
    setTotalTimeSeconds(0);
    setQuestionTimes({});
    setCompletedResult(null);
    setIsExamRunning(true);
  };

  const handleSelectOption = (questionId: string, optionIdx: number) => {
    setAttempts((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        questionId,
        userOptionIndex: optionIdx,
        timeSpentSeconds: questionTimes[questionId] || 0
      }
    }));
  };

  const handleToggleBookmark = (questionId: string) => {
    setAttempts((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        questionId,
        timeSpentSeconds: questionTimes[questionId] || 0,
        markedForReview: !prev[questionId]?.markedForReview
      }
    }));
  };

  const handleFinishExam = () => {
    if (!activeExam) return;
    setIsExamRunning(false);

    let correctCount = 0;
    const finalAttempts: Record<string, QuestionAttempt> = {};

    activeExam.questions.forEach((q) => {
      const att = attempts[q.id] || { questionId: q.id, timeSpentSeconds: questionTimes[q.id] || 0 };
      let isCorrect = false;

      if (q.phase === '1a' && q.correctOptionIndex !== undefined) {
        isCorrect = att.userOptionIndex === q.correctOptionIndex;
      }

      if (isCorrect) correctCount++;

      finalAttempts[q.id] = {
        ...att,
        timeSpentSeconds: questionTimes[q.id] || 0,
        isCorrect
      };
    });

    const accuracy = activeExam.questions.length > 0 
      ? Math.round((correctCount / activeExam.questions.length) * 100) 
      : 0;

    const newResult: SimuladoResult = {
      id: 'res-' + Date.now(),
      examId: activeExam.id,
      examTitle: activeExam.title,
      dateCompleted: new Date().toLocaleDateString('pt-BR'),
      totalTimeSpentSeconds: totalTimeSeconds,
      totalQuestions: activeExam.questions.length,
      correctAnswersCount: correctCount,
      accuracyPercentage: accuracy,
      attempts: finalAttempts
    };

    setCompletedResult(newResult);
    setPastResults((prev) => [newResult, ...prev]);
  };

  const formatSeconds = (sec: number) => {
    const hrs = Math.floor(sec / 3600);
    const mins = Math.floor((sec % 3600) / 60);
    const secs = sec % 60;
    if (hrs > 0) {
      return `${hrs}h ${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
    }
    return `${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
  };

  const renderMathText = (text: string) => {
    if (!text) return null;
    const parts = text.split(/(\$\$[\s\S]*?\$\$|\$.*?\$)/g);

    return (
      <span className="leading-relaxed">
        {parts.map((part, idx) => {
          if (part.startsWith('$$') && part.endsWith('$$')) {
            const math = part.slice(2, -2);
            try {
              const html = katex.renderToString(math, { displayMode: true, throwOnError: false });
              return <div key={idx} className="my-3 overflow-x-auto text-[#FF6321]" dangerouslySetInnerHTML={{ __html: html }} />;
            } catch (e) {
              return <code key={idx} className="text-amber-500 font-mono">{part}</code>;
            }
          } else if (part.startsWith('$') && part.endsWith('$')) {
            const math = part.slice(1, -1);
            try {
              const html = katex.renderToString(math, { displayMode: false, throwOnError: false });
              return <span key={idx} className="text-[#FF6321] px-0.5" dangerouslySetInnerHTML={{ __html: html }} />;
            } catch (e) {
              return <code key={idx} className="text-amber-500 font-mono">{part}</code>;
            }
          }
          return <span key={idx}>{part}</span>;
        })}
      </span>
    );
  };

  // 1. Exam Selection Hub
  if (!activeExam && !completedResult) {
    return (
      <div className="space-y-8 pb-12 font-mono">
        {/* Header Banner */}
        <div className="bg-white p-6 sm:p-8 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#FF6321] mb-1">
              <Clock className="w-4 h-4" />
              <span>Simulados Oficiais // 1ª e 2ª Fase ITA</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-black tracking-tight italic">
              Central de Simulados Cronometrados
            </h2>
            <p className="text-xs sm:text-sm text-black/80 mt-1 max-w-2xl font-sans">
              Pratique com questões reais das provas do ITA, cronometre o tempo por questão, meça sua precisão (%) e assista a resoluções em vídeo no YouTube!
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-black text-white p-4 border-2 border-black shadow-[3px_3px_0px_0px_rgba(255,99,33,1)] text-center">
              <span className="text-[10px] text-[#FF6321] uppercase font-bold block">Simulados Realizados</span>
              <span className="text-xl font-black">{pastResults.length} exames</span>
            </div>
          </div>
        </div>

        {/* Exams List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ITA_SIMULADOS.map((exam) => (
            <div
              key={exam.id}
              className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="bg-black text-white px-2.5 py-0.5 border border-black text-[10px] font-bold uppercase">
                    Fase {exam.phase === '1a' ? '1ª Objetiva' : '2ª Discursiva'}
                  </span>
                  <span className="text-xs font-bold text-[#FF6321] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    Tempo Limite: {exam.timeLimitMinutes} min
                  </span>
                </div>

                <h3 className="text-lg font-serif font-black text-black italic">
                  {exam.title}
                </h3>
                <p className="text-xs text-black/70 font-sans">
                  {exam.subtitle}
                </p>

                <div className="pt-2 text-xs font-bold text-black flex items-center gap-4 border-t border-black/10">
                  <span>📝 {exam.questions.length} Questões</span>
                  <span>🎬 Resolução em Vídeo + Fórmulas</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => handleStartExam(exam)}
                  className="flex-1 py-3 bg-[#FF6321] hover:bg-black hover:text-white text-black font-bold text-xs uppercase border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Simulado Cronometrado</span>
                </button>

                <button
                  onClick={() => {
                    const mockAttempts: Record<string, QuestionAttempt> = {};
                    exam.questions.forEach((q) => {
                      mockAttempts[q.id] = {
                        questionId: q.id,
                        userOptionIndex: q.correctOptionIndex,
                        isCorrect: true,
                        timeSpentSeconds: 0
                      };
                    });
                    setCompletedResult({
                      id: `study-${exam.id}`,
                      examId: exam.id,
                      examTitle: `${exam.title} (Modo Estudo / Prova Comentada)`,
                      dateCompleted: new Date().toLocaleDateString('pt-BR'),
                      totalTimeSpentSeconds: 0,
                      totalQuestions: exam.questions.length,
                      correctAnswersCount: exam.questions.length,
                      accuracyPercentage: 100,
                      attempts: mockAttempts
                    });
                  }}
                  className="flex-1 py-3 bg-white hover:bg-black hover:text-white text-black font-bold text-xs uppercase border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Youtube className="w-4 h-4 text-rose-600" />
                  <span>Estudar Prova & Vídeos</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Past Results History Section */}
        {pastResults.length > 0 && (
          <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4">
            <h3 className="text-sm font-bold text-black border-b-2 border-black pb-3 uppercase flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#FF6321]" />
              Histórico de Desempenho nos Simulados
            </h3>

            <div className="space-y-3">
              {pastResults.map((res) => (
                <div
                  key={res.id}
                  className="bg-[#F7F3EF] border-2 border-black p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] text-black/60 font-bold uppercase">{res.dateCompleted}</span>
                    <h4 className="font-serif font-black text-black text-sm italic">{res.examTitle}</h4>
                    <p className="text-xs text-black/80 font-sans">
                      Tempo Total: <strong>{formatSeconds(res.totalTimeSpentSeconds)}</strong> | Acertos: <strong>{res.correctAnswersCount}/{res.totalQuestions}</strong>
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-black text-white px-4 py-2 border border-black font-bold text-sm">
                      <span className="text-[#FF6321]">{res.accuracyPercentage}%</span> Precisão
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // 2. Active Exam Player Mode
  if (isExamRunning && activeExam) {
    const currentQ = activeExam.questions[currentQuestionIndex];
    const currentAttempt = attempts[currentQ.id];
    const timeForThisQuestion = questionTimes[currentQ.id] || 0;

    return (
      <div className="space-y-6 pb-12 font-mono">
        {/* Exam Header Bar */}
        <div className="bg-black text-white p-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(255,99,33,1)] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="bg-[#FF6321] text-black font-bold text-xs px-2.5 py-1">
              Questão {currentQuestionIndex + 1} de {activeExam.questions.length}
            </span>
            <h3 className="text-sm font-serif font-black italic text-white truncate max-w-md">
              {activeExam.title}
            </h3>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold">
            <div className="flex items-center gap-1.5 text-zinc-300 bg-zinc-900 px-3 py-1.5 border border-zinc-700">
              <Clock className="w-4 h-4 text-[#FF6321]" />
              <span>Nesta questão: <strong className="text-white">{formatSeconds(timeForThisQuestion)}</strong></span>
            </div>

            <div className="flex items-center gap-1.5 text-zinc-300 bg-zinc-900 px-3 py-1.5 border border-zinc-700">
              <span>Total Prova: <strong className="text-[#FF6321]">{formatSeconds(totalTimeSeconds)}</strong></span>
            </div>

            <button
              onClick={handleFinishExam}
              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase border border-black cursor-pointer shadow-sm"
            >
              Finalizar Simulado
            </button>
          </div>
        </div>

        {/* Question Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Question Box */}
          <div className="lg:col-span-8 bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-6">
            {/* Meta header */}
            <div className="flex items-center justify-between border-b-2 border-black pb-3">
              <div className="flex items-center gap-2">
                <span className="bg-black text-white px-2 py-0.5 text-[10px] font-bold uppercase">
                  {currentQ.subject} ({currentQ.frenteId})
                </span>
                <span className="text-xs font-bold text-[#FF6321]">
                  Dificuldade: {currentQ.difficulty}
                </span>
              </div>

              <button
                onClick={() => handleToggleBookmark(currentQ.id)}
                className={`flex items-center gap-1 px-3 py-1 border border-black text-xs font-bold uppercase cursor-pointer ${
                  currentAttempt?.markedForReview ? 'bg-[#FF6321] text-black' : 'bg-[#F7F3EF] hover:bg-black hover:text-white'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>{currentAttempt?.markedForReview ? 'Marcada para Revisão' : 'Marcar para Revisão'}</span>
              </button>
            </div>

            {/* Statement */}
            <div className="text-sm font-sans text-black space-y-3">
              <div className="font-bold text-xs uppercase text-black/60 font-mono">Enunciado Oficial (ITA {currentQ.year}):</div>
              <div className="p-4 bg-[#F7F3EF] border-2 border-black">
                {renderMathText(currentQ.statement)}
              </div>
            </div>

            {/* Options for 1a fase */}
            {currentQ.options && (
              <div className="space-y-3 pt-2">
                <div className="font-bold text-xs uppercase text-black font-mono">Selecione sua Alternativa:</div>
                {currentQ.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(currentQ.id, idx)}
                    className={`w-full text-left p-3.5 border-2 border-black text-xs font-bold font-sans transition-all cursor-pointer flex items-center justify-between ${
                      currentAttempt?.userOptionIndex === idx
                        ? 'bg-black text-white shadow-[3px_3px_0px_0px_rgba(255,99,33,1)]'
                        : 'bg-white text-black hover:bg-[#F7F3EF]'
                    }`}
                  >
                    <span>{renderMathText(opt)}</span>
                    {currentAttempt?.userOptionIndex === idx && (
                      <CheckCircle2 className="w-4 h-4 text-[#FF6321] shrink-0 ml-2" />
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Discursiva guide for 2a fase */}
            {currentQ.discursiveGuide && (
              <div className="space-y-3 pt-2">
                <div className="font-bold text-xs uppercase text-black font-mono">Guia de Resolução Discursiva (2ª Fase):</div>
                <div className="p-3 bg-amber-50 border-2 border-amber-500 text-amber-950 text-xs font-sans">
                  {currentQ.discursiveGuide}
                </div>
              </div>
            )}

            {/* Pagination Controls */}
            <div className="flex items-center justify-between pt-4 border-t-2 border-black">
              <button
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
                className="px-4 py-2 bg-[#F7F3EF] hover:bg-black hover:text-white border-2 border-black font-bold text-xs uppercase flex items-center gap-1 cursor-pointer disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Anterior</span>
              </button>

              <span className="text-xs font-bold">
                {currentQuestionIndex + 1} / {activeExam.questions.length}
              </span>

              <button
                disabled={currentQuestionIndex === activeExam.questions.length - 1}
                onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                className="px-4 py-2 bg-[#FF6321] hover:bg-black hover:text-white text-black font-bold text-xs uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1 cursor-pointer disabled:opacity-40"
              >
                <span>Próxima</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Question Grid Map Sidebar */}
          <div className="lg:col-span-4 bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4">
            <h4 className="text-xs font-bold text-black border-b-2 border-black pb-2 uppercase flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#FF6321]" />
              Mapa de Questões do Simulado
            </h4>

            <div className="grid grid-cols-5 gap-2">
              {activeExam.questions.map((q, idx) => {
                const isSelected = idx === currentQuestionIndex;
                const hasAnswered = attempts[q.id]?.userOptionIndex !== undefined;
                const isBookmarked = attempts[q.id]?.markedForReview;

                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`h-10 border-2 font-bold text-xs flex items-center justify-center relative cursor-pointer ${
                      isSelected
                        ? 'border-[#FF6321] ring-2 ring-[#FF6321]'
                        : 'border-black'
                    } ${
                      hasAnswered ? 'bg-black text-white' : 'bg-[#F7F3EF] text-black'
                    }`}
                  >
                    <span>{idx + 1}</span>
                    {isBookmarked && (
                      <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-[#FF6321] rounded-full"></span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="p-3 bg-[#F7F3EF] border border-black space-y-2 text-[11px] font-sans">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-black border border-black"></div>
                <span>Respondida</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#F7F3EF] border border-black"></div>
                <span>Pendente</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#FF6321] rounded-full"></div>
                <span>Marcada p/ Revisão</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. Completed Result & Resolution View
  if (completedResult) {
    const exam = ITA_SIMULADOS.find((e) => e.id === completedResult.examId) || ITA_SIMULADOS[0];

    return (
      <div className="space-y-8 pb-12 font-mono">
        {/* Results Banner */}
        <div className="bg-black text-white p-6 sm:p-8 border-2 border-black shadow-[6px_6px_0px_0px_rgba(255,99,33,1)] space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-700 pb-3">
            <span className="text-xs font-bold uppercase text-[#FF6321] tracking-widest flex items-center gap-2">
              <Award className="w-4 h-4" /> Resultado do Simulado Concluído
            </span>
            <span className="text-xs text-zinc-400">{completedResult.dateCompleted}</span>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif font-black italic text-white">
                {completedResult.examTitle}
              </h2>
              <p className="text-xs text-zinc-300 mt-1 font-sans">
                Análise de tempo gasto e gabarito comentado passo a passo com link de vídeo no YouTube.
              </p>
            </div>

            <div className="flex items-center gap-4 bg-zinc-900 p-4 border border-zinc-700 shrink-0">
              <div className="text-center">
                <span className="text-[10px] text-zinc-400 uppercase font-bold block">Precisão</span>
                <span className="text-2xl font-black text-[#FF6321]">{completedResult.accuracyPercentage}%</span>
              </div>

              <div className="h-8 w-px bg-zinc-700"></div>

              <div className="text-center">
                <span className="text-[10px] text-zinc-400 uppercase font-bold block">Tempo Total</span>
                <span className="text-sm font-black text-white">{formatSeconds(completedResult.totalTimeSpentSeconds)}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              setCompletedResult(null);
              setActiveExam(null);
            }}
            className="px-6 py-2.5 bg-[#FF6321] hover:bg-white text-black font-bold text-xs uppercase border border-black cursor-pointer shadow-md inline-flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Voltar à Lista de Simulados</span>
          </button>
        </div>

        {/* Detailed Solutions Section */}
        <div className="space-y-6">
          <h3 className="text-lg font-serif font-black text-black italic border-b-2 border-black pb-2 flex items-center gap-2">
            <Youtube className="w-5 h-5 text-rose-600" />
            Gabarito Comentado & Resoluções em Vídeo (YouTube)
          </h3>

          <div className="space-y-6">
            {exam.questions.map((q, idx) => {
              const attempt = completedResult.attempts[q.id];
              const isCorrect = attempt?.isCorrect;
              const userOpt = attempt?.userOptionIndex;

              return (
                <div
                  key={q.id}
                  className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4"
                >
                  <div className="flex items-center justify-between border-b-2 border-black pb-3">
                    <div className="flex items-center gap-2">
                      <span className="bg-black text-white px-2 py-0.5 text-xs font-bold uppercase">
                        Questão {idx + 1} ({q.subject})
                      </span>
                      {q.phase === '1a' && (
                        <span className={`px-2 py-0.5 text-xs font-bold uppercase flex items-center gap-1 ${
                          isCorrect ? 'bg-emerald-200 text-emerald-900 border border-emerald-600' : 'bg-rose-200 text-rose-900 border border-rose-600'
                        }`}>
                          {isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                          {isCorrect ? 'Correta' : 'Incorreta / Não respondida'}
                        </span>
                      )}
                    </div>

                    <div className="text-xs font-bold text-black/70 flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#FF6321]" />
                      <span>Tempo nesta questão: {formatSeconds(attempt?.timeSpentSeconds || 0)}</span>
                    </div>
                  </div>

                  {/* Statement */}
                  <div className="text-xs font-sans text-black space-y-2">
                    <div className="p-3 bg-[#F7F3EF] border border-black">
                      {renderMathText(q.statement)}
                    </div>
                  </div>

                  {/* Options status */}
                  {q.options && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans">
                      {q.options.map((opt, oIdx) => {
                        const isCorrectOpt = oIdx === q.correctOptionIndex;
                        const isUserChoice = oIdx === userOpt;

                        return (
                          <div
                            key={oIdx}
                            className={`p-2.5 border text-xs font-bold flex items-center justify-between ${
                              isCorrectOpt
                                ? 'bg-emerald-100 border-emerald-600 text-emerald-950'
                                : isUserChoice
                                ? 'bg-rose-100 border-rose-600 text-rose-950'
                                : 'bg-[#F7F3EF] border-black/30 text-black/80'
                            }`}
                          >
                            <span>{renderMathText(opt)}</span>
                            {isCorrectOpt && <span className="text-emerald-700 font-extrabold text-[10px]">GABARITO</span>}
                            {isUserChoice && !isCorrectOpt && <span className="text-rose-700 font-extrabold text-[10px]">SUA RESPOSTA</span>}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Written Resolution */}
                  <div className="p-4 bg-zinc-900 text-zinc-100 border-2 border-black space-y-2 text-xs font-sans">
                    <div className="text-[#FF6321] font-bold uppercase font-mono text-[11px]">
                      📖 Resolução Comentada Passo a Passo:
                    </div>
                    <div className="leading-relaxed">
                      {renderMathText(q.detailedSolution)}
                    </div>
                  </div>

                  {/* YouTube Resolution Link */}
                  {q.youtubeVideoId && (
                    <div className="p-3 bg-[#F7F3EF] border-2 border-black flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <Youtube className="w-5 h-5 text-rose-600 shrink-0" />
                        <div>
                          <span className="text-[10px] font-bold uppercase text-black/60 block">Vídeo de Resolução no YouTube</span>
                          <h5 className="font-bold text-xs text-black">{q.youtubeVideoTitle}</h5>
                        </div>
                      </div>

                      <a
                        href={`https://www.youtube.com/watch?v=${q.youtubeVideoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-rose-600 hover:bg-black text-white font-bold text-xs uppercase border border-black flex items-center gap-1.5 shrink-0 cursor-pointer shadow-sm"
                      >
                        <span>Assistir Resolução no YouTube</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return null;
};
