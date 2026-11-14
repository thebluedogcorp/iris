(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/iris/engine/model.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Iris document model.
 * Document -> Pages -> Nodes (flat node map + parent/children links).
 * All geometry is stored in a node's LOCAL space relative to its parent:
 *   - x, y  : top-left of the un-rotated box, in parent coordinates
 *   - w, h  : size of the un-rotated box
 *   - rotation : degrees, rotating about the box CENTER
 */ __turbopack_context__.s([
    "BLEND_MODES",
    ()=>BLEND_MODES,
    "DEFAULT_SETTINGS",
    ()=>DEFAULT_SETTINGS,
    "FRAME_PRESETS",
    ()=>FRAME_PRESETS,
    "NODE_TYPE_LABEL",
    ()=>NODE_TYPE_LABEL,
    "childrenOf",
    ()=>childrenOf,
    "cloneSubtree",
    ()=>cloneSubtree,
    "collectSubtree",
    ()=>collectSubtree,
    "countOfType",
    ()=>countOfType,
    "createDefaultDoc",
    ()=>createDefaultDoc,
    "createNode",
    ()=>createNode,
    "createPage",
    ()=>createPage,
    "getNode",
    ()=>getNode,
    "getPage",
    ()=>getPage,
    "isContainer",
    ()=>isContainer,
    "isDescendantOf",
    ()=>isDescendantOf,
    "nextName",
    ()=>nextName,
    "normalizeDoc",
    ()=>normalizeDoc,
    "rootAncestorOf",
    ()=>rootAncestorOf,
    "uid",
    ()=>uid
]);
const NODE_TYPE_LABEL = {
    frame: 'Frame',
    group: 'Group',
    rect: 'Rectangle',
    ellipse: 'Ellipse',
    line: 'Line',
    path: 'Vector',
    text: 'Text',
    image: 'Image',
    polygon: 'Polygon',
    star: 'Star',
    arrow: 'Arrow',
    section: 'Section',
    slice: 'Slice'
};
const FRAME_PRESETS = [
    {
        id: 'phone-small',
        name: 'Phone small',
        w: 320,
        h: 568,
        group: 'Phone'
    },
    {
        id: 'phone',
        name: 'Phone',
        w: 375,
        h: 812,
        group: 'Phone'
    },
    {
        id: 'phone-large',
        name: 'Phone large',
        w: 414,
        h: 896,
        group: 'Phone'
    },
    {
        id: 'tablet',
        name: 'Tablet',
        w: 768,
        h: 1024,
        group: 'Tablet'
    },
    {
        id: 'tablet-landscape',
        name: 'Tablet landscape',
        w: 1024,
        h: 768,
        group: 'Tablet'
    },
    {
        id: 'desktop',
        name: 'Desktop',
        w: 1440,
        h: 1024,
        group: 'Desktop'
    },
    {
        id: 'desktop-small',
        name: 'Desktop small',
        w: 1024,
        h: 768,
        group: 'Desktop'
    },
    {
        id: 'laptop',
        name: 'Laptop',
        w: 1280,
        h: 800,
        group: 'Desktop'
    },
    {
        id: 'monitor',
        name: 'Monitor',
        w: 1920,
        h: 1080,
        group: 'Desktop'
    },
    {
        id: 'a4',
        name: 'A4 paper',
        w: 595,
        h: 842,
        group: 'Paper'
    },
    {
        id: 'a3',
        name: 'A3 paper',
        w: 842,
        h: 1191,
        group: 'Paper'
    },
    {
        id: 'letter',
        name: 'US Letter',
        w: 612,
        h: 792,
        group: 'Paper'
    },
    {
        id: 'slide-169',
        name: 'Presentation 16:9',
        w: 1920,
        h: 1080,
        group: 'Slide'
    },
    {
        id: 'slide-43',
        name: 'Presentation 4:3',
        w: 1024,
        h: 768,
        group: 'Slide'
    },
    {
        id: 'social-post',
        name: 'Social post',
        w: 1080,
        h: 1080,
        group: 'Social'
    },
    {
        id: 'social-story',
        name: 'Social story',
        w: 1080,
        h: 1920,
        group: 'Social'
    },
    {
        id: 'social-cover',
        name: 'Social cover',
        w: 1500,
        h: 500,
        group: 'Social'
    },
    {
        id: 'watch',
        name: 'Watch',
        w: 324,
        h: 394,
        group: 'Wearables'
    }
];
const BLEND_MODES = [
    'normal',
    'multiply',
    'screen',
    'overlay',
    'darken',
    'lighten',
    'color-dodge',
    'color-burn',
    'hard-light',
    'soft-light',
    'difference',
    'exclusion',
    'hue',
    'saturation',
    'color',
    'luminosity'
];
const DEFAULT_SETTINGS = {
    grid: {
        size: 8,
        show: false,
        snap: false
    },
    bg: '#242424',
    guidesX: [],
    guidesY: []
};
let idCounter = 0;
function uid() {
    idCounter += 1;
    const rand = typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID().replace(/-/g, '').slice(0, 10) : Math.random().toString(36).slice(2, 12);
    return `${rand}${idCounter.toString(36)}`;
}
function defaultsFor(type) {
    switch(type){
        case 'frame':
            return {
                w: 100,
                h: 100,
                fill: '#FFFFFF',
                clip: true,
                name: 'Frame'
            };
        case 'group':
            return {
                w: 100,
                h: 100,
                fill: null,
                name: 'Group'
            };
        case 'rect':
            return {
                w: 100,
                h: 100,
                fill: '#D9D9D9',
                name: 'Rectangle'
            };
        case 'ellipse':
            return {
                w: 100,
                h: 100,
                fill: '#D9D9D9',
                name: 'Ellipse'
            };
        case 'line':
            return {
                w: 100,
                h: 0,
                fill: null,
                stroke: '#B3B3B3',
                strokeWidth: 1,
                name: 'Line'
            };
        case 'path':
            return {
                w: 100,
                h: 100,
                fill: null,
                stroke: '#B3B3B3',
                strokeWidth: 1,
                name: 'Vector'
            };
        case 'text':
            return {
                w: 60,
                h: 18,
                fill: '#000000',
                fontSize: 14,
                lineHeight: 1.25,
                autoWidth: true,
                name: 'Text'
            };
        case 'image':
            return {
                w: 100,
                h: 100,
                fill: null,
                name: 'Image'
            };
        case 'polygon':
            return {
                w: 100,
                h: 100,
                fill: '#D9D9D9',
                sides: 6,
                name: 'Polygon'
            };
        case 'star':
            return {
                w: 100,
                h: 100,
                fill: '#D9D9D9',
                starPoints: 5,
                innerRadius: 0.45,
                name: 'Star'
            };
        case 'arrow':
            return {
                w: 100,
                h: 0,
                fill: null,
                stroke: '#B3B3B3',
                strokeWidth: 1,
                arrowEnd: 'arrow',
                name: 'Arrow'
            };
        case 'section':
            return {
                w: 800,
                h: 600,
                fill: 'rgba(136,136,136,0.10)',
                stroke: '#6F6F6F',
                strokeWidth: 1,
                cornerRadius: 12,
                clip: false,
                name: 'Section'
            };
        case 'slice':
            return {
                w: 200,
                h: 150,
                fill: null,
                stroke: '#F24822',
                strokeWidth: 1,
                dash: 'dashed',
                name: 'Slice'
            };
    }
}
function createNode(type, pageId, patch = {}) {
    return {
        id: patch.id ?? uid(),
        type,
        name: NODE_TYPE_LABEL[type],
        pageId,
        parentId: null,
        x: 0,
        y: 0,
        w: 100,
        h: 100,
        rotation: 0,
        opacity: 1,
        visible: true,
        locked: false,
        fill: null,
        stroke: null,
        strokeWidth: 1,
        cornerRadius: 0,
        text: '',
        fontFamily: 'Inter',
        fontSize: 14,
        fontWeight: 400,
        textAlign: 'left',
        lineHeight: 1.25,
        autoWidth: false,
        letterSpacing: 0,
        textCase: 'as-typed',
        underline: false,
        strike: false,
        points: [],
        closed: false,
        src: null,
        children: [],
        clip: false,
        flip: false,
        sides: 6,
        starPoints: 5,
        innerRadius: 0.45,
        arrowStart: 'none',
        arrowEnd: 'arrow',
        fillGradient: null,
        shadow: null,
        blur: 0,
        blend: 'normal',
        dash: 'solid',
        flipH: false,
        flipV: false,
        ...defaultsFor(type),
        ...patch
    };
}
function createPage(name) {
    return {
        id: uid(),
        name,
        nodeIds: []
    };
}
function createDefaultDoc() {
    const page = createPage('Page 1');
    return {
        name: 'Untitled',
        pages: [
            page.id
        ],
        pagesById: {
            [page.id]: page
        },
        nodesById: {},
        settings: {
            ...DEFAULT_SETTINGS,
            grid: {
                ...DEFAULT_SETTINGS.grid
            },
            guidesX: [],
            guidesY: []
        },
        comments: []
    };
}
function getNode(doc, id) {
    return id ? doc.nodesById[id] : undefined;
}
function getPage(doc, id) {
    return id ? doc.pagesById[id] : undefined;
}
function isContainer(node) {
    return node.type === 'frame' || node.type === 'group';
}
function childrenOf(doc, parentId, pageId) {
    if (parentId === null) {
        const page = getPage(doc, pageId);
        if (!page) return [];
        return page.nodeIds.map((id)=>doc.nodesById[id]).filter(Boolean);
    }
    const parent = doc.nodesById[parentId];
    if (!parent) return [];
    return parent.children.map((id)=>doc.nodesById[id]).filter(Boolean);
}
function collectSubtree(doc, id) {
    const out = [];
    const visit = (nid)=>{
        const n = doc.nodesById[nid];
        if (!n) return;
        out.push(n);
        n.children.forEach(visit);
    };
    visit(id);
    return out;
}
function isDescendantOf(doc, id, maybeAncestor) {
    let cur = doc.nodesById[id];
    while(cur && cur.parentId){
        if (cur.parentId === maybeAncestor) return true;
        cur = doc.nodesById[cur.parentId];
    }
    return false;
}
function rootAncestorOf(doc, id) {
    let cur = doc.nodesById[id];
    while(cur && cur.parentId){
        const p = doc.nodesById[cur.parentId];
        if (!p) break;
        cur = p;
    }
    return cur;
}
function countOfType(doc, type) {
    return Object.values(doc.nodesById).filter((n)=>n.type === type).length;
}
function nextName(doc, type) {
    const label = NODE_TYPE_LABEL[type];
    const n = countOfType(doc, type) + 1;
    return n === 1 ? label : `${label} ${n}`;
}
function cloneSubtree(nodes, rootId, pageId, parentId) {
    const idMap = new Map();
    for (const n of nodes)idMap.set(n.id, uid());
    const cloned = nodes.map((n)=>({
            ...n,
            id: idMap.get(n.id),
            pageId,
            parentId: n.id === rootId ? parentId : idMap.get(n.parentId ?? '') ?? null,
            children: n.children.map((c)=>idMap.get(c)).filter(Boolean),
            points: n.points.map((p)=>({
                    ...p
                })),
            fillGradient: n.fillGradient ? {
                ...n.fillGradient
            } : null,
            shadow: n.shadow ? {
                ...n.shadow
            } : null
        }));
    return {
        nodes: cloned,
        rootId: idMap.get(rootId)
    };
}
/* ------------------------------------------------------------------ */ /* Load-time normalization (autosave / .iris files from older builds)  */ /* ------------------------------------------------------------------ */ const VALID_TYPES = [
    'frame',
    'group',
    'rect',
    'ellipse',
    'line',
    'path',
    'text',
    'image',
    'polygon',
    'star',
    'arrow',
    'section',
    'slice'
];
function normalizeComments(raw, pages) {
    if (!Array.isArray(raw)) return [];
    const out = [];
    for (const c of raw){
        if (!c || typeof c !== 'object') continue;
        const r = c;
        if (typeof r.id !== 'string' || typeof r.x !== 'number' || typeof r.y !== 'number') continue;
        out.push({
            id: r.id,
            pageId: typeof r.pageId === 'string' && pages.includes(r.pageId) ? r.pageId : pages[0],
            x: r.x,
            y: r.y,
            text: typeof r.text === 'string' ? r.text : '',
            author: typeof r.author === 'string' ? r.author : 'You',
            ts: typeof r.ts === 'number' ? r.ts : Date.now(),
            resolved: !!r.resolved
        });
    }
    return out;
}
function normalizeSettings(raw) {
    const s = {
        ...DEFAULT_SETTINGS,
        grid: {
            ...DEFAULT_SETTINGS.grid
        },
        guidesX: [],
        guidesY: []
    };
    if (!raw || typeof raw !== 'object') return s;
    const src = raw;
    if (src.grid && typeof src.grid === 'object') {
        const g = src.grid;
        s.grid = {
            size: typeof g.size === 'number' && g.size >= 1 ? g.size : 8,
            show: !!g.show,
            snap: !!g.snap
        };
    }
    if (typeof src.bg === 'string' && /^#[0-9a-fA-F]{3,8}$/.test(src.bg)) s.bg = src.bg;
    if (Array.isArray(src.guidesX)) s.guidesX = src.guidesX.filter((v)=>typeof v === 'number');
    if (Array.isArray(src.guidesY)) s.guidesY = src.guidesY.filter((v)=>typeof v === 'number');
    return s;
}
function normalizeDoc(raw) {
    const base = createDefaultDoc();
    if (!raw || typeof raw !== 'object') return base;
    const src = raw;
    const doc = {
        name: typeof src.name === 'string' ? src.name : 'Untitled',
        pages: Array.isArray(src.pages) && src.pages.length ? src.pages.slice() : base.pages,
        pagesById: {},
        nodesById: {},
        settings: normalizeSettings(src.settings),
        comments: []
    };
    doc.comments = normalizeComments(src.comments, doc.pages);
    for (const p of Object.values(src.pagesById ?? {})){
        if (p && typeof p === 'object' && typeof p.id === 'string') {
            doc.pagesById[p.id] = {
                id: p.id,
                name: typeof p.name === 'string' ? p.name : 'Page',
                nodeIds: Array.isArray(p.nodeIds) ? p.nodeIds.filter((id)=>typeof id === 'string') : []
            };
        }
    }
    for (const id of doc.pages){
        if (!doc.pagesById[id]) {
            const page = createPage('Page');
            page.id = id;
            doc.pagesById[id] = page;
        }
    }
    for (const n of Object.values(src.nodesById ?? {})){
        if (!n || typeof n !== 'object' || typeof n.id !== 'string') continue;
        const node = createNode(VALID_TYPES.includes(n.type) ? n.type : 'rect', typeof n.pageId === 'string' ? n.pageId : doc.pages[0], n);
        doc.nodesById[node.id] = node;
    }
    return doc;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/iris/engine/geometry.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Iris geometry: 2D matrix math, bounds, hit-testing, snapping, text metrics.
 * Canvas-style matrices: x' = a*x + c*y + e ; y' = b*x + d*y + f
 */ __turbopack_context__.s([
    "IDENTITY",
    ()=>IDENTITY,
    "RULER",
    ()=>RULER,
    "aabbOfPoints",
    ()=>aabbOfPoints,
    "applyTextCase",
    ()=>applyTextCase,
    "arrowHeadSize",
    ()=>arrowHeadSize,
    "arrowPath2d",
    ()=>arrowPath2d,
    "boundsOfNodes",
    ()=>boundsOfNodes,
    "computeSnap",
    ()=>computeSnap,
    "cssFontFamily",
    ()=>cssFontFamily,
    "dashArray",
    ()=>dashArray,
    "deepestFrameContaining",
    ()=>deepestFrameContaining,
    "distToSegment",
    ()=>distToSegment,
    "expandRect",
    ()=>expandRect,
    "firstBaseline",
    ()=>firstBaseline,
    "fontString",
    ()=>fontString,
    "frameAtPoint",
    ()=>frameAtPoint,
    "gradientLine",
    ()=>gradientLine,
    "hexToRgba",
    ()=>hexToRgba,
    "hitTestDeep",
    ()=>hitTestDeep,
    "hitTestNode",
    ()=>hitTestNode,
    "isHexColor",
    ()=>isHexColor,
    "mApply",
    ()=>mApply,
    "mApplyVec",
    ()=>mApplyVec,
    "mInvert",
    ()=>mInvert,
    "mMul",
    ()=>mMul,
    "mRotate",
    ()=>mRotate,
    "mScale",
    ()=>mScale,
    "mTranslate",
    ()=>mTranslate,
    "marqueeCandidates",
    ()=>marqueeCandidates,
    "mat",
    ()=>mat,
    "measureText",
    ()=>measureText,
    "nodeLocalCorners",
    ()=>nodeLocalCorners,
    "nodeLocalMatrix",
    ()=>nodeLocalMatrix,
    "nodeWorldAABB",
    ()=>nodeWorldAABB,
    "nodeWorldMatrix",
    ()=>nodeWorldMatrix,
    "normalizeAngle",
    ()=>normalizeAngle,
    "parentWorldMatrix",
    ()=>parentWorldMatrix,
    "path2dForPoints",
    ()=>path2dForPoints,
    "pointInRect",
    ()=>pointInRect,
    "polygonPoints",
    ()=>polygonPoints,
    "rectContains",
    ()=>rectContains,
    "rectsIntersect",
    ()=>rectsIntersect,
    "regularPath2d",
    ()=>regularPath2d,
    "resolveClick",
    ()=>resolveClick,
    "screenToWorld",
    ()=>screenToWorld,
    "segmentEnds",
    ()=>segmentEnds,
    "selectionHandleGeometry",
    ()=>selectionHandleGeometry,
    "setNodeWorldTransform",
    ()=>setNodeWorldTransform,
    "starPointsOf",
    ()=>starPointsOf,
    "transformRect",
    ()=>transformRect,
    "unionRects",
    ()=>unionRects,
    "visibleWorldRect",
    ()=>visibleWorldRect,
    "worldToScreen",
    ()=>worldToScreen
]);
const IDENTITY = {
    a: 1,
    b: 0,
    c: 0,
    d: 1,
    e: 0,
    f: 0
};
function mat(a, b, c, d, e, f) {
    return {
        a,
        b,
        c,
        d,
        e,
        f
    };
}
function mMul(m, n) {
    return {
        a: m.a * n.a + m.c * n.b,
        b: m.b * n.a + m.d * n.b,
        c: m.a * n.c + m.c * n.d,
        d: m.b * n.c + m.d * n.d,
        e: m.a * n.e + m.c * n.f + m.e,
        f: m.b * n.e + m.d * n.f + m.f
    };
}
function mTranslate(x, y) {
    return {
        a: 1,
        b: 0,
        c: 0,
        d: 1,
        e: x,
        f: y
    };
}
function mScale(x, y) {
    return {
        a: x,
        b: 0,
        c: 0,
        d: y,
        e: 0,
        f: 0
    };
}
function mRotate(deg) {
    const r = deg * Math.PI / 180;
    const cos = Math.cos(r);
    const sin = Math.sin(r);
    return {
        a: cos,
        b: sin,
        c: -sin,
        d: cos,
        e: 0,
        f: 0
    };
}
function mApply(m, x, y) {
    return {
        x: m.a * x + m.c * y + m.e,
        y: m.b * x + m.d * y + m.f
    };
}
function mApplyVec(m, x, y) {
    return {
        x: m.a * x + m.c * y,
        y: m.b * x + m.d * y
    };
}
function mInvert(m) {
    const det = m.a * m.d - m.b * m.c;
    if (Math.abs(det) < 1e-12) return {
        ...IDENTITY
    };
    return {
        a: m.d / det,
        b: -m.b / det,
        c: -m.c / det,
        d: m.a / det,
        e: (m.c * m.f - m.d * m.e) / det,
        f: (m.b * m.e - m.a * m.f) / det
    };
}
function nodeLocalMatrix(n) {
    const flip = n.flipH || n.flipV;
    if (!n.rotation && !flip) return mTranslate(n.x, n.y);
    const cx = n.w / 2;
    const cy = n.h / 2;
    let m = mTranslate(n.x, n.y);
    m = mMul(m, mTranslate(cx, cy));
    if (n.rotation) m = mMul(m, mRotate(n.rotation));
    if (flip) m = mMul(m, mScale(n.flipH ? -1 : 1, n.flipV ? -1 : 1));
    m = mMul(m, mTranslate(-cx, -cy));
    return m;
}
/** Center-flip matrix of a node (identity when not flipped). */ function centerFlipMatrix(n) {
    if (!n.flipH && !n.flipV) return {
        ...IDENTITY
    };
    return mMul(mMul(mTranslate(n.w / 2, n.h / 2), mScale(n.flipH ? -1 : 1, n.flipV ? -1 : 1)), mTranslate(-n.w / 2, -n.h / 2));
}
function nodeWorldMatrix(doc, n) {
    let m = nodeLocalMatrix(n);
    let pid = n.parentId;
    while(pid){
        const p = doc.nodesById[pid];
        if (!p) break;
        m = mMul(nodeLocalMatrix(p), m);
        pid = p.parentId;
    }
    return m;
}
function parentWorldMatrix(doc, n) {
    if (!n.parentId) return {
        ...IDENTITY
    };
    const p = doc.nodesById[n.parentId];
    if (!p) return {
        ...IDENTITY
    };
    return nodeWorldMatrix(doc, p);
}
function setNodeWorldTransform(n, target) {
    /* remove the node's center-flip so the remainder is a pure rot+translate */ const L = mMul(target, mInvert(centerFlipMatrix(n)));
    let rot = Math.atan2(L.b, L.a) * 180 / Math.PI;
    rot = normalizeAngle(rot);
    // Rc = rotation about center of the (w, h) box at origin
    const rc = mMul(mMul(mTranslate(n.w / 2, n.h / 2), mRotate(rot)), mTranslate(-n.w / 2, -n.h / 2));
    const t = mMul(L, mInvert(rc));
    return {
        x: t.e,
        y: t.f,
        rotation: rot
    };
}
function normalizeAngle(deg) {
    let d = deg % 360;
    if (d > 180) d -= 360;
    if (d < -180) d += 360;
    return d;
}
function nodeLocalCorners(n) {
    return [
        {
            x: 0,
            y: 0
        },
        {
            x: n.w,
            y: 0
        },
        {
            x: n.w,
            y: n.h
        },
        {
            x: 0,
            y: n.h
        }
    ];
}
function transformRect(m, r) {
    const pts = [
        mApply(m, r.x, r.y),
        mApply(m, r.x + r.w, r.y),
        mApply(m, r.x + r.w, r.y + r.h),
        mApply(m, r.x, r.y + r.h)
    ];
    return aabbOfPoints(pts);
}
function aabbOfPoints(pts) {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (const p of pts){
        if (p.x < minX) minX = p.x;
        if (p.y < minY) minY = p.y;
        if (p.x > maxX) maxX = p.x;
        if (p.y > maxY) maxY = p.y;
    }
    return {
        x: minX,
        y: minY,
        w: maxX - minX,
        h: maxY - minY
    };
}
function nodeWorldAABB(doc, n) {
    if (n.type === 'group') {
        if (n.children.length === 0) return transformRect(nodeWorldMatrix(doc, n), {
            x: 0,
            y: 0,
            w: n.w,
            h: n.h
        });
        const rects = n.children.map((c)=>doc.nodesById[c]).filter(Boolean).map((c)=>nodeWorldAABB(doc, c));
        return unionRects(rects);
    }
    return transformRect(nodeWorldMatrix(doc, n), {
        x: 0,
        y: 0,
        w: n.w,
        h: n.h
    });
}
function unionRects(rects) {
    if (rects.length === 0) return {
        x: 0,
        y: 0,
        w: 0,
        h: 0
    };
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (const r of rects){
        minX = Math.min(minX, r.x);
        minY = Math.min(minY, r.y);
        maxX = Math.max(maxX, r.x + r.w);
        maxY = Math.max(maxY, r.y + r.h);
    }
    return {
        x: minX,
        y: minY,
        w: maxX - minX,
        h: maxY - minY
    };
}
function boundsOfNodes(doc, ids) {
    const rects = ids.map((id)=>doc.nodesById[id]).filter(Boolean).map((n)=>nodeWorldAABB(doc, n));
    if (rects.length === 0) return null;
    return unionRects(rects);
}
function rectsIntersect(a, b) {
    return a.x <= b.x + b.w && a.x + a.w >= b.x && a.y <= b.y + b.h && a.y + a.h >= b.y;
}
function rectContains(outer, inner) {
    return inner.x >= outer.x && inner.y >= outer.y && inner.x + inner.w <= outer.x + outer.w && inner.y + inner.h <= outer.y + outer.h;
}
function pointInRect(r, p) {
    return p.x >= r.x && p.x <= r.x + r.w && p.y >= r.y && p.y <= r.y + r.h;
}
function expandRect(r, pad) {
    return {
        x: r.x - pad,
        y: r.y - pad,
        w: r.w + pad * 2,
        h: r.h + pad * 2
    };
}
function distToSegment(p, a, b) {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const lenSq = dx * dx + dy * dy;
    if (lenSq < 1e-9) return Math.hypot(p.x - a.x, p.y - a.y);
    let t = ((p.x - a.x) * dx + (p.y - a.y) * dy) / lenSq;
    t = Math.max(0, Math.min(1, t));
    return Math.hypot(p.x - (a.x + t * dx), p.y - (a.y + t * dy));
}
const RULER = 20;
function worldToScreen(vp, x, y) {
    return {
        x: x * vp.zoom + vp.x,
        y: y * vp.zoom + vp.y
    };
}
function screenToWorld(vp, x, y) {
    return {
        x: (x - vp.x) / vp.zoom,
        y: (y - vp.y) / vp.zoom
    };
}
function visibleWorldRect(vp, cssW, cssH, originX, originY) {
    const a = screenToWorld(vp, originX, originY);
    const b = screenToWorld(vp, cssW, cssH);
    return {
        x: a.x,
        y: a.y,
        w: b.x - a.x,
        h: b.y - a.y
    };
}
/* ------------------------------------------------------------------ */ /* Hit testing                                                         */ /* ------------------------------------------------------------------ */ let hitCtx = null;
function getHitCtx() {
    if (hitCtx) return hitCtx;
    if (typeof document === 'undefined') return null;
    const c = document.createElement('canvas');
    c.width = 8;
    c.height = 8;
    hitCtx = c.getContext('2d');
    return hitCtx;
}
function path2dForPoints(points, closed) {
    const p = new Path2D();
    if (points.length === 0) return p;
    p.moveTo(points[0].x, points[0].y);
    for(let i = 1; i < points.length; i++){
        const prev = points[i - 1];
        const cur = points[i];
        if (prev.hx === 0 && prev.hy === 0 && cur.hx === 0 && cur.hy === 0) {
            p.lineTo(cur.x, cur.y);
        } else {
            p.bezierCurveTo(prev.x + prev.hx, prev.y + prev.hy, cur.x - cur.hx, cur.y - cur.hy, cur.x, cur.y);
        }
    }
    if (closed && points.length > 1) {
        const last = points[points.length - 1];
        const first = points[0];
        if (last.hx === 0 && last.hy === 0 && first.hx === 0 && first.hy === 0) {
            p.closePath();
        } else {
            p.bezierCurveTo(last.x + last.hx, last.y + last.hy, first.x - first.hx, first.y - first.hy, first.x, first.y);
            p.closePath();
        }
    }
    return p;
}
function polygonPoints(n) {
    const k = Math.max(3, Math.round(n.sides));
    const rx = n.w / 2;
    const ry = n.h / 2;
    const pts = [];
    for(let i = 0; i < k; i++){
        const a = -Math.PI / 2 + i * 2 * Math.PI / k;
        pts.push({
            x: rx + rx * Math.cos(a),
            y: ry + ry * Math.sin(a)
        });
    }
    return pts;
}
function starPointsOf(n) {
    const k = Math.max(3, Math.round(n.starPoints));
    const rx = n.w / 2;
    const ry = n.h / 2;
    const inner = Math.min(0.95, Math.max(0.05, n.innerRadius));
    const pts = [];
    for(let i = 0; i < k * 2; i++){
        const isOuter = i % 2 === 0;
        const r = isOuter ? 1 : inner;
        const a = -Math.PI / 2 + i * Math.PI / k;
        pts.push({
            x: rx + rx * r * Math.cos(a),
            y: ry + ry * r * Math.sin(a)
        });
    }
    return pts;
}
function regularPath2d(n) {
    const pts = n.type === 'star' ? starPointsOf(n) : polygonPoints(n);
    const p = new Path2D();
    if (pts.length === 0) return p;
    p.moveTo(pts[0].x, pts[0].y);
    for(let i = 1; i < pts.length; i++)p.lineTo(pts[i].x, pts[i].y);
    p.closePath();
    return p;
}
function segmentEnds(n) {
    return n.flip ? {
        a: {
            x: n.w,
            y: 0
        },
        b: {
            x: 0,
            y: n.h
        }
    } : {
        a: {
            x: 0,
            y: 0
        },
        b: {
            x: n.w,
            y: n.h
        }
    };
}
function arrowHeadSize(strokeWidth) {
    return Math.max(8, strokeWidth * 4.5);
}
/** Triangular head path at point `tip` pointing along `dir` (unit vector). */ function arrowHeadPath(tip, dir, size, inset) {
    const p = new Path2D();
    const px = -dir.y;
    const py = dir.x;
    const back = {
        x: tip.x - dir.x * size,
        y: tip.y - dir.y * size
    };
    p.moveTo(tip.x, tip.y);
    p.lineTo(back.x + px * size * 0.4, back.y + py * size * 0.4);
    p.lineTo(back.x - px * size * 0.4, back.y - py * size * 0.4);
    p.closePath();
    void inset;
    return p;
}
function arrowPath2d(n) {
    const { a, b } = segmentEnds(n);
    const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
    const dir = {
        x: (b.x - a.x) / len,
        y: (b.y - a.y) / len
    };
    const size = arrowHeadSize(n.strokeWidth);
    const heads = [];
    const shaft = new Path2D();
    if (n.arrowEnd !== 'none') {
        const tipB = {
            x: b.x - dir.x * size * 0.85,
            y: b.y - dir.y * size * 0.85
        };
        shaft.moveTo(a.x, a.y);
        shaft.lineTo(tipB.x, tipB.y);
        if (n.arrowEnd !== 'line') heads.push(arrowHeadPath(b, dir, size, 0));
        else {
            const h = new Path2D();
            const px = -dir.y;
            const py = dir.x;
            const back = {
                x: b.x - dir.x * size * 0.7,
                y: b.y - dir.y * size * 0.7
            };
            h.moveTo(back.x + px * size * 0.4, back.y + py * size * 0.4);
            h.lineTo(b.x, b.y);
            h.lineTo(back.x - px * size * 0.4, back.y - py * size * 0.4);
            heads.push(h);
        }
    } else {
        shaft.moveTo(a.x, a.y);
        shaft.lineTo(b.x, b.y);
    }
    if (n.arrowStart !== 'none') {
        const d2 = {
            x: -dir.x,
            y: -dir.y
        };
        if (n.arrowStart !== 'line') heads.push(arrowHeadPath(a, d2, size, 0));
        else {
            const h = new Path2D();
            const px = -d2.y;
            const py = d2.x;
            const back = {
                x: a.x - d2.x * size * 0.7,
                y: a.y - d2.y * size * 0.7
            };
            h.moveTo(back.x + px * size * 0.4, back.y + py * size * 0.4);
            h.lineTo(a.x, a.y);
            h.lineTo(back.x - px * size * 0.4, back.y - py * size * 0.4);
            heads.push(h);
        }
    }
    return {
        shaft,
        heads
    };
}
function gradientLine(w, h, angleDeg) {
    const a = angleDeg * Math.PI / 180;
    const cx = w / 2;
    const cy = h / 2;
    const len = Math.abs(w * Math.cos(a)) + Math.abs(h * Math.sin(a));
    const dx = Math.cos(a) * len / 2;
    const dy = Math.sin(a) * len / 2;
    return {
        x1: cx - dx,
        y1: cy - dy,
        x2: cx + dx,
        y2: cy + dy
    };
}
function hitTestNode(doc, n, worldPt, tolerance) {
    if (!n.visible || n.locked) return false;
    const inv = mInvert(nodeWorldMatrix(doc, n));
    const p = mApply(inv, worldPt.x, worldPt.y);
    switch(n.type){
        case 'rect':
        case 'frame':
        case 'section':
        case 'slice':
        case 'text':
        case 'image':
        case 'polygon':
        case 'star':
            {
                if (p.x < -tolerance || p.y < -tolerance || p.x > n.w + tolerance || p.y > n.h + tolerance) return false;
                // rounded corner check for rects with radius
                if ((n.type === 'rect' || n.type === 'frame' || n.type === 'section') && n.cornerRadius > 0) {
                    const r = Math.min(n.cornerRadius, n.w / 2, n.h / 2);
                    const inXBand = p.x >= r && p.x <= n.w - r;
                    const inYBand = p.y >= r && p.y <= n.h - r;
                    if (inXBand || inYBand) return true;
                    const cx = p.x < n.w / 2 ? r : n.w - r;
                    const cy = p.y < n.h / 2 ? r : n.h - r;
                    return (p.x - cx) ** 2 + (p.y - cy) ** 2 <= (r + tolerance) ** 2;
                }
                return true;
            }
        case 'ellipse':
            {
                const rx = Math.max(n.w / 2, 0.001);
                const ry = Math.max(n.h / 2, 0.001);
                const dx = (p.x - n.w / 2) / (rx + tolerance);
                const dy = (p.y - n.h / 2) / (ry + tolerance);
                return dx * dx + dy * dy <= 1;
            }
        case 'line':
            {
                const { a, b } = segmentEnds(n);
                return distToSegment(p, a, b) <= Math.max(tolerance, n.strokeWidth / 2 + tolerance * 0.5);
            }
        case 'arrow':
            {
                const ctxA = getHitCtx();
                const { shaft, heads } = arrowPath2d(n);
                if (ctxA) {
                    ctxA.lineWidth = Math.max(n.strokeWidth, 1) + tolerance * 2;
                    ctxA.strokeStyle = '#000';
                    if (ctxA.isPointInStroke(shaft, p.x, p.y)) return true;
                    for (const head of heads)if (ctxA.isPointInPath(head, p.x, p.y)) return true;
                    return false;
                }
                const ends = segmentEnds(n);
                return distToSegment(p, ends.a, ends.b) <= Math.max(tolerance, n.strokeWidth / 2 + tolerance * 0.5) + 6;
            }
        case 'polygon':
        case 'star':
            {
                const ctxP = getHitCtx();
                const path = regularPath2d(n);
                if (!ctxP) return pointInRect({
                    x: 0,
                    y: 0,
                    w: n.w,
                    h: n.h
                }, p);
                if (n.fill && ctxP.isPointInPath(path, p.x, p.y)) return true;
                ctxP.lineWidth = Math.max(n.strokeWidth, 1) + tolerance * 2;
                ctxP.strokeStyle = '#000';
                return ctxP.isPointInStroke(path, p.x, p.y);
            }
        case 'path':
            {
                const ctx = getHitCtx();
                if (!ctx) return pointInRect({
                    x: 0,
                    y: 0,
                    w: n.w,
                    h: n.h
                }, p);
                const path = path2dForPoints(n.points, n.closed);
                if (n.fill && ctx.isPointInPath(path, p.x, p.y)) return true;
                ctx.lineWidth = Math.max(n.strokeWidth, 1) + tolerance * 2;
                ctx.strokeStyle = '#000';
                return ctx.isPointInStroke(path, p.x, p.y);
            }
        case 'group':
            return false;
    }
    return false;
}
function hitTestDeep(doc, pageId, worldPt, tolerance) {
    const page = doc.pagesById[pageId];
    if (!page) return null;
    const visit = (id)=>{
        const n = doc.nodesById[id];
        if (!n || !n.visible || n.locked) return null;
        if (n.type === 'group' || n.type === 'frame') {
            for(let i = n.children.length - 1; i >= 0; i--){
                const r = visit(n.children[i]);
                if (r) return r;
            }
            if (n.type === 'frame') {
                const inv = mInvert(nodeWorldMatrix(doc, n));
                const p = mApply(inv, worldPt.x, worldPt.y);
                if (p.x >= 0 && p.y >= 0 && p.x <= n.w && p.y <= n.h) return n;
            }
            return null;
        }
        return hitTestNode(doc, n, worldPt, tolerance) ? n : null;
    };
    for(let i = page.nodeIds.length - 1; i >= 0; i--){
        const r = visit(page.nodeIds[i]);
        if (r) return r;
    }
    return null;
}
function resolveClick(doc, exact, deep) {
    if (deep) return exact.id;
    let cur = exact;
    while(cur.parentId){
        const parent = doc.nodesById[cur.parentId];
        if (!parent || parent.type !== 'group') break;
        cur = parent;
    }
    return cur.id;
}
function deepestFrameContaining(doc, pageId, rect) {
    const page = doc.pagesById[pageId];
    if (!page) return null;
    let best = null;
    const visit = (id)=>{
        const n = doc.nodesById[id];
        if (!n || !n.visible) return;
        if (n.type === 'frame' && rectContains(nodeWorldAABB(doc, n), rect)) {
            if (!best || nodeWorldAABB(doc, best).w * nodeWorldAABB(doc, best).h > n.w * n.h) best = n;
        }
        if (n.children) n.children.forEach(visit);
    };
    page.nodeIds.forEach(visit);
    return best;
}
function marqueeCandidates(doc, pageId, rect) {
    const page = doc.pagesById[pageId];
    if (!page) return [];
    const roots = page.nodeIds.map((id)=>doc.nodesById[id]).filter((n)=>!!n && n.visible && !n.locked);
    const hitting = roots.filter((n)=>rectsIntersect(nodeWorldAABB(doc, n), rect));
    if (hitting.length > 0) return hitting.map((n)=>n.id);
    const frame = deepestFrameContaining(doc, pageId, rect);
    if (frame) {
        return frame.children.map((id)=>doc.nodesById[id]).filter((n)=>!!n && n.visible && !n.locked && rectsIntersect(nodeWorldAABB(doc, n), rect)).map((n)=>n.id);
    }
    return [];
}
function frameAtPoint(doc, pageId, worldPt, excludeIds) {
    const page = doc.pagesById[pageId];
    if (!page) return null;
    const excluded = new Set(excludeIds ?? []);
    let best = null;
    const visitDeep = (id)=>{
        const n = doc.nodesById[id];
        if (!n || !n.visible || n.locked || excluded.has(id)) return;
        // children (topmost sibling first) take priority over the frame itself
        for(let i = n.children.length - 1; i >= 0; i--)visitDeep(n.children[i]);
        if (n.type === 'frame' && !best) {
            const p = mApply(mInvert(nodeWorldMatrix(doc, n)), worldPt.x, worldPt.y);
            if (p.x >= 0 && p.y >= 0 && p.x <= n.w && p.y <= n.h) best = n;
        }
    };
    for(let i = page.nodeIds.length - 1; i >= 0; i--)visitDeep(page.nodeIds[i]);
    return best;
}
function computeSnap(moving, candidates, threshold) {
    let bestX = null;
    let bestY = null;
    const mxs = [
        moving.x,
        moving.x + moving.w / 2,
        moving.x + moving.w
    ];
    const mys = [
        moving.y,
        moving.y + moving.h / 2,
        moving.y + moving.h
    ];
    for (const c of candidates){
        const cxs = [
            c.x,
            c.x + c.w / 2,
            c.x + c.w
        ];
        const cys = [
            c.y,
            c.y + c.h / 2,
            c.y + c.h
        ];
        for (const m of mxs){
            for (const s of cxs){
                const d = s - m;
                if (Math.abs(d) <= threshold && (!bestX || Math.abs(d) < Math.abs(bestX.d))) {
                    bestX = {
                        d,
                        guide: {
                            axis: 'x',
                            at: s,
                            from: Math.min(moving.y, c.y),
                            to: Math.max(moving.y + moving.h, c.y + c.h)
                        }
                    };
                }
            }
        }
        for (const m of mys){
            for (const s of cys){
                const d = s - m;
                if (Math.abs(d) <= threshold && (!bestY || Math.abs(d) < Math.abs(bestY.d))) {
                    bestY = {
                        d,
                        guide: {
                            axis: 'y',
                            at: s,
                            from: Math.min(moving.x, c.x),
                            to: Math.max(moving.x + moving.w, c.x + c.w)
                        }
                    };
                }
            }
        }
    }
    const guides = [];
    if (bestX) guides.push(bestX.guide);
    if (bestY) guides.push(bestY.guide);
    return {
        dx: bestX ? bestX.d : 0,
        dy: bestY ? bestY.d : 0,
        guides
    };
}
/* ------------------------------------------------------------------ */ /* Text metrics                                                        */ /* ------------------------------------------------------------------ */ let measureCtx = null;
function getMeasureCtx() {
    if (measureCtx) return measureCtx;
    if (typeof document === 'undefined') return null;
    const c = document.createElement('canvas');
    c.width = 8;
    c.height = 8;
    measureCtx = c.getContext('2d');
    return measureCtx;
}
function cssFontFamily(family) {
    const quote = (f)=>/^[\w-]+$/.test(f) ? f : `"${f.replace(/"/g, '')}"`;
    return `${family.split(',').map((f)=>quote(f.trim())).join(', ')}, ui-sans-serif, system-ui, sans-serif`;
}
function fontString(n) {
    return `${n.fontWeight} ${n.fontSize}px ${cssFontFamily(n.fontFamily)}`;
}
function applyTextCase(text, textCase) {
    switch(textCase){
        case 'upper':
            return text.toUpperCase();
        case 'lower':
            return text.toLowerCase();
        case 'title':
            return text.replace(/\w\S*/g, (w)=>w.charAt(0).toUpperCase() + w.slice(1).toLowerCase());
        default:
            return text;
    }
}
function dashArray(style, strokeWidth) {
    const s = Math.max(1, strokeWidth);
    if (style === 'dashed') return [
        s * 4,
        s * 3
    ];
    if (style === 'dotted') return [
        s * 0.01,
        s * 2.2
    ];
    return [];
}
function measureText(n, wrapWidth) {
    const ctx = getMeasureCtx();
    const fs = fontString(n);
    const maxW = wrapWidth ?? n.w;
    const spacing = n.letterSpacing ?? 0;
    const paragraphs = applyTextCase(n.text ?? '', n.textCase ?? 'as-typed').split('\n');
    const lines = [];
    if (ctx) {
        ctx.font = fs;
        try {
            ctx.letterSpacing = `${spacing}px`;
        } catch  {
        /* letterSpacing unsupported — approximate below */ }
    }
    const measure = (s)=>ctx ? ctx.measureText(s).width + spacing * Math.max(0, s.length - 1) : s.length * n.fontSize * 0.55;
    for (const para of paragraphs){
        if (n.autoWidth || maxW <= 0 || para === '') {
            lines.push(para);
            continue;
        }
        const words = para.split(' ');
        let cur = '';
        for (const w of words){
            const attempt = cur === '' ? w : `${cur} ${w}`;
            if (measure(attempt) <= maxW || cur === '') {
                cur = attempt;
            } else {
                lines.push(cur);
                cur = w;
            }
        }
        lines.push(cur);
    }
    let width = 0;
    for (const l of lines)width = Math.max(width, measure(l));
    let ascent = n.fontSize * 0.8;
    let descent = n.fontSize * 0.2;
    if (ctx) {
        ctx.font = fs;
        const m = ctx.measureText('Hg');
        if (m.actualBoundingBoxAscent) ascent = m.actualBoundingBoxAscent;
        if (m.actualBoundingBoxDescent) descent = m.actualBoundingBoxDescent;
        try {
            ctx.letterSpacing = '0px';
        } catch  {
        /* ignore */ }
    }
    const lineH = n.fontSize * n.lineHeight;
    return {
        lines,
        width,
        height: Math.max(lineH, lines.length * lineH),
        ascent,
        descent
    };
}
function firstBaseline(n, ascent, descent) {
    const lineH = n.fontSize * n.lineHeight;
    return (lineH - (ascent + descent)) / 2 + ascent;
}
const CORNER_LOCAL = {
    nw: [
        0,
        0
    ],
    n: [
        0.5,
        0
    ],
    ne: [
        1,
        0
    ],
    e: [
        1,
        0.5
    ],
    se: [
        1,
        1
    ],
    s: [
        0.5,
        1
    ],
    sw: [
        0,
        1
    ],
    w: [
        0,
        0.5
    ]
};
function selectionHandleGeometry(doc, ids, vp) {
    const nodes = ids.map((id)=>doc.nodesById[id]).filter(Boolean);
    if (nodes.length === 0) return null;
    const worldBox = boundsOfNodes(doc, ids);
    if (!worldBox) return null;
    const single = nodes.length === 1;
    const node = nodes[0];
    let corners; // world coords of the 4 box corners
    if (single) {
        const m = nodeWorldMatrix(doc, node);
        corners = nodeLocalCorners(node).map((c)=>mApply(m, c.x, c.y));
    } else {
        corners = [
            {
                x: worldBox.x,
                y: worldBox.y
            },
            {
                x: worldBox.x + worldBox.w,
                y: worldBox.y
            },
            {
                x: worldBox.x + worldBox.w,
                y: worldBox.y + worldBox.h
            },
            {
                x: worldBox.x,
                y: worldBox.y + worldBox.h
            }
        ];
    }
    const screen = corners.map((c)=>worldToScreen(vp, c.x, c.y));
    // corner order: nw, ne, se, sw
    const lerp = (a, b, t)=>({
            x: a.x + (b.x - a.x) * t,
            y: a.y + (b.y - a.y) * t
        });
    const order = [
        'nw',
        'ne',
        'se',
        'sw'
    ];
    const pts = [];
    order.forEach((k, i)=>{
        pts.push({
            kind: k,
            x: screen[i].x,
            y: screen[i].y
        });
    });
    pts.push({
        kind: 'n',
        ...lerp(screen[0], screen[1], 0.5)
    });
    pts.push({
        kind: 'e',
        ...lerp(screen[1], screen[2], 0.5)
    });
    pts.push({
        kind: 's',
        ...lerp(screen[3], screen[2], 0.5)
    });
    pts.push({
        kind: 'w',
        ...lerp(screen[0], screen[3], 0.5)
    });
    const center = lerp(lerp(screen[0], screen[2], 0.5), lerp(screen[1], screen[3], 0.5), 0.5);
    // rotation handle: extend outward from top edge midpoint
    const topMid = lerp(screen[0], screen[1], 0.5);
    let ux = topMid.x - center.x;
    let uy = topMid.y - center.y;
    const ul = Math.hypot(ux, uy) || 1;
    ux /= ul;
    uy /= ul;
    const rot = {
        x: topMid.x + ux * 22,
        y: topMid.y + uy * 22
    };
    const minX = Math.min(...screen.map((p)=>p.x));
    const minY = Math.min(...screen.map((p)=>p.y));
    const maxX = Math.max(...screen.map((p)=>p.x));
    const maxY = Math.max(...screen.map((p)=>p.y));
    return {
        pts,
        rot,
        center,
        poly: single && Math.abs(node.rotation) > 0.01 ? screen : null,
        rect: {
            x: minX,
            y: minY,
            w: maxX - minX,
            h: maxY - minY
        },
        worldBox,
        single,
        nodeIds: ids
    };
}
function isHexColor(s) {
    return !!s && /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(s);
}
function hexToRgba(hex, alpha) {
    let h = hex.replace('#', '');
    if (h.length === 3) h = h.split('').map((c)=>c + c).join('');
    const r = parseInt(h.slice(0, 2), 16) || 0;
    const g = parseInt(h.slice(2, 4), 16) || 0;
    const b = parseInt(h.slice(4, 6), 16) || 0;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/iris/engine/overlay.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Mutable interaction overlay state, owned by tools.ts, read by renderer.ts.
 * Kept outside of zustand for 60fps pointer interactions; every mutation is
 * followed by renderer.requestDraw().
 */ __turbopack_context__.s([
    "clearTransient",
    ()=>clearTransient,
    "overlay",
    ()=>overlay
]);
const overlay = {
    marquee: null,
    guides: [],
    dragBadge: null,
    penDraft: null,
    pathEdit: null,
    drawPreview: null,
    pencilDraft: null,
    cursor: null,
    pointerWorld: null,
    spaceDown: false,
    rendering: false,
    guideDrag: null,
    pickedColor: null
};
function clearTransient() {
    overlay.marquee = null;
    overlay.guides = [];
    overlay.dragBadge = null;
    overlay.guideDrag = null;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/iris/engine/imageCache.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Shared image cache for dataURL images (renderer + export).
 */ __turbopack_context__.s([
    "getImage",
    ()=>getImage,
    "loadImage",
    ()=>loadImage,
    "onImageCacheChange",
    ()=>onImageCacheChange
]);
const entries = new Map();
const listeners = new Set();
function notify() {
    listeners.forEach((l)=>l());
}
function getImage(src) {
    let e = entries.get(src);
    if (!e) {
        if (typeof Image === 'undefined') return null;
        const img = new Image();
        e = {
            img,
            loaded: false,
            failed: false
        };
        entries.set(src, e);
        img.onload = ()=>{
            e.loaded = true;
            notify();
        };
        img.onerror = ()=>{
            e.failed = true;
        };
        img.src = src;
    }
    return e.loaded && !e.failed ? e.img : null;
}
function loadImage(src) {
    const e = entries.get(src);
    if (e && e.loaded) return Promise.resolve(e.img);
    return new Promise((resolve)=>{
        const img = new Image();
        img.onload = ()=>{
            entries.set(src, {
                img,
                loaded: true,
                failed: false
            });
            notify();
            resolve(img);
        };
        img.onerror = ()=>resolve(img);
        img.src = src;
    });
}
function onImageCacheChange(cb) {
    listeners.add(cb);
    return ()=>listeners.delete(cb);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/iris/engine/renderer.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Iris canvas renderer: scene draw pass + selection overlay + snap guides +
 * rulers + pixel grid + layout grid + ruler guides.
 *
 * Scene pass note: drawNode() applies each node's LOCAL matrix on top of the
 * parent's already-applied world matrix — this is what makes content inside
 * frames/groups render in the right place (applying full world matrices
 * recursively would double-transform nested content).
 */ __turbopack_context__.s([
    "ACCENT",
    ()=>ACCENT,
    "ACCENT_LIGHT",
    ()=>ACCENT_LIGHT,
    "applyTextTransform",
    ()=>applyTextTransform,
    "drawNodes",
    ()=>drawNodes,
    "initRenderer",
    ()=>initRenderer,
    "requestDraw",
    ()=>requestDraw,
    "samplePixel",
    ()=>samplePixel,
    "setExportPass",
    ()=>setExportPass
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/engine/geometry.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/engine/overlay.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/engine/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$imageCache$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/engine/imageCache.ts [app-client] (ecmascript)");
;
;
;
;
const ACCENT = '#0D99FF';
const ACCENT_LIGHT = '#7EC9FF';
const SNAP = '#FF3B30';
const DEFAULT_CANVAS_BG = '#242424';
const RULER_BG = '#1E1E1E';
const RULER_BORDER = '#3E3E3E';
const RULER_TEXT = '#7A7A7A';
const GUIDE_COLOR = '#F26BFF';
let canvas = null;
let ctx = null;
let raf = 0;
/** set during the scene pass: render shapes as outlines (wireframe view) */ let outlineMode = false;
/** set during export passes: skip editor-only visuals (slices) */ let exportPass = false;
function setExportPass(v) {
    exportPass = v;
}
function requestDraw() {
    if (raf) return;
    raf = requestAnimationFrame(()=>{
        raf = 0;
        draw();
    });
}
function resize() {
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (w === 0 || h === 0) return;
    const pw = Math.round(w * dpr);
    const ph = Math.round(h * dpr);
    if (canvas.width !== pw || canvas.height !== ph) {
        canvas.width = pw;
        canvas.height = ph;
    }
    const st = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"].getState();
    if (Math.abs(st.canvasSize.w - w) > 0.5 || Math.abs(st.canvasSize.h - h) > 0.5) {
        st.setCanvasSize(w, h);
    }
}
function initRenderer(c) {
    canvas = c;
    ctx = c.getContext('2d');
    const ro = new ResizeObserver(()=>{
        resize();
        requestDraw();
    });
    ro.observe(c);
    const unsubStore = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"].subscribe(()=>requestDraw());
    const unsubImages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$imageCache$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onImageCacheChange"])(()=>requestDraw());
    resize();
    requestDraw();
    return ()=>{
        ro.disconnect();
        unsubStore();
        unsubImages();
        if (raf) cancelAnimationFrame(raf);
        raf = 0;
        canvas = null;
        ctx = null;
    };
}
function samplePixel(clientX, clientY) {
    if (!canvas || !ctx) return null;
    const r = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const x = Math.round((clientX - r.left) * dpr);
    const y = Math.round((clientY - r.top) * dpr);
    if (x < 0 || y < 0 || x >= canvas.width || y >= canvas.height) return null;
    try {
        const d = ctx.getImageData(x, y, 1, 1).data;
        const hex = (v)=>v.toString(16).padStart(2, '0');
        return `#${hex(d[0])}${hex(d[1])}${hex(d[2])}`.toUpperCase();
    } catch  {
        return null;
    }
}
/* ------------------------------------------------------------------ */ /* Scene pass (shared with PNG export)                                 */ /* ------------------------------------------------------------------ */ function roundRectPath(c, x, y, w, h, r) {
    const rr = Math.max(0, Math.min(r, w / 2, h / 2));
    c.beginPath();
    if (rr <= 0) {
        c.rect(x, y, w, h);
        return;
    }
    c.moveTo(x + rr, y);
    c.arcTo(x + w, y, x + w, y + h, rr);
    c.arcTo(x + w, y + h, x, y + h, rr);
    c.arcTo(x, y + h, x, y, rr);
    c.arcTo(x, y, x + w, y, rr);
    c.closePath();
}
/** Current uniform-ish scale of the ctx transform (for hairline widths). */ function ctxScale(c) {
    try {
        const t = c.getTransform();
        const det = t.a * t.d - t.b * t.c;
        return Math.sqrt(Math.abs(det)) || 1;
    } catch  {
        return 1;
    }
}
/** Resolve a node's paint: solid color or gradient object. */ function paintOf(c, n) {
    if (n.fillGradient) {
        const g = n.fillGradient;
        let grad;
        if (g.type === 'radial') {
            const r = Math.max(n.w, n.h) / 2;
            grad = c.createRadialGradient(n.w / 2, n.h / 2, 0, n.w / 2, n.h / 2, Math.max(r, 0.01));
        } else {
            const l = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["gradientLine"])(n.w, n.h, g.angle);
            grad = c.createLinearGradient(l.x1, l.y1, l.x2, l.y2);
        }
        grad.addColorStop(0, g.from);
        grad.addColorStop(1, g.to);
        return grad;
    }
    return n.fill;
}
/** Shared fill+stroke painting for closed shapes given a prepared path. */ function paintPath(c, n, path, opts = {}) {
    const fill = outlineMode && !opts.noFill ? null : paintOf(c, n);
    if (fill) {
        c.fillStyle = fill;
        c.fill(path);
    }
    if (n.stroke && n.strokeWidth > 0) {
        c.strokeStyle = n.stroke;
        c.lineWidth = n.strokeWidth;
        const dash = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dashArray"])(n.dash, n.strokeWidth);
        if (dash.length) c.setLineDash(dash);
        c.stroke(path);
        if (dash.length) c.setLineDash([]);
    } else if (outlineMode && !fill) {
        /* outline mode with no paint at all: show a hairline */ c.strokeStyle = 'rgba(255,255,255,0.45)';
        c.lineWidth = 1 / ctxScale(c);
        c.stroke(path);
    }
}
function drawNodes(c, doc, pageId, alpha, ids) {
    const page = doc.pagesById[pageId];
    if (!page) return;
    const targets = ids ? ids.map((id)=>doc.nodesById[id]).filter((n)=>!!n && n.visible) : page.nodeIds.map((id)=>doc.nodesById[id]).filter((n)=>!!n && n.visible);
    for (const n of targets)drawNode(c, doc, n, alpha, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IDENTITY"]);
}
function drawNode(c, doc, n, alpha, parentWorld) {
    if (!n.visible) return;
    const ga = alpha * n.opacity;
    const local = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nodeLocalMatrix"])(n);
    const world = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mMul"])(parentWorld, local);
    c.save();
    c.transform(local.a, local.b, local.c, local.d, local.e, local.f);
    c.globalAlpha = ga;
    if (n.blend && n.blend !== 'normal') c.globalCompositeOperation = n.blend;
    if (n.blur > 0) {
        try {
            c.filter = `blur(${n.blur}px)`;
        } catch  {
        /* canvas filters unsupported */ }
    }
    const applyShadow = ()=>{
        if (n.shadow) {
            c.shadowColor = n.shadow.color;
            c.shadowOffsetX = n.shadow.x;
            c.shadowOffsetY = n.shadow.y;
            c.shadowBlur = n.shadow.blur;
        }
    };
    const clearShadow = ()=>{
        c.shadowColor = 'transparent';
        c.shadowBlur = 0;
        c.shadowOffsetX = 0;
        c.shadowOffsetY = 0;
    };
    if (n.type === 'group') {
        for (const childId of n.children){
            const child = doc.nodesById[childId];
            if (child) drawNode(c, doc, child, ga, world);
        }
        c.restore();
        return;
    }
    if (n.type === 'frame') {
        const framePaint = paintOf(c, n);
        if (framePaint && !outlineMode) {
            roundRectPath(c, 0, 0, n.w, n.h, n.cornerRadius);
            applyShadow();
            c.fillStyle = framePaint;
            c.fill();
            clearShadow();
        }
        if (n.clip) {
            roundRectPath(c, 0, 0, n.w, n.h, n.cornerRadius);
            c.clip();
        }
        for (const childId of n.children){
            const child = doc.nodesById[childId];
            if (child) drawNode(c, doc, child, ga, world);
        }
        if (n.stroke && n.strokeWidth > 0) {
            roundRectPath(c, 0, 0, n.w, n.h, n.cornerRadius);
            c.strokeStyle = n.stroke;
            c.lineWidth = n.strokeWidth;
            const dash = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dashArray"])(n.dash, n.strokeWidth);
            if (dash.length) c.setLineDash(dash);
            c.stroke();
            if (dash.length) c.setLineDash([]);
        }
        c.restore();
        return;
    }
    if (n.type === 'section') {
        // section: translucent backdrop + border + big label (children render on top
        // of the backdrop — sections never clip and never own children at draw time)
        roundRectPath(c, 0, 0, n.w, n.h, n.cornerRadius);
        if (!outlineMode) {
            applyShadow();
            c.fillStyle = paintOf(c, n) ?? 'rgba(136,136,136,0.10)';
            c.fill();
            clearShadow();
        }
        if (n.stroke && n.strokeWidth > 0) {
            roundRectPath(c, 0, 0, n.w, n.h, n.cornerRadius);
            c.strokeStyle = n.stroke;
            c.lineWidth = n.strokeWidth;
            const dash = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dashArray"])(n.dash, n.strokeWidth);
            if (dash.length) c.setLineDash(dash);
            c.stroke();
            if (dash.length) c.setLineDash([]);
        }
        c.restore();
        return;
    }
    if (n.type === 'slice') {
        // slice: dashed editor-only marker with a diagonal cross (skipped on export)
        if (exportPass) {
            c.restore();
            return;
        }
        c.strokeStyle = n.stroke ?? '#F24822';
        c.lineWidth = 1;
        const dash = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dashArray"])('dashed', 1);
        c.setLineDash(dash);
        c.strokeRect(0, 0, n.w, n.h);
        c.setLineDash([]);
        c.globalAlpha = ga * 0.5;
        c.beginPath();
        c.moveTo(0, 0);
        c.lineTo(n.w, n.h);
        c.moveTo(n.w, 0);
        c.lineTo(0, n.h);
        c.stroke();
        c.globalAlpha = ga;
        c.restore();
        return;
    }
    switch(n.type){
        case 'rect':
            {
                const p = new Path2D();
                const rr = Math.max(0, Math.min(n.cornerRadius, n.w / 2, n.h / 2));
                if (rr <= 0) p.rect(0, 0, n.w, n.h);
                else {
                    p.moveTo(rr, 0);
                    p.arcTo(n.w, 0, n.w, n.h, rr);
                    p.arcTo(n.w, n.h, 0, n.h, rr);
                    p.arcTo(0, n.h, 0, 0, rr);
                    p.arcTo(0, 0, n.w, 0, rr);
                    p.closePath();
                }
                applyShadow();
                paintPath(c, n, p);
                clearShadow();
                break;
            }
        case 'ellipse':
            {
                const p = new Path2D();
                p.ellipse(n.w / 2, n.h / 2, Math.abs(n.w / 2), Math.abs(n.h / 2), 0, 0, Math.PI * 2);
                applyShadow();
                paintPath(c, n, p);
                clearShadow();
                break;
            }
        case 'polygon':
        case 'star':
            {
                const p = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["regularPath2d"])(n);
                applyShadow();
                paintPath(c, n, p);
                clearShadow();
                break;
            }
        case 'line':
            {
                const p = new Path2D();
                if (n.flip) {
                    p.moveTo(n.w, 0);
                    p.lineTo(0, n.h);
                } else {
                    p.moveTo(0, 0);
                    p.lineTo(n.w, n.h);
                }
                c.strokeStyle = n.stroke ?? '#000000';
                c.lineWidth = Math.max(n.strokeWidth, 0.5);
                const dash = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dashArray"])(n.dash, n.strokeWidth);
                if (dash.length) c.setLineDash(dash);
                c.stroke(p);
                if (dash.length) c.setLineDash([]);
                break;
            }
        case 'arrow':
            {
                const { shaft, heads } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["arrowPath2d"])(n);
                c.strokeStyle = n.stroke ?? '#000000';
                c.lineWidth = Math.max(n.strokeWidth, 0.5);
                const dash = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dashArray"])(n.dash, n.strokeWidth);
                if (dash.length) c.setLineDash(dash);
                c.stroke(shaft);
                if (dash.length) c.setLineDash([]);
                for (const head of heads){
                    c.fillStyle = n.stroke ?? '#000000';
                    c.fill(head);
                    c.stroke(head);
                }
                break;
            }
        case 'path':
            {
                const p = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["path2dForPoints"])(n.points, n.closed);
                applyShadow();
                paintPath(c, n, p);
                clearShadow();
                break;
            }
        case 'text':
            {
                const tm = textMetrics(n);
                c.font = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["fontString"])(n);
                try {
                    c.letterSpacing = `${n.letterSpacing ?? 0}px`;
                } catch  {
                /* not supported */ }
                c.fillStyle = n.fill ?? '#000000';
                c.textBaseline = 'alphabetic';
                c.textAlign = n.textAlign === 'center' ? 'center' : n.textAlign === 'right' ? 'right' : 'left';
                const x = n.textAlign === 'center' ? n.w / 2 : n.textAlign === 'right' ? n.w : 0;
                const base = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["firstBaseline"])(n, tm.ascent, tm.descent);
                const lineH = n.fontSize * n.lineHeight;
                tm.lines.forEach((line, i)=>{
                    c.fillText(line, x, base + i * lineH);
                    const width = c.measureText(line).width;
                    const x0 = n.textAlign === 'center' ? x - width / 2 : n.textAlign === 'right' ? x - width : x;
                    const y = base + i * lineH;
                    if (n.underline) {
                        c.fillRect(x0, y + n.fontSize * 0.08, width, Math.max(1, n.fontSize * 0.06));
                    }
                    if (n.strike) {
                        c.fillRect(x0, y - n.fontSize * 0.32, width, Math.max(1, n.fontSize * 0.06));
                    }
                });
                try {
                    c.letterSpacing = '0px';
                } catch  {
                /* ignore */ }
                break;
            }
        case 'image':
            {
                const img = n.src ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$imageCache$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getImage"])(n.src) : null;
                if (img && !outlineMode) {
                    if (n.cornerRadius > 0) {
                        roundRectPath(c, 0, 0, n.w, n.h, n.cornerRadius);
                        c.save();
                        c.clip();
                        c.drawImage(img, 0, 0, n.w, n.h);
                        c.restore();
                    } else {
                        c.drawImage(img, 0, 0, n.w, n.h);
                    }
                } else {
                    c.strokeStyle = 'rgba(255,255,255,0.28)';
                    c.lineWidth = 1 / ctxScale(c);
                    c.setLineDash([
                        6 * c.lineWidth,
                        4 * c.lineWidth
                    ]);
                    c.strokeRect(0, 0, n.w, n.h);
                    c.setLineDash([]);
                    c.globalAlpha = ga * 0.5;
                    c.beginPath();
                    c.moveTo(0, 0);
                    c.lineTo(n.w, n.h);
                    c.moveTo(n.w, 0);
                    c.lineTo(0, n.h);
                    c.stroke();
                }
                break;
            }
    }
    c.restore();
}
function applyTextTransform(text, textCase) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["applyTextCase"])(text, textCase);
}
/* text metrics cache keyed by node identity */ const textCache = new WeakMap();
function textMetrics(n) {
    const cached = textCache.get(n);
    if (cached && cached.text === n.text && cached.w === n.w && cached.auto === n.autoWidth && cached.family === n.fontFamily && cached.size === n.fontSize && cached.spacing === n.letterSpacing && cached.tcase === n.textCase) {
        return cached.metrics;
    }
    const metrics = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["measureText"])(n);
    textCache.set(n, {
        text: n.text,
        w: n.w,
        auto: n.autoWidth,
        family: n.fontFamily,
        size: n.fontSize,
        spacing: n.letterSpacing,
        tcase: n.textCase,
        metrics
    });
    return metrics;
}
/* ------------------------------------------------------------------ */ /* Main draw                                                           */ /* ------------------------------------------------------------------ */ function draw() {
    const s = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"].getState();
    if (!canvas || !ctx) return;
    const c = ctx;
    const dpr = window.devicePixelRatio || 1;
    const W = canvas.clientWidth;
    const H = canvas.clientHeight;
    const vp = s.viewport;
    const ox = s.viewFlags.rulers ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULER"] : 0;
    const oy = s.viewFlags.rulers ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULER"] : 0;
    outlineMode = !!s.viewFlags.outline;
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    c.clearRect(0, 0, W, H);
    const bg = /^#[0-9a-fA-F]{3,8}$/.test(s.doc.settings?.bg ?? '') ? s.doc.settings.bg : DEFAULT_CANVAS_BG;
    c.fillStyle = bg;
    c.fillRect(0, 0, W, H);
    // world layer
    c.save();
    c.translate(ox + vp.x, oy + vp.y);
    c.scale(vp.zoom, vp.zoom);
    drawNodes(c, s.doc, s.currentPageId, 1);
    c.restore();
    // pixel grid
    if (s.viewFlags.pixelGrid && vp.zoom >= 8) {
        const view = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["visibleWorldRect"])(vp, W, H, ox, oy);
        c.strokeStyle = vp.zoom >= 32 ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.05)';
        c.lineWidth = 1;
        c.beginPath();
        for(let x = Math.ceil(view.x); x <= view.x + view.w; x++){
            const sx = Math.round(x * vp.zoom + vp.x + ox) + 0.5;
            c.moveTo(sx, oy);
            c.lineTo(sx, H);
        }
        for(let y = Math.ceil(view.y); y <= view.y + view.h; y++){
            const sy = Math.round(y * vp.zoom + vp.y + oy) + 0.5;
            c.moveTo(ox, sy);
            c.lineTo(W, sy);
        }
        c.stroke();
    }
    // layout grid
    const grid = s.doc.settings?.grid;
    if (grid?.show && grid.size >= 1 && vp.zoom * grid.size >= 4) {
        const view = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["visibleWorldRect"])(vp, W, H, ox, oy);
        c.strokeStyle = 'rgba(255,255,255,0.07)';
        c.lineWidth = 1;
        c.beginPath();
        for(let x = Math.ceil(view.x / grid.size) * grid.size; x <= view.x + view.w; x += grid.size){
            const sx = Math.round(x * vp.zoom + vp.x + ox) + 0.5;
            c.moveTo(sx, oy);
            c.lineTo(sx, H);
        }
        for(let y = Math.ceil(view.y / grid.size) * grid.size; y <= view.y + view.h; y += grid.size){
            const sy = Math.round(y * vp.zoom + vp.y + oy) + 0.5;
            c.moveTo(ox, sy);
            c.lineTo(W, sy);
        }
        c.stroke();
    }
    // overlay layer (content-space coords: includes vp pan, not ruler origin)
    c.save();
    c.translate(ox, oy);
    drawOverlay(c, s, W - ox, H - oy);
    c.restore();
    if (s.viewFlags.rulers) drawRulers(c, s, W, H, ox, oy);
    // frame labels (screen space, above everything except rulers)
    drawFrameLabels(c, s, ox, oy, W, H);
}
function drawOverlay(c, s, W, H) {
    const vp = s.viewport;
    const doc = s.doc;
    const toScreen = (p)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["worldToScreen"])(vp, p.x, p.y);
    const page = doc.pagesById[s.currentPageId];
    // empty page hint
    if (page && page.nodeIds.length === 0 && !__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].penDraft) {
        c.fillStyle = '#5F5F5F';
        c.textAlign = 'center';
        c.textBaseline = 'middle';
        c.font = '600 13px Inter, system-ui, sans-serif';
        c.fillText('Nothing here yet', W / 2, H / 2 - 16);
        c.font = '12px Inter, system-ui, sans-serif';
        c.fillStyle = '#4E4E4E';
        c.fillText('Press F for a frame · R rectangle · O ellipse · T text · P pen · Shift+P pencil · C comment', W / 2, H / 2 + 8);
        c.textAlign = 'left';
        c.textBaseline = 'alphabetic';
    }
    // ruler guides
    const guides = doc.settings ?? {
        guidesX: [],
        guidesY: []
    };
    if (guides.guidesX?.length || guides.guidesY?.length) {
        c.strokeStyle = GUIDE_COLOR;
        c.lineWidth = 1;
        c.setLineDash([]);
        for (const gx of guides.guidesX ?? []){
            const x = Math.round(gx * vp.zoom + vp.x) + 0.5;
            c.beginPath();
            c.moveTo(x, 0);
            c.lineTo(x, H);
            c.stroke();
        }
        for (const gy of guides.guidesY ?? []){
            const y = Math.round(gy * vp.zoom + vp.y) + 0.5;
            c.beginPath();
            c.moveTo(0, y);
            c.lineTo(W, y);
            c.stroke();
        }
    }
    // guide drag preview
    if (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].guideDrag) {
        c.strokeStyle = GUIDE_COLOR;
        c.lineWidth = 1;
        c.beginPath();
        if (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].guideDrag.axis === 'x') {
            const x = Math.round(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].guideDrag.at * vp.zoom + vp.x) + 0.5;
            c.moveTo(x, 0);
            c.lineTo(x, H);
        } else {
            const y = Math.round(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].guideDrag.at * vp.zoom + vp.y) + 0.5;
            c.moveTo(0, y);
            c.lineTo(W, y);
        }
        c.stroke();
    }
    // hover outline
    const hover = s.hoverId ? doc.nodesById[s.hoverId] : undefined;
    if (hover && s.tool === 'move' && !s.selection.includes(hover.id) && !__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].marquee && !s.editingTextId && !s.editingPathId) {
        drawNodeOutline(c, doc, hover, vp, 'rgba(255,255,255,0.5)', 1);
    }
    // selection outlines
    for (const id of s.selection){
        const n = doc.nodesById[id];
        if (n) drawNodeOutline(c, doc, n, vp, ACCENT, 1.5);
    }
    // selection handles
    if (s.selection.length > 0 && (s.tool === 'move' || s.tool === 'scale') && !s.editingTextId && !s.editingPathId) {
        const geo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["selectionHandleGeometry"])(doc, s.selection, vp);
        if (geo) {
            // box
            c.strokeStyle = ACCENT;
            c.lineWidth = 1;
            if (geo.poly) {
                c.beginPath();
                geo.poly.forEach((p, i)=>i === 0 ? c.moveTo(p.x, p.y) : c.lineTo(p.x, p.y));
                c.closePath();
                c.stroke();
            } else {
                c.strokeRect(geo.rect.x, geo.rect.y, geo.rect.w, geo.rect.h);
            }
            // rotation handle (move tool only)
            if (s.tool === 'move') {
                const topMid = geo.pts.find((p)=>p.kind === 'n');
                c.beginPath();
                c.moveTo(topMid.x, topMid.y);
                c.lineTo(geo.rot.x, geo.rot.y);
                c.stroke();
                c.beginPath();
                c.arc(geo.rot.x, geo.rot.y, 4, 0, Math.PI * 2);
                c.fillStyle = '#FFFFFF';
                c.fill();
                c.strokeStyle = ACCENT;
                c.stroke();
            }
            // handles (scale tool: corners only)
            for (const p of geo.pts){
                if (s.tool === 'scale' && !(p.kind === 'nw' || p.kind === 'ne' || p.kind === 'sw' || p.kind === 'se')) continue;
                c.fillStyle = '#FFFFFF';
                c.strokeStyle = ACCENT;
                c.lineWidth = 1;
                c.beginPath();
                c.rect(p.x - 3.75, p.y - 3.75, 7.5, 7.5);
                c.fill();
                c.stroke();
            }
        }
    }
    // path edit mode
    if (s.editingPathId) {
        const n = doc.nodesById[s.editingPathId];
        if (n && n.type === 'path') {
            const m = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nodeWorldMatrix"])(doc, n);
            const active = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].pathEdit?.activePoint ?? null;
            n.points.forEach((p, i)=>{
                const pos = toScreen((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mApply"])(m, p.x, p.y));
                const isActive = i === active;
                c.fillStyle = isActive ? ACCENT : '#FFFFFF';
                c.strokeStyle = ACCENT;
                c.lineWidth = 1;
                c.beginPath();
                c.rect(pos.x - 3.5, pos.y - 3.5, 7, 7);
                c.fill();
                c.stroke();
                if (isActive && (p.hx !== 0 || p.hy !== 0)) {
                    const out = toScreen((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mApply"])(m, p.x + p.hx, p.y + p.hy));
                    const inn = toScreen((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mApply"])(m, p.x - p.hx, p.y - p.hy));
                    c.strokeStyle = 'rgba(255,255,255,0.7)';
                    c.beginPath();
                    c.moveTo(inn.x, inn.y);
                    c.lineTo(pos.x, pos.y);
                    c.lineTo(out.x, out.y);
                    c.stroke();
                    for (const h of [
                        inn,
                        out
                    ]){
                        c.beginPath();
                        c.arc(h.x, h.y, 3, 0, Math.PI * 2);
                        c.fillStyle = ACCENT;
                        c.fill();
                    }
                }
            });
        }
    }
    // snap guides
    if (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].guides.length > 0) {
        c.strokeStyle = SNAP;
        c.lineWidth = 1;
        for (const g of __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].guides){
            c.beginPath();
            if (g.axis === 'x') {
                const x = Math.round(g.at * vp.zoom + vp.x) + 0.5;
                const y1 = g.from * vp.zoom + vp.y;
                const y2 = g.to * vp.zoom + vp.y;
                c.moveTo(x, y1);
                c.lineTo(x, y2);
                c.moveTo(x - 3, y1);
                c.lineTo(x + 3, y1);
                c.moveTo(x - 3, y2);
                c.lineTo(x + 3, y2);
            } else {
                const y = Math.round(g.at * vp.zoom + vp.y) + 0.5;
                const x1 = g.from * vp.zoom + vp.x;
                const x2 = g.to * vp.zoom + vp.x;
                c.moveTo(x1, y);
                c.lineTo(x2, y);
                c.moveTo(x1, y - 3);
                c.lineTo(x1, y + 3);
                c.moveTo(x2, y - 3);
                c.lineTo(x2, y + 3);
            }
            c.stroke();
        }
    }
    // size badge during resize / draw
    if (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].dragBadge) {
        const b = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].dragBadge;
        const p = toScreen({
            x: b.x,
            y: b.y
        });
        const label = `${Math.round(b.w)} × ${Math.round(b.h)}`;
        c.font = '600 11px Inter, system-ui, sans-serif';
        const tw = c.measureText(label).width;
        let bx = p.x;
        let by = p.y - 26;
        if (by < 4) by = p.y + 8;
        if (bx < 4) bx = 4;
        if (bx + tw + 12 > W) bx = W - tw - 16;
        c.fillStyle = ACCENT;
        roundRectPath(c, bx, by, tw + 12, 18, 4);
        c.fill();
        c.fillStyle = '#FFFFFF';
        c.textBaseline = 'middle';
        c.fillText(label, bx + 6, by + 9.5);
        c.textBaseline = 'alphabetic';
    }
    // draw-tool preview
    if (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].drawPreview) {
        const dp = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].drawPreview;
        const p1 = toScreen({
            x: dp.rect.x,
            y: dp.rect.y
        });
        const p2 = toScreen({
            x: dp.rect.x + dp.rect.w,
            y: dp.rect.y + dp.rect.h
        });
        const x = Math.min(p1.x, p2.x);
        const y = Math.min(p1.y, p2.y);
        const w = Math.abs(p2.x - p1.x);
        const h = Math.abs(p2.y - p1.y);
        c.strokeStyle = ACCENT;
        c.lineWidth = 1;
        if ((dp.type === 'line' || dp.type === 'arrow') && dp.diagonal) {
            const a = toScreen({
                x: dp.diagonal.x1,
                y: dp.diagonal.y1
            });
            const b = toScreen({
                x: dp.diagonal.x2,
                y: dp.diagonal.y2
            });
            c.beginPath();
            c.moveTo(a.x, a.y);
            c.lineTo(b.x, b.y);
            c.stroke();
        } else if (dp.type === 'ellipse') {
            c.beginPath();
            c.ellipse(x + w / 2, y + h / 2, w / 2, h / 2, 0, 0, Math.PI * 2);
            c.stroke();
        } else if (dp.type === 'frame' || dp.type === 'section') {
            c.fillStyle = 'rgba(255,255,255,0.08)';
            c.fillRect(x, y, w, h);
            c.strokeRect(x, y, w, h);
        } else if (dp.type === 'slice') {
            c.setLineDash([
                5,
                4
            ]);
            c.strokeRect(x, y, w, h);
            c.setLineDash([]);
            c.globalAlpha *= 0.5;
            c.beginPath();
            c.moveTo(x, y);
            c.lineTo(x + w, y + h);
            c.moveTo(x + w, y);
            c.lineTo(x, y + h);
            c.stroke();
            c.globalAlpha /= 0.5;
        } else if (dp.type === 'text') {
            c.setLineDash([
                4,
                3
            ]);
            c.strokeRect(x, y, Math.max(w, 2), Math.max(h, 16));
            c.setLineDash([]);
        } else if (dp.type === 'star' || dp.type === 'polygon') {
            c.beginPath();
            const k = dp.type === 'star' ? 10 : 6;
            const rx = w / 2;
            const ry = h / 2;
            for(let i = 0; i < k; i++){
                const r = dp.type === 'star' && i % 2 === 1 ? 0.45 : 1;
                const a = -Math.PI / 2 + i * Math.PI / (k / 2);
                const px = x + rx + rx * r * Math.cos(a);
                const py = y + ry + ry * r * Math.sin(a);
                if (i === 0) c.moveTo(px, py);
                else c.lineTo(px, py);
            }
            c.closePath();
            c.stroke();
        } else {
            c.strokeRect(x, y, w, h);
        }
    }
    // marquee
    if (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].marquee) {
        const r = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].marquee;
        const p1 = toScreen({
            x: r.x,
            y: r.y
        });
        const p2 = toScreen({
            x: r.x + r.w,
            y: r.y + r.h
        });
        const x = Math.min(p1.x, p2.x);
        const y = Math.min(p1.y, p2.y);
        c.fillStyle = 'rgba(139,92,246,0.08)';
        c.fillRect(x, y, Math.abs(p2.x - p1.x), Math.abs(p2.y - p1.y));
        c.strokeStyle = ACCENT;
        c.lineWidth = 1;
        c.strokeRect(x, y, Math.abs(p2.x - p1.x), Math.abs(p2.y - p1.y));
    }
    // eyedropper magnifier
    if (s.tool === 'eyedropper' && __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].pointerWorld) {
        const p = toScreen(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].pointerWorld);
        c.strokeStyle = ACCENT;
        c.lineWidth = 1;
        roundRectPath(c, p.x + 12, p.y - 16, 64, 22, 4);
        c.fillStyle = '#1E1E1E';
        c.fill();
        c.stroke();
        c.fillStyle = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].pickedColor ?? '#FFFFFF';
        c.fillRect(p.x + 16, p.y - 12, 14, 14);
        c.fillStyle = '#FFFFFF';
        c.font = '600 10px Inter, system-ui, sans-serif';
        c.textBaseline = 'middle';
        c.fillText(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].pickedColor ?? '#—', p.x + 34, p.y - 5);
        c.textBaseline = 'alphabetic';
    }
    // pen draft
    if (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].penDraft && __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].penDraft.points.length > 0) {
        const draft = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].penDraft;
        c.save();
        c.translate(vp.x, vp.y);
        c.scale(vp.zoom, vp.zoom);
        const p = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["path2dForPoints"])(draft.points, false);
        c.strokeStyle = ACCENT;
        c.lineWidth = 1.5 / vp.zoom;
        c.stroke(p);
        if (draft.cursor && !draft.dragging) {
            const last = draft.points[draft.points.length - 1];
            c.setLineDash([
                4 / vp.zoom,
                3 / vp.zoom
            ]);
            c.beginPath();
            c.moveTo(last.x, last.y);
            c.lineTo(draft.cursor.x, draft.cursor.y);
            c.stroke();
            c.setLineDash([]);
        }
        // handles of last point while dragging
        if (draft.dragging) {
            const last = draft.points[draft.points.length - 1];
            if (last.hx !== 0 || last.hy !== 0) {
                c.strokeStyle = 'rgba(255,255,255,0.7)';
                c.lineWidth = 1 / vp.zoom;
                c.beginPath();
                c.moveTo(last.x - last.hx, last.y - last.hy);
                c.lineTo(last.x, last.y);
                c.lineTo(last.x + last.hx, last.y + last.hy);
                c.stroke();
            }
        }
        c.restore();
        // points in screen space
        draft.points.forEach((p, i)=>{
            const pos = toScreen(p);
            if (i === 0) {
                // close-path target
                c.strokeStyle = ACCENT;
                c.lineWidth = 1.5;
                c.beginPath();
                c.arc(pos.x, pos.y, 5, 0, Math.PI * 2);
                c.stroke();
                const near = draft.cursor && Math.hypot(draft.cursor.x - p.x, draft.cursor.y - p.y) * vp.zoom < 10;
                if (near) {
                    c.fillStyle = ACCENT;
                    c.fill();
                }
            }
            c.fillStyle = i === draft.points.length - 1 ? ACCENT : '#FFFFFF';
            c.strokeStyle = ACCENT;
            c.lineWidth = 1;
            c.beginPath();
            c.rect(pos.x - 3.5, pos.y - 3.5, 7, 7);
            c.fill();
            c.stroke();
        });
    }
    // pencil (freehand) draft stroke
    if (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].pencilDraft && __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].pencilDraft.length > 1) {
        const pts = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].pencilDraft;
        c.save();
        c.translate(vp.x, vp.y);
        c.scale(vp.zoom, vp.zoom);
        c.strokeStyle = ACCENT;
        c.lineWidth = 1.5 / vp.zoom;
        c.lineJoin = 'round';
        c.lineCap = 'round';
        c.beginPath();
        pts.forEach((p, i)=>i === 0 ? c.moveTo(p.x, p.y) : c.lineTo(p.x, p.y));
        c.stroke();
        c.restore();
    }
}
function drawNodeOutline(c, doc, n, vp, color, width) {
    const m = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nodeWorldMatrix"])(doc, n);
    const corners = [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mApply"])(m, 0, 0),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mApply"])(m, n.w, 0),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mApply"])(m, n.w, n.h),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mApply"])(m, 0, n.h)
    ].map((p)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["worldToScreen"])(vp, p.x, p.y));
    c.strokeStyle = color;
    c.lineWidth = width;
    c.beginPath();
    corners.forEach((p, i)=>i === 0 ? c.moveTo(p.x, p.y) : c.lineTo(p.x, p.y));
    c.closePath();
    c.stroke();
}
/* ------------------------------------------------------------------ */ /* Rulers                                                              */ /* ------------------------------------------------------------------ */ function niceStep(minPx, zoom) {
    const raw = minPx / zoom;
    const pow = Math.pow(10, Math.floor(Math.log10(raw)));
    for (const mult of [
        1,
        2,
        5,
        10
    ]){
        if (mult * pow >= raw) return mult * pow;
    }
    return 10 * pow;
}
function fmtTick(v) {
    const r = Math.round(v * 100) / 100;
    return String(r);
}
function drawRulers(c, s, W, H, ox, oy) {
    const vp = s.viewport;
    c.fillStyle = RULER_BG;
    c.fillRect(0, 0, W, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULER"]);
    c.fillRect(0, 0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULER"], H);
    c.strokeStyle = RULER_BORDER;
    c.lineWidth = 1;
    c.beginPath();
    c.moveTo(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULER"] - 0.5);
    c.lineTo(W, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULER"] - 0.5);
    c.moveTo(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULER"] - 0.5, 0);
    c.lineTo(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULER"] - 0.5, H);
    c.stroke();
    const step = niceStep(60, vp.zoom);
    const x0 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["screenToWorld"])(vp, ox, 0).x;
    const x1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["screenToWorld"])(vp, W, 0).x;
    const y0 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["screenToWorld"])(vp, 0, oy).y;
    const y1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["screenToWorld"])(vp, 0, H).y;
    c.font = '9px Inter, system-ui, sans-serif';
    c.fillStyle = RULER_TEXT;
    c.strokeStyle = RULER_TEXT;
    c.textBaseline = 'alphabetic';
    c.textAlign = 'left';
    c.beginPath();
    for(let x = Math.ceil(x0 / step) * step; x <= x1; x += step){
        const sx = Math.round(x * vp.zoom + vp.x + ox) + 0.5;
        c.moveTo(sx, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULER"] - 5);
        c.lineTo(sx, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULER"]);
        c.fillText(fmtTick(x), sx + 3, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULER"] - 7);
    }
    for(let y = Math.ceil(y0 / step) * step; y <= y1; y += step){
        const sy = Math.round(y * vp.zoom + vp.y + oy) + 0.5;
        c.moveTo(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULER"] - 5, sy);
        c.lineTo(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULER"], sy);
        c.save();
        c.translate(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULER"] - 7, sy + 3);
        c.rotate(-Math.PI / 2);
        c.fillText(fmtTick(y), 0, 0);
        c.restore();
    }
    c.stroke();
    // selection extent bands
    if (s.selection.length > 0) {
        const box = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["boundsOfNodes"])(s.doc, s.selection);
        if (box) {
            const sx1 = box.x * vp.zoom + vp.x + ox;
            const sx2 = (box.x + box.w) * vp.zoom + vp.x + ox;
            const sy1 = box.y * vp.zoom + vp.y + oy;
            const sy2 = (box.y + box.h) * vp.zoom + vp.y + oy;
            c.fillStyle = 'rgba(139,92,246,0.35)';
            c.fillRect(sx1, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULER"] - 3, sx2 - sx1, 3);
            c.fillRect(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULER"] - 3, sy1, 3, sy2 - sy1);
        }
    }
    // guide markers on rulers
    const guides = s.doc.settings;
    if (guides) {
        c.fillStyle = GUIDE_COLOR;
        for (const gx of guides.guidesX ?? []){
            const px = Math.round(gx * vp.zoom + vp.x + ox) + 0.5;
            c.beginPath();
            c.moveTo(px, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULER"] - 8);
            c.lineTo(px - 4, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULER"] - 1);
            c.lineTo(px + 4, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULER"] - 1);
            c.closePath();
            c.fill();
        }
        for (const gy of guides.guidesY ?? []){
            const py = Math.round(gy * vp.zoom + vp.y + oy) + 0.5;
            c.beginPath();
            c.moveTo(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULER"] - 8, py);
            c.lineTo(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULER"] - 1, py - 4);
            c.lineTo(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULER"] - 1, py + 4);
            c.closePath();
            c.fill();
        }
    }
    // pointer marker
    if (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].pointerWorld) {
        const px = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].pointerWorld.x * vp.zoom + vp.x + ox;
        const py = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].pointerWorld.y * vp.zoom + vp.y + oy;
        c.strokeStyle = '#9A9A9A';
        c.beginPath();
        c.moveTo(Math.round(px) + 0.5, 0);
        c.lineTo(Math.round(px) + 0.5, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULER"]);
        c.moveTo(0, Math.round(py) + 0.5);
        c.lineTo(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULER"], Math.round(py) + 0.5);
        c.stroke();
    }
}
/* ------------------------------------------------------------------ */ /* Frame labels                                                        */ /* ------------------------------------------------------------------ */ function drawFrameLabels(c, s, ox, oy, W, H) {
    const vp = s.viewport;
    const page = s.doc.pagesById[s.currentPageId];
    if (!page) return;
    c.textAlign = 'left';
    for (const id of page.nodeIds){
        const n = s.doc.nodesById[id];
        if (!n || !n.visible) continue;
        const box = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nodeWorldAABB"])(s.doc, n);
        const x = box.x * vp.zoom + vp.x + ox;
        const y = box.y * vp.zoom + vp.y + oy;
        if (x > W || y > H || x + box.w * vp.zoom < 0) continue;
        if (n.type === 'frame') {
            if (y < __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULER"] + 14) continue;
            c.font = '11px Inter, system-ui, sans-serif';
            c.fillStyle = s.selection.includes(id) ? ACCENT_LIGHT : '#8A8A8A';
            c.fillText(n.name, x, y - 6);
        } else if (n.type === 'section') {
            // big section label, inside the top-left corner
            const fs = Math.max(12, Math.min(18, 14 * vp.zoom));
            c.font = `600 ${fs}px Inter, system-ui, sans-serif`;
            c.fillStyle = s.selection.includes(id) ? ACCENT_LIGHT : 'rgba(214,214,214,0.85)';
            c.fillText(n.name, x + 16 * vp.zoom, y + 26 * vp.zoom);
        }
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/iris/engine/library.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createLibraryDoc",
    ()=>createLibraryDoc,
    "deleteDocInLibrary",
    ()=>deleteDocInLibrary,
    "duplicateDocInLibrary",
    ()=>duplicateDocInLibrary,
    "getEntry",
    ()=>getEntry,
    "getStoredDoc",
    ()=>getStoredDoc,
    "importDocIntoLibrary",
    ()=>importDocIntoLibrary,
    "libraryStats",
    ()=>libraryStats,
    "listDocs",
    ()=>listDocs,
    "migrateLegacyLibrary",
    ()=>migrateLegacyLibrary,
    "renameDocInLibrary",
    ()=>renameDocInLibrary,
    "renderDocThumb",
    ()=>renderDocThumb,
    "saveDocToLibrary",
    ()=>saveDocToLibrary
]);
/**
 * Iris document library — multi-document persistence in localStorage.
 *
 * Layout:
 *   iris.library.v2          -> LibEntry[]  (metadata + thumbnail, no scene data)
 *   iris.doc.v2.<id>         -> StoredDoc   (full IrisDoc + last page + viewport)
 *
 * Thumbnails are small JPEG dataURLs rendered from the first page with the
 * shared canvas renderer, regenerated (throttled) whenever a doc is autosaved.
 *
 * A one-time migration imports the legacy single-slot autosave
 * (iris.autosave.v1) and any .iris snapshots kept in the old recents list
 * (iris.recents.v1) so existing work shows up on the homepage.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/engine/model.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/engine/geometry.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$renderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/engine/renderer.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$imageCache$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/engine/imageCache.ts [app-client] (ecmascript)");
;
;
;
;
const INDEX_KEY = 'iris.library.v2';
const DOC_KEY_PREFIX = 'iris.doc.v2.';
const LEGACY_AUTOSAVE_KEY = 'iris.autosave.v1';
const LEGACY_RECENTS_KEY = 'iris.recents.v1';
const LEGACY_MIGRATED_KEY = 'iris.library.migrated.v1';
const THUMB_W = 480;
const THUMB_H = 300;
const THUMB_PAD = 30;
/** don't re-render a doc thumbnail more often than this */ const THUMB_MIN_INTERVAL = 4000;
const lastThumbAt = new Map();
/* ------------------------------------------------------------------ */ /* index + doc storage                                                 */ /* ------------------------------------------------------------------ */ function readIndex() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const raw = window.localStorage.getItem(INDEX_KEY);
        if (!raw) return [];
        const list = JSON.parse(raw);
        return Array.isArray(list) ? list.filter((e)=>e && typeof e.id === 'string' && typeof e.name === 'string') : [];
    } catch  {
        return [];
    }
}
function writeIndex(list) {
    try {
        window.localStorage.setItem(INDEX_KEY, JSON.stringify(list));
        return true;
    } catch  {
        return false;
    }
}
function updateIndex(mut) {
    return writeIndex(mut(readIndex()));
}
function listDocs() {
    return [
        ...readIndex()
    ].sort((a, b)=>b.updatedAt - a.updatedAt);
}
function getEntry(id) {
    return readIndex().find((e)=>e.id === id) ?? null;
}
function getStoredDoc(id) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const raw = window.localStorage.getItem(DOC_KEY_PREFIX + id);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (!parsed || !parsed.doc) return null;
        return {
            doc: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeDoc"])(parsed.doc),
            currentPageId: typeof parsed.currentPageId === 'string' ? parsed.currentPageId : null,
            viewport: parsed.viewport && typeof parsed.viewport.x === 'number' && typeof parsed.viewport.zoom === 'number' ? parsed.viewport : null,
            savedAt: typeof parsed.savedAt === 'number' ? parsed.savedAt : Date.now()
        };
    } catch  {
        return null;
    }
}
function writeStoredDoc(id, stored) {
    try {
        window.localStorage.setItem(DOC_KEY_PREFIX + id, JSON.stringify(stored));
        return true;
    } catch  {
        return false; // quota exceeded — keep whatever was there before
    }
}
async function renderDocThumb(doc) {
    if (typeof document === 'undefined') return null;
    const pageId = doc.pages[0];
    const page = doc.pagesById[pageId];
    if (!page) return null;
    const roots = page.nodeIds.map((id)=>doc.nodesById[id]).filter((n)=>n && n.visible);
    if (roots.length === 0) return null;
    const bounds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["boundsOfNodes"])(doc, roots.map((n)=>n.id));
    if (!bounds || bounds.w < 1 || bounds.h < 1) return null;
    /* make sure embedded images are decoded before drawing */ const srcs = new Set();
    for (const n of Object.values(doc.nodesById)){
        if (n.type === 'image' && n.src && n.visible) srcs.add(n.src);
    }
    if (srcs.size) await Promise.all([
        ...srcs
    ].map((s)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$imageCache$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadImage"])(s)));
    const canvas = document.createElement('canvas');
    canvas.width = THUMB_W;
    canvas.height = THUMB_H;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, THUMB_W, THUMB_H);
    const scale = Math.min((THUMB_W - THUMB_PAD * 2) / bounds.w, (THUMB_H - THUMB_PAD * 2) / bounds.h, 2);
    const ox = (THUMB_W - bounds.w * scale) / 2 - bounds.x * scale;
    const oy = (THUMB_H - bounds.h * scale) / 2 - bounds.y * scale;
    ctx.setTransform(scale, 0, 0, scale, ox, oy);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$renderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["drawNodes"])(ctx, doc, pageId, 1);
    try {
        return canvas.toDataURL('image/jpeg', 0.75);
    } catch  {
        return null;
    }
}
function refreshThumb(id, doc, force = false) {
    const now = Date.now();
    if (!force && now - (lastThumbAt.get(id) ?? 0) < THUMB_MIN_INTERVAL) return;
    lastThumbAt.set(id, now);
    void renderDocThumb(doc).then((thumb)=>{
        updateIndex((list)=>{
            const i = list.findIndex((e)=>e.id === id);
            if (i < 0) return list;
            list[i] = {
                ...list[i],
                thumb
            };
            return list;
        });
    });
}
function saveDocToLibrary(id, doc, extra) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    const stored = {
        doc,
        currentPageId: extra?.currentPageId ?? null,
        viewport: extra?.viewport ?? null,
        savedAt: Date.now()
    };
    const ok = writeStoredDoc(id, stored);
    const existing = getEntry(id);
    if (!existing && !ok) return false;
    const counts = {
        pageCount: doc.pages.length,
        nodeCount: Object.keys(doc.nodesById).length
    };
    const hadContent = !!existing && (existing.nodeCount > 0 || existing.thumb !== null);
    updateIndex((list)=>{
        const i = list.findIndex((e)=>e.id === id);
        if (i >= 0) {
            list[i] = {
                ...list[i],
                name: doc.name,
                updatedAt: stored.savedAt,
                ...counts
            };
            return list;
        }
        return [
            ...list,
            {
                id,
                name: doc.name,
                createdAt: stored.savedAt,
                updatedAt: stored.savedAt,
                ...counts,
                thumb: null
            }
        ];
    });
    /* skip thumb renders while a doc is still empty; render once content exists */ if (counts.nodeCount > 0 && !hadContent) refreshThumb(id, doc, true);
    else if (counts.nodeCount > 0) refreshThumb(id, doc);
    return ok;
}
function importDocIntoLibrary(rawDoc, opts) {
    const doc = opts?.name ? {
        ...rawDoc,
        name: opts.name
    } : rawDoc;
    const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["uid"])();
    const now = Date.now();
    const stored = {
        doc,
        currentPageId: opts?.currentPageId ?? doc.pages[0] ?? null,
        viewport: opts?.viewport ?? null,
        savedAt: opts?.updatedAt ?? now
    };
    writeStoredDoc(id, stored);
    const entry = {
        id,
        name: doc.name,
        createdAt: opts?.createdAt ?? now,
        updatedAt: opts?.updatedAt ?? now,
        pageCount: doc.pages.length,
        nodeCount: Object.keys(doc.nodesById).length,
        thumb: null
    };
    updateIndex((list)=>[
            ...list,
            entry
        ]);
    refreshThumb(id, doc, true);
    return entry;
}
function createLibraryDoc() {
    const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createDefaultDoc"])();
    const taken = new Set(readIndex().map((e)=>e.name));
    doc.name = uniqueName(doc.name, taken);
    const entry = importDocIntoLibrary(doc);
    return {
        id: entry.id,
        doc
    };
}
function renameDocInLibrary(id, name) {
    const trimmed = name.trim();
    if (!trimmed) return;
    updateIndex((list)=>list.map((e)=>e.id === id ? {
                ...e,
                name: trimmed
            } : e));
    const stored = getStoredDoc(id);
    if (stored && stored.doc.name !== trimmed) {
        stored.doc = {
            ...stored.doc,
            name: trimmed
        };
        writeStoredDoc(id, stored);
    }
}
function deleteDocInLibrary(id) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        window.localStorage.removeItem(DOC_KEY_PREFIX + id);
    } catch  {
    /* ignore */ }
    updateIndex((list)=>list.filter((e)=>e.id !== id));
    lastThumbAt.delete(id);
}
function duplicateDocInLibrary(id) {
    const stored = getStoredDoc(id);
    const entry = getEntry(id);
    if (!stored || !entry) return null;
    const names = new Set(readIndex().map((e)=>e.name));
    const m = entry.name.match(/^(.*) \(\d+\)$/);
    const base = m ? m[1] : entry.name;
    return importDocIntoLibrary(stored.doc, {
        name: uniqueName(base, names),
        createdAt: Date.now(),
        currentPageId: stored.currentPageId,
        viewport: stored.viewport
    });
}
function libraryStats() {
    const list = readIndex();
    let bytes = 0;
    if ("TURBOPACK compile-time truthy", 1) {
        try {
            const idxRaw = window.localStorage.getItem(INDEX_KEY);
            if (idxRaw) bytes += idxRaw.length;
            for (const e of list){
                const raw = window.localStorage.getItem(DOC_KEY_PREFIX + e.id);
                if (raw) bytes += raw.length;
            }
        } catch  {
        /* ignore */ }
    }
    return {
        count: list.length,
        bytes
    };
}
function uniqueName(base, taken) {
    if (!taken.has(base)) return base;
    let n = 2;
    while(taken.has(`${base} (${n})`))n += 1;
    return `${base} (${n})`;
}
function migrateLegacyLibrary() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        if (window.localStorage.getItem(LEGACY_MIGRATED_KEY)) return;
        /* 1) the old single-document autosave — most important WIP doc */ try {
            const raw = window.localStorage.getItem(LEGACY_AUTOSAVE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeDoc"])(parsed.doc);
                if (Object.keys(doc.nodesById).length > 0) {
                    importDocIntoLibrary(doc, {
                        createdAt: parsed.savedAt ?? Date.now(),
                        updatedAt: parsed.savedAt ?? Date.now(),
                        currentPageId: typeof parsed.currentPageId === 'string' ? parsed.currentPageId : null,
                        viewport: parsed.viewport ?? null
                    });
                }
            }
        } catch  {
        /* ignore bad legacy data */ }
        /* 2) .iris snapshots that were kept in the old recents list */ try {
            const rawRecents = window.localStorage.getItem(LEGACY_RECENTS_KEY);
            if (rawRecents) {
                const list = JSON.parse(rawRecents);
                if (Array.isArray(list)) {
                    const names = new Set(readIndex().map((e)=>e.name));
                    for (const r of list.slice().reverse()){
                        if (!r || !r.doc) continue;
                        const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeDoc"])(r.doc);
                        if (Object.keys(doc.nodesById).length === 0) continue;
                        doc.name = r.name || doc.name;
                        if (names.has(doc.name)) continue;
                        importDocIntoLibrary(doc, {
                            createdAt: r.savedAt ?? Date.now(),
                            updatedAt: r.savedAt ?? Date.now()
                        });
                        names.add(doc.name);
                    }
                }
            }
        } catch  {
        /* ignore */ }
        window.localStorage.setItem(LEGACY_MIGRATED_KEY, String(Date.now()));
    } catch  {
    /* ignore */ }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/iris/engine/templates.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TEMPLATES",
    ()=>TEMPLATES,
    "buildTemplate",
    ()=>buildTemplate
]);
/**
 * Iris document templates — starter scenes for the homepage "New from
 * template" picker. Each template returns a fully assembled IrisDoc.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/engine/model.ts [app-client] (ecmascript)");
;
const TEMPLATES = [
    {
        id: 'mobile',
        name: 'Mobile App',
        description: 'iPhone-size screen with header, hero and actions'
    },
    {
        id: 'desktop',
        name: 'Web Wireframe',
        description: 'Desktop layout with nav, sidebar and content blocks'
    },
    {
        id: 'kanban',
        name: 'Kanban Board',
        description: 'Three-column board with sample cards'
    },
    {
        id: 'poster',
        name: 'Poster',
        description: 'A4 poster with gradient hero and headline'
    }
];
class Builder {
    doc;
    pageId;
    constructor(name){
        const base = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createDefaultDoc"])();
        const page = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPage"])('Page 1');
        this.doc = {
            ...base,
            name,
            pages: [
                page.id
            ],
            pagesById: {
                [page.id]: page
            }
        };
        this.pageId = page.id;
    }
    add(type, patch, parent) {
        const node = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createNode"])(type, this.pageId, patch);
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
function buildMobile() {
    const b = new Builder('Mobile App');
    const phone = b.add('frame', {
        x: 0,
        y: 0,
        w: 390,
        h: 844,
        fill: '#FFFFFF',
        name: 'Phone / Home',
        cornerRadius: 24
    });
    b.add('rect', {
        x: 0,
        y: 0,
        w: 390,
        h: 120,
        fill: '#8B5CF6',
        name: 'Header',
        cornerRadius: 0
    }, phone);
    b.add('text', {
        x: 24,
        y: 64,
        w: 200,
        h: 24,
        text: 'Good morning',
        fontSize: 16,
        fill: '#E9DDFF',
        autoWidth: true
    }, phone);
    b.add('text', {
        x: 24,
        y: 88,
        w: 260,
        h: 30,
        text: 'My Workspace',
        fontSize: 24,
        fontWeight: 700,
        fill: '#FFFFFF',
        autoWidth: true
    }, phone);
    const hero = b.add('rect', {
        x: 24,
        y: 148,
        w: 342,
        h: 160,
        fill: '#F3EEFF',
        cornerRadius: 16,
        name: 'Hero card'
    }, phone);
    void hero;
    b.add('star', {
        x: 48,
        y: 180,
        w: 44,
        h: 44,
        fill: '#8B5CF6',
        starPoints: 5,
        name: 'Star'
    }, phone);
    b.add('text', {
        x: 108,
        y: 180,
        w: 240,
        h: 26,
        text: 'Weekly digest',
        fontSize: 18,
        fontWeight: 600,
        fill: '#1E1E1E',
        autoWidth: true
    }, phone);
    b.add('text', {
        x: 108,
        y: 210,
        w: 240,
        h: 44,
        text: 'Your designs improved 32% this week. Keep it up!',
        fontSize: 13,
        fill: '#6F6F6F',
        autoWidth: false
    }, phone);
    const cta = b.add('rect', {
        x: 24,
        y: 330,
        w: 342,
        h: 52,
        fill: '#8B5CF6',
        cornerRadius: 12,
        name: 'CTA'
    }, phone);
    void cta;
    b.add('text', {
        x: 24,
        y: 346,
        w: 342,
        h: 22,
        text: 'Continue designing',
        fontSize: 15,
        fontWeight: 600,
        textAlign: 'center',
        fill: '#FFFFFF',
        autoWidth: false
    }, phone);
    const items = [
        'Recent files',
        'Shared with me',
        'Templates',
        'Settings'
    ];
    items.forEach((label, i)=>{
        const y = 410 + i * 64;
        b.add('rect', {
            x: 24,
            y,
            w: 342,
            h: 52,
            fill: '#F5F5F5',
            cornerRadius: 12,
            name: `Row ${i + 1}`
        }, phone);
        b.add('ellipse', {
            x: 40,
            y: y + 14,
            w: 24,
            h: 24,
            fill: i % 2 === 0 ? '#C4B5FD' : '#A78BFA',
            name: `Dot ${i + 1}`
        }, phone);
        b.add('text', {
            x: 76,
            y: y + 16,
            w: 240,
            h: 20,
            text: label,
            fontSize: 14,
            fill: '#1E1E1E',
            autoWidth: true
        }, phone);
        b.add('arrow', {
            x: 322,
            y: y + 17,
            w: 16,
            h: 0,
            stroke: '#9A9A9A',
            strokeWidth: 1.5,
            name: `Chevron ${i + 1}`
        }, phone);
    });
    b.add('rect', {
        x: 0,
        y: 792,
        w: 390,
        h: 52,
        fill: '#FFFFFF',
        name: 'Tab bar'
    }, phone);
    return b.doc;
}
function buildDesktop() {
    const b = new Builder('Web Wireframe');
    const screen = b.add('frame', {
        x: 0,
        y: 0,
        w: 1440,
        h: 900,
        fill: '#FFFFFF',
        name: 'Desktop / Dashboard'
    });
    b.add('rect', {
        x: 0,
        y: 0,
        w: 1440,
        h: 64,
        fill: '#1E1E1E',
        name: 'Nav'
    }, screen);
    b.add('ellipse', {
        x: 24,
        y: 16,
        w: 32,
        h: 32,
        fill: '#8B5CF6',
        name: 'Logo'
    }, screen);
    b.add('text', {
        x: 68,
        y: 22,
        w: 120,
        h: 22,
        text: 'Iris HQ',
        fontSize: 16,
        fontWeight: 700,
        fill: '#FFFFFF',
        autoWidth: true
    }, screen);
    [
        'Product',
        'Pricing',
        'Docs',
        'Blog'
    ].forEach((label, i)=>{
        b.add('text', {
            x: 1080 + i * 90,
            y: 22,
            w: 80,
            h: 20,
            text: label,
            fontSize: 13,
            fill: '#C9C9C9',
            autoWidth: true
        }, screen);
    });
    b.add('rect', {
        x: 0,
        y: 64,
        w: 240,
        h: 836,
        fill: '#F5F5F5',
        name: 'Sidebar'
    }, screen);
    [
        'Overview',
        'Projects',
        'Team',
        'Analytics',
        'Billing'
    ].forEach((label, i)=>{
        const y = 96 + i * 44;
        b.add('rect', {
            x: 16,
            y,
            w: 208,
            h: 32,
            fill: i === 0 ? '#E9DDFF' : null,
            stroke: i === 0 ? null : '#E0E0E0',
            cornerRadius: 8,
            name: `Nav item ${i + 1}`
        }, screen);
        b.add('text', {
            x: 32,
            y: y + 8,
            w: 170,
            h: 18,
            text: label,
            fontSize: 13,
            fill: '#1E1E1E',
            autoWidth: true
        }, screen);
    });
    b.add('text', {
        x: 272,
        y: 96,
        w: 400,
        h: 34,
        text: 'Dashboard',
        fontSize: 26,
        fontWeight: 700,
        fill: '#1E1E1E',
        autoWidth: true
    }, screen);
    // stat cards
    const stats = [
        {
            label: 'Visitors',
            value: '12.4k',
            color: '#8B5CF6'
        },
        {
            label: 'Sign-ups',
            value: '1,204',
            color: '#A78BFA'
        },
        {
            label: 'Revenue',
            value: '$9.8k',
            color: '#C4B5FD'
        },
        {
            label: 'Churn',
            value: '2.1%',
            color: '#DDD6FE'
        }
    ];
    stats.forEach((s, i)=>{
        const x = 272 + i * 282;
        b.add('rect', {
            x,
            y: 148,
            w: 258,
            h: 108,
            fill: '#FAFAFA',
            stroke: '#EAEAEA',
            cornerRadius: 14,
            name: `Card ${i + 1}`
        }, screen);
        b.add('rect', {
            x: x + 20,
            y: 168,
            w: 40,
            h: 40,
            fill: s.color,
            cornerRadius: 10,
            name: `Icon ${i + 1}`
        }, screen);
        b.add('text', {
            x: x + 72,
            y: 168,
            w: 160,
            h: 16,
            text: s.label,
            fontSize: 12,
            fill: '#8A8A8A',
            autoWidth: true
        }, screen);
        b.add('text', {
            x: x + 72,
            y: 186,
            w: 160,
            h: 28,
            text: s.value,
            fontSize: 22,
            fontWeight: 700,
            fill: '#1E1E1E',
            autoWidth: true
        }, screen);
    });
    // chart placeholder + table
    b.add('rect', {
        x: 272,
        y: 284,
        w: 540,
        h: 320,
        fill: '#FFFFFF',
        stroke: '#EAEAEA',
        cornerRadius: 14,
        name: 'Chart'
    }, screen);
    const pts = [
        30,
        55,
        40,
        90,
        70,
        120,
        100,
        150
    ];
    pts.forEach((v, i)=>{
        b.add('rect', {
            x: 300 + i * 62,
            y: 564 - v,
            w: 34,
            h: v,
            fill: i % 2 === 0 ? '#8B5CF6' : '#C4B5FD',
            cornerRadius: 6,
            name: `Bar ${i + 1}`
        }, screen);
    });
    b.add('rect', {
        x: 836,
        y: 284,
        w: 332,
        h: 320,
        fill: '#FFFFFF',
        stroke: '#EAEAEA',
        cornerRadius: 14,
        name: 'Activity'
    }, screen);
    [
        'Alia shipped a file',
        'Bilal left a comment',
        'Mira shared a link',
        'Team synced styles'
    ].forEach((label, i)=>{
        const y = 316 + i * 64;
        b.add('ellipse', {
            x: 860,
            y,
            w: 28,
            h: 28,
            fill: '#E9DDFF',
            name: `Avatar ${i + 1}`
        }, screen);
        b.add('text', {
            x: 900,
            y: y + 2,
            w: 250,
            h: 18,
            text: label,
            fontSize: 13,
            fill: '#1E1E1E',
            autoWidth: true
        }, screen);
        b.add('text', {
            x: 900,
            y: y + 22,
            w: 250,
            h: 14,
            text: `${i + 1}h ago`,
            fontSize: 11,
            fill: '#9A9A9A',
            autoWidth: true
        }, screen);
    });
    return b.doc;
}
function buildKanban() {
    const b = new Builder('Kanban Board');
    b.add('text', {
        x: 0,
        y: -40,
        w: 300,
        h: 28,
        text: 'Sprint 12',
        fontSize: 22,
        fontWeight: 700,
        fill: '#FFFFFF',
        autoWidth: true
    });
    const columns = [
        {
            title: 'To do',
            color: '#9A9A9A',
            cards: [
                'Research fonts',
                'Wireframe onboarding',
                'Audit colors'
            ]
        },
        {
            title: 'In progress',
            color: '#8B5CF6',
            cards: [
                'Frame rendering fix',
                'Export pipeline'
            ]
        },
        {
            title: 'Done',
            color: '#22C55E',
            cards: [
                'Pen tool',
                'Auto layout spike',
                'Design tokens'
            ]
        }
    ];
    columns.forEach((col, ci)=>{
        const x = ci * 340;
        const frame = b.add('frame', {
            x,
            y: 0,
            w: 320,
            h: 560,
            fill: '#2C2C2C',
            stroke: '#3E3E3E',
            cornerRadius: 12,
            name: col.title
        });
        b.add('ellipse', {
            x: 20,
            y: 20,
            w: 12,
            h: 12,
            fill: col.color,
            name: `Status ${ci + 1}`
        }, frame);
        b.add('text', {
            x: 42,
            y: 16,
            w: 200,
            h: 20,
            text: col.title,
            fontSize: 15,
            fontWeight: 600,
            fill: '#FFFFFF',
            autoWidth: true
        }, frame);
        col.cards.forEach((card, i)=>{
            const y = 52 + i * 96;
            b.add('rect', {
                x: 16,
                y,
                w: 288,
                h: 80,
                fill: '#383838',
                cornerRadius: 10,
                name: `Card ${ci + 1}-${i + 1}`
            }, frame);
            b.add('text', {
                x: 32,
                y: y + 14,
                w: 256,
                h: 18,
                text: card,
                fontSize: 13,
                fontWeight: 500,
                fill: '#FFFFFF',
                autoWidth: true
            }, frame);
            b.add('rect', {
                x: 32,
                y: y + 44,
                w: 64,
                h: 18,
                fill: col.color,
                cornerRadius: 9,
                opacity: 0.6,
                name: `Tag ${ci + 1}-${i + 1}`
            }, frame);
            b.add('ellipse', {
                x: 268,
                y: y + 46,
                w: 20,
                h: 20,
                fill: '#C4B5FD',
                name: `Assignee ${ci + 1}-${i + 1}`
            }, frame);
        });
    });
    return b.doc;
}
function buildPoster() {
    const b = new Builder('Poster');
    const page = b.add('frame', {
        x: 0,
        y: 0,
        w: 794,
        h: 1123,
        fill: '#141414',
        cornerRadius: 0,
        name: 'A4 Poster'
    });
    b.add('rect', {
        x: 0,
        y: 0,
        w: 794,
        h: 1123,
        fill: null,
        fillGradient: {
            type: 'radial',
            angle: 90,
            from: '#8B5CF6',
            to: '#141414'
        },
        name: 'Backdrop'
    }, page);
    b.add('star', {
        x: 287,
        y: 160,
        w: 220,
        h: 220,
        fill: null,
        stroke: '#C4B5FD',
        strokeWidth: 1.5,
        starPoints: 6,
        innerRadius: 0.62,
        name: 'Flower'
    }, page);
    b.add('text', {
        x: 97,
        y: 430,
        w: 600,
        h: 84,
        text: 'Design in bloom',
        fontSize: 64,
        fontWeight: 700,
        textAlign: 'center',
        fill: '#FFFFFF',
        autoWidth: false
    }, page);
    b.add('text', {
        x: 147,
        y: 530,
        w: 500,
        h: 48,
        text: 'A paper-craft poster made with the Iris vector engine',
        fontSize: 18,
        textAlign: 'center',
        fill: '#C9C9C9',
        autoWidth: false
    }, page);
    b.add('line', {
        x: 297,
        y: 620,
        w: 200,
        h: 0,
        stroke: '#8B5CF6',
        strokeWidth: 2,
        name: 'Divider'
    }, page);
    b.add('polygon', {
        x: 322,
        y: 660,
        w: 150,
        h: 130,
        fill: '#8B5CF6',
        sides: 3,
        name: 'Triangle'
    }, page);
    b.add('text', {
        x: 247,
        y: 830,
        w: 300,
        h: 20,
        text: 'iris.studio — 2025',
        fontSize: 13,
        textAlign: 'center',
        fill: '#9A9A9A',
        letterSpacing: 4,
        autoWidth: false
    }, page);
    return b.doc;
}
function buildTemplate(id) {
    switch(id){
        case 'mobile':
            return buildMobile();
        case 'desktop':
            return buildDesktop();
        case 'kanban':
            return buildKanban();
        case 'poster':
            return buildPoster();
        default:
            {
                const b = new Builder('Untitled');
                return b.doc;
            }
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/iris/engine/router.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Minimal client-side routing for Iris: the file browser (homepage) lives at
 * "/" and an open document at "/?doc=<id>". Uses the History API directly so
 * switching documents never reloads the page; popstate events are synced back
 * into the store by the app shell (Back / Forward work as expected).
 */ __turbopack_context__.s([
    "hrefForRoute",
    ()=>hrefForRoute,
    "pushRoute",
    ()=>pushRoute,
    "replaceRoute",
    ()=>replaceRoute,
    "routeFromLocation",
    ()=>routeFromLocation
]);
function routeFromLocation() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const id = new URLSearchParams(window.location.search).get('doc');
        return id ? {
            kind: 'doc',
            id
        } : {
            kind: 'home'
        };
    } catch  {
        return {
            kind: 'home'
        };
    }
}
function hrefForRoute(route) {
    return route.kind === 'doc' ? `/?doc=${encodeURIComponent(route.id)}` : '/';
}
function pushRoute(route) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        window.history.pushState(null, '', hrefForRoute(route));
    } catch  {
    /* ignore */ }
}
function replaceRoute(route) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        window.history.replaceState(null, '', hrefForRoute(route));
    } catch  {
    /* ignore */ }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/iris/engine/store.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCanvasPage",
    ()=>useCanvasPage,
    "useIris",
    ()=>useIris,
    "useSelectedNodes",
    ()=>useSelectedNodes
]);
/**
 * Iris store (zustand): document, pages, selection, tool, viewport,
 * snapshot-based undo/redo with coalescing, clipboard, alignment,
 * grouping, z-order, doc settings (grid/guides/bg), style clipboard
 * and localStorage autosave.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2f$shallow$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react/shallow.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/engine/model.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/engine/geometry.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$library$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/engine/library.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$templates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/engine/templates.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$router$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/engine/router.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
/* ------------------------------------------------------------------ */ const HISTORY_LIMIT = 100;
const DEFAULT_VIEWPORT = {
    x: 120,
    y: 120,
    zoom: 1
};
function deepClone(v) {
    if (typeof structuredClone === 'function') return structuredClone(v);
    return JSON.parse(JSON.stringify(v));
}
function draftOf(doc) {
    return {
        name: doc.name,
        pages: doc.pages,
        pagesById: {
            ...doc.pagesById
        },
        nodesById: {
            ...doc.nodesById
        },
        settings: {
            ...doc.settings,
            grid: {
                ...doc.settings.grid
            },
            guidesX: [
                ...doc.settings.guidesX
            ],
            guidesY: [
                ...doc.settings.guidesY
            ]
        },
        comments: doc.comments ? doc.comments.map((c)=>({
                ...c
            })) : []
    };
}
function putNode(draft, id, patch) {
    const old = draft.nodesById[id];
    if (!old) return;
    draft.nodesById[id] = {
        ...old,
        ...typeof patch === 'function' ? patch(old) : patch
    };
}
function putPage(draft, id, patch) {
    const old = draft.pagesById[id];
    if (!old) return;
    draft.pagesById[id] = {
        ...old,
        ...patch
    };
}
function removeChildRef(draft, pageId, parentId, childId) {
    if (parentId === null) {
        const page = draft.pagesById[pageId];
        if (page) putPage(draft, pageId, {
            nodeIds: page.nodeIds.filter((c)=>c !== childId)
        });
    } else {
        const p = draft.nodesById[parentId];
        if (p) putNode(draft, parentId, {
            children: p.children.filter((c)=>c !== childId)
        });
    }
}
function insertChildRef(draft, pageId, parentId, childId, index) {
    if (parentId === null) {
        const page = draft.pagesById[pageId];
        if (!page) return;
        const list = page.nodeIds.filter((c)=>c !== childId);
        const at = index === undefined || index < 0 || index > list.length ? list.length : index;
        list.splice(at, 0, childId);
        putPage(draft, pageId, {
            nodeIds: list
        });
    } else {
        const p = draft.nodesById[parentId];
        if (!p) return;
        const list = p.children.filter((c)=>c !== childId);
        const at = index === undefined || index < 0 || index > list.length ? list.length : index;
        list.splice(at, 0, childId);
        putNode(draft, parentId, {
            children: list
        });
    }
}
/** Extract rotation/x/y so the node's local matrix equals `m` (node size fixed). */ function applyLocalMatrix(node, m) {
    const r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setNodeWorldTransform"])(node, m);
    node.x = r.x;
    node.y = r.y;
    node.rotation = r.rotation;
}
/** Scale all descendants of a container by (sx, sy) in the container's local space. */ function scaleSubtree(draft, rootId, sx, sy, scaleFont) {
    const root = draft.nodesById[rootId];
    if (!root || !root.children) return;
    const visit = (id)=>{
        const n = draft.nodesById[id];
        if (!n) return;
        const patch = {
            x: n.x * sx,
            y: n.y * sy,
            w: Math.max(0.5, n.w * sx),
            h: Math.max(0.5, n.h * sy)
        };
        if (scaleFont) {
            const s = (Math.abs(sx) + Math.abs(sy)) / 2;
            if (Math.abs(s - 1) > 0.001) {
                patch.fontSize = Math.max(1, n.fontSize * s);
                patch.cornerRadius = Math.max(0, n.cornerRadius * s);
            }
        }
        if (n.points.length) {
            patch.points = n.points.map((p)=>({
                    x: p.x * sx,
                    y: p.y * sy,
                    hx: p.hx * sx,
                    hy: p.hy * sy
                }));
        }
        putNode(draft, id, patch);
        n.children.forEach(visit);
    };
    root.children.forEach(visit);
}
let toastSeq = 1;
let autosaveTimer = null;
let lastHistoryLabel;
let lastHistoryAt = 0;
/** pending interaction snapshot (drag begin/commit) */ let pendingSnapshot = null;
/** Persist the active document into the library (callers debounce). */ function saveAutosave(state) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    if (!state.docId) return;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$library$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveDocToLibrary"])(state.docId, state.doc, {
        currentPageId: state.currentPageId,
        viewport: state.viewport
    });
}
function scheduleAutosave(get) {
    if (autosaveTimer) clearTimeout(autosaveTimer);
    autosaveTimer = setTimeout(()=>saveAutosave(get()), 800);
}
/**
 * One-time boot: run the legacy storage migration, then restore the document
 * named in the URL (?doc=<id>). Returns null when starting at the homepage.
 */ function bootIris() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$library$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["migrateLegacyLibrary"])();
    const route = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$router$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routeFromLocation"])();
    if (route.kind !== 'doc') return null;
    const stored = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$library$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStoredDoc"])(route.id);
    if (!stored) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$router$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["replaceRoute"])({
            kind: 'home'
        }); // stale URL — clean it up
        return null;
    }
    const doc = stored.doc;
    const pageId = stored.currentPageId && doc.pages.includes(stored.currentPageId) ? stored.currentPageId : doc.pages[0];
    return {
        doc,
        docId: route.id,
        pageId,
        viewport: stored.viewport ?? DEFAULT_VIEWPORT
    };
}
const useIris = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])()((set, get)=>{
    // NOTE: the initial doc must be created exactly once — a second
    // createDefaultDoc() would produce a phantom currentPageId.
    const booted = bootIris();
    const initialDoc = booted?.doc ?? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createDefaultDoc"])();
    const initialPageId = booted?.pageId ?? initialDoc.pages[0];
    const initialRoute = booted ? {
        kind: 'doc',
        id: booted.docId
    } : {
        kind: 'home'
    };
    /**
   * Core mutation pipeline: optional history push, clone-on-write doc mutation,
   * selection sanity, autosave scheduling.
   */ const commit = (mutator, opts)=>{
        const state = get();
        const history = opts?.history === undefined ? true : opts.history;
        if (history !== false) {
            const label = typeof history === 'string' ? history : undefined;
            const now = Date.now();
            const coalesce = label !== undefined && label === lastHistoryLabel && now - lastHistoryAt < 700;
            if (!coalesce && state.doc.nodesById && state.doc.pagesById) {
                const snap = {
                    doc: deepClone(state.doc),
                    selection: [
                        ...state.selection
                    ],
                    currentPageId: state.currentPageId
                };
                set((s)=>({
                        past: [
                            ...s.past,
                            snap
                        ].slice(-HISTORY_LIMIT),
                        future: []
                    }));
            }
            lastHistoryLabel = label;
            lastHistoryAt = now;
        }
        const draft = draftOf(state.doc);
        mutator(draft);
        const pageId = get().currentPageId;
        let sel = get().selection.filter((id)=>{
            const n = draft.nodesById[id];
            return !!n && n.pageId === pageId;
        });
        if (opts?.selection) {
            const valid = opts.selection.filter((id)=>draft.nodesById[id] && draft.nodesById[id].pageId === pageId);
            if (valid.length || opts.selection.length === 0) sel = valid;
        }
        const st = get();
        const editingTextId = st.editingTextId && draft.nodesById[st.editingTextId] ? st.editingTextId : null;
        const editingPathId = st.editingPathId && draft.nodesById[st.editingPathId] ? st.editingPathId : null;
        set({
            doc: draft,
            selection: sel,
            editingTextId,
            editingPathId,
            dirty: opts?.skipDirty ? st.dirty : true
        });
        scheduleAutosave(get);
    };
    const currentPage = ()=>get().currentPageId;
    /** Shared paste/duplicate: clone source subtrees with a world-space offset. */ const pasteOrDuplicate = (sourceNodes, sourceRoots, dx, dy)=>{
        if (sourceRoots.length === 0) return [];
        const state = get();
        const pageId = currentPage();
        const idMap = new Map();
        let counter = 0;
        for (const n of sourceNodes){
            counter += 1;
            idMap.set(n.id, `${n.id}c${counter}${Math.random().toString(36).slice(2, 6)}`);
        }
        const cloned = sourceNodes.map((n)=>({
                ...n,
                id: idMap.get(n.id),
                pageId,
                children: n.children.map((c)=>idMap.get(c)).filter((c)=>!!c),
                points: n.points.map((p)=>({
                        ...p
                    })),
                fillGradient: n.fillGradient ? {
                    ...n.fillGradient
                } : null,
                shadow: n.shadow ? {
                    ...n.shadow
                } : null
            }));
        const worldTargets = new Map();
        for (const root of sourceRoots){
            const W = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nodeWorldMatrix"])(state.doc, root);
            worldTargets.set(idMap.get(root.id), (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mMul"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mTranslate"])(dx, dy), W));
        }
        const newRootIds = sourceRoots.map((r)=>idMap.get(r.id));
        commit((draft)=>{
            for (const c of cloned){
                let parentId = null;
                if (c.parentId) {
                    const pid = idMap.get(c.parentId) ?? c.parentId;
                    const pn = draft.nodesById[pid];
                    if (pn && pn.pageId === pageId && (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isContainer"])(pn)) parentId = pid;
                }
                const node = {
                    ...c,
                    parentId
                };
                const target = worldTargets.get(c.id);
                if (target) applyLocalMatrix(node, target);
                draft.nodesById[c.id] = node;
            }
            for (const c of cloned){
                const node = draft.nodesById[c.id];
                if (node) insertChildRef(draft, pageId, node.parentId, c.id, undefined);
            }
        }, {
            history: 'paste',
            selection: newRootIds
        });
        return newRootIds;
    };
    const viewportCenter = ()=>{
        const { viewport, canvasSize } = get();
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["screenToWorld"])(viewport, Math.max(0, canvasSize.w / 2 - 10), Math.max(0, canvasSize.h / 2 - 10));
    };
    /** Style fields copied by copy/paste style. */ const STYLE_FIELDS = [
        'fill',
        'stroke',
        'strokeWidth',
        'cornerRadius',
        'opacity',
        'dash',
        'fillGradient',
        'shadow',
        'blur',
        'blend',
        'fontFamily',
        'fontSize',
        'fontWeight',
        'textAlign',
        'lineHeight',
        'letterSpacing',
        'textCase',
        'underline',
        'strike'
    ];
    return {
        doc: initialDoc,
        docId: booted?.docId ?? null,
        route: initialRoute,
        currentPageId: initialPageId,
        selection: [],
        tool: 'move',
        viewport: booted?.viewport ?? DEFAULT_VIEWPORT,
        editingTextId: null,
        editingPathId: null,
        hoverId: null,
        viewFlags: {
            rulers: true,
            pixelGrid: true,
            outline: false
        },
        past: [],
        future: [],
        clipboard: null,
        contextMenu: null,
        exportOpen: false,
        shortcutsOpen: false,
        toasts: [],
        savedName: null,
        dirty: false,
        canvasSize: {
            w: 800,
            h: 600
        },
        styleClipboard: null,
        presenting: false,
        inspectMode: false,
        shareOpen: false,
        leftPanelView: 'layers',
        leftPanelOpen: true,
        activeCommentId: null,
        showComments: true,
        rightTab: 'design',
        setLeftPanelView: (view, toggle)=>set((s)=>{
                if (toggle && s.leftPanelView === view && s.leftPanelOpen) return {
                    leftPanelOpen: false
                };
                return {
                    leftPanelView: view,
                    leftPanelOpen: true
                };
            }),
        toggleLeftPanel: ()=>set((s)=>({
                    leftPanelOpen: !s.leftPanelOpen
                })),
        setRightTab: (tab)=>set({
                rightTab: tab
            }),
        setPresenting: (v)=>set({
                presenting: v
            }),
        setInspectMode: (v)=>set({
                inspectMode: v
            }),
        setShareOpen: (v)=>set({
                shareOpen: v
            }),
        /* ------------------------- comments ---------------------------- */ addComment: (x, y, text)=>{
            const c = {
                id: `cm${Math.random().toString(36).slice(2, 10)}`,
                pageId: get().currentPageId,
                x,
                y,
                text,
                author: 'You',
                ts: Date.now(),
                resolved: false
            };
            commit((draft)=>{
                draft.comments = [
                    ...draft.comments,
                    c
                ];
            }, {
                history: 'comment'
            });
            return c.id;
        },
        updateComment: (id, patch)=>{
            commit((draft)=>{
                draft.comments = draft.comments.map((c)=>c.id === id ? {
                        ...c,
                        ...patch
                    } : c);
            }, {
                history: 'comment'
            });
        },
        deleteComment: (id)=>{
            commit((draft)=>{
                draft.comments = draft.comments.filter((c)=>c.id !== id);
            }, {
                history: 'comment'
            });
            set((s)=>s.activeCommentId === id ? {
                    activeCommentId: null
                } : {});
        },
        setActiveComment: (id)=>set({
                activeCommentId: id
            }),
        setShowComments: (v)=>set({
                showComments: v
            }),
        /* ------------------------ frame presets ------------------------ */ addFramePreset: (preset)=>{
            // presets always land at the top level of the page (Figma behavior) —
            // centered on the current view, offset if it would overlap existing
            // top-level frames
            const s = get();
            const center = viewportCenter();
            const page = s.doc.pagesById[s.currentPageId];
            let x = center.x - preset.w / 2;
            let y = center.y - preset.h / 2;
            if (page) {
                const overlap = page.nodeIds.some((id)=>{
                    const n = s.doc.nodesById[id];
                    if (!n || n.type !== 'frame') return false;
                    const b = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nodeWorldAABB"])(s.doc, n);
                    return Math.abs(b.x - x) < 32 && Math.abs(b.y - y) < 32;
                });
                if (overlap) {
                    x += 60;
                    y += 60;
                }
            }
            return get().addNode('frame', {
                x,
                y,
                w: preset.w,
                h: preset.h,
                name: preset.name
            }, null);
        },
        /* ------------------------- tool / view ------------------------- */ setTool: (tool)=>{
            const st = get();
            if (st.tool === tool) return;
            if (st.editingTextId) set({
                editingTextId: null
            });
            if (st.editingPathId) set({
                editingPathId: null
            });
            set({
                tool
            });
        },
        setHover: (id)=>set({
                hoverId: id
            }),
        setCanvasSize: (w, h)=>set({
                canvasSize: {
                    w,
                    h
                }
            }),
        setViewFlag: (key, value)=>set((s)=>({
                    viewFlags: {
                        ...s.viewFlags,
                        [key]: value
                    }
                })),
        setViewport: (vp)=>{
            set({
                viewport: vp
            });
            scheduleAutosave(get);
        },
        panBy: (dx, dy)=>{
            set((s)=>({
                    viewport: {
                        ...s.viewport,
                        x: s.viewport.x + dx,
                        y: s.viewport.y + dy
                    }
                }));
            scheduleAutosave(get);
        },
        zoomAt: (factor, screenX, screenY)=>{
            const { viewport, canvasSize } = get();
            const z = Math.min(256, Math.max(0.02, viewport.zoom * factor));
            if (Math.abs(z - viewport.zoom) < 1e-9) return;
            const cx = screenX ?? Math.max(0, canvasSize.w / 2 - 10);
            const cy = screenY ?? Math.max(0, canvasSize.h / 2 - 10);
            const k = z / viewport.zoom;
            set({
                viewport: {
                    zoom: z,
                    x: cx - (cx - viewport.x) * k,
                    y: cy - (cy - viewport.y) * k
                }
            });
            scheduleAutosave(get);
        },
        setZoom: (z)=>get().zoomAt(z / get().viewport.zoom),
        zoomToFit: ()=>{
            const { doc, currentPageId, canvasSize } = get();
            const page = doc.pagesById[currentPageId];
            if (!page) return;
            const rects = page.nodeIds.map((id)=>doc.nodesById[id]).filter(Boolean).map((n)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nodeWorldAABB"])(doc, n));
            const bounds = rects.length ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["unionRects"])(rects) : {
                x: 0,
                y: 0,
                w: 800,
                h: 600
            };
            const cw = Math.max(50, canvasSize.w - 80);
            const ch = Math.max(50, canvasSize.h - 80);
            const zoom = Math.min(256, Math.max(0.02, Math.min(cw / Math.max(bounds.w, 1), ch / Math.max(bounds.h, 1)) * 0.9));
            set({
                viewport: {
                    zoom,
                    x: (canvasSize.w - 30) / 2 - (bounds.x + bounds.w / 2) * zoom,
                    y: (canvasSize.h - 30) / 2 - (bounds.y + bounds.h / 2) * zoom
                }
            });
            scheduleAutosave(get);
        },
        zoomToSelection: ()=>{
            const { doc, selection, canvasSize } = get();
            const bounds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["boundsOfNodes"])(doc, selection);
            if (!bounds) return;
            const cw = Math.max(50, canvasSize.w - 120);
            const ch = Math.max(50, canvasSize.h - 120);
            const zoom = Math.min(64, Math.max(0.02, Math.min(cw / Math.max(bounds.w, 1), ch / Math.max(bounds.h, 1)) * 0.9));
            set({
                viewport: {
                    zoom,
                    x: (canvasSize.w - 30) / 2 - (bounds.x + bounds.w / 2) * zoom,
                    y: (canvasSize.h - 30) / 2 - (bounds.y + bounds.h / 2) * zoom
                }
            });
            scheduleAutosave(get);
        },
        zoomReset: ()=>get().setZoom(1),
        /* ---------------------------- pages ---------------------------- */ setCurrentPage: (id)=>{
            const st = get();
            if (!st.doc.pagesById[id] || id === st.currentPageId) return;
            set({
                currentPageId: id,
                selection: [],
                editingTextId: null,
                editingPathId: null,
                hoverId: null
            });
        },
        addPage: ()=>{
            const state = get();
            const page = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPage"])(`Page ${state.doc.pages.length + 1}`);
            commit((draft)=>{
                draft.pages = [
                    ...draft.pages,
                    page.id
                ];
                draft.pagesById[page.id] = page;
            }, {
                history: 'page',
                selection: []
            });
            set({
                currentPageId: page.id
            });
        },
        deletePage: (id)=>{
            const state = get();
            if (state.doc.pages.length <= 1) {
                get().toast('A document needs at least one page');
                return;
            }
            const page = state.doc.pagesById[id];
            if (!page) return;
            const doomed = new Set();
            page.nodeIds.forEach((rootId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collectSubtree"])(state.doc, rootId).forEach((n)=>doomed.add(n.id)));
            const remaining = state.doc.pages.filter((p)=>p !== id);
            commit((draft)=>{
                for (const nid of doomed)delete draft.nodesById[nid];
                draft.pages = remaining;
                delete draft.pagesById[id];
            }, {
                history: 'page',
                selection: []
            });
            set({
                currentPageId: remaining[0]
            });
            get().toast(`Deleted “${page.name}”`);
        },
        renamePage: (id, name)=>{
            const trimmed = name.trim();
            if (!trimmed) return;
            commit((draft)=>putPage(draft, id, {
                    name: trimmed
                }), {
                history: false
            });
        },
        duplicatePage: (id)=>{
            const state = get();
            const page = state.doc.pagesById[id];
            if (!page) return;
            const copy = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPage"])(`${page.name} copy`);
            const idMap = new Map();
            const clone = [];
            const visit = (nid)=>{
                const n = state.doc.nodesById[nid];
                if (!n) return;
                const fresh = {
                    ...n,
                    id: n.id,
                    pageId: copy.id,
                    points: n.points.map((p)=>({
                            ...p
                        })),
                    fillGradient: n.fillGradient ? {
                        ...n.fillGradient
                    } : null,
                    shadow: n.shadow ? {
                        ...n.shadow
                    } : null
                };
                clone.push(fresh);
                n.children.forEach(visit);
            };
            page.nodeIds.forEach(visit);
            // fresh ids must be generated up-front to remap children
            for (const n of clone)idMap.set(n.id, `${n.id}p${Math.random().toString(36).slice(2, 7)}`);
            const remapped = clone.map((n)=>({
                    ...n,
                    id: idMap.get(n.id),
                    parentId: n.parentId ? idMap.get(n.parentId) ?? null : null,
                    children: n.children.map((c)=>idMap.get(c)).filter((c)=>!!c)
                }));
            commit((draft)=>{
                draft.pages = [
                    ...draft.pages,
                    copy.id
                ];
                draft.pagesById[copy.id] = {
                    ...copy,
                    nodeIds: page.nodeIds.map((nid)=>idMap.get(nid)).filter(Boolean)
                };
                for (const n of remapped)draft.nodesById[n.id] = n;
            }, {
                history: 'page',
                selection: []
            });
            set({
                currentPageId: copy.id
            });
            get().toast(`Duplicated “${page.name}”`);
        },
        movePage: (id, dir)=>{
            const state = get();
            const i = state.doc.pages.indexOf(id);
            const j = i + dir;
            if (i < 0 || j < 0 || j >= state.doc.pages.length) return;
            commit((draft)=>{
                const pages = [
                    ...draft.pages
                ];
                const [moved] = pages.splice(i, 1);
                pages.splice(j, 0, moved);
                draft.pages = pages;
            }, {
                history: 'page'
            });
        },
        setDocName: (name)=>{
            const trimmed = name.trim();
            if (!trimmed) return;
            set((s)=>({
                    doc: {
                        ...s.doc,
                        name: trimmed
                    },
                    dirty: true
                }));
            const { docId } = get();
            if (docId) (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$library$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["renameDocInLibrary"])(docId, trimmed);
            scheduleAutosave(get);
        },
        /* -------------------------- selection -------------------------- */ setSelection: (ids)=>{
            const { doc, currentPageId } = get();
            const page = doc.pagesById[currentPageId];
            const onPage = new Set();
            const addTree = (nid)=>{
                onPage.add(nid);
                doc.nodesById[nid]?.children.forEach(addTree);
            };
            page?.nodeIds.forEach(addTree);
            const sel = [];
            for (const id of ids){
                if (onPage.has(id) && !sel.includes(id)) sel.push(id);
            }
            set({
                selection: sel
            });
        },
        toggleSelection: (id)=>{
            const sel = get().selection;
            get().setSelection(sel.includes(id) ? sel.filter((s)=>s !== id) : [
                ...sel,
                id
            ]);
        },
        selectAll: ()=>{
            const { doc, currentPageId } = get();
            const page = doc.pagesById[currentPageId];
            if (page) set({
                selection: [
                    ...page.nodeIds
                ]
            });
        },
        selectSameType: ()=>{
            const { doc, selection, currentPageId } = get();
            const page = doc.pagesById[currentPageId];
            if (!page || selection.length === 0) return;
            const types = new Set(selection.map((id)=>doc.nodesById[id]?.type).filter(Boolean));
            const out = [];
            const visit = (nid)=>{
                const n = doc.nodesById[nid];
                if (!n) return;
                if (types.has(n.type)) out.push(nid);
                n.children.forEach(visit);
            };
            page.nodeIds.forEach(visit);
            // keep only top-level entries (drop nested descendants of the selection)
            const top = out.filter((id)=>{
                let p = doc.nodesById[id]?.parentId;
                while(p){
                    if (out.includes(p)) return false;
                    p = doc.nodesById[p]?.parentId;
                }
                return true;
            });
            if (top.length) set({
                selection: top
            });
            get().toast(`Selected ${top.length} object${top.length === 1 ? '' : 's'} of the same type`);
        },
        /* --------------------------- history --------------------------- */ pushHistory: (label)=>{
            commit(()=>{}, {
                history: label
            });
        },
        historyBegin: ()=>{
            const s = get();
            pendingSnapshot = {
                doc: deepClone(s.doc),
                selection: [
                    ...s.selection
                ],
                currentPageId: s.currentPageId
            };
        },
        historyCommit: ()=>{
            if (!pendingSnapshot) return;
            const snap = pendingSnapshot;
            pendingSnapshot = null;
            set((s)=>({
                    past: [
                        ...s.past,
                        snap
                    ].slice(-HISTORY_LIMIT),
                    future: []
                }));
            lastHistoryLabel = undefined;
        },
        historyCancel: ()=>{
            pendingSnapshot = null;
        },
        undo: ()=>{
            const s = get();
            if (s.past.length === 0) return;
            const prev = s.past[s.past.length - 1];
            const current = {
                doc: deepClone(s.doc),
                selection: [
                    ...s.selection
                ],
                currentPageId: s.currentPageId
            };
            const validPage = prev.doc.pages.includes(prev.currentPageId) ? prev.currentPageId : prev.doc.pages[0];
            const validSelection = prev.selection.filter((id)=>prev.doc.nodesById[id] && prev.doc.nodesById[id].pageId === validPage);
            set({
                doc: prev.doc,
                selection: validSelection,
                currentPageId: validPage,
                past: s.past.slice(0, -1),
                future: [
                    current,
                    ...s.future
                ].slice(0, HISTORY_LIMIT),
                editingTextId: null,
                editingPathId: null,
                dirty: true
            });
            lastHistoryLabel = undefined;
            scheduleAutosave(get);
        },
        redo: ()=>{
            const s = get();
            if (s.future.length === 0) return;
            const next = s.future[0];
            const current = {
                doc: deepClone(s.doc),
                selection: [
                    ...s.selection
                ],
                currentPageId: s.currentPageId
            };
            const validPage = next.doc.pages.includes(next.currentPageId) ? next.currentPageId : next.doc.pages[0];
            const validSelection = next.selection.filter((id)=>next.doc.nodesById[id] && next.doc.nodesById[id].pageId === validPage);
            set({
                doc: next.doc,
                selection: validSelection,
                currentPageId: validPage,
                past: [
                    ...s.past,
                    current
                ].slice(-HISTORY_LIMIT),
                future: s.future.slice(1),
                editingTextId: null,
                editingPathId: null,
                dirty: true
            });
            lastHistoryLabel = undefined;
            scheduleAutosave(get);
        },
        /* ---------------------------- nodes ---------------------------- */ addNode: (type, patch, parentId)=>{
            const state = get();
            const pageId = currentPage();
            const node = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createNode"])(type, pageId, {
                name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nextName"])(state.doc, type),
                ...patch,
                parentId: parentId ?? null
            });
            commit((draft)=>{
                draft.nodesById[node.id] = node;
                insertChildRef(draft, pageId, parentId ?? null, node.id);
            }, {
                selection: [
                    node.id
                ]
            });
            return node.id;
        },
        updateNodes: (ids, patch, opts)=>{
            commit((draft)=>{
                for (const id of ids)putNode(draft, id, patch);
            }, {
                history: opts?.history
            });
        },
        setNodeRect: (id, rect, opts)=>{
            commit((draft)=>{
                const n = draft.nodesById[id];
                if (!n) return;
                const oldW = n.w;
                const oldH = n.h;
                const w = Math.max(n.type === 'line' || n.type === 'arrow' ? 0 : 1, rect.w);
                const h = Math.max(n.type === 'line' || n.type === 'arrow' ? 0 : 1, rect.h);
                putNode(draft, id, {
                    x: rect.x,
                    y: rect.y,
                    w,
                    h
                });
                if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isContainer"])(n) && oldW > 0.01 && oldH > 0.01) {
                    scaleSubtree(draft, id, w / oldW, h / oldH, true);
                } else if (n.type === 'text' && Math.abs(w - oldW) > 0.01 && Math.abs(h - oldH) > 0.01) {
                    const s = w / oldW * 0.5 + h / oldH * 0.5;
                    putNode(draft, id, {
                        fontSize: Math.max(1, n.fontSize * s),
                        autoWidth: false
                    });
                } else if (n.type === 'text' && Math.abs(w - oldW) > 0.01) {
                    putNode(draft, id, {
                        autoWidth: false
                    });
                }
            }, {
                history: opts?.history
            });
        },
        deleteNodes: (ids)=>{
            if (ids.length === 0) return;
            const state = get();
            const pageId = currentPage();
            const doomed = new Set();
            for (const id of ids)(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collectSubtree"])(state.doc, id).forEach((n)=>doomed.add(n.id));
            if (doomed.size === 0) return;
            commit((draft)=>{
                for (const nid of doomed){
                    const n = draft.nodesById[nid];
                    if (n) removeChildRef(draft, pageId, n.parentId, nid);
                    delete draft.nodesById[nid];
                }
            }, {
                history: 'delete',
                selection: []
            });
            get().toast(`Deleted ${doomed.size} object${doomed.size === 1 ? '' : 's'}`, {
                label: 'Undo',
                run: ()=>get().undo()
            });
        },
        deleteSelection: ()=>get().deleteNodes(get().selection),
        copySelection: ()=>{
            const state = get();
            if (state.selection.length === 0) return;
            const roots = state.selection.map((id)=>state.doc.nodesById[id]).filter(Boolean);
            const nodes = [];
            roots.forEach((r)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collectSubtree"])(state.doc, r.id).forEach((n)=>nodes.push({
                        ...n,
                        points: n.points.map((p)=>({
                                ...p
                            }))
                    })));
            const origin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["boundsOfNodes"])(state.doc, state.selection);
            set({
                clipboard: origin ? {
                    nodes,
                    rootIds: roots.map((r)=>r.id),
                    origin,
                    pageId: state.currentPageId,
                    count: 0
                } : null
            });
            get().toast(`Copied ${roots.length} object${roots.length > 1 ? 's' : ''}`);
        },
        cutSelection: ()=>{
            get().copySelection();
            get().deleteSelection();
        },
        paste: (at)=>{
            const state = get();
            const clip = state.clipboard;
            if (!clip) {
                get().toast('Clipboard is empty');
                return;
            }
            const pageId = currentPage();
            const dx = at ? at.x - clip.origin.x : 12 * (clip.count + 1);
            const dy = at ? at.y - clip.origin.y : 12 * (clip.count + 1);
            set({
                clipboard: {
                    ...clip,
                    count: clip.count + 1
                }
            });
            const rootIds = clip.rootIds;
            const roots = rootIds.map((id)=>clip.nodes.find((n)=>n.id === id)).filter(Boolean);
            const ids = new Set();
            const byId = Object.fromEntries(clip.nodes.map((n)=>[
                    n.id,
                    n
                ]));
            const fakeDoc = {
                pages: [],
                pagesById: {},
                nodesById: byId,
                name: '',
                settings: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_SETTINGS"]
            };
            roots.forEach((r)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collectSubtree"])(fakeDoc, r.id).forEach((n)=>ids.add(n.id)));
            const nodes = clip.nodes.filter((n)=>ids.has(n.id));
            const newRoots = pasteOrDuplicate(nodes, roots, dx, dy);
            if (newRoots.length) get().setSelection(newRoots);
        },
        duplicateSelection: (offset)=>{
            const state = get();
            if (state.selection.length === 0) return [];
            const { dx = 10, dy = 10 } = offset ?? {};
            const roots = state.selection.map((id)=>state.doc.nodesById[id]).filter(Boolean);
            const nodes = [];
            roots.forEach((r)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["collectSubtree"])(state.doc, r.id).forEach((n)=>nodes.push(n)));
            return pasteOrDuplicate(nodes, roots, dx, dy);
        },
        groupSelection: ()=>{
            const state = get();
            const nodes = state.selection.map((id)=>state.doc.nodesById[id]).filter(Boolean);
            if (nodes.length === 0) return;
            const parentId = nodes[0].parentId;
            if (nodes.some((n)=>n.parentId !== parentId)) {
                get().toast('Grouping requires objects with the same parent');
                return;
            }
            const pageId = currentPage();
            const rects = nodes.map((n)=>{
                const m = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nodeLocalMatrix"])(n);
                return {
                    x: Math.min((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mApplyVec"])(m, 0, 0).x, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mApplyVec"])(m, n.w, 0).x, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mApplyVec"])(m, n.w, n.h).x, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mApplyVec"])(m, 0, n.h).x),
                    y: Math.min((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mApplyVec"])(m, 0, 0).y, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mApplyVec"])(m, n.w, 0).y, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mApplyVec"])(m, n.w, n.h).y, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mApplyVec"])(m, 0, n.h).y)
                };
            });
            const maxRec = nodes.map((n)=>{
                const m = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nodeLocalMatrix"])(n);
                return {
                    x: Math.max((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mApplyVec"])(m, 0, 0).x, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mApplyVec"])(m, n.w, 0).x, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mApplyVec"])(m, n.w, n.h).x, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mApplyVec"])(m, 0, n.h).x),
                    y: Math.max((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mApplyVec"])(m, 0, 0).y, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mApplyVec"])(m, n.w, 0).y, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mApplyVec"])(m, n.w, n.h).y, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mApplyVec"])(m, 0, n.h).y)
                };
            });
            const x = Math.min(...rects.map((r)=>r.x));
            const y = Math.min(...rects.map((r)=>r.y));
            const maxX = Math.max(...maxRec.map((r)=>r.x));
            const maxY = Math.max(...maxRec.map((r)=>r.y));
            const group = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createNode"])('group', pageId, {
                name: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nextName"])(state.doc, 'group'),
                x,
                y,
                w: Math.max(1, maxX - x),
                h: Math.max(1, maxY - y),
                parentId,
                children: []
            });
            const ordered = nodes.slice().sort((a, b)=>{
                const list = parentId === null ? state.doc.pagesById[pageId].nodeIds : state.doc.nodesById[parentId].children;
                return list.indexOf(a.id) - list.indexOf(b.id);
            });
            const insertAt = (()=>{
                const list = parentId === null ? state.doc.pagesById[pageId].nodeIds : state.doc.nodesById[parentId].children;
                const idx = Math.max(...ordered.map((n)=>list.indexOf(n.id)));
                return idx - ordered.length + 1; // slot of the topmost selected after removals
            })();
            commit((draft)=>{
                for (const n of ordered)removeChildRef(draft, pageId, parentId, n.id);
                draft.nodesById[group.id] = {
                    ...group,
                    children: ordered.map((n)=>n.id)
                };
                for (const n of ordered){
                    putNode(draft, n.id, {
                        parentId: group.id,
                        x: n.x - x,
                        y: n.y - y
                    });
                }
                insertChildRef(draft, pageId, parentId, group.id, insertAt);
            }, {
                history: 'group',
                selection: [
                    group.id
                ]
            });
        },
        ungroupSelection: ()=>{
            const state = get();
            const containers = state.selection.map((id)=>state.doc.nodesById[id]).filter((n)=>!!n && (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isContainer"])(n));
            if (containers.length === 0) {
                get().toast('Select a group or frame to ungroup');
                return;
            }
            const pageId = currentPage();
            const freed = [];
            commit((draft)=>{
                for (const c of containers){
                    const node = draft.nodesById[c.id];
                    if (!node) continue;
                    const parentId = node.parentId;
                    const list = parentId === null ? draft.pagesById[pageId].nodeIds : draft.nodesById[parentId].children;
                    const index = list.indexOf(c.id);
                    removeChildRef(draft, pageId, parentId, c.id);
                    const childIds = [
                        ...node.children
                    ];
                    let at = index < 0 ? undefined : index;
                    for (const childId of childIds){
                        const child = draft.nodesById[childId];
                        if (!child) continue;
                        const m = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mMul"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nodeLocalMatrix"])(node), (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nodeLocalMatrix"])(child));
                        const fresh = {
                            ...child
                        };
                        applyLocalMatrix(fresh, m);
                        fresh.parentId = parentId;
                        draft.nodesById[childId] = fresh;
                        insertChildRef(draft, pageId, parentId, childId, at);
                        at = at === undefined ? undefined : at + 1;
                        freed.push(childId);
                    }
                    delete draft.nodesById[c.id];
                }
            }, {
                history: 'ungroup',
                selection: freed
            });
        },
        reorderNodes: (ids, parentId, index)=>{
            const state = get();
            const pageId = currentPage();
            const moving = ids.map((id)=>state.doc.nodesById[id]).filter(Boolean);
            if (moving.length === 0) return;
            for (const n of moving){
                if (parentId && (n.id === parentId || (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isDescendantOf"])(state.doc, parentId, n.id))) {
                    get().toast('Cannot drop an object into its own children');
                    return;
                }
            }
            // world matrices before the move
            const worlds = new Map();
            moving.forEach((n)=>worlds.set(n.id, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nodeWorldMatrix"])(state.doc, n)));
            commit((draft)=>{
                for (const n of moving)removeChildRef(draft, pageId, n.parentId, n.id);
                let at = index;
                for (const n of moving){
                    insertChildRef(draft, pageId, parentId, n.id, at);
                    at = at + 1;
                }
                for (const n of moving){
                    const world = worlds.get(n.id);
                    const fresh = draft.nodesById[n.id];
                    if (!fresh) continue;
                    const updated = {
                        ...fresh,
                        parentId
                    };
                    const P = parentId === null ? {
                        a: 1,
                        b: 0,
                        c: 0,
                        d: 1,
                        e: 0,
                        f: 0
                    } : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nodeWorldMatrix"])(draft, draft.nodesById[parentId]);
                    applyLocalMatrix(updated, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mMul"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mInvert"])(P), world));
                    draft.nodesById[n.id] = updated;
                }
            }, {
                history: 'reorder',
                selection: ids
            });
        },
        zorder: (mode)=>{
            const state = get();
            const pageId = currentPage();
            const sel = state.selection;
            if (sel.length === 0) return;
            commit((draft)=>{
                const listRef = (parentId)=>parentId === null ? [
                        ...draft.pagesById[pageId]?.nodeIds ?? []
                    ] : [
                        ...draft.nodesById[parentId]?.children ?? []
                    ];
                const setList = (parentId, list)=>{
                    if (parentId === null) putPage(draft, pageId, {
                        nodeIds: list
                    });
                    else putNode(draft, parentId, {
                        children: list
                    });
                };
                for (const id of sel){
                    const n = draft.nodesById[id];
                    if (!n) continue;
                    const list = listRef(n.parentId);
                    const i = list.indexOf(id);
                    if (i < 0) continue;
                    list.splice(i, 1);
                    if (mode === 'front') list.push(id);
                    else if (mode === 'back') list.unshift(id);
                    else if (mode === 'forward') list.splice(Math.min(list.length, i + 1), 0, id);
                    else list.splice(Math.max(0, i - 1), 0, id);
                    setList(n.parentId, list);
                }
            }, {
                history: 'zorder'
            });
        },
        alignSelection: (mode)=>{
            const state = get();
            const nodes = state.selection.map((id)=>state.doc.nodesById[id]).filter(Boolean);
            if (nodes.length === 0) return;
            const doc = state.doc;
            const rects = new Map(nodes.map((n)=>[
                    n.id,
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nodeWorldAABB"])(doc, n)
                ]));
            let ref;
            if (nodes.length > 1) {
                ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["unionRects"])([
                    ...rects.values()
                ]);
            } else {
                // single object: align within its parent frame (no-op at page top level, like Figma)
                const n = nodes[0];
                let p = n.parentId ? doc.nodesById[n.parentId] : undefined;
                while(p && p.type !== 'frame' && p.parentId)p = doc.nodesById[p.parentId];
                if (!p || p.type !== 'frame') return;
                ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nodeWorldAABB"])(doc, p);
            }
            const moves = [];
            if (mode === 'hdist' || mode === 'vdist') {
                if (nodes.length < 2) return;
                const horiz = mode === 'hdist';
                const sorted = nodes.slice().sort((a, b)=>{
                    const ra = rects.get(a.id);
                    const rb = rects.get(b.id);
                    return horiz ? ra.x - rb.x : ra.y - rb.y;
                });
                const first = rects.get(sorted[0].id);
                const last = rects.get(sorted[sorted.length - 1].id);
                const span = horiz ? last.x + last.w - first.x : last.y + last.h - first.y;
                const total = sorted.reduce((acc, n)=>acc + (horiz ? rects.get(n.id).w : rects.get(n.id).h), 0);
                const gap = (span - total) / (sorted.length - 1);
                let cursor = horiz ? first.x : first.y;
                for (const n of sorted){
                    const r = rects.get(n.id);
                    const target = cursor;
                    const cur = horiz ? r.x : r.y;
                    moves.push({
                        id: n.id,
                        dx: horiz ? target - cur : 0,
                        dy: horiz ? 0 : target - cur
                    });
                    cursor += (horiz ? r.w : r.h) + gap;
                }
            } else {
                for (const n of nodes){
                    const r = rects.get(n.id);
                    let dx = 0;
                    let dy = 0;
                    if (mode === 'left') dx = ref.x - r.x;
                    if (mode === 'hcenter') dx = ref.x + ref.w / 2 - (r.x + r.w / 2);
                    if (mode === 'right') dx = ref.x + ref.w - (r.x + r.w);
                    if (mode === 'top') dy = ref.y - r.y;
                    if (mode === 'vcenter') dy = ref.y + ref.h / 2 - (r.y + r.h / 2);
                    if (mode === 'bottom') dy = ref.y + ref.h - (r.y + r.h);
                    moves.push({
                        id: n.id,
                        dx,
                        dy
                    });
                }
            }
            commit((draft)=>{
                for (const mv of moves){
                    const n = draft.nodesById[mv.id];
                    if (!n || mv.dx === 0 && mv.dy === 0) continue;
                    const P = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parentWorldMatrix"])(draft, n);
                    const local = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mApplyVec"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mInvert"])(P), mv.dx, mv.dy);
                    putNode(draft, mv.id, {
                        x: n.x + local.x,
                        y: n.y + local.y
                    });
                }
            }, {
                history: 'align'
            });
        },
        resizeSelectionBox: (w, h)=>{
            const state = get();
            const box = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["boundsOfNodes"])(state.doc, state.selection);
            if (!box || box.w < 0.01 || box.h < 0.01 || w <= 0 || h <= 0) return;
            const sx = w / box.w;
            const sy = h / box.h;
            const doc = state.doc;
            const targets = state.selection.map((id)=>doc.nodesById[id]).filter(Boolean);
            commit((draft)=>{
                for (const n of targets){
                    const a = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nodeWorldAABB"])(doc, n);
                    const nx = box.x + (a.x - box.x) * sx;
                    const ny = box.y + (a.y - box.y) * sy;
                    const P = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parentWorldMatrix"])(draft, draft.nodesById[n.id]);
                    const local = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mApply"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mInvert"])(P), nx, ny);
                    const fresh = {
                        x: local.x,
                        y: local.y,
                        w: Math.max(1, n.w * sx),
                        h: Math.max(n.type === 'line' || n.type === 'arrow' ? 0 : 1, n.h * sy)
                    };
                    if (n.type === 'text') {
                        fresh.fontSize = Math.max(1, n.fontSize * ((sx + sy) / 2));
                    }
                    if (n.cornerRadius) fresh.cornerRadius = Math.max(0, n.cornerRadius * ((sx + sy) / 2));
                    putNode(draft, n.id, fresh);
                    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["isContainer"])(n)) scaleSubtree(draft, n.id, sx, sy, true);
                }
            }, {
                history: 'resize'
            });
        },
        moveSelectionWorld: (dx, dy, label)=>{
            if (dx === 0 && dy === 0) return;
            const state = get();
            const doc = state.doc;
            const targets = state.selection.map((id)=>doc.nodesById[id]).filter(Boolean);
            commit((draft)=>{
                for (const n of targets){
                    const P = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parentWorldMatrix"])(draft, draft.nodesById[n.id]);
                    const local = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mApplyVec"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mInvert"])(P), dx, dy);
                    putNode(draft, n.id, {
                        x: n.x + local.x,
                        y: n.y + local.y
                    });
                }
            }, {
                history: label ?? 'move'
            });
        },
        renameNode: (id, name)=>{
            const trimmed = name.trim();
            if (!trimmed) return;
            commit((draft)=>putNode(draft, id, {
                    name: trimmed
                }), {
                history: 'rename'
            });
        },
        /* -------------------------- transforms ------------------------- */ flipSelection: (axis)=>{
            const state = get();
            if (state.selection.length === 0) return;
            const key = axis === 'h' ? 'flipH' : 'flipV';
            commit((draft)=>{
                for (const id of state.selection){
                    const n = draft.nodesById[id];
                    if (!n) continue;
                    putNode(draft, id, {
                        [key]: !n[key]
                    });
                }
            }, {
                history: 'flip'
            });
            get().toast(axis === 'h' ? 'Flipped horizontally' : 'Flipped vertically');
        },
        rotateSelectionBy: (deg)=>{
            const state = get();
            const ids = state.selection;
            if (ids.length === 0) return;
            const box = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["boundsOfNodes"])(state.doc, ids);
            if (!box) return;
            const center = {
                x: box.x + box.w / 2,
                y: box.y + box.h / 2
            };
            const R = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mMul"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mMul"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mTranslate"])(center.x, center.y), (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mRotate"])(deg)), (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mTranslate"])(-center.x, -center.y));
            const worlds = new Map();
            ids.forEach((id)=>{
                const n = state.doc.nodesById[id];
                if (n) worlds.set(id, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nodeWorldMatrix"])(state.doc, n));
            });
            commit((draft)=>{
                for (const id of ids){
                    const W = worlds.get(id);
                    const n = draft.nodesById[id];
                    if (!W || !n) continue;
                    const updated = {
                        ...n
                    };
                    applyLocalMatrix(updated, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mMul"])(R, W));
                    draft.nodesById[id] = updated;
                }
            }, {
                history: 'rotate90'
            });
        },
        toggleLockSelection: ()=>{
            const state = get();
            if (state.selection.length === 0) return;
            const lock = state.selection.some((id)=>!state.doc.nodesById[id]?.locked);
            commit((draft)=>{
                for (const id of state.selection)putNode(draft, id, {
                    locked: lock
                });
            }, {
                history: 'lock'
            });
            get().toast(lock ? 'Locked selection' : 'Unlocked selection');
        },
        unlockAllOnPage: ()=>{
            const state = get();
            const page = state.doc.pagesById[state.currentPageId];
            if (!page) return;
            const locked = [];
            const visit = (nid)=>{
                const n = state.doc.nodesById[nid];
                if (!n) return;
                if (n.locked) locked.push(nid);
                n.children.forEach(visit);
            };
            page.nodeIds.forEach(visit);
            if (locked.length === 0) {
                get().toast('Nothing is locked on this page');
                return;
            }
            commit((draft)=>{
                for (const id of locked)putNode(draft, id, {
                    locked: false
                });
            }, {
                history: 'unlockAll'
            });
            get().toast(`Unlocked ${locked.length} object${locked.length === 1 ? '' : 's'}`);
        },
        toggleHideSelection: ()=>{
            const state = get();
            if (state.selection.length === 0) return;
            const hide = state.selection.some((id)=>state.doc.nodesById[id]?.visible);
            commit((draft)=>{
                for (const id of state.selection)putNode(draft, id, {
                    visible: hide
                });
            }, {
                history: 'visible',
                selection: hide ? [] : state.selection
            });
            get().toast(hide ? 'Hidden selection' : 'Shown selection');
        },
        /* ---------------------------- style ---------------------------- */ copyStyle: ()=>{
            const state = get();
            if (state.selection.length === 0) return;
            const n = state.doc.nodesById[state.selection[0]];
            if (!n) return;
            const style = {};
            for (const key of STYLE_FIELDS){
                const v = n[key];
                if (v === null || v === undefined) continue;
                if (typeof v === 'object') style[key] = {
                    ...v
                };
                else style[key] = v;
            }
            set({
                styleClipboard: style
            });
            get().toast(`Copied style of ${n.name}`);
        },
        pasteStyle: ()=>{
            const state = get();
            const style = state.styleClipboard;
            if (!style) {
                get().toast('No style copied yet');
                return;
            }
            if (state.selection.length === 0) return;
            commit((draft)=>{
                for (const id of state.selection){
                    const n = draft.nodesById[id];
                    if (!n) continue;
                    const patch = {};
                    for (const [k, v] of Object.entries(style)){
                        if (k === 'fontFamily' && n.type !== 'text') continue;
                        if ([
                            'fontSize',
                            'fontWeight',
                            'textAlign',
                            'lineHeight',
                            'letterSpacing',
                            'textCase',
                            'underline',
                            'strike'
                        ].includes(k) && n.type !== 'text') continue;
                        patch[k] = typeof v === 'object' && v !== null ? {
                            ...v
                        } : v;
                    }
                    putNode(draft, id, patch);
                }
            }, {
                history: 'pasteStyle'
            });
            get().toast(`Pasted style onto ${state.selection.length} object${state.selection.length === 1 ? '' : 's'}`);
        },
        /* ------------------------- doc settings ------------------------ */ setSettings: (patch)=>{
            commit((draft)=>{
                draft.settings = {
                    ...draft.settings,
                    ...patch,
                    grid: {
                        ...draft.settings.grid,
                        ...patch.grid ?? {}
                    },
                    guidesX: patch.guidesX ?? [
                        ...draft.settings.guidesX
                    ],
                    guidesY: patch.guidesY ?? [
                        ...draft.settings.guidesY
                    ]
                };
            }, {
                history: 'settings'
            });
        },
        setGridSettings: (patch)=>{
            commit((draft)=>{
                draft.settings = {
                    ...draft.settings,
                    grid: {
                        ...draft.settings.grid,
                        ...patch
                    }
                };
            }, {
                history: 'settings'
            });
        },
        addGuide: (axis, at)=>{
            commit((draft)=>{
                if (axis === 'x') draft.settings.guidesX = [
                    ...draft.settings.guidesX,
                    Math.round(at)
                ];
                else draft.settings.guidesY = [
                    ...draft.settings.guidesY,
                    Math.round(at)
                ];
            }, {
                history: 'guide'
            });
        },
        moveGuide: (axis, index, at)=>{
            commit((draft)=>{
                if (axis === 'x') {
                    const list = [
                        ...draft.settings.guidesX
                    ];
                    if (index < 0 || index >= list.length) return;
                    list[index] = Math.round(at);
                    draft.settings.guidesX = list;
                } else {
                    const list = [
                        ...draft.settings.guidesY
                    ];
                    if (index < 0 || index >= list.length) return;
                    list[index] = Math.round(at);
                    draft.settings.guidesY = list;
                }
            }, {
                history: false
            });
        },
        removeGuide: (axis, index)=>{
            commit((draft)=>{
                if (axis === 'x') draft.settings.guidesX = draft.settings.guidesX.filter((_, i)=>i !== index);
                else draft.settings.guidesY = draft.settings.guidesY.filter((_, i)=>i !== index);
            }, {
                history: 'guide'
            });
        },
        clearGuides: ()=>{
            const s = get();
            if (!s.doc.settings.guidesX.length && !s.doc.settings.guidesY.length) return;
            commit((draft)=>{
                draft.settings.guidesX = [];
                draft.settings.guidesY = [];
            }, {
                history: 'guide'
            });
            get().toast('Cleared all guides');
        },
        /* --------------------------- editing --------------------------- */ setEditingText: (id)=>{
            if (id) get().setSelection([
                id
            ]);
            set({
                editingTextId: id,
                editingPathId: null
            });
        },
        setEditingPath: (id)=>{
            if (id) get().setSelection([
                id
            ]);
            set({
                editingPathId: id,
                editingTextId: null
            });
        },
        /* --------------------------- images ---------------------------- */ importImage: (src, w, h, at, parentId)=>{
            const state = get();
            const scale = Math.min(1, 800 / Math.max(w, h, 1));
            const nw = Math.max(1, Math.round(w * scale));
            const nh = Math.max(1, Math.round(h * scale));
            const center = at ?? viewportCenter();
            let x = center.x - nw / 2;
            let y = center.y - nh / 2;
            // when parenting into a frame, convert to parent-local coords
            if (parentId) {
                const parent = state.doc.nodesById[parentId];
                if (parent) {
                    const inv = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mInvert"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nodeWorldMatrix"])(state.doc, parent));
                    const local = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mApply"])(inv, x, y);
                    x = local.x;
                    y = local.y;
                }
            }
            return get().addNode('image', {
                src,
                w: nw,
                h: nh,
                x,
                y
            }, parentId ?? null);
        },
        /* ---------------------------- files ---------------------------- */ flushSave: ()=>{
            if (autosaveTimer) {
                clearTimeout(autosaveTimer);
                autosaveTimer = null;
            }
            saveAutosave(get());
        },
        newDoc: ()=>{
            get().flushSave();
            const { id, doc } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$library$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createLibraryDoc"])();
            set({
                doc,
                docId: id,
                route: {
                    kind: 'doc',
                    id
                },
                currentPageId: doc.pages[0],
                selection: [],
                past: [],
                future: [],
                clipboard: null,
                editingTextId: null,
                editingPathId: null,
                savedName: null,
                dirty: false,
                viewport: DEFAULT_VIEWPORT
            });
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$router$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pushRoute"])({
                kind: 'doc',
                id
            });
            get().toast('New document created');
        },
        newDocFromTemplate: (templateId)=>{
            get().flushSave();
            const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$templates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildTemplate"])(templateId);
            const entry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$library$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["importDocIntoLibrary"])(doc);
            set({
                doc,
                docId: entry.id,
                route: {
                    kind: 'doc',
                    id: entry.id
                },
                currentPageId: doc.pages[0],
                selection: [],
                past: [],
                future: [],
                clipboard: null,
                editingTextId: null,
                editingPathId: null,
                savedName: null,
                dirty: false,
                viewport: {
                    x: 60,
                    y: 60,
                    zoom: 0.75
                }
            });
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$router$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pushRoute"])({
                kind: 'doc',
                id: entry.id
            });
            get().toast(`Created “${doc.name}”`);
        },
        /**
     * Open an external document (.iris file / recent) — registers it as a new
     * library entry so it shows up on the homepage and can be reopened later.
     */ loadDoc: (rawDoc, savedName, fitView)=>{
            get().flushSave();
            const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeDoc"])(rawDoc);
            if (savedName) doc.name = savedName;
            const entry = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$library$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["importDocIntoLibrary"])(doc);
            set({
                doc,
                docId: entry.id,
                route: {
                    kind: 'doc',
                    id: entry.id
                },
                currentPageId: doc.pages[0],
                selection: [],
                past: [],
                future: [],
                clipboard: null,
                editingTextId: null,
                editingPathId: null,
                savedName: savedName ?? null,
                dirty: false,
                viewport: DEFAULT_VIEWPORT
            });
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$router$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pushRoute"])({
                kind: 'doc',
                id: entry.id
            });
            if (fitView) get().zoomToFit();
        },
        /** Open a document from the library (homepage card click). */ openDoc: (id, opts)=>{
            const s = get();
            if (s.route.kind === 'doc' && s.route.id === id) return;
            s.flushSave();
            const stored = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$library$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStoredDoc"])(id);
            if (!stored) {
                get().toast('That file could not be opened');
                return;
            }
            const doc = stored.doc;
            const pageId = stored.currentPageId && doc.pages.includes(stored.currentPageId) ? stored.currentPageId : doc.pages[0];
            set({
                doc,
                docId: id,
                route: {
                    kind: 'doc',
                    id
                },
                currentPageId: pageId,
                selection: [],
                past: [],
                future: [],
                clipboard: null,
                editingTextId: null,
                editingPathId: null,
                savedName: null,
                dirty: false,
                viewport: stored.viewport ?? DEFAULT_VIEWPORT
            });
            if (opts?.push !== false) (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$router$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pushRoute"])({
                kind: 'doc',
                id
            });
        },
        /** Leave the editor and return to the file browser (homepage). */ goHome: (opts)=>{
            get().flushSave();
            set({
                route: {
                    kind: 'home'
                },
                docId: null,
                selection: [],
                editingTextId: null,
                editingPathId: null,
                contextMenu: null
            });
            if (opts?.push !== false) (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$router$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pushRoute"])({
                kind: 'home'
            });
        },
        /** Browser Back/Forward: adopt the URL route without pushing history. */ syncRoute: ()=>{
            const r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$router$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["routeFromLocation"])();
            const s = get();
            if (r.kind === 'doc') {
                if (s.route.kind === 'doc' && s.route.id === r.id) return;
                if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$library$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getStoredDoc"])(r.id)) {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$router$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["replaceRoute"])({
                        kind: 'home'
                    });
                    if (s.route.kind !== 'home') get().goHome({
                        push: false
                    });
                    get().toast('That file is no longer available');
                    return;
                }
                get().openDoc(r.id, {
                    push: false
                });
                return;
            }
            if (s.route.kind === 'home') return;
            get().goHome({
                push: false
            });
        },
        markSaved: (name)=>set({
                savedName: name,
                dirty: false
            }),
        /* ------------------------------ ui ----------------------------- */ toast: (msg, action)=>{
            const id = toastSeq++;
            set((s)=>({
                    toasts: [
                        ...s.toasts.slice(-3),
                        {
                            id,
                            msg,
                            action
                        }
                    ]
                }));
            setTimeout(()=>get().dismissToast(id), action ? 5000 : 2400);
        },
        dismissToast: (id)=>set((s)=>({
                    toasts: s.toasts.filter((t)=>t.id !== id)
                })),
        openContextMenu: (x, y, worldX, worldY)=>set({
                contextMenu: {
                    x,
                    y,
                    worldX,
                    worldY
                }
            }),
        closeContextMenu: ()=>set({
                contextMenu: null
            }),
        setExportOpen: (open)=>set({
                exportOpen: open
            }),
        setShortcutsOpen: (open)=>set({
                shortcutsOpen: open
            })
    };
});
function useSelectedNodes() {
    _s();
    return useIris((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2f$shallow$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useShallow"])({
        "useSelectedNodes.useIris.useShallow": (s)=>s.selection.map({
                "useSelectedNodes.useIris.useShallow": (id)=>s.doc.nodesById[id]
            }["useSelectedNodes.useIris.useShallow"]).filter(Boolean)
    }["useSelectedNodes.useIris.useShallow"]));
}
_s(useSelectedNodes, "K1IGf6GoGTSVquwCvhcFeWkKVB4=", false, function() {
    return [
        useIris
    ];
});
function useCanvasPage() {
    _s1();
    return useIris({
        "useCanvasPage.useIris": (s)=>s.doc.pagesById[s.currentPageId] ?? null
    }["useCanvasPage.useIris"]);
}
_s1(useCanvasPage, "K1IGf6GoGTSVquwCvhcFeWkKVB4=", false, function() {
    return [
        useIris
    ];
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/iris/engine/export.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

/**
 * Iris export: PNG/JPG (offscreen canvas, 1x-4x, optional transparency) and
 * SVG serialization (gradients, shadows, blur, blend modes included).
 */ __turbopack_context__.s([
    "contentBounds",
    ()=>contentBounds,
    "downloadBlob",
    ()=>downloadBlob,
    "exportPNG",
    ()=>exportPNG,
    "exportRaster",
    ()=>exportRaster,
    "exportSVG",
    ()=>exportSVG,
    "svgStringOfSelection",
    ()=>svgStringOfSelection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/engine/geometry.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/engine/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$renderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/engine/renderer.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$imageCache$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/engine/imageCache.ts [app-client] (ecmascript)");
;
;
;
;
function downloadBlob(data, filename) {
    const blob = typeof data === 'string' ? new Blob([
        data
    ], {
        type: 'image/svg+xml'
    }) : data;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(()=>URL.revokeObjectURL(url), 4000);
}
function sanitizeFilename(name) {
    return name.replace(/[^\w\d-]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') || 'export';
}
function contentBounds(doc, pageId, ids) {
    const page = doc.pagesById[pageId];
    if (!page) return null;
    let targets;
    if (ids && ids.length > 0) {
        targets = ids.map((id)=>doc.nodesById[id]).filter((n)=>!!n && n.visible);
    } else {
        targets = page.nodeIds.map((id)=>doc.nodesById[id]).filter((n)=>!!n && n.visible);
    }
    if (targets.length === 0) return null;
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["boundsOfNodes"])(doc, targets.map((n)=>n.id));
}
async function preloadImages(doc, pageId, ids) {
    const page = doc.pagesById[pageId];
    if (!page) return;
    const srcs = new Set();
    const visit = (n)=>{
        if (n.type === 'image' && n.src && n.visible) srcs.add(n.src);
        n.children.forEach((c)=>{
            const child = doc.nodesById[c];
            if (child) visit(child);
        });
    };
    if (ids && ids.length) ids.forEach((id)=>{
        const n = doc.nodesById[id];
        if (n) visit(n);
    });
    else page.nodeIds.forEach((id)=>{
        const n = doc.nodesById[id];
        if (n && n.visible) visit(n);
    });
    await Promise.all([
        ...srcs
    ].map((s)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$imageCache$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loadImage"])(s)));
}
function exportFilename(ext, scope) {
    const s = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"].getState();
    let base = s.doc.name;
    if (scope === 'selection' && s.selection.length === 1) {
        const n = s.doc.nodesById[s.selection[0]];
        if (n) base = n.name;
    }
    return `${sanitizeFilename(base)}.${ext}`;
}
async function exportRaster(scope = 'selection', scale = 2, opts) {
    const format = opts?.format ?? 'png';
    const transparent = opts?.transparent ?? false;
    const s = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"].getState();
    let ids = scope === 'selection' ? s.selection : undefined;
    let bounds = contentBounds(s.doc, s.currentPageId, ids);
    // a selected slice exports the region it covers (contents under it)
    if (scope === 'selection' && s.selection.length === 1) {
        const sel = s.doc.nodesById[s.selection[0]];
        if (sel && sel.type === 'slice') {
            bounds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nodeWorldAABB"])(s.doc, sel);
            ids = undefined;
        }
    }
    if (!bounds || bounds.w < 0.5 || bounds.h < 0.5) {
        s.toast(scope === 'selection' ? 'Select something to export' : 'Nothing to export on this page');
        return;
    }
    await preloadImages(s.doc, s.currentPageId, ids);
    const w = Math.min(8192, Math.max(1, Math.ceil(bounds.w * scale)));
    const h = Math.min(8192, Math.max(1, Math.ceil(bounds.h * scale)));
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        s.toast('Export failed');
        return;
    }
    if (!transparent || format === 'jpg') {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, w, h);
    }
    ctx.setTransform(scale, 0, 0, scale, -bounds.x * scale, -bounds.y * scale);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$renderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setExportPass"])(true);
    try {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$renderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["drawNodes"])(ctx, s.doc, s.currentPageId, 1, ids && ids.length ? ids : undefined);
    } finally{
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$renderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setExportPass"])(false);
    }
    const filename = exportFilename(format, scope);
    const mime = format === 'jpg' ? 'image/jpeg' : 'image/png';
    const quality = format === 'jpg' ? 0.92 : undefined;
    await new Promise((resolve)=>{
        canvas.toBlob((blob)=>{
            if (blob) downloadBlob(blob, filename);
            resolve();
        }, mime, quality);
    });
    s.toast(`Exported ${filename} (${w}×${h})`);
}
async function exportPNG(scope = 'selection', scale = 2, transparent = false) {
    return exportRaster(scope, scale, {
        format: 'png',
        transparent
    });
}
/* ------------------------------------------------------------------ */ /* SVG                                                                 */ /* ------------------------------------------------------------------ */ function esc(v) {
    return v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function escAttrNum(v) {
    return String(Math.round(v * 100) / 100);
}
let clipSeq = 0;
let gradSeq = 0;
let filtSeq = 0;
/** svg defs accumulated while serializing (gradients / filters) */ let defsOut = [];
function dashAttr(n) {
    const d = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["dashArray"])(n.dash, n.strokeWidth);
    if (!d.length) return '';
    return ` stroke-dasharray="${d.map(escAttrNum).join(' ')}"`;
}
function paintDefs(n, indent) {
    if (!n.fillGradient) return {
        fill: n.fill ? esc(n.fill) : 'none'
    };
    const g = n.fillGradient;
    const id = `iris-grad-${gradSeq++}`;
    if (g.type === 'radial') {
        const def = `${indent}<radialGradient id="${id}"><stop offset="0" stop-color="${esc(g.from)}"/><stop offset="1" stop-color="${esc(g.to)}"/></radialGradient>`;
        defsOut.push(def);
        return {
            fill: `url(#${id})`
        };
    }
    const l = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["gradientLine"])(n.w, n.h, g.angle);
    const def = `${indent}<linearGradient id="${id}" x1="${escAttrNum(l.x1)}" y1="${escAttrNum(l.y1)}" x2="${escAttrNum(l.x2)}" y2="${escAttrNum(l.y2)}"><stop offset="0" stop-color="${esc(g.from)}"/><stop offset="1" stop-color="${esc(g.to)}"/></linearGradient>`;
    defsOut.push(def);
    return {
        fill: `url(#${id})`
    };
}
function shadowAttrs(n) {
    if (!n.shadow) return {
        attr: ''
    };
    const id = `iris-shadow-${filtSeq++}`;
    const def = `<filter id="${id}" x="-50%" y="-50%" width="200%" height="200%"><feDropShadow dx="${escAttrNum(n.shadow.x)}" dy="${escAttrNum(n.shadow.y)}" stdDeviation="${escAttrNum(Math.max(0, n.shadow.blur / 2))}" flood-color="${esc(n.shadow.color)}"/></filter>`;
    defsOut.push(def);
    return {
        attr: ` filter="url(#${id})"`,
        def
    };
}
function blurAttrs(n) {
    if (!n.blur) return {
        attr: ''
    };
    const id = `iris-blur-${filtSeq++}`;
    const def = `<filter id="${id}" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="${escAttrNum(n.blur / 2)}"/></filter>`;
    defsOut.push(def);
    return {
        attr: ` filter="url(#${id})"`
    };
}
function blendAttr(n) {
    return n.blend && n.blend !== 'normal' ? ` style="mix-blend-mode:${n.blend}"` : '';
}
function transformAttr(n) {
    const parts = [];
    if (n.x !== 0 || n.y !== 0) parts.push(`translate(${escAttrNum(n.x)} ${escAttrNum(n.y)})`);
    if (n.flipH || n.flipV) parts.push(`translate(${escAttrNum(n.w / 2)} ${escAttrNum(n.h / 2)}) scale(${n.flipH ? -1 : 1} ${n.flipV ? -1 : 1}) translate(${escAttrNum(-n.w / 2)} ${escAttrNum(-n.h / 2)})`);
    if (Math.abs(n.rotation) > 0.001) parts.push(`rotate(${escAttrNum(n.rotation)} ${escAttrNum(n.w / 2)} ${escAttrNum(n.h / 2)})`);
    return parts.length ? ` transform="${parts.join(' ')}"` : '';
}
function nodeToSVG(doc, n, indent) {
    if (!n.visible) return '';
    const pad = '  ';
    const op = n.opacity < 1 ? ` opacity="${escAttrNum(n.opacity)}"` : '';
    const transform = transformAttr(n);
    const paint = paintDefs(n, indent);
    const fill = paint.fill;
    const stroke = n.stroke ? esc(n.stroke) : 'none';
    const strokeW = n.strokeWidth;
    const strokePart = ` stroke="${stroke}" stroke-width="${escAttrNum(strokeW)}"${dashAttr(n)}`;
    const shadow = shadowAttrs(n);
    const blur = blurAttrs(n);
    const fx = `${shadow.attr}${blur.attr}`;
    const blend = blendAttr(n);
    if (n.type === 'group') {
        const inner = n.children.map((c)=>doc.nodesById[c]).filter(Boolean).map((c)=>nodeToSVG(doc, c, indent + pad)).join('\n');
        return `${indent}<g${transform}${op}${fx}${blend}>\n${inner}\n${indent}</g>`;
    }
    if (n.type === 'frame') {
        const clipId = `iris-clip-${clipSeq++}`;
        const inner = n.children.map((c)=>doc.nodesById[c]).filter(Boolean).map((c)=>nodeToSVG(doc, c, indent + pad + pad)).join('\n');
        const bg = fill !== 'none' ? `\n${indent}${pad}<rect width="${escAttrNum(n.w)}" height="${escAttrNum(n.h)}"${n.cornerRadius > 0 ? ` rx="${escAttrNum(n.cornerRadius)}"` : ''} fill="${fill}"${op}${strokePart}${shadow.attr}/>` : n.stroke ? `\n${indent}${pad}<rect width="${escAttrNum(n.w)}" height="${escAttrNum(n.h)}"${n.cornerRadius > 0 ? ` rx="${escAttrNum(n.cornerRadius)}"` : ''} fill="none"${strokePart}/>` : '';
        const clipDef = `${indent}<defs><clipPath id="${clipId}"><rect width="${escAttrNum(n.w)}" height="${escAttrNum(n.h)}" rx="${escAttrNum(n.cornerRadius)}"/></clipPath></defs>\n`;
        const clipAttr = n.clip ? ` clip-path="url(#${clipId})"` : '';
        return `${indent}<g${transform}${op}${clipAttr}${blend}>\n${clipDef}${bg}${inner ? '\n' + inner : ''}\n${indent}</g>`;
    }
    if (n.type === 'section') {
        // translucent backdrop rect (no clip, no children)
        return `${indent}<rect${transform} width="${escAttrNum(n.w)}" height="${escAttrNum(n.h)}"${n.cornerRadius > 0 ? ` rx="${escAttrNum(n.cornerRadius)}"` : ''} fill="${fill}"${op}${strokePart}${fx}${blend}/>`;
    }
    if (n.type === 'slice') {
        // editor-only — skip in SVG output
        return '';
    }
    switch(n.type){
        case 'rect':
            return `${indent}<rect${transform} width="${escAttrNum(n.w)}" height="${escAttrNum(n.h)}"${n.cornerRadius > 0 ? ` rx="${escAttrNum(n.cornerRadius)}"` : ''} fill="${fill}"${op}${strokePart}${fx}${blend}/>`;
        case 'ellipse':
            return `${indent}<ellipse${transform} cx="${escAttrNum(n.w / 2)}" cy="${escAttrNum(n.h / 2)}" rx="${escAttrNum(n.w / 2)}" ry="${escAttrNum(n.h / 2)}" fill="${fill}"${op}${strokePart}${fx}${blend}/>`;
        case 'polygon':
            {
                const pts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["polygonPoints"])(n).map((p)=>`${escAttrNum(p.x)},${escAttrNum(p.y)}`).join(' ');
                return `${indent}<polygon${transform} points="${pts}" fill="${fill}"${op}${strokePart}${fx}${blend}/>`;
            }
        case 'star':
            {
                const pts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["starPointsOf"])(n).map((p)=>`${escAttrNum(p.x)},${escAttrNum(p.y)}`).join(' ');
                return `${indent}<polygon${transform} points="${pts}" fill="${fill}"${op}${strokePart}${fx}${blend}/>`;
            }
        case 'line':
            {
                const { a, b } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["segmentEnds"])(n);
                return `${indent}<line${transform} x1="${escAttrNum(a.x)}" y1="${escAttrNum(a.y)}" x2="${escAttrNum(b.x)}" y2="${escAttrNum(b.y)}" stroke="${stroke}" stroke-width="${escAttrNum(strokeW)}"${dashAttr(n)}${op}${blend}/>`;
            }
        case 'arrow':
            {
                const { a, b } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["segmentEnds"])(n);
                const len = Math.hypot(b.x - a.x, b.y - a.y) || 1;
                const dir = {
                    x: (b.x - a.x) / len,
                    y: (b.y - a.y) / len
                };
                const size = Math.max(8, strokeW * 4.5);
                const parts = [];
                const shaftB = n.arrowEnd !== 'none' ? {
                    x: b.x - dir.x * size * 0.85,
                    y: b.y - dir.y * size * 0.85
                } : b;
                parts.push(`${indent}<line${transform} x1="${escAttrNum(a.x)}" y1="${escAttrNum(a.y)}" x2="${escAttrNum(shaftB.x)}" y2="${escAttrNum(shaftB.y)}" stroke="${stroke}" stroke-width="${escAttrNum(strokeW)}"${dashAttr(n)}${op}${blend}/>`);
                const headAt = (tip, d)=>{
                    if (n.arrowEnd === 'line' || n.arrowStart === 'line') {
                        const px = -d.y;
                        const py = d.x;
                        const back = {
                            x: tip.x - d.x * size * 0.7,
                            y: tip.y - d.y * size * 0.7
                        };
                        return `${indent}<path${transform} d="M ${escAttrNum(back.x + px * size * 0.4)} ${escAttrNum(back.y + py * size * 0.4)} L ${escAttrNum(tip.x)} ${escAttrNum(tip.y)} L ${escAttrNum(back.x - px * size * 0.4)} ${escAttrNum(back.y - py * size * 0.4)}" fill="none" stroke="${stroke}" stroke-width="${escAttrNum(strokeW)}"${op}/>`;
                    }
                    const px = -d.y;
                    const py = d.x;
                    const back = {
                        x: tip.x - d.x * size,
                        y: tip.y - d.y * size
                    };
                    return `${indent}<path${transform} d="M ${escAttrNum(tip.x)} ${escAttrNum(tip.y)} L ${escAttrNum(back.x + px * size * 0.4)} ${escAttrNum(back.y + py * size * 0.4)} L ${escAttrNum(back.x - px * size * 0.4)} ${escAttrNum(back.y - py * size * 0.4)} Z" fill="${stroke}"${op}/>`;
                };
                if (n.arrowEnd !== 'none') parts.push(headAt(b, dir));
                if (n.arrowStart !== 'none') parts.push(headAt(a, {
                    x: -dir.x,
                    y: -dir.y
                }));
                return parts.join('\n');
            }
        case 'path':
            {
                const pts = n.points;
                if (pts.length === 0) return '';
                let d = `M ${escAttrNum(pts[0].x)} ${escAttrNum(pts[0].y)}`;
                for(let i = 1; i < pts.length; i++){
                    const p = pts[i - 1];
                    const cur = pts[i];
                    if (p.hx === 0 && p.hy === 0 && cur.hx === 0 && cur.hy === 0) {
                        d += ` L ${escAttrNum(cur.x)} ${escAttrNum(cur.y)}`;
                    } else {
                        d += ` C ${escAttrNum(p.x + p.hx)} ${escAttrNum(p.y + p.hy)} ${escAttrNum(cur.x - cur.hx)} ${escAttrNum(cur.y - cur.hy)} ${escAttrNum(cur.x)} ${escAttrNum(cur.y)}`;
                    }
                }
                if (n.closed) {
                    const last = pts[pts.length - 1];
                    const first = pts[0];
                    d += ` C ${escAttrNum(last.x + last.hx)} ${escAttrNum(last.y + last.hy)} ${escAttrNum(first.x - first.hx)} ${escAttrNum(first.y - first.hy)} ${escAttrNum(first.x)} ${escAttrNum(first.y)} Z`;
                }
                return `${indent}<path${transform} d="${d}" fill="${fill}"${op}${strokePart}${fx}${blend}/>`;
            }
        case 'text':
            {
                const m = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["measureText"])(n);
                const base = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["firstBaseline"])(n, m.ascent, m.descent);
                const lineH = n.fontSize * n.lineHeight;
                const anchor = n.textAlign === 'center' ? 'middle' : n.textAlign === 'right' ? 'end' : 'start';
                const x = n.textAlign === 'center' ? n.w / 2 : n.textAlign === 'right' ? n.w : 0;
                const spacing = n.letterSpacing ? ` letter-spacing="${escAttrNum(n.letterSpacing)}"` : '';
                const deco = n.underline && n.strike ? ' line-through underline' : n.underline ? ' underline' : n.strike ? ' line-through' : '';
                const tspans = m.lines.map((line, i)=>`${indent}  <tspan x="${escAttrNum(x)}" y="${escAttrNum(base + i * lineH)}">${esc(line)}</tspan>`).join('\n');
                return `${indent}<text${transform} font-family="${esc((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cssFontFamily"])(n.fontFamily))}" font-size="${escAttrNum(n.fontSize)}" font-weight="${n.fontWeight}"${spacing}${deco ? ` text-decoration="${deco.trim()}"` : ''} text-anchor="${anchor}" fill="${fill}"${op} xml:space="preserve">\n${tspans}\n${indent}</text>`;
            }
        case 'image':
            {
                if (!n.src) return '';
                const href = esc(n.src);
                const clipR = n.cornerRadius > 0;
                if (clipR) {
                    const clipId = `iris-clip-${clipSeq++}`;
                    defsOut.push(`${indent}<clipPath id="${clipId}"><rect width="${escAttrNum(n.w)}" height="${escAttrNum(n.h)}" rx="${escAttrNum(n.cornerRadius)}"/></clipPath>`);
                    return `${indent}<image${transform} width="${escAttrNum(n.w)}" height="${escAttrNum(n.h)}" href="${href}" clip-path="url(#${clipId})"${op}${blend}/>`;
                }
                return `${indent}<image${transform} width="${escAttrNum(n.w)}" height="${escAttrNum(n.h)}" href="${href}"${op}${blend}/>`;
            }
    }
    return '';
}
function exportSVG(scope = 'selection') {
    const s = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"].getState();
    const ids = scope === 'selection' ? s.selection : undefined;
    const bounds = contentBounds(s.doc, s.currentPageId, ids);
    if (!bounds || bounds.w < 0.5 || bounds.h < 0.5) {
        s.toast(scope === 'selection' ? 'Select something to export' : 'Nothing to export on this page');
        return;
    }
    const page = s.doc.pagesById[s.currentPageId];
    const roots = ids && ids.length ? ids.map((id)=>s.doc.nodesById[id]).filter(Boolean) : (page?.nodeIds ?? []).map((id)=>s.doc.nodesById[id]).filter((n)=>!!n && n.visible);
    clipSeq = 0;
    gradSeq = 0;
    filtSeq = 0;
    defsOut = [];
    const body = roots.map((n)=>nodeToSVG(s.doc, n, '  ')).filter(Boolean).join('\n');
    const defs = defsOut.length ? `  <defs>\n${defsOut.map((d)=>`  ${d}`).join('\n')}\n  </defs>\n` : '';
    const w = Math.ceil(bounds.w * 100) / 100;
    const h = Math.ceil(bounds.h * 100) / 100;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="${escAttrNum(bounds.x)} ${escAttrNum(bounds.y)} ${w} ${h}">\n${defs}${body}\n</svg>`;
    const filename = exportFilename('svg', scope);
    downloadBlob(svg, filename);
    s.toast(`Exported ${filename}`);
}
function svgStringOfSelection() {
    const s = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"].getState();
    const ids = s.selection;
    if (ids.length === 0) return null;
    const bounds = contentBounds(s.doc, s.currentPageId, ids);
    if (!bounds || bounds.w < 0.5 || bounds.h < 0.5) return null;
    const roots = ids.map((id)=>s.doc.nodesById[id]).filter(Boolean);
    clipSeq = 0;
    gradSeq = 0;
    filtSeq = 0;
    defsOut = [];
    const body = roots.map((n)=>nodeToSVG(s.doc, n, '  ')).filter(Boolean).join('\n');
    const defs = defsOut.length ? `  <defs>\n${defsOut.map((d)=>`  ${d}`).join('\n')}\n  </defs>\n` : '';
    const w = Math.ceil(bounds.w * 100) / 100;
    const h = Math.ceil(bounds.h * 100) / 100;
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="${escAttrNum(bounds.x)} ${escAttrNum(bounds.y)} ${w} ${h}">\n${defs}${body}\n</svg>`;
}
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/iris/engine/files.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Iris file I/O — browser-shim implementation of the Electron IPC layer.
 * - .iris documents are plain JSON ({ app, version, doc }) downloaded/uploaded
 * - recents live in localStorage (with a doc snapshot so they can be reopened)
 * - images are imported as dataURLs
 */ __turbopack_context__.s([
    "addRecent",
    ()=>addRecent,
    "clearRecents",
    ()=>clearRecents,
    "getRecents",
    ()=>getRecents,
    "importImageFiles",
    ()=>importImageFiles,
    "openIrisBlob",
    ()=>openIrisBlob,
    "openIrisFile",
    ()=>openIrisFile,
    "pickImageFiles",
    ()=>pickImageFiles,
    "removeRecent",
    ()=>removeRecent,
    "saveIrisFile",
    ()=>saveIrisFile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/engine/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$export$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/iris/engine/export.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/engine/geometry.ts [app-client] (ecmascript)");
;
;
;
const RECENTS_KEY = 'iris.recents.v1';
const MAX_RECENTS = 8;
const MAX_RECENT_SIZE = 1_500_000;
function getRecents() {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const raw = window.localStorage.getItem(RECENTS_KEY);
        if (!raw) return [];
        const list = JSON.parse(raw);
        return Array.isArray(list) ? list.slice(0, MAX_RECENTS) : [];
    } catch  {
        return [];
    }
}
function writeRecents(list) {
    try {
        window.localStorage.setItem(RECENTS_KEY, JSON.stringify(list.slice(0, MAX_RECENTS)));
    } catch  {
    /* ignore */ }
}
function addRecent(doc) {
    const list = getRecents().filter((r)=>r.name !== doc.name);
    let snapshot = null;
    try {
        const json = JSON.stringify(doc);
        if (json.length <= MAX_RECENT_SIZE) snapshot = doc;
    } catch  {
        snapshot = null;
    }
    writeRecents([
        {
            name: doc.name,
            savedAt: Date.now(),
            doc: snapshot
        },
        ...list
    ]);
}
function removeRecent(name) {
    writeRecents(getRecents().filter((r)=>r.name !== name));
}
function clearRecents() {
    writeRecents([]);
}
async function saveIrisFile(opts) {
    const s = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"].getState();
    const name = s.savedName ?? s.doc.name;
    const payload = JSON.stringify({
        app: 'iris',
        version: 1,
        doc: s.doc
    }, null, 2);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$export$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["downloadBlob"])(new Blob([
        payload
    ], {
        type: 'application/json'
    }), `${name}.iris`);
    s.markSaved(name);
    addRecent(s.doc);
    s.toast(`Saved ${name}.iris`);
}
function parseIrisFile(file) {
    return new Promise((resolve, reject)=>{
        const reader = new FileReader();
        reader.onload = ()=>{
            try {
                const parsed = JSON.parse(String(reader.result));
                const doc = parsed?.doc ?? parsed;
                if (!doc || typeof doc !== 'object' || !Array.isArray(doc.pages)) {
                    throw new Error('bad file');
                }
                resolve(doc);
            } catch (err) {
                reject(err);
            }
        };
        reader.onerror = ()=>reject(new Error('read error'));
        reader.readAsText(file);
    });
}
function openIrisFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.iris,.json,application/json';
    input.onchange = async ()=>{
        const file = input.files?.[0];
        if (!file) return;
        try {
            const doc = await parseIrisFile(file);
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"].getState().loadDoc(doc, file.name.replace(/\.iris$/i, ''), true);
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"].getState().toast(`Opened ${file.name}`);
        } catch  {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"].getState().toast('Could not read that file — is it a .iris document?');
        }
    };
    input.click();
}
async function openIrisBlob(file) {
    try {
        const doc = await parseIrisFile(file);
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"].getState().loadDoc(doc, file.name.replace(/\.iris$/i, ''), true);
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"].getState().toast(`Opened ${file.name}`);
    } catch  {
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"].getState().toast('Could not read that file');
    }
}
/* ------------------------------------------------------------------ */ /* Image import                                                        */ /* ------------------------------------------------------------------ */ function readAsDataURL(file) {
    return new Promise((resolve, reject)=>{
        const reader = new FileReader();
        reader.onload = ()=>resolve(String(reader.result));
        reader.onerror = ()=>reject(new Error('read error'));
        reader.readAsDataURL(file);
    });
}
function imageSize(src) {
    return new Promise((resolve)=>{
        const img = new Image();
        img.onload = ()=>resolve({
                w: img.naturalWidth || 100,
                h: img.naturalHeight || 100
            });
        img.onerror = ()=>resolve({
                w: 100,
                h: 100
            });
        img.src = src;
    });
}
async function importImageFiles(files, at) {
    const list = Array.from(files).filter((f)=>f.type.startsWith('image/'));
    if (list.length === 0) return;
    const s = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"].getState();
    const center = at ?? (()=>{
        const { viewport, canvasSize } = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"].getState();
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["screenToWorld"])(viewport, canvasSize.w / 2 - 10, canvasSize.h / 2 - 10);
    })();
    let i = 0;
    for (const file of list){
        try {
            const src = await readAsDataURL(file);
            const { w, h } = await imageSize(src);
            const place = {
                x: center.x + i * 24,
                y: center.y + i * 24
            };
            const st = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"].getState();
            const parent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["frameAtPoint"])(st.doc, st.currentPageId, place);
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"].getState().importImage(src, w, h, place, parent?.id ?? null);
            i += 1;
        } catch  {
        /* skip bad file */ }
    }
    if (i > 0) s.toast(`Imported ${i} image${i > 1 ? 's' : ''}`);
}
function pickImageFiles(at) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.multiple = true;
    input.onchange = ()=>{
        if (input.files?.length) void importImageFiles(input.files, at);
    };
    input.click();
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/iris/engine/colors.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getRecentColors",
    ()=>getRecentColors,
    "getSwatches",
    ()=>getSwatches,
    "pushRecentColor",
    ()=>pushRecentColor,
    "toggleSwatch",
    ()=>toggleSwatch
]);
/**
 * Recent colors + saved swatch palette, persisted in localStorage.
 * Non-reactive by design: pickers re-read on open.
 */ const RECENT_KEY = 'iris.colors.recent.v1';
const SWATCH_KEY = 'iris.colors.swatches.v1';
const MAX_RECENT = 14;
const MAX_SWATCHES = 24;
function readList(key) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const raw = window.localStorage.getItem(key);
        const list = raw ? JSON.parse(raw) : [];
        return Array.isArray(list) ? list.filter((v)=>typeof v === 'string' && /^#[0-9a-fA-F]{6}$/.test(v)) : [];
    } catch  {
        return [];
    }
}
function writeList(key, list) {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        window.localStorage.setItem(key, JSON.stringify(list));
    } catch  {
    /* quota — ignore */ }
}
function getRecentColors() {
    return readList(RECENT_KEY);
}
function pushRecentColor(hex) {
    const norm = hex.toUpperCase();
    if (!/^#[0-9A-F]{6}$/.test(norm)) return;
    const list = [
        norm,
        ...readList(RECENT_KEY).filter((c)=>c !== norm)
    ].slice(0, MAX_RECENT);
    writeList(RECENT_KEY, list);
}
function getSwatches() {
    return readList(SWATCH_KEY);
}
function toggleSwatch(hex) {
    const norm = hex.toUpperCase();
    const list = readList(SWATCH_KEY);
    const exists = list.includes(norm);
    const next = exists ? list.filter((c)=>c !== norm) : [
        norm,
        ...list
    ].slice(0, MAX_SWATCHES);
    writeList(SWATCH_KEY, next);
    return !exists;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/iris/engine/tools.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Iris pointer/keyboard interaction layer — a state machine driving
 * marquee / move / resize / rotate / draw / pan / pen / path-edit / text /
 * ruler-guides / eyedropper / pinch-zoom.
 */ __turbopack_context__.s([
    "initTools",
    ()=>initTools
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/engine/geometry.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/engine/overlay.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/engine/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$renderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/engine/renderer.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$files$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/engine/files.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/engine/colors.ts [app-client] (ecmascript)");
;
;
;
;
;
;
let canvas = null;
let interaction = {
    kind: 'none'
};
let hoverHandle = null;
/* two-pointer pinch state */ const activePointers = new Map();
let pinch = null;
/* ------------------------------------------------------------------ */ /* helpers                                                             */ /* ------------------------------------------------------------------ */ function S() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"].getState();
}
_c = S;
function contentOrigin() {
    return S().viewFlags.rulers ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULER"] : 0;
}
function canvasRect() {
    return canvas ? canvas.getBoundingClientRect() : new DOMRect(0, 0, 0, 0);
}
/** Pointer coords are client-based (window listeners keep working during
 *  drags outside the canvas and for synthetic/automated events). */ function eventWorld(e) {
    const s = S();
    const o = contentOrigin();
    const r = canvasRect();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["screenToWorld"])(s.viewport, e.clientX - r.left - o, e.clientY - r.top - o);
}
function eventContent(e) {
    const o = contentOrigin();
    const r = canvasRect();
    return {
        x: e.clientX - r.left - o,
        y: e.clientY - r.top - o
    };
}
/** Raw coords relative to the canvas (ruler area included). */ function eventCanvas(e) {
    const r = canvasRect();
    return {
        x: e.clientX - r.left,
        y: e.clientY - r.top
    };
}
function pointerInCanvas(e) {
    const r = canvasRect();
    return e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
}
function setCursor(css) {
    if (canvas) canvas.style.cursor = css;
}
function toolCursor() {
    const t = S().tool;
    if (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].spaceDown || t === 'hand') return 'grab';
    if (t === 'move' || t === 'scale') return 'default';
    if (t === 'text') return 'text';
    if (t === 'eyedropper') return 'crosshair';
    if (t === 'comment') return 'crosshair';
    return 'crosshair';
}
function switchTool(t) {
    if (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].penDraft) finishPen(false);
    S().setTool(t);
    setCursor(toolCursor());
}
function handleCursor(h) {
    switch(h){
        case 'nw':
        case 'se':
            return 'nwse-resize';
        case 'ne':
        case 'sw':
            return 'nesw-resize';
        case 'n':
        case 's':
            return 'ns-resize';
        case 'e':
        case 'w':
            return 'ew-resize';
        case 'rot':
            return 'grab';
    }
}
function hitHandle(content) {
    const s = S();
    if (s.tool !== 'move' || s.selection.length === 0 || s.editingTextId || s.editingPathId) return null;
    const geo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["selectionHandleGeometry"])(s.doc, s.selection, s.viewport);
    if (!geo) return null;
    if (Math.hypot(content.x - geo.rot.x, content.y - geo.rot.y) <= 8) return 'rot';
    for (const p of geo.pts){
        if (Math.hypot(content.x - p.x, content.y - p.y) <= 7) return p.kind;
    }
    return null;
}
/** Nodes whose ancestor is also in the list are removed (for resize). */ function topOnly(ids) {
    const s = S();
    return ids.filter((id)=>{
        let p = s.doc.nodesById[id]?.parentId;
        while(p){
            if (ids.includes(p)) return false;
            p = s.doc.nodesById[p]?.parentId;
        }
        return true;
    });
}
const DRAW_TOOLS = [
    'frame',
    'rect',
    'ellipse',
    'line',
    'polygon',
    'star',
    'arrow',
    'section',
    'slice'
];
/** Constrain a draw drag with Shift: squares for boxes, 45° for lines. */ function constrainDraw(a, b, type, shift) {
    if (!shift) return b;
    if (type === 'line' || type === 'arrow') {
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const ang = Math.atan2(dy, dx);
        const len = Math.hypot(dx, dy);
        const snap = Math.round(ang / (Math.PI / 4)) * (Math.PI / 4);
        return {
            x: a.x + Math.cos(snap) * len,
            y: a.y + Math.sin(snap) * len
        };
    }
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const size = Math.max(Math.abs(dx), Math.abs(dy));
    return {
        x: a.x + Math.sign(dx || 1) * size,
        y: a.y + Math.sign(dy || 1) * size
    };
}
/** Snap a value to the layout grid when enabled. */ function snapGridValue(v) {
    const s = S();
    const size = s.doc.settings?.grid;
    if (!size?.snap || size.size < 1) return v;
    return Math.round(v / size.size) * size.size;
}
/** Snap a rect's origin/size to the grid when enabled. */ function snapGridRect(r) {
    const s = S();
    const grid = s.doc.settings?.grid;
    if (!grid?.snap || grid.size < 1) return r;
    const x = Math.round(r.x / grid.size) * grid.size;
    const y = Math.round(r.y / grid.size) * grid.size;
    const w = Math.max(0, Math.round(r.w / grid.size) * grid.size);
    const h = Math.max(0, Math.round(r.h / grid.size) * grid.size);
    return {
        x,
        y,
        w,
        h
    };
}
/** Distance from pointer to an existing guide line (screen px), or null. */ function guideUnderPointer(world) {
    const s = S();
    const zoom = s.viewport.zoom;
    const settings = s.doc.settings;
    for(let i = 0; i < (settings.guidesX?.length ?? 0); i++){
        const at = settings.guidesX[i];
        if (Math.abs(world.x - at) * zoom <= 4) return {
            axis: 'x',
            index: i,
            at
        };
    }
    for(let i = 0; i < (settings.guidesY?.length ?? 0); i++){
        const at = settings.guidesY[i];
        if (Math.abs(world.y - at) * zoom <= 4) return {
            axis: 'y',
            index: i,
            at
        };
    }
    return null;
}
/* ------------------------------------------------------------------ */ /* pen                                                                 */ /* ------------------------------------------------------------------ */ function finishPen(closed) {
    const draft = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].penDraft;
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].penDraft = null;
    if (!draft || draft.points.length < 2) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$renderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["requestDraw"])();
        return;
    }
    const pts = draft.points;
    const minX = Math.min(...pts.map((p)=>p.x));
    const minY = Math.min(...pts.map((p)=>p.y));
    const maxX = Math.max(...pts.map((p)=>p.x));
    const maxY = Math.max(...pts.map((p)=>p.y));
    const points = pts.map((p)=>({
            x: p.x - minX,
            y: p.y - minY,
            hx: p.hx,
            hy: p.hy
        }));
    const s = S();
    const canClose = closed && points.length >= 3;
    const frame = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["frameAtPoint"])(s.doc, s.currentPageId, {
        x: minX,
        y: minY
    });
    let x = minX;
    let y = minY;
    let parentId = frame?.id ?? null;
    if (parentId) {
        const parent = s.doc.nodesById[parentId];
        if (parent) {
            const inv = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mInvert"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nodeWorldMatrix"])(s.doc, parent));
            const local = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mApply"])(inv, minX, minY);
            x = local.x;
            y = local.y;
        }
    }
    s.addNode('path', {
        x,
        y,
        w: Math.max(maxX - minX, 1),
        h: Math.max(maxY - minY, 1),
        points,
        closed: canClose,
        fill: canClose ? '#D9D9D9' : null,
        stroke: canClose ? null : '#B3B3B3',
        strokeWidth: 1
    }, parentId);
    s.setTool('move');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$renderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["requestDraw"])();
}
/* ------------------------------------------------------------------ */ /* pencil (freehand)                                                   */ /* ------------------------------------------------------------------ */ function finishPencil() {
    const ia = interaction;
    const pts = ia.points;
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].pencilDraft = null;
    interaction = {
        kind: 'none'
    };
    if (pts.length < 2) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$renderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["requestDraw"])();
        return;
    }
    // simplify: drop near-duplicate points (screen-space ~2px)
    const zoom = S().viewport.zoom;
    const simp = [
        pts[0]
    ];
    for (const p of pts.slice(1)){
        const last = simp[simp.length - 1];
        if (Math.hypot(p.x - last.x, p.y - last.y) * zoom > 2) simp.push(p);
    }
    if (simp.length < 2) {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$renderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["requestDraw"])();
        return;
    }
    const minX = Math.min(...simp.map((p)=>p.x));
    const minY = Math.min(...simp.map((p)=>p.y));
    const maxX = Math.max(...simp.map((p)=>p.x));
    const maxY = Math.max(...simp.map((p)=>p.y));
    const s = S();
    const parentId = ia.parentId;
    let x = minX;
    let y = minY;
    if (parentId) {
        const parent = s.doc.nodesById[parentId];
        if (parent) {
            const inv = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mInvert"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nodeWorldMatrix"])(s.doc, parent));
            const local = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mApply"])(inv, minX, minY);
            x = local.x;
            y = local.y;
        }
    }
    const last = simp[simp.length - 1];
    const first = simp[0];
    const closed = Math.hypot(last.x - first.x, last.y - first.y) * zoom < 8;
    s.addNode('path', {
        x,
        y,
        w: Math.max(maxX - minX, 1),
        h: Math.max(maxY - minY, 1),
        points: simp.map((p)=>({
                x: p.x - minX,
                y: p.y - minY,
                hx: 0,
                hy: 0
            })),
        closed,
        fill: closed ? '#D9D9D9' : null,
        stroke: closed ? null : '#B3B3B3',
        strokeWidth: 1
    }, parentId);
    s.setTool('move');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$renderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["requestDraw"])();
}
/* ------------------------------------------------------------------ */ /* scale tool                                                          */ /* ------------------------------------------------------------------ */ function applyScale(ia, k) {
    const s = S();
    const updates = [];
    const rectUpdates = [];
    for (const n0 of ia.startNodes){
        const c0 = ia.startCenters.get(n0.id);
        const cx = ia.anchor.x + (c0.x - ia.anchor.x) * k;
        const cy = ia.anchor.y + (c0.y - ia.anchor.y) * k;
        const w = Math.max(0.5, n0.w * k);
        const h = Math.max(0.5, n0.h * k);
        // world position of the (rotated) local origin
        const theta = n0.rotation * Math.PI / 180;
        const ox = -w / 2;
        const oy = -h / 2;
        const originWorld = {
            x: cx + Math.cos(theta) * ox - Math.sin(theta) * oy,
            y: cy + Math.sin(theta) * ox + Math.cos(theta) * oy
        };
        const Pinv = ia.parentInvs.get(n0.id);
        const local = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mApply"])(Pinv, originWorld.x, originWorld.y);
        if (n0.type === 'frame' || n0.type === 'group' || n0.type === 'section') {
            rectUpdates.push({
                id: n0.id,
                rect: {
                    x: local.x,
                    y: local.y,
                    w,
                    h
                }
            });
            continue;
        }
        const patch = {
            x: local.x,
            y: local.y,
            w,
            h
        };
        if (n0.type === 'text') patch.fontSize = Math.max(1, n0.fontSize * k);
        if (n0.cornerRadius) patch.cornerRadius = Math.max(0, n0.cornerRadius * k);
        if (n0.type === 'path' && n0.points.length) {
            patch.points = n0.points.map((p)=>({
                    x: p.x * k,
                    y: p.y * k,
                    hx: p.hx * k,
                    hy: p.hy * k
                }));
        }
        if (n0.type === 'line' || n0.type === 'arrow') patch.strokeWidth = Math.max(0.5, n0.strokeWidth * k);
        updates.push({
            id: n0.id,
            patch
        });
    }
    if (updates.length) {
        s.updateNodes(updates.map((u)=>u.id), (node)=>{
            const u = updates.find((x)=>x.id === node.id);
            return u.patch;
        }, {
            history: false
        });
    }
    for (const r of rectUpdates){
        s.setNodeRect(r.id, r.rect, {
            history: false
        });
    }
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].dragBadge = {
        x: ia.anchor.x + (ia.startBox.x - ia.anchor.x) * k,
        y: ia.anchor.y + (ia.startBox.y - ia.anchor.y) * k,
        w: ia.startBox.w * k,
        h: ia.startBox.h * k
    };
}
/* ------------------------------------------------------------------ */ /* re-parenting on drop (Figma-style)                                  */ /* ------------------------------------------------------------------ */ /** After a move drag ends: re-parent roots whose bbox center is over a
 *  different frame (or back to the page when outside every frame). */ function reparentOnDrop(startNodes) {
    const s = S();
    const roots = topOnly(startNodes.map((n)=>n.id));
    if (roots.length === 0) return;
    const box = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["boundsOfNodes"])(s.doc, roots);
    if (!box) return;
    const center = {
        x: box.x + box.w / 2,
        y: box.y + box.h / 2
    };
    // exclude dragged subtrees so a dragged frame cannot capture itself
    const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["frameAtPoint"])(s.doc, s.currentPageId, center, roots);
    const targetId = target?.id ?? null;
    const moving = roots.filter((id)=>{
        const n = s.doc.nodesById[id];
        return !!n && n.parentId !== targetId;
    });
    if (moving.length === 0) return;
    s.reorderNodes(moving, targetId, -1);
}
/* ------------------------------------------------------------------ */ /* eyedropper                                                          */ /* ------------------------------------------------------------------ */ function applyPickedColor(hex) {
    const s = S();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pushRecentColor"])(hex);
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].pickedColor = hex;
    const sel = s.doc.nodesById[s.selection[0] ?? ''];
    if (sel && [
        'rect',
        'ellipse',
        'frame',
        'path',
        'text',
        'polygon',
        'star'
    ].includes(sel.type)) {
        s.updateNodes([
            sel.id
        ], {
            fill: hex
        }, {
            history: 'fill'
        });
        s.toast(`Picked ${hex} — applied to fill`);
    } else {
        s.toast(`Picked ${hex} — select a shape to apply it`);
    }
}
/* ------------------------------------------------------------------ */ /* pointer handlers                                                    */ /* ------------------------------------------------------------------ */ function onPointerDown(e) {
    if (!canvas) return;
    try {
        canvas.setPointerCapture(e.pointerId);
    } catch  {
    /* synthetic pointer (test automation) — events are followed on window */ }
    const s = S();
    const world = eventWorld(e);
    const content = eventContent(e);
    const raw = eventCanvas(e);
    // touch bookkeeping for pinch
    if (e.pointerType === 'touch') {
        activePointers.set(e.pointerId, {
            x: e.clientX,
            y: e.clientY
        });
        if (activePointers.size === 2) {
            // begin pinch: cancel whatever interaction was running
            cancelInteraction();
            const pts = [
                ...activePointers.values()
            ];
            const d = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
            const mid = {
                x: (pts[0].x + pts[1].x) / 2,
                y: (pts[0].y + pts[1].y) / 2
            };
            pinch = {
                startDist: Math.max(1, d),
                startMid: mid,
                startVp: {
                    ...s.viewport
                }
            };
            return;
        }
    }
    // finish text editing if active
    if (s.editingTextId) s.setEditingText(null);
    // middle button or space => pan
    if (e.button === 1 || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].spaceDown) {
        interaction = {
            kind: 'pan',
            startScreen: {
                x: e.clientX,
                y: e.clientY
            },
            startVp: {
                ...s.viewport
            }
        };
        setCursor('grabbing');
        return;
    }
    if (e.button === 2) return; // context menu handles right click
    // ruler guide pulls (only near the ruler strips themselves)
    if (s.viewFlags.rulers && (raw.x < __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULER"] || raw.y < __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULER"])) {
        const inLeftRuler = raw.x < __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULER"];
        const inTopRuler = raw.y < __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULER"];
        if (inLeftRuler && !inTopRuler) {
            interaction = {
                kind: 'guideDrag',
                axis: 'x',
                index: -1,
                entered: false
            };
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].guideDrag = {
                axis: 'x',
                at: world.x,
                index: -1,
                entered: false
            };
            return;
        }
        if (inTopRuler && !inLeftRuler) {
            interaction = {
                kind: 'guideDrag',
                axis: 'y',
                index: -1,
                entered: false
            };
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].guideDrag = {
                axis: 'y',
                at: world.y,
                index: -1,
                entered: false
            };
            return;
        }
    // corner: fall through
    }
    // dragging an existing guide line on the canvas (move tool only)
    if (s.tool === 'move' && !s.editingTextId && !s.editingPathId) {
        const hit = guideUnderPointer(world);
        if (hit) {
            interaction = {
                kind: 'guideDrag',
                axis: hit.axis,
                index: hit.index,
                entered: true
            };
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].guideDrag = {
                axis: hit.axis,
                at: hit.at,
                index: hit.index,
                entered: true
            };
            S().historyBegin();
            return;
        }
    }
    // path edit mode
    if (s.editingPathId) {
        const n = s.doc.nodesById[s.editingPathId];
        if (n && n.type === 'path') {
            const W = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nodeWorldMatrix"])(s.doc, n);
            const vp = s.viewport;
            const ptScreen = (p)=>({
                    x: p.x * vp.zoom + vp.x,
                    y: p.y * vp.zoom + vp.y
                });
            const activeIdx = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].pathEdit?.activePoint ?? null;
            // handle hit for the active point
            if (activeIdx !== null && n.points[activeIdx]) {
                const p = n.points[activeIdx];
                if (p.hx !== 0 || p.hy !== 0) {
                    const anchor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mApply"])(W, p.x, p.y);
                    const out = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mApply"])(W, p.x + p.hx, p.y + p.hy);
                    const inn = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mApply"])(W, p.x - p.hx, p.y - p.hy);
                    const aS = ptScreen(anchor);
                    const oS = ptScreen(out);
                    const iS = ptScreen(inn);
                    if (Math.hypot(content.x - oS.x, content.y - oS.y) <= 7) {
                        interaction = {
                            kind: 'pathHandle',
                            index: activeIdx,
                            which: 'out',
                            moved: false
                        };
                        s.historyBegin();
                        return;
                    }
                    if (Math.hypot(content.x - iS.x, content.y - iS.y) <= 7) {
                        interaction = {
                            kind: 'pathHandle',
                            index: activeIdx,
                            which: 'in',
                            moved: false
                        };
                        s.historyBegin();
                        return;
                    }
                }
            }
            // point hit
            for(let i = 0; i < n.points.length; i++){
                const p = n.points[i];
                const sp = ptScreen((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mApply"])(W, p.x, p.y));
                if (Math.hypot(content.x - sp.x, content.y - sp.y) <= 7) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].pathEdit = {
                        activePoint: i,
                        dragKind: 'point',
                        hoverPoint: i
                    };
                    const ptsWorld = n.points.map((pt)=>{
                        const w = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mApply"])(W, pt.x, pt.y);
                        return {
                            ...pt,
                            wx: w.x,
                            wy: w.y
                        };
                    });
                    interaction = {
                        kind: 'pathPoint',
                        index: i,
                        ptsWorld,
                        moved: false
                    };
                    s.historyBegin();
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$renderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["requestDraw"])();
                    return;
                }
            }
            // click empty: exit path edit, fall through to normal handling
            s.setEditingPath(null);
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].pathEdit = null;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$renderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["requestDraw"])();
        }
    }
    const tool = s.tool;
    if (tool === 'hand') {
        interaction = {
            kind: 'pan',
            startScreen: {
                x: e.clientX,
                y: e.clientY
            },
            startVp: {
                ...s.viewport
            }
        };
        setCursor('grabbing');
        return;
    }
    if (tool === 'eyedropper') {
        interaction = {
            kind: 'eyedrop'
        };
        const hex = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$renderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["samplePixel"])(e.clientX, e.clientY);
        if (hex) applyPickedColor(hex);
        else s.toast('Nothing to sample there');
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$renderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["requestDraw"])();
        return;
    }
    if (tool === 'image') {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$files$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pickImageFiles"])(world);
        return;
    }
    if (tool === 'comment') {
        // clicking adds a comment pin; the CommentLayer UI opens the editor
        const id = s.addComment(world.x, world.y, '');
        s.setActiveComment(id);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$renderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["requestDraw"])();
        return;
    }
    if (tool === 'pencil') {
        const frame = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["frameAtPoint"])(s.doc, s.currentPageId, world);
        interaction = {
            kind: 'pencil',
            points: [
                world
            ],
            parentId: frame?.id ?? null
        };
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].pencilDraft = [
            world
        ];
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$renderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["requestDraw"])();
        return;
    }
    if (tool === 'pen') {
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].penDraft) __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].penDraft = {
            points: [],
            cursor: world,
            dragging: false
        };
        const draft = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].penDraft;
        // click near first point => close
        if (draft.points.length >= 3) {
            const first = draft.points[0];
            if (Math.hypot(world.x - first.x, world.y - first.y) * s.viewport.zoom < 10) {
                finishPen(true);
                return;
            }
        }
        draft.points.push({
            x: world.x,
            y: world.y,
            hx: 0,
            hy: 0
        });
        draft.dragging = true;
        interaction = {
            kind: 'penHandle'
        };
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$renderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["requestDraw"])();
        return;
    }
    if (tool === 'text') {
        // clicking existing text edits it
        const hit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hitTestDeep"])(s.doc, s.currentPageId, world, 6 / s.viewport.zoom);
        if (hit && hit.type === 'text') {
            s.setEditingText(hit.id);
            interaction = {
                kind: 'none'
            };
            return;
        }
        const frame = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["frameAtPoint"])(s.doc, s.currentPageId, world);
        interaction = {
            kind: 'draw',
            type: 'text',
            startWorld: world,
            parentId: frame?.id ?? null
        };
        return;
    }
    if (DRAW_TOOLS.includes(tool)) {
        // sections + slices always live at the page level (Figma behavior)
        const frame = tool === 'section' || tool === 'slice' ? null : (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["frameAtPoint"])(s.doc, s.currentPageId, world);
        interaction = {
            kind: 'draw',
            type: tool,
            startWorld: world,
            parentId: frame?.id ?? null
        };
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$renderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["requestDraw"])();
        return;
    }
    // scale tool -------------------------------------------------------
    if (tool === 'scale') {
        const hh = hitHandle(content);
        const ids = topOnly(s.selection);
        if (hh && (hh === 'nw' || hh === 'ne' || hh === 'sw' || hh === 'se') && ids.length > 0) {
            const nodes = ids.map((id)=>s.doc.nodesById[id]).filter(Boolean);
            const startBox = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["boundsOfNodes"])(s.doc, ids);
            if (nodes.length && startBox) {
                const anchor = {
                    x: hh.includes('w') ? startBox.x + startBox.w : startBox.x,
                    y: hh.includes('n') ? startBox.y + startBox.h : startBox.y
                };
                const startCenters = new Map();
                const parentInvs = new Map();
                for (const n of nodes){
                    const box = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nodeWorldAABB"])(s.doc, n);
                    startCenters.set(n.id, {
                        x: box.x + box.w / 2,
                        y: box.y + box.h / 2
                    });
                    parentInvs.set(n.id, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mInvert"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parentWorldMatrix"])(s.doc, n)));
                }
                s.historyBegin();
                interaction = {
                    kind: 'scale',
                    anchor,
                    startDist: Math.max(1, Math.hypot(world.x - anchor.x, world.y - anchor.y)),
                    startNodes: nodes.map((n)=>({
                            ...n
                        })),
                    startBox,
                    startCenters,
                    parentInvs,
                    moved: false
                };
                return;
            }
        }
    // fall through: scale tool otherwise behaves like move (select + drag)
    }
    // move tool --------------------------------------------------------
    // handle hit? (not for the scale tool — its handles are scale-only)
    const hh = s.tool === 'scale' ? null : hitHandle(content);
    if (hh) {
        const ids = topOnly(s.selection);
        const nodes = ids.map((id)=>s.doc.nodesById[id]).filter(Boolean);
        if (nodes.length === 0) return;
        const startBox = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["boundsOfNodes"])(s.doc, ids);
        const worldInvs = new Map();
        const parentInvs = new Map();
        const startAABBs = new Map();
        for (const n of nodes){
            worldInvs.set(n.id, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mInvert"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nodeWorldMatrix"])(s.doc, n)));
            parentInvs.set(n.id, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mInvert"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parentWorldMatrix"])(s.doc, n)));
            startAABBs.set(n.id, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nodeWorldAABB"])(s.doc, n));
        }
        if (hh === 'rot') {
            const center = {
                x: startBox.x + startBox.w / 2,
                y: startBox.y + startBox.h / 2
            };
            const worldMats = new Map();
            for (const n of nodes)worldMats.set(n.id, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nodeWorldMatrix"])(s.doc, n));
            interaction = {
                kind: 'rotate',
                center,
                startAngle: Math.atan2(world.y - center.y, world.x - center.x),
                startNodes: nodes.map((n)=>({
                        ...n
                    })),
                worldMats,
                parentInvs,
                moved: false
            };
            s.historyBegin();
            return;
        }
        interaction = {
            kind: 'resize',
            handle: hh,
            startWorld: world,
            startNodes: nodes.map((n)=>({
                    ...n
                })),
            startBox,
            worldInvs,
            parentInvs,
            startAABBs,
            singleId: nodes.length === 1 ? nodes[0].id : null,
            singleWorldInv: worldInvs.get(nodes[0].id),
            moved: false
        };
        s.historyBegin();
        return;
    }
    // object hit?
    const hit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hitTestDeep"])(s.doc, s.currentPageId, world, 6 / s.viewport.zoom);
    if (hit) {
        const deep = e.ctrlKey || e.metaKey;
        const resolved = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveClick"])(s.doc, hit, deep);
        let dragIds;
        if (e.shiftKey) {
            if (s.selection.includes(resolved)) {
                dragIds = s.selection;
            } else {
                s.setSelection([
                    ...s.selection,
                    resolved
                ]);
                dragIds = [
                    ...s.selection,
                    resolved
                ];
            }
        } else if (s.selection.includes(resolved)) {
            dragIds = s.selection;
        } else {
            s.setSelection([
                resolved
            ]);
            dragIds = [
                resolved
            ];
        }
        // alt-drag duplicates
        if (e.altKey) {
            const newIds = S().duplicateSelection({
                dx: 0,
                dy: 0
            });
            dragIds = newIds.length ? newIds : dragIds;
            interaction = {
                kind: 'move',
                startWorld: world,
                moved: false,
                ownsHistory: false,
                startNodes: dragIds.map((id)=>S().doc.nodesById[id]).filter(Boolean).map((n)=>({
                        id: n.id,
                        x: n.x,
                        y: n.y,
                        parentId: n.parentId
                    }))
            };
            return;
        }
        s.historyBegin();
        interaction = {
            kind: 'move',
            startWorld: world,
            moved: false,
            ownsHistory: true,
            startNodes: dragIds.map((id)=>s.doc.nodesById[id]).filter(Boolean).map((n)=>({
                    id: n.id,
                    x: n.x,
                    y: n.y,
                    parentId: n.parentId
                }))
        };
        return;
    }
    // empty: marquee
    interaction = {
        kind: 'marquee',
        startWorld: world,
        additive: e.shiftKey
    };
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].marquee = {
        x: world.x,
        y: world.y,
        w: 0,
        h: 0
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$renderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["requestDraw"])();
}
/** Abort the running interaction gracefully (pinch takeover, etc.). */ function cancelInteraction() {
    const s = S();
    if (interaction.kind === 'move' || interaction.kind === 'resize' || interaction.kind === 'rotate' || interaction.kind === 'scale') {
        if ('ownsHistory' in interaction && interaction.ownsHistory) s.historyCancel();
        else if (interaction.kind === 'scale') s.historyCancel();
    }
    if (interaction.kind === 'pathPoint' || interaction.kind === 'pathHandle') s.historyCancel();
    interaction = {
        kind: 'none'
    };
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].marquee = null;
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].drawPreview = null;
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].dragBadge = null;
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].guides = [];
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].guideDrag = null;
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].pencilDraft = null;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$renderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["requestDraw"])();
}
function onPointerMove(e) {
    const s = S();
    const world = eventWorld(e);
    const content = eventContent(e);
    const raw = eventCanvas(e);
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].pointerWorld = world;
    // touch pointer tracking + pinch handling
    if (e.pointerType === 'touch' && activePointers.has(e.pointerId)) {
        activePointers.set(e.pointerId, {
            x: e.clientX,
            y: e.clientY
        });
        if (pinch && activePointers.size >= 2) {
            const pts = [
                ...activePointers.values()
            ];
            const p0 = pts[0];
            const p1 = pts[1];
            const d = Math.max(1, Math.hypot(p0.x - p1.x, p0.y - p1.y));
            const mid = {
                x: (p0.x + p1.x) / 2,
                y: (p0.y + p1.y) / 2
            };
            const zoom = Math.min(256, Math.max(0.02, pinch.startVp.zoom * d / pinch.startDist));
            const k = zoom / pinch.startVp.zoom;
            const o = contentOrigin();
            const r = canvasRect();
            const cx = mid.x - r.left - o;
            const cy = mid.y - r.top - o;
            const scx = pinch.startMid.x - r.left - o;
            const scy = pinch.startMid.y - r.top - o;
            s.setViewport({
                zoom,
                x: cx - (scx - pinch.startVp.x) * k,
                y: cy - (scy - pinch.startVp.y) * k
            });
            return;
        }
    }
    if (interaction.kind === 'none') {
        if (!pointerInCanvas(e)) {
            if (s.hoverId) s.setHover(null);
            return;
        }
        // hover + cursor
        if (s.editingTextId) return;
        if (s.tool === 'eyedropper') {
            setCursor('crosshair');
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$renderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["requestDraw"])();
            return;
        }
        if (s.tool === 'move' || s.tool === 'scale') {
            let hh = hitHandle(content);
            if (s.tool === 'scale' && hh && !(hh === 'nw' || hh === 'ne' || hh === 'sw' || hh === 'se')) hh = null;
            if (hh !== hoverHandle) {
                hoverHandle = hh;
                setCursor(hh ? handleCursor(hh) : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].spaceDown ? 'grab' : 'default');
            }
            if (!hh) {
                const hit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hitTestDeep"])(s.doc, s.currentPageId, world, 6 / s.viewport.zoom);
                const id = hit?.id ?? null;
                if (id !== s.hoverId) s.setHover(id);
            } else if (s.hoverId) {
                s.setHover(null);
            }
        } else {
            if (s.hoverId) s.setHover(null);
            setCursor(toolCursor());
            if (s.tool === 'pen' && __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].penDraft) {
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].penDraft.cursor = world;
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$renderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["requestDraw"])();
            }
        }
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$renderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["requestDraw"])(); // ruler pointer marker
        return;
    }
    switch(interaction.kind){
        case 'pan':
            {
                s.setViewport({
                    ...interaction.startVp,
                    x: interaction.startVp.x + (e.clientX - interaction.startScreen.x),
                    y: interaction.startVp.y + (e.clientY - interaction.startScreen.y)
                });
                return;
            }
        case 'guideDrag':
            {
                const inCanvasArea = raw.x > __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULER"] && raw.y > __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULER"];
                const at = interaction.axis === 'x' ? snapGridValue(world.x) : snapGridValue(world.y);
                interaction.entered = interaction.entered || inCanvasArea;
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].guideDrag = {
                    axis: interaction.axis,
                    at,
                    index: interaction.index,
                    entered: interaction.entered
                };
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$renderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["requestDraw"])();
                return;
            }
        case 'marquee':
            {
                const x = Math.min(interaction.startWorld.x, world.x);
                const y = Math.min(interaction.startWorld.y, world.y);
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].marquee = {
                    x,
                    y,
                    w: Math.abs(world.x - interaction.startWorld.x),
                    h: Math.abs(world.y - interaction.startWorld.y)
                };
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$renderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["requestDraw"])();
                return;
            }
        case 'move':
            {
                let dx = world.x - interaction.startWorld.x;
                let dy = world.y - interaction.startWorld.y;
                if (!interaction.moved) {
                    if (Math.hypot(dx, dy) * s.viewport.zoom < 2.5) return;
                    interaction.moved = true;
                }
                if (e.shiftKey) {
                    if (Math.abs(dx) > Math.abs(dy)) dy = 0;
                    else dx = 0;
                }
                // grid snap (unless ctrl held)
                if (!e.ctrlKey && !e.metaKey && s.doc.settings?.grid?.snap) {
                    const startBox = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["boundsOfNodes"])(s.doc, interaction.startNodes.map((n)=>n.id));
                    if (startBox) {
                        const size = s.doc.settings.grid.size;
                        const tx = Math.round((startBox.x + dx) / size) * size;
                        const ty = Math.round((startBox.y + dy) / size) * size;
                        dx += tx - (startBox.x + dx);
                        dy += ty - (startBox.y + dy);
                    }
                }
                // smart snapping (unless ctrl held and grid snap is off)
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].guides = [];
                if (!e.ctrlKey && !e.metaKey && !s.doc.settings?.grid?.snap) {
                    const startBox = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["boundsOfNodes"])(s.doc, interaction.startNodes.map((n)=>n.id));
                    if (startBox) {
                        const moving = {
                            x: startBox.x + dx,
                            y: startBox.y + dy,
                            w: startBox.w,
                            h: startBox.h
                        };
                        const cands = snapCandidates(interaction.startNodes.map((n)=>n.id));
                        const snap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["computeSnap"])(moving, cands, 6 / s.viewport.zoom);
                        dx += snap.dx;
                        dy += snap.dy;
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].guides = snap.guides;
                    }
                }
                const updates = [];
                for (const start of interaction.startNodes){
                    const n = s.doc.nodesById[start.id];
                    if (!n) continue;
                    const P = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parentWorldMatrix"])(s.doc, n);
                    const local = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mApplyVec"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mInvert"])(P), dx, dy);
                    updates.push({
                        id: start.id,
                        x: start.x + local.x,
                        y: start.y + local.y
                    });
                }
                if (updates.length) {
                    s.updateNodes(updates.map((u)=>u.id), (node)=>{
                        const u = updates.find((x)=>x.id === node.id);
                        return {
                            x: u.x,
                            y: u.y
                        };
                    }, {
                        history: false
                    });
                }
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$renderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["requestDraw"])();
                return;
            }
        case 'resize':
            {
                applyResize(interaction, world, e.shiftKey, e.altKey);
                interaction.moved = true;
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$renderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["requestDraw"])();
                return;
            }
        case 'rotate':
            {
                const ang = Math.atan2(world.y - interaction.center.y, world.x - interaction.center.x);
                let deltaDeg = (ang - interaction.startAngle) * 180 / Math.PI;
                if (e.shiftKey) deltaDeg = Math.round(deltaDeg / 15) * 15;
                interaction.moved = true;
                const R = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mMul"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mMul"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mTranslate"])(interaction.center.x, interaction.center.y), (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mRotate"])(deltaDeg)), (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mTranslate"])(-interaction.center.x, -interaction.center.y));
                const updates = [];
                for (const n0 of interaction.startNodes){
                    const W = interaction.worldMats.get(n0.id);
                    const target = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mMul"])(R, W);
                    const Pinv = interaction.parentInvs.get(n0.id);
                    const L = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mMul"])(Pinv, target);
                    let rot = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["normalizeAngle"])(Math.atan2(L.b, L.a) * 180 / Math.PI);
                    const rc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mMul"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mMul"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mTranslate"])(n0.w / 2, n0.h / 2), (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mRotate"])(rot)), (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mTranslate"])(-n0.w / 2, -n0.h / 2));
                    const t = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mMul"])(L, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mInvert"])(rc));
                    updates.push({
                        id: n0.id,
                        x: t.e,
                        y: t.f,
                        rotation: rot
                    });
                }
                s.updateNodes(updates.map((u)=>u.id), (node)=>{
                    const u = updates.find((x)=>x.id === node.id);
                    return {
                        x: u.x,
                        y: u.y,
                        rotation: u.rotation
                    };
                }, {
                    history: false
                });
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$renderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["requestDraw"])();
                return;
            }
        case 'draw':
            {
                const a = interaction.startWorld;
                const b = constrainDraw(a, world, interaction.type, e.shiftKey);
                const rect = {
                    x: Math.min(a.x, b.x),
                    y: Math.min(a.y, b.y),
                    w: Math.abs(b.x - a.x),
                    h: Math.abs(b.y - a.y)
                };
                const dx = b.x - a.x;
                const dy = b.y - a.y;
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].dragBadge = rect;
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].drawPreview = {
                    type: interaction.type,
                    rect,
                    flip: dx !== 0 && dy !== 0 ? dx > 0 !== dy > 0 : false,
                    diagonal: interaction.type === 'line' || interaction.type === 'arrow' ? {
                        x1: a.x,
                        y1: a.y,
                        x2: b.x,
                        y2: b.y
                    } : null
                };
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$renderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["requestDraw"])();
                return;
            }
        case 'pencil':
            {
                const pts = interaction.points;
                const last = pts[pts.length - 1];
                if (Math.hypot(world.x - last.x, world.y - last.y) * s.viewport.zoom > 1.5) {
                    pts.push(world);
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].pencilDraft = pts;
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$renderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["requestDraw"])();
                }
                return;
            }
        case 'scale':
            {
                const k = Math.max(0.02, Math.hypot(world.x - interaction.anchor.x, world.y - interaction.anchor.y) / interaction.startDist);
                applyScale(interaction, k);
                interaction.moved = true;
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$renderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["requestDraw"])();
                return;
            }
        case 'penHandle':
            {
                const draft = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].penDraft;
                if (draft && draft.points.length > 0) {
                    const p = draft.points[draft.points.length - 1];
                    p.hx = world.x - p.x;
                    p.hy = world.y - p.y;
                    draft.cursor = world;
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$renderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["requestDraw"])();
                }
                return;
            }
        case 'pathPoint':
            {
                const n = s.doc.nodesById[s.editingPathId ?? ''];
                if (!n || n.type !== 'path') return;
                interaction.ptsWorld[interaction.index] = {
                    ...interaction.ptsWorld[interaction.index],
                    wx: world.x,
                    wy: world.y
                };
                interaction.moved = true;
                applyPathPoints(n, interaction.ptsWorld);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$renderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["requestDraw"])();
                return;
            }
        case 'pathHandle':
            {
                const n = s.doc.nodesById[s.editingPathId ?? ''];
                if (!n || n.type !== 'path') return;
                const W = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nodeWorldMatrix"])(s.doc, n);
                const p = n.points[interaction.index];
                if (!p) return;
                const anchor = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mApply"])(W, p.x, p.y);
                let hx = world.x - anchor.x;
                let hy = world.y - anchor.y;
                if (interaction.which === 'in') {
                    hx = -hx;
                    hy = -hy;
                }
                const ptsWorld = n.points.map((pt, i)=>{
                    const w = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mApply"])(W, pt.x, pt.y);
                    return {
                        ...pt,
                        wx: w.x,
                        wy: w.y
                    };
                });
                ptsWorld[interaction.index] = {
                    ...ptsWorld[interaction.index],
                    hx,
                    hy
                };
                interaction.moved = true;
                applyPathPoints(n, ptsWorld);
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$renderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["requestDraw"])();
                return;
            }
    }
}
function onPointerUp(e) {
    const s = S();
    // touch bookkeeping
    if (e.pointerType === 'touch') {
        activePointers.delete(e.pointerId);
        if (pinch) {
            if (activePointers.size < 2) {
                pinch = null;
                interaction = {
                    kind: 'none'
                };
            }
            return;
        }
    }
    const world = eventWorld(e);
    switch(interaction.kind){
        case 'pencil':
            {
                finishPencil();
                return;
            }
        case 'scale':
            {
                if (interaction.moved) s.historyCommit();
                else s.historyCancel();
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].dragBadge = null;
                interaction = {
                    kind: 'none'
                };
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$renderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["requestDraw"])();
                return;
            }
        case 'pan':
            {
                interaction = {
                    kind: 'none'
                };
                setCursor(toolCursor());
                return;
            }
        case 'guideDrag':
            {
                const gd = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].guideDrag;
                const wasExisting = interaction.index >= 0;
                const inCanvasArea = gd ? eventCanvas(e).x > __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULER"] && eventCanvas(e).y > __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULER"] : false;
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].guideDrag = null;
                const idx = interaction.index;
                const axis = interaction.axis;
                interaction = {
                    kind: 'none'
                };
                if (gd && idx >= 0 && !inCanvasArea) {
                    // dragged an existing guide back into the ruler → remove
                    s.removeGuide(axis, idx);
                } else if (gd && inCanvasArea) {
                    if (wasExisting) {
                        // commit the pre-drag snapshot first so the move is one undo step
                        s.historyCommit();
                        s.moveGuide(axis, idx, gd.at);
                    } else {
                        s.addGuide(axis, gd.at);
                    }
                } else {
                    s.historyCancel();
                }
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$renderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["requestDraw"])();
                return;
            }
        case 'marquee':
            {
                const additive = interaction.additive;
                const rect = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].marquee;
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].marquee = null;
                interaction = {
                    kind: 'none'
                };
                if (rect && rect.w * s.viewport.zoom > 3 && rect.h * s.viewport.zoom > 3) {
                    const ids = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["marqueeCandidates"])(s.doc, s.currentPageId, rect);
                    if (additive) {
                        s.setSelection([
                            ...s.selection,
                            ...ids
                        ]);
                    } else {
                        s.setSelection(ids);
                    }
                } else if (!additive) {
                    s.setSelection([]);
                }
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$renderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["requestDraw"])();
                return;
            }
        case 'move':
            {
                if (interaction.moved) {
                    reparentOnDrop(interaction.startNodes);
                }
                if (interaction.ownsHistory) {
                    if (interaction.moved) s.historyCommit();
                    else s.historyCancel();
                }
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].guides = [];
                interaction = {
                    kind: 'none'
                };
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$renderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["requestDraw"])();
                return;
            }
        case 'resize':
        case 'rotate':
            {
                if (interaction.moved) s.historyCommit();
                else s.historyCancel();
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].dragBadge = null;
                interaction = {
                    kind: 'none'
                };
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$renderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["requestDraw"])();
                return;
            }
        case 'draw':
            {
                const type = interaction.type;
                const parentId = interaction.parentId;
                const a = interaction.startWorld;
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].drawPreview = null;
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].dragBadge = null;
                interaction = {
                    kind: 'none'
                };
                const b = constrainDraw(a, world, type, e.shiftKey);
                const dx = b.x - a.x;
                const dy = b.y - a.y;
                let rect = {
                    x: Math.min(a.x, b.x),
                    y: Math.min(a.y, b.y),
                    w: Math.abs(dx),
                    h: Math.abs(dy)
                };
                const flip = dx !== 0 && dy !== 0 ? dx > 0 !== dy > 0 : false;
                const tiny = type === 'line' || type === 'arrow' ? Math.hypot(rect.w, rect.h) * s.viewport.zoom < 3 : rect.w * s.viewport.zoom < 3 || rect.h * s.viewport.zoom < 3;
                if (tiny && type !== 'text') {
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$renderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["requestDraw"])();
                    return;
                }
                // grid snapping for drawn shapes
                rect = snapGridRect(rect);
                // world rect -> parent space
                const parent = parentId ? s.doc.nodesById[parentId] : null;
                let local = rect;
                if (parent) {
                    const inv = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mInvert"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nodeWorldMatrix"])(s.doc, parent));
                    local = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["transformRect"])(inv, rect);
                }
                if (type === 'text') {
                    const id = s.addNode('text', {
                        x: local.x,
                        y: local.y,
                        w: Math.max(local.w, 16),
                        h: Math.max(local.h, 18),
                        autoWidth: tiny
                    }, parentId);
                    s.setEditingText(id);
                } else {
                    const patch = {
                        x: local.x,
                        y: local.y,
                        w: Math.max(local.w, type === 'line' || type === 'arrow' ? 0 : 1),
                        h: Math.max(local.h, type === 'line' || type === 'arrow' ? 0 : 1)
                    };
                    if (type === 'line' || type === 'arrow') patch.flip = flip;
                    s.addNode(type, patch, parentId);
                    s.setTool('move');
                }
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$renderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["requestDraw"])();
                return;
            }
        case 'penHandle':
            {
                const draft = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].penDraft;
                if (draft && draft.points.length > 0) {
                    const p = draft.points[draft.points.length - 1];
                    if (Math.hypot(p.hx, p.hy) * s.viewport.zoom < 4) {
                        p.hx = 0;
                        p.hy = 0;
                    }
                    draft.dragging = false;
                }
                interaction = {
                    kind: 'none'
                };
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$renderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["requestDraw"])();
                return;
            }
        case 'pathPoint':
        case 'pathHandle':
            {
                if (interaction.moved) s.historyCommit();
                else s.historyCancel();
                interaction = {
                    kind: 'none'
                };
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$renderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["requestDraw"])();
                return;
            }
        case 'eyedrop':
            {
                interaction = {
                    kind: 'none'
                };
                return;
            }
    }
}
/* ------------------------------------------------------------------ */ /* resize math                                                         */ /* ------------------------------------------------------------------ */ function applyResize(ia, world, shift, alt) {
    const s = S();
    if (ia.singleId) {
        const n0 = ia.startNodes.find((n)=>n.id === ia.singleId);
        const q = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mApply"])(ia.singleWorldInv, world.x, world.y);
        const h = ia.handle;
        const fx = h.includes('e') ? 1 : h.includes('w') ? -1 : 0;
        const fy = h.includes('s') ? 1 : h.includes('n') ? -1 : 0;
        let newW;
        let newH;
        if (alt) {
            newW = fx === 0 ? n0.w : Math.abs(2 * (q.x - n0.w / 2));
            newH = fy === 0 ? n0.h : Math.abs(2 * (q.y - n0.h / 2));
        } else {
            newW = fx === 0 ? n0.w : fx > 0 ? q.x : n0.w - q.x;
            newH = fy === 0 ? n0.h : fy > 0 ? q.y : n0.h - q.y;
        }
        // grid snap
        if (s.doc.settings?.grid?.snap) {
            const size = s.doc.settings.grid.size;
            newW = Math.max(newW, size) === newW ? Math.round(newW / size) * size : newW;
            newH = Math.max(newH, size) === newH ? Math.round(newH / size) * size : newH;
        }
        // clamp
        const minW = n0.type === 'line' || n0.type === 'arrow' ? 0 : 1;
        const minH = n0.type === 'line' || n0.type === 'arrow' ? 0 : 1;
        if (newW < minW) newW = minW;
        if (newH < minH) newH = minH;
        // aspect lock (corners)
        if (shift && fx !== 0 && fy !== 0 && n0.w > 0 && n0.h > 0) {
            const ratio = n0.h / n0.w;
            if (newW * ratio > newH) newH = newW * ratio;
            else newW = newH / ratio;
        }
        // anchor in local coords (opposite handle / center)
        const anchorLocal = alt ? {
            x: n0.w / 2,
            y: n0.h / 2
        } : {
            x: fx > 0 ? 0 : fx < 0 ? n0.w : n0.w / 2,
            y: fy > 0 ? 0 : fy < 0 ? n0.h : n0.h / 2
        };
        const L0 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nodeLocalMatrix"])(n0);
        const A = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mApply"])(L0, anchorLocal.x, anchorLocal.y); // parent coords (fixed)
        // new anchor local (same relative position in the new box)
        const anchorNew = alt ? {
            x: newW / 2,
            y: newH / 2
        } : {
            x: fx > 0 ? 0 : fx < 0 ? newW : newW / 2,
            y: fy > 0 ? 0 : fy < 0 ? newH : newH / 2
        };
        const theta = n0.rotation;
        const cx = anchorNew.x - newW / 2;
        const cy = anchorNew.y - newH / 2;
        const r = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mRotate"])(theta);
        const rotVec = {
            x: r.a * cx + r.c * cy + newW / 2,
            y: r.b * cx + r.d * cy + newH / 2
        };
        const newX = A.x - rotVec.x;
        const newY = A.y - rotVec.y;
        s.setNodeRect(ia.singleId, {
            x: newX,
            y: newY,
            w: newW,
            h: newH
        }, {
            history: false
        });
        // badge
        const n1 = s.doc.nodesById[ia.singleId];
        if (n1) __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].dragBadge = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nodeWorldAABB"])(s.doc, n1);
        return;
    }
    // multi resize (world AABB)
    const box = ia.startBox;
    const h = ia.handle;
    const q = world;
    const fx = h.includes('e') ? 1 : h.includes('w') ? -1 : 0;
    const fy = h.includes('s') ? 1 : h.includes('n') ? -1 : 0;
    let newW;
    let newH;
    if (alt) {
        newW = fx === 0 ? box.w : Math.abs(2 * (q.x - (box.x + box.w / 2)));
        newH = fy === 0 ? box.h : Math.abs(2 * (q.y - (box.y + box.h / 2)));
    } else {
        newW = fx === 0 ? box.w : fx > 0 ? q.x - box.x : box.x + box.w - q.x;
        newH = fy === 0 ? box.h : fy > 0 ? q.y - box.y : box.y + box.h - q.y;
    }
    if (newW < 1) newW = 1;
    if (newH < 1) newH = 1;
    if (shift && fx !== 0 && fy !== 0 && box.w > 0 && box.h > 0) {
        const ratio = box.h / box.w;
        if (newW * ratio > newH) newH = newW * ratio;
        else newW = newH / ratio;
    }
    const sx = newW / box.w;
    const sy = newH / box.h;
    const originX = alt ? box.x + box.w / 2 - newW / 2 : fx > 0 ? box.x : fx < 0 ? box.x + box.w - newW : box.x + (box.w - newW) / 2;
    const originY = alt ? box.y + box.h / 2 - newH / 2 : fy > 0 ? box.y : fy < 0 ? box.y + box.h - newH : box.y + (box.h - newH) / 2;
    const updates = [];
    const rectUpdates = [];
    for (const n0 of ia.startNodes){
        const a = ia.startAABBs.get(n0.id);
        const nx = originX + (a.x - box.x) * sx;
        const ny = originY + (a.y - box.y) * sy;
        const Pinv = ia.parentInvs.get(n0.id);
        const local = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mApply"])(Pinv, nx, ny);
        const w = Math.max(1, n0.w * sx);
        const hh = Math.max(1, n0.h * sy);
        if (n0.type === 'frame' || n0.type === 'group') {
            // setNodeRect also scales children
            rectUpdates.push({
                id: n0.id,
                rect: {
                    x: local.x,
                    y: local.y,
                    w,
                    h: hh
                }
            });
            continue;
        }
        const patch = {
            x: local.x,
            y: local.y,
            w,
            h: hh
        };
        if (n0.type === 'text') patch.fontSize = Math.max(1, n0.fontSize * ((sx + sy) / 2));
        if (n0.cornerRadius) patch.cornerRadius = Math.max(0, n0.cornerRadius * ((sx + sy) / 2));
        if (n0.type === 'path' && n0.points.length) {
            patch.points = n0.points.map((p)=>({
                    x: p.x * sx,
                    y: p.y * sy,
                    hx: p.hx * sx,
                    hy: p.hy * sy
                }));
        }
        updates.push({
            id: n0.id,
            patch
        });
    }
    if (updates.length) {
        s.updateNodes(updates.map((u)=>u.id), (node)=>{
            const u = updates.find((x)=>x.id === node.id);
            return u.patch;
        }, {
            history: false
        });
    }
    for (const r of rectUpdates){
        s.setNodeRect(r.id, r.rect, {
            history: false
        });
    }
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].dragBadge = {
        x: originX,
        y: originY,
        w: newW,
        h: newH
    };
}
/** Snap candidates: siblings of the dragged nodes + their parent frame edges. */ function snapCandidates(ids) {
    const s = S();
    const doc = s.doc;
    const parents = new Set(ids.map((id)=>doc.nodesById[id]?.parentId ?? null));
    const out = [];
    const page = doc.pagesById[s.currentPageId];
    if (!page) return out;
    const inSelection = (id)=>{
        for (const sid of ids){
            if (sid === id) return true;
            let p = doc.nodesById[id]?.parentId ?? null;
            while(p){
                if (p === sid) return true;
                p = doc.nodesById[p]?.parentId ?? null;
            }
        }
        return false;
    };
    const pushSiblings = (parentId)=>{
        const list = parentId === null ? page.nodeIds.map((id)=>doc.nodesById[id]) : (doc.nodesById[parentId]?.children ?? []).map((id)=>doc.nodesById[id]);
        for (const n of list){
            if (!n || !n.visible || inSelection(n.id)) continue;
            out.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nodeWorldAABB"])(doc, n));
        }
    };
    if (parents.size === 1) {
        const parentId = [
            ...parents
        ][0];
        pushSiblings(parentId);
        const p = parentId ? doc.nodesById[parentId] : null;
        if (p && p.type === 'frame') out.push((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nodeWorldAABB"])(doc, p));
    } else {
        pushSiblings(null);
    }
    return out;
}
/** Apply world-space points to a path node (normalizing bounds + origin). */ function applyPathPoints(n, ptsWorld) {
    const s = S();
    const minX = Math.min(...ptsWorld.map((p)=>p.wx));
    const minY = Math.min(...ptsWorld.map((p)=>p.wy));
    const maxX = Math.max(...ptsWorld.map((p)=>p.wx));
    const maxY = Math.max(...ptsWorld.map((p)=>p.wy));
    const Pinv = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mInvert"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parentWorldMatrix"])(s.doc, n));
    const origin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mApply"])(Pinv, minX, minY);
    const points = ptsWorld.map((p)=>({
            x: p.wx - minX,
            y: p.wy - minY,
            hx: p.hx,
            hy: p.hy
        }));
    s.updateNodes([
        n.id
    ], {
        x: origin.x,
        y: origin.y,
        w: Math.max(maxX - minX, 1),
        h: Math.max(maxY - minY, 1),
        points
    }, {
        history: false
    });
}
/* ------------------------------------------------------------------ */ /* double click / wheel / context menu                                 */ /* ------------------------------------------------------------------ */ function onDoubleClick(e) {
    const s = S();
    if (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].penDraft) {
        // double click ends the pen path (drop a duplicated last point if coincident)
        const pts = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].penDraft.points;
        if (pts.length >= 2) {
            const last = pts[pts.length - 1];
            const prev = pts[pts.length - 2];
            if (Math.hypot(last.x - prev.x, last.y - prev.y) * s.viewport.zoom < 4) pts.pop();
        }
        finishPen(false);
        return;
    }
    if (s.editingTextId) return;
    const world = eventWorld(e);
    const hit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hitTestDeep"])(s.doc, s.currentPageId, world, 6 / s.viewport.zoom);
    if (!hit) return;
    if (hit.type === 'text') {
        s.setEditingText(hit.id);
        return;
    }
    if (hit.type === 'path') {
        s.setEditingPath(hit.id);
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].pathEdit = {
            activePoint: null,
            dragKind: null,
            hoverPoint: null
        };
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$renderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["requestDraw"])();
        return;
    }
    if (hit.type === 'image' && hit.src) {
        // double-click image: replace its source
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$files$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pickImageFiles"])(eventWorld(e));
        return;
    }
    // deep select into groups/frames
    s.setSelection([
        hit.id
    ]);
}
function onWheel(e) {
    e.preventDefault();
    const s = S();
    if (e.ctrlKey || e.metaKey) {
        const content = eventContent(e);
        s.zoomAt(Math.exp(-e.deltaY * 0.0015), content.x, content.y);
        return;
    }
    const mult = e.deltaMode === 1 ? 16 : 1;
    let dx = e.deltaX * mult;
    let dy = e.deltaY * mult;
    if (e.altKey) {
        // alt+wheel: horizontal pan
        dx = dy;
        dy = 0;
    }
    if (e.shiftKey && dx === 0) {
        dx = dy;
        dy = 0;
    }
    s.panBy(-dx, -dy);
}
function onContextMenu(e) {
    e.preventDefault();
    const s = S();
    if (s.editingTextId) s.setEditingText(null);
    const world = eventWorld(e);
    const hit = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["hitTestDeep"])(s.doc, s.currentPageId, world, 6 / s.viewport.zoom);
    if (hit) {
        const resolved = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["resolveClick"])(s.doc, hit, e.ctrlKey || e.metaKey);
        if (!s.selection.includes(resolved)) s.setSelection([
            resolved
        ]);
    }
    s.openContextMenu(e.clientX, e.clientY, world.x, world.y);
}
/* ------------------------------------------------------------------ */ /* keyboard                                                            */ /* ------------------------------------------------------------------ */ function isTypingTarget(t) {
    const el = t;
    if (!el || !el.tagName) return false;
    const tag = el.tagName.toLowerCase();
    return tag === 'input' || tag === 'textarea' || tag === 'select' || el.isContentEditable;
}
function onKeyDown(e) {
    const s = S();
    if (isTypingTarget(e.target)) {
        if (e.key === 'Escape') e.target.blur();
        return;
    }
    if (s.exportOpen || s.shortcutsOpen || s.presenting) return;
    const mod = e.ctrlKey || e.metaKey;
    if (e.key === ' ') {
        if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].spaceDown) {
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].spaceDown = true;
            setCursor('grab');
        }
        if (e.target === document.body) e.preventDefault();
        return;
    }
    if (mod) {
        switch(e.key.toLowerCase()){
            case 'z':
                e.preventDefault();
                if (e.shiftKey) s.redo();
                else s.undo();
                return;
            case 'y':
                e.preventDefault();
                s.redo();
                return;
            case 'c':
                e.preventDefault();
                if (e.altKey) s.copyStyle();
                else s.copySelection();
                return;
            case 'x':
                e.preventDefault();
                s.cutSelection();
                return;
            case 'v':
                e.preventDefault();
                if (e.altKey) s.pasteStyle();
                else s.paste(null);
                return;
            case 'd':
                e.preventDefault();
                if (s.selection.length) s.duplicateSelection();
                return;
            case 'a':
                e.preventDefault();
                if (e.shiftKey) s.selectSameType();
                else s.selectAll();
                return;
            case 'g':
                e.preventDefault();
                if (e.shiftKey) s.ungroupSelection();
                else s.groupSelection();
                return;
            case 's':
                e.preventDefault();
                void (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$files$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveIrisFile"])({
                    as: e.shiftKey
                });
                return;
            case 'e':
                if (e.shiftKey) {
                    e.preventDefault();
                    s.setExportOpen(true);
                }
                return;
            case 'o':
                e.preventDefault();
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$files$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["openIrisFile"])();
                return;
            case 'k':
                if (e.shiftKey) {
                    e.preventDefault();
                    switchTool('image');
                }
                return;
            case 'enter':
                e.preventDefault();
                s.setPresenting(true);
                return;
            case 'l':
                e.preventDefault();
                if (e.shiftKey) s.unlockAllOnPage();
                else if (s.selection.length) s.toggleLockSelection();
                return;
            case 'h':
                if (e.shiftKey) {
                    e.preventDefault();
                    if (s.selection.length) s.toggleHideSelection();
                }
                return;
            case '0':
                e.preventDefault();
                s.zoomReset();
                return;
            case '=':
            case '+':
                e.preventDefault();
                s.zoomAt(1.2);
                return;
            case '-':
                e.preventDefault();
                s.zoomAt(1 / 1.2);
                return;
            case ']':
                e.preventDefault();
                s.zorder(e.shiftKey ? 'back' : 'forward');
                return;
            case '[':
                e.preventDefault();
                s.zorder(e.shiftKey ? 'front' : 'backward');
                return;
        }
        return;
    }
    if (e.shiftKey && (e.code === 'Digit1' || e.code === 'Digit2')) {
        e.preventDefault();
        if (e.code === 'Digit1') s.zoomToFit();
        else s.zoomToSelection();
        return;
    }
    // Shift+H / Shift+V → flip (before tool switching)
    if (e.shiftKey && (e.key === 'H' || e.key === 'V')) {
        if (s.selection.length) {
            s.flipSelection(e.key === 'H' ? 'h' : 'v');
            return;
        }
    }
    // Shift+R → toggle rulers
    if (e.shiftKey && (e.key === 'R' || e.key === 'r')) {
        s.setViewFlag('rulers', !s.viewFlags.rulers);
        return;
    }
    switch(e.key.toLowerCase()){
        case 'v':
            switchTool('move');
            return;
        case 'k':
            switchTool('scale');
            return;
        case 'f':
            switchTool('frame');
            return;
        case 'r':
            switchTool('rect');
            return;
        case 'o':
            switchTool('ellipse');
            return;
        case 'l':
            switchTool(e.shiftKey ? 'arrow' : 'line');
            return;
        case 't':
            switchTool('text');
            return;
        case 'p':
            switchTool(e.shiftKey ? 'pencil' : 'pen');
            return;
        case 'h':
            if (e.shiftKey) break; // handled above (flip)
            switchTool('hand');
            return;
        case 'y':
            switchTool('polygon');
            return;
        case 's':
            switchTool(e.shiftKey ? 'section' : 'slice');
            return;
        case 'c':
            switchTool('comment');
            return;
        case 'i':
            switchTool('eyedropper');
            return;
        case 'm':
            switchTool('image');
            return;
        case 'escape':
            {
                if (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].penDraft) {
                    finishPen(false);
                    return;
                }
                if (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].pencilDraft) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].pencilDraft = null;
                    if (interaction.kind === 'pencil') interaction = {
                        kind: 'none'
                    };
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$renderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["requestDraw"])();
                    return;
                }
                if (s.presenting) {
                    s.setPresenting(false);
                    return;
                }
                if (s.editingPathId) {
                    s.setEditingPath(null);
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].pathEdit = null;
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$renderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["requestDraw"])();
                    return;
                }
                if (interaction.kind === 'marquee') {
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].marquee = null;
                    interaction = {
                        kind: 'none'
                    };
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$renderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["requestDraw"])();
                    return;
                }
                if (s.activeCommentId) {
                    s.setActiveComment(null);
                    return;
                }
                if (s.selection.length) {
                    s.setSelection([]);
                    return;
                }
                if (s.tool !== 'move') s.setTool('move');
                return;
            }
        case 'enter':
            {
                if (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].penDraft) {
                    finishPen(false);
                    return;
                }
                if (s.editingPathId) {
                    s.setEditingPath(null);
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].pathEdit = null;
                    (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$renderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["requestDraw"])();
                    return;
                }
                if (s.selection.length === 1) {
                    const n = s.doc.nodesById[s.selection[0]];
                    if (!n) return;
                    if (n.type === 'text') {
                        s.setEditingText(n.id);
                        return;
                    }
                    if (n.type === 'path') {
                        s.setEditingPath(n.id);
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].pathEdit = {
                            activePoint: null,
                            dragKind: null,
                            hoverPoint: null
                        };
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$renderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["requestDraw"])();
                        return;
                    }
                    if (n.children.length > 0) {
                        s.setSelection([
                            n.children[0]
                        ]);
                        return;
                    }
                }
                return;
            }
        case 'delete':
        case 'backspace':
            e.preventDefault();
            s.deleteSelection();
            return;
        case 'arrowleft':
        case 'arrowright':
        case 'arrowup':
        case 'arrowdown':
            {
                e.preventDefault();
                if (!s.selection.length) return;
                const step = e.shiftKey ? 10 : 1;
                const dx = e.key === 'ArrowLeft' ? -step : e.key === 'ArrowRight' ? step : 0;
                const dy = e.key === 'ArrowUp' ? -step : e.key === 'ArrowDown' ? step : 0;
                s.moveSelectionWorld(dx, dy, 'nudge');
                return;
            }
        case '1':
            if (e.shiftKey) {
                e.preventDefault();
                s.zoomToFit();
            }
            return;
        case '2':
            if (e.shiftKey) {
                e.preventDefault();
                s.zoomToSelection();
            }
            return;
    }
}
function onKeyUp(e) {
    if (e.key === ' ') {
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].spaceDown = false;
        setCursor(toolCursor());
    }
}
/* ------------------------------------------------------------------ */ /* paste / drag-drop                                                   */ /* ------------------------------------------------------------------ */ function onPaste(e) {
    if (isTypingTarget(e.target)) return;
    const files = Array.from(e.clipboardData?.files ?? []);
    const images = files.filter((f)=>f.type.startsWith('image/'));
    if (images.length > 0) {
        e.preventDefault();
        void (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$files$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["importImageFiles"])(images);
    }
}
function onDragOver(e) {
    e.preventDefault();
    if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
}
function onDrop(e) {
    e.preventDefault();
    const files = Array.from(e.dataTransfer?.files ?? []);
    if (files.length === 0) return;
    const iris = files.find((f)=>/\.iris$/i.test(f.name));
    if (iris) {
        void (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$files$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["openIrisBlob"])(iris);
        return;
    }
    const images = files.filter((f)=>f.type.startsWith('image/'));
    if (images.length > 0) {
        const world = eventWorld(e);
        void (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$files$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["importImageFiles"])(images, world);
    }
}
function initTools(c) {
    canvas = c;
    interaction = {
        kind: 'none'
    };
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].spaceDown = false;
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].penDraft = null;
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].pathEdit = null;
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$overlay$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["overlay"].guideDrag = null;
    activePointers.clear();
    pinch = null;
    const down = (e)=>onPointerDown(e);
    const move = (e)=>onPointerMove(e);
    const up = (e)=>onPointerUp(e);
    const dbl = (e)=>onDoubleClick(e);
    const wheel = (e)=>onWheel(e);
    const ctxMenu = (e)=>onContextMenu(e);
    const keyDown = (e)=>onKeyDown(e);
    const keyUp = (e)=>onKeyUp(e);
    const paste = (e)=>onPaste(e);
    const dragOver = (e)=>onDragOver(e);
    const drop = (e)=>onDrop(e);
    c.addEventListener('pointerdown', down);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
    c.addEventListener('dblclick', dbl);
    c.addEventListener('wheel', wheel, {
        passive: false
    });
    c.addEventListener('contextmenu', ctxMenu);
    window.addEventListener('keydown', keyDown);
    window.addEventListener('keyup', keyUp);
    window.addEventListener('paste', paste);
    c.addEventListener('dragover', dragOver);
    c.addEventListener('drop', drop);
    setCursor(toolCursor());
    return ()=>{
        c.removeEventListener('pointerdown', down);
        window.removeEventListener('pointermove', move);
        window.removeEventListener('pointerup', up);
        window.removeEventListener('pointercancel', up);
        c.removeEventListener('dblclick', dbl);
        c.removeEventListener('wheel', wheel);
        c.removeEventListener('contextmenu', ctxMenu);
        window.removeEventListener('keydown', keyDown);
        window.removeEventListener('keyup', keyUp);
        window.removeEventListener('paste', paste);
        c.removeEventListener('dragover', dragOver);
        c.removeEventListener('drop', drop);
        canvas = null;
    };
}
var _c;
__turbopack_context__.k.register(_c, "S");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_iris_engine_f2261c0a._.js.map