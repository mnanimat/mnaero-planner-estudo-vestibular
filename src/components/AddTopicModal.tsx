import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  BookOpen, 
  FileText, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  Check, 
  HardDrive, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { FrenteInfo, Subject, StudyStage, AgendaTopic, AgendaStatus } from '../types';

interface AddTopicModalProps {
  isOpen: boolean;
  onClose: () => void;
  frentes: FrenteInfo[];
  onAddTopic: (topic: AgendaTopic) => void;
  initialTopic?: AgendaTopic | null;
}

export const AddTopicModal: React.FC<AddTopicModalProps> = ({
  isOpen,
  onClose,
  frentes,
  onAddTopic,
  initialTopic
}) => {
  if (!isOpen) return null;

  const todayStr = new Date().toISOString().split('T')[0];

  const [subject, setSubject] = useState<Subject>(initialTopic?.subject || 'Matemática');
  const [frenteId, setFrenteId] = useState<string>(
    initialTopic?.frenteId || frentes.find((f) => f.subject === subject)?.id || 'MAT-1'
  );
  const [topicName, setTopicName] = useState(initialTopic?.topicName || '');
  const [startDate, setStartDate] = useState(initialTopic?.startDate || todayStr);
  const [endDate, setEndDate] = useState(initialTopic?.endDate || todayStr);
  const [startTime, setStartTime] = useState(initialTopic?.startTime || '08:00');
  const [endTime, setEndTime] = useState(initialTopic?.endTime || '10:00');
  const [status, setStatus] = useState<AgendaStatus>(initialTopic?.status || 'planejado');
  const [stage, setStage] = useState<StudyStage>(initialTopic?.stage || '1-aula');
  const [notes, setNotes] = useState(initialTopic?.notes || '');
  
  // Google Drive attachment fields
  const [driveUrl, setDriveUrl] = useState(initialTopic?.driveAttachmentUrl || '');
  const [driveName, setDriveName] = useState(initialTopic?.driveAttachmentName || '');
  const [driveType, setDriveType] = useState<'pdf' | 'image' | 'link'>(
    initialTopic?.driveAttachmentType || 'pdf'
  );

  // Filter frentes by selected subject
  const availableFrentes = frentes.filter((f) => f.subject === subject);

  const handleSubjectChange = (newSub: Subject) => {
    setSubject(newSub);
    const firstFrente = frentes.find((f) => f.subject === newSub);
    if (firstFrente) setFrenteId(firstFrente.id);
  };

  const handleDetectDriveUrl = (url: string) => {
    setDriveUrl(url);
    if (!url) return;

    if (url.includes('.pdf') || url.toLowerCase().includes('pdf')) {
      setDriveType('pdf');
    } else if (url.match(/\.(png|jpg|jpeg|gif|webp)/i) || url.includes('image')) {
      setDriveType('image');
    } else {
      setDriveType('pdf');
    }

    if (!driveName && url) {
      // Generate clean default name
      setDriveName(`Resumo_Drive_${subject}_${frenteId}.pdf`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topicName.trim()) {
      alert('Por favor, informe o nome do assunto!');
      return;
    }

    const newAgendaTopic: AgendaTopic = {
      id: initialTopic?.id || `ag-${Date.now()}`,
      subject,
      frenteId,
      topicName: topicName.trim(),
      startDate,
      endDate: endDate < startDate ? startDate : endDate,
      startTime,
      endTime,
      status,
      stage,
      notes: notes.trim(),
      driveAttachmentUrl: driveUrl.trim() || undefined,
      driveAttachmentName: driveName.trim() || (driveUrl ? `Resumo_${topicName.slice(0, 15)}` : undefined),
      driveAttachmentType: driveType,
      color: subject === 'Matemática' ? '#000000' : subject === 'Física' ? '#FF6321' : '#444444'
    };

    onAddTopic(newAgendaTopic);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border-2 border-black max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] my-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-black pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FF6321] text-black border-2 border-black flex items-center justify-center font-bold">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-black text-black italic">
                {initialTopic ? 'Editar Assunto & Agenda' : 'Adicionar Novo Assunto de Estudo'}
              </h3>
              <p className="text-xs font-mono text-black/70">
                Defina horário, datas, cronograma e anexe resumos do Google Drive
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-black hover:bg-black hover:text-white border border-black p-1.5 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 font-mono text-xs">
          {/* Matéria & Frente */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase text-black mb-1">
                Matéria *
              </label>
              <select
                value={subject}
                onChange={(e) => handleSubjectChange(e.target.value as Subject)}
                className="w-full bg-[#F7F3EF] border-2 border-black p-2.5 font-bold text-black focus:outline-none"
              >
                <option value="Matemática">Matemática</option>
                <option value="Física">Física</option>
                <option value="Química">Química</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-black mb-1">
                Frente do Edital ITA *
              </label>
              <select
                value={frenteId}
                onChange={(e) => setFrenteId(e.target.value)}
                className="w-full bg-[#F7F3EF] border-2 border-black p-2.5 font-bold text-black focus:outline-none"
              >
                {availableFrentes.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.id} - {f.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Nome do Assunto */}
          <div>
            <label className="block text-[11px] font-bold uppercase text-black mb-1">
              Nome do Assunto / Tópico *
            </label>
            <input
              type="text"
              required
              value={topicName}
              onChange={(e) => setTopicName(e.target.value)}
              placeholder="Ex: Números Complexos (Forma Trigonométrica e Raízes da Unidade)"
              className="w-full bg-[#F7F3EF] border-2 border-black p-2.5 font-bold text-black focus:outline-none placeholder:text-black/40"
            />
          </div>

          {/* Datas de Início e Fim */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#F7F3EF] p-4 border-2 border-black">
            <div>
              <label className="block text-[11px] font-bold uppercase text-black mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#FF6321]" /> Data de Início *
              </label>
              <input
                type="date"
                required
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  if (endDate < e.target.value) setEndDate(e.target.value);
                }}
                className="w-full bg-white border border-black p-2 font-bold text-black focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-black mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#FF6321]" /> Data de Fim *
              </label>
              <input
                type="date"
                required
                value={endDate}
                min={startDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full bg-white border border-black p-2 font-bold text-black focus:outline-none"
              />
            </div>
          </div>

          {/* Horas de Início e Fim */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#F7F3EF] p-4 border-2 border-black">
            <div>
              <label className="block text-[11px] font-bold uppercase text-black mb-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#FF6321]" /> Hora de Início *
              </label>
              <input
                type="time"
                required
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full bg-white border border-black p-2 font-bold text-black focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-black mb-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#FF6321]" /> Hora de Fim *
              </label>
              <input
                type="time"
                required
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full bg-white border border-black p-2 font-bold text-black focus:outline-none"
              />
            </div>
          </div>

          {/* Status & Etapa */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-bold uppercase text-black mb-1">
                Status no Quadro Kanban
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as AgendaStatus)}
                className="w-full bg-[#F7F3EF] border-2 border-black p-2.5 font-bold text-black focus:outline-none"
              >
                <option value="planejado">Planejado (A Fazer)</option>
                <option value="em_progresso">Em Progresso (Estudando)</option>
                <option value="revisao">Em Revisão (Revisando)</option>
                <option value="concluido">Concluído</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-black mb-1">
                Etapa do Estudo (7 Etapas)
              </label>
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value as StudyStage)}
                className="w-full bg-[#F7F3EF] border-2 border-black p-2.5 font-bold text-black focus:outline-none"
              >
                <option value="1-aula">1 - Assistir Aula / Teoria</option>
                <option value="2-resumo">2 - Resumo Ativo / Esquema</option>
                <option value="3-autoexplicacao">3 - Autoexplicação (Feynman)</option>
                <option value="4-questoes">4 - Resolução de Questões ITA</option>
                <option value="5-revisao">5 - Revisão Espaçada (SRS)</option>
                <option value="6-simulado">6 - Simulado por Tópico</option>
                <option value="7-correcao">7 - Correção & Raio-X de Erros</option>
              </select>
            </div>
          </div>

          {/* Section: Anexo de Resumo no Google Drive */}
          <div className="border-2 border-black p-4 bg-white space-y-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center justify-between border-b border-black/20 pb-2">
              <span className="font-bold text-black uppercase flex items-center gap-2 text-xs">
                <HardDrive className="w-4 h-4 text-[#FF6321]" /> Anexo do Resumo (Google Drive ou Link)
              </span>
              <span className="text-[10px] bg-black text-white px-2 py-0.5 uppercase font-bold">
                PDF / Imagem
              </span>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase text-black/80 mb-1">
                Link do Google Drive (Compartilhável) ou URL do Arquivo
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={driveUrl}
                  onChange={(e) => handleDetectDriveUrl(e.target.value)}
                  placeholder="https://drive.google.com/file/d/.../view ou https://docs.google.com/..."
                  className="flex-1 bg-[#F7F3EF] border border-black p-2 text-xs text-black focus:outline-none placeholder:text-black/40"
                />
                {driveUrl && (
                  <a
                    href={driveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 bg-black text-white hover:bg-[#FF6321] hover:text-black border border-black font-bold flex items-center gap-1 cursor-pointer"
                    title="Testar abrir link no Google Drive"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold uppercase text-black/80 mb-1">
                  Nome Exibido do Anexo
                </label>
                <input
                  type="text"
                  value={driveName}
                  onChange={(e) => setDriveName(e.target.value)}
                  placeholder="Ex: Resumo_Moivre_Complexos.pdf"
                  className="w-full bg-[#F7F3EF] border border-black p-2 text-xs text-black focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-black/80 mb-1">
                  Tipo de Documento
                </label>
                <select
                  value={driveType}
                  onChange={(e) => setDriveType(e.target.value as 'pdf' | 'image' | 'link')}
                  className="w-full bg-[#F7F3EF] border border-black p-2 text-xs text-black focus:outline-none font-bold"
                >
                  <option value="pdf">Documento PDF (Google Drive)</option>
                  <option value="image">Imagem / Diagrama (Google Drive)</option>
                  <option value="link">Link Externo / Documento Web</option>
                </select>
              </div>
            </div>

            <p className="text-[10px] text-black/70 italic">
              * Dica: Cole o link de compartilhamento público ("Qualquer pessoa com o link") do seu Google Drive para visualização direta.
            </p>
          </div>

          {/* Anotações / Observações */}
          <div>
            <label className="block text-[11px] font-bold uppercase text-black mb-1">
              Anotações & Foco da Sessão
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Instruções de estudos, teoremas para provar, número de questões..."
              className="w-full bg-[#F7F3EF] border-2 border-black p-2.5 text-xs text-black focus:outline-none placeholder:text-black/40"
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t-2 border-black">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 bg-white text-black border-2 border-black font-bold uppercase hover:bg-black hover:text-white transition-all cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#FF6321] text-black border-2 border-black font-bold uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-all cursor-pointer flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              <span>{initialTopic ? 'Salvar Alterações' : 'Adicionar Assunto na Agenda'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
