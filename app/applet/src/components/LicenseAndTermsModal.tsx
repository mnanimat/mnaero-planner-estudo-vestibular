import React, { useState } from 'react';
import { ShieldCheck, FileText, CheckCircle2, Scale, HardDrive, Lock, UserCheck } from 'lucide-react';

interface LicenseAndTermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LicenseAndTermsModal: React.FC<LicenseAndTermsModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy' | 'license'>('terms');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border-2 border-black max-w-4xl w-full p-6 sm:p-8 space-y-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] font-mono max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-black pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#FF6321] block">
              MNAero Planner // Documentação Legal, Privacidade e Licença
            </span>
            <h3 className="text-xl sm:text-2xl font-serif font-black italic text-black">
              Termos de Uso & Política de Privacidade (Armazenamento Local)
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
            Plataforma MNAero Planner - Sistema de alta performance com funcionamento 100% local e cliente, projetado para auxiliar vestibulandos na preparação do ITA.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b-2 border-black font-mono text-xs font-bold gap-2">
          <button
            onClick={() => setActiveTab('terms')}
            className={`px-4 py-2 border-t-2 border-x-2 border-black transition-all cursor-pointer ${
              activeTab === 'terms'
                ? 'bg-[#FF6321] text-black shadow-[2px_-2px_0px_0px_rgba(0,0,0,1)]'
                : 'bg-white text-black/70 hover:bg-black/5'
            }`}
          >
            Termos de Uso
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-4 py-2 border-t-2 border-x-2 border-black transition-all cursor-pointer ${
              activeTab === 'privacy'
                ? 'bg-[#FF6321] text-black shadow-[2px_-2px_0px_0px_rgba(0,0,0,1)]'
                : 'bg-white text-black/70 hover:bg-black/5'
            }`}
          >
            Política de Privacidade & Dados
          </button>
          <button
            onClick={() => setActiveTab('license')}
            className={`px-4 py-2 border-t-2 border-x-2 border-black transition-all cursor-pointer ${
              activeTab === 'license'
                ? 'bg-[#FF6321] text-black shadow-[2px_-2px_0px_0px_rgba(0,0,0,1)]'
                : 'bg-white text-black/70 hover:bg-black/5'
            }`}
          >
            Licença MIT
          </button>
        </div>

        {/* TAB 1: TERMOS DE USO */}
        {activeTab === 'terms' && (
          <div className="space-y-4 text-xs font-sans text-black/90 leading-relaxed">
            <div className="p-3 bg-[#F7F3EF] border-2 border-black space-y-1 font-mono">
              <span className="font-bold text-black uppercase flex items-center gap-1.5 text-[11px]">
                <FileText className="w-4 h-4 text-[#FF6321]" />
                1. Natureza do Serviço e Objeto
              </span>
              <p className="text-[11px] text-black/80 font-sans">
                O MNAero Planner é uma aplicação Web progressiva e independente, desenvolvida por Micael Nildo Oliveira Souza com o intuito de organizar e planejar o ciclo de estudos, simulados, revisões espaçadas (SRS) e métricas para o exame vestibular do ITA (Instituto Tecnológico de Aeronáutica).
              </p>
            </div>

            <div className="space-y-2">
              <h5 className="font-mono font-bold text-black uppercase text-xs border-b border-black/20 pb-1">
                2. Autonomia e Ausência de Vínculo Institucional
              </h5>
              <p>
                A plataforma <strong>MNAero Planner não possui qualquer vínculo formal, patrocínio ou afiliação com o Instituto Tecnológico de Aeronáutica (ITA) ou com as Forças Armadas Brasileiras</strong>. As marcas, siglas e nomes de exames são citados estritamente para fins de referência educacional e identificação dos conteúdos programáticos públicos.
              </p>
            </div>

            <div className="space-y-2">
              <h5 className="font-mono font-bold text-black uppercase text-xs border-b border-black/20 pb-1">
                3. Responsabilidade do Usuário
              </h5>
              <p>
                O usuário é o único responsável pela inserção e preservação dos seus dados de estudo na sua própria máquina. Como a aplicação opera de forma 100% local no navegador (client-side), a manutenção do histórico e cadastros depende da preservação do armazenamento local (LocalStorage / Cache) do navegador do usuário.
              </p>
            </div>

            <div className="space-y-2">
              <h5 className="font-mono font-bold text-black uppercase text-xs border-b border-black/20 pb-1">
                4. Gratuidade e Acesso Livre
              </h5>
              <p>
                O uso do MNAero Planner é inteiramente gratuito para fins de estudo e aprendizagem pessoal, sem cobrança de assinaturas ou taxas ocultas.
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: POLÍTICA DE PRIVACIDADE & ARMAZENAMENTO LOCAL */}
        {activeTab === 'privacy' && (
          <div className="space-y-4 text-xs font-sans text-black/90 leading-relaxed">
            <div className="p-4 bg-emerald-50 border-2 border-black space-y-2 font-mono">
              <span className="font-bold text-emerald-900 uppercase flex items-center gap-1.5 text-xs">
                <HardDrive className="w-4 h-4 text-emerald-600" />
                Garantia de Armazenamento 100% Local (Privacy-First)
              </span>
              <p className="text-[11px] text-emerald-950 font-sans">
                <strong>Seus dados pertencem unicamente a você e ficam restritos ao seu dispositivo.</strong> O MNAero Planner não possui banco de dados em nuvem, não realiza rastreamento comercial e não envia nenhuma informação para servidores externos.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-[11px]">
              <div className="p-3 bg-[#F7F3EF] border border-black space-y-1">
                <span className="font-bold text-black uppercase flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-[#FF6321]" />
                  Zero Coleta Externa
                </span>
                <p className="font-sans text-black/80">
                  Nome, e-mail, idade, notas de simulados, redações e metas nunca saem do seu navegador.
                </p>
              </div>

              <div className="p-3 bg-[#F7F3EF] border border-black space-y-1">
                <span className="font-bold text-black uppercase flex items-center gap-1">
                  <UserCheck className="w-3.5 h-3.5 text-[#FF6321]" />
                  Sem Rastreamento de IA
                </span>
                <p className="font-sans text-black/80">
                  Não há chamadas de API do Gemini nem envio de redações ou notas para serviços de terceiros.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="font-mono font-bold text-black uppercase text-xs border-b border-black/20 pb-1">
                Como Funciona a Persistência de Dados (LocalStorage)
              </h5>
              <p>
                Todos os dados gerados — incluindo o registro no ciclo de estudo, cartões de memória (Flashcards), agenda semanal e raio-x de erros — são gravados utilizando a API de <code>localStorage</code> e <code>IndexedDB</code> nativas do seu navegador Web.
              </p>
              <p>
                Para realizar um backup ou transferir seus dados para outro dispositivo, você pode utilizar a opção de exportação local ou manter a sessão no mesmo navegador.
              </p>
            </div>
          </div>
        )}

        {/* TAB 3: LICENÇA MIT */}
        {activeTab === 'license' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
            {/* English Original */}
            <div className="p-4 bg-zinc-900 text-zinc-200 border-2 border-black space-y-2">
              <h5 className="font-bold text-[#FF6321] uppercase border-b border-zinc-700 pb-1 flex items-center gap-1.5">
                <Scale className="w-4 h-4" /> MIT License (Original)
              </h5>
              <div className="text-[10px] leading-relaxed font-mono whitespace-pre-wrap text-zinc-300">{`MIT License

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
SOFTWARE.`}</div>
            </div>

            {/* Portuguese Translation */}
            <div className="p-4 bg-[#F7F3EF] text-black border-2 border-black space-y-2">
              <h5 className="font-bold text-black uppercase border-b-2 border-black pb-1 flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-[#FF6321]" /> Licença MIT (Tradução)
              </h5>
              <div className="text-[10px] leading-relaxed font-sans whitespace-pre-wrap text-black/90">{`Licença MIT

Direitos Autorais (c) 2026 Micael Nildo Oliveira Souza

É concedida permissão, gratuitamente, a qualquer pessoa que obtenha uma cópia deste software e arquivos de documentação associados (o "Software"), para tratar o Software sem restrição, incluindo, sem limitação, os direitos de usar, copiar, modificar, mesclar, publicar, distribuir, sublicenciar e/ou vender cópias do Software.

O aviso de direitos autorais acima e este aviso de permissão devem ser incluídos em todas as cópias ou partes substanciais do Software.

O SOFTWARE É FORNECIDO "COMO ESTÁ", SEM GARANTIA DE QUALQUER TIPO, EXPRESSA OU IMPLÍCITA. EM NENHUM CASO OS AUTORES OU DETENTORES DOS DIREITOS AUTORAIS SERÃO RESPONSÁVEIS POR QUALQUER RECLAMAÇÃO, DANOS OU OUTRA RESPONSABILIDADE.`}</div>
            </div>
          </div>
        )}

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
