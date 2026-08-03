import React from 'react';
import { ShieldCheck, FileText, CheckCircle2, Scale } from 'lucide-react';

interface LicenseAndTermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LicenseAndTermsModal: React.FC<LicenseAndTermsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border-2 border-black max-w-4xl w-full p-6 sm:p-8 space-y-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] font-mono max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-black pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF6321] block">
              MNAero Planner // Documentação Legal & Licença
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-black italic text-black">
              Licença MIT & Termos de Uso
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-black hover:bg-black hover:text-white border-2 border-black p-1.5 font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Developer Attribution Box */}
        <div className="p-4 bg-black text-white border-2 border-black space-y-1">
          <span className="text-[10px] text-[#FF6321] uppercase font-bold tracking-widest block">
            Desenvolvedor do Projeto
          </span>
          <h4 className="text-base font-serif font-black text-white italic">
            Micael Nildo Oliveira Souza
          </h4>
          <p className="text-xs text-zinc-300 font-sans">
            Plataforma MNAero Planner - Ferramenta aberta e gratuita desenvolvida para auxiliar vestibulandos na preparação para o vestibular do ITA.
          </p>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="p-3 bg-[#F7F3EF] border-2 border-black text-xs text-black space-y-1">
          <span className="font-bold text-black uppercase flex items-center gap-1.5 text-[11px]">
            <ShieldCheck className="w-4 h-4 text-[#FF6321]" />
            Aviso de Isenção e Uso de Marca
          </span>
          <p className="text-[11px] text-black/80 font-sans">
            A plataforma MNAero Planner não tem vínculo com o Instituto Tecnológico de Aeronáutica (ITA) e respeita o uso de seu nome dentro da lei.
          </p>
        </div>

        {/* Privacy Policy & Local Storage Terms */}
        <div className="p-4 bg-zinc-900 text-white border-2 border-black space-y-3 text-xs">
          <h5 className="font-bold text-[#FF6321] uppercase border-b border-zinc-700 pb-2 flex items-center gap-2">
            <FileText className="w-4 h-4" /> Política de Privacidade & Termos de Armazenamento Local
          </h5>
          <div className="space-y-2 text-[11px] font-sans text-zinc-300 leading-relaxed">
            <p>
              <strong>1. Armazenamento Exclusivamente Local:</strong> O MNAero Planner opera em modo 100% local e cliente-side. Todas as informações inseridas pelo usuário — incluindo dados cadastrais, matérias, tópicos do cronograma, cartões de flashcards, autoexplicações do método Feynman, diagnósticos de erros, dados do ciclo de estudos e histórico de simulados — são salvas diretamente no armazenamento do seu próprio navegador (<code className="text-[#FF6321]">localStorage</code>).
            </p>
            <p>
              <strong>2. Sem Envio para Servidores Externos ou APIs de IA:</strong> Não realizamos chamadas ou conexões com APIs de inteligência artificial da Gemini, OpenAI ou qualquer outro servidor externo para processar seus dados. A aplicação roda inteiramente de forma autônoma na sua máquina.
            </p>
            <p>
              <strong>3. Controle Absoluto & LGPD:</strong> Em consonância com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018), você possui autonomia irrestrita sobre suas informações. Seus dados nunca são vendidos, compartilhados ou coletados por terceiros. Você pode exportar seu backup local em JSON ou limpar o armazenamento a qualquer momento nas configurações do seu navegador.
            </p>
          </div>
        </div>

        {/* Side-by-Side MIT License Texts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          {/* English Original */}
          <div className="p-4 bg-zinc-900 text-zinc-200 border-2 border-black space-y-2">
            <h5 className="font-bold text-[#FF6321] uppercase border-b border-zinc-700 pb-1 flex items-center gap-1.5">
              <Scale className="w-4 h-4" /> MIT License (Original)
            </h5>
            <div className="text-[10px] leading-relaxed font-mono whitespace-pre-wrap text-zinc-300">
{`MIT License

Copyright (c) 2026 Micael Nildo Oliveira Souza

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`}
            </div>
          </div>

          {/* Portuguese Translation */}
          <div className="p-4 bg-[#F7F3EF] text-black border-2 border-black space-y-2">
            <h5 className="font-bold text-black uppercase border-b-2 border-black pb-1 flex items-center gap-1.5">
              <Scale className="w-4 h-4 text-[#FF6321]" /> Licença MIT (Tradução)
            </h5>
            <div className="text-[10px] leading-relaxed font-sans whitespace-pre-wrap text-black/90">
{`Licença MIT

Direitos Autorais (c) 2026 Micael Nildo Oliveira Souza

É concedida permissão, gratuitamente, a qualquer pessoa que obtenha uma cópia deste software e arquivos de documentação associados (o "Software"), para tratar o Software sem restrição, incluindo, sem limitação, os direitos de usar, copiar, modificar, mesclar, publicar, distribuir, sublicenciar e/ou vender cópias do Software.

O aviso de direitos autorais acima e este aviso de permissão devem ser incluídos em todas as cópias ou partes substanciais do Software.

O SOFTWARE É FORNECIDO "COMO ESTÁ", SEM GARANTIA DE QUALQUER TIPO, EXPRESSA OU IMPLÍCITA. EM NENHUM CASO OS AUTORES OU DETENTORES DOS DIREITOS AUTORAIS SERÃO RESPONSÁVEIS POR QUALQUER RECLAMAÇÃO, DANOS OU OUTRA RESPONSABILIDADE.`}
            </div>
          </div>
        </div>

        {/* Footer Close Button */}
        <div className="flex justify-end pt-3 border-t-2 border-black">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#FF6321] hover:bg-black hover:text-white text-black font-bold text-xs uppercase border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
          >
            Entendido & Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
