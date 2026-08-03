import React, { useState } from 'react';
import { DidacticSummary, FrenteInfo } from '../types';
import { FileText, Search, Sparkles, BookOpen, Copy, Check, AlertTriangle, ShieldCheck, Printer, Video } from 'lucide-react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface SummariesViewProps {
  summaries: DidacticSummary[];
  frentes: FrenteInfo[];
}

export const SummariesView: React.FC<SummariesViewProps> = ({
  summaries,
  frentes,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedFrenteId, setSelectedFrenteId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedFormulaIndex, setCopiedFormulaIndex] = useState<string | null>(null);
  
  // Track selected summaries for export
  const [selectedForExport, setSelectedForExport] = useState<Set<string>>(new Set());

  const filteredSummaries = summaries.filter((sum) => {
    if (selectedSubject !== 'all' && sum.subject !== selectedSubject) return false;
    if (selectedFrenteId !== 'all' && sum.frenteId !== selectedFrenteId) return false;
    if (
      searchQuery &&
      !sum.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !sum.topic.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !sum.summaryText.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const renderMathLatex = (latex: string, displayMode = false) => {
    try {
      const html = katex.renderToString(latex, { displayMode, throwOnError: false });
      return <span dangerouslySetInnerHTML={{ __html: html }} />;
    } catch (e) {
      return <code className="font-mono text-amber-300">{latex}</code>;
    }
  };

  const copyFormulaToClipboard = (latex: string, idStr: string) => {
    navigator.clipboard.writeText(latex);
    setCopiedFormulaIndex(idStr);
    setTimeout(() => setCopiedFormulaIndex(null), 2000);
  };

  const toggleExportSelection = (id: string) => {
    setSelectedForExport((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleExportToPDF = () => {
    if (selectedForExport.size === 0) {
      alert('Selecione pelo menos um resumo para exportar (usando os checkboxes).');
      return;
    }

    const summariesToExport = summaries.filter((s) => selectedForExport.has(s.id));
    
    let printContent = `
      <html>
        <head>
          <title>Resumos ITA - Exportação PDF</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&display=swap');
            @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');
            
            body {
              font-family: Arial, sans-serif;
              color: #000;
              margin: 0;
              padding: 20px;
            }
            .summary {
              page-break-after: always;
              margin-bottom: 40px;
            }
            .header {
              border-bottom: 2px solid #000;
              padding-bottom: 10px;
              margin-bottom: 20px;
            }
            .title {
              font-family: 'Playfair Display', serif;
              font-size: 24px;
              font-weight: 900;
              font-style: italic;
              margin: 0 0 10px 0;
            }
            .subtitle {
              font-family: 'JetBrains Mono', monospace;
              font-size: 14px;
              color: #333;
              margin: 0;
            }
            .meta {
              font-family: 'JetBrains Mono', monospace;
              font-size: 12px;
              background: #000;
              color: #fff;
              display: inline-block;
              padding: 4px 8px;
              margin-bottom: 10px;
            }
            .content {
              font-size: 14px;
              line-height: 1.6;
              white-space: pre-wrap;
              margin-bottom: 30px;
            }
            .formulas-title {
              font-family: 'JetBrains Mono', monospace;
              font-size: 16px;
              font-weight: 700;
              margin-bottom: 15px;
            }
            .formula-box {
              border: 1px solid #000;
              padding: 15px;
              margin-bottom: 15px;
              background: #f9f9f9;
            }
            .formula-name {
              font-family: 'JetBrains Mono', monospace;
              font-weight: bold;
              margin-bottom: 10px;
            }
            .formula-latex {
              font-family: 'JetBrains Mono', monospace;
              text-align: center;
              margin-bottom: 10px;
            }
            .formula-exp {
              font-size: 12px;
              color: #444;
              border-top: 1px dashed #ccc;
              padding-top: 10px;
            }
            @media print {
              .summary { page-break-inside: avoid; }
            }
          </style>
          <!-- KaTeX CSS for rendering math in the print window -->
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css" integrity="sha384-GvrOXuhMATgEsSwCs4smul74iXGOixntILdUW9XmUC6+HX0sLNAK3q71bZlhw50s" crossorigin="anonymous">
        </head>
        <body>
    `;

    summariesToExport.forEach((sum) => {
      printContent += `
        <div class="summary">
          <div class="header">
            <div class="meta">\${sum.subject} (\${sum.frenteId}) - \${sum.topic}</div>
            <h1 class="title">\${sum.title}</h1>
            <p class="subtitle">\${sum.subtitle}</p>
          </div>
          <div class="content">\${sum.summaryText}</div>
      `;

      if (sum.formulas && sum.formulas.length > 0) {
        printContent += `
          <div class="formulas-title">Fórmulas Essenciais & Deduções Chave:</div>
        `;
        sum.formulas.forEach((form) => {
          let renderedLatex = form.latex;
          try {
            renderedLatex = katex.renderToString(form.latex, { displayMode: true, throwOnError: false });
          } catch(e) {}
          
          printContent += `
            <div class="formula-box">
              <div class="formula-name">\${form.name}</div>
              <div class="formula-latex">\${renderedLatex}</div>
              <div class="formula-exp">\${form.explanation}</div>
            </div>
          `;
        });
      }
      
      printContent += `</div>`;
    });

    printContent += `
        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 500);
          }
        </script>
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(printContent);
      printWindow.document.close();
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-white rounded-none p-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-black text-xs font-mono font-bold uppercase tracking-widest flex items-center gap-2 mb-1">
            <BookOpen className="w-4 h-4 text-[#FF6321]" />
            Base Teórica Completa e Didática
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-black tracking-tight italic">
            Resumos Teóricos com Fórmulas e Pegadinhas do ITA
          </h2>
          <p className="text-xs sm:text-sm text-black/80 mt-1 max-w-xl">
            Sintetizados com o mais alto nível de rigor exigido no ITA: dedução de fórmulas, condições de contorno, gráficos e dicas de prova.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-72 font-mono text-xs">
            <Search className="w-4 h-4 text-black absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar fórmula ou assunto..."
              className="w-full bg-[#F7F3EF] border border-black pl-9 pr-4 py-2 text-xs text-black placeholder-black/50 focus:outline-none"
            />
          </div>
          <button
            onClick={handleExportToPDF}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-black text-white font-mono font-bold text-xs uppercase border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer active:translate-y-0.5 active:shadow-none hover:bg-[#FF6321] hover:text-black w-full sm:w-auto"
            title="Exportar os resumos selecionados para PDF"
          >
            <Printer className="w-4 h-4" />
            Exportar ({selectedForExport.size})
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border-2 border-black p-4 flex flex-wrap items-center gap-4 text-xs font-mono shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
        <span className="text-black font-bold uppercase">Filtrar por:</span>

        <div>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="bg-[#F7F3EF] border border-black text-black font-bold px-3 py-1.5 focus:outline-none"
          >
            <option value="all">Todas as Matérias</option>
            <option value="Matemática">Matemática</option>
            <option value="Física">Física</option>
            <option value="Química">Química</option>
            <option value="Português">Português</option>
            <option value="Inglês">Inglês</option>
            <option value="Redação">Redação</option>
          </select>
        </div>

        <div>
          <select
            value={selectedFrenteId}
            onChange={(e) => setSelectedFrenteId(e.target.value)}
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
          {filteredSummaries.length} resumos disponíveis
        </span>
      </div>

      {/* Summaries List */}
      <div className="space-y-8">
        {filteredSummaries.length === 0 ? (
          <div className="bg-white border-2 border-black p-12 text-center text-black/70 text-xs font-mono shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            Nenhum resumo encontrado com os filtros selecionados. Tente limpar a busca!
          </div>
        ) : (
          filteredSummaries.map((sum) => (
            <div
              key={sum.id}
              className={`bg-white border-2 border-black p-6 sm:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-6 relative transition-colors ${selectedForExport.has(sum.id) ? 'bg-orange-50' : ''}`}
            >
              {/* Export Checkbox */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                <label className="flex items-center gap-2 cursor-pointer font-mono text-xs font-bold">
                  <input 
                    type="checkbox" 
                    checked={selectedForExport.has(sum.id)}
                    onChange={() => toggleExportSelection(sum.id)}
                    className="w-4 h-4 cursor-pointer accent-[#FF6321]"
                  />
                  Exportar
                </label>
              </div>

              {/* Badge & Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-black pb-4 pr-24">
                <div className="w-full">
                  <div className="flex items-center gap-2 mb-1 font-mono text-xs">
                    <span className="px-2.5 py-0.5 text-[11px] font-bold bg-black text-white border border-black">
                      {sum.subject} ({sum.frenteId})
                    </span>
                    <span className="text-xs text-black/80 font-bold uppercase">{sum.topic}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-black text-black italic">{sum.title}</h3>
                  <p className="text-xs font-mono text-black/80 mt-1">{sum.subtitle}</p>
                </div>

                <div className="flex flex-wrap gap-2 w-full mt-2">

                  <a
                    href={`https://www.youtube.com/results?search_query=aula+${encodeURIComponent(sum.topic)}+${encodeURIComponent(sum.subject)}+ITA`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-red-600 hover:text-white text-black font-mono font-bold text-xs uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                  >
                    <Video className="w-4 h-4" />
                    Pesquisar Videoaulas
                  </a>
                </div>
              </div>

              {/* Main Summary Text */}
              <div className="text-xs sm:text-sm text-black leading-relaxed font-sans whitespace-pre-wrap">
                {sum.summaryText}
              </div>

              {/* Formula Cards */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono font-bold text-black uppercase tracking-wider flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#FF6321]" />
                  Fórmulas Essenciais & Deduções Chave:
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {sum.formulas.map((form, fIdx) => {
                    const idStr = `${sum.id}-f-${fIdx}`;
                    const isCopied = copiedFormulaIndex === idStr;

                    return (
                      <div
                        key={fIdx}
                        className="bg-[#F7F3EF] border-2 border-black p-4 flex flex-col justify-between shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                      >
                        <div>
                          <div className="flex items-center justify-between text-xs font-mono font-bold text-black mb-2">
                            <span>{form.name}</span>
                            <button
                              onClick={() => copyFormulaToClipboard(form.latex, idStr)}
                              className="text-black hover:bg-black hover:text-white p-1 border border-black cursor-pointer"
                              title="Copiar fórmula em LaTeX"
                            >
                              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          </div>

                          <div className="my-3 bg-white p-3 border border-black text-center font-mono text-black overflow-x-auto">
                            {renderMathLatex(form.latex, true)}
                          </div>
                        </div>

                        <p className="text-[11px] font-mono text-black/80 mt-2 border-t border-black/20 pt-2">
                          {form.explanation}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Tips and Common Traps */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 font-mono">
                {/* Dicas ITA */}
                <div className="bg-[#F7F3EF] border-2 border-black p-4 space-y-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <h5 className="text-xs font-bold text-black uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#FF6321]" /> Dicas de Prova ITA:
                  </h5>
                  <ul className="space-y-1.5 text-xs text-black/90 list-disc list-inside">
                    {sum.itaTips.map((tip, idx) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                </div>

                {/* Pegadinhas */}
                <div className="bg-[#F7F3EF] border-2 border-black p-4 space-y-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <h5 className="text-xs font-bold text-black uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-[#FF6321]" /> Cuidado com Pegadinhas!
                  </h5>
                  <ul className="space-y-1.5 text-xs text-black/90 list-disc list-inside">
                    {sum.commonTraps.map((trap, idx) => (
                      <li key={idx}>{trap}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
