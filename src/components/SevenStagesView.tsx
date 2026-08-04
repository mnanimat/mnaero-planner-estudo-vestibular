import React, { useState } from 'react';
import { FrenteInfo, StudyStage, TopicProgress, ErrorRootCause, ErrorEntry } from '../types';
import { 
  Video, 
  FileText, 
  Brain, 
  Target, 
  RefreshCw, 
  FileCheck2, 
  Search, 
  CheckCircle2, 
  Circle, 
  Plus, 
  Sparkles, 
  AlertTriangle, 
  BookOpen,
  ArrowRight,
  Printer
} from 'lucide-react';

interface SevenStagesViewProps {
  frentes: FrenteInfo[];
  topicProgressMap: Record<string, TopicProgress>;
  onUpdateTopicProgress: (topicId: string, progress: TopicProgress) => void;
  onOpenExportReportModal?: () => void;
}

export const SevenStagesView: React.FC<SevenStagesViewProps> = ({
  frentes,
  topicProgressMap,
  onUpdateTopicProgress,
  onOpenExportReportModal,
}) => {
  const [selectedFrenteId, setSelectedFrenteId] = useState<string>(frentes[0]?.id || 'MAT-1');
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [activeStageTab, setActiveStageTab] = useState<StudyStage>('1-aula');

  // Error form state
  const [errorDesc, setErrorDesc] = useState('');
  const [errorCause, setErrorCause] = useState<ErrorRootCause>('falta_teoria');
  const [learningGap, setLearningGap] = useState('');
  const [actionPlan, setActionPlan] = useState('');

  const currentFrente = frentes.find((f) => f.id === selectedFrenteId) || frentes[0];
  const activeTopic = selectedTopic || currentFrente.topics[0] || '';

  const progressKey = `${selectedFrenteId}__${activeTopic}`;
  const currentProgress: TopicProgress = topicProgressMap[progressKey] || {
    topicId: activeTopic,
    subject: currentFrente.subject,
    frenteId: currentFrente.id,
    completedStages: {
      '1-aula': false,
      '2-resumo': false,
      '3-autoexplicacao': false,
      '4-questoes': false,
      '5-revisao': false,
      '6-simulado': false,
      '7-correcao': false,
    },
    questionsAttempted: 0,
    questionsCorrect: 0,
    errorLog: [],
  };

  const stageList: { id: StudyStage; label: string; number: number; icon: any; color: string; desc: string }[] = [
    { id: '1-aula', label: 'Aula / Videoaula', number: 1, icon: Video, color: 'text-sky-400 bg-sky-500/20 border-sky-500/30', desc: 'Assista à aula teórica focando na dedução de fórmulas.' },
    { id: '2-resumo', label: 'Resumo Didático', number: 2, icon: FileText, color: 'text-blue-400 bg-blue-500/20 border-blue-500/30', desc: 'Sintetize os conceitos vitais, fórmulas e truques do ITA.' },
    { id: '3-autoexplicacao', label: 'Autoexplicação (Feynman)', number: 3, icon: Brain, color: 'text-indigo-400 bg-indigo-500/20 border-indigo-500/30', desc: 'Explique o assunto para si mesmo em linguagem simples sem olhar a teoria.' },
    { id: '4-questoes', label: 'Bateria de Questões', number: 4, icon: Target, color: 'text-amber-400 bg-amber-500/20 border-amber-500/30', desc: 'Resolva questões da 1ª e 2ª fase do ITA com rigor.' },
    { id: '5-revisao', label: 'Revisão Agendada', number: 5, icon: RefreshCw, color: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30', desc: 'Revisão ativa por flashcards ou releitura de erros.' },
    { id: '6-simulado', label: 'Simulado de Prova', number: 6, icon: FileCheck2, color: 'text-purple-400 bg-purple-500/20 border-purple-500/30', desc: 'Teste de tempo e resistência sob condições reais do ITA.' },
    { id: '7-correcao', label: 'Correção & Raio-X do Erro', number: 7, icon: Search, color: 'text-rose-400 bg-rose-500/20 border-rose-500/30', desc: 'Identifique o motivo do erro e feche lacunas de aprendizado.' },
  ];

  const handleToggleStage = (stageId: StudyStage) => {
    const updated: TopicProgress = {
      ...currentProgress,
      completedStages: {
        ...currentProgress.completedStages,
        [stageId]: !currentProgress.completedStages[stageId],
      },
    };
    onUpdateTopicProgress(progressKey, updated);
  };

  const handleFeynmanSave = (notes: string) => {
    const updated: TopicProgress = {
      ...currentProgress,
      feynmanNotes: notes,
    };
    onUpdateTopicProgress(progressKey, updated);
  };

  const handleQuestionsUpdate = (attempted: number, correct: number) => {
    const updated: TopicProgress = {
      ...currentProgress,
      questionsAttempted: Math.max(0, attempted),
      questionsCorrect: Math.max(0, Math.min(attempted, correct)),
    };
    onUpdateTopicProgress(progressKey, updated);
  };

  const handleAddErrorLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!errorDesc.trim()) return;

    const newError: ErrorEntry = {
      id: `err-${Date.now()}`,
      timestamp: new Date().toISOString(),
      topicId: activeTopic,
      questionDescription: errorDesc,
      rootCause: errorCause,
      learningGap,
      actionPlan,
    };

    const updated: TopicProgress = {
      ...currentProgress,
      errorLog: [newError, ...(currentProgress.errorLog || [])],
    };

    onUpdateTopicProgress(progressKey, updated);

    // Reset form
    setErrorDesc('');
    setLearningGap('');
    setActionPlan('');
  };

  const causeLabels: Record<ErrorRootCause, { label: string; color: string }> = {
    falta_teoria: { label: 'Falta de Teoria / Base', color: 'bg-rose-500/20 text-rose-300 border-rose-500/30' },
    atencao_interpretacao: { label: 'Atenção / Má Interpretação', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
    erro_conta: { label: 'Erro de Conta / Álgebra', color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' },
    pegadinha: { label: 'Caiu em Pegadinha do ITA', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
    tempo_insuficiente: { label: 'Tempo Insuficiente', color: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' },
    lacuna_conceitual: { label: 'Lacuna Conceitual Específica', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
  };

  const completedCount = Object.values(currentProgress.completedStages).filter(Boolean).length;
  const stageCompletionPct = Math.round((completedCount / 7) * 100);

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner */}
      <div className="bg-white rounded-none p-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="text-black text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-2 mb-1">
              <BookOpen className="w-4 h-4 text-[#FF6321]" />
              Metodologia de Aprendizado Ativo
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-black tracking-tight italic">
              As 7 Etapas de Aprendizado ITA
            </h2>
            <p className="text-xs sm:text-sm text-black/80 mt-1 max-w-2xl">
              Nenhuma lacuna passa despercebida. Siga a esteira completa desde a primeira videoaula até a análise diagnóstica de cada questão errada.
            </p>
          </div>

          {/* Selectors */}
          <div className="flex flex-wrap items-center gap-3 font-mono">
            <div>
              <label className="block text-[10px] text-black/60 font-bold uppercase tracking-wider mb-1">Frente:</label>
              <select
                value={selectedFrenteId}
                onChange={(e) => {
                  setSelectedFrenteId(e.target.value);
                  const f = frentes.find((fr) => fr.id === e.target.value);
                  if (f) setSelectedTopic(f.topics[0] || '');
                }}
                className="bg-[#F7F3EF] border border-black text-black font-bold text-xs px-3 py-2 focus:outline-none"
              >
                {frentes.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.id} - {f.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] text-black/60 font-bold uppercase tracking-wider mb-1">Assunto:</label>
              <select
                value={activeTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="bg-[#F7F3EF] border border-black text-black font-bold text-xs px-3 py-2 focus:outline-none max-w-[220px] truncate"
              >
                {currentFrente.topics.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {onOpenExportReportModal && (
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={onOpenExportReportModal}
                  className="bg-black hover:bg-[#FF6321] hover:text-black text-white font-bold text-xs uppercase px-3.5 py-2 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5 text-[#FF6321] group-hover:text-black" />
                  <span>Relatório PDF</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 7 Stage Step Bar */}
        <div className="mt-8 pt-6 border-t border-black">
          <div className="flex items-center justify-between mb-3 text-xs font-mono font-bold text-black">
            <span>PROGRESSO NAS 7 ETAPAS ({completedCount}/7 CONCLUÍDAS)</span>
            <span className="text-[#FF6321]">{stageCompletionPct}%</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
            {stageList.map((stg) => {
              const isDone = currentProgress.completedStages[stg.id];
              const isSelected = activeStageTab === stg.id;
                            return (
                <button
                  key={stg.id}
                  onClick={() => setActiveStageTab(stg.id)}
                  className={`flex flex-col items-center justify-center p-2 border-2 transition-all cursor-pointer ${
                    isSelected ? 'border-black bg-black text-white shadow-[2px_2px_0px_0px_rgba(255,99,33,1)]' : 'border-black bg-white text-black hover:bg-black/5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold">
                    <stg.icon className="w-3.5 h-3.5" />
                    <span>{stg.number}</span>
                  </div>
                  {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-1" />}
                </button>
              );
            })}
          </div>

          <div className="bg-[#F7F3EF] border-2 border-black p-4 mt-6 flex items-start gap-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            {stageList.map(stg => (
              stg.id === activeStageTab && (
                <div key={stg.id} className="flex-1">
                  <h3 className="font-serif italic font-bold text-black text-lg mb-1 flex items-center gap-2">
                    <stg.icon className={`w-5 h-5 ${stg.color.split(' ')[0]}`} />
                    Etapa {stg.number}: {stg.label}
                  </h3>
                  <p className="text-black/80 font-mono text-xs">{stg.desc}</p>
                </div>
              )
            ))}
          </div>

          {/* Mark as Complete Toggle */}
          <div className="mt-6 flex justify-end">
            <label className="flex items-center gap-2 cursor-pointer group">
              <span className="font-mono text-xs font-bold text-black uppercase">
                Marcar Etapa como Concluída
              </span>
              <input
                type="checkbox"
                checked={currentProgress.completedStages[activeStageTab]}
                onChange={() => handleToggleStage(activeStageTab)}
                className="w-5 h-5 accent-[#FF6321] cursor-pointer"
              />
            </label>
          </div>

          <div className="mt-8 border-t-2 border-black border-dashed pt-8">
            {/* Stage 1: Aula */}
            {activeStageTab === '1-aula' && (
              <div className="space-y-4 text-sm text-black">
                <p>
                  A 1ª Etapa é o seu primeiro contato. Foque em entender a lógica das fórmulas ao invés de apenas decorá-las. No ITA, as videoaulas são o mapa, mas o terreno se ganha nas questões.
                </p>
              </div>
            )}
            
            {/* Stage 2: Resumo */}
            {activeStageTab === '2-resumo' && (
              <div className="space-y-4 text-sm text-black">
                <p>
                  Sintetize os conceitos vitais, fórmulas e truques em suas próprias palavras. Consulte a aba <strong>Resumo ITA</strong> se precisar de uma referência de ouro.
                </p>
              </div>
            )}
            
            {/* Stage 3: Autoexplicação */}
            {activeStageTab === '3-autoexplicacao' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h4 className="font-serif italic font-bold text-black text-sm flex items-center gap-2">
                    <Brain className="w-4 h-4 text-[#FF6321]" />
                    Técnica de Feynman: Explique o assunto sem consultar fontes!
                  </h4>
                </div>
            <textarea
              value={currentProgress.feynmanNotes || ''}
              onChange={(e) => handleFeynmanSave(e.target.value)}
              placeholder="Escreva com suas próprias palavras: O que é esse conceito? Quais as fórmulas fundamentais? Quais as pegadinhas e condições de contorno? Se você não conseguir explicar de forma simples, ainda há lacunas..."
              rows={6}
              className="w-full bg-[#F7F3EF] border border-black p-4 text-black text-xs focus:outline-none focus:bg-white leading-relaxed font-mono"
            />
          </div>
        )}

        {/* Stage 4: Questões */}
        {activeStageTab === '4-questoes' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#F7F3EF] p-4 border border-black">
                <label className="block text-[10px] font-mono font-bold text-black uppercase mb-2">Questões Resolvidas:</label>
                <input
                  type="number"
                  min="0"
                  value={currentProgress.questionsAttempted}
                  onChange={(e) => handleQuestionsUpdate(Number(e.target.value), currentProgress.questionsCorrect)}
                  className="w-full bg-white border border-black text-black font-mono font-bold text-lg px-3 py-2 focus:outline-none"
                />
              </div>

              <div className="bg-[#F7F3EF] p-4 border border-black">
                <label className="block text-[10px] font-mono font-bold text-black uppercase mb-2">Questões Acertadas:</label>
                <input
                  type="number"
                  min="0"
                  value={currentProgress.questionsCorrect}
                  onChange={(e) => handleQuestionsUpdate(currentProgress.questionsAttempted, Number(e.target.value))}
                  className="w-full bg-white border border-black text-black font-mono font-bold text-lg px-3 py-2 focus:outline-none"
                />
              </div>

              <div className="bg-black text-white p-4 border border-black flex flex-col justify-center">
                <span className="text-[10px] font-mono font-bold uppercase text-white/70">Taxa de Acerto ITA:</span>
                <span className="text-2xl font-mono font-black text-[#FF6321] mt-1">
                  {currentProgress.questionsAttempted > 0
                    ? `${Math.round((currentProgress.questionsCorrect / currentProgress.questionsAttempted) * 100)}%`
                    : '0%'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Stage 5: Revisão */}
        {activeStageTab === '5-revisao' && (
          <div className="space-y-4">
            <p className="text-sm text-black">
              A 5ª Etapa garante a retenção de longo prazo. Use a aba <strong>Flashcards SRS</strong> para revisar os conceitos de maneira espaçada no momento ideal.
            </p>
          </div>
        )}

        {/* Stage 6: Simulado */}
        {activeStageTab === '6-simulado' && (
          <div className="space-y-4">
            <p className="text-sm text-black">
              A 6ª Etapa avalia a capacidade de resolver questões sob pressão de tempo (em média 3,5 minutos por questão no ITA).
            </p>
          </div>
        )}

        {/* Stage 7: Correção & Raio-X do Erro */}
        {activeStageTab === '7-correcao' && (
          <div className="space-y-6">
            <div className="bg-[#FF6321]/10 border border-black p-4">
              <h4 className="text-xs font-mono font-bold text-black uppercase flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#FF6321]" />
                Diagnóstico Obrigatório de Erros - "Não Errar de Novo"
              </h4>
              <p className="text-xs text-black/80 mt-1">
                Para cada questão errada em listas ou simulados, identifique o motivo exato do erro e estabeleça um novo método de aprendizado para que a mesma falha nunca mais aconteça no ITA.
              </p>
            </div>

            {/* Error Log Form */}
            <form onSubmit={handleAddErrorLog} className="bg-[#F7F3EF] border border-black p-4 space-y-4">
              <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-black flex items-center gap-1.5 border-b border-black/20 pb-2">
                <Plus className="w-4 h-4 text-[#FF6321]" />
                Registrar Novo Erro de Questão:
              </h5>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                <div>
                  <label className="block font-bold text-black/70 uppercase text-[10px] mb-1">
                    Descrição da Questão / Enunciado:
                  </label>
                  <input
                    type="text"
                    value={errorDesc}
                    onChange={(e) => setErrorDesc(e.target.value)}
                    placeholder="Ex: Questão 12 ITA 2023 - Colisão elástica com mola"
                    className="w-full bg-white border border-black px-3 py-2 text-black text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-black/70 uppercase text-[10px] mb-1">Motivo do Erro (Causa Raiz):</label>
                  <select
                    value={errorCause}
                    onChange={(e) => setErrorCause(e.target.value as ErrorRootCause)}
                    className="w-full bg-white border border-black px-3 py-2 text-black text-xs focus:outline-none"
                  >
                    <option value="falta_teoria">Falta de Teoria / Não conhecia a fórmula</option>
                    <option value="atencao_interpretacao">Erro de Atenção / Má Interpretação do texto</option>
                    <option value="erro_conta">Erro de Conta / Álgebra / Sinal</option>
                    <option value="pegadinha">Caiu na Pegadinha do ITA</option>
                    <option value="tempo_insuficiente">Tempo Insuficiente / Falta de estratégia de prova</option>
                    <option value="lacuna_conceitual">Lacuna Conceitual Específica</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
                <div>
                  <label className="block font-bold text-black/70 uppercase text-[10px] mb-1">Lacuna de Aprendizado Identificada:</label>
                  <input
                    type="text"
                    value={learningGap}
                    onChange={(e) => setLearningGap(e.target.value)}
                    placeholder="Ex: Não lembrava da conservação no referencial móvel..."
                    className="w-full bg-white border border-black px-3 py-2 text-black text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-black/70 uppercase text-[10px] mb-1">Novo Método / Plano de Ação:</label>
                  <input
                    type="text"
                    value={actionPlan}
                    onChange={(e) => setActionPlan(e.target.value)}
                    placeholder="Ex: Criar 2 flashcards e refazer a questão em 3 dias."
                    className="w-full bg-white border border-black px-3 py-2 text-black text-xs focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-5 py-2.5 bg-black hover:bg-[#FF6321] hover:text-black text-white font-mono font-bold text-xs uppercase transition-all cursor-pointer border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                Salvar Diagnóstico do Erro
              </button>
            </form>

            {/* List of Registered Errors */}
            <div className="space-y-3">
              <h5 className="text-xs font-mono font-bold text-black uppercase tracking-wider">
                Histórico de Erros Registrados ({currentProgress.errorLog?.length || 0}):
              </h5>

              {!currentProgress.errorLog || currentProgress.errorLog.length === 0 ? (
                <div className="text-center py-8 text-black/50 font-mono text-xs bg-[#F7F3EF] border border-black">
                  Nenhum erro registrado para este assunto ainda. Continue praticando!
                </div>
              ) : (
                currentProgress.errorLog.map((err) => {
                  const causeInfo = causeLabels[err.rootCause];
                  return (
                    <div key={err.id} className="bg-white border border-black p-4 space-y-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-black/20 pb-2">
                        <span className="font-bold text-black text-xs">{err.questionDescription}</span>
                        <span className="px-2.5 py-0.5 bg-black text-white font-mono text-[10px] font-bold uppercase">
                          {causeInfo.label}
                        </span>
                      </div>

                      {err.learningGap && (
                        <div className="text-xs text-black">
                          <strong className="font-mono text-[#FF6321] uppercase text-[10px]">Lacuna:</strong> {err.learningGap}
                        </div>
                      )}

                      {err.actionPlan && (
                        <div className="text-xs text-black flex items-center gap-1.5">
                          <ArrowRight className="w-3.5 h-3.5 text-black shrink-0" />
                          <span><strong className="font-mono uppercase text-[10px] text-black">Plano de Ação:</strong> {err.actionPlan}</span>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
    </div>
  );
};
