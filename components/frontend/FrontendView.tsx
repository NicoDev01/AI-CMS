import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkHtml from 'remark-html';
import { Page, Post } from '../../types';
import { WebmenLogo } from '../common/Logo';

interface FrontendViewProps {
  pages: Page[];
  posts: Post[];
  currentPath: string;
  onNavigate: (path: string) => void;
  onSwitchToCms: () => void;
}

export default function FrontendView({ pages, posts, currentPath, onNavigate, onSwitchToCms }: FrontendViewProps) {

  const stripMarkdown = (markdown: string) => {
    return markdown
      .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
      .replace(/\[.*?\]\(.*?\)/g, '$1') // Replace links with text
      .replace(/#{1,6}\s*/g, '') // Remove headers
      .replace(/\*\*|\*|__|_|\`\`\`|\`/g, '') // Remove bold, italic, code
      .replace(/\n/g, ' ') // Replace newlines with spaces
      .trim();
  };

  const customComponents = {
    h1: ({ children }) => <h1 style={{ fontSize: 'clamp(28px, 5vw, 44px)', color: '#0b2139', lineHeight: '1.2', margin: '0 0 10px 0' }}>{children}</h1>,
    h2: ({ children }) => <h2 style={{ fontSize: 'clamp(22px, 4vw, 28px)', color: '#0b2139', margin: '50px 0 20px 0', lineHeight: '1.3', borderBottom: '2px solid #e6e9ee', paddingBottom: '10px' }}>{children}</h2>,
    p: ({ children }) => <p style={{ fontSize: '1.1rem', marginBottom: '20px' }}>{children}</p>,
    ul: ({ children }) => <ul style={{ listStyle: 'none', paddingLeft: '0' }}>{children}</ul>,
    li: ({ children }) => <li style={{ fontSize: '1.1rem', paddingLeft: '25px', position: 'relative', marginBottom: '10px' }}><span style={{ position: 'absolute', left: '0', top: '2px', color: '#1b5ea6', fontWeight: '700' }}>✓</span>{children}</li>,
    blockquote: ({ children }) => <blockquote style={{ margin: '40px 0', padding: '15px 25px', borderLeft: '4px solid #1b5ea6', background: '#f8fbff', fontSize: '1.2rem', fontStyle: 'italic', color: '#0b2139' }}>{children}</blockquote>,
    img: ({ src, alt }) => <img src={src} alt={alt} style={{ maxWidth: '100%', borderRadius: '10px' }} />,
  };

  const renderContent = () => {
    const page = pages.find(p => p.slug === currentPath);
    if (page) {
      if (page.template === 'blog') {
        return (
          <div>
            <article style={{ maxWidth: '750px', margin: '0 auto', padding: '40px 20px 80px 20px' }}>
              <ReactMarkdown components={customComponents} remarkPlugins={[remarkHtml]}>{page.content}</ReactMarkdown>
            </article>
            <div className="mt-12">
              <h2 className="text-3xl font-bold mb-8">Neueste Beiträge</h2>
              <div className="space-y-12">
                {posts.map(post => (
                  <div key={post.id} className="pb-8 border-b border-gray-200">
                    <h2 className="text-2xl font-bold mb-2 hover:text-webmen-primary transition-colors">
                      <button onClick={() => onNavigate(`/blog/${post.slug}`)}>{post.title}</button>
                    </h2>
                    <p className="text-gray-500 mb-4">Veröffentlicht am: {new Date(post.createdAt).toLocaleDateString()}</p>
                    <p className="prose" style={{ fontSize: '1.1rem', marginBottom: '20px' }}>{stripMarkdown(post.content).substring(0, 200) + '...'}</p>
                    <button onClick={() => onNavigate(`/blog/${post.slug}`)} className="text-webmen-accent font-semibold mt-4 inline-block hover:underline">Weiterlesen →</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      } else if (page.template === 'with-sidebar') {
        return (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <article className="prose lg:prose-xl max-w-none lg:col-span-8">
                <div dangerouslySetInnerHTML={{ __html: page.content }} />
            </article>
            <aside className="lg:col-span-4">
                <div className="sticky top-8 p-6 bg-gray-100 rounded-lg">
                    <h3 className="font-bold text-lg mb-4 text-webmen-text-primary">Neueste Beiträge</h3>
                    <ul>
                        {posts.slice(0, 3).map(post => (
                            <li key={post.id} className="mb-3">
                                <button onClick={() => onNavigate(`/blog/${post.slug}`)} className="text-webmen-accent hover:underline text-left">{post.title}</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>
          </div>
        );
      }

      // Standard-Template
      return (
        <article className="prose lg:prose-xl max-w-4xl mx-auto">
            <div dangerouslySetInnerHTML={{ __html: page.content }} />
        </article>
      );
    }

    if (currentPath.startsWith('/blog/')) {
      const slug = currentPath.replace('/blog/', '');
      const post = posts.find(p => p.slug === slug);
      if (post) {
        return (
          <article style={{ maxWidth: '750px', margin: '0 auto', padding: '40px 20px 80px 20px' }}>
            <header style={{ marginBottom: '30px', textAlign: 'left' }}>
              <h1 style={{ fontSize: 'clamp(28px, 5vw, 44px)', color: '#0b2139', lineHeight: '1.2', margin: '0 0 10px 0' }}>{post.title}</h1>
              <p style={{ color: '#5b6675', fontSize: '0.9rem' }}>Veröffentlicht am: {new Date(post.createdAt).toLocaleDateString()}</p>
            </header>
            <ReactMarkdown components={customComponents} remarkPlugins={[remarkHtml]}>{post.content}</ReactMarkdown>
          </article>
        );
      }
      return <div className="text-center"><h2>Beitrag nicht gefunden</h2><p>Der von Ihnen gesuchte Beitrag konnte nicht gefunden werden.</p></div>;
    }

    return <div className="text-center"><h2>404 - Seite nicht gefunden</h2><p>Die von Ihnen angeforderte Seite existiert nicht.</p></div>;
  };

  return (
    <div className="font-sans text-webmen-text-primary bg-white">
      <header className="p-4 border-b sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <div className="container mx-auto flex justify-between items-center">
            <button onClick={() => onNavigate('/')} className="cursor-pointer">
                <WebmenLogo />
            </button>
            <nav className="flex items-center space-x-6">
            {pages.map(page => (
                <button key={page.id} onClick={() => onNavigate(page.slug)} className={`font-medium text-lg ${currentPath === page.slug || (page.slug === '/blog' && currentPath.startsWith('/blog')) ? 'text-webmen-primary' : 'text-webmen-text-secondary hover:text-webmen-primary'}`}>
                {page.title}
                </button>
            ))}
            </nav>
        </div>
      </header>

      <main className="container mx-auto p-8 md:p-12">
        {renderContent()}
      </main>

      <footer className="mt-16 py-8 bg-gray-100 text-center text-sm text-gray-500 border-t">
        <p>&copy; {new Date().getFullYear()} Webmen. Alle Rechte vorbehalten.</p>
      </footer>
      
      <button 
        onClick={onSwitchToCms}
        className="fixed bottom-4 right-4 bg-webmen-primary text-white font-semibold py-2 px-4 rounded-full shadow-lg hover:bg-webmen-accent transition-transform hover:scale-105"
        >
        Zurück zum CMS
      </button>
    </div>
  );
}
