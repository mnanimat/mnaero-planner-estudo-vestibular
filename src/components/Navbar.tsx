import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Calendar as CalendarIcon, 
  BarChart3, 
  RotateCcw, 
  Layers, 
  Clock, 
  Zap, 
  Youtube, 
  FileText, 
  Bot, 
  Flame, 
  CheckCircle2,
  PenTool,
  Palette,
  BookPlus,
  Award,
  User,
  ShieldCheck,
  BookOpenCheck,
  TrendingUp,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { ThemeMode, UserProfile } from '../types';
import { THEMES } from '../utils/theme';
import { ItaCountdownBanner } from './ItaCountdownBanner';

export type TabType = 
  | 'dashboard' 
  | 'agenda' 
  | 'programa'
  | 'tabelas'
  | 'simulados'
  | 'redacao' 
  | 'cycle' 
  | 'stages' 
  | 'pomodoro' 
  | 'flashcards' 
  | 'summaries' 
  | 'videos' 
  | 'analytics';

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  streakDays: number;
  todayHours: number;
  dueFlashcardsCount: number;
  isTimerRunning: boolean;
  activeTimerTopic: string | null;
  currentTheme: ThemeMode;
  onSelectTheme: (theme: ThemeMode) => void;
  onOpenCustomSubjectModal: () => void;
  onOpenPhaseGuide?: () => void;
  currentUserProfile: UserProfile | null;
  onOpenLoginModal: () => void;
  onOpenLicenseTerms: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  streakDays,
  todayHours,
  dueFlashcardsCount,
  isTimerRunning,
  activeTimerTopic,
  currentTheme,
  onSelectTheme,
  onOpenCustomSubjectModal,
  onOpenPhaseGuide,
  currentUserProfile,
  onOpenLoginModal,
  onOpenLicenseTerms
}) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    const saved = localStorage.getItem('mnaero_header_collapsed');
    return saved ? JSON.parse(saved) : false;
  });

  const toggleCollapse = () => {
    setIsCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem('mnaero_header_collapsed', JSON.stringify(next));
      return next;
    });
  };

  const navItems = [
    { id: 'dashboard', label: 'Visão Geral', icon: LayoutDashboard },
    { id: 'programa', label: 'Programa ITA', icon: BookOpenCheck, badge: 'EDITAL' },
    { id: 'tabelas', label: 'Estatísticas ITA', icon: TrendingUp, badge: 'INCIDÊNCIA' },
    { id: 'agenda', label: 'Agenda & Gantt', icon: CalendarIcon },
    { id: 'simulados', label: 'Provas Antigas ITA', icon: Award, badge: 'PROVAS' },
    { id: 'redacao', label: 'Redação ITA', icon: PenTool, badge: 'NOVO' },
    { id: 'cycle', label: 'Ciclo de Estudos', icon: RotateCcw },
    { id: 'stages', label: '7 Etapas', icon: Layers },
    { id: 'pomodoro', label: 'Pomodoro', icon: Clock, badge: isTimerRunning ? 'Ativo' : undefined },
    { id: 'flashcards', label: 'Flashcards SRS', icon: Zap, badge: dueFlashcardsCount > 0 ? `${dueFlashcardsCount}` : undefined },
    { id: 'summaries', label: 'Resumos ITA', icon: FileText },
    { id: 'videos', label: 'Videoaulas', icon: Youtube },
    { id: 'analytics', label: 'Análises', icon: BarChart3 },
  ];

  return (
    <header className="bg-[#F7F3EF] border-b-2 border-black text-[#1A1A1A] sticky top-0 z-40 shadow-sm transition-all duration-200">
      {/* Disclaimer Legal Banner (Hidden when collapsed) */}
      {!isCollapsed && (
        <div className="bg-amber-300 text-black border-b border-black py-1 px-4 text-[10px] sm:text-xs font-mono font-bold text-center flex items-center justify-center gap-1.5 shadow-inner">
          <ShieldCheck className="w-3.5 h-3.5 text-black shrink-0" />
          <span>
            A plataforma MNAero Planner não tem vínculo com o Instituto Tecnológico de Aeronáutica (ITA) e respeita o uso do seu nome dentro da lei.
          </span>
        </div>
      )}

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isCollapsed ? 'py-1.5' : 'pt-3 pb-2'}`}>
        {/* Top Header Row */}
        {!isCollapsed ? (
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-black/20 pb-3 mb-3 gap-4">
            {/* Brand Title */}
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-black/60 mb-0.5">
                Preparatório para o vestibular do ITA.
              </p>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-serif font-black tracking-tighter leading-none italic uppercase text-[#1A1A1A]">
                  MNAero Planner <span className="text-[#FF6321] font-sans not-italic font-extrabold text-xl sm:text-2xl">// ITA 2027</span>
                </h1>
                <span className="bg-black text-white px-2 py-0.5 text-[9px] font-mono uppercase font-bold tracking-widest">
                  Estratégico
                </span>
              </div>

              {/* Countdown Badge Row */}
              <div className="mt-2">
                <ItaCountdownBanner compact={true} />
              </div>
            </div>

            {/* Quick Metrics & User Account Controls */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {/* User Profile Login Pill */}
              <button
                onClick={onOpenLoginModal}
                className="flex items-center gap-1.5 bg-white text-black hover:bg-black hover:text-white px-3 py-1.5 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-xs font-mono font-bold transition-all cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-[#FF6321]" />
                <span className="truncate max-w-[120px]">
                  {currentUserProfile ? currentUserProfile.name.split(' ')[0] : 'Entrar / Conta'}
                </span>
              </button>

              {/* License & Terms Link */}
              <button
                onClick={onOpenLicenseTerms}
                className="flex items-center gap-1 bg-white text-black hover:bg-[#FF6321] px-2.5 py-1.5 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-xs font-mono font-bold cursor-pointer"
                title="Licença MIT e Termos de Uso"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Licença MIT</span>
              </button>

              {/* Streak */}
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-xs font-mono">
                <Flame className="w-4 h-4 text-[#FF6321] fill-[#FF6321]" />
                <span className="text-black/60 font-sans uppercase text-[10px] font-bold">Ofensiva:</span>
                <span className="font-bold text-black">{streakDays}d</span>
              </div>

              {/* Today's Study Hours */}
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-xs font-mono">
                <CheckCircle2 className="w-4 h-4 text-black" />
                <span className="text-black/60 font-sans uppercase text-[10px] font-bold">Hoje:</span>
                <span className="font-bold text-black">{todayHours.toFixed(1)}h</span>
              </div>

              {/* Theme Selector */}
              <div className="flex items-center gap-1 bg-white px-2 py-1 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-xs font-mono">
                <Palette className="w-3.5 h-3.5 text-[#FF6321]" />
                <select
                  value={currentTheme}
                  onChange={(e) => onSelectTheme(e.target.value as ThemeMode)}
                  className="bg-transparent font-bold text-xs uppercase text-black focus:outline-none cursor-pointer"
                >
                  {Object.values(THEMES).map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Collapse Header Toggle Button */}
              <button
                onClick={toggleCollapse}
                className="flex items-center gap-1.5 bg-black text-white hover:bg-[#FF6321] hover:text-black px-2.5 py-1.5 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-xs font-mono font-bold transition-all cursor-pointer"
                title="Encolher o cabeçalho para expandir a área de trabalho"
              >
                <Minimize2 className="w-3.5 h-3.5 text-[#FF6321] group-hover:text-black" />
                <span className="hidden sm:inline">Encolher</span>
              </button>
            </div>
          </div>
        ) : (
          /* Compact Collapsed Header Row */
          <div className="flex items-center justify-between border-b border-black/20 pb-1.5 mb-1.5 gap-2">
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-serif font-black italic uppercase text-[#1A1A1A] leading-none">
                MNAero Planner <span className="text-[#FF6321] font-sans not-italic font-bold text-xs sm:text-sm">// ITA 2027</span>
              </h1>
              <span className="hidden md:inline-block bg-black text-white px-1.5 py-0.2 text-[8px] font-mono uppercase font-bold">
                Estratégico
              </span>
            </div>

            <div className="flex items-center gap-2">
              {/* Compact Streak */}
              <div className="flex items-center gap-1 bg-white px-2 py-1 border border-black text-[11px] font-mono shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                <Flame className="w-3 h-3 text-[#FF6321] fill-[#FF6321]" />
                <span className="font-bold text-black">{streakDays}d</span>
              </div>

              {/* Compact Today Hours */}
              <div className="flex items-center gap-1 bg-white px-2 py-1 border border-black text-[11px] font-mono shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                <CheckCircle2 className="w-3 h-3 text-black" />
                <span className="font-bold text-black">{todayHours.toFixed(1)}h</span>
              </div>

              {/* Compact Account */}
              <button
                onClick={onOpenLoginModal}
                className="flex items-center gap-1 bg-white text-black hover:bg-black hover:text-white px-2 py-1 border border-black text-[11px] font-mono font-bold shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
              >
                <User className="w-3 h-3 text-[#FF6321]" />
                <span className="hidden sm:inline truncate max-w-[80px]">
                  {currentUserProfile ? currentUserProfile.name.split(' ')[0] : 'Conta'}
                </span>
              </button>

              {/* Expand Header Button */}
              <button
                onClick={toggleCollapse}
                className="flex items-center gap-1 bg-[#FF6321] text-black hover:bg-black hover:text-white px-2.5 py-1 border border-black text-xs font-mono font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                title="Expandir o cabeçalho completo"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="font-bold text-[11px]">Expandir Header</span>
              </button>
            </div>
          </div>
        )}

        {/* Navigation Tabs Bar */}
        <nav className="flex overflow-x-auto no-scrollbar gap-1 sm:gap-2 pt-1 pb-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as TabType)}
                className={`flex items-center gap-2 px-3 py-1.5 border text-xs uppercase font-bold tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-black text-white border-black shadow-[2px_2px_0px_0px_rgba(255,99,33,1)] font-extrabold'
                    : 'bg-white text-black border-black/30 hover:border-black hover:bg-black/5'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#FF6321]' : 'text-black/60'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`ml-1 px-1.5 py-0.2 text-[9px] font-mono font-bold ${
                      item.id === 'pomodoro'
                        ? 'bg-[#FF6321] text-black border border-black'
                        : 'bg-black text-white'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

