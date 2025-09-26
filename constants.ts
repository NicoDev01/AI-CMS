import { Page, Post, Media } from './types';

export const INITIAL_PAGES: Page[] = [
  {
    id: 'page-1',
    title: 'Startseite',
    content: '<h1>Willkommen bei Webmen</h1><p>Dies ist der Inhalt der Startseite. Sie können dies im CMS bearbeiten.</p>',
    slug: '/',
    status: 'published',
    template: 'standard',
    createdAt: '2023-10-26T10:00:00Z',
    updatedAt: '2023-10-27T11:30:00Z',
  },
  {
    id: 'page-2',
    title: 'Über Uns',
    content: '<h2>Über Webmen</h2><p>Wir sind eine Digitalagentur, die sich darauf spezialisiert hat, beeindruckende Weberlebnisse zu schaffen.</p>',
    slug: '/ueber-uns',
    status: 'published',
    template: 'standard',
    createdAt: '2023-10-25T14:00:00Z',
    updatedAt: '2023-10-26T09:00:00Z',
  },
  {
    id: 'page-3',
    title: 'Kontakt',
    content: '<h2>Kontaktieren Sie uns</h2><p>Nehmen Sie Kontakt mit unserem Team auf.</p>',
    slug: '/kontakt',
    status: 'draft',
    template: 'standard',
    createdAt: '2023-10-28T16:00:00Z',
    updatedAt: '2023-10-28T16:00:00Z',
  },
];

export const INITIAL_POSTS: Post[] = [
  {
    id: 'post-1',
    title: 'Die Zukunft der Webentwicklung',
    content: '<p>Erkundung der neuesten Trends in der Webentwicklung für 2024 und darüber hinaus.</p>',
    slug: 'die-zukunft-der-webentwicklung',
    status: 'published',
    createdAt: '2023-10-20T08:00:00Z',
    updatedAt: '2023-10-21T12:45:00Z',
  },
  {
    id: 'post-2',
    title: 'Warum ein Headless CMS die Spielregeln ändert',
    content: '<p>Ein tiefer Einblick in die Vorteile der Headless-Architektur für moderne Websites.</p>',
    slug: 'warum-headless-cms',
    status: 'published',
    createdAt: '2023-10-15T11:00:00Z',
    updatedAt: '2023-10-16T15:20:00Z',
  },
];

export const INITIAL_MEDIA: Media[] = [
  {
    id: 'media-1',
    fileName: 'buero.jpg',
    url: 'https://picsum.photos/seed/picsum1/400/300',
    uploadedAt: '2023-10-24T10:00:00Z',
  },
  {
    id: 'media-2',
    fileName: 'team-meeting.jpg',
    url: 'https://picsum.photos/seed/picsum2/400/300',
    uploadedAt: '2023-10-23T11:00:00Z',
  },
  {
    id: 'media-3',
    fileName: 'code-auf-bildschirm.png',
    url: 'https://picsum.photos/seed/picsum3/400/300',
    uploadedAt: '2023-10-22T12:00:00Z',
  },
];