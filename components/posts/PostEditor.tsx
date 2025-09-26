import React, { useState, useEffect, useRef } from 'react';
import { Post, EditorMode, Media } from '../../types';
import { generateContent } from '../../services/geminiService';
import AiModal from '../common/AiModal';
import MediaSelectionModal from '../common/MediaSelectionModal';

interface PostEditorProps {
  post: Post | null;
  onSave: (post: Post) => void;
  onCancel: () => void;
  mode: EditorMode;
  media: Media[];
}

export default function PostEditor({ post, onSave, onCancel, mode, media }: PostEditorProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<'published' | 'draft'>('draft');
  const [slug, setSlug] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (mode === 'edit' && post) {
      setTitle(post.title);
      setContent(post.content);
      setStatus(post.status);
      setSlug(post.slug);
    } else {
      setTitle('');
      setContent('');
      setStatus('draft');
      setSlug('');
    }
  }, [post, mode]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (mode === 'create') {
        setSlug(newTitle.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
    }
  };

  const handleSave = (publish: boolean) => {
    const now = new Date().toISOString();
    const finalStatus = publish ? 'published' : 'draft';
    
    if (mode === 'edit' && post) {
      onSave({
        ...post,
        title,
        content,
        slug,
        status: finalStatus,
        updatedAt: now,
      });
    } else {
      onSave({
        id: `post-${Date.now()}`,
        title,
        content,
        slug,
        status: finalStatus,
        createdAt: now,
        updatedAt: now,
      });
    }
  };
  
  const handleGenerateContent = async (prompt: string) => {
    setIsGenerating(true);
    const generated = await generateContent(prompt);
    setContent(content + '\n' + generated);
    setIsGenerating(false);
    setIsModalOpen(false);
  };

  const handleInsertMedia = (mediaItem: Media) => {
    const imgMarkdown = `![${mediaItem.fileName}](${mediaItem.url})`;

    if (contentRef.current) {
        const { selectionStart, selectionEnd } = contentRef.current;
        const newContent = content.substring(0, selectionStart) + imgMarkdown + content.substring(selectionEnd);
        setContent(newContent);

        const newCursorPosition = selectionStart + imgMarkdown.length;
        setTimeout(() => {
            contentRef.current?.setSelectionRange(newCursorPosition, newCursorPosition);
            contentRef.current?.focus();
        }, 0);
    } else {
        setContent(content + '\n' + imgMarkdown);
    }
    setIsMediaModalOpen(false);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-webmen-text-primary mb-8">{mode === 'edit' ? 'Beitrag bearbeiten' : 'Neuen Beitrag erstellen'}</h1>
      
      <div className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-webmen-text-secondary">Titel</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            className="mt-1 block w-full bg-webmen-background border border-webmen-border rounded-md shadow-sm py-2 px-3 text-webmen-text-primary focus:outline-none focus:ring-webmen-accent focus:border-webmen-accent sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-webmen-text-secondary">Slug</label>
          <input
            type="text"
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="mt-1 block w-full bg-webmen-background border border-webmen-border rounded-md shadow-sm py-2 px-3 text-webmen-text-primary focus:outline-none focus:ring-webmen-accent focus:border-webmen-accent sm:text-sm"
            />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="content" className="block text-sm font-medium text-webmen-text-secondary">Inhalt (Markdown)</label>
            <div className="flex items-center space-x-2">
                <button
                    onClick={() => setIsMediaModalOpen(true)}
                    className="flex items-center text-sm bg-gray-600 text-white font-semibold py-1 px-3 rounded-lg hover:bg-gray-700 transition-colors"
                    title="Medium einfügen"
                >
                    <PlusIcon /> Medien
                </button>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center text-sm bg-webmen-accent text-white font-semibold py-1 px-3 rounded-lg hover:bg-webmen-primary transition-colors"
                >
                    <SparklesIcon/> Mit KI generieren
                </button>
            </div>
          </div>
          <textarea
            ref={contentRef}
            id="content"
            rows={15}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 block w-full bg-webmen-background border border-webmen-border rounded-md shadow-sm py-2 px-3 text-webmen-text-primary focus:outline-none focus:ring-webmen-accent focus:border-webmen-accent sm:text-sm font-mono"
          />
        </div>
      </div>
      
      <div className="mt-8 flex justify-end space-x-4">
        <button onClick={onCancel} className="bg-webmen-text-secondary text-white font-semibold py-2 px-4 rounded-lg hover:bg-webmen-text-primary transition-colors">Abbrechen</button>
        <button onClick={() => handleSave(false)} className="bg-webmen-sidebar border border-webmen-border text-webmen-text-primary font-semibold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">Entwurf speichern</button>
        <button onClick={() => handleSave(true)} className="bg-webmen-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-webmen-accent transition-colors">
          {mode === 'edit' && post?.status === 'published' ? 'Aktualisieren' : 'Veröffentlichen'}
        </button>
      </div>

       <AiModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onGenerate={handleGenerateContent}
        isGenerating={isGenerating}
      />
      <MediaSelectionModal
        isOpen={isMediaModalOpen}
        onClose={() => setIsMediaModalOpen(false)}
        onSelect={handleInsertMedia}
        media={media}
      />
    </div>
  );
}

const SparklesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm8 0a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0V6h-1a1 1 0 110-2h1V3a1 1 0 011-1zm-3 8a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" clipRule="evenodd" /></svg>;
const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" /></svg>;
