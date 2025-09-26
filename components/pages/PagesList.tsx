import React from 'react';
import { Page } from '../../types';

interface PagesListProps {
  pages: Page[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onCreate: () => void;
}

export default function PagesList({ pages, onEdit, onDelete, onCreate }: PagesListProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-webmen-text-primary">Seiten</h1>
        <button
          onClick={onCreate}
          className="bg-webmen-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-webmen-accent transition-colors"
        >
          Neue Seite erstellen
        </button>
      </div>
      <div className="bg-webmen-background shadow rounded-lg overflow-hidden border border-webmen-border">
        <table className="min-w-full">
          <thead className="bg-webmen-sidebar/80">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-webmen-text-secondary uppercase tracking-wider">Titel</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-webmen-text-secondary uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-webmen-text-secondary uppercase tracking-wider">Zuletzt aktualisiert</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-webmen-text-secondary uppercase tracking-wider">Aktionen</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-webmen-border">
            {pages.map((page) => (
              <tr key={page.id} className="hover:bg-webmen-sidebar/50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-webmen-text-primary">{page.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      page.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {page.status === 'published' ? 'Veröffentlicht' : 'Entwurf'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-webmen-text-secondary">{new Date(page.updatedAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => onEdit(page.id)} className="text-webmen-accent hover:text-webmen-primary mr-4">Bearbeiten</button>
                  <button onClick={() => onDelete(page.id)} className="text-red-600 hover:text-red-800">Löschen</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}