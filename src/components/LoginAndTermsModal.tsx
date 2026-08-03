import React, { useState } from 'react';
import { ShieldCheck, User, Mail, Calendar, AlertTriangle, FileText, CheckCircle2, Lock, ExternalLink, LogOut, Edit } from 'lucide-react';
import { UserProfile } from '../types';

interface LoginAndTermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUserProfile: UserProfile | null;
  onSaveProfile: (profile: UserProfile) => void;
  onLogout: () => void;
  onOpenLicenseTerms: () => void;
}

export const LoginAndTermsModal: React.FC<LoginAndTermsModalProps> = ({
  isOpen,
  onClose,
  currentUserProfile,
  onSaveProfile,
  onLogout,
  onOpenLicenseTerms
}) => {
  const [name, setName] = useState(currentUserProfile?.name || '');
  const [email, setEmail] = useState(currentUserProfile?.email || '');
  const [birthDate, setBirthDate] = useState(currentUserProfile?.birthDate || '2006-05-15');
  const [hasParentalConsent, setHasParentalConsent] = useState(currentUserProfile?.hasParentalConsent || false);
  const [termsAccepted, setTermsAccepted] = useState(currentUserProfile?.termsAccepted || false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  // Calculate age from birth date
  const calculateAge = (bDate: string) => {
    if (!bDate) return 18;
    const today = new Date();
    const birth = new Date(bDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const currentAge = calculateAge(birthDate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim() || !email.trim() || !birthDate) {
      setErrorMsg('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (!termsAccepted) {
      setErrorMsg('Você precisa aceitar os Termos de Uso e a Política de Privacidade para prosseguir.');
      return;
    }

    const profile: UserProfile = {
      name: name.trim(),
      email: email.trim(),
      birthDate,
      age: currentAge,
      hasParentalConsent: true,
      termsAccepted: true,
      loginDate: new Date().toISOString()
    };

    onSaveProfile(profile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border-2 border-black max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] font-mono max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-black pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF6321] block">
              MNAero Planner // Autenticação & Gating de Idade
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-black italic text-black">
              {currentUserProfile ? 'Editar Dados da Conta Local' : 'Acesso ao MNAero Planner - ITA'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-black hover:bg-black hover:text-white border-2 border-black p-1.5 font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* ITA Legal Disclaimer Banner */}
        <div className="p-3 bg-[#F7F3EF] border-2 border-black text-xs text-black space-y-1">
          <span className="font-bold text-black uppercase flex items-center gap-1.5 text-[11px]">
            <ShieldCheck className="w-4 h-4 text-[#FF6321]" />
            Aviso de Uso Legal do Nome
          </span>
          <p className="text-[10px] text-black/80 font-sans">
            A plataforma MNAero Planner não tem vínculo com o Instituto Tecnológico de Aeronáutica (ITA) e respeita o uso de seu nome dentro da lei.
          </p>
        </div>

        {/* Profile Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            {/* Name */}
            <div>
              <label className="block font-bold text-black uppercase mb-1">
                Nome Completo: *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-black/60 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome completo"
                  className="w-full bg-[#F7F3EF] border-2 border-black pl-9 pr-3 py-2 text-black focus:outline-none focus:bg-white font-sans"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block font-bold text-black uppercase mb-1">
                E-mail: *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-black/60 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu.email@exemplo.com"
                  className="w-full bg-[#F7F3EF] border-2 border-black pl-9 pr-3 py-2 text-black focus:outline-none focus:bg-white font-sans"
                />
              </div>
            </div>

            {/* Birth Date */}
            <div>
              <label className="block font-bold text-black uppercase mb-1">
                Data de Nascimento: *
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-black/60 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="date"
                  required
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full bg-[#F7F3EF] border-2 border-black pl-9 pr-3 py-2 text-black focus:outline-none focus:bg-white font-sans"
                />
              </div>
            </div>

            {/* Age Box */}
            <div className="bg-black text-white p-3 border-2 border-black flex flex-col justify-center">
              <span className="text-[10px] text-zinc-400 uppercase font-bold">Idade Calculada:</span>
              <span className="text-xl font-black text-[#FF6321]">{currentAge} anos</span>
            </div>
          </div>

          {/* Local Storage & Privacy Notice Box */}
          <div className="p-4 bg-zinc-900 text-white border-2 border-black space-y-3 text-xs">
            <div className="flex items-center gap-2 text-[#FF6321] font-bold uppercase text-[11px] border-b border-zinc-700 pb-2">
              <Lock className="w-4 h-4" />
              Armazenamento & Funcionamento 100% Local (Privacidade Total)
            </div>

            <div className="space-y-1.5 text-[11px] font-sans text-zinc-300">
              <p>
                • <strong>Dados Locais Salvos no Navegador:</strong> Todos os seus dados de perfil, cronogramas, flashcards, registros do ciclo de estudos, simulados e notas são salvos e processados estritamente no seu próprio dispositivo (via <code className="text-[#FF6321]">localStorage</code>).
              </p>
              <p>
                • <strong>Sem Envio para APIs de IA Externas:</strong> Nenhuma informação pessoal ou conteúdo de estudo é enviado para servidores de terceiros ou APIs da Gemini / OpenAI. O sistema funciona de maneira autônoma, privativa e transparente.
              </p>
              <p className="text-[10px] text-zinc-400 pt-1 italic border-t border-zinc-800">
                🔒 <strong>Conformidade com a LGPD:</strong> Você tem total soberania sobre seus dados, podendo salvar, exportar ou apagar o histórico local do seu navegador quando quiser.
              </p>
            </div>
          </div>

          {/* Terms Acceptance Checkbox */}
          <div className="pt-2">
            <label className="flex items-start gap-2.5 cursor-pointer font-bold text-black text-xs">
              <input
                type="checkbox"
                required
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="w-4 h-4 accent-[#FF6321] cursor-pointer mt-0.5"
              />
              <span>
                Li e aceito os{' '}
                <button
                  type="button"
                  onClick={onOpenLicenseTerms}
                  className="underline text-[#FF6321] hover:text-black"
                >
                  Termos de Uso, Política de Privacidade e Licença MIT
                </button>
                .
              </span>
            </label>
          </div>

          {/* Error Message Display */}
          {errorMsg && (
            <div className="p-3 bg-rose-100 border-2 border-rose-600 text-rose-900 text-xs font-bold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t-2 border-black">
            {currentUserProfile && (
              <button
                type="button"
                onClick={onLogout}
                className="px-4 py-2 bg-rose-600 hover:bg-black text-white font-bold text-xs uppercase border border-black flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sair da Conta</span>
              </button>
            )}

            <div className="flex items-center gap-3 ml-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 bg-[#F7F3EF] hover:bg-black hover:text-white border-2 border-black font-bold text-xs uppercase cursor-pointer"
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 bg-[#FF6321] hover:bg-black hover:text-white text-black font-bold text-xs uppercase border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
              >
                {currentUserProfile ? 'Salvar Alterações' : 'Confirmar & Entrar'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
