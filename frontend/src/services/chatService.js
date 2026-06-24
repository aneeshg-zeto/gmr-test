import axios from 'axios';

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const SYSTEM_PROMPT = `You are GMR AI, a professional real estate assistant.

You help users with:
- Finding properties by location, budget, bedrooms, and size
- Understanding property prices and market trends
- Explaining home buying, selling, and renting processes
- EMI calculations and home loan guidance
- Property documentation and legal requirements
- Neighbourhood and locality information

Rules:
1. Only answer real estate related questions.
2. If a question is not related to real estate, politely say:
   "I'm a real estate assistant and can only help with property-related questions."
3. Be concise, professional, and helpful.
4. When asked about specific properties or prices, give realistic guidance
   based on general market knowledge.
5. Always encourage users to consult a licensed agent for final decisions.`;

const apiKey = import.meta.env.VITE_GROQ_API_KEY;

export const chatService = {
  async sendMessage(message, history = []) {
    if (!apiKey) {
      throw new Error('VITE_GROQ_API_KEY is not set. Add it to your .env file.');
    }

    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history.slice(-10).filter(m => m.role && m.content),
      { role: 'user', content: message.trim() }
    ];

    const response = await axios.post(
      GROQ_API_URL,
      {
        model: 'llama-3.3-70b-versatile',
        messages,
        temperature: 0.4,
        max_tokens: 600,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        timeout: 30000,
      }
    );

    return { reply: response.data.choices[0].message.content };
  }
};
