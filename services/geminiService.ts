import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY ist nicht gesetzt. KI-Funktionen sind deaktiviert.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateContent = async (prompt: string): Promise<string> => {
  if (!API_KEY) {
    return "KI-Dienst ist nicht verfügbar. Bitte konfigurieren Sie den API-Schlüssel.";
  }
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `
        Du bist ein Content-Writer für eine Web-Agentur namens "Webmen". 
        Erstelle Inhalte basierend auf dem folgenden Prompt. 
        Der Ton sollte professionell, innovativ und fachkundig sein.
        Die Ausgabe sollte reiner Text sein, ohne Markdown-Formatierung, es sei denn, sie ist Teil des Inhalts selbst.

        Prompt: "${prompt}"
      `,
    });
    return response.text;
  } catch (error) {
    console.error("Fehler beim Generieren von Inhalten mit Gemini:", error);
    if (error instanceof Error) {
        return `Ein Fehler ist beim Generieren des Inhalts aufgetreten: ${error.message}`;
    }
    return "Ein unbekannter Fehler ist beim Generieren des Inhalts aufgetreten.";
  }
};