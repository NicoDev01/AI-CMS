import React from 'react';

interface StatCardProps {
  label: string;
  value: number;
  icon: JSX.Element;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon }) => (
  <div className="bg-ai-cms-background p-6 rounded-lg border border-ai-cms-border flex items-center space-x-4">
    <div className="bg-ai-cms-accent p-3 rounded-full text-white">
      {icon}
    </div>
    <div>
      <p className="text-3xl font-bold text-ai-cms-text-primary">{value}</p>
      <p className="text-ai-cms-text-secondary">{label}</p>
    </div>
  </div>
);

interface DashboardProps {
  pagesCount: number;
  postsCount: number;
  mediaCount: number;
}

export default function Dashboard({ pagesCount, postsCount, mediaCount }: DashboardProps) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-ai-cms-text-primary mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard label="Seiten gesamt" value={pagesCount} icon={<PagesIcon />} />
        <StatCard label="Beiträge gesamt" value={postsCount} icon={<PostsIcon />} />
        <StatCard label="Medienobjekte" value={mediaCount} icon={<MediaIcon />} />
      </div>
      <div className="mt-10 bg-ai-cms-sidebar/60 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-ai-cms-text-primary mb-4">Willkommen beim AI-CMS</h2>
        <p className="text-ai-cms-text-secondary">
          Dies ist Ihre zentrale Anlaufstelle zur Verwaltung aller Inhalte Ihrer Website. Sie können neue Seiten erstellen, Blog-Beiträge verfassen und Ihre Medienbibliothek über die Seitenleiste verwalten.
        </p>
        <p className="text-ai-cms-text-secondary mt-4">
          Nutzen Sie die Kraft der KI, um Inhaltsentwürfe zu erstellen, indem Sie in den Seiten- und Beitragseditoren auf die Schaltfläche "Mit KI generieren" klicken.
        </p>
      </div>
    </div>
  );
}

// Icons
const PagesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>;
const PostsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const MediaIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
