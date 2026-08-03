import React, { useState } from 'react';
import { 
  PenTool, 
  ExternalLink, 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  AlertTriangle, 
  Copy, 
  Check, 
  FileText, 
  Cpu, 
  Lightbulb, 
  Layers, 
  Send,
  MessageSquare,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

interface RedacaoItaViewProps {
}

export const RedacaoItaView: React.FC<RedacaoItaViewProps> = () => {
  const [essayTitle, setEssayTitle] = useState('A ética do desenvolvimento da Inteligência Artificial e a preservação da autonomia humana');
  const [essayText, setEssayText] = useState('');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'guia' | 'temas'>('editor');

  // Word and line calculations
  const wordCount = essayText.trim() ? essayText.trim().split(/\s+/).length : 0;
  const lineCount = essayText ? essayText.split('\n').length : 0;

  const handleCopyText = () => {
    if (!essayText) return;
    navigator.clipboard.writeText(`TÍTULO: ${essayTitle}\n\nTEXTO:\n${essayText}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sampleThemes = [
    {
      id: 1,
      year: 'ITA 2027 (Simulado)',
      title: 'A ética do desenvolvimento da Inteligência Artificial e a preservação da autonomia humana',
      eixo: 'Filosofia & Tecnologia',
      desc: 'Discuta se a automação das decisões morais e cognitivas compromete o livre-arbiltrio e a responsabilidade individual na sociedade contemporânea.'
    },
    {
      id: 2,
      year: 'ITA 2025',
      title: 'A cultura do imediatismo e os impactos na produção científica e no pensamento crítico',
      eixo: 'Epistemologia & Sociedade',
      desc: 'Reflita sobre como a busca por resultados instantâneos afeta o rigor da pesquisa científica e a profundidade das reflexões intelectuais.'
    },
    {
      id: 3,
      year: 'ITA 2024',
      title: 'O dilema entre privacidade, segurança de dados e o avanço dos sistemas inteligentes',
      eixo: 'Direito & Ciência',
      desc: 'Analise o limite do controle estatal e privado sobre dados individuais em prol do bem-estar e da segurança coletiva.'
    }
  ];

  return (
    <div className="space-y-8 pb-12 font-mono">
      {/* Top Banner Header */}
      <div className="bg-white p-6 sm:p-8 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#FF6321] mb-1">
            <PenTool className="w-4 h-4" />
            <span>Módulo de Redação Estratégica // ITA, FUVEST & ENEM</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-black tracking-tight italic">
            Preparação para a Redação ITA 2027
          </h2>
          <p className="text-xs sm:text-sm text-black/80 mt-1 max-w-2xl font-sans">
            Guia completo de estrutura em 4 parágrafos, eixos temáticos com rigor filosófico, simulação de rascunho com contagem de linhas e conexão direta com corretores especializados.
          </p>
        </div>

        {/* View Switcher */}
        <div className="flex bg-[#F7F3EF] p-1 border-2 border-black text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <button
            onClick={() => setActiveTab('editor')}
            className={`px-4 py-2 uppercase transition-all cursor-pointer ${
              activeTab === 'editor' ? 'bg-black text-white' : 'text-black hover:bg-black/10'
            }`}
          >
            Rascunho & Editor
          </button>
          <button
            onClick={() => setActiveTab('guia')}
            className={`px-4 py-2 uppercase transition-all cursor-pointer ${
              activeTab === 'guia' ? 'bg-black text-white' : 'text-black hover:bg-black/10'
            }`}
          >
            Guia do ITA
          </button>
          <button
            onClick={() => setActiveTab('temas')}
            className={`px-4 py-2 uppercase transition-all cursor-pointer ${
              activeTab === 'temas' ? 'bg-black text-white' : 'text-black hover:bg-black/10'
            }`}
          >
            Banco de Temas
          </button>
        </div>
      </div>

      {/* FEATURED ESSAY CORRECTOR CARDS (PROMINENT ACCESSIBILITY) */}
      <div className="bg-[#F7F3EF] border-2 border-black p-6 space-y-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center justify-between border-b-2 border-black pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#FF6321]" />
            <h3 className="text-sm font-black text-black uppercase tracking-wider">
              Corretores Especializados em Redação (GPTs Personalizados)
            </h3>
          </div>
          <span className="text-[10px] bg-black text-white px-2 py-0.5 font-bold uppercase">
            Acesso Imediato
          </span>
        </div>

        <p className="text-xs text-black/80 font-sans">
          Utilize os corretores treinados especificamente com as bancas do ITA, ENEM e FUVEST para receber avaliação detalhada, nota por competência, correções gramaticais e sugestões de repertório.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Corrector 1: Micael Nildo Oliveira Souza */}
          <div className="bg-white border-2 border-black p-5 space-y-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between hover:border-[#FF6321] transition-all">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="bg-[#FF6321] text-black text-[10px] font-bold px-2 py-0.5 border border-black uppercase">
                  ITA + ENEM + FUVEST
                </span>
                <span className="text-[10px] text-black/60 font-bold uppercase flex items-center gap-1">
                  <UserCheck className="w-3 h-3 text-[#FF6321]" /> Por Micael Nildo Oliveira Souza
                </span>
              </div>

              <h4 className="font-serif font-black text-black text-base italic leading-tight">
                Corretor de Redações ENEM, FUVEST e ITA
              </h4>

              <p className="text-xs text-black/70 font-sans">
                Avaliador completo treinado nos critérios específicos do ITA (máxima coesão, tese filosófica rigorosa e argumentação sem clichês).
              </p>
            </div>

            <a
              href="https://chatgpt.com/g/g-6a4097e8a61c8191bf2837784b586203-corretor-de-redacoes-enem-fuvest-e-ita"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-black hover:bg-[#FF6321] hover:text-black text-white border-2 border-black font-bold text-xs uppercase flex items-center justify-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
            >
              <span>Acessar Corretor (Micael Nildo)</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Corrector 2: Roberto Fernandino */}
          <div className="bg-white border-2 border-black p-5 space-y-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between hover:border-[#FF6321] transition-all">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="bg-black text-white text-[10px] font-bold px-2 py-0.5 border border-black uppercase">
                  Foco Exclusivo ENEM
                </span>
                <span className="text-[10px] text-black/60 font-bold uppercase flex items-center gap-1">
                  <UserCheck className="w-3 h-3 text-black" /> Por Roberto Fernandino
                </span>
              </div>

              <h4 className="font-serif font-black text-black text-base italic leading-tight">
                Corretor Redação ENEM
              </h4>

              <p className="text-xs text-black/70 font-sans">
                Análise minuciosa das 5 competências do ENEM, verificação da Proposta de Intervenção (Agente, Ação, Meio/Modo, Efeito e Detalhamento).
              </p>
            </div>

            <a
              href="https://chatgpt.com/g/g-KpaoqUoH5-corretor-redacao-enem"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-[#FF6321] hover:bg-black hover:text-white text-black border-2 border-black font-bold text-xs uppercase flex items-center justify-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
            >
              <span>Acessar Corretor (Roberto Fernandino)</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* TAB 1: RASCUNHO & EDITOR DE REDAÇÃO */}
      {activeTab === 'editor' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Essay Writing Panel */}
          <div className="lg:col-span-8 bg-white border-2 border-black p-6 space-y-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center justify-between border-b-2 border-black pb-3">
              <h3 className="text-xs font-bold text-black uppercase flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#FF6321]" />
                Simulador de Folha de Redação ITA
              </h3>

              {/* Counters */}
              <div className="flex items-center gap-3 text-xs font-bold">
                <span className={`px-2 py-0.5 border border-black ${lineCount >= 28 && lineCount <= 32 ? 'bg-emerald-200 text-emerald-900' : 'bg-[#F7F3EF] text-black'}`}>
                  {lineCount} Linhas
                </span>
                <span className="px-2 py-0.5 bg-[#F7F3EF] border border-black text-black">
                  {wordCount} Palavras
                </span>
              </div>
            </div>

            {/* Tema Selecionado */}
            <div>
              <label className="block text-[10px] font-bold uppercase text-black mb-1">
                Tema / Proposta Selecionada
              </label>
              <input
                type="text"
                value={essayTitle}
                onChange={(e) => setEssayTitle(e.target.value)}
                className="w-full bg-[#F7F3EF] border-2 border-black p-3 font-serif font-bold text-sm text-black focus:outline-none"
              />
            </div>

            {/* Editor Textarea */}
            <div>
              <label className="block text-[10px] font-bold uppercase text-black mb-1 flex items-center justify-between">
                <span>Corpo da Redação (Aproximadamente 28 a 32 linhas)</span>
                <span className="text-black/50 italic font-sans">Ideal: 4 Parágrafos estruturados</span>
              </label>
              <textarea
                rows={16}
                value={essayText}
                onChange={(e) => setEssayText(e.target.value)}
                placeholder="Escreva sua redação aqui... Exemplo:&#10;&#10;Na obra 'O Mito da Caverna', Platão pondera sobre a diferença entre a ilusão das sombras e a realidade inteligível. Paralelamente, na sociedade contemporânea..."
                className="w-full bg-[#F7F3EF] border-2 border-black p-4 font-mono text-xs text-black focus:outline-none leading-relaxed placeholder:text-black/40"
              />
            </div>

            {/* Action Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={handleCopyText}
                className="px-4 py-2.5 bg-white hover:bg-black hover:text-white border-2 border-black font-bold text-xs uppercase flex items-center gap-2 cursor-pointer transition-all"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Texto Copiado!' : 'Copiar Redação'}</span>
              </button>

              <div className="flex items-center gap-2">
                <a
                  href="https://chatgpt.com/g/g-6a4097e8a61c8191bf2837784b586203-corretor-de-redacoes-enem-fuvest-e-ita"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleCopyText}
                  className="px-5 py-2.5 bg-[#FF6321] hover:bg-black hover:text-white text-black font-bold text-xs uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2 cursor-pointer transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Copiar & Corrigir no GPT ITA</span>
                </a>
              </div>
            </div>
          </div>

          {/* Checklist de Validação ITA Side Panel */}
          <div className="lg:col-span-4 bg-white border-2 border-black p-6 space-y-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-xs font-bold text-black border-b-2 border-black pb-3 uppercase flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#FF6321]" />
              Checklist de Rigo da Banca ITA
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5 p-3 bg-[#F7F3EF] border border-black">
                <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${wordCount > 250 ? 'text-emerald-600' : 'text-black/30'}`} />
                <div>
                  <span className="font-bold text-black block">Extensão Ideal:</span>
                  <span className="text-[11px] text-black/70 font-sans">
                    Entre 28 e 32 linhas (400 a 500 palavras). Evite ficar abaixo de 20 linhas.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 bg-[#F7F3EF] border border-black">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                <div>
                  <span className="font-bold text-black block">Abordagem Filosófica / Crítica:</span>
                  <span className="text-[11px] text-black/70 font-sans">
                    O ITA valoriza repertórios legitimados (Kant, Bauman, Hannah Arendt, Popper) aplicados ao tema.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 bg-[#F7F3EF] border border-black">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-[#FF6321]" />
                <div>
                  <span className="font-bold text-black block">Atenção ao Formato da Conclusão:</span>
                  <span className="text-[11px] text-black/70 font-sans">
                    Diferente do ENEM, no ITA <strong>não é necessário</strong> detalhar agente/meio/efeito governamental. O foco é fechar o raciocínio com profundidade analítica.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: GUIA COMPLETO DO ITA */}
      {activeTab === 'guia' && (
        <div className="bg-white border-2 border-black p-6 sm:p-8 space-y-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="border-b-2 border-black pb-4">
            <h3 className="text-lg font-serif font-black text-black italic">
              Manual Estratégico da Redação ITA // Estrutura em 4 Parágrafos
            </h3>
            <p className="text-xs text-black/70 mt-1">
              Entenda a matriz de correção e os pilares de uma nota acima de 9,0 na 2ª Fase do ITA.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {/* Parágrafo 1 & 2 */}
            <div className="border-2 border-black p-4 bg-[#F7F3EF] space-y-3">
              <span className="bg-black text-white px-2 py-0.5 font-bold uppercase">
                Parágrafo 1: Introdução (7 a 8 linhas)
              </span>
              <p className="font-sans text-black/80">
                <strong>Estratégia:</strong> Contextualização histórica ou filosófica + Tese clara e inegociável + Antecipação dos 2 argumentos centrais.
              </p>
              <div className="p-2.5 bg-white border border-black text-[11px] font-mono italic">
                "Exemplo: Em 'A Condição Humana', Hannah Arendt alerta para os riscos da alienação técnica. De maneira análoga, no cenário contemporâneo..."
              </div>
            </div>

            <div className="border-2 border-black p-4 bg-[#F7F3EF] space-y-3">
              <span className="bg-[#FF6321] text-black px-2 py-0.5 font-bold uppercase">
                Parágrafo 2: Desenvolvimento 1 (8 a 9 linhas)
              </span>
              <p className="font-sans text-black/80">
                <strong>Estratégia:</strong> Tópico frasal forte + Argumento de Causa/Autoridade + Análise crítica profunda conectada à tese.
              </p>
              <div className="p-2.5 bg-white border border-black text-[11px] font-mono italic">
                "Em primeira análise, cabe destacar que a mercantilização do conhecimento fragiliza o pensamento autônomo..."
              </div>
            </div>

            {/* Parágrafo 3 & 4 */}
            <div className="border-2 border-black p-4 bg-[#F7F3EF] space-y-3">
              <span className="bg-[#FF6321] text-black px-2 py-0.5 font-bold uppercase">
                Parágrafo 3: Desenvolvimento 2 (8 a 9 linhas)
              </span>
              <p className="font-sans text-black/80">
                <strong>Estratégia:</strong> Transição coesiva + Argumento de Consequência/Nuance ética + Confronto de ideias sem superficialidade.
              </p>
              <div className="p-2.5 bg-white border border-black text-[11px] font-mono italic">
                "Ademais, é imperioso notar que a ausência de regulação sobre algoritmos intensifica a polarização social..."
              </div>
            </div>

            <div className="border-2 border-black p-4 bg-[#F7F3EF] space-y-3">
              <span className="bg-black text-white px-2 py-0.5 font-bold uppercase">
                Parágrafo 4: Conclusão (6 a 7 linhas)
              </span>
              <p className="font-sans text-black/80">
                <strong>Estratégia:</strong> Retomada da tese com conectivo conclusivo + Síntese dos argumentos + Reflexão ética final sem chavões.
              </p>
              <div className="p-2.5 bg-white border border-black text-[11px] font-mono italic">
                "Depreende-se, portanto, que a conciliação entre o progresso tecnológico e os valores humanos exige..."
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: BANCO DE TEMAS SIMULADOS DO ITA */}
      {activeTab === 'temas' && (
        <div className="space-y-4">
          <div className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-sm font-bold text-black uppercase mb-4 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-[#FF6321]" />
              Propostas de Redação no Padrão ITA
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sampleThemes.map((theme) => (
                <div
                  key={theme.id}
                  className="bg-[#F7F3EF] border-2 border-black p-5 space-y-3 flex flex-col justify-between shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-bold">
                      <span className="bg-black text-white px-2 py-0.5 uppercase border border-black">
                        {theme.year}
                      </span>
                      <span className="text-[#FF6321] uppercase">{theme.eixo}</span>
                    </div>

                    <h4 className="font-serif font-black text-black text-sm italic leading-tight">
                      {theme.title}
                    </h4>

                    <p className="text-xs text-black/70 font-sans">
                      {theme.desc}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setEssayTitle(theme.title);
                      setActiveTab('editor');
                    }}
                    className="w-full py-2 bg-black text-white hover:bg-[#FF6321] hover:text-black font-bold text-xs uppercase border border-black transition-all cursor-pointer mt-2"
                  >
                    Usar este Tema no Editor
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
