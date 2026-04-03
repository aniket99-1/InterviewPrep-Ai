// const { GoogleGenerativeAI } = require("@google/generative-ai");
// const {
//   conceptExplainPrompt,
//   questionAnswerPrompt,
// } = require("../utils/prompts");

// const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// // @desc Generate interview questions and answer using gemini
// // @route POST /api/ai/generate-questions
// // @access Private

// const generateInterviewQuestions = async (req, res) => {
//   try {
//     const { role, experience, topicsToFocus, numberOfQuestions } = req.body;
//     if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
//       return res
//         .status(400)
//         .json({ message: "Please provide all the required fields" });
//     }

//     const prompt = questionAnswerPrompt(
//       role,
//       experience,
//       topicsToFocus,
//       numberOfQuestions,
//     );

//     const response = await ai.models.generateContent({
//       model: "gemini-2.0-flash",
//       contents: prompt,
//     });

//     const rawText = response.text;

//     if (!rawText) {
//       throw new Error("Empty response from AI model");
//     }

//     let cleanedText = rawText;
//     const jsonMatch = rawText.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
//     if (jsonMatch) {
//       cleanedText = jsonMatch[1].trim();
//     } else {
//       const firstBrace = rawText.indexOf('[');
//       const lastBrace = rawText.lastIndexOf(']');
//       const firstCurly = rawText.indexOf('{');
//       const lastCurly = rawText.lastIndexOf('}');
      
//       const useArray = firstBrace !== -1 && (firstCurly === -1 || firstBrace < firstCurly);
//       const startIdx = useArray ? firstBrace : firstCurly;
//       const endIdx = useArray ? lastBrace : lastCurly;
      
//       if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
//         cleanedText = rawText.substring(startIdx, endIdx + 1);
//       } else {
//         cleanedText = rawText.trim();
//       }
//     }

//     // now data safe to parse
//     const data = JSON.parse(cleanedText);
//     res.status(200).json(data);
//   } catch (error) {
//     console.error("AI GENERATION ERROR:", error);
//     res.status(500).json({
//       message: "Failed to generate interview questions",
//       error: error.message,
//     });
//   }
// };

// // @desc Generate explains a interview question
// // @route POST /api/ai/generate-explanation
// // @access Private

// const generateConceptExplanation = async (req, res) => {
//   try {
//     const { question } = req.body;
//     if (!question) {
//       return res
//         .status(400)
//         .json({ message: "Please provide a question" });
//     }

//     const prompt = conceptExplainPrompt(question);

//     const response = await ai.models.generateContent({
//       model: "gemini-2.0-flash",
//       contents: prompt,
//     });

//     const rawText = response.text;

//     if (!rawText) {
//       throw new Error("Empty response from AI model");
//     }

//     let cleanedText = rawText;
//     const jsonMatch = rawText.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
//     if (jsonMatch) {
//       cleanedText = jsonMatch[1].trim();
//     } else {
//       cleanedText = rawText.trim();
//     }

//     // now data safe to parse
//     const data = JSON.parse(cleanedText);
//     res.status(200).json(data);
//   } catch (error) {
//     res.status(500).json({
//       message: "Failed to generate concept explanation",
//       error: error.message,
//     });
//   }
// };

// module.exports = {
//   generateInterviewQuestions,
//   generateConceptExplanation,
// };



const { GoogleGenAI } = require("@google/genai");
const fs = require("fs");
const {
  conceptExplainPrompt,
  questionAnswerPrompt,
  resumeReviewPrompt,
} = require("../utils/prompts");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// ================= GENERATE QUESTIONS =================
const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }

    const prompt = questionAnswerPrompt(
      role,
      experience,
      topicsToFocus,
      numberOfQuestions
    );

    // ✅ NEW SDK CALL
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    const rawText = response.text;

    if (!rawText) {
      throw new Error("Empty response from AI model");
    }

    // ✅ Clean JSON
    let cleanedText = rawText;

    const jsonMatch = rawText.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
    if (jsonMatch) {
      cleanedText = jsonMatch[1].trim();
    } else {
      const firstBrace = rawText.indexOf("[");
      const lastBrace = rawText.lastIndexOf("]");
      const firstCurly = rawText.indexOf("{");
      const lastCurly = rawText.lastIndexOf("}");

      const useArray =
        firstBrace !== -1 &&
        (firstCurly === -1 || firstBrace < firstCurly);

      const startIdx = useArray ? firstBrace : firstCurly;
      const endIdx = useArray ? lastBrace : lastCurly;

      if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
        cleanedText = rawText.substring(startIdx, endIdx + 1);
      } else {
        cleanedText = rawText.trim();
      }
    }

    let data;
    try {
      data = JSON.parse(cleanedText);
    } catch (err) {
      console.error("JSON PARSE ERROR:", cleanedText);
      return res.status(500).json({
        message: "AI returned invalid JSON",
      });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("AI GENERATION ERROR:", error);

    res.status(500).json({
      message: "Failed to generate interview questions",
      error: error.message,
    });
  }
};

// ================= GENERATE EXPLANATION =================
const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res
        .status(400)
        .json({ message: "Please provide a question" });
    }

    const prompt = conceptExplainPrompt(question);

    // ✅ NEW SDK CALL
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    const rawText = response.text;

    if (!rawText) {
      throw new Error("Empty response from AI model");
    }

    let cleanedText = rawText;

    const jsonMatch = rawText.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
    if (jsonMatch) {
      cleanedText = jsonMatch[1].trim();
    } else {
      cleanedText = rawText.trim();
    }

    let data;
    try {
      data = JSON.parse(cleanedText);
    } catch (err) {
      console.error("JSON PARSE ERROR:", cleanedText);
      return res.status(500).json({
        message: "AI returned invalid JSON",
      });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("AI EXPLANATION ERROR:", error);

    res.status(500).json({
      message: "Failed to generate concept explanation",
      error: error.message,
    });
  }
};

// ================= REVIEW RESUME =================
const reviewResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please upload a valid PDF resume" });
    }

    // Read file and encode to base64 for Gemini
    const fileBase64 = fs.readFileSync(req.file.path, { encoding: "base64" });

    // Construct the parts block for native document ingestion
    const contents = [
      {
        role: "user",
        parts: [
          { text: resumeReviewPrompt },
          {
            inlineData: {
              data: fileBase64,
              mimeType: req.file.mimetype, // should be "application/pdf"
            },
          },
        ],
      },
    ];

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: contents,
    });

    const rawText = response.text;

    if (!rawText) {
      // Cleanup uploaded file
      fs.unlinkSync(req.file.path);
      throw new Error("Empty response from AI model");
    }

    let cleanedText = rawText;
    const jsonMatch = rawText.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
    if (jsonMatch) {
      cleanedText = jsonMatch[1].trim();
    } else {
      const firstCurly = rawText.indexOf("{");
      const lastCurly = rawText.lastIndexOf("}");
      if (firstCurly !== -1 && lastCurly !== -1 && lastCurly > firstCurly) {
        cleanedText = rawText.substring(firstCurly, lastCurly + 1);
      } else {
        cleanedText = rawText.trim();
      }
    }

    let data;
    try {
      data = JSON.parse(cleanedText);
    } catch (err) {
      console.error("JSON PARSE ERROR:", cleanedText);
      fs.unlinkSync(req.file.path);
      return res.status(500).json({ message: "AI returned invalid JSON" });
    }

    // Cleanup the file once done
    fs.unlinkSync(req.file.path);

    res.status(200).json(data);
  } catch (error) {
    console.error("AI REVIEW ERROR:", error);
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({
      message: "Failed to cleanly review resume.",
      error: error.message,
    });
  }
};

module.exports = {
  generateInterviewQuestions,
  generateConceptExplanation,
  reviewResume,
};