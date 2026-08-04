import React, { useState } from 'react';
import { 
  BarChart3, 
  RotateCcw, 
  Layers, 
  Clock, 
  Zap, 
  FileText, 
  Calendar as CalendarIcon, 
  HardDrive, 
  Flame, 
  Award, 
  Plus, 
  ExternalLink, 
  Play, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle,
  ChevronRight,
  TrendingUp,
  BookOpen,
  Target,
  ShieldAlert,
  Info
} from 'lucide-react';
import { FrenteInfo, AgendaTopic, StudyLog, Flashcard, ExamTopicData, Subject } from '../types';
import { ItaCountdownBanner } from './ItaCountdownBanner';
import { DailyGanttProgressWidget } from './DailyGanttProgressWidget';

interface OverviewDashboardProps {
  frentes: FrenteInfo[];
  agendaTopics: AgendaTopic[];
  studyLogs: StudyLog[];
  flashcards: Flashcard[];
  completedBlocks: Record<string, number>;
  streakDays: number;
  onOpenAddModal: () => void;
  onNavigateTab: (tab: any) => void;
  onStartPomodoroTopic?: (topicName: string, subject: Subject) => void;
  onOpenPhaseGuide?: () => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  frentes,
  agendaTopics,
  studyLogs,
  flashcards,
  completedBlocks,
  streakDays,
  onOpenAddModal,
  onNavigateTab,
  onStartPomodoroTopic,
  onOpenPhaseGuide
}) => {
  const [phaseFilter, setPhaseFilter] = useState<'all' | '1a' | '2a'>('all');

  // Filter frentes by phase
  const filteredFrentes = frentes.filter(f => {
    if (phaseFilter === 'all') return true;
    if (phaseFilter === '1a') return f.phase === '1a' || f.phase === 'ambas' || !f.phase;
    if (phaseFilter === '2a') return f.phase === '2a' || f.phase === 'ambas' || !f.phase;
    return true;
  });

  // Calculations
  const totalHours = studyLogs.reduce((acc, l) => acc + l.durationMinutes / 60, 0);
  const todayStr = new Date().toISOString().split('T')[0];
  const dueFlashcards = flashcards.filter((c) => c.dueDate <= todayStr).length;
  
  // Total cycle blocks completed
  const totalBlocksCompleted = Object.values(completedBlocks).reduce((a: number, b: number) => a + b, 0);

  // Today's & upcoming agenda items
  const upcomingAgenda = agendaTopics.slice(0, 5);

  // Drive attached topics
  const driveTopics = agendaTopics.filter((t) => t.driveAttachmentUrl);

  // Subject hours breakdown
  const matHours = studyLogs.filter((l) => l.subject === 'Matemática').reduce((a, l) => a + l.durationMinutes / 60, 0);
  const fisHours = studyLogs.filter((l) => l.subject === 'Física').reduce((a, l) => a + l.durationMinutes / 60, 0);
  const quiHours = studyLogs.filter((l) => l.subject === 'Química').reduce((a, l) => a + l.durationMinutes / 60, 0);
  const portHours = studyLogs.filter((l) => l.subject === 'Português').reduce((a, l) => a + l.durationMinutes / 60, 0);
  const ingHours = studyLogs.filter((l) => l.subject === 'Inglês').reduce((a, l) => a + l.durationMinutes / 60, 0);
  const redHours = studyLogs.filter((l) => l.subject === 'Redação').reduce((a, l) => a + l.durationMinutes / 60, 0);

  return (
    <div className="space-y-8 pb-12 font-mono">
      {/* Editorial Welcome Header */}
      <div className="bg-white p-6 sm:p-8 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#FF6321] mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Central Unificada do Estudante ITA // 2027</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-black tracking-tight italic">
            Dashboard Geral de Desempenho & Agenda
          </h2>
          <p className="text-xs sm:text-sm text-black/80 mt-1 max-w-2xl font-sans">
            Plataforma MNAero Planner - Ferramenta aberta e gratuita desenvolvida para auxiliar vestibulandos na preparação para o vestibular do ITA.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          {onOpenPhaseGuide && (
            <button
              onClick={onOpenPhaseGuide}
              className="flex items-center gap-2 px-4 py-3 bg-[#F7F3EF] hover:bg-black hover:text-white text-black font-bold text-xs uppercase border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer font-sans"
            >
              <Info className="w-4 h-4 text-[#FF6321]" />
              <span>Guia 1ª vs 2ª Fase ITA</span>
            </button>
          )}

          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-2 px-6 py-3.5 bg-[#FF6321] hover:bg-black hover:text-white text-black font-bold text-xs uppercase border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer active:translate-y-0.5 active:shadow-none font-mono"
          >
            <Plus className="w-4 h-4" />
            <span>+ Adicionar Assunto & Drive</span>
          </button>
        </div>
      </div>

      {/* Ita Countdown Banner */}
      <ItaCountdownBanner />

      {/* Phase Focus Selector Banner */}
      <div className="bg-black text-white p-5 border-2 border-black shadow-[4px_4px_0px_0px_rgba(255,99,33,1)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#FF6321] text-black font-bold">
            <Target className="w-5 h-5 text-black" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-[#FF6321] tracking-widest block">Foco no Vestibular ITA</span>
            <h3 className="text-sm sm:text-base font-serif font-black italic text-white">
              {phaseFilter === 'all' && 'Visualização Completa (Todas as Fases & Matérias)'}
              {phaseFilter === '1a' && 'Foco na 1ª Fase - Prova Objetiva (60 Qs: MAT, FÍS, QUÍ, PORT, ING)'}
              {phaseFilter === '2a' && 'Foco na 2ª Fase - Prova Discursiva & Redação (MAT, FÍS, QUÍ, RED)'}
            </h3>
          </div>
        </div>

        {/* Phase Toggle Controls */}
        <div className="flex items-center gap-1.5 bg-zinc-900 p-1 border border-zinc-700 font-sans shrink-0">
          <button
            onClick={() => setPhaseFilter('all')}
            className={`px-3 py-1.5 text-xs font-bold uppercase transition-all ${
              phaseFilter === 'all' ? 'bg-[#FF6321] text-black shadow-sm' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Todas as Fases
          </button>
          <button
            onClick={() => setPhaseFilter('1a')}
            className={`px-3 py-1.5 text-xs font-bold uppercase transition-all ${
              phaseFilter === '1a' ? 'bg-[#FF6321] text-black shadow-sm' : 'text-zinc-400 hover:text-white'
            }`}
          >
            1ª Fase (Objetiva)
          </button>
          <button
            onClick={() => setPhaseFilter('2a')}
            className={`px-3 py-1.5 text-xs font-bold uppercase transition-all ${
              phaseFilter === '2a' ? 'bg-[#FF6321] text-black shadow-sm' : 'text-zinc-400 hover:text-white'
            }`}
          >
            2ª Fase (Discursiva)
          </button>
        </div>
      </div>

      {/* Daily Progress vs Gantt Schedule Widget with Circular Progress Ring */}
      <DailyGanttProgressWidget
        studyLogs={studyLogs}
        agendaTopics={agendaTopics}
        onNavigateTab={onNavigateTab}
        onStartPomodoroTopic={onStartPomodoroTopic}
      />

      {/* Top 5 Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Metric 1: Total Hours */}
        <div className="bg-white border-2 border-black p-5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-black/70 uppercase">
            <span>Horas Totais</span>
            <Clock className="w-4 h-4 text-[#FF6321]" />
          </div>
          <div className="text-2xl font-black text-black">{totalHours.toFixed(1)}h</div>
          <p className="text-[10px] text-black/60 font-bold uppercase">Registradas no Planner</p>
        </div>

        {/* Metric 2: Streak */}
        <div className="bg-white border-2 border-black p-5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-black/70 uppercase">
            <span>Ofensiva</span>
            <Flame className="w-4 h-4 text-[#FF6321]" />
          </div>
          <div className="text-2xl font-black text-black">{streakDays} dias</div>
          <p className="text-[10px] text-black/60 font-bold uppercase">Sequência Sem Falhas</p>
        </div>

        {/* Metric 3: Active Agenda Topics */}
        <div className="bg-white border-2 border-black p-5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-black/70 uppercase">
            <span>Assuntos Agenda</span>
            <CalendarIcon className="w-4 h-4 text-[#FF6321]" />
          </div>
          <div className="text-2xl font-black text-black">{agendaTopics.length} tópicos</div>
          <p className="text-[10px] text-black/60 font-bold uppercase">No Gantt & Kanban</p>
        </div>

        {/* Metric 4: Flashcards SRS */}
        <div className="bg-white border-2 border-black p-5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-black/70 uppercase">
            <span>Flashcards Pendentes</span>
            <Zap className="w-4 h-4 text-[#FF6321]" />
          </div>
          <div className="text-2xl font-black text-[#FF6321]">{dueFlashcards} cartões</div>
          <p className="text-[10px] text-black/60 font-bold uppercase">Aguardando Revisão</p>
        </div>

        {/* Metric 5: Google Drive Summaries */}
        <div className="bg-white border-2 border-black p-5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-black/70 uppercase">
            <span>Resumos Drive</span>
            <HardDrive className="w-4 h-4 text-[#FF6321]" />
          </div>
          <div className="text-2xl font-black text-black">{driveTopics.length} arquivos</div>
          <p className="text-[10px] text-black/60 font-bold uppercase">PDFs & Imagens</p>
        </div>
      </div>

      {/* Edital & Syllabus Callout Card */}
      <div className="bg-[#F7F3EF] border-2 border-black p-4 sm:p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-black text-[#FF6321] border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase text-[#FF6321] tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>Programa Oficial Mapeado</span>
            </div>
            <h3 className="font-serif font-black text-base sm:text-lg italic text-black">
              Edital & Conteúdo Programático Unificado ITA 2026
            </h3>
            <p className="text-xs font-sans text-black/80">
              Consulte todos os tópicos de Física, Matemática, Química, Português, Literatura, Inglês e Redação do ITA com estatística de incidência e bibliografia recomendada.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onNavigateTab('programa')}
          className="px-5 py-2.5 bg-black hover:bg-[#FF6321] text-white hover:text-black font-bold text-xs uppercase border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer shrink-0 flex items-center gap-2"
        >
          <span>Abrir Programa ITA</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Main Grid Section 1: Agenda Routine Snapshot & Study Cycle */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Agenda & Gantt Quick Routine Widget */}
        <div className="lg:col-span-7 bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4">
          <div className="flex items-center justify-between border-b-2 border-black pb-3">
            <div>
              <h3 className="text-xs font-bold text-black uppercase flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-[#FF6321]" />
                Rotina & Próximos Assuntos da Agenda
              </h3>
              <p className="text-[11px] text-black/70 mt-0.5">Visão rápida das datas e horários estipulados</p>
            </div>

            <button
              onClick={() => onNavigateTab('agenda')}
              className="text-xs font-bold uppercase underline hover:text-[#FF6321] flex items-center gap-1 cursor-pointer"
            >
              <span>Ver Gantt & Kanban Completo</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {upcomingAgenda.length === 0 ? (
              <div className="p-6 bg-[#F7F3EF] border border-black text-center text-xs text-black/70">
                Nenhum assunto agendado ainda. Clique em "+ Adicionar Assunto & Drive".
              </div>
            ) : (
              upcomingAgenda.map((topic) => (
                <div
                  key={topic.id}
                  className="bg-[#F7F3EF] border-2 border-black p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[10px] font-bold">
                      <span className="bg-black text-white px-2 py-0.5 border border-black uppercase">
                        {topic.subject} ({topic.frenteId})
                      </span>
                      <span className="text-[#FF6321] font-extrabold uppercase">
                        {topic.status.replace('_', ' ')}
                      </span>
                    </div>

                    <h4 className="font-serif font-black text-black text-sm italic">
                      {topic.topicName}
                    </h4>

                    <div className="text-[11px] text-black/80 flex items-center gap-3">
                      <span>📅 {topic.startDate} até {topic.endDate}</span>
                      <span>⏰ {topic.startTime} - {topic.endTime}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {topic.driveAttachmentUrl && (
                      <a
                        href={topic.driveAttachmentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1.5 bg-black text-white hover:bg-[#FF6321] hover:text-black border border-black text-[10px] font-bold uppercase flex items-center gap-1 cursor-pointer"
                        title="Ver PDF / Imagem no Google Drive"
                      >
                        <HardDrive className="w-3 h-3" />
                        <span>Drive</span>
                      </a>
                    )}

                    <button
                      onClick={() => onNavigateTab('agenda')}
                      className="px-2.5 py-1.5 bg-white text-black hover:bg-black hover:text-white border border-black text-[10px] font-bold uppercase cursor-pointer"
                    >
                      Ajustar Horário
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Study Cycle Progress Breakdown */}
        <div className="lg:col-span-5 bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4">
          <div className="flex items-center justify-between border-b-2 border-black pb-3">
            <h3 className="text-xs font-bold text-black uppercase flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-[#FF6321]" />
              Status do Ciclo de Estudos
            </h3>
            <span className="text-xs font-bold bg-black text-white px-2 py-0.5">
              {totalBlocksCompleted} blocos concluídos
            </span>
          </div>

          <div className="space-y-4">
            {/* Subject Distribution */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span>Matemática (4 Frentes)</span>
                <span>{matHours.toFixed(1)}h estudadas</span>
              </div>
              <div className="w-full bg-[#F7F3EF] h-3 border border-black">
                <div
                  className="bg-black h-full transition-all"
                  style={{ width: `${Math.min(100, (matHours / 20) * 100)}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span>Física (5 Frentes)</span>
                <span>{fisHours.toFixed(1)}h estudadas</span>
              </div>
              <div className="w-full bg-[#F7F3EF] h-3 border border-black">
                <div
                  className="bg-[#FF6321] h-full transition-all"
                  style={{ width: `${Math.min(100, (fisHours / 20) * 100)}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span>Química (5 Frentes)</span>
                <span>{quiHours.toFixed(1)}h estudadas</span>
              </div>
              <div className="w-full bg-[#F7F3EF] h-3 border border-black">
                <div
                  className="bg-[#555555] h-full transition-all"
                  style={{ width: `${Math.min(100, (quiHours / 20) * 100)}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span>Português (2 Frentes - 1ª Fase)</span>
                <span>{portHours.toFixed(1)}h estudadas</span>
              </div>
              <div className="w-full bg-[#F7F3EF] h-3 border border-black">
                <div
                  className="bg-[#3B82F6] h-full transition-all"
                  style={{ width: `${Math.min(100, (portHours / 15) * 100)}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span>Inglês (2 Frentes - 1ª Fase)</span>
                <span>{ingHours.toFixed(1)}h estudadas</span>
              </div>
              <div className="w-full bg-[#F7F3EF] h-3 border border-black">
                <div
                  className="bg-[#10B981] h-full transition-all"
                  style={{ width: `${Math.min(100, (ingHours / 15) * 100)}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span>Redação ITA (2ª Fase)</span>
                <span>{redHours.toFixed(1)}h estudadas</span>
              </div>
              <div className="w-full bg-[#F7F3EF] h-3 border border-black">
                <div
                  className="bg-[#8B5CF6] h-full transition-all"
                  style={{ width: `${Math.min(100, (redHours / 15) * 100)}%` }}
                ></div>
              </div>
            </div>

            <div className="p-3 bg-[#F7F3EF] border border-black text-xs space-y-1">
              <span className="font-bold text-black uppercase block">Orientação Estratégica do ITA:</span>
              <p className="text-[11px] text-black/80 font-sans">
                A 1ª Fase exige velocidade e pontuação mínima em Inglês (≥ 40%). A 2ª Fase exige demonstrações formais escritas e rigor argumentativo na Redação.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Section 2: Google Drive Summaries Hub & 7 Stages Quick Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Google Drive Summaries Attached */}
        <div className="lg:col-span-8 bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4">
          <div className="flex items-center justify-between border-b-2 border-black pb-3">
            <h3 className="text-xs font-bold text-black uppercase flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-[#FF6321]" />
              Central de Resumos Anexados do Google Drive
            </h3>
            <button
              onClick={onOpenAddModal}
              className="text-xs font-bold uppercase underline text-black hover:text-[#FF6321] flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Anexar Novo Resumo Drive</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {driveTopics.length === 0 ? (
              <div className="col-span-full p-6 bg-[#F7F3EF] border border-black text-center text-xs text-black/70">
                Nenhum resumo do Google Drive anexado até o momento.
              </div>
            ) : (
              driveTopics.map((topic) => (
                <div
                  key={topic.id}
                  className="bg-[#F7F3EF] border-2 border-black p-4 space-y-2 flex flex-col justify-between shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  <div className="space-y-1">
                    <span className="text-[9px] bg-black text-white px-2 py-0.5 border border-black font-bold uppercase">
                      {topic.subject} ({topic.frenteId})
                    </span>
                    <h4 className="font-serif font-black text-black text-xs italic line-clamp-1">
                      {topic.topicName}
                    </h4>
                    <p className="text-[10px] text-black/70 font-mono truncate">
                      📄 {topic.driveAttachmentName || 'Resumo_Google_Drive.pdf'}
                    </p>
                  </div>

                  <a
                    href={topic.driveAttachmentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-1.5 bg-black hover:bg-[#FF6321] hover:text-black text-white border border-black font-bold text-[10px] uppercase flex items-center justify-center gap-1.5 transition-all cursor-pointer mt-2"
                  >
                    <span>Abrir no Drive</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Pomodoro Launcher & SRS Review */}
        <div className="lg:col-span-4 bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4">
          <h3 className="text-xs font-bold text-black border-b-2 border-black pb-3 uppercase flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#FF6321]" />
            Ações Rápidas de Estudo
          </h3>

          <div className="space-y-3">
            <button
              onClick={() => onNavigateTab('pomodoro')}
              className="w-full p-4 bg-[#FF6321] text-black border-2 border-black font-bold uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-all cursor-pointer flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4 fill-current" />
                <span>Iniciar Cronômetro Pomodoro</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigateTab('flashcards')}
              className="w-full p-4 bg-white text-black border-2 border-black font-bold uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-all cursor-pointer flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-[#FF6321]" />
                <span>Revisar {dueFlashcards} Flashcards Pendentes</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigateTab('stages')}
              className="w-full p-4 bg-[#F7F3EF] text-black border-2 border-black font-bold uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-all cursor-pointer flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#FF6321]" />
                <span>Mapeamento das 7 Etapas</span>
              </div>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
