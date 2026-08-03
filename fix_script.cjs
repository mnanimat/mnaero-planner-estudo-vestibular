const fs = require('fs');
let code = fs.readFileSync('src/components/SevenStagesView.tsx', 'utf8');

const regex = /return \([ \t\r\n]*<\/div>[ \t\r\n]*<textarea/;
const replacement = `              return (
                <button
                  key={stg.id}
                  onClick={() => setActiveStageTab(stg.id)}
                  className={\`flex flex-col items-center justify-center p-2 border-2 transition-all cursor-pointer \${
                    isSelected ? 'border-black bg-black text-white shadow-[2px_2px_0px_0px_rgba(255,99,33,1)]' : 'border-black bg-white text-black hover:bg-black/5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                  }\`}
                >
                  <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold">
                    <stg.icon className="w-3.5 h-3.5" />
                    <span>{stg.number}</span>
                  </div>
                  {isDone && <Check className="w-3.5 h-3.5 text-emerald-500 mt-1" />}
                </button>
              );
            })}
          </div>

          <div className="bg-[#F7F3EF] border-2 border-black p-4 mt-6 flex items-start gap-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            {stageList.map(stg => (
              stg.id === activeStageTab && (
                <div key={stg.id} className="flex-1">
                  <h3 className="font-serif italic font-bold text-black text-lg mb-1 flex items-center gap-2">
                    <stg.icon className={\`w-5 h-5 \${stg.color.split(' ')[0]}\`} />
                    Etapa {stg.number}: {stg.label}
                  </h3>
                  <p className="text-black/80 font-mono text-xs">{stg.desc}</p>
                </div>
              )
            ))}
          </div>

          {/* Mark as Complete Toggle */}
          <div className="mt-6 flex justify-end">
            <label className="flex items-center gap-2 cursor-pointer group">
              <span className="font-mono text-xs font-bold text-black uppercase">
                Marcar Etapa como Concluída
              </span>
              <input
                type="checkbox"
                checked={currentProgress.completedStages[activeStageTab]}
                onChange={() => handleToggleStage(activeStageTab)}
                className="w-5 h-5 accent-[#FF6321] cursor-pointer"
              />
            </label>
          </div>

          <div className="mt-8 border-t-2 border-black border-dashed pt-8">
            {/* Stage 1: Aula */}
            {activeStageTab === '1-aula' && (
              <div className="space-y-4 text-sm text-black">
                <p>
                  A 1ª Etapa é o seu primeiro contato. Foque em entender a lógica das fórmulas ao invés de apenas decorá-las. No ITA, as videoaulas são o mapa, mas o terreno se ganha nas questões.
                </p>
              </div>
            )}
            
            {/* Stage 2: Resumo */}
            {activeStageTab === '2-resumo' && (
              <div className="space-y-4 text-sm text-black">
                <p>
                  Sintetize os conceitos vitais, fórmulas e truques em suas próprias palavras. Consulte a aba <strong>Resumo ITA</strong> se precisar de uma referência de ouro.
                </p>
              </div>
            )}
            
            {/* Stage 3: Autoexplicação */}
            {activeStageTab === '3-autoexplicacao' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h4 className="font-serif italic font-bold text-black text-sm flex items-center gap-2">
                    <Brain className="w-4 h-4 text-[#FF6321]" />
                    Técnica de Feynman: Explique o assunto sem consultar fontes!
                  </h4>
                </div>
            <textarea`;

if(regex.test(code)){
    code = code.replace(regex, replacement);
    fs.writeFileSync('src/components/SevenStagesView.tsx', code, 'utf8');
    console.log('Replaced');
} else {
    console.log('Not replaced');
}
