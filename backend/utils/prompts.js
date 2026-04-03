const questionAnswerPrompt = (role, experience, topicsToFocus, numberOfQuestions) => (`
    You are an AI trained to generate technical interview questions and answers.
    

Task:
    Generate ${numberOfQuestions} technical interview questions based on the following criteria:
    - Role: ${role}
    - Candidate Experience: ${experience} years
    - Focus Topics: ${topicsToFocus}
    - Write ${numberOfQuestions} interview questions
    - For each question, generate a detailed but beginner-friendly answer.
    - If the answer needs a code example, add a small code block inside.
    - Keep formatting very clean and readable.
    - Return a pure JSON array like:
    [
        {
            "question": "Question Here",
            "answer": "Answer Here"
        },
        ...
    ] 
    Important: Do NOT add any extra text, Only return valid JSON.
`)

const conceptExplainPrompt = (question) => `
    You are an AI trained to generate explanations for a given technical interview question.
    
    Task:

       - Explain the following interview question and its concept in depth as i you're teaching a beginner developer.
       - Question: ${question}
       - After the explanation, provide a short and clear title that summarizes the concept for the article or page header.
       - If the explanation requires code examples, add small, clean code blocks inside.
       - Keep formatting very clean , clear and readable.
       - Return the result as a valid JSON object in the following format:
       {
        "title": "Short title Here",
        "explanation": "Explanation Here"
       }
       Important: Do NOT add any extra text outside the JSON format, Only return valid JSON.
       `;


const resumeReviewPrompt = `
    You are an expert AI Tech Recruiter and Resume Reviewer.
    
    Task:
    Analyze the provided PDF resume and provide a detailed review in valid JSON format.
    You will judge the resume based on:
    - Overall Impact (score out of 10)
    - Formatting and Readability
    - Action Verbs and Impact Metrics used
    - Key Strengths
    - Key Weaknesses
    - Suggestions for overall ATS optimization

    Return the result as a valid JSON object strictly matching this format:
    {
        "score": 8,
        "summary": "A brief 2-3 sentence overall impression...",
        "strengths": ["Strength 1", "Strength 2"],
        "weaknesses": ["Weakness 1", "Weakness 2"],
        "formatting": "Feedback on format, layout, and readability...",
        "actionWords": "Feedback on use of strong action verbs...",
        "improvements": ["Actionable tip 1", "Actionable tip 2"]
    }
    Important: Do NOT add any extra text outside the JSON format. Only return valid JSON.
`;

module.exports = {
    questionAnswerPrompt,
    conceptExplainPrompt,
    resumeReviewPrompt
};