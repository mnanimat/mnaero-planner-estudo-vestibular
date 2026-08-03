import React, { useState, useEffect, useRef } from 'react';
import { FrenteInfo, Subject, StudyStage, StudyLog } from '../types';
import { Play, Pause, RotateCcw, Volume2, VolumeX, CheckCircle, Clock, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PomodoroTimerProps {
  frentes: FrenteInfo[];
  onAddStudyLog: (log: Omit<StudyLog, 'id' | 'timestamp'>) => void;
  onTimerStatusChange: (isRunning: boolean, activeTopic: string | null) => void;
}

export const PomodoroTimer: React.FC<PomodoroTimerProps> = ({
  frentes,
  onAddStudyLog,
  onTimerStatusChange,
}) => {
  // Timer Mode
  const [mode, setMode] = useState<'focus' | 'shortBreak' | 'longBreak'>('focus');
  
  // Custom Durations in minutes
  const [focusMinutes, setFocusMinutes] = useState(50);
  const [shortBreakMinutes, setShortBreakMinutes] = useState(10);
  const [longBreakMinutes, setLongBreakMinutes] = useState(20);

  // Time left in seconds
  const [timeLeft, setTimeLeft] = useState(50 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Session Tagger State
  const [selectedSubject, setSelectedSubject] = useState<Subject>('Matemática');
  const [selectedFrenteId, setSelectedFrenteId] = useState<string>('MAT-1');
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [selectedStage, setSelectedStage] = useState<StudyStage>('4-questoes');
  const [sessionNotes, setSessionNotes] = useState<string>('');

  const activeFrente = frentes.find((f) => f.id === selectedFrenteId) || frentes[0];
  const activeTopicName = selectedTopic || activeFrente?.topics[0] || 'Geral';

  // Audio tone generator
  const playChime = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      const playNote = (freq: number, start: number, duration: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.1, ctx.currentTime + start);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + start);
        osc.stop(ctx.currentTime + start + duration);
      };

      playNote(523.25, 0, 0.4); // C5
      playNote(659.25, 0.25, 0.4); // E5
      playNote(783.99, 0.5, 0.6); // G5
      playNote(1046.50, 0.75, 0.8); // C6
    } catch (e) {
      console.error(e);
    }
  };

  // Switch mode resets seconds
  useEffect(() => {
    let targetMins = focusMinutes;
    if (mode === 'shortBreak') targetMins = shortBreakMinutes;
    if (mode === 'longBreak') targetMins = longBreakMinutes;

    setTimeLeft(targetMins * 60);
    setIsRunning(false);
    onTimerStatusChange(false, null);
  }, [mode, focusMinutes, shortBreakMinutes, longBreakMinutes]);

  // Sync Timer Status to parent
  useEffect(() => {
    onTimerStatusChange(isRunning, isRunning ? activeTopicName : null);
  }, [isRunning, activeTopicName]);

  // Main countdown loop
  useEffect(() => {
    let interval: any = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      playChime();

      if (mode === 'focus') {
        confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
        // Auto-log completed session
        onAddStudyLog({
          subject: selectedSubject,
          frenteId: selectedFrenteId,
          topic: activeTopicName,
          stage: selectedStage,
          durationMinutes: focusMinutes,
          notes: sessionNotes || 'Sessão de foco concluída',
        });
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode]);

  const toggleTimer = () => setIsRunning((prev) => !prev);

  const resetTimer = () => {
    let targetMins = focusMinutes;
    if (mode === 'shortBreak') targetMins = shortBreakMinutes;
    if (mode === 'longBreak') targetMins = longBreakMinutes;
    setTimeLeft(targetMins * 60);
    setIsRunning(false);
  };

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const totalModeSec = (mode === 'focus' ? focusMinutes : mode === 'shortBreak' ? shortBreakMinutes : longBreakMinutes) * 60;
  const progressPct = totalModeSec > 0 ? ((totalModeSec - timeLeft) / totalModeSec) * 100 : 0;

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-white rounded-none p-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-black text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-[#FF6321]" />
            Cronômetro de Foco Profundo (Deep Work)
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-black tracking-tight italic">
            Pomodoro ITA com Registro Automático
          </h2>
          <p className="text-xs sm:text-sm text-black/80 mt-1 max-w-xl">
            Estude com ciclos de foco total e descanso planejado. Cada bloco finalizado é contabilizado automaticamente nas suas estatísticas.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-1.5 bg-[#F7F3EF] p-1.5 border border-black font-mono">
          <button
            onClick={() => setMode('focus')}
            className={`px-3.5 py-2 text-xs font-bold uppercase transition-all cursor-pointer border border-black ${
              mode === 'focus'
                ? 'bg-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                : 'text-black hover:bg-black/10'
            }`}
          >
            Foco ({focusMinutes}m)
          </button>
          <button
            onClick={() => setMode('shortBreak')}
            className={`px-3.5 py-2 text-xs font-bold uppercase transition-all cursor-pointer border border-black ${
              mode === 'shortBreak'
                ? 'bg-[#FF6321] text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                : 'text-black hover:bg-black/10'
            }`}
          >
            Pausa Curta ({shortBreakMinutes}m)
          </button>
          <button
            onClick={() => setMode('longBreak')}
            className={`px-3.5 py-2 text-xs font-bold uppercase transition-all cursor-pointer border border-black ${
              mode === 'longBreak'
                ? 'bg-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                : 'text-black hover:bg-black/10'
            }`}
          >
            Pausa Longa ({longBreakMinutes}m)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Timer Display Card */}
        <div className="lg:col-span-7 bg-white border-2 border-black p-8 flex flex-col items-center justify-center text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative">
          {/* Circular Progress Ring */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center my-4">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                className="text-black/10"
                strokeWidth="6"
                stroke="currentColor"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                className={
                  mode === 'focus'
                    ? 'text-black'
                    : mode === 'shortBreak'
                    ? 'text-[#FF6321]'
                    : 'text-black'
                }
                strokeWidth="6"
                strokeDasharray="263.89"
                strokeDashoffset={263.89 - (263.89 * progressPct) / 100}
                strokeLinecap="square"
                stroke="currentColor"
                fill="transparent"
                style={{ transition: 'stroke-dashoffset 1s linear' }}
              />
            </svg>

            {/* Time Inside Ring */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl sm:text-6xl font-black text-black font-mono tracking-tighter">
                {formatTime(timeLeft)}
              </span>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-black/60 mt-2">
                {mode === 'focus' ? 'Sessão de Foco' : 'Tempo de Descanso'}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={toggleTimer}
              className={`flex items-center gap-2 px-8 py-4 font-mono font-black text-base uppercase transition-all border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer active:translate-x-[2px] active:translate-y-[2px] ${
                isRunning
                  ? 'bg-[#FF6321] text-black'
                  : 'bg-black hover:bg-[#FF6321] hover:text-black text-white'
              }`}
            >
              {isRunning ? (
                <>
                  <Pause className="w-6 h-6 fill-current" /> Pausar
                </>
              ) : (
                <>
                  <Play className="w-6 h-6 fill-current" /> Iniciar Foco
                </>
              )}
            </button>

            <button
              onClick={resetTimer}
              className="p-4 bg-white hover:bg-black/10 text-black border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
              title="Reiniciar tempo"
            >
              <RotateCcw className="w-6 h-6" />
            </button>

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-4 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer ${
                soundEnabled
                  ? 'bg-[#FF6321] text-black'
                  : 'bg-white text-black/40'
              }`}
              title={soundEnabled ? 'Som ativado' : 'Som desativado'}
            >
              {soundEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Session Tagging Form & Settings */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-black flex items-center gap-2 border-b border-black pb-3">
              <Sparkles className="w-4 h-4 text-[#FF6321]" />
              Etiquetar Sessão Atual de Estudo:
            </h3>

            <div className="font-mono text-xs">
              <label className="block text-black/70 font-bold uppercase text-[10px] mb-1">Matéria / Frente:</label>
              <select
                value={selectedFrenteId}
                onChange={(e) => {
                  setSelectedFrenteId(e.target.value);
                  const f = frentes.find((fr) => fr.id === e.target.value);
                  if (f) {
                    setSelectedSubject(f.subject);
                    setSelectedTopic(f.topics[0] || '');
                  }
                }}
                className="w-full bg-[#F7F3EF] border border-black text-black font-bold text-xs px-3 py-2.5 focus:outline-none"
              >
                {frentes.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.id} - {f.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="font-mono text-xs">
              <label className="block text-black/70 font-bold uppercase text-[10px] mb-1">Assunto Específico:</label>
              <select
                value={activeTopicName}
                onChange={(e) => setSelectedTopic(e.target.value)}
                className="w-full bg-[#F7F3EF] border border-black text-black font-bold text-xs px-3 py-2.5 focus:outline-none"
              >
                {activeFrente?.topics.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="font-mono text-xs">
              <label className="block text-black/70 font-bold uppercase text-[10px] mb-1">Etapa do Estudo:</label>
              <select
                value={selectedStage}
                onChange={(e) => setSelectedStage(e.target.value as StudyStage)}
                className="w-full bg-[#F7F3EF] border border-black text-black font-bold text-xs px-3 py-2.5 focus:outline-none"
              >
                <option value="1-aula">1 - Aula / Videoaula</option>
                <option value="2-resumo">2 - Criando Resumo</option>
                <option value="3-autoexplicacao">3 - Autoexplicação (Feynman)</option>
                <option value="4-questoes">4 - Bateria de Questões</option>
                <option value="5-revisao">5 - Revisão por Flashcards</option>
                <option value="6-simulado">6 - Simulado / Prova Antiga</option>
                <option value="7-correcao">7 - Correção / Análise de Erros</option>
              </select>
            </div>

            <div className="font-mono text-xs">
              <label className="block text-black/70 font-bold uppercase text-[10px] mb-1">Anotação Rápida:</label>
              <input
                type="text"
                value={sessionNotes}
                onChange={(e) => setSessionNotes(e.target.value)}
                placeholder="Ex: Fiz 15 questões da 1ª Fase e errei 2 de MHS..."
                className="w-full bg-[#F7F3EF] border border-black px-3 py-2 text-xs text-black focus:outline-none"
              />
            </div>
          </div>

          {/* Duration Customizer */}
          <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-3">
            <h4 className="text-xs font-mono font-bold text-black uppercase tracking-wider">
              Configuração dos Tempos do Pomodoro:
            </h4>
            <div className="grid grid-cols-3 gap-3 text-xs font-mono">
              <div>
                <label className="block text-black/70 font-bold text-[10px] uppercase mb-1">Foco (min):</label>
                <input
                  type="number"
                  min="5"
                  max="120"
                  value={focusMinutes}
                  onChange={(e) => setFocusMinutes(Number(e.target.value) || 50)}
                  className="w-full bg-[#F7F3EF] border border-black text-black font-bold p-2 text-center focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-black/70 font-bold text-[10px] uppercase mb-1">P. Curta (min):</label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={shortBreakMinutes}
                  onChange={(e) => setShortBreakMinutes(Number(e.target.value) || 10)}
                  className="w-full bg-[#F7F3EF] border border-black text-black font-bold p-2 text-center focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-black/70 font-bold text-[10px] uppercase mb-1">P. Longa (min):</label>
                <input
                  type="number"
                  min="5"
                  max="60"
                  value={longBreakMinutes}
                  onChange={(e) => setLongBreakMinutes(Number(e.target.value) || 20)}
                  className="w-full bg-[#F7F3EF] border border-black text-black font-bold p-2 text-center focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
