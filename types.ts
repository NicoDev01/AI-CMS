export interface Post {
  id: string;
  title: string;
  content: string;
  slug: string;
  status: 'published' | 'draft';
  createdAt: string;
  updatedAt: string;
}

export interface Page {
  id: string;
  title: string;
  content: string;
  slug: string;
  status: 'published' | 'draft';
  template: 'standard' | 'with-sidebar' | 'blog';
  createdAt: string;
  updatedAt: string;
}

export interface Media {
  id: string;
  fileName: string;
  url: string;
  uploadedAt: string;
}

export type View = 'dashboard' | 'pages' | 'posts' | 'media' | 'edit-page' | 'edit-post';

export type EditorMode = 'create' | 'edit';
