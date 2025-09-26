import React from 'react';
import { View } from '../../types';
import { AiCmsLogo } from '../common/Logo';

interface SidebarProps {
  currentView: View;
  onNavigate: (view: View) => void;
  onSwitchToFrontend: () => void;
}

const NavLink: React.FC<{ icon: JSX.Element; label: string; isActive: boolean; onClick: () => void; }> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
      isActive ? 'bg-ai-cms-primary/10 text-ai-cms-primary' : 'text-ai-cms-text-secondary hover:bg-gray-200 hover:text-ai-cms-text-primary'
    }`}
  >
    {icon}
    <span className="ml-3">{label}</span>
  </button>
);

const DashboardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const PagesIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>;
const PostsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const MediaIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const ViewIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>

const navItems: { view: View; label: string; icon: JSX.Element }[] = [
  {
    view: 'dashboard',
    label: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    view: 'pages',
    label: 'Seiten',
    icon: <PagesIcon />,
  },
  {
    view: 'posts',
    label: 'Beiträge',
    icon: <PostsIcon />,
  },
  {
    view: 'media',
    label: 'Medien',
    icon: <MediaIcon />,
  },
];

export default function Sidebar({ currentView, onNavigate, onSwitchToFrontend }: SidebarProps) {
  return (
    <aside className="w-64 flex-shrink-0 bg-ai-cms-sidebar border-r border-ai-cms-border p-6 flex flex-col justify-between">
      <div>
        <div className="mb-10 pl-2">
          <AiCmsLogo />
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.view}
              icon={item.icon}
              label={item.label}
              isActive={currentView.startsWith(item.view)}
              onClick={() => onNavigate(item.view)}
            />
          ))}
            <div className="pt-4 mt-4 border-t border-ai-cms-border">
                <NavLink
                  icon={<ViewIcon/>}
                  label="Seite ansehen"
                  isActive={false}
                  onClick={onSwitchToFrontend}
                />
            </div>
        </nav>
      </div>
      <div className="text-ai-cms-text-secondary text-xs text-center">
        <p>© {new Date().getFullYear()} AI-CMS</p>
        <p>Powered by AI</p>
      </div>
    </aside>
  );
}
