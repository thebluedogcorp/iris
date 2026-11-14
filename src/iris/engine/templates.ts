/**
 * Iris document templates — starter scenes for the homepage "New from
 * template" picker. Each template returns a fully assembled IrisDoc.
 */

import { ID, IrisDoc, IrisNode, createNode, createDefaultDoc, createPage } from './model';

export interface TemplateDef {
  id: string;
  name: string;
  description: string;
}

export const TEMPLATES: TemplateDef[] = [
  { id: 'mobile', name: 'Mobile App', description: 'iPhone-size screen with header, hero and actions' },
  { id: 'desktop', name: 'Web Wireframe', description: 'Desktop layout with nav, sidebar and content blocks' },
  { id: 'kanban', name: 'Kanban Board', description: 'Three-column board with sample cards' },
  { id: 'poster', name: 'Poster', description: 'A4 poster with gradient hero and headline' },
];

class Builder {
  doc: IrisDoc;
  pageId: ID;

  constructor(name: string) {
    const base = createDefaultDoc();
    const page = createPage('Page 1');
    this.doc = { ...base, name, pages: [page.id], pagesById: { [page.id]: page } };
    this.pageId = page.id;
  }

  add(type: IrisNode['type'], patch: Partial<IrisNode>, parent?: IrisNode | null): IrisNode {
    const node = createNode(type, this.pageId, patch);
    if (parent) {
      node.parentId = parent.id;
      parent.children.push(node.id);
    } else {
      this.doc.pagesById[this.pageId].nodeIds.push(node.id);
    }
    this.doc.nodesById[node.id] = node;
    return node;
  }
}

function buildMobile(): IrisDoc {
  const b = new Builder('Mobile App');
  const phone = b.add('frame', { x: 0, y: 0, w: 390, h: 844, fill: '#FFFFFF', name: 'Phone / Home', cornerRadius: 24 });
  b.add('rect', { x: 0, y: 0, w: 390, h: 120, fill: '#8B5CF6', name: 'Header', cornerRadius: 0 }, phone);
  b.add('text', { x: 24, y: 64, w: 200, h: 24, text: 'Good morning', fontSize: 16, fill: '#E9DDFF', autoWidth: true }, phone);
  b.add('text', { x: 24, y: 88, w: 260, h: 30, text: 'My Workspace', fontSize: 24, fontWeight: 700, fill: '#FFFFFF', autoWidth: true }, phone);
  const hero = b.add('rect', { x: 24, y: 148, w: 342, h: 160, fill: '#F3EEFF', cornerRadius: 16, name: 'Hero card' }, phone);
  void hero;
  b.add('star', { x: 48, y: 180, w: 44, h: 44, fill: '#8B5CF6', starPoints: 5, name: 'Star' }, phone);
  b.add('text', { x: 108, y: 180, w: 240, h: 26, text: 'Weekly digest', fontSize: 18, fontWeight: 600, fill: '#1E1E1E', autoWidth: true }, phone);
  b.add('text', { x: 108, y: 210, w: 240, h: 44, text: 'Your designs improved 32% this week. Keep it up!', fontSize: 13, fill: '#6F6F6F', autoWidth: false }, phone);
  const cta = b.add('rect', { x: 24, y: 330, w: 342, h: 52, fill: '#8B5CF6', cornerRadius: 12, name: 'CTA' }, phone);
  void cta;
  b.add('text', { x: 24, y: 346, w: 342, h: 22, text: 'Continue designing', fontSize: 15, fontWeight: 600, textAlign: 'center', fill: '#FFFFFF', autoWidth: false }, phone);
  const items = ['Recent files', 'Shared with me', 'Templates', 'Settings'];
  items.forEach((label, i) => {
    const y = 410 + i * 64;
    b.add('rect', { x: 24, y, w: 342, h: 52, fill: '#F5F5F5', cornerRadius: 12, name: `Row ${i + 1}` }, phone);
    b.add('ellipse', { x: 40, y: y + 14, w: 24, h: 24, fill: i % 2 === 0 ? '#C4B5FD' : '#A78BFA', name: `Dot ${i + 1}` }, phone);
    b.add('text', { x: 76, y: y + 16, w: 240, h: 20, text: label, fontSize: 14, fill: '#1E1E1E', autoWidth: true }, phone);
    b.add('arrow', { x: 322, y: y + 17, w: 16, h: 0, stroke: '#9A9A9A', strokeWidth: 1.5, name: `Chevron ${i + 1}` }, phone);
  });
  b.add('rect', { x: 0, y: 792, w: 390, h: 52, fill: '#FFFFFF', name: 'Tab bar' }, phone);
  return b.doc;
}

function buildDesktop(): IrisDoc {
  const b = new Builder('Web Wireframe');
  const screen = b.add('frame', { x: 0, y: 0, w: 1440, h: 900, fill: '#FFFFFF', name: 'Desktop / Dashboard' });
  b.add('rect', { x: 0, y: 0, w: 1440, h: 64, fill: '#1E1E1E', name: 'Nav' }, screen);
  b.add('ellipse', { x: 24, y: 16, w: 32, h: 32, fill: '#8B5CF6', name: 'Logo' }, screen);
  b.add('text', { x: 68, y: 22, w: 120, h: 22, text: 'Iris HQ', fontSize: 16, fontWeight: 700, fill: '#FFFFFF', autoWidth: true }, screen);
  ['Product', 'Pricing', 'Docs', 'Blog'].forEach((label, i) => {
    b.add('text', { x: 1080 + i * 90, y: 22, w: 80, h: 20, text: label, fontSize: 13, fill: '#C9C9C9', autoWidth: true }, screen);
  });
  b.add('rect', { x: 0, y: 64, w: 240, h: 836, fill: '#F5F5F5', name: 'Sidebar' }, screen);
  ['Overview', 'Projects', 'Team', 'Analytics', 'Billing'].forEach((label, i) => {
    const y = 96 + i * 44;
    b.add('rect', { x: 16, y, w: 208, h: 32, fill: i === 0 ? '#E9DDFF' : null, stroke: i === 0 ? null : '#E0E0E0', cornerRadius: 8, name: `Nav item ${i + 1}` }, screen);
    b.add('text', { x: 32, y: y + 8, w: 170, h: 18, text: label, fontSize: 13, fill: '#1E1E1E', autoWidth: true }, screen);
  });
  b.add('text', { x: 272, y: 96, w: 400, h: 34, text: 'Dashboard', fontSize: 26, fontWeight: 700, fill: '#1E1E1E', autoWidth: true }, screen);
  // stat cards
  const stats = [
    { label: 'Visitors', value: '12.4k', color: '#8B5CF6' },
    { label: 'Sign-ups', value: '1,204', color: '#A78BFA' },
    { label: 'Revenue', value: '$9.8k', color: '#C4B5FD' },
    { label: 'Churn', value: '2.1%', color: '#DDD6FE' },
  ];
  stats.forEach((s, i) => {
    const x = 272 + i * 282;
    b.add('rect', { x, y: 148, w: 258, h: 108, fill: '#FAFAFA', stroke: '#EAEAEA', cornerRadius: 14, name: `Card ${i + 1}` }, screen);
    b.add('rect', { x: x + 20, y: 168, w: 40, h: 40, fill: s.color, cornerRadius: 10, name: `Icon ${i + 1}` }, screen);
    b.add('text', { x: x + 72, y: 168, w: 160, h: 16, text: s.label, fontSize: 12, fill: '#8A8A8A', autoWidth: true }, screen);
    b.add('text', { x: x + 72, y: 186, w: 160, h: 28, text: s.value, fontSize: 22, fontWeight: 700, fill: '#1E1E1E', autoWidth: true }, screen);
  });
  // chart placeholder + table
  b.add('rect', { x: 272, y: 284, w: 540, h: 320, fill: '#FFFFFF', stroke: '#EAEAEA', cornerRadius: 14, name: 'Chart' }, screen);
  const pts = [30, 55, 40, 90, 70, 120, 100, 150];
  pts.forEach((v, i) => {
    b.add('rect', { x: 300 + i * 62, y: 564 - v, w: 34, h: v, fill: i % 2 === 0 ? '#8B5CF6' : '#C4B5FD', cornerRadius: 6, name: `Bar ${i + 1}` }, screen);
  });
  b.add('rect', { x: 836, y: 284, w: 332, h: 320, fill: '#FFFFFF', stroke: '#EAEAEA', cornerRadius: 14, name: 'Activity' }, screen);
  ['Alia shipped a file', 'Bilal left a comment', 'Mira shared a link', 'Team synced styles'].forEach((label, i) => {
    const y = 316 + i * 64;
    b.add('ellipse', { x: 860, y, w: 28, h: 28, fill: '#E9DDFF', name: `Avatar ${i + 1}` }, screen);
    b.add('text', { x: 900, y: y + 2, w: 250, h: 18, text: label, fontSize: 13, fill: '#1E1E1E', autoWidth: true }, screen);
    b.add('text', { x: 900, y: y + 22, w: 250, h: 14, text: `${i + 1}h ago`, fontSize: 11, fill: '#9A9A9A', autoWidth: true }, screen);
  });
  return b.doc;
}

function buildKanban(): IrisDoc {
  const b = new Builder('Kanban Board');
  b.add('text', { x: 0, y: -40, w: 300, h: 28, text: 'Sprint 12', fontSize: 22, fontWeight: 700, fill: '#FFFFFF', autoWidth: true });
  const columns = [
    { title: 'To do', color: '#9A9A9A', cards: ['Research fonts', 'Wireframe onboarding', 'Audit colors'] },
    { title: 'In progress', color: '#8B5CF6', cards: ['Frame rendering fix', 'Export pipeline'] },
    { title: 'Done', color: '#22C55E', cards: ['Pen tool', 'Auto layout spike', 'Design tokens'] },
  ];
  columns.forEach((col, ci) => {
    const x = ci * 340;
    const frame = b.add('frame', { x, y: 0, w: 320, h: 560, fill: '#2C2C2C', stroke: '#3E3E3E', cornerRadius: 12, name: col.title });
    b.add('ellipse', { x: 20, y: 20, w: 12, h: 12, fill: col.color, name: `Status ${ci + 1}` }, frame);
    b.add('text', { x: 42, y: 16, w: 200, h: 20, text: col.title, fontSize: 15, fontWeight: 600, fill: '#FFFFFF', autoWidth: true }, frame);
    col.cards.forEach((card, i) => {
      const y = 52 + i * 96;
      b.add('rect', { x: 16, y, w: 288, h: 80, fill: '#383838', cornerRadius: 10, name: `Card ${ci + 1}-${i + 1}` }, frame);
      b.add('text', { x: 32, y: y + 14, w: 256, h: 18, text: card, fontSize: 13, fontWeight: 500, fill: '#FFFFFF', autoWidth: true }, frame);
      b.add('rect', { x: 32, y: y + 44, w: 64, h: 18, fill: col.color, cornerRadius: 9, opacity: 0.6, name: `Tag ${ci + 1}-${i + 1}` }, frame);
      b.add('ellipse', { x: 268, y: y + 46, w: 20, h: 20, fill: '#C4B5FD', name: `Assignee ${ci + 1}-${i + 1}` }, frame);
    });
  });
  return b.doc;
}

function buildPoster(): IrisDoc {
  const b = new Builder('Poster');
  const page = b.add('frame', { x: 0, y: 0, w: 794, h: 1123, fill: '#141414', cornerRadius: 0, name: 'A4 Poster' });
  b.add('rect', {
    x: 0,
    y: 0,
    w: 794,
    h: 1123,
    fill: null,
    fillGradient: { type: 'radial', angle: 90, from: '#8B5CF6', to: '#141414' },
    name: 'Backdrop',
  }, page);
  b.add('star', { x: 287, y: 160, w: 220, h: 220, fill: null, stroke: '#C4B5FD', strokeWidth: 1.5, starPoints: 6, innerRadius: 0.62, name: 'Flower' }, page);
  b.add('text', { x: 97, y: 430, w: 600, h: 84, text: 'Design in bloom', fontSize: 64, fontWeight: 700, textAlign: 'center', fill: '#FFFFFF', autoWidth: false }, page);
  b.add('text', { x: 147, y: 530, w: 500, h: 48, text: 'A paper-craft poster made with the Iris vector engine', fontSize: 18, textAlign: 'center', fill: '#C9C9C9', autoWidth: false }, page);
  b.add('line', { x: 297, y: 620, w: 200, h: 0, stroke: '#8B5CF6', strokeWidth: 2, name: 'Divider' }, page);
  b.add('polygon', { x: 322, y: 660, w: 150, h: 130, fill: '#8B5CF6', sides: 3, name: 'Triangle' }, page);
  b.add('text', { x: 247, y: 830, w: 300, h: 20, text: 'iris.studio — 2025', fontSize: 13, textAlign: 'center', fill: '#9A9A9A', letterSpacing: 4, autoWidth: false }, page);
  return b.doc;
}

export function buildTemplate(id: string): IrisDoc {
  switch (id) {
    case 'mobile':
      return buildMobile();
    case 'desktop':
      return buildDesktop();
    case 'kanban':
      return buildKanban();
    case 'poster':
      return buildPoster();
    default: {
      const b = new Builder('Untitled');
      return b.doc;
    }
  }
}
