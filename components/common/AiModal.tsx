import React, { useState } from 'react';

interface AiModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (prompt: string) => void;
  isGenerating: boolean;
}

export default function AiModal({ isOpen, onClose, onGenerate, isGenerating }: AiModalProps) {
  const [prompt, setPrompt] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onGenerate(prompt);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-webmen-background rounded-lg shadow-xl p-8 w-full max-w-lg border border-webmen-border">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-webmen-text-primary">Inhalt mit KI generieren</h2>
          <button onClick={onClose} className="text-webmen-text-secondary hover:text-webmen-text-primary">&times;</button>
        </div>
        <p className="text-webmen-text-secondary mb-6 text-sm">Beschreiben Sie den Inhalt, den Sie generieren möchten. Zum Beispiel: "eine Einleitung für einen Blogbeitrag über die Vorteile eines Headless CMS".</p>
        <form onSubmit={handleSubmit}>
          <textarea
            rows={4}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Geben Sie hier Ihre Anweisung ein..."
            className="w-full bg-webmen-sidebar/70 border border-webmen-border rounded-md p-2 text-webmen-text-primary focus:outline-none focus:ring-2 focus:ring-webmen-accent"
            disabled={isGenerating}
          />
          <div className="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-webmen-text-secondary text-white font-semibold py-2 px-4 rounded-lg hover:bg-webmen-text-primary transition-colors"
              disabled={isGenerating}
            >
              Abbrechen
            </button>
            <button
              type="submit"
              className="bg-webmen-accent text-white font-semibold py-2 px-4 rounded-lg hover:bg-webmen-primary transition-colors flex items-center disabled:opacity-50"
              disabled={isGenerating || !prompt.trim()}
            >
              {isGenerating ? (
                <>
                  <Spinner />
                  Generiere...
                </>
              ) : (
                'Generieren'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const Spinner = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);