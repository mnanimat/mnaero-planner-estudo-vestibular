import React, { useState, useRef } from 'react';
import { 
  Calendar as CalendarIcon, 
  Kanban as KanbanIcon, 
  Clock, 
  Plus, 
  HardDrive, 
  ExternalLink, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  MoveHorizontal, 
  MoveVertical, 
  BookOpen, 
  Sparkles, 
  ChevronRight, 
  FileText, 
  Image as ImageIcon,
  Layers,
  Search,
  Filter,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Download,
  Upload,
  RotateCcw
} from 'lucide-react';
import { FrenteInfo, AgendaTopic, AgendaStatus, Subject } from '../types';
import { getSubjectColorConfig } from '../utils/theme';
import { ItaCountdownBanner } from './ItaCountdownBanner';

interface AgendaViewProps {
  agendaTopics: AgendaTopic[];
  frentes: FrenteInfo[];
  onAddOrUpdateTopic: (topic: AgendaTopic) => void;
  onDeleteTopic: (id: string) => void;
  onOpenAddModal: () => void;
  onEditTopic: (topic: AgendaTopic) => void;
  onStartPomodoroForTopic?: (topicName: string, subject: Subject) => void;
  onResetAgenda?: () => void;
  onImportAgenda?: (topics: AgendaTopic[]) => void;
}

export const AgendaView: React.FC<AgendaViewProps> = ({
  agendaTopics,
  frentes,
  onAddOrUpdateTopic,
  onDeleteTopic,
  onOpenAddModal,
  onEditTopic,
  onStartPomodoroForTopic,
  onResetAgenda,
  onImportAgenda
}) => {
  const [viewMode, setViewMode] = useState<'gantt' | 'kanban'>('gantt');
  const [ganttScale, setGanttScale] = useState<'dia' | 'semana' | 'mes' | 'ano'>('semana');
  const [currentBaseDate, setCurrentBaseDate] = useState<Date>(new Date());
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Export schedule to JSON file
  const handleExportAgenda = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(agendaTopics, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `cronograma_ita_2027_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import schedule from JSON file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed) && onImportAgenda) {
          onImportAgenda(parsed);
          alert('Cronograma importado com sucesso!');
        } else {
          alert('Arquivo JSON inválido. O arquivo deve conter uma lista válida de assuntos.');
        }
      } catch (err) {
        alert('Erro ao processar o arquivo JSON.');
      }
    };
    reader.readAsText(file);
    if (e.target) e.target.value = '';
  };

  // Reset schedule to official ITA syllabus starting from today
  const handleResetCronograma = () => {
    if (window.confirm('Tem certeza que deseja resetar o cronograma com todos os assuntos distribuídos dia a dia a partir de HOJE até a prova do ITA 2027?')) {
      if (onResetAgenda) {
        onResetAgenda();
      }
    }
  };

  // Active dragging card for Kanban
  const [draggedTopicId, setDraggedTopicId] = useState<string | null>(null);

  // Active resizing for Gantt (top, bottom, left, right)
  const [resizingTopic, setResizingTopic] = useState<{
    id: string;
    direction: 'top' | 'bottom' | 'left' | 'right';
    startY: number;
    startX: number;
    initialStartTime: string;
    initialEndTime: string;
    initialStartDate: string;
    initialEndDate: string;
  } | null>(null);

  // Drive Preview Modal
  const [previewDriveUrl, setPreviewDriveUrl] = useState<{ url: string; name: string } | null>(null);

  // Navigation handlers for Gantt date range
  const handleGoToToday = () => {
    setCurrentBaseDate(new Date());
  };

  const handleNavigateDates = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentBaseDate);
    const step = ganttScale === 'dia' ? 1 : ganttScale === 'semana' ? 7 : ganttScale === 'mes' ? 30 : 365;
    newDate.setDate(newDate.getDate() + (direction === 'next' ? step : -step));
    setCurrentBaseDate(newDate);
  };

  // Auto-distribute remaining uncompleted topics across available days until ITA exam date (27 set 2026 for ITA 2027)
  const handleAutoDistributeTopics = () => {
    const uncompleted = agendaTopics.filter((t) => t.status !== 'concluido');
    if (uncompleted.length === 0) return;

    const startDate = new Date();
    const examDate = new Date('2026-09-27');
    const totalDaysAvailable = Math.max(1, Math.floor((examDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)));

    uncompleted.forEach((topic, idx) => {
      const dayOffset = Math.floor((idx / uncompleted.length) * totalDaysAvailable);
      const topicDate = new Date(startDate);
      topicDate.setDate(startDate.getDate() + dayOffset);
      const dateStr = topicDate.toISOString().split('T')[0];

      const startHour = idx % 2 === 0 ? '08:00' : '14:00';
      const endHour = idx % 2 === 0 ? '11:00' : '17:00';

      onAddOrUpdateTopic({
        ...topic,
        startDate: dateStr,
        endDate: dateStr,
        startTime: startHour,
        endTime: endHour
      });
    });
  };

  // Filter topics
  const filteredTopics = agendaTopics.filter((t) => {
    if (selectedSubject !== 'all' && t.subject !== selectedSubject) return false;
    if (selectedStatus !== 'all' && t.status !== selectedStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        t.topicName.toLowerCase().includes(q) ||
        t.frenteId.toLowerCase().includes(q) ||
        (t.notes && t.notes.toLowerCase().includes(q))
      );
    }
    return true;
  });

  // Kanban Columns
  const kanbanColumns: { id: AgendaStatus; title: string; color: string; badgeBg: string }[] = [
    { id: 'planejado', title: 'Planejado (A Fazer)', color: 'border-black', badgeBg: 'bg-black text-white' },
    { id: 'em_progresso', title: 'Em Progresso (Estudando)', color: 'border-[#FF6321]', badgeBg: 'bg-[#FF6321] text-black' },
    { id: 'revisao', title: 'Em Revisão', color: 'border-black', badgeBg: 'bg-[#F7F3EF] border border-black text-black' },
    { id: 'concluido', title: 'Concluído', color: 'border-emerald-600', badgeBg: 'bg-black text-emerald-400' }
  ];

  // Helper for Kanban Drag & Drop
  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('text/plain', id);
    setDraggedTopicId(id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, newStatus: AgendaStatus) => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text/plain') || draggedTopicId;
    if (!id) return;

    const topic = agendaTopics.find((t) => t.id === id);
    if (topic && topic.status !== newStatus) {
      onAddOrUpdateTopic({
        ...topic,
        status: newStatus
      });
    }
    setDraggedTopicId(null);
  };

  // Helper to parse HH:mm to minutes from midnight
  const timeToMinutes = (timeStr: string) => {
    const [h, m] = (timeStr || '08:00').split(':').map(Number);
    return h * 60 + (m || 0);
  };

  // Helper to format minutes back to HH:mm
  const minutesToTime = (totalMin: number) => {
    const clamped = Math.max(0, Math.min(23 * 60 + 59, totalMin));
    const h = Math.floor(clamped / 60);
    const m = Math.floor(clamped % 60);
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
  };

  // Gantt Timeline Dates Generation based on ganttScale & currentBaseDate
  const getGanttDates = () => {
    const dates: string[] = [];
    const base = new Date(currentBaseDate);

    if (ganttScale === 'dia') {
      dates.push(base.toISOString().split('T')[0]);
    } else if (ganttScale === 'semana') {
      for (let i = 0; i < 7; i++) {
        const d = new Date(base);
        d.setDate(base.getDate() + i);
        dates.push(d.toISOString().split('T')[0]);
      }
    } else if (ganttScale === 'mes') {
      for (let i = 0; i < 30; i++) {
        const d = new Date(base);
        d.setDate(base.getDate() + i);
        dates.push(d.toISOString().split('T')[0]);
      }
    } else if (ganttScale === 'ano') {
      for (let i = 0; i < 12; i++) {
        const d = new Date(base.getFullYear(), base.getMonth() + i, 1);
        dates.push(d.toISOString().split('T')[0]);
      }
    }
    return dates;
  };

  const ganttDates = getGanttDates();

  // Resize Handling for Gantt Hours & Days (4 Directions: top, bottom, left, right)
  const handleStartResize = (
    e: React.MouseEvent,
    topic: AgendaTopic,
    direction: 'top' | 'bottom' | 'left' | 'right'
  ) => {
    e.stopPropagation();
    e.preventDefault();
    setResizingTopic({
      id: topic.id,
      direction,
      startY: e.clientY,
      startX: e.clientX,
      initialStartTime: topic.startTime,
      initialEndTime: topic.endTime,
      initialStartDate: topic.startDate,
      initialEndDate: topic.endDate
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!resizingTopic) return;
    const topic = agendaTopics.find((t) => t.id === resizingTopic.id);
    if (!topic) return;

    if (resizingTopic.direction === 'top') {
      // Dragging UP (deltaY < 0) adjusts startTime earlier
      const deltaY = e.clientY - resizingTopic.startY;
      const addedMinutes = Math.round(deltaY / 20) * 30; // 30 min snaps
      const initialStartMin = timeToMinutes(resizingTopic.initialStartTime);
      const endMin = timeToMinutes(topic.endTime);
      const newStartMin = Math.max(0, Math.min(endMin - 30, initialStartMin + addedMinutes));
      const newStartTime = minutesToTime(newStartMin);

      if (newStartTime !== topic.startTime) {
        onAddOrUpdateTopic({
          ...topic,
          startTime: newStartTime
        });
      }
    } else if (resizingTopic.direction === 'bottom') {
      // Dragging DOWN (deltaY > 0) increases hour block (endTime later)
      const deltaY = e.clientY - resizingTopic.startY;
      const addedMinutes = Math.round(deltaY / 20) * 30;
      const initialEndMin = timeToMinutes(resizingTopic.initialEndTime);
      const startMin = timeToMinutes(topic.startTime);
      const newEndMin = Math.max(startMin + 30, Math.min(23 * 60 + 59, initialEndMin + addedMinutes));
      const newEndTime = minutesToTime(newEndMin);

      if (newEndTime !== topic.endTime) {
        onAddOrUpdateTopic({
          ...topic,
          endTime: newEndTime
        });
      }
    } else if (resizingTopic.direction === 'left') {
      // Dragging LEFT (deltaX < 0) expands startDate to previous days
      const deltaX = e.clientX - resizingTopic.startX;
      const daysAdded = Math.round(deltaX / 90);
      const initialStartDateObj = new Date(`${resizingTopic.initialStartDate}T00:00:00`);
      const endDateObj = new Date(`${topic.endDate}T00:00:00`);
      const newStartDateObj = new Date(initialStartDateObj);
      newStartDateObj.setDate(initialStartDateObj.getDate() + daysAdded);

      if (newStartDateObj <= endDateObj) {
        const newStartDateStr = newStartDateObj.toISOString().split('T')[0];
        if (newStartDateStr !== topic.startDate) {
          onAddOrUpdateTopic({
            ...topic,
            startDate: newStartDateStr
          });
        }
      }
    } else if (resizingTopic.direction === 'right') {
      // Dragging RIGHT (deltaX > 0) expands endDate to future days
      const deltaX = e.clientX - resizingTopic.startX;
      const daysAdded = Math.round(deltaX / 90);
      const initialEndDateObj = new Date(`${resizingTopic.initialEndDate}T00:00:00`);
      const startDateObj = new Date(`${topic.startDate}T00:00:00`);
      const newEndDateObj = new Date(initialEndDateObj);
      newEndDateObj.setDate(initialEndDateObj.getDate() + daysAdded);

      if (newEndDateObj >= startDateObj) {
        const newEndDateStr = newEndDateObj.toISOString().split('T')[0];
        if (newEndDateStr !== topic.endDate) {
          onAddOrUpdateTopic({
            ...topic,
            endDate: newEndDateStr
          });
        }
      }
    }
  };

  const handleMouseUp = () => {
    setResizingTopic(null);
  };

  return (
    <div 
      className="space-y-8 pb-12 select-none"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Top Banner Header */}
      <div className="bg-white p-6 sm:p-8 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-black text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-2 mb-1">
            <CalendarIcon className="w-4 h-4 text-[#FF6321]" />
            Agenda Estratégica & Rotina do ITA
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-black tracking-tight italic">
            Cronograma GANTT & Quadro KANBAN Interativo
          </h2>
          <p className="text-xs sm:text-sm text-black/80 mt-1 max-w-2xl font-sans">
            Plataforma MNAero Planner - Ferramenta aberta e gratuita desenvolvida para auxiliar vestibulandos na preparação para o vestibular do ITA.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Hidden File Input for Importing JSON */}
          <input 
            type="file" 
            ref={fileInputRef} 
            accept=".json" 
            onChange={handleFileChange} 
            className="hidden" 
          />

          {/* Add New Topic Button */}
          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#FF6321] hover:bg-black hover:text-white text-black font-mono font-bold text-xs uppercase border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer active:translate-y-0.5 active:shadow-none"
          >
            <Plus className="w-4 h-4" />
            <span>Adicionar Assunto</span>
          </button>

          {/* Import Schedule Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-2.5 bg-white hover:bg-black hover:text-white text-black font-mono font-bold text-xs uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
            title="Importar cronograma salvo em JSON"
          >
            <Upload className="w-3.5 h-3.5 text-[#FF6321]" />
            <span>Importar</span>
          </button>

          {/* Export Schedule Button */}
          <button
            onClick={handleExportAgenda}
            className="flex items-center gap-1.5 px-3 py-2.5 bg-white hover:bg-black hover:text-white text-black font-mono font-bold text-xs uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
            title="Exportar cronograma atual para arquivo JSON"
          >
            <Download className="w-3.5 h-3.5 text-[#FF6321]" />
            <span>Exportar</span>
          </button>

          {/* Reset Schedule Button */}
          <button
            onClick={handleResetCronograma}
            className="flex items-center gap-1.5 px-3 py-2.5 bg-[#F7F3EF] hover:bg-rose-600 hover:text-white text-black font-mono font-bold text-xs uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
            title="Resetar cronograma e redistribuir todo o edital ITA 2027 a partir de hoje"
          >
            <RotateCcw className="w-3.5 h-3.5 text-rose-600" />
            <span>Resetar</span>
          </button>

          {/* View Mode Switcher Toggle */}
          <div className="flex bg-[#F7F3EF] p-1 border-2 border-black font-mono text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <button
              onClick={() => setViewMode('gantt')}
              className={`flex items-center gap-1.5 px-3 py-1.5 uppercase transition-all cursor-pointer ${
                viewMode === 'gantt'
                  ? 'bg-black text-white shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]'
                  : 'text-black hover:bg-black/10'
              }`}
            >
              <CalendarIcon className="w-3.5 h-3.5 text-[#FF6321]" />
              <span>GANTT</span>
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`flex items-center gap-1.5 px-3 py-1.5 uppercase transition-all cursor-pointer ${
                viewMode === 'kanban'
                  ? 'bg-black text-white shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]'
                  : 'text-black hover:bg-black/10'
              }`}
            >
              <KanbanIcon className="w-3.5 h-3.5 text-[#FF6321]" />
              <span>KANBAN</span>
            </button>
          </div>
        </div>
      </div>

      {/* Countdown Banner */}
      <ItaCountdownBanner />

      {/* Filter and Search Toolbar */}
      <div className="bg-white border-2 border-black p-4 flex flex-wrap items-center justify-between gap-4 text-xs font-mono shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-black font-bold uppercase flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-[#FF6321]" /> Filtrar:
          </span>

          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="bg-[#F7F3EF] border border-black text-black font-bold px-3 py-1.5 focus:outline-none"
          >
            <option value="all">Todas as Matérias</option>
            <option value="Matemática">Matemática</option>
            <option value="Física">Física</option>
            <option value="Química">Química</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-[#F7F3EF] border border-black text-black font-bold px-3 py-1.5 focus:outline-none"
          >
            <option value="all">Todos os Status</option>
            <option value="planejado">Planejado</option>
            <option value="em_progresso">Em Progresso</option>
            <option value="revisao">Em Revisão</option>
            <option value="concluido">Concluído</option>
          </select>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-black absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar assunto ou resumo..."
            className="w-full bg-[#F7F3EF] border border-black pl-8 pr-3 py-1.5 text-xs text-black focus:outline-none placeholder:text-black/50"
          />
        </div>
      </div>

      {/* ==================== VIEW 1: GANTT & HOURLY SCHEDULE ==================== */}
      {viewMode === 'gantt' && (
        <div className="space-y-6">
          <div className="bg-white border-2 border-black p-4 sm:p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b-2 border-black pb-3 gap-2">
              <div>
                <h3 className="text-sm sm:text-base font-bold font-mono text-black uppercase flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-[#FF6321]" />
                  📅 CRONOGRAMA GANTT INTERATIVO (ARRASTE AS EXTREMIDADES PARA EXPANDIR HORAS E DATAS)
                </h3>
                <p className="text-[11px] font-mono text-black/80 mt-1 font-semibold">
                  ↔ Arraste a extremidade direita para expandir dias futuros &nbsp;|&nbsp; ↕ Arraste a extremidade inferior para aumentar o bloco de horas
                </p>
              </div>

              <span className="text-xs font-mono font-black bg-black text-[#FF6321] px-3 py-1 uppercase border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] shrink-0">
                {filteredTopics.length} ASSUNTOS LISTADOS
              </span>
            </div>

            {/* Gantt Scale & Date Navigation Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-[#F7F3EF] p-3 border-2 border-black font-mono text-xs">
              {/* Scale Selector */}
              <div className="flex items-center gap-2">
                <span className="font-bold text-black uppercase text-[10px] tracking-wider">Escala:</span>
                <div className="flex bg-white border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                  {(['dia', 'semana', 'mes', 'ano'] as const).map((scale) => (
                    <button
                      key={scale}
                      onClick={() => setGanttScale(scale)}
                      className={`px-3 py-1 font-bold uppercase transition-all cursor-pointer ${
                        ganttScale === scale
                          ? 'bg-black text-[#FF6321]'
                          : 'text-black hover:bg-black/10'
                      }`}
                    >
                      {scale === 'dia' ? 'Dia' : scale === 'semana' ? 'Semana' : scale === 'mes' ? 'Mês' : 'Ano'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleNavigateDates('prev')}
                  className="flex items-center gap-1 bg-white hover:bg-black hover:text-white px-3 py-1 border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] font-bold cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Anterior</span>
                </button>

                <button
                  onClick={handleGoToToday}
                  className="bg-[#FF6321] hover:bg-black hover:text-white text-black font-bold px-3 py-1 border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
                >
                  🎯 HOJE
                </button>

                <button
                  onClick={() => handleNavigateDates('next')}
                  className="flex items-center gap-1 bg-white hover:bg-black hover:text-white px-3 py-1 border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] font-bold cursor-pointer"
                >
                  <span>Próximo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Auto Distribute Syllabus Button */}
              <button
                onClick={handleAutoDistributeTopics}
                className="flex items-center gap-1.5 bg-black hover:bg-[#FF6321] text-[#FF6321] hover:text-black font-bold px-3 py-1.5 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-pointer uppercase transition-all"
                title="Distribui os assuntos pendentes até a data da 1ª Fase do ITA 2027 (27/09/2026)"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Distribuir Edital Até ITA 2027</span>
              </button>
            </div>

            {/* Gantt Matrix Container */}
            <div className="overflow-x-auto">
              <div className="min-w-[950px] border-2 border-black bg-[#F7F3EF]">
                {/* Header Row: Dates */}
                <div 
                  style={{ 
                    display: 'grid', 
                    gridTemplateColumns: `240px repeat(${ganttDates.length}, minmax(130px, 1fr))` 
                  }}
                  className="border-b-2 border-black bg-black text-white font-mono text-xs text-center font-bold"
                >
                  <div className="p-3 border-r border-white/30 text-left pl-4 uppercase font-black text-[#FF6321]">
                    ASSUNTO / FRENTE
                  </div>
                  {ganttDates.map((dateStr) => {
                    const dateObj = new Date(`${dateStr}T00:00:00`);
                    const dayName = dateObj.toLocaleDateString('pt-BR', { weekday: 'short' });
                    const dayNum = dateObj.getDate();
                    const monthName = dateObj.toLocaleDateString('pt-BR', { month: 'short' });
                    const isToday = dateStr === new Date().toISOString().split('T')[0];

                    return (
                      <div
                        key={dateStr}
                        className={`p-2 border-r border-white/20 flex flex-col items-center justify-center ${
                          isToday ? 'bg-[#FF6321] text-black font-extrabold' : ''
                        }`}
                      >
                        <span className="text-[10px] uppercase font-bold">{dayName}</span>
                        <span className="text-sm font-black">{dayNum} {monthName}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Rows per Topic */}
                {filteredTopics.length === 0 ? (
                  <div className="p-8 text-center text-xs font-mono text-black/70">
                    Nenhum assunto encontrado no cronograma. Clique em "+ Adicionar Novo Assunto".
                  </div>
                ) : (
                  filteredTopics.map((topic) => {
                    const startMin = timeToMinutes(topic.startTime);
                    const endMin = timeToMinutes(topic.endTime);
                    const durationHours = ((endMin - startMin) / 60).toFixed(1);

                    const boxHeight = Math.max(90, Math.min(240, Math.round((endMin - startMin) * 0.85)));
                    const colorConfig = getSubjectColorConfig(topic.subject, false);

                    return (
                      <div
                        key={topic.id}
                        style={{ 
                          display: 'grid', 
                          gridTemplateColumns: `240px repeat(${ganttDates.length}, minmax(130px, 1fr))` 
                        }}
                        className="border-b border-black/30 bg-white items-stretch hover:bg-[#F7F3EF]/50 transition-colors"
                      >
                        {/* Topic Meta Info Column */}
                        <div className="p-3 border-r-2 border-black font-mono space-y-1.5 flex flex-col justify-between bg-[#F7F3EF]/30">
                          <div className="space-y-1">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span 
                                style={{ backgroundColor: colorConfig.primary, color: colorConfig.badgeText }}
                                className="text-[10px] font-black px-2 py-0.5 border border-black uppercase shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                              >
                                {topic.frenteId} {topic.subject.toUpperCase()}
                              </span>
                            </div>

                            <h4 className="font-serif font-bold text-black text-xs italic line-clamp-2 leading-tight">
                              {topic.topicName}
                            </h4>

                            <div className="flex items-center gap-1 text-[10px] font-bold text-black/80 pt-0.5">
                              <Clock className="w-3 h-3 text-[#FF6321]" />
                              <span>{topic.startTime} - {topic.endTime} ({durationHours}h)</span>
                            </div>
                          </div>

                          {/* Google Drive Link Badge */}
                          <div className="pt-1">
                            <button
                              onClick={() => {
                                if (topic.driveAttachmentUrl) {
                                  setPreviewDriveUrl({
                                    url: topic.driveAttachmentUrl,
                                    name: topic.driveAttachmentName || 'Resumo Drive'
                                  });
                                } else {
                                  setPreviewDriveUrl({
                                    url: 'https://drive.google.com',
                                    name: `Drive - ${topic.topicName}`
                                  });
                                }
                              }}
                              className="w-full flex items-center justify-center gap-1 text-[10px] bg-black text-white hover:bg-[#FF6321] hover:text-black px-2 py-1 border border-black font-bold uppercase transition-all cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                            >
                              <HardDrive className="w-3 h-3 text-[#FF6321] group-hover:text-black" />
                              <span>🖴 RESUMO DRIVE</span>
                            </button>
                          </div>
                        </div>

                        {/* 7 Days Timeline Bars */}
                        {ganttDates.map((dateStr) => {
                          const isStart = dateStr === topic.startDate;
                          const isEnd = dateStr === topic.endDate;
                          const inRange = dateStr >= topic.startDate && dateStr <= topic.endDate;

                          return (
                            <div
                              key={dateStr}
                              className="p-1.5 border-r border-black/20 h-full flex items-center justify-center relative min-h-[100px]"
                            >
                              {inRange && (
                                <div
                                  style={{ 
                                    height: `${boxHeight}px`,
                                    backgroundColor: topic.status === 'concluido' ? '#18181B' : colorConfig.bgLight
                                  }}
                                  className={`w-full p-2 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] relative group flex flex-col justify-between transition-all ${
                                    topic.status === 'concluido' ? 'text-white' : 'text-black'
                                  }`}
                                >
                                  {/* ALÇA SUPERIOR (↑): Ajusta o horário de início para mais cedo */}
                                  <div
                                    onMouseDown={(e) => handleStartResize(e, topic, 'top')}
                                    className="absolute top-0 left-0 right-0 h-3 bg-black hover:bg-[#FF6321] cursor-ns-resize flex items-center justify-center text-white border-b border-black group/top z-10 transition-colors"
                                    title="↑ Arraste para cima para adiantar o horário de início"
                                  >
                                    <span className="text-[9px] font-mono leading-none font-extrabold group-hover/top:text-black">↑</span>
                                  </div>

                                  {/* ALÇA ESQUERDA (←): Expande a data inicial para dias anteriores */}
                                  {isStart && (
                                    <div
                                      onMouseDown={(e) => handleStartResize(e, topic, 'left')}
                                      className="absolute left-0 top-3 bottom-3 w-3 bg-black hover:bg-[#FF6321] cursor-ew-resize flex items-center justify-center text-white border-r border-black group/left z-10 transition-colors"
                                      title="← Arraste para a esquerda para expandir a data para dias anteriores"
                                    >
                                      <span className="text-[9px] font-mono leading-none font-extrabold group-hover/left:text-black">←</span>
                                    </div>
                                  )}

                                  {/* ALÇA DIREITA (→): Expande a data final para dias futuros */}
                                  {isEnd && (
                                    <div
                                      onMouseDown={(e) => handleStartResize(e, topic, 'right')}
                                      className="absolute right-0 top-3 bottom-3 w-3 bg-black hover:bg-[#FF6321] cursor-ew-resize flex items-center justify-center text-white border-l border-black group/right z-10 transition-colors"
                                      title="→ Arraste para a direita para expandir a data para dias futuros"
                                    >
                                      <span className="text-[9px] font-mono leading-none font-extrabold group-hover/right:text-black">→</span>
                                    </div>
                                  )}

                                  {/* ALÇA INFERIOR (↓): Aumenta o bloco de horas (término mais tarde) */}
                                  <div
                                    onMouseDown={(e) => handleStartResize(e, topic, 'bottom')}
                                    className="absolute bottom-0 left-0 right-0 h-3 bg-black hover:bg-[#FF6321] cursor-ns-resize flex items-center justify-center text-white border-t border-black group/bottom z-10 transition-colors"
                                    title="↓ Arraste para baixo para aumentar o bloco de horas"
                                  >
                                    <span className="text-[9px] font-mono leading-none font-extrabold group-hover/bottom:text-black">↓</span>
                                  </div>

                                  {/* Content inside Gantt box */}
                                  <div className="space-y-1 font-mono pt-2 px-1">
                                    <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-tight">
                                      <span className="bg-black text-white px-1 py-0.2">
                                        {topic.startTime}-{topic.endTime}
                                      </span>
                                      <span className="font-extrabold bg-[#FF6321] text-black px-1">
                                        {durationHours}H
                                      </span>
                                    </div>
                                    <p className="text-[10px] font-bold line-clamp-2 leading-tight italic">
                                      {topic.topicName}
                                    </p>
                                  </div>

                                  {/* Quick Action Controls on Footer */}
                                  <div className="flex items-center justify-between pt-1 border-t border-black/30 text-[9px] pb-2 px-1">
                                    <div className="flex items-center gap-1">
                                      <button
                                        onClick={() => onEditTopic(topic)}
                                        className="p-1 bg-white text-black hover:bg-black hover:text-white border border-black cursor-pointer shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                                        title="Editar assunto [✏️]"
                                      >
                                        <Edit3 className="w-2.5 h-2.5" />
                                      </button>
                                      {onStartPomodoroForTopic && (
                                        <button
                                          onClick={() => onStartPomodoroForTopic(topic.topicName, topic.subject)}
                                          className="p-1 bg-black text-white hover:bg-[#FF6321] hover:text-black border border-black cursor-pointer shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                                          title="Iniciar Pomodoro [⏱️]"
                                        >
                                          <Clock className="w-2.5 h-2.5" />
                                        </button>
                                      )}
                                    </div>

                                    <button
                                      onClick={() => onDeleteTopic(topic.id)}
                                      className="p-1 bg-white text-rose-600 hover:bg-rose-600 hover:text-white border border-black cursor-pointer shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                                      title="Excluir [🗑️]"
                                    >
                                      <Trash2 className="w-2.5 h-2.5" />
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== VIEW 2: KANBAN BOARD ==================== */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-mono">
          {kanbanColumns.map((col) => {
            const colTopics = filteredTopics.filter((t) => t.status === col.id);

            return (
              <div
                key={col.id}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, col.id)}
                className={`bg-white border-2 border-black p-4 space-y-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] min-h-[500px] flex flex-col justify-between`}
              >
                <div>
                  {/* Column Header */}
                  <div className="flex items-center justify-between border-b-2 border-black pb-3 mb-4">
                    <span className="font-bold text-xs uppercase text-black">
                      {col.title}
                    </span>
                    <span className={`px-2 py-0.5 text-xs font-bold ${col.badgeBg} border border-black`}>
                      {colTopics.length}
                    </span>
                  </div>

                  {/* Cards Container */}
                  <div className="space-y-3">
                    {colTopics.length === 0 ? (
                      <div className="border-2 border-dashed border-black/30 p-6 text-center text-xs text-black/50 bg-[#F7F3EF]">
                        Arraste cartões para cá ou adicione novos assuntos.
                      </div>
                    ) : (
                      colTopics.map((topic) => (
                        <div
                          key={topic.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, topic.id)}
                          className="bg-[#F7F3EF] border-2 border-black p-4 space-y-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all cursor-grab active:cursor-grabbing group relative"
                        >
                          {/* Subject & Frente */}
                          <div className="flex items-center justify-between text-[10px] font-bold">
                            <span className="bg-black text-white px-2 py-0.5 border border-black uppercase">
                              {topic.subject} ({topic.frenteId})
                            </span>
                            <span className="text-black/70 uppercase">
                              {topic.stage || '1-aula'}
                            </span>
                          </div>

                          {/* Topic Title */}
                          <h4 className="font-serif font-black text-black text-sm italic leading-snug">
                            {topic.topicName}
                          </h4>

                          {/* Dates & Hours */}
                          <div className="space-y-1 text-[11px] text-black/80 font-mono bg-white p-2 border border-black">
                            <div className="flex items-center gap-1.5">
                              <CalendarIcon className="w-3.5 h-3.5 text-[#FF6321]" />
                              <span>{topic.startDate} até {topic.endDate}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-[#FF6321]" />
                              <span>{topic.startTime} - {topic.endTime}</span>
                            </div>
                          </div>

                          {/* Google Drive Summary Link */}
                          {topic.driveAttachmentUrl && (
                            <div className="pt-1">
                              <button
                                onClick={() =>
                                  setPreviewDriveUrl({
                                    url: topic.driveAttachmentUrl!,
                                    name: topic.driveAttachmentName || 'Resumo Drive'
                                  })
                                }
                                className="w-full bg-black hover:bg-[#FF6321] hover:text-black text-white p-2 border border-black flex items-center justify-center gap-2 text-xs font-bold uppercase transition-all cursor-pointer"
                              >
                                <HardDrive className="w-3.5 h-3.5" />
                                <span className="truncate">{topic.driveAttachmentName || 'Ver Resumo no Drive'}</span>
                              </button>
                            </div>
                          )}

                          {/* Notes */}
                          {topic.notes && (
                            <p className="text-[10px] text-black/70 italic line-clamp-2 border-t border-black/20 pt-1">
                              "{topic.notes}"
                            </p>
                          )}

                          {/* Card Footer Actions */}
                          <div className="flex items-center justify-between pt-2 border-t border-black/20 text-xs">
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => onEditTopic(topic)}
                                className="p-1 bg-white hover:bg-black hover:text-white border border-black cursor-pointer"
                                title="Editar"
                              >
                                <Edit3 className="w-3 h-3" />
                              </button>
                              {onStartPomodoroForTopic && (
                                <button
                                  onClick={() => onStartPomodoroForTopic(topic.topicName, topic.subject)}
                                  className="p-1 bg-[#FF6321] text-black hover:bg-black hover:text-white border border-black cursor-pointer"
                                  title="Iniciar Pomodoro"
                                >
                                  <Clock className="w-3 h-3" />
                                </button>
                              )}
                            </div>

                            <button
                              onClick={() => onDeleteTopic(topic.id)}
                              className="p-1 text-rose-600 hover:bg-rose-600 hover:text-white border border-black cursor-pointer"
                              title="Excluir"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Quick Add in column */}
                <button
                  onClick={onOpenAddModal}
                  className="w-full py-2 bg-[#F7F3EF] hover:bg-black hover:text-white border-2 border-dashed border-black font-bold text-xs uppercase flex items-center justify-center gap-2 cursor-pointer transition-all mt-4"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Novo Assunto</span>
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Google Drive Preview Modal */}
      {previewDriveUrl && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border-2 border-black max-w-2xl w-full p-6 space-y-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] font-mono">
            <div className="flex items-center justify-between border-b-2 border-black pb-3">
              <div className="flex items-center gap-2">
                <HardDrive className="w-5 h-5 text-[#FF6321]" />
                <h3 className="font-bold text-black text-sm uppercase truncate">
                  {previewDriveUrl.name}
                </h3>
              </div>
              <button
                onClick={() => setPreviewDriveUrl(null)}
                className="text-black hover:bg-black hover:text-white border border-black p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-6 bg-[#F7F3EF] border-2 border-black text-center space-y-4">
              <FileText className="w-12 h-12 text-[#FF6321] mx-auto" />
              <div>
                <p className="font-bold text-black text-sm">Resumo Anetado no Google Drive</p>
                <p className="text-xs text-black/70 mt-1 break-all max-w-md mx-auto font-mono">
                  {previewDriveUrl.url}
                </p>
              </div>

              <a
                href={previewDriveUrl.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-[#FF6321] hover:text-black border-2 border-black font-bold uppercase text-xs shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
              >
                <span>Abrir no Google Drive</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setPreviewDriveUrl(null)}
                className="px-4 py-2 bg-white text-black border border-black hover:bg-black hover:text-white font-bold text-xs uppercase cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
