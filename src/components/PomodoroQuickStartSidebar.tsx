import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  Flame, 
  Zap, 
  CheckCircle2, 
  X,
  PlusCircle,
  Volume2,
  VolumeX,
  Maximize2
} from 'lucide-react';
import { FrenteInfo, Subject, AgendaTopic } from '../types';

interface PomodoroQuickStartSidebarProps {
  frentes: FrenteInfo[];
  agendaTopics: AgendaTopic[];
  isTimerRunning: boolean;
  activeTimerTopic: string | null;
  onNavigateToPomodoro: () => void;
  onStartQuickTimer?: (durationMinutes: number, topicName: string, subject: Subject) => void;
  onToggleTimerRunning?: () => void;
  onResetTimer?: () => void;
}

export const PomodoroQuickStartSidebar: React.FC<PomodoroQuickStartSidebarProps> = ({
  frentes,
  agendaTopics,
  isTimerRunning,
  activeTimerTopic,
  onNavigateToPomodoro,
  onStartQuickTimer,
  onToggleTimerRunning,
  onResetTimer,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<Subject>('Matemática');
  const [selectedFrenteId, setSelectedFrenteId] = useState<string>('MAT-1');
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [selectedDuration, setSelectedDuration] = useState<number>(50); // Default 50min ITA block

  // 1. Identify today's featured topic from Agenda / Gantt
  const todayStr = new Date().toISOString().split('T')[0];
  const todayAgenda = agendaTopics.filter((t) => t.startDate <= todayStr && t.endDate >= todayStr);
  const featuredAgendaTopic = todayAgenda[0];

  // Fallback featured topic from frentes
  const currentFrente = frentes.find((f) => f.id === selectedFrenteId) || frentes[0];
  const activeTopic = selectedTopic || featuredAgendaTopic?.topicName || currentFrente?.topics[0] || 'Revisão Geral ITA';

  // Update frente options when subject changes
  const availableFrentes = frentes.filter((f) => f.subject === selectedSubject);

  useEffect(() => {
    if (availableFrentes.length > 0 && !availableFrentes.some((f) => f.id === selectedFrenteId)) {
      setSelectedFrenteId(availableFrentes[0].id);
      setSelectedTopic(availableFrentes[0].topics[0] || '');
    }
  }, [selectedSubject]);

  const handleStartTimer = () => {
    if (onStartQuickTimer) {
      onStartQuickTimer(selectedDuration, activeTopic, selectedSubject);
    }
    setIsOpen(true);
  };

  return (
    <>
      {/* Collapsed Sticky Sidebar Trigger Button on the right edge */}
      <div className="fixed right-0 top-32 z-50 flex items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 px-3 py-2.5 font-mono font-bold text-xs uppercase border-2 border-r-0 border-black shadow-[-3px_3px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer ${
            isTimerRunning
              ? 'bg-[#FF6321] text-black animate-pulse'
              : 'bg-black text-white hover:bg-[#FF6321] hover:text-black'
          }`}
          title="Abrir Pomodoro Quick-Start"
        >
          {isTimerRunning ? (
            <Flame className="w-4 h-4 text-black animate-bounce shrink-0" />
          ) : (
            <Clock className="w-4 h-4 text-[#FF6321] shrink-0" />
          )}
          <span className="hidden sm:inline font-black tracking-wider">
            {isTimerRunning ? 'Foco Ativo' : 'Quick Focus'}
          </span>
          {isOpen ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Expanded Quick-Start Drawer / Panel */}
      {isOpen && (
        <div className="fixed right-0 top-24 bottom-6 z-50 w-80 sm:w-96 bg-white border-l-2 border-y-2 border-black p-5 shadow-[-8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between overflow-y-auto font-mono text-black">
          {/* Header */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b-2 border-black pb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-black text-white border border-black">
                  <Zap className="w-4 h-4 text-[#FF6321]" />
                </div>
                <div>
                  <h3 className="font-serif font-black italic text-base sm:text-lg leading-none text-black">
                    Pomodoro Quick-Start
                  </h3>
                  <span className="text-[10px] text-black/60 font-bold uppercase tracking-wider block mt-0.5">
                    Painel Lateral de Foco Direto
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-black hover:bg-black hover:text-white border border-black cursor-pointer transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Currently Active Timer Card if Running */}
            {isTimerRunning && (
              <div className="bg-[#FF6321] border-2 border-black p-4 space-y-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-black">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
                  <span className="flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 fill-current" />
                    Sessão de Estudo em Andamento
                  </span>
                  <span className="bg-black text-white px-1.5 py-0.2">EM FOCO</span>
                </div>

                <div className="text-xs font-serif font-black italic truncate">
                  {activeTimerTopic || activeTopic}
                </div>

                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={onToggleTimerRunning}
                    className="px-3 py-1.5 bg-black text-white hover:bg-white hover:text-black font-bold text-xs uppercase border border-black cursor-pointer flex items-center gap-1.5 transition-all"
                  >
                    <Pause className="w-3.5 h-3.5 fill-current" />
                    <span>Pausar</span>
                  </button>

                  <button
                    onClick={onNavigateToPomodoro}
                    className="px-3 py-1.5 bg-white text-black hover:bg-black hover:text-white font-bold text-xs uppercase border border-black cursor-pointer flex items-center gap-1.5 transition-all"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Expandir</span>
                  </button>
                </div>
              </div>
            )}

            {/* Featured Topic Highlight from Gantt Agenda */}
            <div className="bg-[#F7F3EF] border-2 border-black p-3.5 space-y-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center justify-between text-[10px] font-bold text-black/70 uppercase">
                <span className="flex items-center gap-1 text-[#FF6321]">
                  <Sparkles className="w-3.5 h-3.5" />
                  Tópico em Destaque Hoje
                </span>
                <span className="bg-black text-white text-[9px] px-1.5 py-0.2 uppercase">
                  Gantt
                </span>
              </div>

              <div className="font-serif font-black text-sm text-black italic line-clamp-2">
                {featuredAgendaTopic ? featuredAgendaTopic.topicName : activeTopic}
              </div>

              {featuredAgendaTopic && (
                <div className="text-[10px] text-black/70 flex items-center justify-between pt-1">
                  <span>{featuredAgendaTopic.subject}</span>
                  {featuredAgendaTopic.startTime && (
                    <span>{featuredAgendaTopic.startTime} - {featuredAgendaTopic.endTime}</span>
                  )}
                </div>
              )}
            </div>

            {/* Topic & Subject Selection Form */}
            <div className="space-y-3 pt-2">
              {/* Subject selector */}
              <div>
                <label className="block text-[10px] font-bold uppercase text-black/70 mb-1">
                  Matéria do Bloco:
                </label>
                <div className="grid grid-cols-3 gap-1.5 text-xs">
                  {(['Matemática', 'Física', 'Química'] as Subject[]).map((sub) => (
                    <button
                      key={sub}
                      type="button"
                      onClick={() => setSelectedSubject(sub)}
                      className={`py-1 px-1.5 text-center font-bold text-[10px] uppercase border border-black cursor-pointer transition-all ${
                        selectedSubject === sub
                          ? 'bg-black text-white shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]'
                          : 'bg-[#F7F3EF] hover:bg-black/10 text-black'
                      }`}
                    >
                      {sub.slice(0, 3)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Frente selector */}
              <div>
                <label className="block text-[10px] font-bold uppercase text-black/70 mb-1">
                  Frente do Edital:
                </label>
                <select
                  value={selectedFrenteId}
                  onChange={(e) => {
                    setSelectedFrenteId(e.target.value);
                    const fr = frentes.find((f) => f.id === e.target.value);
                    if (fr && fr.topics.length > 0) setSelectedTopic(fr.topics[0]);
                  }}
                  className="w-full bg-[#F7F3EF] border border-black px-2.5 py-1.5 text-xs font-bold text-black focus:outline-none"
                >
                  {availableFrentes.map((fr) => (
                    <option key={fr.id} value={fr.id}>
                      {fr.id} — {fr.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Specific Topic selector */}
              <div>
                <label className="block text-[10px] font-bold uppercase text-black/70 mb-1">
                  Assunto Específico:
                </label>
                <select
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="w-full bg-[#F7F3EF] border border-black px-2.5 py-1.5 text-xs font-bold text-black focus:outline-none truncate"
                >
                  {currentFrente?.topics.map((tp, i) => (
                    <option key={i} value={tp}>
                      {tp}
                    </option>
                  ))}
                </select>
              </div>

              {/* Preset Durations */}
              <div>
                <label className="block text-[10px] font-bold uppercase text-black/70 mb-1">
                  Duração da Sessão de Foco:
                </label>
                <div className="grid grid-cols-3 gap-1.5 text-xs">
                  {[
                    { label: '25 min', val: 25 },
                    { label: '50 min (ITA)', val: 50 },
                    { label: '90 min', val: 90 },
                  ].map((dur) => (
                    <button
                      key={dur.val}
                      type="button"
                      onClick={() => setSelectedDuration(dur.val)}
                      className={`py-1.5 px-2 text-center font-bold text-[11px] uppercase border border-black cursor-pointer transition-all ${
                        selectedDuration === dur.val
                          ? 'bg-[#FF6321] text-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]'
                          : 'bg-[#F7F3EF] hover:bg-black/10 text-black'
                      }`}
                    >
                      {dur.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t-2 border-black space-y-2 mt-4">
            <button
              onClick={handleStartTimer}
              className="w-full py-2.5 bg-black hover:bg-[#FF6321] text-white hover:text-black font-bold text-xs uppercase border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4 fill-current text-[#FF6321] group-hover:text-black" />
              <span>Iniciar Foco Direto ({selectedDuration}min)</span>
            </button>

            <button
              onClick={onNavigateToPomodoro}
              className="w-full py-2 bg-[#F7F3EF] hover:bg-black hover:text-white text-black font-bold text-xs uppercase border border-black cursor-pointer flex items-center justify-center gap-1.5 transition-all"
            >
              <span>Abrir Temporizador Completo</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
