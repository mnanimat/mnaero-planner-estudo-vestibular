import React, { useState } from 'react';
import { Flashcard, FrenteInfo, Subject, Attachment } from '../types';
import { calculateNextSRS, isCardDue } from '../utils/srsAlgorithm';
import { 
  Zap, 
  Plus, 
  RotateCw, 
  CheckCircle, 
  Image as ImageIcon, 
  Mic, 
  FileText, 
  Youtube, 
  Link as LinkIcon, 
  Sparkles, 
  Trash2, 
  Check, 
  X, 
  Layers,
  Bot
} from 'lucide-react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface FlashcardsViewProps {
  flashcards: Flashcard[];
  frentes: FrenteInfo[];
  onUpdateFlashcards: (cards: Flashcard[]) => void;
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({
  flashcards,
  frentes,
  onUpdateFlashcards,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedFrenteId, setSelectedFrenteId] = useState<string>('all');
  const [filterMode, setFilterMode] = useState<'due' | 'all'>('due');

  // Active Flashcard practice session state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Add Card Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newSubject, setNewSubject] = useState<Subject>('Matemática');
  const [newFrenteId, setNewFrenteId] = useState<string>('MAT-1');
  const [newTopic, setNewTopic] = useState<string>('');
  const [newFrontText, setNewFrontText] = useState<string>('');
  const [newBackText, setNewBackText] = useState<string>('');
  const [newImageUrl, setNewImageUrl] = useState<string>('');
  const [newAudioUrl, setNewAudioUrl] = useState<string>('');
  const [newPdfUrl, setNewPdfUrl] = useState<string>('');
  const [newYoutubeUrl, setNewYoutubeUrl] = useState<string>('');

  // AI Generator Loading State

  // Filter cards
  const filteredCards = flashcards.filter((card) => {
    if (selectedSubject !== 'all' && card.subject !== selectedSubject) return false;
    if (selectedFrenteId !== 'all' && card.frenteId !== selectedFrenteId) return false;
    if (filterMode === 'due' && !isCardDue(card)) return false;
    return true;
  });

  const dueCount = flashcards.filter(isCardDue).length;
  const activeCard = filteredCards[currentIndex];

  const handleRate = (quality: number) => {
    if (!activeCard) return;

    const srsUpdates = calculateNextSRS(activeCard, quality);
    const updatedCards = flashcards.map((c) =>
      c.id === activeCard.id ? { ...c, ...srsUpdates } : c
    );

    onUpdateFlashcards(updatedCards);
    setIsFlipped(false);

    // Advance to next card or loop
    if (currentIndex >= filteredCards.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleCreateCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFrontText.trim() || !newBackText.trim()) return;

    const frontAttachments: Attachment[] = [];
    const backAttachments: Attachment[] = [];

    if (newImageUrl.trim()) frontAttachments.push({ type: 'image', url: newImageUrl, title: 'Imagem de Apoio' });
    if (newAudioUrl.trim()) backAttachments.push({ type: 'audio', url: newAudioUrl, title: 'Áudio Explicativo' });
    if (newPdfUrl.trim()) backAttachments.push({ type: 'pdf', url: newPdfUrl, title: 'Documento PDF' });
    if (newYoutubeUrl.trim()) backAttachments.push({ type: 'video', url: newYoutubeUrl, title: 'Vídeo do YouTube' });

    const newCard: Flashcard = {
      id: `fc-${Date.now()}`,
      subject: newSubject,
      frenteId: newFrenteId,
      topic: newTopic || 'Conceitos Fundamentais',
      frontText: newFrontText,
      backText: newBackText,
      frontAttachments,
      backAttachments,
      tags: ['ITA', newSubject],
      interval: 1,
      repetition: 0,
      easeFactor: 2.5,
      dueDate: new Date().toISOString().split('T')[0],
      history: [],
    };

    onUpdateFlashcards([newCard, ...flashcards]);
    setIsAddModalOpen(false);

    // Reset Form
    setNewFrontText('');
    setNewBackText('');
    setNewImageUrl('');
    setNewAudioUrl('');
    setNewPdfUrl('');
    setNewYoutubeUrl('');
  };

  // Generate flashcards with AI endpoint

  // Render LaTeX or simple text safely
  const renderRichText = (text: string) => {
    if (!text) return null;
    const parts = text.split(/(\$\$[\s\S]*?\$\$|\$.*?\$)/g);

    return (
      <div className="space-y-2 whitespace-pre-wrap">
        {parts.map((part, idx) => {
          if (part.startsWith('$$') && part.endsWith('$$')) {
            const math = part.slice(2, -2);
            try {
              const html = katex.renderToString(math, { displayMode: true, throwOnError: false });
              return <div key={idx} className="my-2 overflow-x-auto text-blue-300" dangerouslySetInnerHTML={{ __html: html }} />;
            } catch (e) {
              return <code key={idx} className="text-amber-400 font-mono">{part}</code>;
            }
          } else if (part.startsWith('$') && part.endsWith('$')) {
            const math = part.slice(1, -1);
            try {
              const html = katex.renderToString(math, { displayMode: false, throwOnError: false });
              return <span key={idx} className="text-blue-300 px-1" dangerouslySetInnerHTML={{ __html: html }} />;
            } catch (e) {
              return <code key={idx} className="text-amber-400 font-mono">{part}</code>;
            }
          }
          return <span key={idx}>{part}</span>;
        })}
      </div>
    );
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner */}
      <div className="bg-white rounded-none p-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-black text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-2 mb-1">
            <Zap className="w-4 h-4 text-[#FF6321]" />
            Repetição Espaçada (Algoritmo SM-2 SuperMemo)
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-black tracking-tight italic">
            Flashcards Inteligentes com Suporte Multimídia
          </h2>
          <p className="text-xs sm:text-sm text-black/80 mt-1 max-w-xl">
            Suporta imagens, áudios, PDFs, links de vídeos do YouTube e fórmulas LaTeX para memorização profunda das equações do ITA.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex bg-[#F7F3EF] p-1 border border-black font-mono text-xs font-bold">
            <button
              onClick={() => { setFilterMode('due'); setCurrentIndex(0); }}
              className={`px-3 py-1.5 transition-all cursor-pointer border border-black ${
                filterMode === 'due'
                  ? 'bg-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                  : 'text-black hover:bg-black/10'
              }`}
            >
              Para Revisar Hoje ({dueCount})
            </button>
            <button
              onClick={() => { setFilterMode('all'); setCurrentIndex(0); }}
              className={`px-3 py-1.5 transition-all cursor-pointer border border-black ${
                filterMode === 'all'
                  ? 'bg-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                  : 'text-black hover:bg-black/10'
              }`}
            >
              Todos os Cartões ({flashcards.length})
            </button>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#FF6321] text-black border-2 border-black font-mono font-bold text-xs uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Criar Flashcard
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white border-2 border-black p-4 flex flex-wrap items-center gap-4 text-xs font-mono shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
        <span className="text-black font-bold uppercase">Filtrar por:</span>

        <div>
          <select
            value={selectedSubject}
            onChange={(e) => { setSelectedSubject(e.target.value); setCurrentIndex(0); }}
            className="bg-[#F7F3EF] border border-black text-black font-bold px-3 py-1.5 focus:outline-none"
          >
            <option value="all">Todas as Matérias</option>
            <option value="Matemática">Matemática</option>
            <option value="Física">Física</option>
            <option value="Química">Química</option>
          </select>
        </div>

        <div>
          <select
            value={selectedFrenteId}
            onChange={(e) => { setSelectedFrenteId(e.target.value); setCurrentIndex(0); }}
            className="bg-[#F7F3EF] border border-black text-black font-bold px-3 py-1.5 focus:outline-none"
          >
            <option value="all">Todas as Frentes</option>
            {frentes.map((f) => (
              <option key={f.id} value={f.id}>
                {f.id} - {f.name}
              </option>
            ))}
          </select>
        </div>

        <span className="ml-auto text-black/70 font-bold">
          Exibindo {filteredCards.length} de {flashcards.length} cartões
        </span>
      </div>

      {/* Flashcard Active Session Card */}
      {filteredCards.length === 0 ? (
        <div className="bg-white border-2 border-black p-12 text-center space-y-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="w-16 h-16 bg-[#FF6321] text-black border-2 border-black flex items-center justify-center mx-auto shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-serif font-black text-black italic">
            {filterMode === 'due' ? 'Nenhum flashcard pendente para hoje!' : 'Nenhum flashcard encontrado com este filtro.'}
          </h3>
          <p className="text-xs font-mono text-black/70 max-w-md mx-auto">
            {filterMode === 'due'
              ? 'Você revisou todos os cartões agendados. Volte amanhã ou crie novos flashcards!'
              : 'Tente alterar os filtros de matéria ou crie cartões para este assunto.'}
          </p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-[#FF6321] text-black border-2 border-black font-mono font-bold text-xs uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-all cursor-pointer"
          >
            Criar Novo Flashcard
          </button>
        </div>
      ) : (
        <div className="space-y-6 max-w-3xl mx-auto">
          {/* Card Indicator */}
          <div className="flex items-center justify-between text-xs text-black font-mono font-bold">
            <span>
              Cartão {currentIndex + 1} de {filteredCards.length}
            </span>
            <span className="text-[#FF6321] uppercase">
              Assunto: {activeCard?.topic} ({activeCard?.frenteId})
            </span>
          </div>

          {/* Flip Card Component */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className={`min-h-[320px] bg-white border-2 border-black p-8 flex flex-col justify-between cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 relative ${
              isFlipped ? 'bg-[#F7F3EF]' : ''
            }`}
          >
            <div className="flex items-center justify-between border-b border-black pb-3 text-xs font-mono">
              <span className="font-bold text-[#FF6321] uppercase tracking-wider">
                {isFlipped ? 'RESPOSTA / RESOLUÇÃO' : 'PERGUNTA / CONCEITO ITA'}
              </span>
              <span className="text-black/60 text-[10px] uppercase">Clique no cartão para virar</span>
            </div>

            {/* Card Content */}
            <div className="my-6 text-sm sm:text-base text-black font-medium leading-relaxed">
              {!isFlipped ? (
                <div>
                  {renderRichText(activeCard?.frontText)}

                  {/* Front Attachments */}
                  {activeCard?.frontAttachments && activeCard.frontAttachments.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-black/20 space-y-2">
                      {activeCard.frontAttachments.map((att, i) => (
                        <div key={i}>
                          {att.type === 'image' && (
                            <img src={att.url} alt="Apoio" className="max-h-52 border border-black object-contain" />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  {renderRichText(activeCard?.backText)}

                  {/* Back Attachments */}
                  {activeCard?.backAttachments && activeCard.backAttachments.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-black/20 space-y-3 font-mono text-xs">
                      {activeCard.backAttachments.map((att, i) => (
                        <div key={i}>
                          {att.type === 'image' && (
                            <img src={att.url} alt="Apoio" className="max-h-52 border border-black object-contain my-2" />
                          )}
                          {att.type === 'video' && (
                            <a
                              href={att.url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 text-black font-bold hover:underline underline-offset-4"
                            >
                              <Youtube className="w-4 h-4 text-[#FF6321]" /> Assista à explicação do YouTube
                            </a>
                          )}
                          {att.type === 'pdf' && (
                            <a
                              href={att.url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1.5 text-black font-bold hover:underline underline-offset-4"
                            >
                              <FileText className="w-4 h-4 text-black" /> Abrir arquivo PDF de apoio
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer tags */}
            <div className="flex items-center justify-between pt-3 border-t border-black text-xs font-mono">
              <div className="flex items-center gap-1.5">
                {activeCard?.tags.map((tag, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-black text-white text-[10px] font-bold">
                    #{tag}
                  </span>
                ))}
              </div>
              <span className="text-[11px] text-black/70 font-bold">
                Intervalo: {activeCard?.interval} dias | Repetições: {activeCard?.repetition}
              </span>
            </div>
          </div>

          {/* Rating Control Buttons (SM-2 SRS) */}
          {isFlipped ? (
            <div className="bg-white border-2 border-black p-4 space-y-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-center text-xs font-mono font-bold text-black uppercase">
                Como foi a sua retenção desta questão/fórmula?
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                <button
                  onClick={() => handleRate(1)}
                  className="p-3 bg-white text-black border-2 border-black font-bold hover:bg-black hover:text-white transition-all cursor-pointer flex flex-col items-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  <span className="uppercase">Errei (0-1)</span>
                  <span className="text-[10px] font-normal opacity-80 mt-0.5">Revisar em 1 dia</span>
                </button>

                <button
                  onClick={() => handleRate(3)}
                  className="p-3 bg-white text-black border-2 border-black font-bold hover:bg-black hover:text-white transition-all cursor-pointer flex flex-col items-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  <span className="uppercase">Dificuldade (3)</span>
                  <span className="text-[10px] font-normal opacity-80 mt-0.5">Revisar em breve</span>
                </button>

                <button
                  onClick={() => handleRate(4)}
                  className="p-3 bg-white text-black border-2 border-black font-bold hover:bg-black hover:text-white transition-all cursor-pointer flex flex-col items-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  <span className="uppercase">Bom (4)</span>
                  <span className="text-[10px] font-normal opacity-80 mt-0.5">Avança intervalo</span>
                </button>

                <button
                  onClick={() => handleRate(5)}
                  className="p-3 bg-[#FF6321] text-black border-2 border-black font-bold hover:bg-black hover:text-white transition-all cursor-pointer flex flex-col items-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  <span className="uppercase">Perfeito (5)</span>
                  <span className="text-[10px] font-normal opacity-80 mt-0.5">Memorizado!</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <button
                onClick={() => setIsFlipped(true)}
                className="w-full py-3.5 bg-black hover:bg-[#FF6321] hover:text-black text-white font-mono font-bold text-xs uppercase border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
              >
                Revelar Resposta e Fórmulas
              </button>
            </div>
          )}
        </div>
      )}

      {/* Add Flashcard Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border-2 border-black max-w-xl w-full p-6 space-y-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] my-8">
            <div className="flex items-center justify-between border-b border-black pb-4">
              <h3 className="text-base font-serif font-black text-black italic flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#FF6321]" />
                Criar Flashcard ITA com Suporte Multimídia
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-black hover:bg-black hover:text-white border border-black p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCard} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-black font-bold uppercase text-[10px] mb-1">Matéria:</label>
                  <select
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value as Subject)}
                    className="w-full bg-[#F7F3EF] border border-black text-black text-xs p-2.5 focus:outline-none"
                  >
                    <option value="Matemática">Matemática</option>
                    <option value="Física">Física</option>
                    <option value="Química">Química</option>
                  </select>
                </div>

                <div>
                  <label className="block text-black font-bold uppercase text-[10px] mb-1">Frente:</label>
                  <select
                    value={newFrenteId}
                    onChange={(e) => setNewFrenteId(e.target.value)}
                    className="w-full bg-[#F7F3EF] border border-black text-black text-xs p-2.5 focus:outline-none"
                  >
                    {frentes.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.id} - {f.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-black font-bold uppercase text-[10px] mb-1">Assunto / Tópico:</label>
                <input
                  type="text"
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  placeholder="Ex: Números Complexos - Forma Polar e Moivre"
                  className="w-full bg-[#F7F3EF] border border-black text-black text-xs p-2.5 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-black font-bold uppercase text-[10px] mb-1">
                  Frente do Cartão (Pergunta / Conceito / Sintaxe LaTeX $ e $$):
                </label>
                <textarea
                  rows={3}
                  value={newFrontText}
                  onChange={(e) => setNewFrontText(e.target.value)}
                  placeholder="Qual é a 1ª Lei de Moivre para $z^n$ e como é usada no ITA?"
                  className="w-full bg-[#F7F3EF] border border-black text-black text-xs p-2.5 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-black font-bold uppercase text-[10px] mb-1">
                  Verso do Cartão (Resposta / Resolução / Fórmula):
                </label>
                <textarea
                  rows={4}
                  value={newBackText}
                  onChange={(e) => setNewBackText(e.target.value)}
                  placeholder="Fórmula: $$z^n = |z|^n (\\cos(n\\theta) + i \\sin(n\\theta))$$. No ITA, usamos para potenciação rápida..."
                  className="w-full bg-[#F7F3EF] border border-black text-black text-xs p-2.5 focus:outline-none"
                  required
                />
              </div>

              {/* Multimedia attachments inputs */}
              <div className="border-t border-black pt-3 space-y-3">
                <h5 className="text-xs font-bold text-black uppercase">Anexos Multimídia (Opcional):</h5>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-black/70 mb-1 flex items-center gap-1 font-bold uppercase text-[10px]">
                      <ImageIcon className="w-3.5 h-3.5 text-black" /> Link de Imagem:
                    </label>
                    <input
                      type="url"
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      placeholder="https://.../diagrama.png"
                      className="w-full bg-[#F7F3EF] border border-black text-black text-xs p-2 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-black/70 mb-1 flex items-center gap-1 font-bold uppercase text-[10px]">
                      <Youtube className="w-3.5 h-3.5 text-[#FF6321]" /> Link de Vídeo YouTube:
                    </label>
                    <input
                      type="url"
                      value={newYoutubeUrl}
                      onChange={(e) => setNewYoutubeUrl(e.target.value)}
                      placeholder="https://youtube.com/watch?v=..."
                      className="w-full bg-[#F7F3EF] border border-black text-black text-xs p-2 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-black">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 bg-white text-black font-bold text-xs uppercase border border-black hover:bg-black hover:text-white transition-all cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#FF6321] text-black font-bold text-xs uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-all cursor-pointer"
                >
                  Salvar Flashcard
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
