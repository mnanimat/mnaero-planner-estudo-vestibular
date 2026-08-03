import React, { useState } from 'react';
import { X, Plus, BookPlus, Tag, Trash2, Check, Sparkles, Layers } from 'lucide-react';
import { FrenteInfo, CustomSubject, Subject } from '../types';

interface CustomSubjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  customSubjects: CustomSubject[];
  frentes: FrenteInfo[];
  onAddCustomSubject: (subject: CustomSubject) => void;
  onAddCustomFrente: (frente: FrenteInfo) => void;
  onDeleteCustomSubject?: (id: string) => void;
}

export const CustomSubjectModal: React.FC<CustomSubjectModalProps> = ({
  isOpen,
  onClose,
  customSubjects,
  frentes,
  onAddCustomSubject,
  onAddCustomFrente,
  onDeleteCustomSubject
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'subject' | 'frente'>('subject');

  // Form states for New Subject
  const [newSubjectName, setNewSubjectName] = useState('');
  const [newSubjectColor, setNewSubjectColor] = useState('#FF6321');
  const [newSubjectDesc, setNewSubjectDesc] = useState('');

  // Form states for New Frente
  const [selectedParentSubject, setSelectedParentSubject] = useState<Subject>('Matemática');
  const [newFrenteId, setNewFrenteId] = useState('');
  const [newFrenteName, setNewFrenteName] = useState('');
  const [newFrenteTopics, setNewFrenteTopics] = useState('');

  const handleCreateSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubjectName.trim()) {
      alert('Informe o nome da disciplina!');
      return;
    }

    const createdSub: CustomSubject = {
      id: `sub-${Date.now()}`,
      name: newSubjectName.trim(),
      color: newSubjectColor,
      description: newSubjectDesc.trim() || undefined,
      isCustom: true
    };

    onAddCustomSubject(createdSub);
    setNewSubjectName('');
    setNewSubjectDesc('');
    alert(`Disciplina "${createdSub.name}" adicionada com sucesso!`);
  };

  const handleCreateFrente = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFrenteId.trim() || !newFrenteName.trim()) {
      alert('Preencha a sigla e o nome da Frente!');
      return;
    }

    const topicsList = newFrenteTopics
      .split('\n')
      .map((t) => t.trim())
      .filter(Boolean);

    const createdFrente: FrenteInfo = {
      id: newFrenteId.trim().toUpperCase(),
      subject: selectedParentSubject,
      frenteNumber: frentes.filter((f) => f.subject === selectedParentSubject).length + 1,
      name: newFrenteName.trim(),
      defaultIncidence: 10,
      topics: topicsList.length > 0 ? topicsList : [newFrenteName.trim()]
    };

    onAddCustomFrente(createdFrente);
    setNewFrenteId('');
    setNewFrenteName('');
    setNewFrenteTopics('');
    alert(`Frente "${createdFrente.id} - ${createdFrente.name}" criada com sucesso!`);
  };

  const allSubjectsList = [
    'Matemática',
    'Física',
    'Química',
    ...customSubjects.map((s) => s.name)
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border-2 border-black max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] my-8 font-mono">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-black pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FF6321] text-black border-2 border-black flex items-center justify-center font-bold">
              <BookPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-black text-black italic">
                Disciplinas & Assuntos Personalizados
              </h3>
              <p className="text-xs text-black/70">
                Adicione matérias extras (Redação, Português, Inglês) e tópicos do edital
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

        {/* Tab Switcher */}
        <div className="flex bg-[#F7F3EF] p-1 border-2 border-black text-xs font-bold">
          <button
            onClick={() => setActiveTab('subject')}
            className={`flex-1 py-2 uppercase transition-all cursor-pointer ${
              activeTab === 'subject' ? 'bg-black text-white' : 'text-black hover:bg-black/10'
            }`}
          >
            + Criar Disciplina
          </button>
          <button
            onClick={() => setActiveTab('frente')}
            className={`flex-1 py-2 uppercase transition-all cursor-pointer ${
              activeTab === 'frente' ? 'bg-black text-white' : 'text-black hover:bg-black/10'
            }`}
          >
            + Criar Frente / Assunto
          </button>
        </div>

        {/* TAB 1: ADD CUSTOM SUBJECT */}
        {activeTab === 'subject' && (
          <form onSubmit={handleCreateSubject} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold uppercase text-black mb-1">
                Nome da Nova Disciplina *
              </label>
              <input
                type="text"
                required
                value={newSubjectName}
                onChange={(e) => setNewSubjectName(e.target.value)}
                placeholder="Ex: Redação, Português, Inglês, Biologia..."
                className="w-full bg-[#F7F3EF] border-2 border-black p-2.5 font-bold text-black focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold uppercase text-black mb-1">
                Cor da Badge / Etiqueta
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={newSubjectColor}
                  onChange={(e) => setNewSubjectColor(e.target.value)}
                  className="w-10 h-10 border-2 border-black cursor-pointer"
                />
                <span className="font-mono text-xs font-bold uppercase">{newSubjectColor}</span>
              </div>
            </div>

            <div>
              <label className="block font-bold uppercase text-black mb-1">
                Descrição ou Foco (Opcional)
              </label>
              <input
                type="text"
                value={newSubjectDesc}
                onChange={(e) => setNewSubjectDesc(e.target.value)}
                placeholder="Ex: Foco no padrão dissertativo-argumentativo da 2ª Fase ITA"
                className="w-full bg-[#F7F3EF] border-2 border-black p-2.5 text-black focus:outline-none"
              />
            </div>

            {/* List of Custom Subjects created */}
            {customSubjects.length > 0 && (
              <div className="pt-2 border-t border-black/20 space-y-2">
                <span className="font-bold uppercase text-black block">Disciplinas Criadas:</span>
                <div className="flex flex-wrap gap-2">
                  {customSubjects.map((sub) => (
                    <span
                      key={sub.id}
                      style={{ backgroundColor: sub.color }}
                      className="px-2.5 py-1 text-black font-bold border border-black text-xs uppercase flex items-center gap-2"
                    >
                      {sub.name}
                      {onDeleteCustomSubject && (
                        <button
                          type="button"
                          onClick={() => onDeleteCustomSubject(sub.id)}
                          className="hover:opacity-70 text-black font-extrabold cursor-pointer"
                        >
                          ✕
                        </button>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-3 border-t-2 border-black">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-white text-black border-2 border-black font-bold uppercase cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#FF6321] text-black border-2 border-black font-bold uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Adicionar Disciplina</span>
              </button>
            </div>
          </form>
        )}

        {/* TAB 2: ADD CUSTOM FRENTE / ASSUNTO */}
        {activeTab === 'frente' && (
          <form onSubmit={handleCreateFrente} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold uppercase text-black mb-1">
                Matéria Pertencente *
              </label>
              <select
                value={selectedParentSubject}
                onChange={(e) => setSelectedParentSubject(e.target.value as Subject)}
                className="w-full bg-[#F7F3EF] border-2 border-black p-2.5 font-bold text-black focus:outline-none"
              >
                {allSubjectsList.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold uppercase text-black mb-1">
                  Sigla da Frente *
                </label>
                <input
                  type="text"
                  required
                  value={newFrenteId}
                  onChange={(e) => setNewFrenteId(e.target.value)}
                  placeholder="Ex: RED-1, PORT-2, MAT-5..."
                  className="w-full bg-[#F7F3EF] border-2 border-black p-2.5 font-bold text-black focus:outline-none uppercase"
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-black mb-1">
                  Nome da Frente / Módulo *
                </label>
                <input
                  type="text"
                  required
                  value={newFrenteName}
                  onChange={(e) => setNewFrenteName(e.target.value)}
                  placeholder="Ex: Redação Dissertativa ITA"
                  className="w-full bg-[#F7F3EF] border-2 border-black p-2.5 font-bold text-black focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold uppercase text-black mb-1">
                Tópicos do Edital (Um por linha)
              </label>
              <textarea
                rows={3}
                value={newFrenteTopics}
                onChange={(e) => setNewFrenteTopics(e.target.value)}
                placeholder="Ex:&#10;Tese & Estrutura de Ouro&#10;Repertórios Filosóficos&#10;Coesão & Conectivos de Transição"
                className="w-full bg-[#F7F3EF] border-2 border-black p-2.5 text-black focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t-2 border-black">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-white text-black border-2 border-black font-bold uppercase cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#FF6321] text-black border-2 border-black font-bold uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Salvar Nova Frente</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
