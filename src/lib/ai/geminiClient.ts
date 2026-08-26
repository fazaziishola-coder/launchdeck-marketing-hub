import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY || '';

export const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export async function generateWithGemini(prompt: string, systemInstruction?: string): Promise<string> {
  if (!ai || !process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not set. Using multi-provider fallback.');
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction || 'You are an expert AI growth marketer and startup advisor.',
        temperature: 0.7,
      },
    });

    return response.text || '';
  } catch (error: any) {
    console.warn('[Gemini Client] Gemini API Error:', error?.message || error);
    throw error;
  }
}
