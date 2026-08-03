import React, { useState } from 'react';
import { VideoLesson, FrenteInfo, Subject } from '../types';
import { Youtube, Play, Clock, Sparkles, CheckCircle2, ExternalLink, X, Search, Plus, BookOpen, Filter } from 'lucide-react';

interface VideoLessonsViewProps {
  videos: VideoLesson[];
  frentes: FrenteInfo[];
  onStartPomodoroForVideo: (video: VideoLesson) => void;
}

export const VideoLessonsView: React.FC<VideoLessonsViewProps> = ({
  videos,
  frentes,
  onStartPomodoroForVideo,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedPhase, setSelectedPhase] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeVideoModal, setActiveVideoModal] = useState<VideoLesson | null>(null);

  // Custom Youtube link importer state
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [customYoutubeUrl, setCustomYoutubeUrl] = useState('');
  const [customTitle, setCustomTitle] = useState('');
  const [customSubject, setCustomSubject] = useState<Subject>('Matemática');
  const [customTopic, setCustomTopic] = useState('');
  const [localVideos, setLocalVideos] = useState<VideoLesson[]>(videos);

  // Quick search topic shortcuts
  const topicShortcuts = [
    { label: '📐 Complexos & Moivre', query: 'Números Complexos forma trigonométrica ITA' },
    { label: '⚛️ Mecânica & Colisões', query: 'Mecânica quantidade de movimento colisões ITA' },
    { label: '⚡ Eletromagnetismo & Kirchhoff', query: 'Eletrodinâmica leis de Kirchhoff ITA' },
    { label: '🧪 Equilíbrio Iônico & Ksp', query: 'Equilíbrio Iônico Ksp tampão ITA' },
    { label: '📚 Sintaxe & Regência (1ª Fase)', query: 'Português análise sintática regência crase ITA' },
    { label: '🇬🇧 Inglês Scientific Reading', query: 'Inglês vestibular ITA reading comprehension connectors' },
    { label: '✍️ Redação ITA (2ª Fase)', query: 'Redação vestibular ITA estrutura discursiva filósofos' },
  ];

  const handleSearchOnYoutubeTab = (query: string) => {
    const fullQuery = query.toLowerCase().includes('ita') ? query : `${query} vestibular ITA`;
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(fullQuery)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleAddCustomVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customYoutubeUrl) return;

    let youtubeId = '';
    // Extract video ID from URL or raw ID
    if (customYoutubeUrl.includes('v=')) {
      youtubeId = customYoutubeUrl.split('v=')[1]?.split('&')[0] || '';
    } else if (customYoutubeUrl.includes('youtu.be/')) {
      youtubeId = customYoutubeUrl.split('youtu.be/')[1]?.split('?')[0] || '';
    } else {
      youtubeId = customYoutubeUrl.trim();
    }

    if (!youtubeId) {
      alert('Por favor insira um link do YouTube válido (ex: https://www.youtube.com/watch?v=...)');
      return;
    }

    const newVid: VideoLesson = {
      id: `custom-vid-${Date.now()}`,
      subject: customSubject,
      frenteId: 'CUSTOM',
      topic: customTopic || 'Aula Importada pelo Aluno',
      title: customTitle || 'Videoaula do YouTube (Personalizada)',
      channelName: 'Canal do YouTube',
      duration: 'Importado',
      youtubeId: youtubeId,
      recommendedStages: ['1-aula', '4-questoes'],
      phase: 'ambas'
    };

    setLocalVideos([newVid, ...localVideos]);
    setIsImportModalOpen(false);
    setCustomYoutubeUrl('');
    setCustomTitle('');
    setCustomTopic('');
    setActiveVideoModal(newVid);
  };

  const filteredVideos = localVideos.filter((vid) => {
    if (selectedSubject !== 'all' && vid.subject !== selectedSubject) return false;
    if (selectedPhase !== 'all' && vid.phase && vid.phase !== 'ambas' && vid.phase !== selectedPhase) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = vid.title.toLowerCase().includes(q);
      const matchTopic = vid.topic.toLowerCase().includes(q);
      const matchChannel = vid.channelName.toLowerCase().includes(q);
      const matchSubject = vid.subject.toLowerCase().includes(q);
      return matchTitle || matchTopic || matchChannel || matchSubject;
    }
    return true;
  });

  return (
    <div className="space-y-8 pb-12 font-mono">
      {/* Main Header */}
      <div className="bg-white rounded-none p-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-black text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-2 mb-1">
            <Youtube className="w-4 h-4 text-[#FF6321]" />
            Buscador & Curadoria do YouTube para o ITA
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-black tracking-tight italic">
            Videoaulas Mapeadas por Assunto
          </h2>
          <p className="text-xs sm:text-sm text-black/80 mt-1 max-w-xl font-sans">
            Pesquise aulas em tempo real no YouTube para qualquer assunto do ITA ou escolha entre os melhores professores cadastrados.
          </p>
        </div>

        <button
          onClick={() => setIsImportModalOpen(true)}
          className="flex items-center gap-2 px-5 py-3 bg-[#FF6321] hover:bg-black hover:text-white text-black font-bold text-xs uppercase border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer font-mono shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Colar Link de Aula do YouTube</span>
        </button>
      </div>

      {/* YouTube Direct Search Bar Engine */}
      <div className="bg-zinc-900 text-white p-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-[#FF6321]" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              Pesquisar Aulas Diretamente no YouTube para o ITA
            </h3>
          </div>
          <span className="text-[10px] text-zinc-400 bg-zinc-800 px-2 py-1 border border-zinc-700 hidden sm:inline-block">
            Procura em todos os canais especializados
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Digite o assunto (ex: 'Moivre Complexos ITA', 'Ksp Química', 'Regência Português ITA')..."
              className="w-full bg-black border-2 border-zinc-700 text-white px-4 py-3 text-xs focus:border-[#FF6321] focus:outline-none placeholder:text-zinc-500 font-mono"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3.5 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            onClick={() => handleSearchOnYoutubeTab(searchQuery || 'vestibular ITA videoaula')}
            className="px-6 py-3 bg-[#FF6321] hover:bg-white text-black font-extrabold text-xs uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0"
          >
            <Youtube className="w-4 h-4 fill-current" />
            <span>Pesquisar no YouTube</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Quick Search Shortcut Chips */}
        <div>
          <span className="text-[10px] font-bold uppercase text-zinc-400 block mb-2">
            Atalhos de Pesquisa por Assunto da Prova:
          </span>
          <div className="flex flex-wrap gap-2">
            {topicShortcuts.map((sc, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSearchQuery(sc.query);
                  handleSearchOnYoutubeTab(sc.query);
                }}
                className="px-3 py-1.5 bg-zinc-800 hover:bg-[#FF6321] hover:text-black text-zinc-300 text-[11px] font-medium border border-zinc-700 transition-all flex items-center gap-1.5 cursor-pointer font-sans"
              >
                <span>{sc.label}</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-60" />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="bg-white p-4 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#FF6321]" />
          <span className="font-bold text-black uppercase">Filtrar Aulas da Plataforma:</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Subject Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-black/70">Matéria:</span>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="bg-[#F7F3EF] border border-black text-black font-bold px-3 py-1.5 focus:outline-none"
            >
              <option value="all">Todas ({localVideos.length})</option>
              <option value="Matemática">Matemática</option>
              <option value="Física">Física</option>
              <option value="Química">Química</option>
              <option value="Português">Português</option>
              <option value="Inglês">Inglês</option>
              <option value="Redação">Redação</option>
            </select>
          </div>

          {/* Phase Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-black/70">Fase ITA:</span>
            <select
              value={selectedPhase}
              onChange={(e) => setSelectedPhase(e.target.value)}
              className="bg-[#F7F3EF] border border-black text-black font-bold px-3 py-1.5 focus:outline-none"
            >
              <option value="all">Todas as Fases</option>
              <option value="1a">1ª Fase Objetiva</option>
              <option value="2a">2ª Fase Discursiva</option>
            </select>
          </div>
        </div>
      </div>

      {/* Video Cards Grid */}
      {filteredVideos.length === 0 ? (
        <div className="p-12 text-center bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4">
          <Youtube className="w-12 h-12 text-zinc-400 mx-auto" />
          <p className="text-base font-bold text-black">Nenhuma videoaula encontrada com os filtros selecionados.</p>
          <p className="text-xs text-black/70 max-w-md mx-auto font-sans">
            Você pode pesquisar diretamente no YouTube usando o botão acima ou colar o link de qualquer vídeo para assistir no app.
          </p>
          <button
            onClick={() => handleSearchOnYoutubeTab(searchQuery || 'vestibular ITA')}
            className="px-5 py-2.5 bg-[#FF6321] text-black font-bold text-xs uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white cursor-pointer inline-flex items-center gap-2"
          >
            <Search className="w-4 h-4" />
            <span>Buscar "{searchQuery || 'aulas ITA'}" no YouTube</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((vid) => (
            <div
              key={vid.id}
              className="bg-white border-2 border-black overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all group"
            >
              <div>
                {/* Thumbnail Container */}
                <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden border-b-2 border-black">
                  <img
                    src={`https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg`}
                    alt={vid.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300 opacity-90 group-hover:opacity-100"
                  />
                  <button
                    onClick={() => setActiveVideoModal(vid)}
                    className="absolute inset-0 m-auto w-14 h-14 bg-[#FF6321] text-black border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer transform group-hover:scale-110"
                  >
                    <Play className="w-6 h-6 fill-current ml-1" />
                  </button>
                  <span className="absolute bottom-2 right-2 bg-black text-white text-[10px] font-mono font-bold px-2 py-0.5 border border-black">
                    {vid.duration}
                  </span>
                  {vid.phase && vid.phase !== 'ambas' && (
                    <span className="absolute top-2 left-2 bg-[#FF6321] text-black text-[10px] font-mono font-bold px-2 py-0.5 border border-black uppercase">
                      {vid.phase === '1a' ? '1ª Fase' : '2ª Fase'}
                    </span>
                  )}
                </div>

                {/* Body */}
                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-2 font-mono text-xs">
                    <span className="text-[10px] font-bold uppercase bg-black text-white px-2 py-0.5 border border-black">
                      {vid.subject} ({vid.frenteId})
                    </span>
                    <span className="text-[11px] text-black/70 font-bold truncate">{vid.channelName}</span>
                  </div>

                  <h3 className="font-serif font-bold text-black text-base line-clamp-2 italic leading-snug">
                    {vid.title}
                  </h3>
                  <p className="text-xs font-mono text-black/70 line-clamp-1">{vid.topic}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-4 bg-[#F7F3EF] border-t-2 border-black space-y-2">
                <div className="flex items-center justify-between gap-2 font-mono text-xs">
                  <button
                    onClick={() => onStartPomodoroForVideo(vid)}
                    className="flex items-center gap-1.5 text-xs font-bold text-black hover:text-[#FF6321] p-1 cursor-pointer uppercase"
                  >
                    <Clock className="w-3.5 h-3.5 text-[#FF6321]" />
                    Iniciar Pomodoro
                  </button>

                  <button
                    onClick={() => setActiveVideoModal(vid)}
                    className="flex items-center gap-1 text-xs font-bold text-black bg-white border border-black px-3 py-1.5 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white cursor-pointer uppercase"
                  >
                    Assistir <ExternalLink className="w-3 h-3" />
                  </button>
                </div>

                {/* Search YouTube for similar topic button */}
                <button
                  onClick={() => handleSearchOnYoutubeTab(`${vid.topic} ${vid.subject} ITA`)}
                  className="w-full py-1.5 text-[11px] font-bold text-zinc-700 hover:text-black border border-dashed border-zinc-400 hover:border-black bg-white hover:bg-zinc-100 flex items-center justify-center gap-1 transition-all cursor-pointer"
                >
                  <Search className="w-3 h-3 text-[#FF6321]" />
                  <span>Pesquisar outras aulas sobre este assunto no YouTube</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Embedded YouTube Modal */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border-2 border-black max-w-4xl w-full p-6 space-y-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-fade-in">
            <div className="flex items-center justify-between border-b-2 border-black pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase bg-[#FF6321] text-black px-2 py-0.5 border border-black">
                  {activeVideoModal.subject} • {activeVideoModal.topic}
                </span>
                <h3 className="font-serif font-black text-black text-lg italic line-clamp-1 mt-1">{activeVideoModal.title}</h3>
                <span className="text-xs font-mono text-black/70">{activeVideoModal.channelName}</span>
              </div>
              <button
                onClick={() => setActiveVideoModal(null)}
                className="text-black hover:bg-black hover:text-white border border-black p-1.5 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="aspect-video w-full border-2 border-black overflow-hidden bg-black shadow-inner">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideoModal.youtubeId}?autoplay=1`}
                title={activeVideoModal.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 font-mono text-xs">
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    onStartPomodoroForVideo(activeVideoModal);
                    setActiveVideoModal(null);
                  }}
                  className="px-4 py-2 bg-[#FF6321] text-black font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white uppercase transition-all cursor-pointer flex items-center gap-2"
                >
                  <Clock className="w-4 h-4" />
                  Iniciar Pomodoro com esta Aula
                </button>

                <button
                  onClick={() => handleSearchOnYoutubeTab(`${activeVideoModal.topic} ITA`)}
                  className="px-3 py-2 bg-zinc-100 text-black font-bold border border-black hover:bg-black hover:text-white uppercase cursor-pointer flex items-center gap-1.5"
                >
                  <Search className="w-3.5 h-3.5 text-[#FF6321]" />
                  <span>Ver + Opções no YouTube</span>
                </button>
              </div>

              <button
                onClick={() => setActiveVideoModal(null)}
                className="px-4 py-2 bg-white text-black font-bold border border-black hover:bg-black hover:text-white uppercase cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import Custom YouTube URL Modal */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border-2 border-black max-w-lg w-full p-6 space-y-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center justify-between border-b-2 border-black pb-3">
              <div className="flex items-center gap-2">
                <Youtube className="w-5 h-5 text-[#FF6321]" />
                <h3 className="font-serif font-black text-black text-base italic">Adicionar Videoaula do YouTube</h3>
              </div>
              <button
                onClick={() => setIsImportModalOpen(false)}
                className="text-black hover:bg-black hover:text-white border border-black p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCustomVideo} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block font-bold mb-1">Link ou ID do Vídeo do YouTube:</label>
                <input
                  type="text"
                  required
                  value={customYoutubeUrl}
                  onChange={(e) => setCustomYoutubeUrl(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full bg-[#F7F3EF] border border-black p-2.5 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Título da Aula (opcional):</label>
                <input
                  type="text"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  placeholder="Ex: Resolução de Questões de Termodinâmica ITA"
                  className="w-full bg-[#F7F3EF] border border-black p-2.5 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Matéria:</label>
                  <select
                    value={customSubject}
                    onChange={(e) => setCustomSubject(e.target.value as Subject)}
                    className="w-full bg-[#F7F3EF] border border-black p-2.5 focus:outline-none font-bold"
                  >
                    <option value="Matemática">Matemática</option>
                    <option value="Física">Física</option>
                    <option value="Química">Química</option>
                    <option value="Português">Português</option>
                    <option value="Inglês">Inglês</option>
                    <option value="Redação">Redação</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold mb-1">Assunto / Tópico:</label>
                  <input
                    type="text"
                    value={customTopic}
                    onChange={(e) => setCustomTopic(e.target.value)}
                    placeholder="Ex: Gases Ideais"
                    className="w-full bg-[#F7F3EF] border border-black p-2.5 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsImportModalOpen(false)}
                  className="px-4 py-2 border border-black hover:bg-black hover:text-white uppercase font-bold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#FF6321] text-black font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white uppercase cursor-pointer"
                >
                  Salvar e Assistir
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

