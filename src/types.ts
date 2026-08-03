export type Subject = string;

export type ThemeMode = 'editorial' | 'dark';

export interface UserProfile {
  name: string;
  email: string;
  birthDate: string; // YYYY-MM-DD
  age: number;
  hasParentalConsent: boolean;
  termsAccepted: boolean;
  loginDate?: string;
}

export interface SimuladoQuestion {
  id: string;
  year: number;
  phase: '1a' | '2a';
  subject: Subject;
  frenteId: string;
  topic: string;
  statement: string;
  options?: string[]; // A, B, C, D, E for 1a fase
  correctOptionIndex?: number; // 0=A, 1=B, 2=C, 3=D, 4=E
  discursiveGuide?: string; // For 2a fase
  detailedSolution: string;
  youtubeVideoId: string;
  youtubeVideoTitle: string;
  difficulty: 'Média' | 'Alta' | 'Extrema (ITA)';
}

export interface SimuladoExam {
  id: string;
  title: string;
  subtitle: string;
  phase: '1a' | '2a' | 'mista';
  timeLimitMinutes: number;
  questions: SimuladoQuestion[];
}

export interface QuestionAttempt {
  questionId: string;
  userOptionIndex?: number;
  userDiscursiveText?: string;
  timeSpentSeconds: number;
  isCorrect?: boolean;
  markedForReview?: boolean;
}

export interface SimuladoResult {
  id: string;
  examId: string;
  examTitle: string;
  dateCompleted: string;
  totalTimeSpentSeconds: number;
  totalQuestions: number;
  correctAnswersCount: number;
  accuracyPercentage: number;
  attempts: Record<string, QuestionAttempt>; // questionId -> attempt
}

export interface CustomSubject {
  id: string;
  name: string;
  color: string;
  description?: string;
  isCustom?: boolean;
}

export interface FrenteInfo {
  id: string; // e.g. 'MAT-1', 'FÍS-2'
  subject: Subject;
  frenteNumber: number;
  name: string;
  defaultIncidence: number; // sum of weights from historical analysis
  topics: string[];
  phase?: '1a' | '2a' | 'ambas';
}

export interface ExamTopicData {
  id: string;
  subject: Subject;
  topicName: string;
  questions5y: number;
  freq5y: number;
  questions10y: number;
  freq10y: number;
  analysisNote?: string;
  frenteId: string;
  phase?: '1a' | '2a' | 'ambas';
}

export interface StudyCycleConfig {
  weeklyHours: number;
  blockMinutes: number;
  difficulties: Record<string, number>; // frenteId -> difficulty (2-10)
}

export type StudyStage = 
  | '1-aula'
  | '2-resumo'
  | '3-autoexplicacao'
  | '4-questoes'
  | '5-revisao'
  | '6-simulado'
  | '7-correcao';

export interface TopicProgress {
  topicId: string;
  subject: Subject;
  frenteId: string;
  completedStages: Record<StudyStage, boolean>;
  feynmanNotes?: string;
  questionsAttempted: number;
  questionsCorrect: number;
  errorLog: ErrorEntry[];
}

export type ErrorRootCause = 
  | 'falta_teoria'
  | 'atencao_interpretacao'
  | 'erro_conta'
  | 'pegadinha'
  | 'tempo_insuficiente'
  | 'lacuna_conceitual';

export interface ErrorEntry {
  id: string;
  timestamp: string;
  topicId: string;
  questionDescription: string;
  rootCause: ErrorRootCause;
  learningGap: string;
  actionPlan: string;
}

export interface Attachment {
  type: 'image' | 'audio' | 'pdf' | 'video' | 'link';
  url: string;
  title?: string;
}

export type AgendaStatus = 'planejado' | 'em_progresso' | 'revisao' | 'concluido';

export interface AgendaTopic {
  id: string;
  subject: Subject;
  frenteId: string;
  topicName: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  startTime: string; // HH:mm e.g. "08:00"
  endTime: string; // HH:mm e.g. "10:00"
  status: AgendaStatus;
  stage?: StudyStage;
  notes?: string;
  // Google Drive summary link or attachment
  driveAttachmentUrl?: string; // e.g. "https://drive.google.com/file/d/123/view" or share link
  driveAttachmentName?: string;
  driveAttachmentType?: 'pdf' | 'image' | 'link';
  color?: string;
}

export interface Flashcard {
  id: string;
  subject: Subject;
  frenteId: string;
  topic: string;
  frontText: string;
  backText: string;
  frontAttachments?: Attachment[];
  backAttachments?: Attachment[];
  tags: string[];
  phase?: '1a' | '2a' | 'ambas';
  // SRS properties
  interval: number; // in days
  repetition: number;
  easeFactor: number; // default 2.5
  dueDate: string; // YYYY-MM-DD
  lastReviewed?: string;
  history: { date: string; quality: number }[];
}

export interface StudyLog {
  id: string;
  timestamp: string;
  subject: Subject;
  frenteId: string;
  topic: string;
  stage: StudyStage;
  durationMinutes: number;
  notes?: string;
}

export interface DidacticSummary {
  id: string;
  subject: Subject;
  frenteId: string;
  topic: string;
  title: string;
  subtitle: string;
  summaryText: string;
  detailedSteps?: string[];
  formulas: { name: string; latex: string; explanation: string }[];
  itaTips: string[];
  commonTraps: string[];
  svgDiagram?: string;
  imageUrl?: string;
  driveUrl?: string;
  phase?: '1a' | '2a' | 'ambas';
}

export interface VideoLesson {
  id: string;
  subject: Subject;
  frenteId: string;
  topic: string;
  title: string;
  channelName: string;
  duration: string;
  youtubeId: string;
  thumbnailUrl?: string;
  recommendedStages: StudyStage[];
  phase?: '1a' | '2a' | 'ambas';
}
