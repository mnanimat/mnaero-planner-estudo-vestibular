import React, { useState } from 'react';
import { 
  Printer, 
  X, 
  FileText, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  Award, 
  Target, 
  Filter, 
  Calendar,
  AlertTriangle,
  HardDrive
} from 'lucide-react';
import { FrenteInfo, TopicProgress, StudyLog, UserProfile, StudyStage, ErrorRootCause } from '../types';

interface ExportPdfReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  frentes: FrenteInfo[];
  topicProgressMap: Record<string, TopicProgress>;
  studyLogs: StudyLog[];
  currentUserProfile: UserProfile | null;
}

export const ExportPdfReportModal: React.FC<ExportPdfReportModalProps> = ({
  isOpen,
  onClose,
  frentes,
  topicProgressMap,
  studyLogs,
  currentUserProfile,
}) => {
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('TODAS');

  if (!isOpen) return null;

  // Filter frentes by selected subject if needed
  const filteredFrentes = selectedSubjectFilter === 'TODAS'
    ? frentes
    : frentes.filter((f) => f.subject.toUpperCase() === selectedSubjectFilter.toUpperCase() || f.id.startsWith(selectedSubjectFilter.substring(0, 3)));

  // Filter study logs by subject
  const filteredStudyLogs = selectedSubjectFilter === 'TODAS'
    ? studyLogs
    : studyLogs.filter((log) => log.subject.toUpperCase() === selectedSubjectFilter.toUpperCase());

  // Total study time
  const totalMinutes = filteredStudyLogs.reduce((acc, log) => acc + (log.durationMinutes || 0), 0);
  const totalHours = (totalMinutes / 60).toFixed(1);

  // Stage labels mapping
  const stagesList: { id: StudyStage; label: string; short: string }[] = [
    { id: '1-aula', label: '1. Aula', short: 'E1: Aula' },
    { id: '2-resumo', label: '2. Resumo', short: 'E2: Resumo' },
    { id: '3-autoexplicacao', label: '3. Feynman', short: 'E3: Feynman' },
    { id: '4-questoes', label: '4. Questões', short: 'E4: Questões' },
    { id: '5-revisao', label: '5. Revisão', short: 'E5: Revisão' },
    { id: '6-simulado', label: '6. Simulado', short: 'E6: Simulado' },
    { id: '7-correcao', label: '7. Raio-X', short: 'E7: Raio-X' },
  ];

  // Calculate 7 stages global completion stats
  const stageStats: Record<StudyStage, number> = {
    '1-aula': 0,
    '2-resumo': 0,
    '3-autoexplicacao': 0,
    '4-questoes': 0,
    '5-revisao': 0,
    '6-simulado': 0,
    '7-correcao': 0,
  };

  let totalTopicsCount = 0;
  let totalAttemptedQuestions = 0;
  let totalCorrectQuestions = 0;
  const allErrorsList: { topic: string; desc: string; cause: string; action: string }[] = [];

  Object.values(topicProgressMap).forEach((prog) => {
    totalTopicsCount++;
    if (prog.questionsAttempted) totalAttemptedQuestions += prog.questionsAttempted;
    if (prog.questionsCorrect) totalCorrectQuestions += prog.questionsCorrect;

    if (prog.completedStages) {
      Object.entries(prog.completedStages).forEach(([stageKey, isDone]) => {
        if (isDone && stageStats[stageKey as StudyStage] !== undefined) {
          stageStats[stageKey as StudyStage]++;
        }
      });
    }

    if (prog.errorLog && prog.errorLog.length > 0) {
      prog.errorLog.forEach((err) => {
        allErrorsList.push({
          topic: prog.topicId,
          desc: err.questionDescription,
          cause: err.rootCause,
          action: err.actionPlan,
        });
      });
    }
  });

  const accuracyPct = totalAttemptedQuestions > 0
    ? Math.round((totalCorrectQuestions / totalAttemptedQuestions) * 100)
    : 0;

  const rootCauseLabels: Record<ErrorRootCause, string> = {
    falta_teoria: 'Falta de Teoria / Base',
    atencao_interpretacao: 'Atenção / Interpretação',
    erro_conta: 'Erro de Conta / Álgebra',
    pegadinha: 'Pegadinha do ITA',
    tempo_insuficiente: 'Tempo Insuficiente',
    lacuna_conceitual: 'Lacuna Conceitual',
  };

  const handleTriggerPrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 print:p-0 print:bg-white print:static">
      {/* CSS rules for printing */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-pdf-report, #printable-pdf-report * {
            visibility: visible;
          }
          #printable-pdf-report {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 15mm;
            background: white !important;
            color: black !important;
            font-size: 10pt;
          }
          .no-print {
            display: none !important;
          }
          .print-break-inside-avoid {
            page-break-inside: avoid;
          }
        }
      `}</style>

      <div className="bg-white border-2 border-black max-w-5xl w-full flex flex-col max-h-[92vh] shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] font-mono print:shadow-none print:border-none print:max-h-none print:w-full">
        {/* Top Action Toolbar (Hidden in Print) */}
        <div className="p-4 bg-zinc-900 text-white border-b-2 border-black flex flex-wrap items-center justify-between gap-3 no-print">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-[#FF6321]" />
            <h3 className="font-serif font-black italic text-base">
              Exportar Relatório PDF / Histórico de Estudos
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Subject Filter */}
            <div className="flex items-center gap-1.5 bg-black px-2.5 py-1 border border-zinc-700 text-xs">
              <Filter className="w-3.5 h-3.5 text-[#FF6321]" />
              <span className="text-zinc-400 uppercase text-[10px] font-bold">Filtro:</span>
              <select
                value={selectedSubjectFilter}
                onChange={(e) => setSelectedSubjectFilter(e.target.value)}
                className="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
              >
                <option value="TODAS" className="bg-black text-white">Todas as Matérias</option>
                <option value="Matemática" className="bg-black text-white">Matemática</option>
                <option value="Física" className="bg-black text-white">Física</option>
                <option value="Química" className="bg-black text-white">Química</option>
              </select>
            </div>

            {/* Print Button */}
            <button
              type="button"
              onClick={handleTriggerPrint}
              className="px-4 py-2 bg-[#FF6321] hover:bg-white hover:text-black text-black font-bold text-xs uppercase border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir / Salvar PDF</span>
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 bg-zinc-800 hover:bg-rose-600 text-white border border-zinc-600 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Container */}
        <div 
          id="printable-pdf-report"
          className="p-6 sm:p-8 overflow-y-auto space-y-6 text-black bg-white"
        >
          {/* Header Block */}
          <div className="border-b-4 border-black pb-4 space-y-3">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF6321] block font-mono">
                  MNAERO PLANNER // PREPARATÓRIO ITA 2026
                </span>
                <h1 className="text-2xl sm:text-3xl font-serif font-black italic tracking-tight text-black">
                  Relatório Oficial de Progresso & Histórico de Estudos
                </h1>
              </div>
              <div className="text-right text-xs font-mono bg-[#F7F3EF] border-2 border-black p-2.5">
                <p className="font-bold uppercase text-[10px] text-black/70">Emissão do Relatório:</p>
                <p className="font-bold text-black">{new Date().toLocaleDateString('pt-BR')} às {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
            </div>

            {/* Student Profile Info & Top Metrics Banner */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 font-mono text-xs pt-2">
              <div className="p-3 border-2 border-black bg-[#F7F3EF]">
                <span className="text-[9px] font-bold uppercase text-black/60 block">Estudante:</span>
                <p className="font-bold text-black text-sm truncate">{currentUserProfile?.name || 'Estudante MNAero'}</p>
                <p className="text-[10px] text-black/70 truncate">{currentUserProfile?.email || 'Sem e-mail cadastrado'}</p>
              </div>

              <div className="p-3 border-2 border-black bg-black text-white">
                <span className="text-[9px] font-bold uppercase text-[#FF6321] block">Carga Horária Total:</span>
                <p className="font-serif font-black text-xl text-white">{totalHours} <span className="text-xs font-sans">horas</span></p>
                <p className="text-[10px] text-zinc-400">{filteredStudyLogs.length} sessões registradas</p>
              </div>

              <div className="p-3 border-2 border-black bg-[#F7F3EF]">
                <span className="text-[9px] font-bold uppercase text-black/60 block">Desempenho Geral em Questões:</span>
                <p className="font-serif font-black text-xl text-black">{accuracyPct}% <span className="text-xs font-sans">de acertos</span></p>
                <p className="text-[10px] text-black/70">{totalCorrectQuestions} / {totalAttemptedQuestions} resolvidas</p>
              </div>

              <div className="p-3 border-2 border-black bg-emerald-50">
                <span className="text-[9px] font-bold uppercase text-emerald-800 block">Armazenamento:</span>
                <p className="font-bold text-emerald-900 text-xs flex items-center gap-1 mt-1">
                  <HardDrive className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  Local (Navegador)
                </p>
                <p className="text-[9px] text-emerald-800">100% Autônomo e Privado</p>
              </div>
            </div>
          </div>

          {/* Section 1: 7 Stages Global Progress */}
          <div className="space-y-3 print-break-inside-avoid">
            <div className="flex items-center justify-between border-b-2 border-black pb-1.5 font-mono">
              <h3 className="font-serif font-black text-lg italic text-black flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#FF6321]" />
                1. Progresso Global nas 7 Etapas de Aprendizado
              </h3>
              <span className="text-xs font-bold uppercase bg-black text-white px-2 py-0.5">
                {totalTopicsCount} Tópicos Mapeados
              </span>
            </div>

            {/* Stages Grid Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 font-mono text-center">
              {stagesList.map((stg) => {
                const count = stageStats[stg.id] || 0;
                const pct = totalTopicsCount > 0 ? Math.round((count / totalTopicsCount) * 100) : 0;
                return (
                  <div key={stg.id} className="border-2 border-black p-2 bg-[#F7F3EF]">
                    <span className="text-[9px] font-bold text-black uppercase block truncate">{stg.label}</span>
                    <p className="font-serif font-black text-lg text-black mt-0.5">{count}</p>
                    <span className="text-[9px] font-bold text-[#FF6321]">{pct}% concluído</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 2: Detailed Matrix of 7 Stages per Topic */}
          <div className="space-y-3 print-break-inside-avoid">
            <div className="border-b-2 border-black pb-1 font-mono">
              <h3 className="font-serif font-black text-lg italic text-black flex items-center gap-2">
                <Target className="w-5 h-5 text-[#FF6321]" />
                2. Matriz Detalhada do Cumprimento das 7 Etapas por Tópico
              </h3>
            </div>

            <div className="border-2 border-black overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs font-mono">
                <thead>
                  <tr className="bg-black text-white uppercase text-[10px] tracking-wider border-b-2 border-black">
                    <th className="p-2 border-r border-zinc-700">Frente / Matéria</th>
                    <th className="p-2 border-r border-zinc-700">Tópico do Edital</th>
                    <th className="p-2 text-center border-r border-zinc-700">E1</th>
                    <th className="p-2 text-center border-r border-zinc-700">E2</th>
                    <th className="p-2 text-center border-r border-zinc-700">E3</th>
                    <th className="p-2 text-center border-r border-zinc-700">E4</th>
                    <th className="p-2 text-center border-r border-zinc-700">E5</th>
                    <th className="p-2 text-center border-r border-zinc-700">E6</th>
                    <th className="p-2 text-center border-r border-zinc-700">E7</th>
                    <th className="p-2 text-center">Questões (Acerto)</th>
                  </tr>
                </thead>
                <tbody className="divide-y border-black font-sans">
                  {filteredFrentes.flatMap((f) =>
                    f.topics.map((tp) => {
                      const progKey = `${f.id}__${tp}`;
                      const prog = topicProgressMap[progKey];
                      const comp = prog?.completedStages || {};
                      const attempted = prog?.questionsAttempted || 0;
                      const correct = prog?.questionsCorrect || 0;
                      const acc = attempted > 0 ? Math.round((correct / attempted) * 100) : null;

                      return (
                        <tr key={progKey} className="hover:bg-[#F7F3EF] border-b border-black/20">
                          <td className="p-2 font-mono font-bold text-[11px] border-r border-black/20 whitespace-nowrap">
                            <span className="bg-black text-white px-1.5 py-0.5 text-[9px] mr-1 font-mono">
                              {f.id}
                            </span>
                            {f.subject}
                          </td>
                          <td className="p-2 font-medium text-xs border-r border-black/20">{tp}</td>
                          <td className="p-2 text-center font-mono border-r border-black/20 font-bold">
                            {comp['1-aula'] ? <span className="text-emerald-700">[✓]</span> : <span className="text-black/30">[ ]</span>}
                          </td>
                          <td className="p-2 text-center font-mono border-r border-black/20 font-bold">
                            {comp['2-resumo'] ? <span className="text-emerald-700">[✓]</span> : <span className="text-black/30">[ ]</span>}
                          </td>
                          <td className="p-2 text-center font-mono border-r border-black/20 font-bold">
                            {comp['3-autoexplicacao'] ? <span className="text-emerald-700">[✓]</span> : <span className="text-black/30">[ ]</span>}
                          </td>
                          <td className="p-2 text-center font-mono border-r border-black/20 font-bold">
                            {comp['4-questoes'] ? <span className="text-emerald-700">[✓]</span> : <span className="text-black/30">[ ]</span>}
                          </td>
                          <td className="p-2 text-center font-mono border-r border-black/20 font-bold">
                            {comp['5-revisao'] ? <span className="text-emerald-700">[✓]</span> : <span className="text-black/30">[ ]</span>}
                          </td>
                          <td className="p-2 text-center font-mono border-r border-black/20 font-bold">
                            {comp['6-simulado'] ? <span className="text-emerald-700">[✓]</span> : <span className="text-black/30">[ ]</span>}
                          </td>
                          <td className="p-2 text-center font-mono border-r border-black/20 font-bold">
                            {comp['7-correcao'] ? <span className="text-emerald-700">[✓]</span> : <span className="text-black/30">[ ]</span>}
                          </td>
                          <td className="p-2 text-center font-mono text-xs whitespace-nowrap font-bold">
                            {attempted > 0 ? (
                              <span>
                                {correct}/{attempted} <span className="text-[10px] text-zinc-600">({acc}%)</span>
                              </span>
                            ) : (
                              <span className="text-black/40">-</span>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3: Study Logs Table */}
          <div className="space-y-3 print-break-inside-avoid">
            <div className="flex items-center justify-between border-b-2 border-black pb-1 font-mono">
              <h3 className="font-serif font-black text-lg italic text-black flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#FF6321]" />
                3. Registros de Sessões de Estudo (Logs Diários)
              </h3>
              <span className="text-xs font-bold uppercase bg-[#F7F3EF] border border-black px-2 py-0.5">
                {filteredStudyLogs.length} Entradas Registradas
              </span>
            </div>

            {filteredStudyLogs.length === 0 ? (
              <div className="p-4 bg-[#F7F3EF] border-2 border-black text-xs font-mono text-center text-black/70 italic">
                Nenhuma sessão de estudo registrada ainda para esta matéria.
              </div>
            ) : (
              <div className="border-2 border-black overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs font-mono">
                  <thead>
                    <tr className="bg-[#F7F3EF] text-black font-bold uppercase text-[10px] border-b-2 border-black">
                      <th className="p-2 border-r border-black">Data & Hora</th>
                      <th className="p-2 border-r border-black">Matéria / Frente</th>
                      <th className="p-2 border-r border-black">Tópico Estudado</th>
                      <th className="p-2 border-r border-black">Etapa</th>
                      <th className="p-2 text-center border-r border-black">Duração</th>
                      <th className="p-2">Anotações / Observações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/20 font-sans">
                    {filteredStudyLogs.map((log) => {
                      const logDate = new Date(log.timestamp);
                      const formattedDate = logDate.toLocaleDateString('pt-BR');
                      const formattedTime = logDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

                      return (
                        <tr key={log.id} className="hover:bg-[#F7F3EF]">
                          <td className="p-2 font-mono text-[11px] whitespace-nowrap border-r border-black/20">
                            <span className="font-bold">{formattedDate}</span> <span className="text-black/60 text-[10px]">{formattedTime}</span>
                          </td>
                          <td className="p-2 font-mono text-[11px] border-r border-black/20 font-bold whitespace-nowrap">
                            {log.subject} ({log.frenteId})
                          </td>
                          <td className="p-2 font-medium text-xs border-r border-black/20">{log.topic}</td>
                          <td className="p-2 font-mono text-[11px] border-r border-black/20 whitespace-nowrap">
                            <span className="bg-black text-white px-1.5 py-0.5 text-[9px] uppercase font-bold">
                              {log.stage || 'Estudo'}
                            </span>
                          </td>
                          <td className="p-2 text-center font-mono font-bold text-xs border-r border-black/20 whitespace-nowrap">
                            {log.durationMinutes} min
                          </td>
                          <td className="p-2 text-xs italic text-black/80">{log.notes || '-'}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Section 4: Raio-X & Error Diagnostics */}
          {allErrorsList.length > 0 && (
            <div className="space-y-3 print-break-inside-avoid pt-2">
              <div className="border-b-2 border-black pb-1 font-mono">
                <h3 className="font-serif font-black text-lg italic text-black flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-[#FF6321]" />
                  4. Diagnóstico de Erros & Ações Corretivas (Raio-X)
                </h3>
              </div>

              <div className="border-2 border-black p-4 bg-[#F7F3EF] space-y-3">
                <p className="text-xs font-mono text-black/80">
                  Resumo das lacunas identificadas durante a resolução de questões do ITA:
                </p>
                <div className="space-y-2">
                  {allErrorsList.slice(0, 10).map((err, idx) => (
                    <div key={idx} className="p-2.5 bg-white border border-black font-mono text-xs space-y-1">
                      <div className="flex items-center justify-between font-bold">
                        <span className="text-[#FF6321]">[{err.topic}]</span>
                        <span className="bg-rose-100 text-rose-900 px-2 py-0.5 text-[10px] uppercase border border-rose-300">
                          {rootCauseLabels[err.cause as ErrorRootCause] || err.cause}
                        </span>
                      </div>
                      <p className="font-sans text-xs text-black">{err.desc}</p>
                      {err.action && (
                        <p className="text-[11px] font-sans text-emerald-950 bg-emerald-50 p-1.5 border border-emerald-200 mt-1">
                          <strong>Plano de Ação:</strong> {err.action}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Footer Validation Signature */}
          <div className="pt-6 border-t-2 border-black flex flex-wrap items-center justify-between text-[10px] font-mono text-black/70 print-break-inside-avoid">
            <div>
              <p className="font-bold uppercase text-black">MNAero Planner - Preparatório de Alta Performance para o ITA</p>
              <p>Relatório gerado em ambiente seguro com persistência 100% local no dispositivo do usuário.</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-black">Desenvolvedor: Micael Nildo Oliveira Souza</p>
              <p>© 2026 MNAero Planner // Licença MIT</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
