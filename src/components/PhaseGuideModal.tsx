import React, { useState } from 'react';
import { Target, CheckCircle2, AlertTriangle, BookOpen, Clock, FileText, Sparkles, ChevronRight, X, ShieldAlert, Award } from 'lucide-react';

interface PhaseGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPhase?: '1a' | '2a' | 'all';
  onSelectPhaseFilter?: (phase: '1a' | '2a' | 'all') => void;
}

export const PhaseGuideModal: React.FC<PhaseGuideModalProps> = ({
  isOpen,
  onClose,
  selectedPhase = 'all',
  onSelectPhaseFilter
}) => {
  const [activeTab, setActiveTab] = useState<'1a' | '2a' | 'comparativo'>('1a');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl max-w-4xl w-full border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-zinc-900 via-zinc-800 to-black text-white relative">
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 text-zinc-400 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-[#FF6321] rounded-xl text-black font-bold">
              <Target className="w-6 h-6 text-black" />
            </div>
            <div>
              <h2 className="text-2xl font-serif font-bold text-white tracking-tight">
                Estrutura do Vestibular ITA: 1ª Fase vs 2ª Fase
              </h2>
              <p className="text-zinc-300 text-sm mt-0.5">
                Guia estratégico oficial de preparação para as provas objetivas e discursivas do Instituto Tecnológico de Aeronáutica.
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-2 mt-6 pt-4 border-t border-zinc-700/60">
            <button
              onClick={() => setActiveTab('1a')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === '1a' 
                  ? 'bg-[#FF6321] text-black font-semibold shadow-lg' 
                  : 'bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              1ª Fase: Prova Objetiva (60 Qs)
            </button>
            <button
              onClick={() => setActiveTab('2a')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === '2a' 
                  ? 'bg-[#FF6321] text-black font-semibold shadow-lg' 
                  : 'bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              <FileText className="w-4 h-4" />
              2ª Fase: Discursivas & Redação
            </button>
            <button
              onClick={() => setActiveTab('comparativo')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === 'comparativo' 
                  ? 'bg-[#FF6321] text-black font-semibold shadow-lg' 
                  : 'bg-zinc-800/80 text-zinc-300 hover:bg-zinc-700'
              }`}
            >
              <Award className="w-4 h-4" />
              Quadro Comparativo e Dicas
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 text-zinc-800 dark:text-zinc-200 max-h-[70vh] overflow-y-auto space-y-6">
          {activeTab === '1a' && (
            <div className="space-y-6 animate-fade-in">
              {/* Alert Badge */}
              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-start gap-3 text-amber-900 dark:text-amber-200 text-sm">
                <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Fase Eliminatória e Classificatória:</span> A 1ª fase exige velocidade, alta precisão e atenção total às notas mínimas de corte por matéria (especialmente <span className="underline font-semibold">Inglês ≥ 40% de acerto</span>).
                </div>
              </div>

              {/* Grid 60 Questions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#FF6321]">Formato & Duração</span>
                    <Clock className="w-4 h-4 text-zinc-400" />
                  </div>
                  <p className="text-2xl font-bold font-serif text-zinc-900 dark:text-white">5 Horas de Prova</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Média de 4,5 a 5 minutos por questão objetiva.</p>
                </div>

                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#FF6321]">Total de Questões</span>
                    <Target className="w-4 h-4 text-zinc-400" />
                  </div>
                  <p className="text-2xl font-bold font-serif text-zinc-900 dark:text-white">60 Questões Múltipla Escolha</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">5 alternativas (A, B, C, D, E) por questão.</p>
                </div>
              </div>

              {/* Breakdown by Subjects */}
              <div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#FF6321]" />
                  Distribuição Exata de Matérias na 1ª Fase
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-xl text-center">
                    <p className="text-xs text-blue-700 dark:text-blue-300 font-medium">Matemática</p>
                    <p className="text-xl font-bold text-blue-900 dark:text-blue-100 mt-1">12 Questões</p>
                  </div>
                  <div className="p-3 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 rounded-xl text-center">
                    <p className="text-xs text-purple-700 dark:text-purple-300 font-medium">Física</p>
                    <p className="text-xl font-bold text-purple-900 dark:text-purple-100 mt-1">12 Questões</p>
                  </div>
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-center">
                    <p className="text-xs text-emerald-700 dark:text-emerald-300 font-medium">Química</p>
                    <p className="text-xl font-bold text-emerald-900 dark:text-emerald-100 mt-1">12 Questões</p>
                  </div>
                  <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl text-center">
                    <p className="text-xs text-amber-700 dark:text-amber-300 font-medium">Português</p>
                    <p className="text-xl font-bold text-amber-900 dark:text-amber-100 mt-1">12 Questões</p>
                  </div>
                  <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl text-center">
                    <p className="text-xs text-rose-700 dark:text-rose-300 font-medium">Inglês</p>
                    <p className="text-xl font-bold text-rose-900 dark:text-rose-100 mt-1">12 Questões</p>
                  </div>
                </div>
              </div>

              {/* Strategy Pillars */}
              <div className="p-4 bg-zinc-900 text-white rounded-xl space-y-3">
                <h4 className="text-sm font-bold text-[#FF6321] uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Pilares de Sucesso na 1ª Fase
                </h4>
                <ul className="text-xs text-zinc-300 space-y-2 list-disc list-inside">
                  <li><strong className="text-white">Velocidade & Gestão do Tempo:</strong> Treine para não travar mais de 6 minutos em uma única questão objetiva.</li>
                  <li><strong className="text-white">Eliminação Ativa de Pegadinhas:</strong> Múltipla escolha permite checar valores limites, dimensões físicas e casos particulares ($n=1, n=2$).</li>
                  <li><strong className="text-white">Garantir a Nota em Inglês e Português:</strong> Acerte as questões fáceis/médias das obras literárias e gramática para elevar a média ponderada.</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === '2a' && (
            <div className="space-y-6 animate-fade-in">
              {/* Alert Badge */}
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-start gap-3 text-emerald-900 dark:text-emerald-200 text-sm">
                <Award className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Fase Decisiva da Vaga:</span> A 2ª fase avalia o rigor conceitual, clareza das demonstrações, notação formal e a capacidade argumentativa na Redação ITA.
                </div>
              </div>

              {/* 3 Days Breakdown */}
              <div className="space-y-3">
                <h3 className="text-base font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#FF6321]" />
                  Cronograma dos 3 Dias de Prova Discursiva
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/20">
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400">DIA 1 - MATEMÁTICA</span>
                    <p className="text-lg font-bold text-zinc-900 dark:text-white mt-1">10 Questões Discursivas</p>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2">
                      Foco em demonstrações formais, álgebra avançada, cônicas, complexos e geometria espacial rigorosa.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-950/20">
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">DIA 2 - QUÍMICA & REDAÇÃO</span>
                    <p className="text-lg font-bold text-zinc-900 dark:text-white mt-1">10 Qs Discursivas + Redação</p>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2">
                      Equilíbrio iônico, mecanismos orgânicos e a Redação Dissertativo-Argumentativa de alto nível filosófico.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-purple-200 dark:border-purple-900 bg-purple-50/50 dark:bg-purple-950/20">
                    <span className="text-xs font-bold text-purple-600 dark:text-purple-400">DIA 3 - FÍSICA</span>
                    <p className="text-lg font-bold text-zinc-900 dark:text-white mt-1">10 Questões Discursivas</p>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2">
                      Deduções completas de mecânica, eletromagnetismo, ondas e conceitos de física moderna.
                    </p>
                  </div>
                </div>
              </div>

              {/* Scoring Strategy */}
              <div className="p-4 bg-zinc-900 text-white rounded-xl space-y-3">
                <h4 className="text-sm font-bold text-[#FF6321] uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FF6321]" />
                  Como Ganhar Pontos Parciais na 2ª Fase
                </h4>
                <ul className="text-xs text-zinc-300 space-y-2 list-disc list-inside">
                  <li><strong className="text-white">Pontuação Parcial Garantida:</strong> Mesmo se não chegar à resposta final, declare as hipóteses físicas, esquemas de forças e equações fundamentais limpas.</li>
                  <li><strong className="text-white">Organização no Caderno de Respostas:</strong> Escreva de forma legível, indicando os passos numéricos 1, 2, 3 e destacando a resposta final em uma caixa retangular.</li>
                  <li><strong className="text-white">Redação do ITA:</strong> Exige tese clara no 1º parágrafo, 2 argumentos densos com filósofos/repertório e conclusão analítica em até 30 linhas.</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'comparativo' && (
            <div className="space-y-6 animate-fade-in">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-200 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white">
                      <th className="p-3 font-bold">Critério / Categoria</th>
                      <th className="p-3 font-bold text-[#FF6321]">1ª Fase (Objetiva)</th>
                      <th className="p-3 font-bold text-emerald-600 dark:text-emerald-400">2ª Fase (Discursiva)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-700 dark:text-zinc-300">
                    <tr>
                      <td className="p-3 font-semibold text-zinc-900 dark:text-white">Caráter</td>
                      <td className="p-3">Eliminatória & Classificatória</td>
                      <td className="p-3">Classificatória Final (Decisiva)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-zinc-900 dark:text-white">Matérias Cobradas</td>
                      <td className="p-3">Matemática, Física, Química, Português, Inglês</td>
                      <td className="p-3">Matemática, Química, Física, Redação ITA</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-zinc-900 dark:text-white">Papel do Inglês</td>
                      <td className="p-3 font-medium text-amber-600 dark:text-amber-400">Eliminatória (Min. 40% de acerto)</td>
                      <td className="p-3 text-zinc-400">Não cobrado na 2ª Fase</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-zinc-900 dark:text-white">Estilo de Resolução</td>
                      <td className="p-3">Múltipla escolha, estimativa rápida, substituição de opções</td>
                      <td className="p-3">Demonstração passo a passo, desenvolvimento e notação formal</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-zinc-900 dark:text-white">Critério de Correção</td>
                      <td className="p-3">Gabarito binário (Certo / Errado)</td>
                      <td className="p-3">Correção por etapas (Pontuação parcial por raciocínio)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {onSelectPhaseFilter && (
                <div className="p-4 bg-zinc-50 dark:bg-zinc-800/60 rounded-xl border border-zinc-200 dark:border-zinc-700 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold text-zinc-900 dark:text-white">Filtrar Plano de Estudos por Fase:</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Ajusta os gráficos, flashcards e matérias exibidos na plataforma.</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => { onSelectPhaseFilter('1a'); onClose(); }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                        selectedPhase === '1a' ? 'bg-[#FF6321] text-black border-[#FF6321]' : 'border-zinc-300 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                      }`}
                    >
                      Focar na 1ª Fase
                    </button>
                    <button
                      onClick={() => { onSelectPhaseFilter('2a'); onClose(); }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                        selectedPhase === '2a' ? 'bg-[#FF6321] text-black border-[#FF6321]' : 'border-zinc-300 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                      }`}
                    >
                      Focar na 2ª Fase
                    </button>
                    <button
                      onClick={() => { onSelectPhaseFilter('all'); onClose(); }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                        selectedPhase === 'all' ? 'bg-zinc-900 text-white dark:bg-white dark:text-black border-zinc-900' : 'border-zinc-300 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                      }`}
                    >
                      Ver Ambas
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-zinc-100 dark:bg-zinc-800/80 border-t border-zinc-200 dark:border-zinc-700 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
          <span>Instituto Tecnológico de Aeronáutica - ITA</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#FF6321] text-black font-bold rounded-lg hover:bg-orange-600 transition-colors"
          >
            Entendido, continuar estudos
          </button>
        </div>
      </div>
    </div>
  );
};
