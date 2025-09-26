import React from 'react';
import { Media } from '../../types';

interface MediaLibraryProps {
    media: Media[];
    onAdd: () => void;
    onDelete: (id: string) => void;
}

export default function MediaLibrary({ media, onAdd, onDelete }: MediaLibraryProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-webmen-text-primary">Medienbibliothek</h1>
        <button
          onClick={onAdd}
          className="bg-webmen-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-webmen-accent transition-colors"
        >
          Neue Medien hinzufügen
        </button>
      </div>
      <p className="text-webmen-text-secondary mb-6 -mt-4 text-sm">Neue Medien werden zufällig generiert. Das Hochladen von Dateien wird in dieser Demo nicht unterstützt.</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {media.map((item) => (
          <div key={item.id} className="group relative bg-webmen-sidebar rounded-lg overflow-hidden border border-webmen-border">
            <img src={item.url} alt={item.fileName} className="w-full h-40 object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex flex-col justify-end p-3">
              <p className="text-white text-xs font-medium truncate opacity-0 group-hover:opacity-100 transition-opacity">{item.fileName}</p>
              <button
                onClick={() => onDelete(item.id)}
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full h-6 w-6 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-500 transition-all"
                aria-label="Medium löschen"
              >
                <TrashIcon />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;