(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/iris/ui/HomeBrowser.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HomeBrowser",
    ()=>HomeBrowser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/**
 * Iris homepage — the file browser. Every document in the local library is
 * displayed as a card with a live thumbnail; supports search, sort, grid /
 * list views, rename / duplicate / delete, and instant switching between
 * documents (each open document lives at /?doc=<id>).
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-client] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$files$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Files$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/files.js [app-client] (ecmascript) <export default as Files>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layout-grid.js [app-client] (ecmascript) <export default as LayoutGrid>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/list.js [app-client] (ecmascript) <export default as List>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreHorizontal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/ellipsis.js [app-client] (ecmascript) <export default as MoreHorizontal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/upload.js [app-client] (ecmascript) <export default as Upload>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$context$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/context-menu.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dropdown-menu.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/alert-dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/select.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/engine/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$files$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/engine/files.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$templates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/engine/templates.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$auth$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/auth/session.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$library$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/engine/library.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
/* ------------------------------------------------------------------ */ /* helpers + shared styles                                             */ /* ------------------------------------------------------------------ */ const MENU_CLS = 'border-[#4E4E4E] bg-[#2C2C2C] text-white';
const ITEM_CLS = 'text-[12px] text-[#E5E5E5] focus:bg-[#474747] focus:text-white';
const DANGER_CLS = 'text-[12px] text-[#FF8A8A] focus:bg-[#474747] focus:text-[#FFA3A3]';
/** Compact relative time, e.g. "2h ago". */ function timeAgo(ts) {
    const s = Math.max(0, Math.floor((Date.now() - ts) / 1000));
    if (s < 45) return 'just now';
    const m = Math.floor(s / 60);
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    const d = Math.floor(h / 24);
    if (d < 7) return `${d}d ago`;
    if (d < 35) return `${Math.floor(d / 7)}w ago`;
    return new Date(ts).toLocaleDateString();
}
function formatBytes(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
/** Iris flower mark (three petals + white core). */ function IrisMark({ size = 20, className = '' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: size,
        height: size,
        viewBox: "0 0 16 16",
        "aria-hidden": "true",
        focusable: "false",
        className: className,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                fill: "#8B5CF6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                        cx: "8",
                        cy: "4.6",
                        rx: "2.7",
                        ry: "4.5"
                    }, void 0, false, {
                        fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                        cx: "8",
                        cy: "4.6",
                        rx: "2.7",
                        ry: "4.5",
                        transform: "rotate(120 8 8)"
                    }, void 0, false, {
                        fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                        lineNumber: 114,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                        cx: "8",
                        cy: "4.6",
                        rx: "2.7",
                        ry: "4.5",
                        transform: "rotate(240 8 8)"
                    }, void 0, false, {
                        fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                        lineNumber: 115,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "8",
                cy: "8",
                r: "1.5",
                fill: "#FFFFFF"
            }, void 0, false, {
                fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                lineNumber: 117,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
        lineNumber: 111,
        columnNumber: 5
    }, this);
}
_c = IrisMark;
function DocMenuItems({ entry, actions, kind }) {
    const Item = kind === 'dropdown' ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"] : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$context$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ContextMenuItem"];
    const Sep = kind === 'dropdown' ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"] : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$context$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ContextMenuSeparator"];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Item, {
                className: ITEM_CLS,
                onSelect: ()=>actions.onOpen(),
                children: "Open"
            }, void 0, false, {
                fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                lineNumber: 138,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Item, {
                className: ITEM_CLS,
                onSelect: ()=>actions.onRename(),
                children: "Rename…"
            }, void 0, false, {
                fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                lineNumber: 141,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Item, {
                className: ITEM_CLS,
                onSelect: ()=>actions.onDuplicate(),
                children: "Duplicate"
            }, void 0, false, {
                fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                lineNumber: 144,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Sep, {
                className: "bg-[#3E3E3E]"
            }, void 0, false, {
                fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                lineNumber: 147,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Item, {
                className: DANGER_CLS,
                onSelect: ()=>actions.onDelete(),
                children: "Delete…"
            }, void 0, false, {
                fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                lineNumber: 148,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "sr-only",
                children: [
                    "Actions for ",
                    entry.name
                ]
            }, void 0, true, {
                fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                lineNumber: 151,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_c1 = DocMenuItems;
function CardMenu({ entry, actions }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenu"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuTrigger"], {
                asChild: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    "aria-label": `More options for ${entry.name}`,
                    onClick: (e)=>e.stopPropagation(),
                    className: "flex size-6 items-center justify-center rounded-md bg-black/55 text-[#C9C9C9] backdrop-blur-sm transition-colors hover:bg-[#383838] hover:text-white",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreHorizontal$3e$__["MoreHorizontal"], {
                        className: "size-3.5"
                    }, void 0, false, {
                        fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                        lineNumber: 166,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                    lineNumber: 160,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                lineNumber: 159,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuContent"], {
                align: "end",
                className: MENU_CLS,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DocMenuItems, {
                    entry: entry,
                    actions: actions,
                    kind: "dropdown"
                }, void 0, false, {
                    fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                    lineNumber: 170,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                lineNumber: 169,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
        lineNumber: 158,
        columnNumber: 5
    }, this);
}
_c2 = CardMenu;
/** Thumbnail image or the empty-document placeholder. */ function Thumb({ entry, tiny = false }) {
    if (entry.thumb) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
            src: entry.thumb,
            alt: `Preview of ${entry.name}`,
            draggable: false,
            className: "h-full w-full object-cover"
        }, void 0, false, {
            fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
            lineNumber: 179,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-full w-full items-center justify-center",
        "aria-hidden": "true",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IrisMark, {
            size: tiny ? 18 : 40,
            className: "opacity-25"
        }, void 0, false, {
            fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
            lineNumber: 183,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
        lineNumber: 182,
        columnNumber: 5
    }, this);
}
_c3 = Thumb;
/* ------------------------------------------------------------------ */ /* account chip (preview session — sign out returns to the website)    */ /* ------------------------------------------------------------------ */ function AccountChip() {
    const session = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$auth$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSession"])();
    if (!session) return null;
    const initials = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$auth$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initialsFor"])(session.name);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenu"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuTrigger"], {
                asChild: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    "aria-label": `Account: ${session.name}`,
                    className: "flex size-8 items-center justify-center rounded-full bg-[#8B5CF6] text-[11px] font-semibold text-white ring-offset-2 ring-offset-[#1E1E1E] transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]",
                    children: initials
                }, void 0, false, {
                    fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                    lineNumber: 199,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                lineNumber: 198,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuContent"], {
                align: "end",
                className: MENU_CLS,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-2.5 py-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "max-w-[200px] truncate text-[12px] font-medium text-white",
                                children: session.name
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                lineNumber: 209,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "max-w-[200px] truncate text-[11px] text-[#9A9A9A]",
                                children: session.email
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                lineNumber: 210,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1.5 inline-flex items-center gap-1 rounded-full bg-[#383838] px-1.5 py-0.5 text-[9.5px] uppercase tracking-wide text-[#C9A7FF]",
                                children: "Preview account"
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                lineNumber: 211,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                        lineNumber: 208,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {
                        className: "bg-[#3E3E3E]"
                    }, void 0, false, {
                        fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                        lineNumber: 215,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                        className: DANGER_CLS,
                        onSelect: ()=>{
                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$auth$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["signOut"])();
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"].getState().toast('Signed out — see you soon');
                        },
                        children: "Sign out & back to website"
                    }, void 0, false, {
                        fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                        lineNumber: 216,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                lineNumber: 207,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
        lineNumber: 197,
        columnNumber: 5
    }, this);
}
_c4 = AccountChip;
function HomeBrowser() {
    _s();
    const toast = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"])({
        "HomeBrowser.useIris[toast]": (s)=>s.toast
    }["HomeBrowser.useIris[toast]"]);
    const [entries, setEntries] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "HomeBrowser.useState": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$library$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["listDocs"])()
    }["HomeBrowser.useState"]);
    const [stats, setStats] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "HomeBrowser.useState": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$library$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["libraryStats"])()
    }["HomeBrowser.useState"]);
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [nav, setNav] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('recent');
    const [sort, setSort] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('created');
    const [view, setView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('grid');
    const [renameTarget, setRenameTarget] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [renameDraft, setRenameDraft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [deleteTarget, setDeleteTarget] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const searchRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    /** Re-read the library index (+ stats); late refresh catches async thumbs. */ const refresh = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "HomeBrowser.useCallback[refresh]": (late = false)=>{
            if (late) {
                setTimeout({
                    "HomeBrowser.useCallback[refresh]": ()=>{
                        setEntries((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$library$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["listDocs"])());
                        setStats((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$library$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["libraryStats"])());
                    }
                }["HomeBrowser.useCallback[refresh]"], 700);
                return;
            }
            setEntries((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$library$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["listDocs"])());
            setStats((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$library$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["libraryStats"])());
        }
    }["HomeBrowser.useCallback[refresh]"], []);
    const openRename = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "HomeBrowser.useCallback[openRename]": (entry)=>{
            setRenameDraft(entry.name);
            setRenameTarget(entry);
        }
    }["HomeBrowser.useCallback[openRename]"], []);
    /* "/" focuses search from anywhere on the homepage */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "HomeBrowser.useEffect": ()=>{
            const onKey = {
                "HomeBrowser.useEffect.onKey": (e)=>{
                    const el = document.activeElement;
                    const typing = el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement;
                    if (e.key === '/' && !typing) {
                        e.preventDefault();
                        searchRef.current?.focus();
                    }
                }
            }["HomeBrowser.useEffect.onKey"];
            window.addEventListener('keydown', onKey);
            return ({
                "HomeBrowser.useEffect": ()=>window.removeEventListener('keydown', onKey)
            })["HomeBrowser.useEffect"];
        }
    }["HomeBrowser.useEffect"], []);
    const visible = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "HomeBrowser.useMemo[visible]": ()=>{
            const q = query.trim().toLowerCase();
            const list = entries.filter({
                "HomeBrowser.useMemo[visible].list": (e)=>e.name.toLowerCase().includes(q)
            }["HomeBrowser.useMemo[visible].list"]);
            if (nav === 'recent' || nav === 'all' && sort === 'updated') {
                return [
                    ...list
                ].sort({
                    "HomeBrowser.useMemo[visible]": (a, b)=>b.updatedAt - a.updatedAt
                }["HomeBrowser.useMemo[visible]"]);
            }
            if (sort === 'created') return [
                ...list
            ].sort({
                "HomeBrowser.useMemo[visible]": (a, b)=>b.createdAt - a.createdAt
            }["HomeBrowser.useMemo[visible]"]);
            return [
                ...list
            ].sort({
                "HomeBrowser.useMemo[visible]": (a, b)=>a.name.localeCompare(b.name)
            }["HomeBrowser.useMemo[visible]"]);
        }
    }["HomeBrowser.useMemo[visible]"], [
        entries,
        query,
        nav,
        sort
    ]);
    /* ---------------------------- actions ---------------------------- */ const open = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "HomeBrowser.useCallback[open]": (id)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"].getState().openDoc(id);
        }
    }["HomeBrowser.useCallback[open]"], []);
    const createNew = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "HomeBrowser.useCallback[createNew]": ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"].getState().newDoc();
        }
    }["HomeBrowser.useCallback[createNew]"], []);
    const createFromTemplate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "HomeBrowser.useCallback[createFromTemplate]": (templateId)=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"].getState().newDocFromTemplate(templateId);
        }
    }["HomeBrowser.useCallback[createFromTemplate]"], []);
    const importFile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "HomeBrowser.useCallback[importFile]": ()=>{
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$files$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["openIrisFile"])();
        }
    }["HomeBrowser.useCallback[importFile]"], []);
    const menuActions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "HomeBrowser.useCallback[menuActions]": (entry)=>({
                onOpen: ({
                    "HomeBrowser.useCallback[menuActions]": ()=>open(entry.id)
                })["HomeBrowser.useCallback[menuActions]"],
                onRename: ({
                    "HomeBrowser.useCallback[menuActions]": ()=>openRename(entry)
                })["HomeBrowser.useCallback[menuActions]"],
                onDuplicate: ({
                    "HomeBrowser.useCallback[menuActions]": ()=>{
                        const dup = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$library$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["duplicateDocInLibrary"])(entry.id);
                        if (dup) toast(`Duplicated “${entry.name}”`);
                        refresh();
                        refresh(true);
                    }
                })["HomeBrowser.useCallback[menuActions]"],
                onDelete: ({
                    "HomeBrowser.useCallback[menuActions]": ()=>setDeleteTarget(entry)
                })["HomeBrowser.useCallback[menuActions]"]
            })
    }["HomeBrowser.useCallback[menuActions]"], [
        open,
        openRename,
        refresh,
        toast
    ]);
    const confirmRename = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "HomeBrowser.useCallback[confirmRename]": ()=>{
            if (!renameTarget) return;
            const name = renameDraft.trim();
            if (name && name !== renameTarget.name) {
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$library$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["renameDocInLibrary"])(renameTarget.id, name);
                toast(`Renamed to “${name}”`);
            }
            setRenameTarget(null);
            refresh();
        }
    }["HomeBrowser.useCallback[confirmRename]"], [
        renameTarget,
        renameDraft,
        refresh,
        toast
    ]);
    const confirmDelete = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "HomeBrowser.useCallback[confirmDelete]": ()=>{
            if (!deleteTarget) return;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$library$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["deleteDocInLibrary"])(deleteTarget.id);
            /* safety: never leave the editor backed by a deleted doc */ if (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"].getState().docId === deleteTarget.id) {
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"].setState({
                    docId: null
                });
            }
            toast(`Deleted “${deleteTarget.name}”`);
            setDeleteTarget(null);
            refresh();
        }
    }["HomeBrowser.useCallback[confirmDelete]"], [
        deleteTarget,
        refresh,
        toast
    ]);
    /* ---------------------------- render ----------------------------- */ const sectionTitle = nav === 'recent' ? 'Recent files' : 'All files';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-full min-h-0 flex-1 flex-col bg-[#1E1E1E] font-sans text-white antialiased",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "flex h-14 shrink-0 select-none items-center gap-2 border-b border-[#3E3E3E] px-3 sm:gap-3 sm:px-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex shrink-0 items-center gap-2",
                        "aria-label": "Iris",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IrisMark, {
                                size: 22
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                lineNumber: 355,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[15px] font-semibold tracking-tight",
                                children: "Iris"
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                lineNumber: 356,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                        lineNumber: 354,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mx-1 hidden h-5 w-px bg-[#3E3E3E] md:block",
                        "aria-hidden": "true"
                    }, void 0, false, {
                        fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                        lineNumber: 359,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative ml-auto w-32 min-w-0 flex-1 sm:ml-1 sm:max-w-[300px]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                className: "pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-[#8B8B8B]",
                                "aria-hidden": "true"
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                lineNumber: 363,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                ref: searchRef,
                                type: "text",
                                value: query,
                                onChange: (e)=>setQuery(e.target.value),
                                onKeyDown: (e)=>{
                                    if (e.key === 'Escape') {
                                        setQuery('');
                                        e.currentTarget.blur();
                                    } else if (e.key === 'Enter' && visible.length > 0) {
                                        open(visible[0].id);
                                    }
                                },
                                placeholder: "Search files",
                                "aria-label": "Search files",
                                spellCheck: false,
                                className: "h-8 w-full rounded-md border border-transparent bg-[#2C2C2C] pl-8 pr-8 text-[12px] text-white caret-[#8B5CF6] transition-colors placeholder:text-[#7A7A7A] focus:border-[#4E4E4E] focus:outline-none"
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                lineNumber: 364,
                                columnNumber: 11
                            }, this),
                            query ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                "aria-label": "Clear search",
                                onClick: ()=>{
                                    setQuery('');
                                    searchRef.current?.focus();
                                },
                                className: "absolute right-1.5 top-1/2 flex size-5 -translate-y-1/2 items-center justify-center rounded text-[#8B8B8B] hover:bg-[#383838] hover:text-white",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: "size-3"
                                }, void 0, false, {
                                    fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                    lineNumber: 392,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                lineNumber: 383,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
                                className: "pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 rounded border border-[#4E4E4E] px-1 text-[10px] leading-4 text-[#8B8B8B] sm:block",
                                children: "/"
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                lineNumber: 395,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                        lineNumber: 362,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ml-auto flex shrink-0 items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AccountChip, {}, void 0, false, {
                                fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                lineNumber: 402,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: importFile,
                                className: "hidden h-8 items-center gap-1.5 rounded-md border border-[#4E4E4E] px-2.5 text-[12px] text-[#E5E5E5] transition-colors hover:bg-[#2C2C2C] sm:inline-flex",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                        className: "size-3.5",
                                        "aria-hidden": "true"
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                        lineNumber: 408,
                                        columnNumber: 13
                                    }, this),
                                    "Import"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                lineNumber: 403,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: createNew,
                                className: "inline-flex h-8 items-center gap-1.5 rounded-md bg-[#8B5CF6] px-2.5 text-[12px] font-medium text-white transition-colors hover:bg-[#7C4DF3] sm:px-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                        className: "size-3.5",
                                        "aria-hidden": "true"
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                        lineNumber: 416,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "hidden sm:inline",
                                        children: "New design file"
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                        lineNumber: 417,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "sm:hidden",
                                        children: "New"
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                        lineNumber: 418,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                lineNumber: 411,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                        lineNumber: 401,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                lineNumber: 353,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex min-h-0 flex-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                        className: "hidden w-52 shrink-0 select-none flex-col border-r border-[#3E3E3E] p-3 md:flex",
                        "aria-label": "Browse files",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "px-2 pb-2 pt-1 text-[10px] font-medium uppercase tracking-wider text-[#7A7A7A]",
                                children: "Browse"
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                lineNumber: 426,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                className: "flex flex-col gap-0.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SidebarItem, {
                                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                            className: "size-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                            lineNumber: 430,
                                            columnNumber: 32
                                        }, void 0),
                                        label: "Recent files",
                                        active: nav === 'recent',
                                        onClick: ()=>setNav('recent')
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                        lineNumber: 430,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SidebarItem, {
                                        icon: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$files$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Files$3e$__["Files"], {
                                            className: "size-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                            lineNumber: 431,
                                            columnNumber: 32
                                        }, void 0),
                                        label: "All files",
                                        active: nav === 'all',
                                        onClick: ()=>setNav('all')
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                        lineNumber: 431,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                lineNumber: 429,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-auto flex flex-col gap-2 px-1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: importFile,
                                    className: "flex h-8 w-full items-center gap-2 rounded-md px-2 text-[12px] text-[#C9C9C9] transition-colors hover:bg-[#2C2C2C] hover:text-white",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                            className: "size-3.5",
                                            "aria-hidden": "true"
                                        }, void 0, false, {
                                            fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                            lineNumber: 440,
                                            columnNumber: 15
                                        }, this),
                                        "Import .iris file"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                    lineNumber: 435,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                lineNumber: 434,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                        lineNumber: 425,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "min-w-0 flex-1 overflow-y-auto",
                        "aria-label": `${sectionTitle} list`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mx-auto max-w-6xl px-4 py-5 sm:px-6 sm:py-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-4 flex flex-wrap items-center gap-x-3 gap-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "text-[15px] font-semibold",
                                            children: sectionTitle
                                        }, void 0, false, {
                                            fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                            lineNumber: 451,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "rounded-full bg-[#2C2C2C] px-2 py-0.5 text-[11px] text-[#9A9A9A]",
                                            children: [
                                                visible.length,
                                                " ",
                                                visible.length === 1 ? 'file' : 'files'
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                            lineNumber: 452,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-1 md:hidden",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    "aria-pressed": nav === 'recent',
                                                    onClick: ()=>setNav('recent'),
                                                    className: `h-7 rounded-md px-2.5 text-[11px] ${nav === 'recent' ? 'bg-[#383838] text-white' : 'text-[#9A9A9A] hover:bg-[#2C2C2C]'}`,
                                                    children: "Recent"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                                    lineNumber: 458,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    "aria-pressed": nav === 'all',
                                                    onClick: ()=>setNav('all'),
                                                    className: `h-7 rounded-md px-2.5 text-[11px] ${nav === 'all' ? 'bg-[#383838] text-white' : 'text-[#9A9A9A] hover:bg-[#2C2C2C]'}`,
                                                    children: "All"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                                    lineNumber: 466,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                            lineNumber: 457,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "ml-auto flex items-center gap-2",
                                            children: [
                                                nav === 'all' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                                    value: sort,
                                                    onValueChange: (v)=>setSort(v),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                            "aria-label": "Sort files",
                                                            className: "h-7 w-[120px] rounded-md border-[#4E4E4E] bg-[#1E1E1E] text-[11px] text-[#C9C9C9] shadow-none",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {}, void 0, false, {
                                                                fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                                                lineNumber: 483,
                                                                columnNumber: 23
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                                            lineNumber: 479,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                            className: MENU_CLS,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                    className: ITEM_CLS,
                                                                    value: "updated",
                                                                    children: "Last updated"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                                                    lineNumber: 486,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                    className: ITEM_CLS,
                                                                    value: "created",
                                                                    children: "Date created"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                                                    lineNumber: 489,
                                                                    columnNumber: 23
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                    className: ITEM_CLS,
                                                                    value: "name",
                                                                    children: "Name"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                                                    lineNumber: 492,
                                                                    columnNumber: 23
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                                            lineNumber: 485,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                                    lineNumber: 478,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-0.5 rounded-md border border-[#4E4E4E] p-0.5",
                                                    role: "group",
                                                    "aria-label": "View",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            "aria-label": "Grid view",
                                                            "aria-pressed": view === 'grid',
                                                            onClick: ()=>setView('grid'),
                                                            className: `flex size-6 items-center justify-center rounded ${view === 'grid' ? 'bg-[#383838] text-white' : 'text-[#9A9A9A] hover:bg-[#2C2C2C]'}`,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layout$2d$grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__LayoutGrid$3e$__["LayoutGrid"], {
                                                                className: "size-3.5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                                                lineNumber: 506,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                                            lineNumber: 499,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            "aria-label": "List view",
                                                            "aria-pressed": view === 'list',
                                                            onClick: ()=>setView('list'),
                                                            className: `flex size-6 items-center justify-center rounded ${view === 'list' ? 'bg-[#383838] text-white' : 'text-[#9A9A9A] hover:bg-[#2C2C2C]'}`,
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$list$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__List$3e$__["List"], {
                                                                className: "size-3.5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                                                lineNumber: 515,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                                            lineNumber: 508,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                                    lineNumber: 498,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                            lineNumber: 476,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                    lineNumber: 450,
                                    columnNumber: 13
                                }, this),
                                nav === 'all' && !query.trim() && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-6",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mb-2 text-[10px] font-medium uppercase tracking-wider text-[#7A7A7A]",
                                            children: "Start from a template"
                                        }, void 0, false, {
                                            fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                            lineNumber: 524,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: createNew,
                                                    className: "group flex h-20 flex-col items-start justify-between rounded-lg border border-dashed border-[#4E4E4E] p-2.5 text-left transition-colors hover:border-[#8B5CF6] hover:bg-[#2C2C2C]",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                                            className: "size-4 text-[#9A9A9A] transition-colors group-hover:text-[#C4B5FD]",
                                                            "aria-hidden": true
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                                            lineNumber: 533,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[12px] font-medium text-[#E5E5E5]",
                                                            children: "Blank file"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                                            lineNumber: 534,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                                    lineNumber: 528,
                                                    columnNumber: 19
                                                }, this),
                                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$templates$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TEMPLATES"].map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>createFromTemplate(t.id),
                                                        className: "group flex h-20 flex-col items-start justify-between rounded-lg border border-[#3E3E3E] bg-[#262626] p-2.5 text-left transition-colors hover:border-[#8B5CF6] hover:bg-[#2C2C2C]",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "flex size-6 items-center justify-center rounded bg-[#8B5CF6]/15 text-[#C4B5FD]",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TemplateGlyph, {
                                                                    id: t.id
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                                                    lineNumber: 544,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                                                lineNumber: 543,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "block text-[12px] font-medium text-[#E5E5E5]",
                                                                        children: t.name
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                                                        lineNumber: 547,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "block truncate text-[10px] text-[#8A8A8A]",
                                                                        children: t.description
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                                                        lineNumber: 548,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                                                lineNumber: 546,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, t.id, true, {
                                                        fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                                        lineNumber: 537,
                                                        columnNumber: 21
                                                    }, this))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                            lineNumber: 527,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                    lineNumber: 523,
                                    columnNumber: 15
                                }, this),
                                entries.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(EmptyLibrary, {
                                    onNew: createNew,
                                    onImport: importFile
                                }, void 0, false, {
                                    fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                    lineNumber: 558,
                                    columnNumber: 15
                                }, this) : visible.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col items-center justify-center py-20 text-center",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                            className: "mb-4 size-8 text-[#5B5B5B]",
                                            "aria-hidden": "true"
                                        }, void 0, false, {
                                            fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                            lineNumber: 561,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[14px] font-medium text-[#E5E5E5]",
                                            children: "No files found"
                                        }, void 0, false, {
                                            fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                            lineNumber: 562,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 text-[12px] text-[#9A9A9A]",
                                            children: [
                                                "Nothing matches “",
                                                query.trim(),
                                                "”"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                            lineNumber: 563,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setQuery(''),
                                            className: "mt-4 h-8 rounded-md border border-[#4E4E4E] px-3 text-[12px] text-[#E5E5E5] hover:bg-[#2C2C2C]",
                                            children: "Clear search"
                                        }, void 0, false, {
                                            fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                            lineNumber: 566,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                    lineNumber: 560,
                                    columnNumber: 15
                                }, this) : view === 'grid' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-3 sm:gap-x-4 lg:grid-cols-4",
                                    children: visible.map((entry)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$context$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ContextMenu"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$context$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ContextMenuTrigger"], {
                                                        asChild: true,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            role: "button",
                                                            tabIndex: 0,
                                                            "aria-label": `Open ${entry.name}`,
                                                            onClick: ()=>open(entry.id),
                                                            onKeyDown: (e)=>{
                                                                if (e.key === 'Enter' || e.key === ' ') {
                                                                    e.preventDefault();
                                                                    open(entry.id);
                                                                }
                                                            },
                                                            className: "group cursor-pointer rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "relative aspect-[16/10] overflow-hidden rounded-lg border border-[#3E3E3E] bg-[#2A2A2A] transition-colors group-hover:border-[#5B5B5B] group-hover:bg-[#303030]",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Thumb, {
                                                                            entry: entry
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                                                            lineNumber: 594,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "absolute right-1.5 top-1.5 opacity-0 transition-opacity focus-within:opacity-100 group-hover:opacity-100",
                                                                            onClick: (e)=>e.stopPropagation(),
                                                                            onKeyDown: (e)=>e.stopPropagation(),
                                                                            onKeyUp: (e)=>e.stopPropagation(),
                                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CardMenu, {
                                                                                entry: entry,
                                                                                actions: menuActions(entry)
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                                                                lineNumber: 603,
                                                                                columnNumber: 31
                                                                            }, this)
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                                                            lineNumber: 597,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                                                    lineNumber: 593,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "px-0.5 pt-2",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "truncate text-[13px] font-medium text-[#E5E5E5]",
                                                                            title: entry.name,
                                                                            children: entry.name
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                                                            lineNumber: 607,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "mt-0.5 truncate text-[11px] text-[#9A9A9A]",
                                                                            children: [
                                                                                "Edited ",
                                                                                timeAgo(entry.updatedAt),
                                                                                " · ",
                                                                                entry.pageCount,
                                                                                " ",
                                                                                entry.pageCount === 1 ? 'page' : 'pages'
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                                                            lineNumber: 610,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                                                    lineNumber: 606,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                                            lineNumber: 580,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                                        lineNumber: 579,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$context$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ContextMenuContent"], {
                                                        className: MENU_CLS,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DocMenuItems, {
                                                            entry: entry,
                                                            actions: menuActions(entry),
                                                            kind: "context"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                                            lineNumber: 617,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                                        lineNumber: 616,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                                lineNumber: 578,
                                                columnNumber: 21
                                            }, this)
                                        }, entry.id, false, {
                                            fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                            lineNumber: 577,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                    lineNumber: 575,
                                    columnNumber: 15
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "flex flex-col",
                                    children: visible.map((entry)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$context$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ContextMenu"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$context$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ContextMenuTrigger"], {
                                                        asChild: true,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            role: "button",
                                                            tabIndex: 0,
                                                            "aria-label": `Open ${entry.name}`,
                                                            onClick: ()=>open(entry.id),
                                                            onKeyDown: (e)=>{
                                                                if (e.key === 'Enter' || e.key === ' ') {
                                                                    e.preventDefault();
                                                                    open(entry.id);
                                                                }
                                                            },
                                                            className: "group flex h-14 cursor-pointer items-center gap-3 rounded-md px-2 outline-none hover:bg-[#2A2A2A] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#8B5CF6]",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "h-10 w-16 shrink-0 overflow-hidden rounded border border-[#3E3E3E] bg-[#2A2A2A]",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Thumb, {
                                                                        entry: entry,
                                                                        tiny: true
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                                                        lineNumber: 643,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                                                    lineNumber: 642,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "min-w-0 flex-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "truncate text-[13px] font-medium text-[#E5E5E5]",
                                                                            title: entry.name,
                                                                            children: entry.name
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                                                            lineNumber: 646,
                                                                            columnNumber: 29
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "mt-0.5 truncate text-[11px] text-[#9A9A9A]",
                                                                            children: [
                                                                                "Edited ",
                                                                                timeAgo(entry.updatedAt),
                                                                                " · ",
                                                                                entry.pageCount,
                                                                                " ",
                                                                                entry.pageCount === 1 ? 'page' : 'pages'
                                                                            ]
                                                                        }, void 0, true, {
                                                                            fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                                                            lineNumber: 649,
                                                                            columnNumber: 29
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                                                    lineNumber: 645,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "hidden items-center gap-6 text-[11px] text-[#9A9A9A] sm:flex",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "w-20 text-right",
                                                                        children: [
                                                                            entry.nodeCount,
                                                                            " objects"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                                                        lineNumber: 654,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                                                    lineNumber: 653,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "opacity-0 transition-opacity focus-within:opacity-100 group-hover:opacity-100",
                                                                    onClick: (e)=>e.stopPropagation(),
                                                                    onKeyDown: (e)=>e.stopPropagation(),
                                                                    onKeyUp: (e)=>e.stopPropagation(),
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CardMenu, {
                                                                        entry: entry,
                                                                        actions: menuActions(entry)
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                                                        lineNumber: 662,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                                                    lineNumber: 656,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                                            lineNumber: 629,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                                        lineNumber: 628,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$context$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ContextMenuContent"], {
                                                        className: MENU_CLS,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DocMenuItems, {
                                                            entry: entry,
                                                            actions: menuActions(entry),
                                                            kind: "context"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                                            lineNumber: 667,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                                        lineNumber: 666,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                                lineNumber: 627,
                                                columnNumber: 21
                                            }, this)
                                        }, entry.id, false, {
                                            fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                            lineNumber: 626,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                    lineNumber: 624,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                            lineNumber: 448,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                        lineNumber: 447,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                lineNumber: 423,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: "mt-auto flex h-9 shrink-0 select-none items-center justify-between border-t border-[#3E3E3E] px-4 text-[11px] text-[#7A7A7A]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            stats.count,
                            " ",
                            stats.count === 1 ? 'file' : 'files',
                            " · ",
                            formatBytes(stats.bytes),
                            " stored locally in your browser"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                        lineNumber: 680,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "hidden sm:inline",
                        children: "Iris — local-first design tool"
                    }, void 0, false, {
                        fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                        lineNumber: 683,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                lineNumber: 679,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
                open: !!renameTarget,
                onOpenChange: (o)=>!o && setRenameTarget(null),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
                    "aria-describedby": undefined,
                    className: "border-[#4E4E4E] bg-[#2C2C2C] text-white sm:max-w-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                className: "text-left text-[14px]",
                                children: "Rename file"
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                lineNumber: 690,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                            lineNumber: 689,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                            value: renameDraft,
                            autoFocus: true,
                            spellCheck: false,
                            "aria-label": "File name",
                            onFocus: (e)=>e.currentTarget.select(),
                            onChange: (e)=>setRenameDraft(e.target.value),
                            onKeyDown: (e)=>{
                                if (e.key === 'Enter') confirmRename();
                                if (e.key === 'Escape') setRenameTarget(null);
                            },
                            className: "h-8 rounded-md border-[#4E4E4E] bg-[#1E1E1E] text-[12px] text-white focus-visible:ring-[#8B5CF6]"
                        }, void 0, false, {
                            fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                            lineNumber: 692,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogFooter"], {
                            className: "gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setRenameTarget(null),
                                    className: "h-8 rounded-md border border-[#4E4E4E] px-3 text-[12px] text-[#E5E5E5] hover:bg-[#383838]",
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                    lineNumber: 706,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: confirmRename,
                                    disabled: !renameDraft.trim(),
                                    className: "h-8 rounded-md bg-[#8B5CF6] px-3 text-[12px] font-medium text-white hover:bg-[#7C4DF3] disabled:opacity-40",
                                    children: "Rename"
                                }, void 0, false, {
                                    fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                    lineNumber: 713,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                            lineNumber: 705,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                    lineNumber: 688,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                lineNumber: 687,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDialog"], {
                open: !!deleteTarget,
                onOpenChange: (o)=>!o && setDeleteTarget(null),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDialogContent"], {
                    className: "border-[#4E4E4E] bg-[#2C2C2C] text-white sm:max-w-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDialogHeader"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDialogTitle"], {
                                    className: "text-left text-[14px]",
                                    children: "Delete file?"
                                }, void 0, false, {
                                    fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                    lineNumber: 728,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDialogDescription"], {
                                    className: "text-left text-[12px] text-[#9A9A9A]",
                                    children: [
                                        "“",
                                        deleteTarget?.name,
                                        "” will be permanently removed from your browser. This can’t be undone."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                    lineNumber: 729,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                            lineNumber: 727,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDialogFooter"], {
                            className: "gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDialogCancel"], {
                                    className: "h-8 rounded-md border border-[#4E4E4E] bg-transparent px-3 text-[12px] text-[#E5E5E5] hover:bg-[#383838]",
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                    lineNumber: 734,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$alert$2d$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AlertDialogAction"], {
                                    onClick: confirmDelete,
                                    className: "h-8 rounded-md bg-[#E5484D] px-3 text-[12px] font-medium text-white hover:bg-[#D93B40]",
                                    children: "Delete"
                                }, void 0, false, {
                                    fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                    lineNumber: 737,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                            lineNumber: 733,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                    lineNumber: 726,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                lineNumber: 725,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
        lineNumber: 351,
        columnNumber: 5
    }, this);
}
_s(HomeBrowser, "uGcrz/E+qWu64JtAifqdxDDmBwU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"]
    ];
});
_c5 = HomeBrowser;
/* ------------------------------------------------------------------ */ /* small pieces                                                        */ /* ------------------------------------------------------------------ */ function SidebarItem({ icon, label, active, onClick }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: onClick,
        "aria-current": active ? 'page' : undefined,
        className: `flex h-8 w-full items-center gap-2.5 rounded-md px-2 text-[12px] transition-colors ${active ? 'bg-[#383838] font-medium text-white' : 'text-[#C9C9C9] hover:bg-[#2C2C2C] hover:text-white'}`,
        children: [
            icon,
            label
        ]
    }, void 0, true, {
        fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
        lineNumber: 766,
        columnNumber: 5
    }, this);
}
_c6 = SidebarItem;
/** Small line-art glyph for each template card. */ function TemplateGlyph({ id }) {
    const cls = 'stroke-current';
    const common = {
        fill: 'none',
        strokeWidth: 1.5,
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
    };
    switch(id){
        case 'mobile':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                viewBox: "0 0 16 16",
                className: "size-4",
                "aria-hidden": true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        x: "4.5",
                        y: "1.5",
                        width: "7",
                        height: "13",
                        rx: "1.5",
                        className: cls,
                        ...common
                    }, void 0, false, {
                        fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                        lineNumber: 788,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M4.5 12.5h7",
                        className: cls,
                        ...common
                    }, void 0, false, {
                        fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                        lineNumber: 789,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                lineNumber: 787,
                columnNumber: 9
            }, this);
        case 'desktop':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                viewBox: "0 0 16 16",
                className: "size-4",
                "aria-hidden": true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        x: "1.5",
                        y: "2.5",
                        width: "13",
                        height: "9",
                        rx: "1",
                        className: cls,
                        ...common
                    }, void 0, false, {
                        fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                        lineNumber: 795,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M6 13.5h4M8 11.5v2",
                        className: cls,
                        ...common
                    }, void 0, false, {
                        fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                        lineNumber: 796,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                lineNumber: 794,
                columnNumber: 9
            }, this);
        case 'kanban':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                viewBox: "0 0 16 16",
                className: "size-4",
                "aria-hidden": true,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        x: "1.5",
                        y: "2.5",
                        width: "3.5",
                        height: "11",
                        rx: "0.8",
                        className: cls,
                        ...common
                    }, void 0, false, {
                        fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                        lineNumber: 802,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        x: "6.25",
                        y: "2.5",
                        width: "3.5",
                        height: "8",
                        rx: "0.8",
                        className: cls,
                        ...common
                    }, void 0, false, {
                        fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                        lineNumber: 803,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                        x: "11",
                        y: "2.5",
                        width: "3.5",
                        height: "6",
                        rx: "0.8",
                        className: cls,
                        ...common
                    }, void 0, false, {
                        fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                        lineNumber: 804,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                lineNumber: 801,
                columnNumber: 9
            }, this);
        case 'poster':
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                viewBox: "0 0 16 16",
                className: "size-4",
                "aria-hidden": true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                    d: "M8 1.8 9.7 5.3l3.8.5-2.8 2.6.7 3.8L8 10.4l-3.4 1.8.7-3.8L2.5 5.8l3.8-.5z",
                    className: cls,
                    ...common
                }, void 0, false, {
                    fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                    lineNumber: 810,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                lineNumber: 809,
                columnNumber: 9
            }, this);
        default:
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                viewBox: "0 0 16 16",
                className: "size-4",
                "aria-hidden": true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("rect", {
                    x: "3",
                    y: "3",
                    width: "10",
                    height: "10",
                    rx: "1",
                    className: cls,
                    ...common
                }, void 0, false, {
                    fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                    lineNumber: 816,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                lineNumber: 815,
                columnNumber: 9
            }, this);
    }
}
_c7 = TemplateGlyph;
function EmptyLibrary({ onNew, onImport }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center justify-center px-6 py-24 text-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IrisMark, {
                size: 56
            }, void 0, false, {
                fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                lineNumber: 825,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "mt-5 text-[18px] font-semibold text-white",
                children: "Your designs live here"
            }, void 0, false, {
                fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                lineNumber: 826,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-2 max-w-sm text-[13px] leading-relaxed text-[#9A9A9A]",
                children: [
                    "Create a new design file or import an existing ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-medium text-[#C9C9C9]",
                        children: ".iris"
                    }, void 0, false, {
                        fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                        lineNumber: 828,
                        columnNumber: 56
                    }, this),
                    " document. Everything is stored locally in your browser — no account, no cloud."
                ]
            }, void 0, true, {
                fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                lineNumber: 827,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 flex flex-wrap items-center justify-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: onNew,
                        className: "inline-flex h-9 items-center gap-2 rounded-md bg-[#8B5CF6] px-4 text-[13px] font-medium text-white transition-colors hover:bg-[#7C4DF3]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                className: "size-4",
                                "aria-hidden": "true"
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                lineNumber: 837,
                                columnNumber: 11
                            }, this),
                            "New design file"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                        lineNumber: 832,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: onImport,
                        className: "inline-flex h-9 items-center gap-2 rounded-md border border-[#4E4E4E] px-4 text-[13px] text-[#E5E5E5] transition-colors hover:bg-[#2C2C2C]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$upload$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Upload$3e$__["Upload"], {
                                className: "size-4",
                                "aria-hidden": "true"
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                                lineNumber: 845,
                                columnNumber: 11
                            }, this),
                            "Import .iris"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                        lineNumber: 840,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
                lineNumber: 831,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/iris/ui/HomeBrowser.tsx",
        lineNumber: 824,
        columnNumber: 5
    }, this);
}
_c8 = EmptyLibrary;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8;
__turbopack_context__.k.register(_c, "IrisMark");
__turbopack_context__.k.register(_c1, "DocMenuItems");
__turbopack_context__.k.register(_c2, "CardMenu");
__turbopack_context__.k.register(_c3, "Thumb");
__turbopack_context__.k.register(_c4, "AccountChip");
__turbopack_context__.k.register(_c5, "HomeBrowser");
__turbopack_context__.k.register(_c6, "SidebarItem");
__turbopack_context__.k.register(_c7, "TemplateGlyph");
__turbopack_context__.k.register(_c8, "EmptyLibrary");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/iris/ui/TitleBar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TitleBar",
    ()=>TitleBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/**
 * Title bar: iris logo, native-style menu bar (File / Edit / View / Help),
 * a centered document-name editor with dirty indicator, and a badge.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2f$shallow$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react/shallow.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dropdown-menu.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/engine/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$files$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/engine/files.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/engine/geometry.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
/* ------------------------------------------------------------------ */ /* helpers                                                             */ /* ------------------------------------------------------------------ */ const ITEM_CLS = 'text-[12px] text-[#E5E5E5] focus:bg-[#474747] focus:text-white';
const HINT_CLS = 'ml-auto pl-6 text-[11px] text-[#8B8B8B]';
const SEP_CLS = 'bg-[#3E3E3E]';
const MENU_CLS = 'border-[#4E4E4E] bg-[#2C2C2C] text-white';
/**
 * Radix returns focus to the trigger after the menu closes; blur it on the
 * next tick so the engine's global keyboard shortcuts keep working.
 */ function blurActive() {
    setTimeout(()=>{
        document.activeElement?.blur();
    }, 0);
}
/** Compact relative time for the recents list, e.g. "2h ago". */ function timeAgo(ts) {
    const s = Math.max(0, Math.floor((Date.now() - ts) / 1000));
    if (s < 45) return 'just now';
    const m = Math.floor(s / 60);
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    const d = Math.floor(h / 24);
    if (d < 7) return `${d}d ago`;
    const w = Math.floor(d / 7);
    if (w < 5) return `${w}w ago`;
    return new Date(ts).toLocaleDateString();
}
/* ------------------------------------------------------------------ */ /* small building blocks                                               */ /* ------------------------------------------------------------------ */ /** Iris flower mark: three petals rotated 0/120/240 degrees + white core. */ function IrisLogo() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "16",
        height: "16",
        viewBox: "0 0 16 16",
        "aria-hidden": "true",
        focusable: "false",
        className: "shrink-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                fill: "#8B5CF6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                        cx: "8",
                        cy: "4.6",
                        rx: "2.7",
                        ry: "4.5"
                    }, void 0, false, {
                        fileName: "[project]/src/iris/ui/TitleBar.tsx",
                        lineNumber: 75,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                        cx: "8",
                        cy: "4.6",
                        rx: "2.7",
                        ry: "4.5",
                        transform: "rotate(120 8 8)"
                    }, void 0, false, {
                        fileName: "[project]/src/iris/ui/TitleBar.tsx",
                        lineNumber: 76,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                        cx: "8",
                        cy: "4.6",
                        rx: "2.7",
                        ry: "4.5",
                        transform: "rotate(240 8 8)"
                    }, void 0, false, {
                        fileName: "[project]/src/iris/ui/TitleBar.tsx",
                        lineNumber: 77,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                lineNumber: 74,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "8",
                cy: "8",
                r: "1.5",
                fill: "#FFFFFF"
            }, void 0, false, {
                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/iris/ui/TitleBar.tsx",
        lineNumber: 66,
        columnNumber: 5
    }, this);
}
_c = IrisLogo;
/** One top-level menu (File / Edit / View / Help). */ function TopMenu({ label, onOpenChange, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenu"], {
        onOpenChange: onOpenChange,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuTrigger"], {
                asChild: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    type: "button",
                    className: "h-7 rounded px-2 text-[12px] text-[#C9C9C9] hover:bg-[#383838] data-[state=open]:bg-[#383838]",
                    children: label
                }, void 0, false, {
                    fileName: "[project]/src/iris/ui/TitleBar.tsx",
                    lineNumber: 97,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                lineNumber: 96,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuContent"], {
                align: "start",
                className: MENU_CLS,
                children: children
            }, void 0, false, {
                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                lineNumber: 104,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/iris/ui/TitleBar.tsx",
        lineNumber: 95,
        columnNumber: 5
    }, this);
}
_c1 = TopMenu;
/** A plain menu entry that runs a store action, then blurs focus. */ function MenuEntry({ label, shortcut, disabled, action }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
        className: ITEM_CLS,
        disabled: disabled,
        onSelect: ()=>{
            blurActive();
            action();
        },
        children: [
            label,
            shortcut ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: HINT_CLS,
                children: shortcut
            }, void 0, false, {
                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                lineNumber: 133,
                columnNumber: 19
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/src/iris/ui/TitleBar.tsx",
        lineNumber: 124,
        columnNumber: 5
    }, this);
}
_c2 = MenuEntry;
function TitleBar() {
    _s();
    const docName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"])({
        "TitleBar.useIris[docName]": (s)=>s.doc.name
    }["TitleBar.useIris[docName]"]);
    const dirty = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"])({
        "TitleBar.useIris[dirty]": (s)=>s.dirty
    }["TitleBar.useIris[dirty]"]);
    const hasSelection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"])({
        "TitleBar.useIris[hasSelection]": (s)=>s.selection.length > 0
    }["TitleBar.useIris[hasSelection]"]);
    const canUndo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"])({
        "TitleBar.useIris[canUndo]": (s)=>s.past.length > 0
    }["TitleBar.useIris[canUndo]"]);
    const canRedo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"])({
        "TitleBar.useIris[canRedo]": (s)=>s.future.length > 0
    }["TitleBar.useIris[canRedo]"]);
    const hasClipboard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"])({
        "TitleBar.useIris[hasClipboard]": (s)=>!!s.clipboard
    }["TitleBar.useIris[hasClipboard]"]);
    const rulers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"])({
        "TitleBar.useIris[rulers]": (s)=>s.viewFlags.rulers
    }["TitleBar.useIris[rulers]"]);
    const pixelGrid = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"])({
        "TitleBar.useIris[pixelGrid]": (s)=>s.viewFlags.pixelGrid
    }["TitleBar.useIris[pixelGrid]"]);
    const outline = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"])({
        "TitleBar.useIris[outline]": (s)=>s.viewFlags.outline
    }["TitleBar.useIris[outline]"]);
    const gridShow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"])({
        "TitleBar.useIris[gridShow]": (s)=>s.doc.settings.grid.show
    }["TitleBar.useIris[gridShow]"]);
    const gridSnap = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"])({
        "TitleBar.useIris[gridSnap]": (s)=>s.doc.settings.grid.snap
    }["TitleBar.useIris[gridSnap]"]);
    const guideCount = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"])({
        "TitleBar.useIris[guideCount]": (s)=>s.doc.settings.guidesX.length + s.doc.settings.guidesY.length
    }["TitleBar.useIris[guideCount]"]);
    const actions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2f$shallow$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useShallow"])({
        "TitleBar.useIris[actions]": (s)=>({
                newDoc: s.newDoc,
                loadDoc: s.loadDoc,
                goHome: s.goHome,
                setDocName: s.setDocName,
                setExportOpen: s.setExportOpen,
                setShortcutsOpen: s.setShortcutsOpen,
                setViewFlag: s.setViewFlag,
                zoomAt: s.zoomAt,
                zoomReset: s.zoomReset,
                zoomToFit: s.zoomToFit,
                zoomToSelection: s.zoomToSelection,
                undo: s.undo,
                redo: s.redo,
                copySelection: s.copySelection,
                cutSelection: s.cutSelection,
                paste: s.paste,
                duplicateSelection: s.duplicateSelection,
                deleteSelection: s.deleteSelection,
                selectAll: s.selectAll,
                selectSameType: s.selectSameType,
                groupSelection: s.groupSelection,
                ungroupSelection: s.ungroupSelection,
                zorder: s.zorder,
                flipSelection: s.flipSelection,
                rotateSelectionBy: s.rotateSelectionBy,
                toggleLockSelection: s.toggleLockSelection,
                unlockAllOnPage: s.unlockAllOnPage,
                toggleHideSelection: s.toggleHideSelection,
                copyStyle: s.copyStyle,
                pasteStyle: s.pasteStyle,
                hasStyleClipboard: !!s.styleClipboard,
                addNode: s.addNode,
                setGridSettings: s.setGridSettings,
                clearGuides: s.clearGuides,
                viewport: s.viewport,
                canvasSize: s.canvasSize
            })
    }["TitleBar.useIris[actions]"]));
    const [recents, setRecents] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [nameDraft, setNameDraft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(docName);
    /* keep the draft in sync when the doc name changes elsewhere (undo / open) */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TitleBar.useEffect": ()=>{
            setNameDraft(docName);
        }
    }["TitleBar.useEffect"], [
        docName
    ]);
    const commitName = ()=>{
        const trimmed = nameDraft.trim();
        if (trimmed && trimmed !== docName) actions.setDocName(trimmed);
        else setNameDraft(docName);
    };
    /** insert a centered frame of a preset size */ const insertFrame = (w, h, name)=>{
        const { viewport, canvasSize } = actions;
        const center = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["screenToWorld"])(viewport, Math.max(0, canvasSize.w / 2 - 10), Math.max(0, canvasSize.h / 2 - 10));
        actions.addNode('frame', {
            x: center.x - w / 2,
            y: center.y - h / 2,
            w,
            h,
            name
        }, null);
    };
    const toggleFullscreen = ()=>{
        if (document.fullscreenElement) void document.exitFullscreen();
        else void document.documentElement.requestFullscreen().catch(()=>undefined);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "relative flex h-9 items-center gap-1 border-b border-[#3E3E3E] bg-[#1E1E1E] px-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        onClick: ()=>actions.goHome(),
                        title: "Back to files",
                        "aria-label": "Iris — back to files",
                        className: "flex h-7 w-7 items-center justify-center rounded hover:bg-[#383838]",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IrisLogo, {}, void 0, false, {
                            fileName: "[project]/src/iris/ui/TitleBar.tsx",
                            lineNumber: 236,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/iris/ui/TitleBar.tsx",
                        lineNumber: 229,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TopMenu, {
                        label: "File",
                        onOpenChange: (open)=>{
                            if (open) setRecents((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$files$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRecents"])());
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuEntry, {
                                label: "Back to Files",
                                action: ()=>actions.goHome()
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 245,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {
                                className: SEP_CLS
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 246,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuEntry, {
                                label: "New Document",
                                action: actions.newDoc
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 247,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuEntry, {
                                label: "Open…",
                                shortcut: "Ctrl+O",
                                action: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$files$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["openIrisFile"])()
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 248,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuEntry, {
                                label: "Save",
                                shortcut: "Ctrl+S",
                                action: ()=>void (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$files$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveIrisFile"])()
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 249,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuEntry, {
                                label: "Save As…",
                                shortcut: "Ctrl+Shift+S",
                                action: ()=>void (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$files$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["saveIrisFile"])({
                                        as: true
                                    })
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 250,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {
                                className: SEP_CLS
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 251,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuEntry, {
                                label: "Export…",
                                action: ()=>actions.setExportOpen(true)
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 252,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {
                                className: SEP_CLS
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 253,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuSub"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuSubTrigger"], {
                                        className: ITEM_CLS,
                                        children: "Open Recent"
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                        lineNumber: 255,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuSubContent"], {
                                        className: `${MENU_CLS} w-60`,
                                        children: recents.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                            className: ITEM_CLS,
                                            disabled: true,
                                            children: "No recent documents"
                                        }, void 0, false, {
                                            fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                            lineNumber: 258,
                                            columnNumber: 17
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                recents.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                                        className: ITEM_CLS,
                                                        disabled: !r.doc,
                                                        title: r.doc ? `Open ${r.name}` : 'Snapshot unavailable',
                                                        onSelect: ()=>{
                                                            if (!r.doc) return;
                                                            blurActive();
                                                            actions.loadDoc(r.doc, r.name, true);
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "min-w-0 truncate",
                                                                children: r.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                                                lineNumber: 275,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: `${HINT_CLS} shrink-0 pl-4`,
                                                                children: timeAgo(r.savedAt)
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                                                lineNumber: 276,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, `${r.name}:${r.savedAt}`, true, {
                                                        fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                                        lineNumber: 264,
                                                        columnNumber: 21
                                                    }, this)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {
                                                    className: SEP_CLS
                                                }, void 0, false, {
                                                    fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                                    lineNumber: 279,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                                    className: ITEM_CLS,
                                                    onSelect: ()=>{
                                                        blurActive();
                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$files$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clearRecents"])();
                                                        setRecents([]);
                                                    },
                                                    children: "Clear recent list"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                                    lineNumber: 280,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true)
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                        lineNumber: 256,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 254,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/iris/ui/TitleBar.tsx",
                        lineNumber: 239,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TopMenu, {
                        label: "Insert",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuEntry, {
                                label: "Frame",
                                shortcut: "F",
                                action: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"].getState().setTool('frame')
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 297,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuEntry, {
                                label: "Rectangle",
                                shortcut: "R",
                                action: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"].getState().setTool('rect')
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 298,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuEntry, {
                                label: "Ellipse",
                                shortcut: "O",
                                action: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"].getState().setTool('ellipse')
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 299,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuEntry, {
                                label: "Polygon",
                                shortcut: "Y",
                                action: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"].getState().setTool('polygon')
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 300,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuEntry, {
                                label: "Star",
                                shortcut: "S",
                                action: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"].getState().setTool('star')
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 301,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuEntry, {
                                label: "Arrow",
                                shortcut: "A",
                                action: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"].getState().setTool('arrow')
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 302,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuEntry, {
                                label: "Text",
                                shortcut: "T",
                                action: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"].getState().setTool('text')
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 303,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuEntry, {
                                label: "Image…",
                                shortcut: "M",
                                action: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$files$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pickImageFiles"])()
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 304,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {
                                className: SEP_CLS
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 305,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                className: "text-[11px] text-[#8B8B8B]",
                                disabled: true,
                                children: "Frame presets"
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 306,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuEntry, {
                                label: "Phone — 390×844",
                                action: ()=>insertFrame(390, 844, 'Phone')
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 309,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuEntry, {
                                label: "Tablet — 820×1180",
                                action: ()=>insertFrame(820, 1180, 'Tablet')
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 310,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuEntry, {
                                label: "Desktop — 1440×900",
                                action: ()=>insertFrame(1440, 900, 'Desktop')
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 311,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuEntry, {
                                label: "Watch — 198×242",
                                action: ()=>insertFrame(198, 242, 'Watch')
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 312,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuEntry, {
                                label: "Story — 1080×1920",
                                action: ()=>insertFrame(1080, 1920, 'Story')
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 313,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuEntry, {
                                label: "A4 — 794×1123",
                                action: ()=>insertFrame(794, 1123, 'A4')
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 314,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/iris/ui/TitleBar.tsx",
                        lineNumber: 296,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TopMenu, {
                        label: "Edit",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuEntry, {
                                label: "Undo",
                                shortcut: "Ctrl+Z",
                                disabled: !canUndo,
                                action: actions.undo
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 318,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuEntry, {
                                label: "Redo",
                                shortcut: "Ctrl+Shift+Z",
                                disabled: !canRedo,
                                action: actions.redo
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 319,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {
                                className: SEP_CLS
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 320,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuEntry, {
                                label: "Copy",
                                shortcut: "Ctrl+C",
                                disabled: !hasSelection,
                                action: actions.copySelection
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 321,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuEntry, {
                                label: "Cut",
                                shortcut: "Ctrl+X",
                                disabled: !hasSelection,
                                action: actions.cutSelection
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 322,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuEntry, {
                                label: "Paste",
                                shortcut: "Ctrl+V",
                                disabled: !hasClipboard,
                                action: ()=>actions.paste(null)
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 323,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuEntry, {
                                label: "Duplicate",
                                shortcut: "Ctrl+D",
                                disabled: !hasSelection,
                                action: ()=>actions.duplicateSelection()
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 324,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuEntry, {
                                label: "Delete",
                                disabled: !hasSelection,
                                action: actions.deleteSelection
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 330,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {
                                className: SEP_CLS
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 331,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuEntry, {
                                label: "Select All",
                                shortcut: "Ctrl+A",
                                action: actions.selectAll
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 332,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuEntry, {
                                label: "Select Same Type",
                                shortcut: "Ctrl+Shift+A",
                                disabled: !hasSelection,
                                action: actions.selectSameType
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 333,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {
                                className: SEP_CLS
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 339,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuEntry, {
                                label: "Copy Style",
                                shortcut: "Ctrl+Alt+C",
                                disabled: !hasSelection,
                                action: actions.copyStyle
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 340,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuEntry, {
                                label: "Paste Style",
                                shortcut: "Ctrl+Alt+V",
                                disabled: !hasSelection || !actions.hasStyleClipboard,
                                action: actions.pasteStyle
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 341,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {
                                className: SEP_CLS
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 347,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuEntry, {
                                label: "Flip Horizontal",
                                shortcut: "Shift+H",
                                disabled: !hasSelection,
                                action: ()=>actions.flipSelection('h')
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 348,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuEntry, {
                                label: "Flip Vertical",
                                shortcut: "Shift+V",
                                disabled: !hasSelection,
                                action: ()=>actions.flipSelection('v')
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 349,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuEntry, {
                                label: "Rotate 90° CW",
                                disabled: !hasSelection,
                                action: ()=>actions.rotateSelectionBy(90)
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 350,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuEntry, {
                                label: "Rotate 90° CCW",
                                disabled: !hasSelection,
                                action: ()=>actions.rotateSelectionBy(-90)
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 351,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {
                                className: SEP_CLS
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 352,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuEntry, {
                                label: "Lock / Unlock",
                                shortcut: "Ctrl+L",
                                disabled: !hasSelection,
                                action: actions.toggleLockSelection
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 353,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuEntry, {
                                label: "Unlock All on Page",
                                shortcut: "Ctrl+Shift+L",
                                action: actions.unlockAllOnPage
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 354,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuEntry, {
                                label: "Hide / Show",
                                shortcut: "Ctrl+Shift+H",
                                disabled: !hasSelection,
                                action: actions.toggleHideSelection
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 355,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {
                                className: SEP_CLS
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 356,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuEntry, {
                                label: "Group",
                                shortcut: "Ctrl+G",
                                disabled: !hasSelection,
                                action: actions.groupSelection
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 357,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuEntry, {
                                label: "Ungroup",
                                shortcut: "Ctrl+Shift+G",
                                disabled: !hasSelection,
                                action: actions.ungroupSelection
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 358,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {
                                className: SEP_CLS
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 364,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuEntry, {
                                label: "Bring Forward",
                                shortcut: "]",
                                disabled: !hasSelection,
                                action: ()=>actions.zorder('forward')
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 365,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuEntry, {
                                label: "Send Backward",
                                shortcut: "[",
                                disabled: !hasSelection,
                                action: ()=>actions.zorder('backward')
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 371,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuEntry, {
                                label: "Bring to Front",
                                shortcut: "Ctrl+]",
                                disabled: !hasSelection,
                                action: ()=>actions.zorder('front')
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 377,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuEntry, {
                                label: "Send to Back",
                                shortcut: "Ctrl+[",
                                disabled: !hasSelection,
                                action: ()=>actions.zorder('back')
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 383,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/iris/ui/TitleBar.tsx",
                        lineNumber: 317,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TopMenu, {
                        label: "View",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuEntry, {
                                label: "Zoom In",
                                shortcut: "Ctrl+=",
                                action: ()=>actions.zoomAt(1.2)
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 392,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuEntry, {
                                label: "Zoom Out",
                                shortcut: "Ctrl+-",
                                action: ()=>actions.zoomAt(1 / 1.2)
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 393,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuEntry, {
                                label: "Reset Zoom",
                                shortcut: "Ctrl+0",
                                action: actions.zoomReset
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 394,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuEntry, {
                                label: "Zoom to Fit",
                                shortcut: "Shift+1",
                                action: actions.zoomToFit
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 395,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuEntry, {
                                label: "Zoom to Selection",
                                shortcut: "Shift+2",
                                action: actions.zoomToSelection
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 396,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {
                                className: SEP_CLS
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 397,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuCheckboxItem"], {
                                className: ITEM_CLS,
                                checked: rulers,
                                onCheckedChange: (v)=>{
                                    blurActive();
                                    actions.setViewFlag('rulers', v);
                                },
                                children: "Rulers"
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 398,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuCheckboxItem"], {
                                className: ITEM_CLS,
                                checked: pixelGrid,
                                onCheckedChange: (v)=>{
                                    blurActive();
                                    actions.setViewFlag('pixelGrid', v);
                                },
                                children: "Pixel Grid"
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 408,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuCheckboxItem"], {
                                className: ITEM_CLS,
                                checked: outline,
                                onCheckedChange: (v)=>{
                                    blurActive();
                                    actions.setViewFlag('outline', v);
                                },
                                children: "Outline Mode"
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 418,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuCheckboxItem"], {
                                className: ITEM_CLS,
                                checked: gridShow,
                                onCheckedChange: (v)=>{
                                    blurActive();
                                    actions.setGridSettings({
                                        show: v
                                    });
                                },
                                children: "Layout Grid"
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 428,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuCheckboxItem"], {
                                className: ITEM_CLS,
                                checked: gridSnap,
                                onCheckedChange: (v)=>{
                                    blurActive();
                                    actions.setGridSettings({
                                        snap: v
                                    });
                                },
                                children: "Snap to Grid"
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 438,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {
                                className: SEP_CLS
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 448,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuEntry, {
                                label: "Clear Guides",
                                disabled: guideCount === 0,
                                action: actions.clearGuides
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 449,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuEntry, {
                                label: "Fullscreen",
                                action: toggleFullscreen
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 450,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/iris/ui/TitleBar.tsx",
                        lineNumber: 391,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TopMenu, {
                        label: "Help",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MenuEntry, {
                                label: "Keyboard Shortcuts",
                                action: ()=>actions.setShortcutsOpen(true)
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 454,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {
                                className: SEP_CLS
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 455,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                className: "text-[12px] text-[#8B8B8B]",
                                disabled: true,
                                children: "Iris v1 — local-first, MIT licensed"
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                                lineNumber: 456,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/iris/ui/TitleBar.tsx",
                        lineNumber: 453,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                lineNumber: 228,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute left-1/2 flex -translate-x-1/2 items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `h-1.5 w-1.5 rounded-full ${dirty ? 'bg-[#8B5CF6]' : 'bg-[#5B5B5B]'}`,
                        title: dirty ? 'Unsaved changes' : 'All changes saved',
                        "aria-hidden": "true"
                    }, void 0, false, {
                        fileName: "[project]/src/iris/ui/TitleBar.tsx",
                        lineNumber: 464,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        className: "w-40 rounded bg-transparent text-center text-[12px] font-medium text-white focus:bg-[#2C2C2C] focus:outline-none focus:ring-1 focus:ring-[#4E4E4E]",
                        value: nameDraft,
                        "aria-label": "Document name",
                        spellCheck: false,
                        onChange: (e)=>setNameDraft(e.target.value),
                        onBlur: commitName,
                        onKeyDown: (e)=>{
                            if (e.key === 'Enter') {
                                commitName();
                                e.currentTarget.blur();
                            } else if (e.key === 'Escape') {
                                setNameDraft(docName);
                                e.currentTarget.blur();
                            }
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/iris/ui/TitleBar.tsx",
                        lineNumber: 469,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                lineNumber: 463,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ml-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "rounded border border-[#3E3E3E] px-1.5 py-0.5 text-[10px] text-[#9A9A9A]",
                    children: "Local-first"
                }, void 0, false, {
                    fileName: "[project]/src/iris/ui/TitleBar.tsx",
                    lineNumber: 490,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/iris/ui/TitleBar.tsx",
                lineNumber: 489,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/iris/ui/TitleBar.tsx",
        lineNumber: 226,
        columnNumber: 5
    }, this);
}
_s(TitleBar, "koabYpAYkVb4GJLlmJgUX4naHS0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"]
    ];
});
_c3 = TitleBar;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "IrisLogo");
__turbopack_context__.k.register(_c1, "TopMenu");
__turbopack_context__.k.register(_c2, "MenuEntry");
__turbopack_context__.k.register(_c3, "TitleBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/iris/ui/NumberField.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "NumberField",
    ()=>NumberField
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/**
 * Figma-style number input: click to type, drag horizontally to scrub,
 * arrow keys to step. Commits on Enter / blur / drag end.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function fmt(v) {
    const r = Math.round(v * 100) / 100;
    return String(r);
}
function NumberField({ value, onChange, min, max, step = 1, disabled = false, className, icon, ariaLabel, title }) {
    _s();
    const [draft, setDraft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const dragRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const clamp = (v)=>{
        let out = v;
        if (min !== undefined && out < min) out = min;
        if (max !== undefined && out > max) out = max;
        return out;
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NumberField.useEffect": ()=>{
            // keep in sync when value changes externally while not editing
            if (draft === null && document.activeElement !== inputRef.current) return;
        // no-op: draft state governs display while focused
        }
    }["NumberField.useEffect"], [
        value,
        draft
    ]);
    const commitDraft = ()=>{
        if (draft === null) return;
        const parsed = parseFloat(draft.replace(',', '.'));
        if (!Number.isNaN(parsed)) onChange(clamp(parsed));
        setDraft(null);
    };
    const display = draft ?? fmt(value);
    const onPointerDown = (e)=>{
        if (disabled) return;
        if (document.activeElement === inputRef.current) return; // typing mode
        dragRef.current = {
            startX: e.clientX,
            startVal: value,
            moved: false
        };
        e.currentTarget.setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e)=>{
        const d = dragRef.current;
        if (!d) return;
        const dx = e.clientX - d.startX;
        if (!d.moved && Math.abs(dx) < 3) return;
        d.moved = true;
        const mult = e.shiftKey ? 10 : 1;
        onChange(clamp(d.startVal + dx * step * mult));
    };
    const onPointerUp = (e)=>{
        const d = dragRef.current;
        dragRef.current = null;
        try {
            e.currentTarget.releasePointerCapture(e.pointerId);
        } catch  {
        /* pointer already released */ }
        if (d && !d.moved) {
            // plain click -> focus for typing
            inputRef.current?.focus();
            inputRef.current?.select();
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('relative flex-1', className),
        children: [
            icon ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "pointer-events-none absolute left-1.5 top-1/2 -translate-y-1/2 text-[#9A9A9A]",
                "aria-hidden": true,
                children: icon
            }, void 0, false, {
                fileName: "[project]/src/iris/ui/NumberField.tsx",
                lineNumber: 102,
                columnNumber: 9
            }, this) : null,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                ref: inputRef,
                type: "text",
                inputMode: "decimal",
                disabled: disabled,
                "aria-label": ariaLabel,
                title: title,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('iris-input text-right tabular-nums', icon && 'pl-5', !disabled && 'cursor-ew-resize'),
                value: display,
                spellCheck: false,
                onChange: (e)=>setDraft(e.target.value),
                onBlur: commitDraft,
                onKeyDown: (e)=>{
                    if (e.key === 'Enter') {
                        commitDraft();
                        inputRef.current?.blur();
                    } else if (e.key === 'Escape') {
                        setDraft(null);
                        inputRef.current?.blur();
                    } else if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        onChange(clamp(value + step * (e.shiftKey ? 10 : 1)));
                        setDraft(null);
                    } else if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        onChange(clamp(value - step * (e.shiftKey ? 10 : 1)));
                        setDraft(null);
                    }
                    e.stopPropagation();
                },
                onPointerDown: onPointerDown,
                onPointerMove: onPointerMove,
                onPointerUp: onPointerUp
            }, void 0, false, {
                fileName: "[project]/src/iris/ui/NumberField.tsx",
                lineNumber: 106,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/iris/ui/NumberField.tsx",
        lineNumber: 100,
        columnNumber: 5
    }, this);
}
_s(NumberField, "TuJTYpoenvuG37/hte1NBktHZYU=");
_c = NumberField;
var _c;
__turbopack_context__.k.register(_c, "NumberField");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/iris/ui/ColorField.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ColorField",
    ()=>ColorField
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/**
 * Solid color field: swatch (native picker), hex input, clear button, and a
 * drop-down with recent colors + a saved palette (persisted in localStorage).
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/engine/colors.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function normalizeHex(raw) {
    let s = raw.trim().replace(/^#/, '');
    if (/^[0-9a-fA-F]{3}$/.test(s)) {
        s = s.split('').map((c)=>c + c).join('');
    }
    if (!/^[0-9a-fA-F]{6}$/.test(s)) return null;
    return `#${s.toUpperCase()}`;
}
function SwatchGrid({ colors, onPick, emptyLabel }) {
    if (colors.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "px-1 py-1.5 text-[10px] text-[#6F6F6F]",
            children: emptyLabel
        }, void 0, false, {
            fileName: "[project]/src/iris/ui/ColorField.tsx",
            lineNumber: 42,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-7 gap-1",
        children: colors.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: "h-5 w-5 rounded-[4px] border border-[#5A5A5A] transition-transform hover:scale-110",
                style: {
                    background: c
                },
                title: c,
                "aria-label": `Use ${c}`,
                onClick: ()=>onPick(c)
            }, c, false, {
                fileName: "[project]/src/iris/ui/ColorField.tsx",
                lineNumber: 47,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/iris/ui/ColorField.tsx",
        lineNumber: 45,
        columnNumber: 5
    }, this);
}
_c = SwatchGrid;
function ColorField({ value, onChange, allowNone = true, ariaLabel = 'Color' }) {
    _s();
    const [draft, setDraft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [recent, setRecent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [swatches, setSwatches] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const rootRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const textRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const display = draft ?? value ?? '';
    const refresh = ()=>{
        setRecent((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getRecentColors"])());
        setSwatches((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSwatches"])());
    };
    const toggleOpen = ()=>{
        setOpen((o)=>{
            if (!o) refresh();
            return !o;
        });
    };
    /* close on outside click */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ColorField.useEffect": ()=>{
            if (!open) return;
            const onDown = {
                "ColorField.useEffect.onDown": (e)=>{
                    if (rootRef.current && e.target instanceof Node && !rootRef.current.contains(e.target)) {
                        setOpen(false);
                    }
                }
            }["ColorField.useEffect.onDown"];
            window.addEventListener('pointerdown', onDown, true);
            return ({
                "ColorField.useEffect": ()=>window.removeEventListener('pointerdown', onDown, true)
            })["ColorField.useEffect"];
        }
    }["ColorField.useEffect"], [
        open
    ]);
    const commit = ()=>{
        if (draft === null) return;
        const norm = normalizeHex(draft);
        if (norm) {
            onChange(norm);
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pushRecentColor"])(norm);
        }
        setDraft(null);
    };
    const pick = (hex)=>{
        onChange(hex);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pushRecentColor"])(hex);
        setDraft(null);
        setOpen(false);
    };
    const saveSwatch = ()=>{
        if (!value) return;
        const added = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toggleSwatch"])(value);
        refresh();
        void added;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative flex items-center gap-1.5",
        ref: rootRef,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "relative block h-[18px] w-[18px] shrink-0 cursor-pointer overflow-hidden rounded-[4px] border border-[#4E4E4E]",
                style: {
                    background: value ? value : 'repeating-conic-gradient(#5A5A5A 0% 25%, #3A3A3A 0% 50%) 50% / 8px 8px'
                },
                title: value ?? 'No fill',
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "color",
                    className: "absolute inset-0 h-full w-full cursor-pointer opacity-0",
                    value: value ?? '#D9D9D9',
                    "aria-label": `${ariaLabel} picker`,
                    onChange: (e)=>{
                        const hex = e.target.value.toUpperCase();
                        setDraft(null);
                        onChange(hex);
                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$colors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pushRecentColor"])(hex);
                    }
                }, void 0, false, {
                    fileName: "[project]/src/iris/ui/ColorField.tsx",
                    lineNumber: 130,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/iris/ui/ColorField.tsx",
                lineNumber: 121,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                ref: textRef,
                type: "text",
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('iris-input flex-1 font-medium uppercase'),
                placeholder: "None",
                "aria-label": `${ariaLabel} hex value`,
                value: display,
                spellCheck: false,
                disabled: !allowNone && value === null,
                onChange: (e)=>setDraft(e.target.value),
                onBlur: commit,
                onKeyDown: (e)=>{
                    if (e.key === 'Enter') {
                        commit();
                        textRef.current?.blur();
                    } else if (e.key === 'Escape') {
                        setDraft(null);
                        textRef.current?.blur();
                    }
                    e.stopPropagation();
                }
            }, void 0, false, {
                fileName: "[project]/src/iris/ui/ColorField.tsx",
                lineNumber: 143,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: "flex h-6 w-6 shrink-0 items-center justify-center rounded text-[#9A9A9A] transition-colors hover:bg-[#474747] hover:text-white",
                "aria-label": `${ariaLabel} palette`,
                title: "Color palette",
                "aria-expanded": open,
                onClick: toggleOpen,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                    size: 12,
                    strokeWidth: 2,
                    "aria-hidden": true
                }, void 0, false, {
                    fileName: "[project]/src/iris/ui/ColorField.tsx",
                    lineNumber: 173,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/iris/ui/ColorField.tsx",
                lineNumber: 165,
                columnNumber: 7
            }, this),
            allowNone && value !== null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: "flex h-6 w-6 shrink-0 items-center justify-center rounded text-[#9A9A9A] transition-colors hover:bg-[#474747] hover:text-white",
                "aria-label": `Remove ${ariaLabel.toLowerCase()}`,
                title: "Remove",
                onClick: ()=>onChange(null),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                    size: 12,
                    strokeWidth: 2,
                    "aria-hidden": true
                }, void 0, false, {
                    fileName: "[project]/src/iris/ui/ColorField.tsx",
                    lineNumber: 183,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/iris/ui/ColorField.tsx",
                lineNumber: 176,
                columnNumber: 9
            }, this) : null,
            open ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute right-0 top-7 z-50 w-56 rounded-md border border-[#4E4E4E] bg-[#2C2C2C] p-2 shadow-2xl",
                role: "dialog",
                "aria-label": `${ariaLabel} palette`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-1 flex items-center justify-between",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[10px] font-semibold uppercase tracking-wider text-[#9A9A9A]",
                            children: "Recent"
                        }, void 0, false, {
                            fileName: "[project]/src/iris/ui/ColorField.tsx",
                            lineNumber: 194,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/iris/ui/ColorField.tsx",
                        lineNumber: 193,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SwatchGrid, {
                        colors: recent,
                        onPick: pick,
                        emptyLabel: "No recent colors yet"
                    }, void 0, false, {
                        fileName: "[project]/src/iris/ui/ColorField.tsx",
                        lineNumber: 196,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 mb-1 flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[10px] font-semibold uppercase tracking-wider text-[#9A9A9A]",
                                children: "Palette"
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/ColorField.tsx",
                                lineNumber: 198,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "flex h-5 w-5 items-center justify-center rounded text-[#9A9A9A] hover:bg-[#474747] hover:text-white",
                                "aria-label": "Save current color to palette",
                                title: "Save current color to palette",
                                onClick: saveSwatch,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {
                                    size: 11,
                                    strokeWidth: 2,
                                    "aria-hidden": true
                                }, void 0, false, {
                                    fileName: "[project]/src/iris/ui/ColorField.tsx",
                                    lineNumber: 206,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/ColorField.tsx",
                                lineNumber: 199,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/iris/ui/ColorField.tsx",
                        lineNumber: 197,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SwatchGrid, {
                        colors: swatches,
                        onPick: pick,
                        emptyLabel: "Save colors here with the + button"
                    }, void 0, false, {
                        fileName: "[project]/src/iris/ui/ColorField.tsx",
                        lineNumber: 209,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/iris/ui/ColorField.tsx",
                lineNumber: 188,
                columnNumber: 9
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/src/iris/ui/ColorField.tsx",
        lineNumber: 120,
        columnNumber: 5
    }, this);
}
_s(ColorField, "yIYMHS1kC/19YjyzhWivqmxbcPw=");
_c1 = ColorField;
var _c, _c1;
__turbopack_context__.k.register(_c, "SwatchGrid");
__turbopack_context__.k.register(_c1, "ColorField");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/iris/ui/PropertiesPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PropertiesPanel",
    ()=>PropertiesPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/**
 * Right panel: alignment, position/size + transforms (flip/rotate), appearance
 * (opacity/blend), fill (solid + gradient), stroke (color/weight/dash), effects
 * (shadow/blur), shape params (polygon/star/arrow), text properties, frame
 * clip, document settings and quick export.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2f$shallow$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react/shallow.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$align$2d$center$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignCenterHorizontal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/align-center-horizontal.js [app-client] (ecmascript) <export default as AlignCenterHorizontal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$align$2d$center$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignCenterVertical$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/align-center-vertical.js [app-client] (ecmascript) <export default as AlignCenterVertical>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$align$2d$end$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignEndHorizontal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/align-end-horizontal.js [app-client] (ecmascript) <export default as AlignEndHorizontal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$align$2d$end$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignEndVertical$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/align-end-vertical.js [app-client] (ecmascript) <export default as AlignEndVertical>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$align$2d$horizontal$2d$distribute$2d$center$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignHorizontalDistributeCenter$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/align-horizontal-distribute-center.js [app-client] (ecmascript) <export default as AlignHorizontalDistributeCenter>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$align$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/align-left.js [app-client] (ecmascript) <export default as AlignLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$align$2d$center$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignCenter$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/align-center.js [app-client] (ecmascript) <export default as AlignCenter>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$align$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/align-right.js [app-client] (ecmascript) <export default as AlignRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$align$2d$start$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignStartHorizontal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/align-start-horizontal.js [app-client] (ecmascript) <export default as AlignStartHorizontal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$align$2d$start$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignStartVertical$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/align-start-vertical.js [app-client] (ecmascript) <export default as AlignStartVertical>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$align$2d$vertical$2d$distribute$2d$center$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignVerticalDistributeCenter$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/align-vertical-distribute-center.js [app-client] (ecmascript) <export default as AlignVerticalDistributeCenter>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-down.js [app-client] (ecmascript) <export default as ArrowDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-up.js [app-client] (ecmascript) <export default as ArrowUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2d$to$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDownToLine$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-down-to-line.js [app-client] (ecmascript) <export default as ArrowDownToLine>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$to$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpToLine$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-up-to-line.js [app-client] (ecmascript) <export default as ArrowUpToLine>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flip$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FlipHorizontal$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/flip-horizontal.js [app-client] (ecmascript) <export default as FlipHorizontal>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flip$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FlipVertical$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/flip-vertical.js [app-client] (ecmascript) <export default as FlipVertical>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye-off.js [app-client] (ecmascript) <export default as EyeOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-cw.js [app-client] (ecmascript) <export default as RotateCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.js [app-client] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Unlock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock-open.js [app-client] (ecmascript) <export default as Unlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$slider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/slider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/switch.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/engine/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/engine/geometry.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/engine/model.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$export$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/iris/engine/export.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$ui$2f$NumberField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/ui/NumberField.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$ui$2f$ColorField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/ui/ColorField.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
const FONT_FAMILIES = [
    'Inter',
    'Arial',
    'Helvetica',
    'Georgia',
    'Times New Roman',
    'Courier New',
    'Verdana',
    'Tahoma',
    'Trebuchet MS',
    'Palatino'
];
const FONT_WEIGHTS = [
    {
        value: 400,
        label: 'Regular'
    },
    {
        value: 500,
        label: 'Medium'
    },
    {
        value: 600,
        label: 'Semibold'
    },
    {
        value: 700,
        label: 'Bold'
    },
    {
        value: 800,
        label: 'Extrabold'
    }
];
const TEXT_CASES = [
    {
        value: 'as-typed',
        label: 'As typed'
    },
    {
        value: 'upper',
        label: 'UPPERCASE'
    },
    {
        value: 'lower',
        label: 'lowercase'
    },
    {
        value: 'title',
        label: 'Title Case'
    }
];
const DASH_STYLES = [
    {
        value: 'solid',
        label: 'Solid'
    },
    {
        value: 'dashed',
        label: 'Dashed'
    },
    {
        value: 'dotted',
        label: 'Dotted'
    }
];
const ARROW_HEADS = [
    {
        value: 'none',
        label: 'None'
    },
    {
        value: 'arrow',
        label: 'Arrow'
    },
    {
        value: 'triangle',
        label: 'Filled'
    },
    {
        value: 'line',
        label: 'Chevron'
    }
];
const ALIGN_TOOLS = [
    {
        mode: 'left',
        label: 'Align left',
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$align$2d$start$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignStartVertical$3e$__["AlignStartVertical"]
    },
    {
        mode: 'hcenter',
        label: 'Align horizontal centers',
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$align$2d$center$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignCenterVertical$3e$__["AlignCenterVertical"]
    },
    {
        mode: 'right',
        label: 'Align right',
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$align$2d$end$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignEndVertical$3e$__["AlignEndVertical"]
    },
    {
        mode: 'top',
        label: 'Align top',
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$align$2d$start$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignStartHorizontal$3e$__["AlignStartHorizontal"]
    },
    {
        mode: 'vcenter',
        label: 'Align vertical centers',
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$align$2d$center$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignCenterHorizontal$3e$__["AlignCenterHorizontal"]
    },
    {
        mode: 'bottom',
        label: 'Align bottom',
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$align$2d$end$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignEndHorizontal$3e$__["AlignEndHorizontal"]
    },
    {
        mode: 'hdist',
        label: 'Distribute horizontally',
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$align$2d$horizontal$2d$distribute$2d$center$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignHorizontalDistributeCenter$3e$__["AlignHorizontalDistributeCenter"]
    },
    {
        mode: 'vdist',
        label: 'Distribute vertically',
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$align$2d$vertical$2d$distribute$2d$center$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignVerticalDistributeCenter$3e$__["AlignVerticalDistributeCenter"]
    }
];
function Section({ title, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "border-b border-[#3E3E3E] px-3 py-3",
        children: [
            title ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mb-2 text-[10px] font-semibold uppercase tracking-wider text-[#9A9A9A]",
                children: title
            }, void 0, false, {
                fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                lineNumber: 104,
                columnNumber: 9
            }, this) : null,
            children
        ]
    }, void 0, true, {
        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
        lineNumber: 102,
        columnNumber: 5
    }, this);
}
_c = Section;
function FieldLabel({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "flex h-[26px] w-4 shrink-0 items-center justify-start text-[10px] text-[#9A9A9A]",
        children: children
    }, void 0, false, {
        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
        lineNumber: 115,
        columnNumber: 5
    }, this);
}
_c1 = FieldLabel;
function IconBtn({ label, Icon, onClick, disabled, active }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex h-7 w-7 items-center justify-center rounded-md transition-colors disabled:pointer-events-none disabled:opacity-35', active ? 'bg-[#474747] text-white' : 'text-[#C9C9C9] hover:bg-[#474747] hover:text-white'),
        title: label,
        "aria-label": label,
        disabled: disabled,
        onClick: onClick,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
            size: 13,
            strokeWidth: 1.75,
            "aria-hidden": true
        }, void 0, false, {
            fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
            lineNumber: 146,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
        lineNumber: 135,
        columnNumber: 5
    }, this);
}
_c2 = IconBtn;
function PropertiesPanel() {
    _s();
    const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"])({
        "PropertiesPanel.useIris[doc]": (s)=>s.doc
    }["PropertiesPanel.useIris[doc]"]);
    const currentPageId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"])({
        "PropertiesPanel.useIris[currentPageId]": (s)=>s.currentPageId
    }["PropertiesPanel.useIris[currentPageId]"]);
    const selection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"])({
        "PropertiesPanel.useIris[selection]": (s)=>s.selection
    }["PropertiesPanel.useIris[selection]"]);
    const nodes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelectedNodes"])();
    const actions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2f$shallow$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useShallow"])({
        "PropertiesPanel.useIris[actions]": (s)=>({
                alignSelection: s.alignSelection,
                updateNodes: s.updateNodes,
                setNodeRect: s.setNodeRect,
                resizeSelectionBox: s.resizeSelectionBox,
                moveSelectionWorld: s.moveSelectionWorld,
                renamePage: s.renamePage,
                setEditingText: s.setEditingText,
                zorder: s.zorder,
                flipSelection: s.flipSelection,
                rotateSelectionBy: s.rotateSelectionBy,
                toggleLockSelection: s.toggleLockSelection,
                toggleHideSelection: s.toggleHideSelection,
                setGridSettings: s.setGridSettings,
                setSettings: s.setSettings,
                clearGuides: s.clearGuides,
                unlockAllOnPage: s.unlockAllOnPage
            })
    }["PropertiesPanel.useIris[actions]"]));
    const sliderActiveRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const page = doc.pagesById[currentPageId];
    const single = nodes.length === 1 ? nodes[0] : null;
    const ids = nodes.map((n)=>n.id);
    const bbox = selection.length > 0 ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["boundsOfNodes"])(doc, selection) : null;
    const settings = doc.settings;
    const FILLABLE = [
        'rect',
        'ellipse',
        'frame',
        'path',
        'text',
        'polygon',
        'star'
    ];
    const STROKABLE = [
        'rect',
        'ellipse',
        'line',
        'path',
        'frame',
        'polygon',
        'star',
        'arrow'
    ];
    const showFill = single && FILLABLE.includes(single.type);
    const showStroke = single && STROKABLE.includes(single.type);
    const showText = single?.type === 'text';
    const showRadius = single && (single.type === 'rect' || single.type === 'frame' || single.type === 'image');
    const showClip = single?.type === 'frame';
    const showPolygon = single?.type === 'polygon';
    const showStar = single?.type === 'star';
    const showArrowHeads = single?.type === 'arrow';
    /* ---------------- empty state ---------------- */ if (nodes.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
            className: "flex h-full w-48 flex-col border-l border-[#3E3E3E] bg-[#2C2C2C] sm:w-52 lg:w-60",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex h-9 shrink-0 items-center px-3",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "iris-section-title text-[11px]",
                        children: "Design"
                    }, void 0, false, {
                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                        lineNumber: 202,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                    lineNumber: 201,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "iris-scroll flex-1 overflow-y-auto",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                            title: "Page",
                            children: page ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                className: "iris-input",
                                defaultValue: page.name,
                                "aria-label": "Page name",
                                spellCheck: false,
                                onBlur: (e)=>{
                                    const v = e.target.value.trim();
                                    if (v && v !== page.name) actions.renamePage(page.id, v);
                                    else e.target.value = page.name;
                                },
                                onKeyDown: (e)=>{
                                    e.stopPropagation();
                                    if (e.key === 'Enter') e.target.blur();
                                }
                            }, page.id, false, {
                                fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                lineNumber: 207,
                                columnNumber: 15
                            }, this) : null
                        }, void 0, false, {
                            fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                            lineNumber: 205,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                            title: "Canvas",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-2.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[11px] text-[#C9C9C9]",
                                                children: "Background"
                                            }, void 0, false, {
                                                fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                lineNumber: 229,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-24",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$ui$2f$ColorField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ColorField"], {
                                                    value: settings.bg,
                                                    allowNone: false,
                                                    ariaLabel: "Canvas background",
                                                    onChange: (v)=>actions.setSettings({
                                                            bg: v ?? '#242424'
                                                        })
                                                }, void 0, false, {
                                                    fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                    lineNumber: 231,
                                                    columnNumber: 19
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                lineNumber: 230,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                        lineNumber: 228,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[11px] text-[#C9C9C9]",
                                                children: "Layout grid"
                                            }, void 0, false, {
                                                fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                lineNumber: 240,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Switch"], {
                                                checked: settings.grid.show,
                                                "aria-label": "Show layout grid",
                                                className: "data-[state=checked]:bg-[#8B5CF6] data-[state=unchecked]:bg-[#383838]",
                                                onCheckedChange: (v)=>actions.setGridSettings({
                                                        show: v
                                                    })
                                            }, void 0, false, {
                                                fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                lineNumber: 241,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                        lineNumber: 239,
                                        columnNumber: 15
                                    }, this),
                                    settings.grid.show ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldLabel, {
                                                        children: "G"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                        lineNumber: 251,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$ui$2f$NumberField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberField"], {
                                                        value: settings.grid.size,
                                                        min: 1,
                                                        max: 200,
                                                        ariaLabel: "Grid size",
                                                        onChange: (v)=>actions.setGridSettings({
                                                                size: Math.max(1, v)
                                                            })
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                        lineNumber: 252,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "ml-1 text-[10px] text-[#6F6F6F]",
                                                        children: "px"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                        lineNumber: 259,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                lineNumber: 250,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[11px] text-[#C9C9C9]",
                                                        children: "Snap to grid"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                        lineNumber: 262,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Switch"], {
                                                        checked: settings.grid.snap,
                                                        "aria-label": "Snap to grid",
                                                        className: "data-[state=checked]:bg-[#8B5CF6] data-[state=unchecked]:bg-[#383838]",
                                                        onCheckedChange: (v)=>actions.setGridSettings({
                                                                snap: v
                                                            })
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                        lineNumber: 263,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                lineNumber: 261,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true) : null,
                                    (settings.guidesX.length > 0 || settings.guidesY.length > 0) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "h-7 rounded-md bg-[#383838] text-[11px] text-[#C9C9C9] transition-colors hover:bg-[#474747] hover:text-white",
                                        onClick: actions.clearGuides,
                                        children: [
                                            "Clear ",
                                            settings.guidesX.length + settings.guidesY.length,
                                            " guide",
                                            settings.guidesX.length + settings.guidesY.length === 1 ? '' : 's'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                        lineNumber: 273,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                lineNumber: 227,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                            lineNumber: 226,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                            title: "Quick tips",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "space-y-1.5 text-[11px] leading-4 text-[#9A9A9A]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "V Move · F Frame · R Rect · O Ellipse"
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                        lineNumber: 287,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "Y Polygon · S Star · A Arrow · P Pen"
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                        lineNumber: 288,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "T Text · I Eyedropper · M Image"
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                        lineNumber: 289,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "Space + drag to pan · Ctrl + wheel to zoom"
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                        lineNumber: 290,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "Drag from a ruler to create a guide"
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                        lineNumber: 291,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "Shift+H / Shift+V flip · Shift drag to constrain"
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                        lineNumber: 292,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: "Everything is saved locally, automatically"
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                        lineNumber: 293,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                lineNumber: 286,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                            lineNumber: 285,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                    lineNumber: 204,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
            lineNumber: 200,
            columnNumber: 7
        }, this);
    }
    /* ---------------- selection state ---------------- */ return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: "flex h-full w-48 flex-col border-l border-[#3E3E3E] bg-[#2C2C2C] sm:w-52 lg:w-60",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex h-9 shrink-0 items-center px-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "iris-section-title text-[11px]",
                        children: single ? single.name : `${nodes.length} selected`
                    }, void 0, false, {
                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                        lineNumber: 305,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ml-auto flex items-center gap-0.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconBtn, {
                                label: single?.locked ? 'Unlock' : 'Lock',
                                Icon: single?.locked ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Unlock$3e$__["Unlock"] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"],
                                onClick: actions.toggleLockSelection
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                lineNumber: 309,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconBtn, {
                                label: nodes.every((n)=>n.visible) ? 'Hide' : 'Show',
                                Icon: nodes.every((n)=>n.visible) ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"] : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__EyeOff$3e$__["EyeOff"],
                                onClick: actions.toggleHideSelection
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                lineNumber: 314,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                        lineNumber: 308,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                lineNumber: 304,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "iris-scroll flex-1 overflow-y-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between gap-0.5",
                            role: "group",
                            "aria-label": "Alignment",
                            children: ALIGN_TOOLS.map(({ mode, label, Icon })=>{
                                const disabled = (mode === 'hdist' || mode === 'vdist') && nodes.length < 2;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "flex h-7 w-7 items-center justify-center rounded-md text-[#C9C9C9] transition-colors hover:bg-[#474747] hover:text-white disabled:pointer-events-none disabled:opacity-35",
                                    title: label,
                                    "aria-label": label,
                                    disabled: disabled,
                                    onClick: ()=>actions.alignSelection(mode),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                        size: 14,
                                        strokeWidth: 1.75,
                                        "aria-hidden": true
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                        lineNumber: 338,
                                        columnNumber: 19
                                    }, this)
                                }, mode, false, {
                                    fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                    lineNumber: 329,
                                    columnNumber: 17
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                            lineNumber: 325,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                        lineNumber: 324,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 gap-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldLabel, {
                                                children: "X"
                                            }, void 0, false, {
                                                fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                lineNumber: 349,
                                                columnNumber: 15
                                            }, this),
                                            single ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$ui$2f$NumberField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberField"], {
                                                value: single.x,
                                                ariaLabel: "X position",
                                                onChange: (v)=>actions.updateNodes([
                                                        single.id
                                                    ], {
                                                        x: v
                                                    }, {
                                                        history: 'x'
                                                    })
                                            }, void 0, false, {
                                                fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                lineNumber: 351,
                                                columnNumber: 17
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$ui$2f$NumberField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberField"], {
                                                value: bbox ? Math.round(bbox.x * 100) / 100 : 0,
                                                ariaLabel: "X position",
                                                onChange: (v)=>bbox && actions.moveSelectionWorld(v - bbox.x, 0, 'bbox')
                                            }, void 0, false, {
                                                fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                lineNumber: 357,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                        lineNumber: 348,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldLabel, {
                                                children: "Y"
                                            }, void 0, false, {
                                                fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                lineNumber: 365,
                                                columnNumber: 15
                                            }, this),
                                            single ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$ui$2f$NumberField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberField"], {
                                                value: single.y,
                                                ariaLabel: "Y position",
                                                onChange: (v)=>actions.updateNodes([
                                                        single.id
                                                    ], {
                                                        y: v
                                                    }, {
                                                        history: 'y'
                                                    })
                                            }, void 0, false, {
                                                fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                lineNumber: 367,
                                                columnNumber: 17
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$ui$2f$NumberField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberField"], {
                                                value: bbox ? Math.round(bbox.y * 100) / 100 : 0,
                                                ariaLabel: "Y position",
                                                onChange: (v)=>bbox && actions.moveSelectionWorld(0, v - bbox.y, 'bbox')
                                            }, void 0, false, {
                                                fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                lineNumber: 373,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                        lineNumber: 364,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldLabel, {
                                                children: "W"
                                            }, void 0, false, {
                                                fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                lineNumber: 381,
                                                columnNumber: 15
                                            }, this),
                                            single ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$ui$2f$NumberField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberField"], {
                                                value: single.w,
                                                min: 0,
                                                ariaLabel: "Width",
                                                disabled: single.type === 'text' && single.autoWidth,
                                                onChange: (v)=>actions.setNodeRect(single.id, {
                                                        x: single.x,
                                                        y: single.y,
                                                        w: Math.max(1, v),
                                                        h: single.h
                                                    }, {
                                                        history: 'wh'
                                                    })
                                            }, void 0, false, {
                                                fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                lineNumber: 383,
                                                columnNumber: 17
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$ui$2f$NumberField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberField"], {
                                                value: bbox ? Math.round(bbox.w * 100) / 100 : 0,
                                                min: 1,
                                                ariaLabel: "Width",
                                                disabled: !bbox,
                                                onChange: (v)=>actions.resizeSelectionBox(v, bbox?.h ?? 1)
                                            }, void 0, false, {
                                                fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                lineNumber: 397,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                        lineNumber: 380,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldLabel, {
                                                children: "H"
                                            }, void 0, false, {
                                                fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                lineNumber: 407,
                                                columnNumber: 15
                                            }, this),
                                            single ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$ui$2f$NumberField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberField"], {
                                                value: single.h,
                                                min: 0,
                                                ariaLabel: "Height",
                                                disabled: single.type === 'text',
                                                title: single.type === 'text' ? 'Text height is automatic' : undefined,
                                                onChange: (v)=>actions.setNodeRect(single.id, {
                                                        x: single.x,
                                                        y: single.y,
                                                        w: single.w,
                                                        h: Math.max(1, v)
                                                    }, {
                                                        history: 'wh'
                                                    })
                                            }, void 0, false, {
                                                fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                lineNumber: 409,
                                                columnNumber: 17
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$ui$2f$NumberField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberField"], {
                                                value: bbox ? Math.round(bbox.h * 100) / 100 : 0,
                                                min: 1,
                                                ariaLabel: "Height",
                                                disabled: !bbox,
                                                onChange: (v)=>actions.resizeSelectionBox(bbox?.w ?? 1, v)
                                            }, void 0, false, {
                                                fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                lineNumber: 424,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                        lineNumber: 406,
                                        columnNumber: 13
                                    }, this),
                                    single ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldLabel, {
                                                        children: "∠"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                        lineNumber: 436,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$ui$2f$NumberField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberField"], {
                                                        value: single.rotation,
                                                        min: -360,
                                                        max: 360,
                                                        ariaLabel: "Rotation",
                                                        onChange: (v)=>actions.updateNodes([
                                                                single.id
                                                            ], {
                                                                rotation: v
                                                            }, {
                                                                history: 'rotation'
                                                            })
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                        lineNumber: 437,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                lineNumber: 435,
                                                columnNumber: 17
                                            }, this),
                                            showRadius ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldLabel, {
                                                        children: "⌒"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                        lineNumber: 447,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$ui$2f$NumberField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberField"], {
                                                        value: single.cornerRadius,
                                                        min: 0,
                                                        ariaLabel: "Corner radius",
                                                        onChange: (v)=>actions.updateNodes([
                                                                single.id
                                                            ], {
                                                                cornerRadius: Math.max(0, v)
                                                            }, {
                                                                history: 'radius'
                                                            })
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                        lineNumber: 448,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                lineNumber: 446,
                                                columnNumber: 19
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {}, void 0, false, {
                                                fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                lineNumber: 456,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                lineNumber: 347,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 flex items-center justify-between gap-0.5",
                                role: "group",
                                "aria-label": "Transform",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconBtn, {
                                        label: "Flip horizontal — Shift+H",
                                        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flip$2d$horizontal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FlipHorizontal$3e$__["FlipHorizontal"],
                                        onClick: ()=>actions.flipSelection('h')
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                        lineNumber: 463,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconBtn, {
                                        label: "Flip vertical — Shift+V",
                                        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flip$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FlipVertical$3e$__["FlipVertical"],
                                        onClick: ()=>actions.flipSelection('v')
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                        lineNumber: 464,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconBtn, {
                                        label: "Rotate 90° counter-clockwise",
                                        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"],
                                        onClick: ()=>actions.rotateSelectionBy(-90)
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                        lineNumber: 465,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconBtn, {
                                        label: "Rotate 90° clockwise",
                                        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCw$3e$__["RotateCw"],
                                        onClick: ()=>actions.rotateSelectionBy(90)
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                        lineNumber: 466,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mx-0.5 h-5 w-px bg-[#3E3E3E]",
                                        "aria-hidden": true
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                        lineNumber: 467,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconBtn, {
                                        label: "Send backward — [",
                                        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown$3e$__["ArrowDown"],
                                        onClick: ()=>actions.zorder('backward')
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                        lineNumber: 468,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconBtn, {
                                        label: "Bring forward — ]",
                                        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUp$3e$__["ArrowUp"],
                                        onClick: ()=>actions.zorder('forward')
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                        lineNumber: 469,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconBtn, {
                                        label: "Send to back — Ctrl+[",
                                        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2d$to$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDownToLine$3e$__["ArrowDownToLine"],
                                        onClick: ()=>actions.zorder('back')
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                        lineNumber: 470,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IconBtn, {
                                        label: "Bring to front — Ctrl+]",
                                        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$to$2d$line$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpToLine$3e$__["ArrowUpToLine"],
                                        onClick: ()=>actions.zorder('front')
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                        lineNumber: 471,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                lineNumber: 462,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                        lineNumber: 346,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-1.5 flex items-center justify-between",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[10px] font-semibold uppercase tracking-wider text-[#9A9A9A]",
                                    children: "Opacity"
                                }, void 0, false, {
                                    fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                    lineNumber: 478,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                lineNumber: 477,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$slider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slider"], {
                                        value: [
                                            Math.round((single ? single.opacity : 1) * 100)
                                        ],
                                        min: 0,
                                        max: 100,
                                        step: 1,
                                        "aria-label": "Opacity",
                                        onValueChange: (v)=>{
                                            if (!sliderActiveRef.current) {
                                                sliderActiveRef.current = true;
                                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"].getState().historyBegin();
                                            }
                                            actions.updateNodes(ids, {
                                                opacity: v[0] / 100
                                            }, {
                                                history: false
                                            });
                                        },
                                        onValueCommit: ()=>{
                                            sliderActiveRef.current = false;
                                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"].getState().historyCommit();
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                        lineNumber: 483,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-14 shrink-0",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$ui$2f$NumberField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberField"], {
                                            value: Math.round((single ? single.opacity : 1) * 100),
                                            min: 0,
                                            max: 100,
                                            ariaLabel: "Opacity percent",
                                            onChange: (v)=>actions.updateNodes(ids, {
                                                    opacity: v / 100
                                                }, {
                                                    history: 'opacity'
                                                })
                                        }, void 0, false, {
                                            fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                            lineNumber: 502,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                        lineNumber: 501,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                lineNumber: 482,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2 flex items-center gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldLabel, {
                                        children: "⧉"
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                        lineNumber: 512,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        className: "iris-select",
                                        "aria-label": "Blend mode",
                                        value: single?.blend ?? 'normal',
                                        onChange: (e)=>actions.updateNodes(ids, {
                                                blend: e.target.value
                                            }, {
                                                history: 'blend'
                                            }),
                                        children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$model$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BLEND_MODES"].map((b)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: b,
                                                children: b === 'normal' ? 'Normal' : b.replace('-', ' ')
                                            }, b, false, {
                                                fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                lineNumber: 522,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                        lineNumber: 513,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                lineNumber: 511,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                        lineNumber: 476,
                        columnNumber: 9
                    }, this),
                    showFill && single ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                        title: "Fill",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$ui$2f$ColorField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ColorField"], {
                                value: single.fill,
                                ariaLabel: "Fill",
                                onChange: (v)=>actions.updateNodes([
                                        single.id
                                    ], {
                                        fill: v
                                    }, {
                                        history: 'fill'
                                    })
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                lineNumber: 533,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-2.5 rounded-md border border-[#3E3E3E] p-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center justify-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[10px] font-semibold uppercase tracking-wider text-[#9A9A9A]",
                                                children: "Gradient"
                                            }, void 0, false, {
                                                fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                lineNumber: 540,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Switch"], {
                                                checked: !!single.fillGradient,
                                                "aria-label": "Gradient fill",
                                                className: "data-[state=checked]:bg-[#8B5CF6] data-[state=unchecked]:bg-[#383838]",
                                                onCheckedChange: (on)=>actions.updateNodes([
                                                        single.id
                                                    ], {
                                                        fillGradient: on ? single.fillGradient ?? {
                                                            type: 'linear',
                                                            angle: 90,
                                                            from: single.fill ?? '#8B5CF6',
                                                            to: '#C4B5FD'
                                                        } : null
                                                    }, {
                                                        history: 'gradient'
                                                    })
                                            }, void 0, false, {
                                                fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                lineNumber: 543,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                        lineNumber: 539,
                                        columnNumber: 15
                                    }, this),
                                    single.fillGradient ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-2 flex flex-col gap-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                className: "iris-select",
                                                "aria-label": "Gradient type",
                                                value: single.fillGradient.type,
                                                onChange: (e)=>actions.updateNodes([
                                                        single.id
                                                    ], {
                                                        fillGradient: {
                                                            ...single.fillGradient,
                                                            type: e.target.value
                                                        }
                                                    }, {
                                                        history: 'gradient'
                                                    }),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "linear",
                                                        children: "Linear"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                        lineNumber: 574,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "radial",
                                                        children: "Radial"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                        lineNumber: 575,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                lineNumber: 562,
                                                columnNumber: 19
                                            }, this),
                                            single.fillGradient.type === 'linear' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldLabel, {
                                                        children: "∠"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                        lineNumber: 579,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$ui$2f$NumberField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberField"], {
                                                        value: single.fillGradient.angle,
                                                        min: -360,
                                                        max: 360,
                                                        ariaLabel: "Gradient angle",
                                                        onChange: (v)=>actions.updateNodes([
                                                                single.id
                                                            ], {
                                                                fillGradient: {
                                                                    ...single.fillGradient,
                                                                    angle: v
                                                                }
                                                            }, {
                                                                history: 'gradient'
                                                            })
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                        lineNumber: 580,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                lineNumber: 578,
                                                columnNumber: 21
                                            }, this) : null,
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$ui$2f$ColorField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ColorField"], {
                                                            value: single.fillGradient.from,
                                                            allowNone: false,
                                                            ariaLabel: "Gradient start color",
                                                            onChange: (v)=>actions.updateNodes([
                                                                    single.id
                                                                ], {
                                                                    fillGradient: {
                                                                        ...single.fillGradient,
                                                                        from: v ?? '#8B5CF6'
                                                                    }
                                                                }, {
                                                                    history: 'gradient'
                                                                })
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                            lineNumber: 597,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                        lineNumber: 596,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$ui$2f$ColorField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ColorField"], {
                                                            value: single.fillGradient.to,
                                                            allowNone: false,
                                                            ariaLabel: "Gradient end color",
                                                            onChange: (v)=>actions.updateNodes([
                                                                    single.id
                                                                ], {
                                                                    fillGradient: {
                                                                        ...single.fillGradient,
                                                                        to: v ?? '#C4B5FD'
                                                                    }
                                                                }, {
                                                                    history: 'gradient'
                                                                })
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                            lineNumber: 611,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                        lineNumber: 610,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                lineNumber: 595,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                        lineNumber: 561,
                                        columnNumber: 17
                                    }, this) : null
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                lineNumber: 538,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                        lineNumber: 532,
                        columnNumber: 11
                    }, this) : null,
                    showStroke && single ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                        title: "Stroke",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-1.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$ui$2f$ColorField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ColorField"], {
                                    value: single.stroke,
                                    ariaLabel: "Stroke",
                                    onChange: (v)=>actions.updateNodes([
                                            single.id
                                        ], {
                                            stroke: v
                                        }, {
                                            history: 'stroke'
                                        })
                                }, void 0, false, {
                                    fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                    lineNumber: 635,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldLabel, {
                                                    children: "W"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                    lineNumber: 642,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$ui$2f$NumberField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberField"], {
                                                    value: single.strokeWidth,
                                                    min: 0,
                                                    max: 100,
                                                    ariaLabel: "Stroke weight",
                                                    onChange: (v)=>actions.updateNodes([
                                                            single.id
                                                        ], {
                                                            strokeWidth: Math.max(0, v)
                                                        }, {
                                                            history: 'strokeW'
                                                        })
                                                }, void 0, false, {
                                                    fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                    lineNumber: 643,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                            lineNumber: 641,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            className: "iris-select",
                                            "aria-label": "Stroke style",
                                            value: single.dash,
                                            onChange: (e)=>actions.updateNodes([
                                                    single.id
                                                ], {
                                                    dash: e.target.value
                                                }, {
                                                    history: 'strokeW'
                                                }),
                                            children: DASH_STYLES.map((d)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: d.value,
                                                    children: d.label
                                                }, d.value, false, {
                                                    fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                    lineNumber: 662,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                            lineNumber: 653,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                    lineNumber: 640,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                            lineNumber: 634,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                        lineNumber: 633,
                        columnNumber: 11
                    }, this) : null,
                    single ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                        title: "Effects",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-2.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-md border border-[#3E3E3E] p-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[11px] text-[#C9C9C9]",
                                                    children: "Drop shadow"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                    lineNumber: 678,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Switch"], {
                                                    checked: !!single.shadow,
                                                    "aria-label": "Drop shadow",
                                                    className: "data-[state=checked]:bg-[#8B5CF6] data-[state=unchecked]:bg-[#383838]",
                                                    onCheckedChange: (on)=>actions.updateNodes([
                                                            single.id
                                                        ], {
                                                            shadow: on ? single.shadow ?? {
                                                                x: 0,
                                                                y: 4,
                                                                blur: 12,
                                                                color: '#000000'
                                                            } : null
                                                        }, {
                                                            history: 'shadow'
                                                        })
                                                }, void 0, false, {
                                                    fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                    lineNumber: 679,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                            lineNumber: 677,
                                            columnNumber: 17
                                        }, this),
                                        single.shadow ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-2 grid grid-cols-3 gap-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldLabel, {
                                                            children: "X"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                            lineNumber: 695,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$ui$2f$NumberField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberField"], {
                                                            value: single.shadow.x,
                                                            ariaLabel: "Shadow X",
                                                            onChange: (v)=>actions.updateNodes([
                                                                    single.id
                                                                ], {
                                                                    shadow: {
                                                                        ...single.shadow,
                                                                        x: v
                                                                    }
                                                                }, {
                                                                    history: 'shadow'
                                                                })
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                            lineNumber: 696,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                    lineNumber: 694,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldLabel, {
                                                            children: "Y"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                            lineNumber: 709,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$ui$2f$NumberField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberField"], {
                                                            value: single.shadow.y,
                                                            ariaLabel: "Shadow Y",
                                                            onChange: (v)=>actions.updateNodes([
                                                                    single.id
                                                                ], {
                                                                    shadow: {
                                                                        ...single.shadow,
                                                                        y: v
                                                                    }
                                                                }, {
                                                                    history: 'shadow'
                                                                })
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                            lineNumber: 710,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                    lineNumber: 708,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldLabel, {
                                                            children: "B"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                            lineNumber: 723,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$ui$2f$NumberField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberField"], {
                                                            value: single.shadow.blur,
                                                            min: 0,
                                                            ariaLabel: "Shadow blur",
                                                            onChange: (v)=>actions.updateNodes([
                                                                    single.id
                                                                ], {
                                                                    shadow: {
                                                                        ...single.shadow,
                                                                        blur: Math.max(0, v)
                                                                    }
                                                                }, {
                                                                    history: 'shadow'
                                                                })
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                            lineNumber: 724,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                    lineNumber: 722,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "col-span-3",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$ui$2f$ColorField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ColorField"], {
                                                        value: single.shadow.color,
                                                        allowNone: false,
                                                        ariaLabel: "Shadow color",
                                                        onChange: (v)=>actions.updateNodes([
                                                                single.id
                                                            ], {
                                                                shadow: {
                                                                    ...single.shadow,
                                                                    color: v ?? '#000000'
                                                                }
                                                            }, {
                                                                history: 'shadow'
                                                            })
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                        lineNumber: 738,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                    lineNumber: 737,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                            lineNumber: 693,
                                            columnNumber: 19
                                        }, this) : null
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                    lineNumber: 676,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldLabel, {
                                            children: "¤"
                                        }, void 0, false, {
                                            fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                            lineNumber: 755,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "w-16 shrink-0 text-[11px] text-[#C9C9C9]",
                                            children: "Layer blur"
                                        }, void 0, false, {
                                            fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                            lineNumber: 756,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$ui$2f$NumberField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberField"], {
                                            value: single.blur,
                                            min: 0,
                                            max: 100,
                                            ariaLabel: "Layer blur",
                                            onChange: (v)=>actions.updateNodes([
                                                    single.id
                                                ], {
                                                    blur: Math.max(0, v)
                                                }, {
                                                    history: 'blur'
                                                })
                                        }, void 0, false, {
                                            fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                            lineNumber: 757,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                    lineNumber: 754,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                            lineNumber: 675,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                        lineNumber: 674,
                        columnNumber: 11
                    }, this) : null,
                    showPolygon && single ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                        title: "Polygon",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldLabel, {
                                    children: "N"
                                }, void 0, false, {
                                    fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                    lineNumber: 773,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$ui$2f$NumberField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberField"], {
                                    value: single.sides,
                                    min: 3,
                                    max: 24,
                                    step: 1,
                                    ariaLabel: "Sides",
                                    onChange: (v)=>actions.updateNodes([
                                            single.id
                                        ], {
                                            sides: Math.min(24, Math.max(3, Math.round(v)))
                                        }, {
                                            history: 'sides'
                                        })
                                }, void 0, false, {
                                    fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                    lineNumber: 774,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "ml-1 text-[10px] text-[#6F6F6F]",
                                    children: "sides"
                                }, void 0, false, {
                                    fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                    lineNumber: 782,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                            lineNumber: 772,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                        lineNumber: 771,
                        columnNumber: 11
                    }, this) : null,
                    showStar && single ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                        title: "Star",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-1.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldLabel, {
                                            children: "N"
                                        }, void 0, false, {
                                            fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                            lineNumber: 790,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$ui$2f$NumberField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberField"], {
                                            value: single.starPoints,
                                            min: 3,
                                            max: 24,
                                            step: 1,
                                            ariaLabel: "Points",
                                            onChange: (v)=>actions.updateNodes([
                                                    single.id
                                                ], {
                                                    starPoints: Math.min(24, Math.max(3, Math.round(v)))
                                                }, {
                                                    history: 'points'
                                                })
                                        }, void 0, false, {
                                            fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                            lineNumber: 791,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "ml-1 text-[10px] text-[#6F6F6F]",
                                            children: "points"
                                        }, void 0, false, {
                                            fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                            lineNumber: 799,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                    lineNumber: 789,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldLabel, {
                                            children: "R"
                                        }, void 0, false, {
                                            fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                            lineNumber: 802,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$slider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slider"], {
                                            value: [
                                                Math.round(single.innerRadius * 100)
                                            ],
                                            min: 10,
                                            max: 95,
                                            step: 1,
                                            "aria-label": "Inner radius",
                                            onValueChange: (v)=>{
                                                if (!sliderActiveRef.current) {
                                                    sliderActiveRef.current = true;
                                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"].getState().historyBegin();
                                                }
                                                actions.updateNodes([
                                                    single.id
                                                ], {
                                                    innerRadius: v[0] / 100
                                                }, {
                                                    history: false
                                                });
                                            },
                                            onValueCommit: ()=>{
                                                sliderActiveRef.current = false;
                                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"].getState().historyCommit();
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                            lineNumber: 803,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "w-8 shrink-0 text-right text-[10px] tabular-nums text-[#9A9A9A]",
                                            children: [
                                                Math.round(single.innerRadius * 100),
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                            lineNumber: 821,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                    lineNumber: 801,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                            lineNumber: 788,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                        lineNumber: 787,
                        columnNumber: 11
                    }, this) : null,
                    showArrowHeads && single ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                        title: "Arrow",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-2 gap-1.5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    className: "iris-select",
                                    "aria-label": "Start head",
                                    value: single.arrowStart,
                                    onChange: (e)=>actions.updateNodes([
                                            single.id
                                        ], {
                                            arrowStart: e.target.value
                                        }, {
                                            history: 'arrow'
                                        }),
                                    children: ARROW_HEADS.map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: h.value,
                                            children: [
                                                "Start: ",
                                                h.label
                                            ]
                                        }, h.value, true, {
                                            fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                            lineNumber: 842,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                    lineNumber: 833,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    className: "iris-select",
                                    "aria-label": "End head",
                                    value: single.arrowEnd,
                                    onChange: (e)=>actions.updateNodes([
                                            single.id
                                        ], {
                                            arrowEnd: e.target.value
                                        }, {
                                            history: 'arrow'
                                        }),
                                    children: ARROW_HEADS.map((h)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: h.value,
                                            children: [
                                                "End: ",
                                                h.label
                                            ]
                                        }, h.value, true, {
                                            fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                            lineNumber: 856,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                    lineNumber: 847,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                            lineNumber: 832,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                        lineNumber: 831,
                        columnNumber: 11
                    }, this) : null,
                    showText && single ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                        title: "Text",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                    className: "iris-select",
                                    "aria-label": "Font family",
                                    value: single.fontFamily,
                                    onChange: (e)=>actions.updateNodes([
                                            single.id
                                        ], {
                                            fontFamily: e.target.value
                                        }, {
                                            history: 'font'
                                        }),
                                    children: FONT_FAMILIES.map((f)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                            value: f,
                                            children: f
                                        }, f, false, {
                                            fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                            lineNumber: 878,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                    lineNumber: 869,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldLabel, {
                                                    children: "Aa"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                    lineNumber: 885,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$ui$2f$NumberField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberField"], {
                                                    value: single.fontSize,
                                                    min: 1,
                                                    ariaLabel: "Font size",
                                                    onChange: (v)=>actions.updateNodes([
                                                            single.id
                                                        ], {
                                                            fontSize: Math.max(1, v)
                                                        }, {
                                                            history: 'font'
                                                        })
                                                }, void 0, false, {
                                                    fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                    lineNumber: 886,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                            lineNumber: 884,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldLabel, {
                                                    children: "LH"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                    lineNumber: 894,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$ui$2f$NumberField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberField"], {
                                                    value: single.lineHeight,
                                                    min: 0.5,
                                                    step: 0.05,
                                                    ariaLabel: "Line height",
                                                    onChange: (v)=>actions.updateNodes([
                                                            single.id
                                                        ], {
                                                            lineHeight: Math.max(0.5, v)
                                                        }, {
                                                            history: 'lh'
                                                        })
                                                }, void 0, false, {
                                                    fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                    lineNumber: 895,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                            lineNumber: 893,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                    lineNumber: 883,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FieldLabel, {
                                                    children: "VA"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                    lineNumber: 908,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$ui$2f$NumberField$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NumberField"], {
                                                    value: single.letterSpacing,
                                                    step: 0.1,
                                                    ariaLabel: "Letter spacing",
                                                    onChange: (v)=>actions.updateNodes([
                                                            single.id
                                                        ], {
                                                            letterSpacing: v
                                                        }, {
                                                            history: 'spacing'
                                                        })
                                                }, void 0, false, {
                                                    fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                    lineNumber: 909,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                            lineNumber: 907,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            className: "iris-select",
                                            "aria-label": "Text case",
                                            value: single.textCase,
                                            onChange: (e)=>actions.updateNodes([
                                                    single.id
                                                ], {
                                                    textCase: e.target.value
                                                }, {
                                                    history: 'case'
                                                }),
                                            children: TEXT_CASES.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: c.value,
                                                    children: c.label
                                                }, c.value, false, {
                                                    fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                    lineNumber: 927,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                            lineNumber: 918,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                    lineNumber: 906,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                            className: "iris-select",
                                            "aria-label": "Font weight",
                                            value: single.fontWeight,
                                            onChange: (e)=>actions.updateNodes([
                                                    single.id
                                                ], {
                                                    fontWeight: Number(e.target.value)
                                                }, {
                                                    history: 'font'
                                                }),
                                            children: FONT_WEIGHTS.map((w)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                    value: w.value,
                                                    children: w.label
                                                }, w.value, false, {
                                                    fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                    lineNumber: 943,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                            lineNumber: 934,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-0.5",
                                            role: "group",
                                            "aria-label": "Text alignment",
                                            children: [
                                                {
                                                    a: 'left',
                                                    label: 'Align text left',
                                                    Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$align$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignLeft$3e$__["AlignLeft"]
                                                },
                                                {
                                                    a: 'center',
                                                    label: 'Align text center',
                                                    Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$align$2d$center$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignCenter$3e$__["AlignCenter"]
                                                },
                                                {
                                                    a: 'right',
                                                    label: 'Align text right',
                                                    Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$align$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__AlignRight$3e$__["AlignRight"]
                                                }
                                            ].map(({ a, label, Icon })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    title: label,
                                                    "aria-label": label,
                                                    "aria-pressed": single.textAlign === a,
                                                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('flex h-[26px] flex-1 items-center justify-center rounded-md border border-transparent transition-colors', single.textAlign === a ? 'border-[#4E4E4E] bg-[#474747] text-white' : 'text-[#C9C9C9] hover:bg-[#383838]'),
                                                    onClick: ()=>actions.updateNodes([
                                                            single.id
                                                        ], {
                                                            textAlign: a
                                                        }, {
                                                            history: 'alignText'
                                                        }),
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                        size: 12,
                                                        strokeWidth: 2,
                                                        "aria-hidden": true
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                        lineNumber: 970,
                                                        columnNumber: 23
                                                    }, this)
                                                }, a, false, {
                                                    fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                                    lineNumber: 956,
                                                    columnNumber: 21
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                            lineNumber: 948,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                    lineNumber: 933,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-1.5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            "aria-pressed": single.underline,
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('h-7 flex-1 rounded-md text-[11px] underline decoration-1 underline-offset-2 transition-colors', single.underline ? 'bg-[#474747] text-white' : 'bg-[#383838] text-[#C9C9C9] hover:bg-[#474747] hover:text-white'),
                                            "aria-label": "Underline",
                                            onClick: ()=>actions.updateNodes([
                                                    single.id
                                                ], {
                                                    underline: !single.underline
                                                }, {
                                                    history: 'textDeco'
                                                }),
                                            children: "Underline"
                                        }, void 0, false, {
                                            fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                            lineNumber: 976,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            "aria-pressed": single.strike,
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('h-7 flex-1 rounded-md text-[11px] line-through transition-colors', single.strike ? 'bg-[#474747] text-white' : 'bg-[#383838] text-[#C9C9C9] hover:bg-[#474747] hover:text-white'),
                                            "aria-label": "Strikethrough",
                                            onClick: ()=>actions.updateNodes([
                                                    single.id
                                                ], {
                                                    strike: !single.strike
                                                }, {
                                                    history: 'textDeco'
                                                }),
                                            children: "Strike"
                                        }, void 0, false, {
                                            fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                            lineNumber: 988,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            "aria-pressed": single.autoWidth,
                                            title: "Auto width",
                                            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('h-7 flex-1 rounded-md text-[11px] transition-colors', single.autoWidth ? 'bg-[#474747] text-white' : 'bg-[#383838] text-[#C9C9C9] hover:bg-[#474747] hover:text-white'),
                                            onClick: ()=>actions.updateNodes([
                                                    single.id
                                                ], {
                                                    autoWidth: !single.autoWidth
                                                }, {
                                                    history: 'autowidth'
                                                }),
                                            children: "Auto"
                                        }, void 0, false, {
                                            fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                            lineNumber: 1000,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                    lineNumber: 975,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "h-7 rounded-md bg-[#383838] text-[11px] text-[#C9C9C9] transition-colors hover:bg-[#474747] hover:text-white",
                                    onClick: ()=>actions.setEditingText(single.id),
                                    children: "Edit text"
                                }, void 0, false, {
                                    fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                    lineNumber: 1013,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                            lineNumber: 868,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                        lineNumber: 867,
                        columnNumber: 11
                    }, this) : null,
                    showClip && single ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                        title: "Frame",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-[11px] text-[#C9C9C9]",
                                    children: "Clip content"
                                }, void 0, false, {
                                    fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                    lineNumber: 1028,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Switch"], {
                                    checked: single.clip,
                                    "aria-label": "Clip content",
                                    className: "data-[state=checked]:bg-[#8B5CF6] data-[state=unchecked]:bg-[#383838]",
                                    onCheckedChange: (v)=>actions.updateNodes([
                                            single.id
                                        ], {
                                            clip: v
                                        }, {
                                            history: 'clip'
                                        })
                                }, void 0, false, {
                                    fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                    lineNumber: 1029,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                            lineNumber: 1027,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                        lineNumber: 1026,
                        columnNumber: 11
                    }, this) : null,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Section, {
                        title: "Export",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "h-7 flex-1 rounded-md bg-[#383838] text-[11px] text-[#C9C9C9] transition-colors hover:bg-[#474747] hover:text-white",
                                        onClick: ()=>void (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$export$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["exportPNG"])('selection', 1),
                                        children: "PNG 1x"
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                        lineNumber: 1042,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "h-7 flex-1 rounded-md bg-[#383838] text-[11px] text-[#C9C9C9] transition-colors hover:bg-[#474747] hover:text-white",
                                        onClick: ()=>void (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$export$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["exportPNG"])('selection', 2),
                                        children: "PNG 2x"
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                        lineNumber: 1049,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        className: "h-7 flex-1 rounded-md bg-[#383838] text-[11px] text-[#C9C9C9] transition-colors hover:bg-[#474747] hover:text-white",
                                        onClick: ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$export$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["exportSVG"])('selection'),
                                        children: "SVG"
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                        lineNumber: 1056,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                lineNumber: 1041,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-1.5 text-[10px] text-[#6F6F6F]",
                                children: "Exports the current selection"
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                                lineNumber: 1064,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                        lineNumber: 1040,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
                lineNumber: 322,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/iris/ui/PropertiesPanel.tsx",
        lineNumber: 303,
        columnNumber: 5
    }, this);
}
_s(PropertiesPanel, "r2IiWLz4ti4pgBlYU6oGiXzPtpM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelectedNodes"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"]
    ];
});
_c3 = PropertiesPanel;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "Section");
__turbopack_context__.k.register(_c1, "FieldLabel");
__turbopack_context__.k.register(_c2, "IconBtn");
__turbopack_context__.k.register(_c3, "PropertiesPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/iris/ui/TextEditorOverlay.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "TextEditorOverlay",
    ()=>TextEditorOverlay
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/**
 * On-canvas text editing overlay: a transparent textarea positioned,
 * scaled and rotated to match the text node.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/engine/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/engine/geometry.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function TextEditorOverlay() {
    _s();
    const editingTextId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"])({
        "TextEditorOverlay.useIris[editingTextId]": (s)=>s.editingTextId
    }["TextEditorOverlay.useIris[editingTextId]"]);
    const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"])({
        "TextEditorOverlay.useIris[doc]": (s)=>s.doc
    }["TextEditorOverlay.useIris[doc]"]);
    const viewport = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"])({
        "TextEditorOverlay.useIris[viewport]": (s)=>s.viewport
    }["TextEditorOverlay.useIris[viewport]"]);
    const rulers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"])({
        "TextEditorOverlay.useIris[rulers]": (s)=>s.viewFlags.rulers
    }["TextEditorOverlay.useIris[rulers]"]);
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const node = editingTextId ? doc.nodesById[editingTextId] : null;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TextEditorOverlay.useEffect": ()=>{
            if (!node || node.type !== 'text') return;
            const id = node.id;
            const initialText = node.text;
            const start = Date.now();
            const st = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"].getState();
            st.historyBegin();
            const ta = ref.current;
            if (ta) {
                ta.focus();
                ta.select();
            }
            return ({
                "TextEditorOverlay.useEffect": ()=>{
                    const s2 = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"].getState();
                    const n = s2.doc.nodesById[id];
                    const elapsed = Date.now() - start;
                    const changed = !!n && n.text !== initialText;
                    // guard against React strict-mode double-mount remounts
                    if (elapsed < 80 && !changed) {
                        return;
                    }
                    if (n && n.type === 'text' && n.text.trim().length > 0) {
                        s2.historyCommit();
                    } else if (n) {
                        s2.historyCancel();
                        s2.deleteNodes([
                            id
                        ]);
                    } else {
                        s2.historyCancel();
                    }
                }
            })["TextEditorOverlay.useEffect"];
        }
    }["TextEditorOverlay.useEffect"], [
        editingTextId
    ]);
    if (!node || node.type !== 'text') return null;
    const W = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nodeWorldMatrix"])(doc, node);
    const tl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mApply"])(W, 0, 0);
    const origin = rulers ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RULER"] : 0;
    const p = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["worldToScreen"])(viewport, tl.x, tl.y);
    const angleDeg = Math.atan2(W.b, W.a) * 180 / Math.PI;
    const width = Math.max(node.w, 2) * viewport.zoom;
    const height = Math.max(node.h, node.fontSize * node.lineHeight) * viewport.zoom;
    const style = {
        left: p.x + origin,
        top: p.y + origin,
        width,
        minHeight: height,
        transform: angleDeg ? `rotate(${angleDeg}deg)` : undefined,
        fontFamily: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cssFontFamily"])(node.fontFamily),
        fontSize: node.fontSize * viewport.zoom,
        fontWeight: node.fontWeight,
        lineHeight: `${node.fontSize * node.lineHeight * viewport.zoom}px`,
        textAlign: node.textAlign,
        color: node.fill ?? '#000000',
        caretColor: '#8B5CF6'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
        ref: ref,
        className: "iris-text-overlay",
        style: style,
        value: node.text,
        onChange: (e)=>{
            const st = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"].getState();
            const text = e.target.value;
            const n = st.doc.nodesById[st.editingTextId ?? ''];
            if (!n || n.type !== 'text') return;
            const m = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["measureText"])({
                ...n,
                text
            });
            st.updateNodes([
                n.id
            ], {
                text,
                ...n.autoWidth ? {
                    w: Math.max(2, Math.ceil(m.width) + 2)
                } : {},
                h: Math.max(1, Math.ceil(m.height))
            }, {
                history: false
            });
        },
        onKeyDown: (e)=>{
            if (e.key === 'Escape') {
                e.preventDefault();
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"].getState().setEditingText(null);
            }
            e.stopPropagation();
        },
        onBlur: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"].getState().setEditingText(null),
        spellCheck: false,
        "aria-label": "Edit text"
    }, void 0, false, {
        fileName: "[project]/src/iris/ui/TextEditorOverlay.tsx",
        lineNumber: 86,
        columnNumber: 5
    }, this);
}
_s(TextEditorOverlay, "Pt8+u+wmHsiyrMC2+srCDYrPbug=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"]
    ];
});
_c = TextEditorOverlay;
var _c;
__turbopack_context__.k.register(_c, "TextEditorOverlay");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/iris/ui/CanvasView.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CanvasView",
    ()=>CanvasView
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/**
 * Canvas host: wires the renderer + tool state machine to a full-size canvas.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$renderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/engine/renderer.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$tools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/engine/tools.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$ui$2f$TextEditorOverlay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/ui/TextEditorOverlay.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
function CanvasView() {
    _s();
    const hostRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CanvasView.useEffect": ()=>{
            const canvas = canvasRef.current;
            if (!canvas) return;
            const disposeRenderer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$renderer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initRenderer"])(canvas);
            const disposeTools = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$tools$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["initTools"])(canvas);
            return ({
                "CanvasView.useEffect": ()=>{
                    disposeTools();
                    disposeRenderer();
                }
            })["CanvasView.useEffect"];
        }
    }["CanvasView.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: hostRef,
        className: "absolute inset-0 overflow-hidden",
        "aria-label": "Design canvas",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
                ref: canvasRef,
                className: "absolute inset-0 h-full w-full",
                style: {
                    touchAction: 'none'
                }
            }, void 0, false, {
                fileName: "[project]/src/iris/ui/CanvasView.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$ui$2f$TextEditorOverlay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TextEditorOverlay"], {}, void 0, false, {
                fileName: "[project]/src/iris/ui/CanvasView.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/iris/ui/CanvasView.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_s(CanvasView, "JB15BDk2dnxB9zQFDm1iVK4Z/so=");
_c = CanvasView;
var _c;
__turbopack_context__.k.register(_c, "CanvasView");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/iris/ui/Toolbar.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Toolbar",
    ()=>Toolbar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/**
 * Bottom-center floating toolbar (Figma UI3 style, per spec screenshots).
 * Grouped tools with chevron dropdowns: Move / Frame / Shape / Pen / Text /
 * Actions, then Comment, a divider and the view toggles (hand, rulers, grid,
 * inspect). Dropdown rows: checkmark + icon + label + right-aligned shortcut,
 * selected row highlighted in Iris blue.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$braces$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Braces$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/braces.js [app-client] (ecmascript) <export default as Braces>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle.js [app-client] (ecmascript) <export default as Circle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2d$xml$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Code2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/code-xml.js [app-client] (ecmascript) <export default as Code2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$frame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Frame$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/frame.js [app-client] (ecmascript) <export default as Frame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grid$2d$3x3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid3x3$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/grid-3x3.js [app-client] (ecmascript) <export default as Grid3x3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hand$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hand$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/hand.js [app-client] (ecmascript) <export default as Hand>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hexagon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hexagon$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/hexagon.js [app-client] (ecmascript) <export default as Hexagon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImagePlus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/image-plus.js [app-client] (ecmascript) <export default as ImagePlus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-circle.js [app-client] (ecmascript) <export default as MessageCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mouse$2d$pointer$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MousePointer2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mouse-pointer-2.js [app-client] (ecmascript) <export default as MousePointer2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$move$2d$up$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoveUpRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/move-up-right.js [app-client] (ecmascript) <export default as MoveUpRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pencil.js [app-client] (ecmascript) <export default as Pencil>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2d$tool$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PenTool$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pen-tool.js [app-client] (ecmascript) <export default as PenTool>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$presentation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Presentation$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/presentation.js [app-client] (ecmascript) <export default as Presentation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ruler$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ruler$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/ruler.js [app-client] (ecmascript) <export default as Ruler>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/save.js [app-client] (ecmascript) <export default as Save>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scale$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scale$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/scale.js [app-client] (ecmascript) <export default as Scale>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$slash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Slash$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/slash.js [app-client] (ecmascript) <export default as Slash>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/square.js [app-client] (ecmascript) <export default as Square>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Type$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/type.js [app-client] (ecmascript) <export default as Type>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/engine/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$files$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/engine/files.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const GROUPS = [
    {
        id: 'move',
        ariaLabel: 'Move tools',
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mouse$2d$pointer$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MousePointer2$3e$__["MousePointer2"],
        options: [
            {
                tool: 'move',
                label: 'Move',
                shortcut: 'V',
                Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mouse$2d$pointer$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MousePointer2$3e$__["MousePointer2"]
            },
            {
                tool: 'scale',
                label: 'Scale',
                shortcut: 'K',
                Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$scale$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Scale$3e$__["Scale"]
            },
            {
                tool: 'hand',
                label: 'Hand',
                shortcut: 'H',
                Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hand$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hand$3e$__["Hand"]
            }
        ]
    },
    {
        id: 'frame',
        ariaLabel: 'Frame tools',
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$frame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Frame$3e$__["Frame"],
        options: [
            {
                tool: 'frame',
                label: 'Frame',
                shortcut: 'F',
                Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$frame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Frame$3e$__["Frame"]
            },
            {
                tool: 'section',
                label: 'Section',
                shortcut: 'Shift+S',
                Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__["Square"]
            },
            {
                tool: 'slice',
                label: 'Slice',
                shortcut: 'S',
                Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$slash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Slash$3e$__["Slash"]
            }
        ]
    },
    {
        id: 'shape',
        ariaLabel: 'Shape tools',
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__["Square"],
        options: [
            {
                tool: 'rect',
                label: 'Rectangle',
                shortcut: 'R',
                Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__["Square"]
            },
            {
                tool: 'line',
                label: 'Line',
                shortcut: 'L',
                Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$slash$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Slash$3e$__["Slash"]
            },
            {
                tool: 'arrow',
                label: 'Arrow',
                shortcut: 'Shift+L',
                Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$move$2d$up$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoveUpRight$3e$__["MoveUpRight"]
            },
            {
                tool: 'ellipse',
                label: 'Ellipse',
                shortcut: 'O',
                Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__["Circle"]
            },
            {
                tool: 'polygon',
                label: 'Polygon',
                shortcut: 'Y',
                Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hexagon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hexagon$3e$__["Hexagon"]
            },
            {
                tool: 'star',
                label: 'Star',
                Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"]
            },
            {
                label: 'Image / video…',
                shortcut: 'Ctrl+Shift+K',
                Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImagePlus$3e$__["ImagePlus"],
                run: ()=>void (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$files$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pickImageFiles"])()
            }
        ]
    },
    {
        id: 'pen',
        ariaLabel: 'Pen tools',
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2d$tool$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PenTool$3e$__["PenTool"],
        options: [
            {
                tool: 'pen',
                label: 'Pen',
                shortcut: 'P',
                Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2d$tool$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PenTool$3e$__["PenTool"]
            },
            {
                tool: 'pencil',
                label: 'Pencil',
                shortcut: 'Shift+P',
                Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pencil$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pencil$3e$__["Pencil"]
            }
        ]
    },
    {
        id: 'text',
        ariaLabel: 'Text tools',
        Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Type$3e$__["Type"],
        options: [
            {
                tool: 'text',
                label: 'Text',
                shortcut: 'T',
                Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Type$3e$__["Type"]
            }
        ]
    }
];
/* ------------------------------------------------------------------ */ /* dropdowns                                                           */ /* ------------------------------------------------------------------ */ function useDropdownCloser(ref, onClose) {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useDropdownCloser.useEffect": ()=>{
            const onDown = {
                "useDropdownCloser.useEffect.onDown": (e)=>{
                    if (ref.current && e.target instanceof Node && !ref.current.contains(e.target)) onClose();
                }
            }["useDropdownCloser.useEffect.onDown"];
            const onKey = {
                "useDropdownCloser.useEffect.onKey": (e)=>{
                    if (e.key === 'Escape') onClose();
                }
            }["useDropdownCloser.useEffect.onKey"];
            window.addEventListener('pointerdown', onDown, true);
            window.addEventListener('keydown', onKey, true);
            return ({
                "useDropdownCloser.useEffect": ()=>{
                    window.removeEventListener('pointerdown', onDown, true);
                    window.removeEventListener('keydown', onKey, true);
                }
            })["useDropdownCloser.useEffect"];
        }
    }["useDropdownCloser.useEffect"], [
        ref,
        onClose
    ]);
}
_s(useDropdownCloser, "OD7bBpZva5O2jO+Puf00hKivP7c=");
function ToolDropdown({ options, onClose }) {
    _s1();
    const tool = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"])({
        "ToolDropdown.useIris[tool]": (s)=>s.tool
    }["ToolDropdown.useIris[tool]"]);
    const setTool = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"])({
        "ToolDropdown.useIris[setTool]": (s)=>s.setTool
    }["ToolDropdown.useIris[setTool]"]);
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    useDropdownCloser(ref, onClose);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        role: "menu",
        "aria-label": "Tool options",
        className: "absolute bottom-full left-1/2 z-50 mb-2 w-[218px] -translate-x-1/2 rounded-lg border border-[#4E4E4E] bg-[#1E1E1E] py-1 shadow-2xl",
        style: {
            animation: 'iris-menu-in 90ms ease-out'
        },
        children: options.map((opt)=>{
            const active = !!opt.tool && tool === opt.tool;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                role: "menuitem",
                "aria-checked": active,
                onClick: ()=>{
                    if (opt.run) opt.run();
                    else if (opt.tool) setTool(opt.tool);
                    onClose();
                },
                className: `mx-1 flex h-8 w-[calc(100%-8px)] items-center gap-2.5 rounded-md px-2 text-left text-[12px] transition-colors ${active ? 'bg-[#0D99FF] text-white' : 'text-[#E5E5E5] hover:bg-[#3A3A3A]'}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex w-3.5 shrink-0 justify-center",
                        "aria-hidden": true,
                        children: active ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                            size: 12,
                            strokeWidth: 2.5
                        }, void 0, false, {
                            fileName: "[project]/src/iris/ui/Toolbar.tsx",
                            lineNumber: 174,
                            columnNumber: 25
                        }, this) : null
                    }, void 0, false, {
                        fileName: "[project]/src/iris/ui/Toolbar.tsx",
                        lineNumber: 173,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(opt.Icon, {
                        size: 14,
                        strokeWidth: 1.75,
                        "aria-hidden": true,
                        className: "shrink-0 opacity-90"
                    }, void 0, false, {
                        fileName: "[project]/src/iris/ui/Toolbar.tsx",
                        lineNumber: 176,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "truncate",
                        children: opt.label
                    }, void 0, false, {
                        fileName: "[project]/src/iris/ui/Toolbar.tsx",
                        lineNumber: 177,
                        columnNumber: 13
                    }, this),
                    opt.shortcut ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `ml-auto pl-4 text-[11px] ${active ? 'text-white/80' : 'text-[#8B8B8B]'}`,
                        children: opt.shortcut
                    }, void 0, false, {
                        fileName: "[project]/src/iris/ui/Toolbar.tsx",
                        lineNumber: 179,
                        columnNumber: 15
                    }, this) : null
                ]
            }, opt.label, true, {
                fileName: "[project]/src/iris/ui/Toolbar.tsx",
                lineNumber: 159,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/src/iris/ui/Toolbar.tsx",
        lineNumber: 149,
        columnNumber: 5
    }, this);
}
_s1(ToolDropdown, "vdnvJUU4Jy7zzbIC+bDqVRm6kxA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"],
        useDropdownCloser
    ];
});
_c = ToolDropdown;
/** A dropdown opened from the Actions ({}) button — quick utility actions. */ function ActionsDropdown({ onClose }) {
    _s2();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    useDropdownCloser(ref, onClose);
    const setPresenting = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"])({
        "ActionsDropdown.useIris[setPresenting]": (s)=>s.setPresenting
    }["ActionsDropdown.useIris[setPresenting]"]);
    const setExportOpen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"])({
        "ActionsDropdown.useIris[setExportOpen]": (s)=>s.setExportOpen
    }["ActionsDropdown.useIris[setExportOpen]"]);
    const setShortcutsOpen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"])({
        "ActionsDropdown.useIris[setShortcutsOpen]": (s)=>s.setShortcutsOpen
    }["ActionsDropdown.useIris[setShortcutsOpen]"]);
    const items = [
        {
            label: 'Presentation',
            shortcut: 'Ctrl+Enter',
            Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$presentation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Presentation$3e$__["Presentation"],
            run: ()=>setPresenting(true)
        },
        {
            label: 'Export…',
            shortcut: 'Ctrl+Shift+E',
            Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"],
            run: ()=>setExportOpen(true)
        },
        {
            label: 'Place image',
            shortcut: 'Ctrl+Shift+K',
            Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImagePlus$3e$__["ImagePlus"],
            run: ()=>void (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$files$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["pickImageFiles"])()
        },
        {
            label: 'Keyboard shortcuts',
            shortcut: '?',
            Icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$braces$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Braces$3e$__["Braces"],
            run: ()=>setShortcutsOpen(true)
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        role: "menu",
        "aria-label": "Actions",
        className: "absolute bottom-full left-1/2 z-50 mb-2 w-[218px] -translate-x-1/2 rounded-lg border border-[#4E4E4E] bg-[#1E1E1E] py-1 shadow-2xl",
        style: {
            animation: 'iris-menu-in 90ms ease-out'
        },
        children: items.map((it)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                role: "menuitem",
                onClick: ()=>{
                    it.run?.();
                    onClose();
                },
                className: "mx-1 flex h-8 w-[calc(100%-8px)] items-center gap-2.5 rounded-md px-2 text-left text-[12px] text-[#E5E5E5] transition-colors hover:bg-[#3A3A3A]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "w-3.5 shrink-0",
                        "aria-hidden": true
                    }, void 0, false, {
                        fileName: "[project]/src/iris/ui/Toolbar.tsx",
                        lineNumber: 224,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(it.Icon, {
                        size: 14,
                        strokeWidth: 1.75,
                        "aria-hidden": true,
                        className: "shrink-0 opacity-90"
                    }, void 0, false, {
                        fileName: "[project]/src/iris/ui/Toolbar.tsx",
                        lineNumber: 225,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "truncate",
                        children: it.label
                    }, void 0, false, {
                        fileName: "[project]/src/iris/ui/Toolbar.tsx",
                        lineNumber: 226,
                        columnNumber: 11
                    }, this),
                    it.shortcut ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "ml-auto pl-4 text-[11px] text-[#8B8B8B]",
                        children: it.shortcut
                    }, void 0, false, {
                        fileName: "[project]/src/iris/ui/Toolbar.tsx",
                        lineNumber: 227,
                        columnNumber: 26
                    }, this) : null
                ]
            }, it.label, true, {
                fileName: "[project]/src/iris/ui/Toolbar.tsx",
                lineNumber: 214,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/iris/ui/Toolbar.tsx",
        lineNumber: 206,
        columnNumber: 5
    }, this);
}
_s2(ActionsDropdown, "dvWy07l+aww2xRSrH+hdr4aKYyo=", false, function() {
    return [
        useDropdownCloser,
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"]
    ];
});
_c1 = ActionsDropdown;
function Toolbar() {
    _s3();
    const tool = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"])({
        "Toolbar.useIris[tool]": (s)=>s.tool
    }["Toolbar.useIris[tool]"]);
    const setTool = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"])({
        "Toolbar.useIris[setTool]": (s)=>s.setTool
    }["Toolbar.useIris[setTool]"]);
    const viewFlags = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"])({
        "Toolbar.useIris[viewFlags]": (s)=>s.viewFlags
    }["Toolbar.useIris[viewFlags]"]);
    const setViewFlag = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"])({
        "Toolbar.useIris[setViewFlag]": (s)=>s.setViewFlag
    }["Toolbar.useIris[setViewFlag]"]);
    const inspectMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"])({
        "Toolbar.useIris[inspectMode]": (s)=>s.inspectMode
    }["Toolbar.useIris[inspectMode]"]);
    const setInspectMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"])({
        "Toolbar.useIris[setInspectMode]": (s)=>s.setInspectMode
    }["Toolbar.useIris[setInspectMode]"]);
    const [openGroup, setOpenGroup] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-center gap-0.5 rounded-xl border border-[#3E3E3E] bg-[#2C2C2C] p-1 shadow-[0_8px_28px_rgba(0,0,0,0.45)]",
        role: "toolbar",
        "aria-label": "Tools",
        children: [
            GROUPS.map((g)=>{
                const activeOpt = g.options.find((o)=>o.tool === tool);
                const Icon = activeOpt?.Icon ?? g.Icon;
                const active = !!activeOpt;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            className: `group flex h-9 items-center gap-0.5 rounded-lg px-1.5 transition-colors ${active ? 'bg-[#0D99FF] text-white' : 'text-[#D0D0D0] hover:bg-[#3A3A3A] hover:text-white'}`,
                            "data-active": active,
                            "aria-pressed": active,
                            "aria-label": g.ariaLabel,
                            "aria-haspopup": "menu",
                            "aria-expanded": openGroup === g.id,
                            title: g.ariaLabel,
                            onClick: ()=>setOpenGroup(openGroup === g.id ? null : g.id),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                    size: 17,
                                    strokeWidth: 1.75,
                                    "aria-hidden": true
                                }, void 0, false, {
                                    fileName: "[project]/src/iris/ui/Toolbar.tsx",
                                    lineNumber: 273,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                    size: 10,
                                    strokeWidth: 2.25,
                                    "aria-hidden": true,
                                    className: active ? 'text-white/85' : 'text-[#8B8B8B] group-hover:text-[#C9C9C9]'
                                }, void 0, false, {
                                    fileName: "[project]/src/iris/ui/Toolbar.tsx",
                                    lineNumber: 274,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/iris/ui/Toolbar.tsx",
                            lineNumber: 260,
                            columnNumber: 13
                        }, this),
                        openGroup === g.id ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ToolDropdown, {
                            options: g.options,
                            onClose: ()=>setOpenGroup(null)
                        }, void 0, false, {
                            fileName: "[project]/src/iris/ui/Toolbar.tsx",
                            lineNumber: 282,
                            columnNumber: 15
                        }, this) : null
                    ]
                }, g.id, true, {
                    fileName: "[project]/src/iris/ui/Toolbar.tsx",
                    lineNumber: 259,
                    columnNumber: 11
                }, this);
            }),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "group flex h-9 items-center gap-0.5 rounded-lg px-1.5 text-[#D0D0D0] transition-colors hover:bg-[#3A3A3A] hover:text-white",
                        "aria-label": "Actions",
                        "aria-haspopup": "menu",
                        "aria-expanded": openGroup === 'actions',
                        title: "Actions",
                        onClick: ()=>setOpenGroup(openGroup === 'actions' ? null : 'actions'),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$braces$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Braces$3e$__["Braces"], {
                                size: 17,
                                strokeWidth: 1.75,
                                "aria-hidden": true
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/Toolbar.tsx",
                                lineNumber: 299,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                size: 10,
                                strokeWidth: 2.25,
                                "aria-hidden": true,
                                className: "text-[#8B8B8B] group-hover:text-[#C9C9C9]"
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/Toolbar.tsx",
                                lineNumber: 300,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/iris/ui/Toolbar.tsx",
                        lineNumber: 290,
                        columnNumber: 9
                    }, this),
                    openGroup === 'actions' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ActionsDropdown, {
                        onClose: ()=>setOpenGroup(null)
                    }, void 0, false, {
                        fileName: "[project]/src/iris/ui/Toolbar.tsx",
                        lineNumber: 302,
                        columnNumber: 36
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/src/iris/ui/Toolbar.tsx",
                lineNumber: 289,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: "iris-pill-btn",
                "data-active": tool === 'comment',
                "aria-pressed": tool === 'comment',
                "aria-label": "Comment (C)",
                title: "Comment (C)",
                onClick: ()=>setTool(tool === 'comment' ? 'move' : 'comment'),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                    size: 17,
                    strokeWidth: 1.75,
                    "aria-hidden": true
                }, void 0, false, {
                    fileName: "[project]/src/iris/ui/Toolbar.tsx",
                    lineNumber: 315,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/iris/ui/Toolbar.tsx",
                lineNumber: 306,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mx-1 h-6 w-px bg-[#3E3E3E]",
                "aria-hidden": true
            }, void 0, false, {
                fileName: "[project]/src/iris/ui/Toolbar.tsx",
                lineNumber: 318,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: "iris-pill-btn",
                "data-active": tool === 'hand',
                "aria-pressed": tool === 'hand',
                "aria-label": "Hand (H)",
                title: "Hand (H)",
                onClick: ()=>setTool(tool === 'hand' ? 'move' : 'hand'),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hand$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hand$3e$__["Hand"], {
                    size: 17,
                    strokeWidth: 1.75,
                    "aria-hidden": true
                }, void 0, false, {
                    fileName: "[project]/src/iris/ui/Toolbar.tsx",
                    lineNumber: 330,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/iris/ui/Toolbar.tsx",
                lineNumber: 321,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: "iris-pill-btn",
                "data-active": viewFlags.rulers,
                "aria-pressed": viewFlags.rulers,
                "aria-label": "Rulers (Shift+R)",
                title: "Rulers (Shift+R)",
                onClick: ()=>setViewFlag('rulers', !viewFlags.rulers),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ruler$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Ruler$3e$__["Ruler"], {
                    size: 17,
                    strokeWidth: 1.75,
                    "aria-hidden": true
                }, void 0, false, {
                    fileName: "[project]/src/iris/ui/Toolbar.tsx",
                    lineNumber: 341,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/iris/ui/Toolbar.tsx",
                lineNumber: 332,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: "iris-pill-btn",
                "data-active": viewFlags.pixelGrid,
                "aria-pressed": viewFlags.pixelGrid,
                "aria-label": "Pixel grid",
                title: "Pixel grid",
                onClick: ()=>setViewFlag('pixelGrid', !viewFlags.pixelGrid),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grid$2d$3x3$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Grid3x3$3e$__["Grid3x3"], {
                    size: 17,
                    strokeWidth: 1.75,
                    "aria-hidden": true
                }, void 0, false, {
                    fileName: "[project]/src/iris/ui/Toolbar.tsx",
                    lineNumber: 352,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/iris/ui/Toolbar.tsx",
                lineNumber: 343,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                className: "iris-pill-btn",
                "data-active": inspectMode,
                "aria-pressed": inspectMode,
                "aria-label": "Inspect code",
                title: "Inspect code",
                onClick: ()=>setInspectMode(!inspectMode),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2d$xml$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Code2$3e$__["Code2"], {
                    size: 17,
                    strokeWidth: 1.75,
                    "aria-hidden": true
                }, void 0, false, {
                    fileName: "[project]/src/iris/ui/Toolbar.tsx",
                    lineNumber: 363,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/iris/ui/Toolbar.tsx",
                lineNumber: 354,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/iris/ui/Toolbar.tsx",
        lineNumber: 249,
        columnNumber: 5
    }, this);
}
_s3(Toolbar, "23EvqGBCejpdja/ivJJX8M25gjU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"]
    ];
});
_c2 = Toolbar;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "ToolDropdown");
__turbopack_context__.k.register(_c1, "ActionsDropdown");
__turbopack_context__.k.register(_c2, "Toolbar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/iris/ui/ContextMenu.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ContextMenu",
    ()=>ContextMenu
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/**
 * Hand-rolled floating context menu (no Radix) rendered at the last
 * right-click position. Clamped to the viewport, closes on outside
 * pointerdown, Escape, window blur, or any other contextmenu event.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2f$shallow$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react/shallow.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/engine/store.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
const MENU_WIDTH = 200;
const MENU_MAX_HEIGHT = 420;
function CtxItem({ label, shortcut, disabled, onClick }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        role: "menuitem",
        disabled: disabled,
        className: "flex h-7 w-full items-center px-2.5 text-left text-[12px] text-[#E5E5E5] hover:bg-[#474747] disabled:pointer-events-none disabled:opacity-40",
        onPointerDown: (e)=>e.stopPropagation(),
        onContextMenu: (e)=>e.stopPropagation(),
        onClick: onClick,
        children: [
            label,
            shortcut ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "ml-auto pl-6 text-[11px] text-[#8B8B8B]",
                children: shortcut
            }, void 0, false, {
                fileName: "[project]/src/iris/ui/ContextMenu.tsx",
                lineNumber: 47,
                columnNumber: 19
            }, this) : null
        ]
    }, void 0, true, {
        fileName: "[project]/src/iris/ui/ContextMenu.tsx",
        lineNumber: 37,
        columnNumber: 5
    }, this);
}
_c = CtxItem;
function ContextMenu() {
    _s();
    const contextMenu = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"])({
        "ContextMenu.useIris[contextMenu]": (s)=>s.contextMenu
    }["ContextMenu.useIris[contextMenu]"]);
    const close = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"])({
        "ContextMenu.useIris[close]": (s)=>s.closeContextMenu
    }["ContextMenu.useIris[close]"]);
    const selection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"])({
        "ContextMenu.useIris[selection]": (s)=>s.selection
    }["ContextMenu.useIris[selection]"]);
    const hasClipboard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"])({
        "ContextMenu.useIris[hasClipboard]": (s)=>!!s.clipboard
    }["ContextMenu.useIris[hasClipboard]"]);
    const actions = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2f$shallow$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useShallow"])({
        "ContextMenu.useIris[actions]": (s)=>({
                paste: s.paste,
                copySelection: s.copySelection,
                duplicateSelection: s.duplicateSelection,
                deleteSelection: s.deleteSelection,
                groupSelection: s.groupSelection,
                ungroupSelection: s.ungroupSelection,
                zorder: s.zorder,
                selectAll: s.selectAll,
                selectSameType: s.selectSameType,
                flipSelection: s.flipSelection,
                rotateSelectionBy: s.rotateSelectionBy,
                toggleLockSelection: s.toggleLockSelection,
                toggleHideSelection: s.toggleHideSelection,
                copyStyle: s.copyStyle,
                pasteStyle: s.pasteStyle,
                hasStyleClipboard: !!s.styleClipboard
            })
    }["ContextMenu.useIris[actions]"]));
    const menuRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const open = contextMenu !== null;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ContextMenu.useEffect": ()=>{
            if (!open) return;
            /* Capture-phase so we run before the canvas tool handlers. Clicks that
       land inside the menu itself are ignored (items also stop propagation). */ const onPointerDown = {
                "ContextMenu.useEffect.onPointerDown": (e)=>{
                    const node = menuRef.current;
                    if (node && e.target instanceof Node && node.contains(e.target)) return;
                    close();
                }
            }["ContextMenu.useEffect.onPointerDown"];
            const onKeyDown = {
                "ContextMenu.useEffect.onKeyDown": (e)=>{
                    if (e.key === 'Escape') close();
                }
            }["ContextMenu.useEffect.onKeyDown"];
            const onContextMenu = {
                "ContextMenu.useEffect.onContextMenu": ()=>close()
            }["ContextMenu.useEffect.onContextMenu"];
            const onBlur = {
                "ContextMenu.useEffect.onBlur": ()=>close()
            }["ContextMenu.useEffect.onBlur"];
            window.addEventListener('pointerdown', onPointerDown, true);
            window.addEventListener('keydown', onKeyDown, true);
            window.addEventListener('contextmenu', onContextMenu, true);
            window.addEventListener('blur', onBlur);
            return ({
                "ContextMenu.useEffect": ()=>{
                    window.removeEventListener('pointerdown', onPointerDown, true);
                    window.removeEventListener('keydown', onKeyDown, true);
                    window.removeEventListener('contextmenu', onContextMenu, true);
                    window.removeEventListener('blur', onBlur);
                }
            })["ContextMenu.useEffect"];
        }
    }["ContextMenu.useEffect"], [
        open,
        close
    ]);
    if (!contextMenu) return null;
    const { x, y, worldX, worldY } = contextMenu;
    const hasSelection = selection.length > 0;
    const pasteHere = ()=>actions.paste({
            x: worldX,
            y: worldY
        });
    const entries = hasSelection ? [
        {
            label: 'Copy',
            shortcut: 'Ctrl+C',
            run: actions.copySelection
        },
        {
            label: 'Paste Here',
            disabled: !hasClipboard,
            run: pasteHere
        },
        {
            label: 'Duplicate',
            shortcut: 'Ctrl+D',
            run: ()=>actions.duplicateSelection()
        },
        {
            label: 'Delete',
            shortcut: 'Del',
            run: actions.deleteSelection
        },
        {
            sep: true
        },
        {
            label: 'Copy Style',
            shortcut: 'Ctrl+Alt+C',
            run: actions.copyStyle
        },
        {
            label: 'Paste Style',
            shortcut: 'Ctrl+Alt+V',
            disabled: !actions.hasStyleClipboard,
            run: actions.pasteStyle
        },
        {
            sep: true
        },
        {
            label: 'Group',
            shortcut: 'Ctrl+G',
            run: actions.groupSelection
        },
        {
            label: 'Ungroup',
            shortcut: 'Ctrl+Shift+G',
            run: actions.ungroupSelection
        },
        {
            sep: true
        },
        {
            label: 'Flip Horizontal',
            shortcut: 'Shift+H',
            run: ()=>actions.flipSelection('h')
        },
        {
            label: 'Flip Vertical',
            shortcut: 'Shift+V',
            run: ()=>actions.flipSelection('v')
        },
        {
            label: 'Rotate 90° CW',
            run: ()=>actions.rotateSelectionBy(90)
        },
        {
            label: 'Rotate 90° CCW',
            run: ()=>actions.rotateSelectionBy(-90)
        },
        {
            sep: true
        },
        {
            label: 'Bring Forward',
            shortcut: ']',
            run: ()=>actions.zorder('forward')
        },
        {
            label: 'Send Backward',
            shortcut: '[',
            run: ()=>actions.zorder('backward')
        },
        {
            label: 'Bring to Front',
            shortcut: 'Ctrl+]',
            run: ()=>actions.zorder('front')
        },
        {
            label: 'Send to Back',
            shortcut: 'Ctrl+[',
            run: ()=>actions.zorder('back')
        },
        {
            sep: true
        },
        {
            label: 'Lock / Unlock',
            shortcut: 'Ctrl+L',
            run: actions.toggleLockSelection
        },
        {
            label: 'Hide / Show',
            shortcut: 'Ctrl+Shift+H',
            run: actions.toggleHideSelection
        }
    ] : [
        {
            label: 'Paste Here',
            disabled: !hasClipboard,
            run: pasteHere
        },
        {
            label: 'Select All',
            shortcut: 'Ctrl+A',
            run: actions.selectAll
        }
    ];
    /* clamp so the menu never spills off-screen */ const left = x + MENU_WIDTH > window.innerWidth ? Math.max(0, x - MENU_WIDTH) : x;
    const top = y + MENU_MAX_HEIGHT > window.innerHeight ? Math.max(0, y - MENU_MAX_HEIGHT) : y;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: menuRef,
        role: "menu",
        "aria-label": "Canvas context menu",
        className: "fixed z-50 min-w-[190px] select-none rounded-md border border-[#4E4E4E] bg-[#2C2C2C] py-1 shadow-2xl",
        style: {
            left,
            top
        },
        onPointerDown: (e)=>e.stopPropagation(),
        onContextMenu: (e)=>{
            e.preventDefault();
            e.stopPropagation();
        },
        children: entries.map((entry, i)=>'sep' in entry ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "my-1 h-px bg-[#3E3E3E]",
                role: "separator"
            }, `sep-${i}`, false, {
                fileName: "[project]/src/iris/ui/ContextMenu.tsx",
                lineNumber: 164,
                columnNumber: 11
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CtxItem, {
                label: entry.label,
                shortcut: entry.shortcut,
                disabled: entry.disabled,
                onClick: ()=>{
                    close();
                    entry.run();
                }
            }, entry.label, false, {
                fileName: "[project]/src/iris/ui/ContextMenu.tsx",
                lineNumber: 166,
                columnNumber: 11
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/iris/ui/ContextMenu.tsx",
        lineNumber: 150,
        columnNumber: 5
    }, this);
}
_s(ContextMenu, "wVbXChhbZQlskTvRg5h8jfDcjUU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"]
    ];
});
_c1 = ContextMenu;
var _c, _c1;
__turbopack_context__.k.register(_c, "CtxItem");
__turbopack_context__.k.register(_c1, "ContextMenu");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/iris/ui/ExportDialog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ExportDialog",
    ()=>ExportDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/**
 * Export dialog: scope (selection / page), format (PNG / SVG), PNG scale,
 * a size estimate, and the export action itself.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/switch.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/engine/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$export$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/iris/engine/export.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/engine/geometry.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
/** Figma-style segmented control. */ function Segmented({ value, options, onChange, 'aria-label': ariaLabel }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex rounded-md border border-[#3E3E3E] p-0.5",
        role: "radiogroup",
        "aria-label": ariaLabel,
        children: options.map((o)=>{
            const active = o.value === value;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                type: "button",
                role: "radio",
                "aria-checked": active,
                disabled: o.disabled,
                className: `h-7 flex-1 rounded text-[11px] transition-colors disabled:pointer-events-none disabled:opacity-40 ${active ? 'bg-[#8B5CF6] text-white' : 'text-[#C9C9C9] hover:bg-[#383838] hover:text-white'}`,
                onClick: ()=>onChange(o.value),
                children: o.label
            }, o.value, false, {
                fileName: "[project]/src/iris/ui/ExportDialog.tsx",
                lineNumber: 48,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/src/iris/ui/ExportDialog.tsx",
        lineNumber: 44,
        columnNumber: 5
    }, this);
}
_c = Segmented;
/**
 * Dialog body. Radix unmounts dialog content while closed, so this mounts
 * fresh on every open and the useState initializers re-derive the defaults
 * ("selection" scope when something is selected, otherwise "page").
 */ function ExportDialogBody() {
    _s();
    const setExportOpen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"])({
        "ExportDialogBody.useIris[setExportOpen]": (s)=>s.setExportOpen
    }["ExportDialogBody.useIris[setExportOpen]"]);
    const doc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"])({
        "ExportDialogBody.useIris[doc]": (s)=>s.doc
    }["ExportDialogBody.useIris[doc]"]);
    const currentPageId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"])({
        "ExportDialogBody.useIris[currentPageId]": (s)=>s.currentPageId
    }["ExportDialogBody.useIris[currentPageId]"]);
    const selection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"])({
        "ExportDialogBody.useIris[selection]": (s)=>s.selection
    }["ExportDialogBody.useIris[selection]"]);
    const [scope, setScope] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "ExportDialogBody.useState": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"].getState().selection.length > 0 ? 'selection' : 'page'
    }["ExportDialogBody.useState"]);
    const [format, setFormat] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('png');
    const [scale, setScale] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(2);
    const [transparent, setTransparent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const hasSelection = selection.length > 0;
    /* never stay on "selection" when the selection vanished mid-dialog */ const effectiveScope = scope === 'selection' && !hasSelection ? 'page' : scope;
    const page = doc.pagesById[currentPageId];
    const bounds = effectiveScope === 'selection' ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["boundsOfNodes"])(doc, selection) : page ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$geometry$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["boundsOfNodes"])(doc, page.nodeIds) : null;
    const hasContent = !!bounds && bounds.w > 0.5 && bounds.h > 0.5;
    const effScale = format === 'svg' ? 1 : scale;
    const doExport = ()=>{
        if (!hasContent) return;
        if (format === 'svg') (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$export$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["exportSVG"])(effectiveScope);
        else void (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$export$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["exportRaster"])(effectiveScope, scale, {
            format: format,
            transparent
        });
        setExportOpen(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                    className: "text-[13px] font-semibold text-white",
                    children: "Export"
                }, void 0, false, {
                    fileName: "[project]/src/iris/ui/ExportDialog.tsx",
                    lineNumber: 111,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/iris/ui/ExportDialog.tsx",
                lineNumber: 110,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mb-1 text-[11px] text-[#9A9A9A]",
                                children: "Scope"
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/ExportDialog.tsx",
                                lineNumber: 116,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Segmented, {
                                "aria-label": "Export scope",
                                value: effectiveScope,
                                onChange: setScope,
                                options: [
                                    {
                                        value: 'selection',
                                        label: 'Selection',
                                        disabled: !hasSelection
                                    },
                                    {
                                        value: 'page',
                                        label: 'Page'
                                    }
                                ]
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/ExportDialog.tsx",
                                lineNumber: 117,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/iris/ui/ExportDialog.tsx",
                        lineNumber: 115,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mb-1 text-[11px] text-[#9A9A9A]",
                                children: "Format"
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/ExportDialog.tsx",
                                lineNumber: 129,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Segmented, {
                                "aria-label": "Export format",
                                value: format,
                                onChange: setFormat,
                                options: [
                                    {
                                        value: 'png',
                                        label: 'PNG'
                                    },
                                    {
                                        value: 'jpg',
                                        label: 'JPG'
                                    },
                                    {
                                        value: 'svg',
                                        label: 'SVG'
                                    }
                                ]
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/ExportDialog.tsx",
                                lineNumber: 130,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/iris/ui/ExportDialog.tsx",
                        lineNumber: 128,
                        columnNumber: 9
                    }, this),
                    format === 'png' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mb-1 text-[11px] text-[#9A9A9A]",
                                children: "Scale"
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/ExportDialog.tsx",
                                lineNumber: 144,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Segmented, {
                                "aria-label": "Export scale",
                                value: scale,
                                onChange: setScale,
                                options: [
                                    {
                                        value: 1,
                                        label: '1x'
                                    },
                                    {
                                        value: 2,
                                        label: '2x'
                                    },
                                    {
                                        value: 3,
                                        label: '3x'
                                    },
                                    {
                                        value: 4,
                                        label: '4x'
                                    }
                                ]
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/ExportDialog.tsx",
                                lineNumber: 145,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/iris/ui/ExportDialog.tsx",
                        lineNumber: 143,
                        columnNumber: 11
                    }, this),
                    format === 'png' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[11px] text-[#C9C9C9]",
                                children: "Transparent background"
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/ExportDialog.tsx",
                                lineNumber: 161,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$switch$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Switch"], {
                                checked: transparent,
                                "aria-label": "Transparent background",
                                className: "data-[state=checked]:bg-[#8B5CF6] data-[state=unchecked]:bg-[#383838]",
                                onCheckedChange: setTransparent
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/ExportDialog.tsx",
                                lineNumber: 162,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/iris/ui/ExportDialog.tsx",
                        lineNumber: 160,
                        columnNumber: 11
                    }, this) : null,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[11px] text-[#9A9A9A]",
                        children: hasContent && bounds ? `≈ ${Math.ceil(bounds.w * effScale)} × ${Math.ceil(bounds.h * effScale)} px` : 'Nothing to export'
                    }, void 0, false, {
                        fileName: "[project]/src/iris/ui/ExportDialog.tsx",
                        lineNumber: 171,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/iris/ui/ExportDialog.tsx",
                lineNumber: 114,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogFooter"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        type: "button",
                        variant: "ghost",
                        className: "h-8 rounded-md px-4 text-[12px] text-[#C9C9C9] hover:bg-[#383838] hover:text-white",
                        onClick: ()=>setExportOpen(false),
                        children: "Cancel"
                    }, void 0, false, {
                        fileName: "[project]/src/iris/ui/ExportDialog.tsx",
                        lineNumber: 179,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        type: "button",
                        className: "h-8 rounded-md bg-[#8B5CF6] px-4 text-[12px] text-white hover:bg-[#7C3AED]",
                        disabled: !hasContent,
                        onClick: doExport,
                        children: "Export"
                    }, void 0, false, {
                        fileName: "[project]/src/iris/ui/ExportDialog.tsx",
                        lineNumber: 187,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/iris/ui/ExportDialog.tsx",
                lineNumber: 178,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(ExportDialogBody, "+MRxSp+uZrq8YT8n6pLiCn4/caA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"]
    ];
});
_c1 = ExportDialogBody;
function ExportDialog() {
    _s1();
    const exportOpen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"])({
        "ExportDialog.useIris[exportOpen]": (s)=>s.exportOpen
    }["ExportDialog.useIris[exportOpen]"]);
    const setExportOpen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"])({
        "ExportDialog.useIris[setExportOpen]": (s)=>s.setExportOpen
    }["ExportDialog.useIris[setExportOpen]"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: exportOpen,
        onOpenChange: (o)=>setExportOpen(o),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: "gap-3 border-[#4E4E4E] bg-[#2C2C2C] p-4 text-white sm:max-w-[360px]",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ExportDialogBody, {}, void 0, false, {
                fileName: "[project]/src/iris/ui/ExportDialog.tsx",
                lineNumber: 207,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/iris/ui/ExportDialog.tsx",
            lineNumber: 206,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/iris/ui/ExportDialog.tsx",
        lineNumber: 205,
        columnNumber: 5
    }, this);
}
_s1(ExportDialog, "O3pSMLgvcuj/JW6BFTuKcJNCe30=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"]
    ];
});
_c2 = ExportDialog;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "Segmented");
__turbopack_context__.k.register(_c1, "ExportDialogBody");
__turbopack_context__.k.register(_c2, "ExportDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/iris/ui/ShortcutsOverlay.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ShortcutsOverlay",
    ()=>ShortcutsOverlay
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/**
 * Keyboard shortcuts overlay: a responsive two-column grid of shortcut
 * groups shown in a dialog controlled by the store.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/engine/store.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const GROUPS = [
    {
        title: 'Tools',
        rows: [
            {
                keys: [
                    'V'
                ],
                label: 'Move'
            },
            {
                keys: [
                    'F'
                ],
                label: 'Frame'
            },
            {
                keys: [
                    'R'
                ],
                label: 'Rectangle'
            },
            {
                keys: [
                    'O'
                ],
                label: 'Ellipse'
            },
            {
                keys: [
                    'Y'
                ],
                label: 'Polygon'
            },
            {
                keys: [
                    'S'
                ],
                label: 'Star'
            },
            {
                keys: [
                    'L'
                ],
                label: 'Line'
            },
            {
                keys: [
                    'A'
                ],
                label: 'Arrow'
            },
            {
                keys: [
                    'P'
                ],
                label: 'Pen'
            },
            {
                keys: [
                    'T'
                ],
                label: 'Text'
            },
            {
                keys: [
                    'M'
                ],
                label: 'Place image'
            },
            {
                keys: [
                    'I'
                ],
                label: 'Eyedropper'
            },
            {
                keys: [
                    'H'
                ],
                label: 'Hand'
            }
        ]
    },
    {
        title: 'View',
        rows: [
            {
                keys: [
                    'Space+Drag'
                ],
                label: 'Pan'
            },
            {
                keys: [
                    'Ctrl+Wheel'
                ],
                label: 'Zoom'
            },
            {
                keys: [
                    'Alt+Wheel'
                ],
                label: 'Pan horizontally'
            },
            {
                keys: [
                    'Ctrl+0'
                ],
                label: '100%'
            },
            {
                keys: [
                    'Shift+1'
                ],
                label: 'Zoom to fit'
            },
            {
                keys: [
                    'Shift+2'
                ],
                label: 'Zoom to selection'
            },
            {
                keys: [
                    'Ctrl+=',
                    'Ctrl+-'
                ],
                label: 'Zoom in / out'
            },
            {
                keys: [
                    'Ruler drag'
                ],
                label: 'Create a guide'
            }
        ]
    },
    {
        title: 'Edit',
        rows: [
            {
                keys: [
                    'Ctrl+Z',
                    'Ctrl+Shift+Z'
                ],
                label: 'Undo / Redo'
            },
            {
                keys: [
                    'Ctrl+C',
                    'Ctrl+V',
                    'Ctrl+X'
                ],
                label: 'Copy / Paste / Cut'
            },
            {
                keys: [
                    'Ctrl+D'
                ],
                label: 'Duplicate'
            },
            {
                keys: [
                    'Delete'
                ],
                label: 'Delete'
            },
            {
                keys: [
                    'Ctrl+A'
                ],
                label: 'Select all'
            },
            {
                keys: [
                    'Ctrl+Shift+A'
                ],
                label: 'Select same type'
            },
            {
                keys: [
                    'Ctrl+Alt+C / V'
                ],
                label: 'Copy / paste style'
            }
        ]
    },
    {
        title: 'Transform',
        rows: [
            {
                keys: [
                    'Drag'
                ],
                label: 'Move'
            },
            {
                keys: [
                    'Shift+Drag'
                ],
                label: 'Constrain axis'
            },
            {
                keys: [
                    'Alt+Drag'
                ],
                label: 'Duplicate'
            },
            {
                keys: [
                    'Arrows'
                ],
                label: 'Nudge 1px'
            },
            {
                keys: [
                    'Shift+Arrows'
                ],
                label: 'Nudge 10px'
            },
            {
                keys: [
                    'Shift+H',
                    'Shift+V'
                ],
                label: 'Flip H / V'
            },
            {
                keys: [
                    'Ctrl+L'
                ],
                label: 'Lock / unlock'
            },
            {
                keys: [
                    'Ctrl+Shift+H'
                ],
                label: 'Hide / show'
            },
            {
                keys: [
                    'Enter'
                ],
                label: 'Edit object'
            },
            {
                keys: [
                    'Esc'
                ],
                label: 'Back out'
            }
        ]
    },
    {
        title: 'Layers',
        rows: [
            {
                keys: [
                    'Ctrl+G',
                    'Ctrl+Shift+G'
                ],
                label: 'Group / Ungroup'
            },
            {
                keys: [
                    ']',
                    '['
                ],
                label: 'Forward / Backward'
            },
            {
                keys: [
                    'Ctrl+]',
                    'Ctrl+['
                ],
                label: 'Front / Back'
            },
            {
                keys: [
                    'Double-click'
                ],
                label: 'Enter group / edit text'
            }
        ]
    },
    {
        title: 'Files',
        rows: [
            {
                keys: [
                    'Ctrl+S'
                ],
                label: 'Save .iris'
            },
            {
                keys: [
                    'Ctrl+O'
                ],
                label: 'Open'
            },
            {
                keys: [
                    'Ctrl+Shift+S'
                ],
                label: 'Save as'
            },
            {
                keys: [
                    'Ctrl+Shift+E'
                ],
                label: 'Export'
            }
        ]
    }
];
function Kbd({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
        className: "rounded border border-[#4E4E4E] bg-[#383838] px-1.5 py-px font-sans text-[10px] text-white",
        children: children
    }, void 0, false, {
        fileName: "[project]/src/iris/ui/ShortcutsOverlay.tsx",
        lineNumber: 108,
        columnNumber: 5
    }, this);
}
_c = Kbd;
function ShortcutsOverlay() {
    _s();
    const shortcutsOpen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"])({
        "ShortcutsOverlay.useIris[shortcutsOpen]": (s)=>s.shortcutsOpen
    }["ShortcutsOverlay.useIris[shortcutsOpen]"]);
    const setShortcutsOpen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"])({
        "ShortcutsOverlay.useIris[setShortcutsOpen]": (s)=>s.setShortcutsOpen
    }["ShortcutsOverlay.useIris[setShortcutsOpen]"]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: shortcutsOpen,
        onOpenChange: (o)=>setShortcutsOpen(o),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: "iris-scroll max-h-[70vh] gap-4 overflow-y-auto border-[#4E4E4E] bg-[#2C2C2C] p-5 text-white sm:max-w-[560px]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                            className: "text-[13px] font-semibold text-white",
                            children: "Keyboard shortcuts"
                        }, void 0, false, {
                            fileName: "[project]/src/iris/ui/ShortcutsOverlay.tsx",
                            lineNumber: 122,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                            className: "text-[12px] text-[#9A9A9A]",
                            children: "Iris works best with shortcuts"
                        }, void 0, false, {
                            fileName: "[project]/src/iris/ui/ShortcutsOverlay.tsx",
                            lineNumber: 123,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/iris/ui/ShortcutsOverlay.tsx",
                    lineNumber: 121,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2",
                    children: GROUPS.map((g)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "mb-1.5 text-[11px] font-semibold text-white",
                                    children: g.title
                                }, void 0, false, {
                                    fileName: "[project]/src/iris/ui/ShortcutsOverlay.tsx",
                                    lineNumber: 131,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    children: g.rows.map((r)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            className: "flex items-center justify-between gap-6 py-0.5 text-[11px] text-[#C9C9C9]",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: r.label
                                                }, void 0, false, {
                                                    fileName: "[project]/src/iris/ui/ShortcutsOverlay.tsx",
                                                    lineNumber: 138,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "flex shrink-0 items-center gap-1",
                                                    children: r.keys.map((k, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "flex items-center gap-1",
                                                            children: [
                                                                i > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[#6F6F6F]",
                                                                    children: "/"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/iris/ui/ShortcutsOverlay.tsx",
                                                                    lineNumber: 142,
                                                                    columnNumber: 37
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Kbd, {
                                                                    children: k
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/iris/ui/ShortcutsOverlay.tsx",
                                                                    lineNumber: 143,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, k, true, {
                                                            fileName: "[project]/src/iris/ui/ShortcutsOverlay.tsx",
                                                            lineNumber: 141,
                                                            columnNumber: 25
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/iris/ui/ShortcutsOverlay.tsx",
                                                    lineNumber: 139,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, r.label, true, {
                                            fileName: "[project]/src/iris/ui/ShortcutsOverlay.tsx",
                                            lineNumber: 134,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/iris/ui/ShortcutsOverlay.tsx",
                                    lineNumber: 132,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, g.title, true, {
                            fileName: "[project]/src/iris/ui/ShortcutsOverlay.tsx",
                            lineNumber: 130,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/iris/ui/ShortcutsOverlay.tsx",
                    lineNumber: 128,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/iris/ui/ShortcutsOverlay.tsx",
            lineNumber: 120,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/iris/ui/ShortcutsOverlay.tsx",
        lineNumber: 119,
        columnNumber: 5
    }, this);
}
_s(ShortcutsOverlay, "sk5TMWoKwA281hUnOTHYvua32xw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"]
    ];
});
_c1 = ShortcutsOverlay;
var _c, _c1;
__turbopack_context__.k.register(_c, "Kbd");
__turbopack_context__.k.register(_c1, "ShortcutsOverlay");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/iris/ui/IrisApp.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>IrisApp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/**
 * Iris application shell. Routes between the file browser (homepage) and the
 * editor based on the store route (?doc=<id> ↔ /), keeps the browser history
 * in sync (Back / Forward), and hosts the shared toast viewport.
 *
 * Editor layout (per spec screenshots):
 *   ┌──────────────────────────────────────────────┐
 *   │ menu bar (logo · File Edit View Insert Help) │
 *   │ tab bar (home · Untitled tab · + · controls) │
 *   ├────┬─────────┬──────────────────┬────────────┤
 *   │rail│  left   │      canvas      │   right    │
 *   │    │ panel   │  (rulers + art)  │   panel    │
 *   ├────┴─────────┴──────────────────┴────────────┤
 *   │        floating toolbar (bottom-center)  ?   │
 *   └──────────────────────────────────────────────┘
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/engine/store.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$ui$2f$HomeBrowser$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/ui/HomeBrowser.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$ui$2f$TitleBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/ui/TitleBar.tsx [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module './LeftPanel'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module './LeftRail'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$ui$2f$PropertiesPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/ui/PropertiesPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$ui$2f$CanvasView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/ui/CanvasView.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$ui$2f$Toolbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/ui/Toolbar.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$ui$2f$ContextMenu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/ui/ContextMenu.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$ui$2f$ExportDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/ui/ExportDialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$ui$2f$ShortcutsOverlay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/ui/ShortcutsOverlay.tsx [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module './CommentLayer'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module './PresentationView'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module './ShareDialog'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module './HelpButton'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
function IrisApp() {
    _s();
    const route = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"])({
        "IrisApp.useIris[route]": (s)=>s.route
    }["IrisApp.useIris[route]"]);
    const toasts = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"])({
        "IrisApp.useIris[toasts]": (s)=>s.toasts
    }["IrisApp.useIris[toasts]"]);
    const presenting = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"])({
        "IrisApp.useIris[presenting]": (s)=>s.presenting
    }["IrisApp.useIris[presenting]"]);
    /* browser Back / Forward adopt the URL route */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "IrisApp.useEffect": ()=>{
            const onPop = {
                "IrisApp.useEffect.onPop": ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"].getState().syncRoute()
            }["IrisApp.useEffect.onPop"];
            window.addEventListener('popstate', onPop);
            return ({
                "IrisApp.useEffect": ()=>window.removeEventListener('popstate', onPop)
            })["IrisApp.useEffect"];
        }
    }["IrisApp.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "iris-app fixed inset-0 flex flex-col overflow-hidden bg-[#1E1E1E] font-sans text-white antialiased",
        children: [
            route.kind === 'home' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$ui$2f$HomeBrowser$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["HomeBrowser"], {}, void 0, false, {
                fileName: "[project]/src/iris/ui/IrisApp.tsx",
                lineNumber: 52,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex h-full min-h-0 select-none flex-col",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$ui$2f$TitleBar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TitleBar"], {}, void 0, false, {
                        fileName: "[project]/src/iris/ui/IrisApp.tsx",
                        lineNumber: 55,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex min-h-0 flex-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LeftRail, {}, void 0, false, {
                                fileName: "[project]/src/iris/ui/IrisApp.tsx",
                                lineNumber: 58,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LeftPanel, {}, void 0, false, {
                                fileName: "[project]/src/iris/ui/IrisApp.tsx",
                                lineNumber: 59,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                                className: "relative min-w-0 flex-1",
                                "aria-label": "Canvas area",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$ui$2f$CanvasView$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CanvasView"], {}, void 0, false, {
                                        fileName: "[project]/src/iris/ui/IrisApp.tsx",
                                        lineNumber: 62,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CommentLayer, {}, void 0, false, {
                                        fileName: "[project]/src/iris/ui/IrisApp.tsx",
                                        lineNumber: 64,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "pointer-events-none absolute inset-x-0 bottom-4 z-20 flex justify-center px-4",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "pointer-events-auto",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$ui$2f$Toolbar$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Toolbar"], {}, void 0, false, {
                                                fileName: "[project]/src/iris/ui/IrisApp.tsx",
                                                lineNumber: 68,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/iris/ui/IrisApp.tsx",
                                            lineNumber: 67,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/ui/IrisApp.tsx",
                                        lineNumber: 66,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(HelpButton, {}, void 0, false, {
                                        fileName: "[project]/src/iris/ui/IrisApp.tsx",
                                        lineNumber: 72,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/iris/ui/IrisApp.tsx",
                                lineNumber: 61,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$ui$2f$PropertiesPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PropertiesPanel"], {}, void 0, false, {
                                fileName: "[project]/src/iris/ui/IrisApp.tsx",
                                lineNumber: 75,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/iris/ui/IrisApp.tsx",
                        lineNumber: 57,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$ui$2f$ContextMenu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ContextMenu"], {}, void 0, false, {
                        fileName: "[project]/src/iris/ui/IrisApp.tsx",
                        lineNumber: 78,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$ui$2f$ExportDialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ExportDialog"], {}, void 0, false, {
                        fileName: "[project]/src/iris/ui/IrisApp.tsx",
                        lineNumber: 79,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$ui$2f$ShortcutsOverlay$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ShortcutsOverlay"], {}, void 0, false, {
                        fileName: "[project]/src/iris/ui/IrisApp.tsx",
                        lineNumber: 80,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ShareDialog, {}, void 0, false, {
                        fileName: "[project]/src/iris/ui/IrisApp.tsx",
                        lineNumber: 81,
                        columnNumber: 11
                    }, this),
                    presenting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PresentationView, {}, void 0, false, {
                        fileName: "[project]/src/iris/ui/IrisApp.tsx",
                        lineNumber: 82,
                        columnNumber: 25
                    }, this) : null
                ]
            }, void 0, true, {
                fileName: "[project]/src/iris/ui/IrisApp.tsx",
                lineNumber: 54,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pointer-events-none fixed bottom-20 left-1/2 z-[60] flex -translate-x-1/2 flex-col items-center gap-1.5",
                "aria-live": "polite",
                children: toasts.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 rounded-md border border-[#4E4E4E] bg-[#383838] px-3 py-1.5 text-[11px] text-white shadow-xl",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: t.msg
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/IrisApp.tsx",
                                lineNumber: 96,
                                columnNumber: 13
                            }, this),
                            t.action ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "rounded bg-[#0D99FF] px-2 py-0.5 text-[10px] font-semibold text-white transition-colors hover:bg-[#0B87E0]",
                                onClick: ()=>{
                                    t.action?.run();
                                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"].getState().dismissToast(t.id);
                                },
                                children: t.action.label
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/IrisApp.tsx",
                                lineNumber: 98,
                                columnNumber: 15
                            }, this) : null,
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                className: "flex h-5 w-5 items-center justify-center rounded text-[#9A9A9A] transition-colors hover:bg-[#474747] hover:text-white",
                                "aria-label": "Dismiss",
                                onClick: ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"].getState().dismissToast(t.id),
                                children: "×"
                            }, void 0, false, {
                                fileName: "[project]/src/iris/ui/IrisApp.tsx",
                                lineNumber: 109,
                                columnNumber: 13
                            }, this)
                        ]
                    }, t.id, true, {
                        fileName: "[project]/src/iris/ui/IrisApp.tsx",
                        lineNumber: 92,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/iris/ui/IrisApp.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/iris/ui/IrisApp.tsx",
        lineNumber: 50,
        columnNumber: 5
    }, this);
}
_s(IrisApp, "DPDKH42JaZIfw9u1z3rTWoOFqiE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$engine$2f$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useIris"]
    ];
});
_c = IrisApp;
var _c;
__turbopack_context__.k.register(_c, "IrisApp");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/iris/ui/AppGate.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AppGate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/**
 * Iris application gate — owns the top-level product flow:
 *
 *   landing (marketing site) → account (preview auth) → studio (IrisApp)
 *
 * A persisted (simulated) session skips straight to the studio; signing out
 * from the studio homepage returns here. Everything stays on the single "/"
 * route — phase changes are pure client state, so deep links such as
 * /?doc=<id> keep working across the gate.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$auth$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/auth/session.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$marketing$2f$LandingPage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/marketing/LandingPage.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$auth$2f$AuthPage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/auth/AuthPage.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$ui$2f$IrisApp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/ui/IrisApp.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function AppGate() {
    _s();
    /* The gate renders client-only (ssr: false in page.tsx), so the session
   * can be adopted synchronously in the initial state — no flash of the
   * wrong phase and no effect-triggered re-render. */ const [phase, setPhase] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "AppGate.useState": ()=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$auth$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSession"])() ? 'app' : 'landing'
    }["AppGate.useState"]);
    /* Sign-out (from the studio account chip) returns to the landing page. */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AppGate.useEffect": ()=>{
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$auth$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["subscribe"])({
                "AppGate.useEffect": ()=>{
                    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$auth$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSession"])()) setPhase('landing');
                }
            }["AppGate.useEffect"]);
        }
    }["AppGate.useEffect"], []);
    if (phase === 'landing') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$marketing$2f$LandingPage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LandingPage"], {
            onEnter: ()=>setPhase((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$auth$2f$session$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSession"])() ? 'app' : 'auth')
        }, void 0, false, {
            fileName: "[project]/src/iris/ui/AppGate.tsx",
            lineNumber: 36,
            columnNumber: 12
        }, this);
    }
    if (phase === 'auth') {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$auth$2f$AuthPage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthPage"], {
            onDone: ()=>setPhase('app'),
            onBack: ()=>setPhase('landing')
        }, void 0, false, {
            fileName: "[project]/src/iris/ui/AppGate.tsx",
            lineNumber: 40,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$ui$2f$IrisApp$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
        fileName: "[project]/src/iris/ui/AppGate.tsx",
        lineNumber: 43,
        columnNumber: 10
    }, this);
}
_s(AppGate, "AMXPDG6idTB4H94MEJXhuw52GVE=");
_c = AppGate;
var _c;
__turbopack_context__.k.register(_c, "AppGate");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/iris/ui/AppGate.tsx [app-client] (ecmascript, next/dynamic entry)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/iris/ui/AppGate.tsx [app-client] (ecmascript)"));
}),
]);

//# sourceMappingURL=src_iris_ui_944933af._.js.map