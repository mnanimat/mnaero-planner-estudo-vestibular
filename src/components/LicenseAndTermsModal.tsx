import React from 'react';
import { ShieldCheck, FileText, CheckCircle2, Scale, ExternalLink, Youtube, BookOpen, Award, Heart } from 'lucide-react';

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
              Créditos, Licença e Avisos Legais — MNAero Planner
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-black hover:bg-black hover:text-white border-2 border-black p-1.5 font-bold cursor-pointer transition-all"
          >
            ✕
          </button>
        </div>

        {/* Developer & Platform Identity Box */}
        <div className="p-4 bg-black text-white border-2 border-black space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#FF6321] uppercase font-bold tracking-widest block">
              Plataforma Educacional Independente
            </span>
            <span className="bg-[#FF6321] text-black text-[10px] font-bold px-2 py-0.5 uppercase">
              Licença MIT
            </span>
          </div>
          <h4 className="text-base sm:text-lg font-serif font-black text-white italic">
            MNAero Planner // ITA 2027
          </h4>
          <p className="text-xs text-zinc-300 font-sans leading-relaxed">
            Plataforma educacional independente desenvolvida por <strong>Micael Nildo Oliveira Souza</strong> para auxiliar estudantes na preparação de alta performance para o vestibular do Instituto Tecnológico de Aeronáutica (ITA).
          </p>
        </div>

        {/* Créditos e Fontes Originais */}
        <div className="p-4 bg-[#F7F3EF] border-2 border-black space-y-3">
          <h5 className="font-bold text-black uppercase border-b-2 border-black pb-1.5 flex items-center gap-2 text-xs">
            <Award className="w-4 h-4 text-[#FF6321]" /> Créditos e Fontes de Dados
          </h5>
          <div className="space-y-2 text-xs font-sans text-black/90 leading-relaxed">
            <p>
              <strong>Fonte Original:</strong> O material de apoio, enunciados e diretrizes referentes aos exames de admissão presentes nesta plataforma utilizam dados e documentos disponibilizados publicamente no site oficial do Vestibular ITA (
              <a 
                href="https://www.vestibular.ita.br/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#FF6321] underline font-mono font-bold hover:text-black inline-flex items-center gap-0.5"
              >
                https://www.vestibular.ita.br/ <ExternalLink className="w-3 h-3 inline" />
              </a>).
            </p>
            <p>
              <strong>Direitos Autorais:</strong> Todos os direitos sobre as provas originais e marcas registradas pertencem ao Instituto Tecnológico de Aeronáutica (ITA) e ao Comando da Aeronáutica.
            </p>
            <p>
              <strong>Caráter Educacional:</strong> Esta ferramenta foi criada com fins exclusivamente educacionais e de auxílio ao estudante, sem qualquer afiliação, patrocínio ou endorsement oficial do ITA.
            </p>
            <p>
              <strong>Mapeamento de Frequência e Ciclo de Estudos:</strong> Planilha sobre incidência de questões no Prova do Vestibular ITA da marishee ( 
              <a 
                href="https://www.youtube.com/@marishee" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#FF6321] underline font-mono font-bold hover:text-black inline-flex items-center gap-0.5"
              >
                https://www.youtube.com/@marishee <ExternalLink className="w-3 h-3 inline" />
              </a>) foi usada como recurso para a criação da plataforma.
            </p>
          </div>
        </div>

        {/* Termos de Uso e Créditos Completos - Seções 1, 2 e 3 */}
        <div className="space-y-4">
          <h4 className="font-serif font-black text-lg italic border-b-2 border-black pb-1 text-black">
            Termos de Uso e Créditos Completos
          </h4>

          {/* Seção 1 */}
          <div className="p-4 bg-white border-2 border-black space-y-1.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <h5 className="font-bold text-xs uppercase text-[#FF6321] flex items-center gap-2">
              <FileText className="w-4 h-4" /> 1. Licenciamento do Código e Plataforma
            </h5>
            <p className="text-xs font-sans text-black/90 leading-relaxed">
              O MNAero Planner é um software de auxílio ao estudante desenvolvido e disponibilizado sob a <strong>Licença MIT</strong>. O código da plataforma é livre e aberto para fins educacionais.
            </p>
          </div>

          {/* Seção 2 */}
          <div className="p-4 bg-white border-2 border-black space-y-1.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <h5 className="font-bold text-xs uppercase text-[#FF6321] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> 2. Isenção de Vínculo Institucional (ITA)
            </h5>
            <div className="text-xs font-sans text-black/90 space-y-1.5 leading-relaxed">
              <p>
                A plataforma MNAero Planner não possui qualquer vínculo oficial, patrocínio, parceria ou endosso com o Instituto Tecnológico de Aeronáutica (ITA), com o Comando da Aeronáutica ou com a Google LLC.
              </p>
              <p>
                Todas as informações sobre o processo seletivo, matrizes de conteúdos, provas e editais foram obtidas a partir do portal público oficial do Vestibular ITA.
              </p>
              <p>
                As marcas e nomes de instituições mencionadas pertencem aos seus respectivos titulares e são citados exclusivamente para fins de referência de estudo.
              </p>
            </div>
          </div>

          {/* Seção 3 */}
          <div className="p-4 bg-[#F7F3EF] border-2 border-black space-y-2.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <h5 className="font-bold text-xs uppercase text-black border-b border-black/20 pb-1 flex items-center gap-2">
              <Youtube className="w-4 h-4 text-red-600" /> 3. Exibição de Mídia e Videoaulas (YouTube API)
            </h5>
            <div className="text-xs font-sans text-black/90 space-y-2 leading-relaxed">
              <p>
                <strong>Modo de Exibição:</strong> Todas as videoaulas exibidas nesta plataforma são reproduzidas diretamente via tecnologia de incorporação (embed) oficial da API do YouTube.
              </p>
              <p>
                <strong>Propriedade Intelectual e Monetização:</strong> O MNAero Planner não realiza download, hospedagem ou modificação dos arquivos de vídeo. A autoria, direitos autorais, métricas de visualização e monetização (anúncios) pertencem integralmente aos criadores e canais originais do YouTube (como Catálise Vestibulares, Física para ITA/IME - Prof. Renato Brito, Química em Ação - Prof. Paulo Valim, entre outros).
              </p>
              <p>
                <strong>Conformidade Legal:</strong> A reprodução ocorre em estrita conformidade com os Termos de Serviço do YouTube, a Lei de Direitos Autorais Brasileira (Lei nº 9.610/1998 - Art. 46), o Marco Civil da Internet (Lei nº 12.965/2014) e tratados internacionais de propriedade intelectual (Convenção de Berna / WIPO).
              </p>
              <p>
                <strong>Incentivo aos Criadores:</strong> Encorajamos os estudantes a se inscreverem, curtirem e apoiarem os canais originais diretamente no YouTube através dos links fornecidos em cada aula.
              </p>
            </div>
          </div>
        </div>

        {/* Side-by-Side MIT License Texts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono pt-2">
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

