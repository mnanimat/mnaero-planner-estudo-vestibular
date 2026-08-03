import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Sparkles, Award } from 'lucide-react';

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

const getTimeRemaining = (targetDateStr: string): CountdownTime => {
  const target = new Date(targetDateStr).getTime();
  const now = new Date().getTime();
  const diff = target - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds, isPast: false };
};

export const ItaCountdownBanner: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const phase1Target = '2026-09-27T13:00:00';
  const phase2Target = '2026-10-20T13:00:00';

  const [p1Time, setP1Time] = useState<CountdownTime>(getTimeRemaining(phase1Target));
  const [p2Time, setP2Time] = useState<CountdownTime>(getTimeRemaining(phase2Target));

  useEffect(() => {
    const timer = setInterval(() => {
      setP1Time(getTimeRemaining(phase1Target));
      setP2Time(getTimeRemaining(phase2Target));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (compact) {
    return (
      <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
        {/* 1a Fase */}
        <div className="flex items-center gap-1.5 bg-black text-white px-2.5 py-1 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <Calendar className="w-3.5 h-3.5 text-[#FF6321]" />
          <span className="font-extrabold text-[#FF6321] uppercase text-[10px]">ITA 1ª FASE (27/SET):</span>
          {p1Time.isPast ? (
            <span className="text-emerald-400 font-bold">EM ANDAMENTO / CONCLUÍDA</span>
          ) : (
            <span className="font-bold text-white">
              {p1Time.days}d {String(p1Time.hours).padStart(2, '0')}h {String(p1Time.minutes).padStart(2, '0')}m
            </span>
          )}
        </div>

        {/* 2a Fase */}
        <div className="flex items-center gap-1.5 bg-[#FF6321] text-black px-2.5 py-1 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <Award className="w-3.5 h-3.5 text-black" />
          <span className="font-extrabold uppercase text-[10px]">ITA 2ª FASE (20-23/OUT):</span>
          {p2Time.isPast ? (
            <span className="font-bold">EM ANDAMENTO / CONCLUÍDA</span>
          ) : (
            <span className="font-bold">
              {p2Time.days}d {String(p2Time.hours).padStart(2, '0')}h {String(p2Time.minutes).padStart(2, '0')}m
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border-2 border-black p-4 sm:p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-mono my-3">
      <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#FF6321]" />
          <h3 className="text-xs sm:text-sm font-black uppercase text-black tracking-tight">
            Contagem Regressiva ITA 2027 // Provas Oficiais
          </h3>
        </div>
        <span className="text-[10px] font-bold bg-black text-[#FF6321] px-2 py-0.5 border border-black uppercase">
          Horário Oficial de Brasília
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Phase 1 Card */}
        <div className="bg-[#F7F3EF] border-2 border-black p-3.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] space-y-2">
          <div className="flex items-center justify-between border-b border-black/20 pb-1.5">
            <span className="text-xs font-black text-black uppercase flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#FF6321]" /> Prova 1ª Fase
            </span>
            <span className="text-[10px] font-bold bg-black text-white px-2 py-0.5">
              27 SET 2026 (13h-18h)
            </span>
          </div>

          <div className="grid grid-cols-4 gap-1.5 text-center pt-1">
            <div className="bg-white border border-black p-1.5 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
              <span className="block text-lg font-black text-black leading-none">{p1Time.days}</span>
              <span className="text-[9px] font-bold text-black/70 uppercase">Dias</span>
            </div>
            <div className="bg-white border border-black p-1.5 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
              <span className="block text-lg font-black text-black leading-none">
                {String(p1Time.hours).padStart(2, '0')}
              </span>
              <span className="text-[9px] font-bold text-black/70 uppercase">Horas</span>
            </div>
            <div className="bg-white border border-black p-1.5 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
              <span className="block text-lg font-black text-black leading-none">
                {String(p1Time.minutes).padStart(2, '0')}
              </span>
              <span className="text-[9px] font-bold text-black/70 uppercase">Min</span>
            </div>
            <div className="bg-black text-white border border-black p-1.5 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
              <span className="block text-lg font-black text-[#FF6321] leading-none">
                {String(p1Time.seconds).padStart(2, '0')}
              </span>
              <span className="text-[9px] font-bold text-white/70 uppercase">Seg</span>
            </div>
          </div>
        </div>

        {/* Phase 2 Card */}
        <div className="bg-[#FF6321]/10 border-2 border-black p-3.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] space-y-2">
          <div className="flex items-center justify-between border-b border-black/20 pb-1.5">
            <span className="text-xs font-black text-black uppercase flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-black" /> Provas 2ª Fase
            </span>
            <span className="text-[10px] font-bold bg-[#FF6321] text-black border border-black px-2 py-0.5">
              20 a 23 OUT 2026 (13h-17h)
            </span>
          </div>

          <div className="grid grid-cols-4 gap-1.5 text-center pt-1">
            <div className="bg-white border border-black p-1.5 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
              <span className="block text-lg font-black text-black leading-none">{p2Time.days}</span>
              <span className="text-[9px] font-bold text-black/70 uppercase">Dias</span>
            </div>
            <div className="bg-white border border-black p-1.5 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
              <span className="block text-lg font-black text-black leading-none">
                {String(p2Time.hours).padStart(2, '0')}
              </span>
              <span className="text-[9px] font-bold text-black/70 uppercase">Horas</span>
            </div>
            <div className="bg-white border border-black p-1.5 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
              <span className="block text-lg font-black text-black leading-none">
                {String(p2Time.minutes).padStart(2, '0')}
              </span>
              <span className="text-[9px] font-bold text-black/70 uppercase">Min</span>
            </div>
            <div className="bg-black text-white border border-black p-1.5 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
              <span className="block text-lg font-black text-[#FF6321] leading-none">
                {String(p2Time.seconds).padStart(2, '0')}
              </span>
              <span className="text-[9px] font-bold text-white/70 uppercase">Seg</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
