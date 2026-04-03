require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

async function listModels() {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const modelsResponse = await ai.models.list();
    let models = [];
    for await (const m of modelsResponse) {
        models.push(m.name);
    }
    console.log("AVAILABLE MODELS:", models);
  } catch (e) {
    console.error("ERROR:", e.message);
  }
}
listModels();
