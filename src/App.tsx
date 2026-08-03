/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar, TabType } from './components/Navbar';
import { OverviewDashboard } from './components/OverviewDashboard';
import { AgendaView } from './components/AgendaView';
import { SimuladosView } from './components/SimuladosView';
import { AddTopicModal } from './components/AddTopicModal';
import { StudyCycleView } from './components/StudyCycleView';
import { SevenStagesView } from './components/SevenStagesView';
import { PomodoroTimer } from './components/PomodoroTimer';
import { FlashcardsView } from './components/FlashcardsView';
import { SummariesView } from './components/SummariesView';
import { VideoLessonsView } from './components/VideoLessonsView';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { RedacaoItaView } from './components/RedacaoItaView';
import { CustomSubjectModal } from './components/CustomSubjectModal';
import { PhaseGuideModal } from './components/PhaseGuideModal';
import { LoginAndTermsModal } from './components/LoginAndTermsModal';
import { LicenseAndTermsModal } from './components/LicenseAndTermsModal';

import { 
  INITIAL_FRENTES, 
  EXAM_TOPICS_DATA, 
  INITIAL_SUMMARIES, 
  INITIAL_FLASHCARDS, 
  INITIAL_VIDEOS,
  INITIAL_AGENDA_TOPICS,
  generateFullSyllabusAgenda
} from './data/itaData';

import { 
  StudyCycleConfig, 
  TopicProgress, 
  Flashcard, 
  StudyLog, 
  DidacticSummary, 
  VideoLesson,
  AgendaTopic,
  Subject,
  CustomSubject,
  FrenteInfo,
  ThemeMode,
  UserProfile
} from './types';
import { THEMES } from './utils/theme';

export default function App() {
  // Theme Mode State
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('ita_theme_mode');
    return (saved as ThemeMode) || 'editorial';
  });

  // User Profile State
  const [currentUserProfile, setCurrentUserProfile] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('mnaero_user_profile');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false);

  // Custom Subjects State
  const [customSubjects, setCustomSubjects] = useState<CustomSubject[]>(() => {
    const saved = localStorage.getItem('ita_custom_subjects');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      { id: 'sub-red', name: 'Redação', color: '#FF6321', description: 'Redação Dissertativa ITA' },
      { id: 'sub-port', name: 'Português', color: '#3B82F6', description: 'Gramática e Literatura' }
    ];
  });

  // Frentes List (Initial + Custom)
  const [allFrentes, setAllFrentes] = useState<FrenteInfo[]>(() => {
    const saved = localStorage.getItem('ita_custom_frentes');
    if (saved) {
      try {
        const extra = JSON.parse(saved);
        return [...INITIAL_FRENTES, ...extra];
      } catch (e) {}
    }
    return INITIAL_FRENTES;
  });

  const [isCustomSubjectModalOpen, setIsCustomSubjectModalOpen] = useState(false);
  const [isPhaseGuideOpen, setIsPhaseGuideOpen] = useState(false);

  // Default to 'dashboard' as requested by the user
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  // Agenda Topics State
  const [agendaTopics, setAgendaTopics] = useState<AgendaTopic[]>(() => {
    const saved = localStorage.getItem('ita_agenda_topics');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_AGENDA_TOPICS;
  });

  // Modal State for Adding/Editing Topic
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTopic, setEditingTopic] = useState<AgendaTopic | null>(null);

  // Study Cycle Config State
  const [cycleConfig, setCycleConfig] = useState<StudyCycleConfig>(() => {
    const saved = localStorage.getItem('ita_cycle_config');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      weeklyHours: 36,
      blockMinutes: 60,
      difficulties: {
        'MAT-1': 6,
        'MAT-2': 6,
        'MAT-3': 4,
        'MAT-4': 10,
        'FÍS-1': 6,
        'FÍS-2': 8,
        'FÍS-3': 6,
        'FÍS-4': 8,
        'FÍS-5': 10,
        'QUÍ-1': 2,
        'QUÍ-2': 2,
        'QUÍ-3': 8,
        'QUÍ-4': 6,
        'QUÍ-5': 6,
      },
    };
  });

  // Completed Cycle Blocks State
  const [completedBlocks, setCompletedBlocks] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('ita_completed_blocks');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return { 'MAT-4': 2, 'FÍS-1': 1, 'QUÍ-3': 1 };
  });

  // Topic Progress State (7 Stages)
  const [topicProgressMap, setTopicProgressMap] = useState<Record<string, TopicProgress>>(() => {
    const saved = localStorage.getItem('ita_topic_progress');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {};
  });

  // Flashcards State
  const [flashcards, setFlashcards] = useState<Flashcard[]>(() => {
    const saved = localStorage.getItem('ita_flashcards');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_FLASHCARDS;
  });

  // Study Logs State
  const [studyLogs, setStudyLogs] = useState<StudyLog[]>(() => {
    const saved = localStorage.getItem('ita_study_logs');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      {
        id: 'log-1',
        timestamp: new Date().toISOString(),
        subject: 'Matemática',
        frenteId: 'MAT-2',
        topic: 'Números complexos (formas algébrica e trigonométrica)',
        stage: '4-questoes',
        durationMinutes: 50,
        notes: 'Resoluções da 1ª Fase do ITA 2022.',
      },
      {
        id: 'log-2',
        timestamp: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
        subject: 'Física',
        frenteId: 'FÍS-1',
        topic: 'Trabalho e energia mecânica, quantidade de movimento, impulso',
        stage: '1-aula',
        durationMinutes: 60,
        notes: 'Assistida videoaula de colisões oblíquas.',
      },
    ];
  });

  // AI Modal State
  const [aiPrompt, setAIPrompt] = useState('');
  const [aiContext, setAIContext] = useState('');

  // Timer Active Status
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [activeTimerTopic, setActiveTimerTopic] = useState<string | null>(null);

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('ita_theme_mode', themeMode);
  }, [themeMode]);

  useEffect(() => {
    localStorage.setItem('ita_custom_subjects', JSON.stringify(customSubjects));
  }, [customSubjects]);

  useEffect(() => {
    localStorage.setItem('ita_agenda_topics', JSON.stringify(agendaTopics));
  }, [agendaTopics]);

  useEffect(() => {
    localStorage.setItem('ita_cycle_config', JSON.stringify(cycleConfig));
  }, [cycleConfig]);

  useEffect(() => {
    localStorage.setItem('ita_completed_blocks', JSON.stringify(completedBlocks));
  }, [completedBlocks]);

  useEffect(() => {
    localStorage.setItem('ita_topic_progress', JSON.stringify(topicProgressMap));
  }, [topicProgressMap]);

  useEffect(() => {
    localStorage.setItem('ita_flashcards', JSON.stringify(flashcards));
  }, [flashcards]);

  useEffect(() => {
    localStorage.setItem('ita_study_logs', JSON.stringify(studyLogs));
  }, [studyLogs]);

  // Handlers for Custom Subjects & Frentes
  const handleAddCustomSubject = (subject: CustomSubject) => {
    setCustomSubjects((prev) => [...prev, subject]);
  };

  const handleDeleteCustomSubject = (id: string) => {
    setCustomSubjects((prev) => prev.filter((s) => s.id !== id));
  };

  const handleAddCustomFrente = (frente: FrenteInfo) => {
    setAllFrentes((prev) => [...prev, frente]);
    const customFrentes = [...allFrentes, frente].filter(
      (f) => !INITIAL_FRENTES.some((initF) => initF.id === f.id)
    );
    localStorage.setItem('ita_custom_frentes', JSON.stringify(customFrentes));
  };

  // Handlers for Agenda Topics
  const handleAddOrUpdateAgendaTopic = (topic: AgendaTopic) => {
    setAgendaTopics((prev) => {
      const exists = prev.some((t) => t.id === topic.id);
      if (exists) {
        return prev.map((t) => (t.id === topic.id ? topic : t));
      } else {
        return [topic, ...prev];
      }
    });
    setEditingTopic(null);
  };

  const handleResetAgenda = () => {
    const freshTopics = generateFullSyllabusAgenda(new Date());
    setAgendaTopics(freshTopics);
  };

  const handleImportAgenda = (importedTopics: AgendaTopic[]) => {
    setAgendaTopics(importedTopics);
  };

  const handleDeleteAgendaTopic = (id: string) => {
    if (confirm('Deseja excluir este assunto da agenda?')) {
      setAgendaTopics((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const handleOpenAddModal = () => {
    setEditingTopic(null);
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (topic: AgendaTopic) => {
    setEditingTopic(topic);
    setIsAddModalOpen(true);
  };

  const handleToggleBlock = (frenteId: string, blockIndex: number) => {
    const currentCount = completedBlocks[frenteId] || 0;
    const newCount = blockIndex < currentCount ? blockIndex : blockIndex + 1;
    setCompletedBlocks({
      ...completedBlocks,
      [frenteId]: newCount,
    });
  };

  const handleResetCycleProgress = () => {
    if (confirm('Deseja zerar a contagem de blocos do ciclo atual?')) {
      setCompletedBlocks({});
    }
  };

  const handleUpdateTopicProgress = (key: string, progress: TopicProgress) => {
    setTopicProgressMap((prev) => ({
      ...prev,
      [key]: progress,
    }));
  };

  const handleAddStudyLog = (logData: Omit<StudyLog, 'id' | 'timestamp'>) => {
    const newLog: StudyLog = {
      ...logData,
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    setStudyLogs((prev) => [newLog, ...prev]);
  };


  const handleStartPomodoroForTopic = (topicName: string, subject: Subject) => {
    setActiveTab('pomodoro');
  };

  const handleStartPomodoroForVideo = (video: VideoLesson) => {
    setActiveTab('pomodoro');
  };

  // Calculated stats for Navbar
  const todayStr = new Date().toISOString().split('T')[0];
  const todayHours = studyLogs
    .filter((l) => l.timestamp.startsWith(todayStr))
    .reduce((acc, l) => acc + l.durationMinutes / 60, 0);

  const dueFlashcardsCount = flashcards.filter(
    (c) => c.dueDate <= todayStr
  ).length;

  const currentThemeConfig = THEMES[themeMode] || THEMES.editorial;

  // User profile handlers
  const handleSaveUserProfile = (profile: UserProfile) => {
    setCurrentUserProfile(profile);
    localStorage.setItem('mnaero_user_profile', JSON.stringify(profile));
  };

  const handleLogoutUser = () => {
    setCurrentUserProfile(null);
    localStorage.removeItem('mnaero_user_profile');
  };

  return (
    <div className={`min-h-screen ${currentThemeConfig.bgClass} ${currentThemeConfig.textClass} font-sans antialiased selection:bg-[#FF6321] selection:text-black flex flex-col justify-between transition-colors duration-200`}>
      <div>
        {/* Top Navigation Bar */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          streakDays={14}
          todayHours={todayHours}
          dueFlashcardsCount={dueFlashcardsCount}
          isTimerRunning={isTimerRunning}
          activeTimerTopic={activeTimerTopic}
          currentTheme={themeMode}
          onSelectTheme={setThemeMode}
          onOpenCustomSubjectModal={() => setIsCustomSubjectModalOpen(true)}
          onOpenPhaseGuide={() => setIsPhaseGuideOpen(true)}
          currentUserProfile={currentUserProfile}
          onOpenLoginModal={() => setIsLoginModalOpen(true)}
          onOpenLicenseTerms={() => setIsLicenseModalOpen(true)}
        />

        {/* Main View Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          {activeTab === 'dashboard' && (
            <OverviewDashboard
              frentes={allFrentes}
              agendaTopics={agendaTopics}
              studyLogs={studyLogs}
              flashcards={flashcards}
              completedBlocks={completedBlocks}
              streakDays={14}
              onOpenAddModal={handleOpenAddModal}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onStartPomodoroTopic={handleStartPomodoroForTopic}
              onOpenPhaseGuide={() => setIsPhaseGuideOpen(true)}
            />
          )}

          {activeTab === 'agenda' && (
            <AgendaView
              agendaTopics={agendaTopics}
              frentes={allFrentes}
              onAddOrUpdateTopic={handleAddOrUpdateAgendaTopic}
              onDeleteTopic={handleDeleteAgendaTopic}
              onOpenAddModal={handleOpenAddModal}
              onEditTopic={handleOpenEditModal}
              onStartPomodoroForTopic={handleStartPomodoroForTopic}
              onResetAgenda={handleResetAgenda}
              onImportAgenda={handleImportAgenda}
            />
          )}

          {activeTab === 'simulados' && (
            <SimuladosView
              currentUserProfile={currentUserProfile}
              onOpenLoginModal={() => setIsLoginModalOpen(true)}
            />
          )}

          {activeTab === 'redacao' && (
            <RedacaoItaView />
          )}

          {activeTab === 'cycle' && (
            <StudyCycleView
              frentes={allFrentes}
              cycleConfig={cycleConfig}
              onUpdateConfig={setCycleConfig}
              completedBlocks={completedBlocks}
              onToggleBlock={handleToggleBlock}
              onResetCycleProgress={handleResetCycleProgress}
            />
          )}

          {activeTab === 'stages' && (
            <SevenStagesView
              frentes={allFrentes}
              topicProgressMap={topicProgressMap}
              onUpdateTopicProgress={handleUpdateTopicProgress}
            />
          )}

          {activeTab === 'pomodoro' && (
            <PomodoroTimer
              frentes={allFrentes}
              onAddStudyLog={handleAddStudyLog}
              onTimerStatusChange={(running, topic) => {
                setIsTimerRunning(running);
                setActiveTimerTopic(topic);
              }}
            />
          )}

          {activeTab === 'flashcards' && (
            <FlashcardsView
              flashcards={flashcards}
              frentes={allFrentes}
              onUpdateFlashcards={setFlashcards}
            />
          )}

          {activeTab === 'summaries' && (
            <SummariesView
              summaries={INITIAL_SUMMARIES}
              frentes={allFrentes}
            />
          )}

          {activeTab === 'videos' && (
            <VideoLessonsView
              videos={INITIAL_VIDEOS}
              frentes={allFrentes}
              onStartPomodoroForVideo={handleStartPomodoroForVideo}
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsDashboard
              studyLogs={studyLogs}
              flashcards={flashcards}
              examTopics={EXAM_TOPICS_DATA}
              streakDays={14}
            />
          )}
        </main>
      </div>

      {/* Editorial Footer */}
      <footer className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 mt-12 border-t-2 border-black flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] uppercase font-bold tracking-widest text-black/70 font-mono">
        <div className="flex flex-wrap gap-6 items-center">
          <span className="border-b border-black">MNAERO PLANNER // ITA 2027</span>
          <span>DESENVOLVEDOR: MICAEL NILDO OLIVEIRA SOUZA</span>
          <span>14 FRENTES MAPEADAS</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsLicenseModalOpen(true)}
            className="underline hover:text-[#FF6321] cursor-pointer"
          >
            LICENÇA MIT & TERMOS
          </button>
          <span>// ESTUDO TOTAL ESTIMADO: 1.240H</span>
        </div>
      </footer>

      {/* Add / Edit Topic Modal */}
      <AddTopicModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingTopic(null);
        }}
        frentes={allFrentes}
        onAddTopic={handleAddOrUpdateAgendaTopic}
        initialTopic={editingTopic}
      />

      {/* Custom Subject & Frente Modal */}
      <CustomSubjectModal
        isOpen={isCustomSubjectModalOpen}
        onClose={() => setIsCustomSubjectModalOpen(false)}
        customSubjects={customSubjects}
        frentes={allFrentes}
        onAddCustomSubject={handleAddCustomSubject}
        onAddCustomFrente={handleAddCustomFrente}
        onDeleteCustomSubject={handleDeleteCustomSubject}
      />

      {/* ITA 1ª vs 2ª Fase Guide Modal */}
      <PhaseGuideModal
        isOpen={isPhaseGuideOpen}
        onClose={() => setIsPhaseGuideOpen(false)}
      />

      {/* Login & Age Verification Modal */}
      <LoginAndTermsModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        currentUserProfile={currentUserProfile}
        onSaveProfile={handleSaveUserProfile}
        onLogout={handleLogoutUser}
        onOpenLicenseTerms={() => {
          setIsLoginModalOpen(false);
          setIsLicenseModalOpen(true);
        }}
      />

      {/* License & Terms Modal */}
      <LicenseAndTermsModal
        isOpen={isLicenseModalOpen}
        onClose={() => setIsLicenseModalOpen(false)}
      />
    </div>
  );
}

