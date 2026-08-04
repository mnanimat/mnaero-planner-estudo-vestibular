import React from 'react';
import { 
  Clock, 
  Calendar as CalendarIcon, 
  TrendingUp, 
  CheckCircle2, 
  Play, 
  Flame, 
  Target, 
  Zap, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { StudyLog, AgendaTopic, Subject } from '../types';

interface DailyGanttProgressWidgetProps {
  studyLogs: StudyLog[];
  agendaTopics: AgendaTopic[];
  onNavigateTab: (tab: any) => void;
  onStartPomodoroTopic?: (topicName: string, subject: Subject) => void;
}

export const DailyGanttProgressWidget: React.FC<DailyGanttProgressWidgetProps> = ({
  studyLogs,
  agendaTopics,
  onNavigateTab,
  onStartPomodoroTopic
}) => {
  const todayStr = new Date().toISOString().split('T')[0];

  // 1. Calculate hours studied today
  const todayLogs = studyLogs.filter((l) => {
    if (!l.timestamp) return false;
    return l.timestamp.startsWith(todayStr);
  });
  const todayMinutes = todayLogs.reduce((acc, l) => acc + l.durationMinutes, 0);
  const todayHours = todayMinutes / 60;

  // 2. Scheduled topics for today in Gantt
  const todayAgenda = agendaTopics.filter((t) => {
    return t.startDate <= todayStr && t.endDate >= todayStr;
  });

  // Calculate planned hours for today based on scheduled slots
  let scheduledHoursToday = 0;
  todayAgenda.forEach((t) => {
    if (t.startTime && t.endTime) {
      const [sh, sm] = t.startTime.split(':').map(Number);
      const [eh, em] = t.endTime.split(':').map(Number);
      const diffMinutes = (eh * 60 + em) - (sh * 60 + sm);
      if (diffMinutes > 0) {
        scheduledHoursToday += diffMinutes / 60;
      }
    }
  });

  // Daily target hours (default to 4.5h if no specific scheduled slots, or scheduledHoursToday if > 0)
  const targetDailyHours = scheduledHoursToday > 0 ? Math.max(scheduledHoursToday, 2) : 4.5;
  const targetWeeklyHours = 30.0; // Standard weekly workload target for ITA

  // Calculate weekly hours studied so far (from Monday of current week)
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 is Sun, 1 is Mon...
  const distanceToMonday = (dayOfWeek + 6) % 7;
  const monday = new Date(now);
  monday.setDate(now.getDate() - distanceToMonday);
  monday.setHours(0, 0, 0, 0);

  const weekLogs = studyLogs.filter((l) => {
    if (!l.timestamp) return false;
    const logDate = new Date(l.timestamp);
    return logDate >= monday;
  });
  const weekMinutes = weekLogs.reduce((acc, l) => acc + l.durationMinutes, 0);
  const weekHoursSoFar = weekMinutes / 60;

  // Percentages
  const dailyProgressPercent = Math.min(Math.round((todayHours / targetDailyHours) * 100), 100);
  const weeklyContributionToday = Math.min(Math.round((todayHours / targetWeeklyHours) * 100), 100);
  const weeklyTotalPercent = Math.min(Math.round((weekHoursSoFar / targetWeeklyHours) * 100), 100);

  // SVG Progress Ring geometry
  const radius = 46;
  const circumference = 2 * Math.PI * radius; // ~289.02
  const strokeDashoffset = circumference - (dailyProgressPercent / 100) * circumference;

  // Status Badge Determination
  let statusBadge = {
    label: 'Aguardando Início',
    color: 'bg-zinc-200 text-black border-black',
    icon: Clock
  };

  if (dailyProgressPercent >= 100) {
    statusBadge = {
      label: 'Meta Diária Superada! 🔥',
      color: 'bg-emerald-400 text-black border-black',
      icon: Flame
    };
  } else if (dailyProgressPercent >= 75) {
    statusBadge = {
      label: 'Ritmo Excelente ⚡',
      color: 'bg-[#FF6321] text-black border-black',
      icon: Zap
    };
  } else if (dailyProgressPercent >= 35) {
    statusBadge = {
      label: 'Em Execução no Ritmo 📈',
      color: 'bg-amber-300 text-black border-black',
      icon: TrendingUp
    };
  }

  const StatusIcon = statusBadge.icon;

  return (
    <div className="bg-white border-2 border-black p-5 sm:p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] space-y-5 font-mono">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-black pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase text-[#FF6321] tracking-wider mb-0.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Métrica de Desempenho Diário // Gantt</span>
          </div>
          <h3 className="text-lg sm:text-xl font-serif font-black italic text-black">
            Progresso Diário vs Cronograma Gantt
          </h3>
          <p className="text-xs font-sans text-black/70">
            Acompanhamento em tempo real da carga horária estudada hoje comparada às metas do seu plano semanal.
          </p>
        </div>

        {/* Status Badge */}
        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase border-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] shrink-0 ${statusBadge.color}`}>
          <StatusIcon className="w-4 h-4" />
          <span>{statusBadge.label}</span>
        </div>
      </div>

      {/* Main Grid: Circular Progress Ring & Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left Column: Circular Progress Ring */}
        <div className="md:col-span-5 bg-[#F7F3EF] border-2 border-black p-5 flex flex-col items-center justify-center text-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
          <div className="text-[10px] uppercase font-bold text-black/60 tracking-wider mb-2">
            Cumprimento da Meta Diária
          </div>

          {/* SVG Progress Circle */}
          <div className="relative w-36 h-36 flex items-center justify-center my-1">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 110 110">
              {/* Background Track */}
              <circle
                cx="55"
                cy="55"
                r={radius}
                className="stroke-zinc-300"
                strokeWidth="10"
                fill="transparent"
              />
              {/* Animated Progress Ring */}
              <circle
                cx="55"
                cy="55"
                r={radius}
                className="transition-all duration-700 ease-out"
                stroke={dailyProgressPercent >= 100 ? '#10B981' : '#FF6321'}
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* Inner Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="font-serif font-black text-2xl sm:text-3xl text-black leading-none">
                {dailyProgressPercent}%
              </span>
              <span className="text-[10px] font-bold text-black/70 font-mono mt-1">
                {todayHours.toFixed(1)}h / {targetDailyHours.toFixed(1)}h
              </span>
            </div>
          </div>

          <p className="text-[11px] font-sans text-black/80 mt-2">
            <strong>{todayHours.toFixed(1)}h</strong> de <strong>{targetDailyHours.toFixed(1)}h</strong> planejadas para hoje
          </p>
        </div>

        {/* Right Column: Comparison Metrics & Gantt Breakdown */}
        <div className="md:col-span-7 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Box 1: Meta Semanal Cumprida Hoje */}
            <div className="bg-[#F7F3EF] border-2 border-black p-3.5 space-y-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center justify-between text-[10px] font-bold text-black/70 uppercase">
                <span>Contribuição Semanal</span>
                <Target className="w-3.5 h-3.5 text-[#FF6321]" />
              </div>
              <div className="text-xl font-black text-black">
                {weeklyContributionToday}% <span className="text-xs font-normal text-black/60">da semana</span>
              </div>
              <p className="text-[10px] text-black/60">
                Hoje representa {weeklyContributionToday}% do total de {targetWeeklyHours}h semanais
              </p>
            </div>

            {/* Box 2: Total Acumulado na Semana */}
            <div className="bg-[#F7F3EF] border-2 border-black p-3.5 space-y-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center justify-between text-[10px] font-bold text-black/70 uppercase">
                <span>Acumulado da Semana</span>
                <Clock className="w-3.5 h-3.5 text-[#FF6321]" />
              </div>
              <div className="text-xl font-black text-black">
                {weekHoursSoFar.toFixed(1)}h <span className="text-xs font-normal text-black/60">/ {targetWeeklyHours}h</span>
              </div>
              <p className="text-[10px] text-black/60">
                {weeklyTotalPercent}% da meta semanal de 30 horas cumprida
              </p>
            </div>
          </div>

          {/* Weekly Workload Gantt Bar */}
          <div className="bg-[#F7F3EF] border-2 border-black p-3.5 space-y-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="uppercase text-black/80 text-[11px] flex items-center gap-1.5">
                <CalendarIcon className="w-3.5 h-3.5 text-[#FF6321]" />
                Barra do Cronograma Semanal (30h)
              </span>
              <span className="text-[#FF6321]">{weeklyTotalPercent}%</span>
            </div>

            {/* Double Bar showing Week Accumulation + Today's slice */}
            <div className="w-full bg-zinc-200 border border-black h-3.5 overflow-hidden flex">
              <div 
                className="bg-[#FF6321] h-full transition-all duration-500" 
                style={{ width: `${weeklyTotalPercent}%` }}
                title={`Semana: ${weekHoursSoFar.toFixed(1)}h`}
              />
            </div>

            <div className="flex items-center justify-between text-[10px] font-bold text-black/60">
              <span>Segunda-feira (0h)</span>
              <span>Hoje: +{todayHours.toFixed(1)}h</span>
              <span>Meta Semanal (30h)</span>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between gap-3 pt-1">
            <button
              onClick={() => onNavigateTab('agenda')}
              className="text-xs font-bold uppercase text-black hover:text-[#FF6321] flex items-center gap-1 underline cursor-pointer"
            >
              <span>Acessar Cronograma Gantt Completo</span>
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigateTab('cycle')}
              className="px-3.5 py-1.5 bg-black text-white hover:bg-[#FF6321] hover:text-black font-bold text-[11px] uppercase border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Zap className="w-3.5 h-3.5 text-[#FF6321] group-hover:text-black" />
              <span>Ver Ciclo de Estudos</span>
            </button>
          </div>
        </div>
      </div>

      {/* Scheduled Topics Scheduled for Today from Gantt */}
      {todayAgenda.length > 0 && (
        <div className="pt-2 border-t-2 border-black space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-black uppercase">
            <span className="flex items-center gap-1.5 text-[11px]">
              <CalendarIcon className="w-3.5 h-3.5 text-[#FF6321]" />
              Assuntos Agendados no Gantt para Hoje ({todayAgenda.length})
            </span>
            <span className="text-[10px] text-black/60">
              Inicie o timer diretamente para acumular progresso
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {todayAgenda.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="bg-[#F7F3EF] border border-black p-2.5 flex items-center justify-between gap-2 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] text-xs"
              >
                <div className="space-y-0.5 truncate pr-1">
                  <div className="flex items-center gap-1.5 text-[9px] font-bold">
                    <span className="bg-black text-white px-1.5 py-0.2 uppercase">
                      {item.subject}
                    </span>
                    {item.startTime && (
                      <span className="text-black/70">
                        {item.startTime} - {item.endTime}
                      </span>
                    )}
                  </div>
                  <div className="font-serif font-bold text-black italic truncate text-[11px]">
                    {item.topicName}
                  </div>
                </div>

                {onStartPomodoroTopic && (
                  <button
                    type="button"
                    onClick={() => onStartPomodoroTopic(item.topicName, item.subject)}
                    className="p-1.5 bg-[#FF6321] hover:bg-black hover:text-white text-black border border-black cursor-pointer transition-all shrink-0"
                    title="Iniciar Cronômetro Pomodoro"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
