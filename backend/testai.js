require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

async function testai() {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: "Return a JSON array with one object { \"test\": \"value\" }. Only return JSON.",
    });
    console.log("SUCCESS:", response.text);
  } catch (e) {
    console.error("ERROR:", e);
  }
}
testai();
