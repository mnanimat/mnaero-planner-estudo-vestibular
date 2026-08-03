var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_url = require("url");
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);
var import_meta = {};
import_dotenv.default.config();
var __filename = (0, import_url.fileURLToPath)(import_meta.url);
var __dirname = import_path.default.dirname(__filename);
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use(import_express.default.json({ limit: "10mb" }));
  let aiClient = null;
  function getAI() {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        throw new Error("GEMINI_API_KEY is not configured.");
      }
      aiClient = new import_genai.GoogleGenAI({ apiKey });
    }
    return aiClient;
  }
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: (/* @__PURE__ */ new Date()).toISOString() });
  });
  app.post("/api/ai/tutor", async (req, res) => {
    try {
      const { prompt, context } = req.body;
      const ai = getAI();
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Voc\xEA \xE9 um tutor especialista de alt\xEDssimo n\xEDvel em exames do ITA (Instituto Tecnol\xF3gico de Aeron\xE1utica).
Sua miss\xE3o \xE9 ajudar o estudante com explica\xE7\xF5es extremamente rigorosas por\xE9m did\xE1ticas, com foco nas pegadinhas, matem\xE1tica e f\xEDsica avan\xE7adas, equa\xE7\xF5es e m\xE9todos do ITA.

Contexto do aluno: ${context || "Estudando para o vestibular ITA"}
Pergunta/Demanda: ${prompt}

Responda em Portugu\xEAs do Brasil com formata\xE7\xE3o limpa em Markdown. Se houver f\xF3rmulas, use sintaxe em LaTeX (como $E = mc^2$ ou $$\\int_{0}^{\\infty} x dx$$).`
      });
      res.json({ success: true, text: response.text });
    } catch (err) {
      console.error("Error in Gemini API:", err?.message || err);
      res.status(500).json({
        success: false,
        error: err?.message || "Erro ao comunicar com a IA do Gemini."
      });
    }
  });
  app.post("/api/ai/generate-cards", async (req, res) => {
    try {
      const { subject, topic, count = 3 } = req.body;
      const ai = getAI();
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Gere ${count} flashcards de alto n\xEDvel para o vestibular ITA sobre o assunto "${topic}" da mat\xE9ria "${subject}".
Retorne ESTRITAMENTE um array JSON v\xE1lido sem marca\xE7\xE3o de c\xF3digo fora do JSON ou retorne dentro de \`\`\`json ... \`\`\`.
Cada objeto deve conter:
- "front": Pergunta ou conceito desafiador do ITA (pode conter nota\xE7\xE3o LaTeX com $ ou $$).
- "back": Resposta detalhada, passo a passo, f\xF3rmula chave e dica do ITA.
- "tags": Array de tags (ex: ["ITA", "${subject}", "F\xF3rmula"]).`
      });
      const rawText = response.text || "";
      const jsonMatch = rawText.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        const cards = JSON.parse(jsonMatch[0]);
        res.json({ success: true, cards });
      } else {
        res.status(500).json({ success: false, error: "Formato inv\xE1lido retornado pela IA." });
      }
    } catch (err) {
      res.status(500).json({ success: false, error: err?.message || "Erro ao gerar flashcards." });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
