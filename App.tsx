import React, { useState, useCallback, useMemo } from 'react';
import { Page, Post, Media, View, EditorMode } from './types';
import { INITIAL_PAGES, INITIAL_POSTS, INITIAL_MEDIA } from './constants';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './components/dashboard/Dashboard';
import PagesList from './components/pages/PagesList';
import PageEditor from './components/pages/PageEditor';
import PostsList from './components/posts/PostsList';
import PostEditor from './components/posts/PostEditor';
import MediaLibrary from './components/media/MediaLibrary';
import FrontendView from './components/frontend/FrontendView';

export default function App() {
  const [view, setView] = useState<View>('dashboard');
  const [pages, setPages] = useState<Page[]>(INITIAL_PAGES);
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [media, setMedia] = useState<Media[]>(INITIAL_MEDIA);
  
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [editorMode, setEditorMode] = useState<EditorMode>('create');

  const [appMode, setAppMode] = useState<'cms' | 'frontend'>('cms');
  const [currentPath, setCurrentPath] = useState('/');

  const handleNavigate = (newView: View) => {
    setEditingPage(null);
    setEditingPost(null);
    setView(newView);
  };

  const handleEditPage = useCallback((pageId: string) => {
    const pageToEdit = pages.find(p => p.id === pageId);
    if (pageToEdit) {
      setEditingPage(pageToEdit);
      setEditorMode('edit');
      setView('edit-page');
    }
  }, [pages]);
  
  const handleCreatePage = useCallback(() => {
    setEditingPage(null);
    setEditorMode('create');
    setView('edit-page');
  }, []);

  const handleSavePage = useCallback((pageData: Page) => {
    if (editorMode === 'edit' && editingPage) {
      setPages(pages.map(p => p.id === pageData.id ? pageData : p));
    } else {
      setPages([...pages, pageData]);
    }
    setView('pages');
    setEditingPage(null);
  }, [pages, editorMode, editingPage]);

  const handleDeletePage = useCallback((pageId: string) => {
    if (window.confirm('Sind Sie sicher, dass Sie diese Seite löschen möchten?')) {
      setPages(pages.filter(p => p.id !== pageId));
    }
  }, [pages]);

  const handleEditPost = useCallback((postId: string) => {
    const postToEdit = posts.find(p => p.id === postId);
    if (postToEdit) {
      setEditingPost(postToEdit);
      setEditorMode('edit');
      setView('edit-post');
    }
  }, [posts]);

  const handleCreatePost = useCallback(() => {
    setEditingPost(null);
    setEditorMode('create');
    setView('edit-post');
  }, []);

  const handleSavePost = useCallback((postData: Post) => {
    if (editorMode === 'edit' && editingPost) {
      setPosts(posts.map(p => p.id === postData.id ? postData : p));
    } else {
      setPosts([...posts, postData]);
    }
    setView('posts');
    setEditingPost(null);
  }, [posts, editorMode, editingPost]);

  const handleDeletePost = useCallback((postId: string) => {
    if (window.confirm('Sind Sie sicher, dass Sie diesen Beitrag löschen möchten?')) {
      setPosts(posts.filter(p => p.id !== postId));
    }
  }, [posts]);
  
  const handleAddMedia = useCallback(() => {
      const newMedia: Media = {
        id: `media-${Date.now()}`,
        fileName: `neues-bild-${Date.now()}.jpg`,
        url: `https://picsum.photos/seed/${Date.now()}/400/300`,
        uploadedAt: new Date().toISOString(),
      };
      setMedia(prevMedia => [newMedia, ...prevMedia]);
  }, []);

  const handleDeleteMedia = useCallback((mediaId: string) => {
    if (window.confirm('Sind Sie sicher, dass Sie dieses Medienelement löschen möchten?')) {
      setMedia(media.filter(m => m.id !== mediaId));
    }
  }, [media]);

  const renderContent = useMemo(() => {
    switch(view) {
      case 'dashboard':
        return <Dashboard pagesCount={pages.length} postsCount={posts.length} mediaCount={media.length} />;
      case 'pages':
        return <PagesList pages={pages} onEdit={handleEditPage} onDelete={handleDeletePage} onCreate={handleCreatePage} />;
      case 'edit-page':
        return <PageEditor page={editingPage} onSave={handleSavePage} onCancel={() => handleNavigate('pages')} mode={editorMode} media={media} />;
      case 'posts':
        return <PostsList posts={posts} onEdit={handleEditPost} onDelete={handleDeletePost} onCreate={handleCreatePost} />;
      case 'edit-post':
        return <PostEditor post={editingPost} onSave={handleSavePost} onCancel={() => handleNavigate('posts')} mode={editorMode} media={media} />;
      case 'media':
        return <MediaLibrary media={media} onAdd={handleAddMedia} onDelete={handleDeleteMedia}/>;
      default:
        return <Dashboard pagesCount={pages.length} postsCount={posts.length} mediaCount={media.length} />;
    }
  }, [view, pages, posts, media, handleEditPage, handleDeletePage, handleCreatePage, editingPage, handleSavePage, editorMode, handleEditPost, handleDeletePost, handleCreatePost, editingPost, handleSavePost, handleAddMedia, handleDeleteMedia]);
  
  if (appMode === 'frontend') {
    return (
      <FrontendView
        pages={pages.filter(p => p.status === 'published')}
        posts={posts.filter(p => p.status === 'published')}
        currentPath={currentPath}
        onNavigate={setCurrentPath}
        onSwitchToCms={() => setAppMode('cms')}
      />
    );
  }

  return (
    <div className="flex h-screen bg-webmen-sidebar text-webmen-text-primary">
      <Sidebar 
        currentView={view} 
        onNavigate={handleNavigate} 
        onSwitchToFrontend={() => {
            setAppMode('frontend');
            setCurrentPath('/');
        }}
        />
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 p-6 md:p-10 overflow-y-auto bg-webmen-background">
          {renderContent}
        </div>
      </main>
    </div>
  );
}