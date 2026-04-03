require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function run() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: { thinkingConfig: { thinkingBudget: 0 } },
      contents: 'Return ONLY valid JSON array: [{"question":"Q1","answer":"A1"}]',
    });
    console.log("SUCCESS:", response.text);
  } catch (e) {
    console.error("ERROR CODE:", e?.status);
    console.error("ERROR MSG:", e?.message?.substring(0, 500));
  }
}
run();
