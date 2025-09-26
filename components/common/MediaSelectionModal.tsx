import React from 'react';
import { Media } from '../../types';

interface MediaSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (media: Media) => void;
  media: Media[];
}

export default function MediaSelectionModal({ isOpen, onClose, onSelect, media }: MediaSelectionModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-webmen-background rounded-lg shadow-xl p-6 w-full max-w-4xl h-[80vh] flex flex-col border border-webmen-border">
        <div className="flex justify-between items-center mb-4 flex-shrink-0">
          <h2 className="text-xl font-bold text-webmen-text-primary">Medium auswählen</h2>
          <button onClick={onClose} className="text-webmen-text-secondary hover:text-webmen-text-primary text-3xl leading-none">&times;</button>
        </div>
        <div className="overflow-y-auto">
          {media.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {media.map((item) => (
                <div 
                  key={item.id} 
                  className="group relative bg-webmen-sidebar rounded-lg overflow-hidden border border-webmen-border cursor-pointer"
                  onClick={() => onSelect(item)}
                  aria-label={`Medium ${item.fileName} auswählen`}
                >
                  <img src={item.url} alt={item.fileName} className="w-full h-32 object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                     <p className="text-white text-sm font-bold opacity-0 group-hover:opacity-100">Auswählen</p>
                  </div>
                  <div className="p-2">
                     <p className="text-xs text-webmen-text-secondary truncate">{item.fileName}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-webmen-text-secondary text-center py-8">Keine Medien in der Bibliothek gefunden.</p>
          )}
        </div>
      </div>
    </div>
  );
}