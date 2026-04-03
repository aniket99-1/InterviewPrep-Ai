require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');
const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});
async function run() { 
  try { 
    const response = await ai.models.generateContent({ model: 'gemini-2.5-flash', contents: 'Return a JSON object {"test":"val"}' }); 
    console.log("RESPONSE:", response.text); 
    const rawText = response.text;
    const cleanedText = rawText
      .replace(/^```json\s*/i, "")
      .replace(/```$/i, "")
      .trim();
    console.log("CLEANED TEXT:", cleanedText);
    const data = JSON.parse(cleanedText);
    console.log("PARSED:", data);
  } catch (e) { 
    console.log('ERROR:', e.message); 
  } 
} run();
