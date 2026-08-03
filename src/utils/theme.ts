import { ThemeMode } from '../types';

export interface ThemeConfig {
  id: ThemeMode;
  name: string;
  bgClass: string;
  panelClass: string;
  borderClass: string;
  textClass: string;
  accentClass: string;
  accentTextClass: string;
  headerBgClass: string;
  cardBgClass: string;
}

export const THEMES: Record<ThemeMode, ThemeConfig> = {
  editorial: {
    id: 'editorial',
    name: 'Tom Claro (Editorial)',
    bgClass: 'bg-[#F7F3EF]',
    panelClass: 'bg-white',
    borderClass: 'border-black',
    textClass: 'text-[#1A1A1A]',
    accentClass: 'bg-[#FF6321]',
    accentTextClass: 'text-black',
    headerBgClass: 'bg-[#F7F3EF]',
    cardBgClass: 'bg-white'
  },
  dark: {
    id: 'dark',
    name: 'Tom Escuro (Dark Mode)',
    bgClass: 'bg-[#0F172A]',
    panelClass: 'bg-[#1E293B]',
    borderClass: 'border-[#475569]',
    textClass: 'text-[#F8FAFC]',
    accentClass: 'bg-[#FF6321]',
    accentTextClass: 'text-black',
    headerBgClass: 'bg-[#1E293B]',
    cardBgClass: 'bg-[#1E293B]'
  }
};

export interface SubjectColorConfig {
  primary: string; // Hex color code
  bgLight: string;
  bgDark: string;
  badgeBg: string;
  badgeText: string;
  border: string;
  text: string;
}

/**
 * Returns subject-specific colors adapted for light and dark modes according to specifications:
 * - Matemática: Laranja Neobrutalista (#FF6321)
 * - Física: Azul Ciano / Cyber (#0284C7 / #38BDF8)
 * - Química: Verde Esmeralda (#059669 / #34D399)
 * - Português: Amarelo Âmbar (#D97706 / #FBBF24)
 * - Inglês: Roxo Índigo (#4F46E5 / #818CF8)
 * - Redação: Carmim Rosa (#E11D48 / #F43F5E)
 */
export function getSubjectColorConfig(subjectName?: string, isDark: boolean = false): SubjectColorConfig {
  const norm = subjectName ? subjectName.trim().toLowerCase() : '';

  if (norm.includes('matemát') || norm.includes('mat')) {
    return {
      primary: '#FF6321',
      bgLight: '#FFF3EC',
      bgDark: '#3A1504',
      badgeBg: '#FF6321',
      badgeText: '#000000',
      border: isDark ? '#FF8C53' : '#000000',
      text: isDark ? '#FFC4B0' : '#9A2C00'
    };
  }

  if (norm.includes('físic') || norm.includes('fis')) {
    return {
      primary: isDark ? '#38BDF8' : '#0284C7',
      bgLight: '#F0F9FF',
      bgDark: '#0C4A6E',
      badgeBg: isDark ? '#38BDF8' : '#0284C7',
      badgeText: isDark ? '#000000' : '#FFFFFF',
      border: isDark ? '#7DD3FC' : '#000000',
      text: isDark ? '#BAE6FD' : '#0369A1'
    };
  }

  if (norm.includes('químic') || norm.includes('qui')) {
    return {
      primary: isDark ? '#34D399' : '#059669',
      bgLight: '#ECFDF5',
      bgDark: '#064E3B',
      badgeBg: isDark ? '#34D399' : '#059669',
      badgeText: isDark ? '#000000' : '#FFFFFF',
      border: isDark ? '#6EE7B7' : '#000000',
      text: isDark ? '#A7F3D0' : '#047857'
    };
  }

  if (norm.includes('portug') || norm.includes('port') || norm.includes('literat')) {
    return {
      primary: isDark ? '#FBBF24' : '#D97706',
      bgLight: '#FFFBEB',
      bgDark: '#78350F',
      badgeBg: isDark ? '#FBBF24' : '#D97706',
      badgeText: '#000000',
      border: isDark ? '#FCD34D' : '#000000',
      text: isDark ? '#FDE68A' : '#B45309'
    };
  }

  if (norm.includes('ingl') || norm.includes('ing')) {
    return {
      primary: isDark ? '#818CF8' : '#4F46E5',
      bgLight: '#EEF2FF',
      bgDark: '#312E81',
      badgeBg: isDark ? '#818CF8' : '#4F46E5',
      badgeText: isDark ? '#000000' : '#FFFFFF',
      border: isDark ? '#A5B4FC' : '#000000',
      text: isDark ? '#C7D2FE' : '#3730A3'
    };
  }

  if (norm.includes('redaç') || norm.includes('redac') || norm.includes('red')) {
    return {
      primary: isDark ? '#F43F5E' : '#E11D48',
      bgLight: '#FFF1F2',
      bgDark: '#881337',
      badgeBg: isDark ? '#F43F5E' : '#E11D48',
      badgeText: '#FFFFFF',
      border: isDark ? '#FB7185' : '#000000',
      text: isDark ? '#FECDD3' : '#BE123C'
    };
  }

  return {
    primary: isDark ? '#A1A1AA' : '#52525B',
    bgLight: '#F4F4F5',
    bgDark: '#27272A',
    badgeBg: isDark ? '#D4D4D8' : '#3F3F46',
    badgeText: isDark ? '#000000' : '#FFFFFF',
    border: isDark ? '#E4E4E7' : '#000000',
    text: isDark ? '#F4F4F5' : '#18181B'
  };
}

