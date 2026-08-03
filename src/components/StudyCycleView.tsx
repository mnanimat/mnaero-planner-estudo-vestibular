import React, { useState } from 'react';
import { FrenteInfo, StudyCycleConfig } from '../types';
import { RotateCcw, Sliders, CheckSquare, Square, Info, Sparkles, Award } from 'lucide-react';

interface StudyCycleViewProps {
  frentes: FrenteInfo[];
  cycleConfig: StudyCycleConfig;
  onUpdateConfig: (newConfig: StudyCycleConfig) => void;
  completedBlocks: Record<string, number>; // frenteId -> completed block count
  onToggleBlock: (frenteId: string, blockIndex: number) => void;
  onResetCycleProgress: () => void;
}

export const StudyCycleView: React.FC<StudyCycleViewProps> = ({
  frentes,
  cycleConfig,
  onUpdateConfig,
  completedBlocks,
  onToggleBlock,
  onResetCycleProgress,
}) => {
  const [showHelp, setShowHelp] = useState(false);

  // Difficulty scale guide
  const difficultyGuide = [
    { value: 10, label: '10 -> Não entendo nada', color: 'bg-rose-500/20 text-rose-400 border-rose-500/30' },
    { value: 8, label: '8 -> Tenho dificuldade', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
    { value: 6, label: '6 -> Preciso praticar mais', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
    { value: 4, label: '4 -> É bom dar uma olhada', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    { value: 2, label: '2 -> Nessa eu me garanto', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
  ];

  // Calculations based on page 2 formulas
  const frentesCalculated = frentes.map((f) => {
    const diff = cycleConfig.difficulties[f.id] ?? 6; // default 6
    const score = f.defaultIncidence + diff;
    return {
      ...f,
      difficulty: diff,
      score,
    };
  });

  const totalScore = frentesCalculated.reduce((acc, f) => acc + f.score, 0);

  const cycleResults = frentesCalculated.map((f) => {
    const proportion = totalScore > 0 ? f.score / totalScore : 0;
    const hoursExact = cycleConfig.weeklyHours * proportion;
    const hoursRounded = Math.round(hoursExact * 10) / 10;
    const minutesExact = hoursExact * 60;
    const blockCount = Math.max(1, Math.round(minutesExact / cycleConfig.blockMinutes));

    return {
      ...f,
      proportion,
      hoursExact,
      hoursRounded,
      minutesExact,
      blockCount,
    };
  });

  const totalCalculatedHours = cycleResults.reduce((acc, f) => acc + f.hoursExact, 0);
  const totalCalculatedBlocks = cycleResults.reduce((acc, f) => acc + f.blockCount, 0);
  const completedCountsList = Object.values(completedBlocks) as number[];
  const totalDoneBlocks = completedCountsList.reduce((acc, count) => acc + (count || 0), 0);
  const cycleCompletionPct = totalCalculatedBlocks > 0 ? Math.round((totalDoneBlocks / totalCalculatedBlocks) * 100) : 0;

  const handleDifficultyChange = (frenteId: string, value: number) => {
    onUpdateConfig({
      ...cycleConfig,
      difficulties: {
        ...cycleConfig.difficulties,
        [frenteId]: value,
      },
    });
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-white rounded-none p-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-black text-xs font-bold tracking-widest uppercase mb-1 font-mono">
              <RotateCcw className="w-4 h-4 text-[#FF6321]" />
              Algoritmo de Ciclo Proporcional
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-black tracking-tight italic">
              Ciclo de Estudos Personalizado ITA
            </h2>
            <p className="text-xs sm:text-sm text-black/80 mt-1 max-w-2xl">
              Distribuição de horas entre Matemática, Física e Química baseada na <strong className="font-bold underline decoration-[#FF6321]">incidência real do ITA</strong> e na sua <strong className="font-bold underline">dificuldade pessoal</strong>.
            </p>
          </div>

          {/* Quick Settings Card */}
          <div className="bg-[#F7F3EF] border border-black p-4 flex flex-wrap items-center gap-4 text-xs font-mono">
            <div>
              <label className="block text-black/70 font-bold uppercase text-[10px] tracking-wider mb-1">Horas / Semana:</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="10"
                  max="80"
                  value={cycleConfig.weeklyHours}
                  onChange={(e) => onUpdateConfig({ ...cycleConfig, weeklyHours: Number(e.target.value) || 36 })}
                  className="w-16 bg-white border border-black px-2.5 py-1 text-black font-bold text-sm focus:bg-[#FF6321]/10 focus:outline-none"
                />
                <span className="text-black font-bold">horas</span>
              </div>
            </div>

            <div className="border-l border-black/30 h-8 hidden sm:block"></div>

            <div>
              <label className="block text-black/70 font-bold uppercase text-[10px] tracking-wider mb-1">Blocos:</label>
              <select
                value={cycleConfig.blockMinutes}
                onChange={(e) => onUpdateConfig({ ...cycleConfig, blockMinutes: Number(e.target.value) })}
                className="bg-white border border-black px-2.5 py-1 text-black font-bold text-xs focus:outline-none"
              >
                <option value={45}>45 minutos</option>
                <option value={50}>50 minutos</option>
                <option value={60}>60 minutos (1h)</option>
                <option value={90}>90 minutos (1.5h)</option>
              </select>
            </div>

            <button
              onClick={() => setShowHelp(!showHelp)}
              className="p-2 text-black hover:bg-black hover:text-white border border-black transition-all cursor-pointer ml-auto"
              title="Como usar o ciclo"
            >
              <Info className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Help box */}
        {showHelp && (
          <div className="mt-4 pt-4 border-t border-black text-xs text-black/90 space-y-2 bg-[#F7F3EF] p-4 border border-black">
            <h4 className="font-serif italic font-bold text-black flex items-center gap-1.5 text-sm">
              <Sparkles className="w-4 h-4 text-[#FF6321]" />
              Como Funciona o Ciclo de Estudos do ITA?
            </h4>
            <p>
              Em vez de um horário fixo por dia da semana (ex: "segunda-feira estudo matemática"), no <strong>Ciclo de Estudos</strong> você estuda as matérias em uma sequência contínua de blocos. Se o dia acabar no bloco MAT-3, no dia seguinte você continua exatamente do próximo bloco!
            </p>
            <p className="font-mono text-[11px]">
              Fórmula: Horas = Horas Semanais × [(Incidência + Dificuldade) / Soma Total]
            </p>
          </div>
        )}
      </div>

      {/* Difficulty Legend */}
      <div className="bg-white border border-black p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
        <h3 className="text-xs font-bold uppercase tracking-widest text-black mb-3 flex items-center gap-2 font-mono">
          <Sliders className="w-4 h-4 text-[#FF6321]" />
          Escala de Dificuldade Pessoal (Ajuste por Frente):
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 text-xs font-mono">
          {difficultyGuide.map((g) => (
            <div key={g.value} className="px-2.5 py-1.5 bg-[#F7F3EF] border border-black text-black font-bold text-[11px]">
              {g.label}
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Cycle Blocks Execution ("Ciclo Final") */}
      <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-black pb-4">
          <div>
            <h3 className="text-lg font-serif font-black italic text-black flex items-center gap-2">
              <Award className="w-5 h-5 text-[#FF6321]" />
              Execução do Ciclo Final (Blocos de {cycleConfig.blockMinutes} min)
            </h3>
            <p className="text-xs text-black/70 mt-0.5">
              Clique nos blocos à medida que estuda para registrá-los no seu progresso.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Progress Bar */}
            <div className="flex items-center gap-3 bg-[#F7F3EF] px-4 py-2 border border-black font-mono">
              <div className="text-right">
                <div className="text-[10px] text-black/60 font-bold uppercase tracking-wider">Progresso do Ciclo:</div>
                <div className="text-sm font-black text-black">
                  {totalDoneBlocks} / {totalCalculatedBlocks} blocos <span className="text-[#FF6321]">({cycleCompletionPct}%)</span>
                </div>
              </div>
              <div className="w-16 bg-white border border-black h-3 overflow-hidden">
                <div
                  className="bg-black h-full transition-all duration-300"
                  style={{ width: `${Math.min(100, cycleCompletionPct)}%` }}
                ></div>
              </div>
            </div>

            <button
              onClick={onResetCycleProgress}
              className="px-3 py-2 text-xs font-mono font-bold uppercase bg-black hover:bg-[#FF6321] hover:text-black text-white transition-all cursor-pointer border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              title="Reiniciar contagem do ciclo"
            >
              Reiniciar
            </button>
          </div>
        </div>

        {/* Blocks Display Grouped by Subject */}
        <div className="space-y-6">
          {['Matemática', 'Física', 'Química'].map((subjectName) => {
            const subjectResults = cycleResults.filter((r) => r.subject === subjectName);

            return (
              <div key={subjectName} className="border border-black bg-[#F7F3EF] p-4">
                <div className="flex items-center justify-between mb-3 border-b border-black/20 pb-2">
                  <h4 className="text-sm font-bold text-black flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-black text-white text-xs font-mono font-bold uppercase tracking-widest">
                      {subjectName}
                    </span>
                  </h4>
                  <span className="text-xs font-mono text-black/70">
                    Total: {subjectResults.reduce((acc, r) => acc + r.blockCount, 0)} blocos (
                    {(subjectResults.reduce((acc, r) => acc + r.minutesExact, 0) / 60).toFixed(1)}h)
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {subjectResults.map((item) => {
                    const doneCount = completedBlocks[item.id] || 0;
                    return (
                      <div
                        key={item.id}
                        className="bg-white border border-black p-3 flex flex-col justify-between shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <span className="text-xs font-mono font-black text-black">{item.id}</span>
                            <div className="text-[11px] text-black/80 font-medium line-clamp-1">{item.name}</div>
                          </div>
                          <span className="text-[10px] bg-black text-white font-mono font-bold px-1.5 py-0.5 uppercase">
                            {item.blockCount} B ({item.hoursRounded}h)
                          </span>
                        </div>

                        {/* Block checkboxes */}
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {Array.from({ length: item.blockCount }).map((_, idx) => {
                            const isChecked = idx < doneCount;
                            return (
                              <button
                                key={idx}
                                onClick={() => onToggleBlock(item.id, idx)}
                                className={`flex items-center gap-1 text-xs px-2 py-1 font-mono transition-all cursor-pointer border border-black ${
                                  isChecked
                                    ? 'bg-[#FF6321] text-black font-bold shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]'
                                    : 'bg-white hover:bg-black/10 text-black/70'
                                }`}
                                title={`Bloco ${idx + 1} de ${item.id}`}
                              >
                                {isChecked ? <CheckSquare className="w-3.5 h-3.5 text-black" /> : <Square className="w-3.5 h-3.5 text-black/40" />}
                                <span>B{idx + 1}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full Calculation Breakdown Table */}
      <div className="bg-white border-2 border-black overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="p-4 bg-black text-white flex items-center justify-between">
          <h3 className="text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-2">
            <Sliders className="w-4 h-4 text-[#FF6321]" />
            Tabela do Ciclo de Estudos (Ajuste de Dificuldades)
          </h3>
          <span className="text-[11px] font-mono text-[#FF6321]">Pontuação Total = {totalScore}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#F7F3EF] text-black font-mono font-bold border-b-2 border-black uppercase text-[10px] tracking-wider">
                <th className="p-3">Matéria / Frente</th>
                <th className="p-3 text-center">Incidência</th>
                <th className="p-3 text-center">Dificuldade (2 a 10)</th>
                <th className="p-3 text-center">Pontos</th>
                <th className="p-3 text-center">Horas Exatas</th>
                <th className="p-3 text-center">Horas Arred.</th>
                <th className="p-3 text-center">Minutos</th>
                <th className="p-3 text-center">Blocos ({cycleConfig.blockMinutes} min)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/20 text-black">
              {cycleResults.map((row) => (
                <tr key={row.id} className="hover:bg-[#F7F3EF] transition-colors">
                  <td className="p-3 font-semibold text-black">
                    <span className="font-mono font-bold text-[#FF6321] mr-2">{row.id}</span>
                    <span className="text-black font-medium">{row.name}</span>
                  </td>
                  <td className="p-3 text-center font-mono font-bold">{row.defaultIncidence}</td>
                  <td className="p-3 text-center">
                    <select
                      value={row.difficulty}
                      onChange={(e) => handleDifficultyChange(row.id, Number(e.target.value))}
                      className="bg-white border border-black font-mono font-bold text-xs px-2 py-1 focus:outline-none"
                    >
                      <option value={10}>10 - Não entendo nada</option>
                      <option value={8}>8 - Tenho dificuldade</option>
                      <option value={6}>6 - Preciso praticar mais</option>
                      <option value={4}>4 - É bom dar uma olhada</option>
                      <option value={2}>2 - Nessa me garanto</option>
                    </select>
                  </td>
                  <td className="p-3 text-center font-mono font-bold">{row.score}</td>
                  <td className="p-3 text-center font-mono text-black/60">{row.hoursExact.toFixed(2)}h</td>
                  <td className="p-3 text-center font-mono font-bold text-black">{row.hoursRounded}h</td>
                  <td className="p-3 text-center font-mono">{Math.round(row.minutesExact)} min</td>
                  <td className="p-3 text-center">
                    <span className="bg-black text-white font-mono font-bold px-2.5 py-1 text-[11px] uppercase border border-black">
                      {row.blockCount} blocos
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-black text-white font-mono font-bold uppercase text-[11px]">
                <td className="p-3">TOTAL DA SEMANA</td>
                <td className="p-3 text-center text-[#FF6321]">107</td>
                <td className="p-3 text-center text-[#FF6321]">
                  {cycleResults.reduce((acc, r) => acc + r.difficulty, 0)}
                </td>
                <td className="p-3 text-center">{totalScore}</td>
                <td className="p-3 text-center text-white/80">{totalCalculatedHours.toFixed(1)}h</td>
                <td className="p-3 text-center text-[#FF6321]">
                  {cycleResults.reduce((acc, r) => acc + r.hoursRounded, 0).toFixed(1)}h
                </td>
                <td className="p-3 text-center">{Math.round(totalCalculatedHours * 60)} min</td>
                <td className="p-3 text-center text-[#FF6321]">{totalCalculatedBlocks} blocos</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};
