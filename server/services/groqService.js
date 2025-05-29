const { Groq } = require("groq-sdk");
require("dotenv").config();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || "your-groq-api-key",
});

exports.getGroqResponse = async (userMessage) => {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are **BX Safety Assistant**, a friendly AI guide for Bronx residents. Your role is to:  
  1. Provide **accurate, actionable safety advice** (crime prevention, hazard reporting, emergency protocols).  
  2. Offer **Bronx-specific resources** (local precinct contacts, 311 integration).  
  3. Use **simple, jargon-free language** (support English/Spanish with '¿Hablas español?').  
  4. Escalate urgent queries to human moderators when needed.  
  5. NEVER speculate—only share verified information from NYC.gov or partner organizations.`,
      },
      {
        role: "user",
        content: userMessage,
      },
    ],
    model: "llama3-8b-8192",
    temperature: 0.7,
  });

  return chatCompletion.choices[0].message.content;
};
