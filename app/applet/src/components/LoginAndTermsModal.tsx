import React, { useState } from 'react';
import { ShieldCheck, Mail, User, Calendar, AlertTriangle, LogOut, Lock, HardDrive } from 'lucide-react';
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
  onOpenLicenseTerms,
}) => {
  const [name, setName] = useState(currentUserProfile?.name || '');
  const [email, setEmail] = useState(currentUserProfile?.email || '');
  const [birthDate, setBirthDate] = useState(currentUserProfile?.birthDate || '');
  const [termsAccepted, setTermsAccepted] = useState(currentUserProfile?.termsAccepted || false);
  const [hasParentalConsent, setHasParentalConsent] = useState(currentUserProfile?.hasParentalConsent || false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  // Calculate age dynamically
  const calculateAge = (dateStr: string): number => {
    if (!dateStr) return 0;
    const today = new Date();
    const birth = new Date(dateStr);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age < 0 ? 0 : age;
  };

  const currentAge = calculateAge(birthDate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Por favor, informe seu nome completo.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Por favor, informe um endereço de e-mail válido.');
      return;
    }

    if (!birthDate) {
      setErrorMsg('Por favor, informe sua data de nascimento.');
      return;
    }

    if (!termsAccepted) {
      setErrorMsg('Você precisa ler e aceitar os Termos de Uso e Política de Privacidade para continuar.');
      return;
    }

    if (currentAge >= 13 && currentAge < 18 && !hasParentalConsent) {
      setErrorMsg('Estudantes entre 13 e 17 anos precisam declarar ter o consentimento de seus pais ou responsáveis.');
      return;
    }

    const updatedProfile: UserProfile = {
      id: currentUserProfile?.id || `usr-${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      birthDate,
      age: currentAge,
      hasParentalConsent: currentAge >= 13 && currentAge < 18 ? hasParentalConsent : true,
      termsAccepted: true,
      acceptedAt: currentUserProfile?.acceptedAt || new Date().toISOString(),
      avatarUrl: currentUserProfile?.avatarUrl,
    };

    onSaveProfile(updatedProfile);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border-2 border-black max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] font-mono max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b-2 border-black pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF6321] block">
              MNAero Planner // Identificação & Privacidade
            </span>
            <h3 className="text-xl font-serif font-black italic text-black">
              {currentUserProfile ? 'Perfil do Estudante' : 'Cadastro Inicial de Estudante'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-black hover:bg-black hover:text-white border-2 border-black p-1 font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="p-3 bg-[#F7F3EF] border-2 border-black text-xs text-black space-y-1">
          <span className="font-bold text-black uppercase flex items-center gap-1.5 text-[11px]">
            <ShieldCheck className="w-4 h-4 text-[#FF6321]" />
            Aviso de Isenção e Autonomia
          </span>
          <p className="text-[11px] text-black/80 font-sans">
            A plataforma MNAero Planner é um sistema independente de estudos sem vínculo formal com o Instituto Tecnológico de Aeronáutica (ITA).
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

          {/* Privacy & Local Storage Guarantee Box */}
          <div className="p-4 bg-zinc-900 text-white border-2 border-black space-y-3 text-xs">
            <div className="flex items-center gap-2 text-[#FF6321] font-bold uppercase text-[11px] border-b border-zinc-700 pb-2">
              <HardDrive className="w-4 h-4" />
              Armazenamento 100% Local no Seu Dispositivo
            </div>
            <div className="space-y-1.5 text-[11px] font-sans text-zinc-300">
              <p>
                • <strong>Privacidade Total:</strong> Todos os seus dados de cadastro, notas de simulados, redações e metas são salvos estritamente no armazenamento local (LocalStorage) do seu próprio dispositivo.
              </p>
              <p>
                • <strong>Sem APIs ou Servidores de Terceiros:</strong> O sistema opera de forma autônoma e offline, garantindo que nenhum dado pessoal seja compartilhado ou enviado a bancos de dados na nuvem.
              </p>

              {/* Parental consent checkbox if age 13-17 */}
              {currentAge >= 13 && currentAge < 18 && (
                <div className="pt-2 border-t border-zinc-700 font-mono">
                  <label className="flex items-center gap-2 cursor-pointer font-bold text-amber-300 text-[11px]">
                    <input
                      type="checkbox"
                      checked={hasParentalConsent}
                      onChange={(e) => setHasParentalConsent(e.target.checked)}
                      className="w-4 h-4 accent-[#FF6321] cursor-pointer"
                    />
                    <span>Declaro ter a autorização dos meus pais ou responsáveis legais para utilização desta ferramenta de estudos.</span>
                  </label>
                </div>
              )}
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
                Li e concordo com os{' '}
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
                {currentUserProfile ? 'Salvar Alterações' : 'Confirmar & Salvar Localmente'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
