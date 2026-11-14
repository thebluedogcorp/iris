(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/iris/marketing/brand.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Shared brand constants for the Iris marketing site: palette, product
 * links, imagery and copy. Handmade paper flowers are the visual metaphor —
 * Iris is crafted, warm and creative, not another cold enterprise tool.
 *
 * Imagery is sourced from public web searches (craft studios / paper-flower
 * makers) and re-hosted on a CDN for stable embedding. Keep this file the
 * single source of truth for the marketing visual identity.
 */ __turbopack_context__.s([
    "BRAND",
    ()=>BRAND,
    "IMAGES",
    ()=>IMAGES,
    "PALETTE",
    ()=>PALETTE
]);
const BRAND = {
    name: 'Iris',
    tagline: 'The open-source, local-first design studio',
    repoUrl: 'https://github.com/thebluedogcorp/iris',
    version: 'v1.0.0'
};
const IMAGES = {
    /** Hero polaroid — crepe-paper bouquet (poppies, anemones). Portrait. */ bouquet: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/6bcad252a12e.jpg',
    /** Hero polaroid — pastel paper rose wall fading pink → cream. Square. */ pastelWall: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/86e0064bb0c1.jpg',
    /** Hero polaroid — orange crepe roses in a white vase. Portrait. */ orangeRoses: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/fa8f18b9e18d.jpg',
    /** Auth side panel — macro lilac paper flowers on charcoal. Landscape. */ lilacMacro: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/da4070d18b12.jpg',
    /** Craft gallery — maker holding giant paper roses. Portrait. */ giantRoses: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/9b2304600e78.jpeg',
    /** Craft gallery — purple paper hyacinths with paint palette. Portrait. */ hyacinth: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/adbafef4bc07.jpg',
    /** Craft gallery — purple statice close-up. Square. */ statice: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/5827a318626b.webp',
    /** Craft gallery — DIY paper flower wall in a home. Portrait. */ diyWall: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/1f8fd29dcf11.jpg'
};
const PALETTE = {
    paper: '#FAF7F2',
    paperDeep: '#F3EDE3',
    ink: '#1B1712',
    inkSoft: '#57504A',
    violet: '#8B5CF6',
    violetDeep: '#6D28D9',
    violetTint: '#F1EBFC',
    terracotta: '#D97757',
    rose: '#E8A0B0',
    sage: '#93A89B',
    line: '#E7DFD2'
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/iris/marketing/IrisLogo.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "IrisLogo",
    ()=>IrisLogo,
    "IrisMark",
    ()=>IrisMark
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
'use client';
;
function IrisMark({ size = 24, className = '', color = '#8B5CF6' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: size,
        height: size,
        viewBox: "0 0 16 16",
        "aria-hidden": "true",
        focusable: "false",
        className: className,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                fill: color,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                        cx: "8",
                        cy: "4.6",
                        rx: "2.7",
                        ry: "4.5"
                    }, void 0, false, {
                        fileName: "[project]/src/iris/marketing/IrisLogo.tsx",
                        lineNumber: 28,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                        cx: "8",
                        cy: "4.6",
                        rx: "2.7",
                        ry: "4.5",
                        transform: "rotate(120 8 8)"
                    }, void 0, false, {
                        fileName: "[project]/src/iris/marketing/IrisLogo.tsx",
                        lineNumber: 29,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                        cx: "8",
                        cy: "4.6",
                        rx: "2.7",
                        ry: "4.5",
                        transform: "rotate(240 8 8)"
                    }, void 0, false, {
                        fileName: "[project]/src/iris/marketing/IrisLogo.tsx",
                        lineNumber: 30,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/iris/marketing/IrisLogo.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                cx: "8",
                cy: "8",
                r: "1.5",
                fill: "#FFFFFF"
            }, void 0, false, {
                fileName: "[project]/src/iris/marketing/IrisLogo.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/iris/marketing/IrisLogo.tsx",
        lineNumber: 19,
        columnNumber: 5
    }, this);
}
_c = IrisMark;
function IrisLogo({ size = 26, dark = false, className = '' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: `inline-flex items-center gap-2.5 ${className}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(IrisMark, {
                size: size
            }, void 0, false, {
                fileName: "[project]/src/iris/marketing/IrisLogo.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "font-display text-[1.35rem] font-semibold leading-none tracking-tight",
                style: {
                    color: dark ? '#FFFFFF' : '#1B1712'
                },
                children: "Iris"
            }, void 0, false, {
                fileName: "[project]/src/iris/marketing/IrisLogo.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/iris/marketing/IrisLogo.tsx",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
_c1 = IrisLogo;
var _c, _c1;
__turbopack_context__.k.register(_c, "IrisMark");
__turbopack_context__.k.register(_c1, "IrisLogo");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/iris/marketing/LandingPage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LandingPage",
    ()=>LandingPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
/**
 * Iris marketing site — the "startup page". A professional SaaS-style
 * landing: navbar, hero (with a hand-built replica of the studio UI plus
 * paper-flower polaroids), stats band, how-it-works, feature grid, craft
 * gallery, manifesto, CTA and footer.
 *
 * The paper-flower photography carries the brand metaphor: Iris is made by
 * makers — warm, crafted, creative — while the studio mock proves the
 * engineering underneath is real.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-down.js [app-client] (ecmascript) <export default as ArrowDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2d$tool$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PenTool$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pen-tool.js [app-client] (ecmascript) <export default as PenTool>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hard$2d$drive$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HardDrive$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/hard-drive.js [app-client] (ecmascript) <export default as HardDrive>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layers.js [app-client] (ecmascript) <export default as Layers>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$magnet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Magnet$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/magnet.js [app-client] (ecmascript) <export default as Magnet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileJson$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-json.js [app-client] (ecmascript) <export default as FileJson>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/image-down.js [app-client] (ecmascript) <export default as ImageDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$github$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Github$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/github.js [app-client] (ecmascript) <export default as Github>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/star.js [app-client] (ecmascript) <export default as Star>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.js [app-client] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flower$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flower2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/flower-2.js [app-client] (ecmascript) <export default as Flower2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mouse$2d$pointer$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MousePointer2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mouse-pointer-2.js [app-client] (ecmascript) <export default as MousePointer2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/square.js [app-client] (ecmascript) <export default as Square>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$frame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Frame$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/frame.js [app-client] (ecmascript) <export default as Frame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Type$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/type.js [app-client] (ecmascript) <export default as Type>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hand$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hand$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/hand.js [app-client] (ecmascript) <export default as Hand>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$plus$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FilePlus2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-plus-2.js [app-client] (ecmascript) <export default as FilePlus2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cloud$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CloudOff$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/cloud-off.js [app-client] (ecmascript) <export default as CloudOff>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$braces$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Braces$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/braces.js [app-client] (ecmascript) <export default as Braces>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$marketing$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/marketing/brand.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$marketing$2f$IrisLogo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/iris/marketing/IrisLogo.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
/* ------------------------------------------------------------------ */ /* shared bits                                                         */ /* ------------------------------------------------------------------ */ const EASE = [
    0.22,
    1,
    0.36,
    1
];
/** Subtle scroll-reveal wrapper used across all sections. */ function Reveal({ children, delay = 0, className = '' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            y: 26
        },
        whileInView: {
            opacity: 1,
            y: 0
        },
        viewport: {
            once: true,
            margin: '-70px'
        },
        transition: {
            duration: 0.65,
            delay,
            ease: EASE
        },
        className: className,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
        lineNumber: 61,
        columnNumber: 5
    }, this);
}
_c = Reveal;
function SectionEyebrow({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "inline-flex items-center gap-1.5 rounded-full border border-[#E7DFD2] bg-white/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-[#8B5CF6]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flower$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flower2$3e$__["Flower2"], {
                className: "size-3",
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                lineNumber: 76,
                columnNumber: 7
            }, this),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
        lineNumber: 75,
        columnNumber: 5
    }, this);
}
_c1 = SectionEyebrow;
/** Washi-taped polaroid frame — the signature craft element. */ function Polaroid({ src, alt, caption, rotate = 0, tape = true, floatDelay = 0, className = '' }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].figure, {
        initial: {
            opacity: 0,
            scale: 0.92,
            rotate: rotate - 4
        },
        whileInView: {
            opacity: 1,
            scale: 1,
            rotate
        },
        viewport: {
            once: true,
            margin: '-40px'
        },
        transition: {
            duration: 0.7,
            ease: EASE
        },
        whileHover: {
            rotate: 0,
            scale: 1.03,
            zIndex: 20
        },
        className: `group relative rounded-[4px] bg-white p-2 pb-3 shadow-[0_18px_40px_-18px_rgba(27,23,18,0.35)] ${className}`,
        style: {
            zIndex: 1
        },
        children: [
            tape && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                "aria-hidden": "true",
                className: "absolute -top-3 left-1/2 z-10 h-6 w-20 -translate-x-1/2 -rotate-2 bg-[#8B5CF6]/30 shadow-sm backdrop-blur-[0.5px] transition-opacity group-hover:opacity-80"
            }, void 0, false, {
                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                lineNumber: 111,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "overflow-hidden bg-[#F3EDE3]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].img, {
                    src: src,
                    alt: alt,
                    loading: "lazy",
                    draggable: false,
                    className: "block h-full w-full object-cover",
                    animate: {
                        y: [
                            0,
                            -7,
                            0
                        ]
                    },
                    transition: {
                        duration: 6.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: floatDelay
                    }
                }, void 0, false, {
                    fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                    lineNumber: 117,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, this),
            caption && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("figcaption", {
                className: "font-display pt-2 text-center text-[12.5px] italic text-[#57504A]",
                children: caption
            }, void 0, false, {
                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                lineNumber: 128,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
        lineNumber: 101,
        columnNumber: 5
    }, this);
}
_c2 = Polaroid;
/* ------------------------------------------------------------------ */ /* studio replica (pure CSS/SVG — mirrors the real editor chrome)       */ /* ------------------------------------------------------------------ */ function StudioMock() {
    const tools = [
        {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mouse$2d$pointer$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MousePointer2$3e$__["MousePointer2"],
            label: 'Move'
        },
        {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$frame$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Frame$3e$__["Frame"],
            label: 'Frame'
        },
        {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__["Square"],
            label: 'Rectangle'
        },
        {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2d$tool$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PenTool$3e$__["PenTool"],
            label: 'Pen'
        },
        {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$type$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Type$3e$__["Type"],
            label: 'Text'
        },
        {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hand$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Hand$3e$__["Hand"],
            label: 'Hand'
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "aria-label": "Preview of the Iris studio interface",
        className: "relative w-full overflow-hidden rounded-xl border border-[#3A3A3A] bg-[#1E1E1E] text-left shadow-[0_40px_80px_-30px_rgba(27,23,18,0.55)]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex h-9 items-center gap-2 border-b border-[#3E3E3E] bg-[#252525] px-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "flex gap-1.5",
                        "aria-hidden": "true",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                className: "size-2.5 rounded-full bg-[#FF5F57]"
                            }, void 0, false, {
                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                lineNumber: 157,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                className: "size-2.5 rounded-full bg-[#FEBC2E]"
                            }, void 0, false, {
                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                lineNumber: 158,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                className: "size-2.5 rounded-full bg-[#28C840]"
                            }, void 0, false, {
                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                lineNumber: 159,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                        lineNumber: 156,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "mx-auto flex items-center gap-1.5 rounded-md bg-[#1E1E1E] px-2.5 py-1 text-[10.5px] text-[#C9C9C9]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$marketing$2f$IrisLogo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IrisMark"], {
                                size: 11
                            }, void 0, false, {
                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                lineNumber: 162,
                                columnNumber: 11
                            }, this),
                            "brand-poster.iris"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                        lineNumber: 161,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "rounded bg-[#1E1E1E] px-1.5 py-0.5 text-[10px] text-[#9A9A9A]",
                        children: "62%"
                    }, void 0, false, {
                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                        lineNumber: 165,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                lineNumber: 155,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex h-[300px] sm:h-[340px]",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden w-[104px] shrink-0 flex-col gap-1 border-r border-[#3E3E3E] bg-[#232323] p-2 sm:flex",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "px-1 pb-1 text-[8.5px] font-medium uppercase tracking-wider text-[#7A7A7A]",
                                children: "Layers"
                            }, void 0, false, {
                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                lineNumber: 171,
                                columnNumber: 11
                            }, this),
                            [
                                {
                                    w: 'w-3/4',
                                    c: 'bg-[#8B5CF6]'
                                },
                                {
                                    w: 'w-2/3',
                                    c: 'bg-[#E8A0B0]'
                                },
                                {
                                    w: 'w-1/2',
                                    c: 'bg-[#93A89B]'
                                },
                                {
                                    w: 'w-3/5',
                                    c: 'bg-[#D97757]'
                                },
                                {
                                    w: 'w-2/5',
                                    c: 'bg-[#C9C9C9]'
                                }
                            ].map((row, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-1.5 rounded px-1 py-1 hover:bg-[#2C2C2C]",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: `h-2 rounded-sm ${row.c} ${row.w}`,
                                        "aria-hidden": "true"
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                        lineNumber: 180,
                                        columnNumber: 15
                                    }, this)
                                }, i, false, {
                                    fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                    lineNumber: 179,
                                    columnNumber: 13
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mt-2 px-1 text-[8.5px] font-medium uppercase tracking-wider text-[#7A7A7A]",
                                children: "Pages"
                            }, void 0, false, {
                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                lineNumber: 183,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1.5 rounded bg-[#2C2C2C] px-1 py-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: "h-1.5 w-1.5 rounded-full bg-[#8B5CF6]",
                                        "aria-hidden": "true"
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                        lineNumber: 185,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[9px] text-[#E5E5E5]",
                                        children: "Page 1"
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                        lineNumber: 186,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                lineNumber: 184,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                        lineNumber: 170,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative min-w-0 flex-1 overflow-hidden bg-[#242424]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                "aria-hidden": "true",
                                className: "absolute inset-0 opacity-60",
                                style: {
                                    backgroundImage: 'radial-gradient(circle, #333333 1px, transparent 1px)',
                                    backgroundSize: '22px 22px'
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                lineNumber: 192,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute left-[9%] top-[10%] h-[74%] w-[64%] rounded-lg bg-[#2B2B2B] p-3 shadow-[0_0_0_1px_#3E3E3E]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "absolute -top-4 left-0 text-[9px] text-[#9A9A9A]",
                                        children: "Poster"
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                        lineNumber: 202,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "relative mt-3 h-[38%] w-[70%] rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] shadow-[0_10px_24px_-10px_rgba(139,92,246,0.7)]",
                                        children: [
                                            [
                                                '-left-1 -top-1',
                                                'left-1/2 -top-1 -translate-x-1/2',
                                                '-right-1 -top-1',
                                                '-left-1 top-1/2 -translate-y-1/2',
                                                '-right-1 top-1/2 -translate-y-1/2',
                                                '-left-1 -bottom-1',
                                                'left-1/2 -bottom-1 -translate-x-1/2',
                                                '-right-1 -bottom-1'
                                            ].map((pos)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                    className: `absolute ${pos} size-2 rounded-[1px] border border-[#8B5CF6] bg-white`,
                                                    "aria-hidden": "true"
                                                }, pos, false, {
                                                    fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                                    lineNumber: 210,
                                                    columnNumber: 17
                                                }, this)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-[#8B5CF6] px-1.5 py-0.5 text-[8.5px] text-white",
                                                children: "240 × 150"
                                            }, void 0, false, {
                                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                                lineNumber: 212,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                        lineNumber: 204,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute right-[8%] top-[16%] size-14 rounded-full bg-[#E8A0B0]",
                                        "aria-hidden": "true"
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                        lineNumber: 217,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute bottom-[12%] left-[6%]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-display text-[15px] leading-tight text-white",
                                                children: "Aa"
                                            }, void 0, false, {
                                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                                lineNumber: 220,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 h-1.5 w-16 rounded bg-[#4E4E4E]",
                                                "aria-hidden": "true"
                                            }, void 0, false, {
                                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                                lineNumber: 221,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-1 h-1.5 w-10 rounded bg-[#3E3E3E]",
                                                "aria-hidden": "true"
                                            }, void 0, false, {
                                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                                lineNumber: 222,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                        lineNumber: 219,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        viewBox: "0 0 120 40",
                                        className: "absolute bottom-[10%] right-[10%] h-10 w-24",
                                        "aria-hidden": "true",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M4 32 C 30 4, 60 40, 116 10",
                                            fill: "none",
                                            stroke: "#D97757",
                                            strokeWidth: "2.5",
                                            strokeLinecap: "round"
                                        }, void 0, false, {
                                            fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                            lineNumber: 226,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                        lineNumber: 225,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute right-[20%] top-[48%] h-0.5 w-12 rotate-[-24deg] rounded bg-[#93A89B]",
                                        "aria-hidden": "true"
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                        lineNumber: 229,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                lineNumber: 201,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute left-1/2 top-0 h-full w-px bg-[#8B5CF6]/60",
                                "aria-hidden": "true"
                            }, void 0, false, {
                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                lineNumber: 232,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute left-0 top-[38%] h-px w-full bg-[#8B5CF6]/60",
                                "aria-hidden": "true"
                            }, void 0, false, {
                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                lineNumber: 233,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute left-1/2 top-3 flex -translate-x-1/2 items-center gap-0.5 rounded-full border border-[#4E4E4E] bg-[#383838]/95 px-1.5 py-1 shadow-xl backdrop-blur",
                                children: tools.map((t, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `flex size-6 items-center justify-center rounded-full ${i === 0 ? 'bg-[#8B5CF6] text-white' : 'text-[#C9C9C9]'}`,
                                        title: t.label,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(t.icon, {
                                            className: "size-3",
                                            "aria-hidden": "true"
                                        }, void 0, false, {
                                            fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                            lineNumber: 245,
                                            columnNumber: 17
                                        }, this)
                                    }, t.label, false, {
                                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                        lineNumber: 238,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                lineNumber: 236,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                        lineNumber: 191,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden w-[92px] shrink-0 flex-col gap-2 border-l border-[#3E3E3E] bg-[#232323] p-2 md:flex",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[8.5px] font-medium uppercase tracking-wider text-[#7A7A7A]",
                                children: "Position"
                            }, void 0, false, {
                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                lineNumber: 253,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex-1 rounded bg-[#2C2C2C] px-1 py-1 text-center text-[9px] text-[#C9C9C9]",
                                        children: "128"
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                        lineNumber: 255,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex-1 rounded bg-[#2C2C2C] px-1 py-1 text-center text-[9px] text-[#C9C9C9]",
                                        children: "64"
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                        lineNumber: 256,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                lineNumber: 254,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[8.5px] font-medium uppercase tracking-wider text-[#7A7A7A]",
                                children: "Fill"
                            }, void 0, false, {
                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                lineNumber: 258,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1.5 rounded bg-[#2C2C2C] px-1.5 py-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: "size-3 rounded-sm bg-[#8B5CF6]",
                                        "aria-hidden": "true"
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                        lineNumber: 260,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[9px] text-[#C9C9C9]",
                                        children: "#8B5CF6"
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                        lineNumber: 261,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                lineNumber: 259,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[8.5px] font-medium uppercase tracking-wider text-[#7A7A7A]",
                                children: "Stroke"
                            }, void 0, false, {
                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                lineNumber: 263,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-1.5 rounded bg-[#2C2C2C] px-1.5 py-1.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                        className: "size-3 rounded-sm border border-[#C9C9C9]",
                                        "aria-hidden": "true"
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                        lineNumber: 265,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[9px] text-[#C9C9C9]",
                                        children: "None"
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                        lineNumber: 266,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                lineNumber: 264,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-[8.5px] font-medium uppercase tracking-wider text-[#7A7A7A]",
                                children: "Radius"
                            }, void 0, false, {
                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                lineNumber: 268,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "rounded bg-[#2C2C2C] px-1.5 py-1 text-[9px] text-[#C9C9C9]",
                                children: "16"
                            }, void 0, false, {
                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                lineNumber: 269,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                        lineNumber: 252,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                lineNumber: 168,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
        lineNumber: 150,
        columnNumber: 5
    }, this);
}
_c3 = StudioMock;
/* ------------------------------------------------------------------ */ /* step + feature visuals                                              */ /* ------------------------------------------------------------------ */ function StepVisual({ step }) {
    if (step === 1) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative flex h-36 items-center justify-center overflow-hidden rounded-xl border border-[#E7DFD2] bg-[#F3EDE3]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative w-32 rotate-[-3deg] rounded-lg bg-white p-3 shadow-[0_16px_30px_-16px_rgba(27,23,18,0.35)]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$marketing$2f$IrisLogo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IrisMark"], {
                            size: 18,
                            className: "mx-auto"
                        }, void 0, false, {
                            fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                            lineNumber: 285,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-2 text-center text-[11px] font-medium text-[#1B1712]",
                            children: "Untitled"
                        }, void 0, false, {
                            fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                            lineNumber: 286,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-center text-[10px] text-[#57504A]",
                            children: ".iris"
                        }, void 0, false, {
                            fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                            lineNumber: 287,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "absolute -top-2.5 left-1/2 h-5 w-16 -translate-x-1/2 -rotate-3 bg-[#E8A0B0]/40",
                            "aria-hidden": "true"
                        }, void 0, false, {
                            fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                            lineNumber: 288,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                    lineNumber: 284,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-[#8B5CF6] px-2.5 py-1 text-[10px] font-medium text-white",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$plus$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FilePlus2$3e$__["FilePlus2"], {
                            className: "size-3",
                            "aria-hidden": "true"
                        }, void 0, false, {
                            fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                            lineNumber: 291,
                            columnNumber: 11
                        }, this),
                        " New file"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                    lineNumber: 290,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/iris/marketing/LandingPage.tsx",
            lineNumber: 283,
            columnNumber: 7
        }, this);
    }
    if (step === 2) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative h-36 overflow-hidden rounded-xl border border-[#E7DFD2] bg-[#242424]",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    "aria-hidden": "true",
                    className: "absolute inset-0 opacity-60",
                    style: {
                        backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)',
                        backgroundSize: '16px 16px'
                    }
                }, void 0, false, {
                    fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                    lineNumber: 299,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute left-[14%] top-[24%] size-12 rounded-full bg-[#E8A0B0]",
                    "aria-hidden": "true"
                }, void 0, false, {
                    fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                    lineNumber: 304,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute left-[38%] top-[36%] h-10 w-16 rounded-lg bg-[#8B5CF6]",
                    "aria-hidden": "true"
                }, void 0, false, {
                    fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                    lineNumber: 305,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute right-[16%] top-[22%] h-8 w-8 rounded bg-[#D97757]",
                    "aria-hidden": "true"
                }, void 0, false, {
                    fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                    lineNumber: 306,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute bottom-[16%] left-[46%] h-1.5 w-14 -rotate-12 rounded bg-[#93A89B]",
                    "aria-hidden": "true"
                }, void 0, false, {
                    fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                    lineNumber: 307,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute left-0 top-[30%] h-px w-full bg-[#8B5CF6]/70",
                    "aria-hidden": "true"
                }, void 0, false, {
                    fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                    lineNumber: 308,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute left-[52%] top-0 h-full w-px bg-[#8B5CF6]/70",
                    "aria-hidden": "true"
                }, void 0, false, {
                    fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                    lineNumber: 309,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full border border-[#4E4E4E] bg-[#383838] px-2 py-1 text-[10px] text-[#C9C9C9]",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                            className: "size-3 text-[#8B5CF6]",
                            "aria-hidden": "true"
                        }, void 0, false, {
                            fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                            lineNumber: 311,
                            columnNumber: 11
                        }, this),
                        " Smart guides"
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                    lineNumber: 310,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/iris/marketing/LandingPage.tsx",
            lineNumber: 298,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative flex h-36 flex-col items-center justify-center gap-2.5 overflow-hidden rounded-xl border border-[#E7DFD2] bg-[#F3EDE3]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "inline-flex items-center gap-1 rounded-lg bg-white px-2.5 py-1.5 text-[11px] font-medium text-[#1B1712] shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageDown$3e$__["ImageDown"], {
                                className: "size-3.5 text-[#8B5CF6]",
                                "aria-hidden": "true"
                            }, void 0, false, {
                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                lineNumber: 320,
                                columnNumber: 11
                            }, this),
                            " poster.png"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                        lineNumber: 319,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "inline-flex items-center gap-1 rounded-lg bg-white px-2.5 py-1.5 text-[11px] font-medium text-[#1B1712] shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$braces$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Braces$3e$__["Braces"], {
                                className: "size-3.5 text-[#D97757]",
                                "aria-hidden": "true"
                            }, void 0, false, {
                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                lineNumber: 323,
                                columnNumber: 11
                            }, this),
                            " poster.svg"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                        lineNumber: 322,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                lineNumber: 318,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-1.5",
                children: [
                    '1×',
                    '2×',
                    '4×'
                ].map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "rounded-full border border-[#E7DFD2] bg-white px-2 py-0.5 text-[10px] text-[#57504A]",
                        children: s
                    }, s, false, {
                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                        lineNumber: 328,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                lineNumber: 326,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                className: "absolute bottom-2.5 right-3 size-4 text-[#8B5CF6]",
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                lineNumber: 333,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
        lineNumber: 317,
        columnNumber: 5
    }, this);
}
_c4 = StepVisual;
/* ------------------------------------------------------------------ */ /* landing page                                                        */ /* ------------------------------------------------------------------ */ const FEATURES = [
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2d$tool$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PenTool$3e$__["PenTool"],
        title: 'Vector & pen tools',
        copy: 'Bezier paths with mirrored handles, rects, ellipses, lines and in-canvas text — the full drawing kit.',
        kbd: 'P'
    },
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hard$2d$drive$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__HardDrive$3e$__["HardDrive"],
        title: 'Local-first, always',
        copy: 'Documents live on your machine. No uploads, no accounts, no tracking. Works completely offline.',
        kbd: ''
    },
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers$3e$__["Layers"],
        title: 'Pages & layers',
        copy: 'Multi-page documents with a full layer tree — reorder, rename, lock and toggle visibility.',
        kbd: '⌘G'
    },
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$magnet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Magnet$3e$__["Magnet"],
        title: 'Smart snapping',
        copy: 'Snap guides to sibling edges and centers, arrow-key nudging and Alt-drag duplicates.',
        kbd: '⇡⇣'
    },
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$json$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileJson$3e$__["FileJson"],
        title: 'Portable .iris files',
        copy: 'A clean JSON document format with autosave, recents and instant import/export.',
        kbd: '⌘S'
    },
    {
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageDown$3e$__["ImageDown"],
        title: 'PNG & SVG export',
        copy: 'Ship anywhere with scale factors up to 4× and transparent backgrounds.',
        kbd: ''
    }
];
const STEPS = [
    {
        n: '01',
        title: 'Create a document',
        copy: 'One click and you are on the canvas. Pick a frame preset or start from a blank page — Iris autosaves as you go.'
    },
    {
        n: '02',
        title: 'Design on an infinite canvas',
        copy: 'Draw with the pen, shape with smart guides, align with a keystroke. Everything responds at 60 fps.'
    },
    {
        n: '03',
        title: 'Export & share anywhere',
        copy: 'Send crisp PNGs at 1–4× or infinitely-scalable SVG. Your .iris file stays yours — forever.'
    }
];
const GALLERY = [
    {
        src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$marketing$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IMAGES"].giantRoses,
        alt: 'A maker holding three giant handmade paper roses in blush pink',
        caption: 'Studio-made, by hand',
        rotate: -2.5
    },
    {
        src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$marketing$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IMAGES"].hyacinth,
        alt: 'Purple paper hyacinths on a workbench beside a paint palette',
        caption: 'Petals, with patience',
        rotate: 2
    },
    {
        src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$marketing$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IMAGES"].statice,
        alt: 'Close-up of purple paper statice flowers with yellow centers',
        caption: 'Purple, but make it paper',
        rotate: -1.5
    },
    {
        src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$marketing$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IMAGES"].diyWall,
        alt: 'A DIY paper flower wall backdrop in ivory and dusty pink in a home',
        caption: 'Makers everywhere',
        rotate: 3
    }
];
function LandingPage({ onEnter }) {
    _s();
    const [menuOpen, setMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const repo = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$marketing$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BRAND"].repoUrl;
    const navLinks = [
        {
            label: 'Product',
            href: '#product'
        },
        {
            label: 'How it works',
            href: '#how'
        },
        {
            label: 'Craft',
            href: '#craft'
        },
        {
            label: 'Open source',
            href: repo,
            external: true
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex min-h-screen flex-col bg-[#FAF7F2] text-[#1B1712] antialiased",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "sticky top-0 z-50 border-b border-[#E7DFD2]/70 bg-[#FAF7F2]/85 backdrop-blur-md",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6",
                        "aria-label": "Main",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "#top",
                                "aria-label": "Iris — home",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$marketing$2f$IrisLogo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IrisLogo"], {}, void 0, false, {
                                    fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                    lineNumber: 423,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                lineNumber: 422,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hidden items-center gap-7 md:flex",
                                children: navLinks.map((l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: l.href,
                                        ...l.external ? {
                                            target: '_blank',
                                            rel: 'noopener noreferrer'
                                        } : {},
                                        className: "text-[13.5px] font-medium text-[#57504A] transition-colors hover:text-[#1B1712]",
                                        children: l.label
                                    }, l.label, false, {
                                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                        lineNumber: 428,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                lineNumber: 426,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hidden items-center gap-2.5 md:flex",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: repo,
                                        target: "_blank",
                                        rel: "noopener noreferrer",
                                        "aria-label": "Iris on GitHub",
                                        className: "flex size-9 items-center justify-center rounded-full border border-[#E7DFD2] bg-white text-[#1B1712] transition-colors hover:border-[#1B1712]",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$github$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Github$3e$__["Github"], {
                                            className: "size-4",
                                            "aria-hidden": "true"
                                        }, void 0, false, {
                                            fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                            lineNumber: 447,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                        lineNumber: 440,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: onEnter,
                                        className: "inline-flex h-9 items-center gap-1.5 rounded-full bg-[#1B1712] px-4 text-[13px] font-medium text-white transition-all hover:bg-[#8B5CF6] hover:shadow-[0_10px_24px_-10px_rgba(139,92,246,0.8)]",
                                        children: [
                                            "Open Studio ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                className: "size-3.5",
                                                "aria-hidden": "true"
                                            }, void 0, false, {
                                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                                lineNumber: 454,
                                                columnNumber: 27
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                        lineNumber: 449,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                lineNumber: 439,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                "aria-label": menuOpen ? 'Close menu' : 'Open menu',
                                "aria-expanded": menuOpen,
                                onClick: ()=>setMenuOpen((v)=>!v),
                                className: "flex size-9 items-center justify-center rounded-full border border-[#E7DFD2] bg-white md:hidden",
                                children: menuOpen ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                    className: "size-4",
                                    "aria-hidden": "true"
                                }, void 0, false, {
                                    fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                    lineNumber: 465,
                                    columnNumber: 25
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                    className: "size-4",
                                    "aria-hidden": "true"
                                }, void 0, false, {
                                    fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                    lineNumber: 465,
                                    columnNumber: 71
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                lineNumber: 458,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                        lineNumber: 421,
                        columnNumber: 9
                    }, this),
                    menuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border-t border-[#E7DFD2] bg-[#FAF7F2] px-4 pb-4 pt-2 md:hidden",
                        children: [
                            navLinks.map((l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: l.href,
                                    ...l.external ? {
                                        target: '_blank',
                                        rel: 'noopener noreferrer'
                                    } : {},
                                    onClick: ()=>setMenuOpen(false),
                                    className: "block rounded-lg px-2 py-2.5 text-[14px] font-medium text-[#57504A] hover:bg-white hover:text-[#1B1712]",
                                    children: l.label
                                }, l.label, false, {
                                    fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                    lineNumber: 472,
                                    columnNumber: 15
                                }, this)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>{
                                    setMenuOpen(false);
                                    onEnter();
                                },
                                className: "mt-2 inline-flex h-10 w-full items-center justify-center gap-1.5 rounded-full bg-[#1B1712] text-[13.5px] font-medium text-white",
                                children: [
                                    "Open Studio ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                        className: "size-3.5",
                                        "aria-hidden": "true"
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                        lineNumber: 490,
                                        columnNumber: 27
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                lineNumber: 482,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                        lineNumber: 470,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                lineNumber: 420,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "top",
                className: "relative overflow-hidden",
                "aria-labelledby": "hero-heading",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        "aria-hidden": "true",
                        className: "pointer-events-none absolute inset-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute -left-40 top-10 size-[420px] rounded-full bg-[#E8A0B0]/25 blur-3xl"
                            }, void 0, false, {
                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                lineNumber: 500,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute -right-40 top-64 size-[460px] rounded-full bg-[#8B5CF6]/15 blur-3xl"
                            }, void 0, false, {
                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                lineNumber: 501,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute bottom-0 left-1/3 size-[380px] rounded-full bg-[#93A89B]/20 blur-3xl"
                            }, void 0, false, {
                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                lineNumber: 502,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                        lineNumber: 499,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-[1.02fr_1fr] lg:gap-8 lg:pb-28 lg:pt-20",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "max-w-xl",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            opacity: 0,
                                            y: 18
                                        },
                                        animate: {
                                            opacity: 1,
                                            y: 0
                                        },
                                        transition: {
                                            duration: 0.6,
                                            ease: EASE
                                        },
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "inline-flex items-center gap-2 rounded-full border border-[#8B5CF6]/25 bg-white/80 px-3.5 py-1.5 text-[12px] font-medium text-[#6D28D9]",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "relative flex size-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-[#8B5CF6] opacity-60"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                                            lineNumber: 514,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "relative inline-flex size-2 rounded-full bg-[#8B5CF6]"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                                            lineNumber: 515,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                                    lineNumber: 513,
                                                    columnNumber: 17
                                                }, this),
                                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$marketing$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BRAND"].version,
                                                " — now open source under MIT"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                            lineNumber: 512,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                        lineNumber: 507,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].h1, {
                                        id: "hero-heading",
                                        initial: {
                                            opacity: 0,
                                            y: 24
                                        },
                                        animate: {
                                            opacity: 1,
                                            y: 0
                                        },
                                        transition: {
                                            duration: 0.7,
                                            delay: 0.08,
                                            ease: EASE
                                        },
                                        className: "font-display mt-5 text-[2.9rem] font-semibold leading-[1.04] tracking-tight text-[#1B1712] sm:text-6xl",
                                        children: [
                                            "Design that",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                                lineNumber: 529,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "italic text-[#8B5CF6]",
                                                children: "blooms."
                                            }, void 0, false, {
                                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                                lineNumber: 530,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                        lineNumber: 521,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
                                        initial: {
                                            opacity: 0,
                                            y: 24
                                        },
                                        animate: {
                                            opacity: 1,
                                            y: 0
                                        },
                                        transition: {
                                            duration: 0.7,
                                            delay: 0.16,
                                            ease: EASE
                                        },
                                        className: "mt-5 text-[16.5px] leading-relaxed text-[#57504A]",
                                        children: "Iris is the open-source, local-first design studio. Sketch, iterate and ship beautiful vector work — no accounts, no uploads, no limits. Just you and the canvas."
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                        lineNumber: 533,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                        initial: {
                                            opacity: 0,
                                            y: 24
                                        },
                                        animate: {
                                            opacity: 1,
                                            y: 0
                                        },
                                        transition: {
                                            duration: 0.7,
                                            delay: 0.24,
                                            ease: EASE
                                        },
                                        className: "mt-8 flex flex-wrap items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: onEnter,
                                                className: "group inline-flex h-12 items-center gap-2 rounded-full bg-[#8B5CF6] px-6 text-[15px] font-medium text-white shadow-[0_16px_32px_-12px_rgba(139,92,246,0.75)] transition-all hover:bg-[#7C4DF3] hover:shadow-[0_20px_40px_-12px_rgba(139,92,246,0.85)]",
                                                children: [
                                                    "Start creating — it's free",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                        className: "size-4 transition-transform group-hover:translate-x-0.5",
                                                        "aria-hidden": "true"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                                        lineNumber: 556,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                                lineNumber: 550,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "#how",
                                                className: "inline-flex h-12 items-center gap-2 rounded-full border border-[#1B1712]/15 bg-white/70 px-6 text-[15px] font-medium text-[#1B1712] transition-colors hover:border-[#1B1712]/40",
                                                children: [
                                                    "See how it works ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDown$3e$__["ArrowDown"], {
                                                        className: "size-4",
                                                        "aria-hidden": "true"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                                        lineNumber: 562,
                                                        columnNumber: 34
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                                lineNumber: 558,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                        lineNumber: 544,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].ul, {
                                        initial: {
                                            opacity: 0
                                        },
                                        animate: {
                                            opacity: 1
                                        },
                                        transition: {
                                            duration: 0.8,
                                            delay: 0.4
                                        },
                                        className: "mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[12.5px] text-[#57504A]",
                                        children: [
                                            'MIT licensed',
                                            'Works offline',
                                            'Your files stay on your machine'
                                        ].map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "inline-flex items-center gap-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "size-1.5 rounded-full bg-[#93A89B]",
                                                        "aria-hidden": "true"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                                        lineNumber: 574,
                                                        columnNumber: 19
                                                    }, this),
                                                    t
                                                ]
                                            }, t, true, {
                                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                                lineNumber: 573,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                        lineNumber: 566,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                lineNumber: 506,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                initial: {
                                    opacity: 0,
                                    y: 32,
                                    scale: 0.97
                                },
                                animate: {
                                    opacity: 1,
                                    y: 0,
                                    scale: 1
                                },
                                transition: {
                                    duration: 0.8,
                                    delay: 0.2,
                                    ease: EASE
                                },
                                className: "relative mx-auto w-full max-w-[560px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StudioMock, {}, void 0, false, {
                                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                        lineNumber: 588,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Polaroid, {
                                        src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$marketing$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IMAGES"].bouquet,
                                        alt: "Bouquet of handmade crepe-paper flowers in orange, pink and violet",
                                        caption: "made by hand",
                                        rotate: -7,
                                        floatDelay: 0.4,
                                        className: "absolute -left-10 -top-10 hidden w-32 lg:block xl:w-36"
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                        lineNumber: 591,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Polaroid, {
                                        src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$marketing$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IMAGES"].pastelWall,
                                        alt: "Pastel paper rose wall fading from blush pink to cream",
                                        caption: "petal by petal",
                                        rotate: 6,
                                        floatDelay: 1.2,
                                        className: "absolute -bottom-12 -left-6 hidden w-36 lg:block xl:w-40"
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                        lineNumber: 599,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Polaroid, {
                                        src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$marketing$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IMAGES"].orangeRoses,
                                        alt: "Orange crepe-paper roses in a white vase against a slate wall",
                                        caption: "craft first",
                                        rotate: 8,
                                        floatDelay: 0.8,
                                        className: "absolute -right-8 top-1/3 hidden w-28 lg:block xl:w-32"
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                        lineNumber: 607,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                lineNumber: 582,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                        lineNumber: 505,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mx-auto -mt-8 flex max-w-md justify-center gap-4 px-4 pb-14 lg:hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Polaroid, {
                                src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$marketing$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IMAGES"].bouquet,
                                alt: "Handmade crepe-paper flower bouquet",
                                rotate: -4,
                                tape: false,
                                className: "w-28"
                            }, void 0, false, {
                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                lineNumber: 620,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Polaroid, {
                                src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$marketing$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IMAGES"].pastelWall,
                                alt: "Pastel paper rose wall",
                                rotate: 3,
                                tape: false,
                                className: "w-28"
                            }, void 0, false, {
                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                lineNumber: 621,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Polaroid, {
                                src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$marketing$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IMAGES"].orangeRoses,
                                alt: "Orange paper roses in a vase",
                                rotate: -2,
                                tape: false,
                                className: "w-28"
                            }, void 0, false, {
                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                lineNumber: 622,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                        lineNumber: 619,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                lineNumber: 497,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "border-y border-[#E7DFD2] bg-white/60",
                "aria-label": "Iris at a glance",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto grid max-w-6xl grid-cols-2 divide-[#E7DFD2] px-4 sm:px-6 md:grid-cols-4 md:divide-x",
                    children: [
                        {
                            k: '100%',
                            v: 'local — files never leave the device'
                        },
                        {
                            k: '0',
                            v: 'servers, accounts & trackers'
                        },
                        {
                            k: 'MIT',
                            v: 'open-source license, free forever'
                        },
                        {
                            k: '60 fps',
                            v: 'canvas, on everyday hardware'
                        }
                    ].map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Reveal, {
                            delay: i * 0.06,
                            className: "px-2 py-7 text-center md:py-9",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-display text-3xl font-semibold text-[#1B1712]",
                                    children: s.k
                                }, void 0, false, {
                                    fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                    lineNumber: 636,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-1.5 text-[12px] leading-snug text-[#57504A]",
                                    children: s.v
                                }, void 0, false, {
                                    fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                    lineNumber: 637,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, s.k, true, {
                            fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                            lineNumber: 635,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                    lineNumber: 628,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                lineNumber: 627,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "how",
                className: "scroll-mt-20",
                "aria-labelledby": "how-heading",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-24",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Reveal, {
                            className: "max-w-2xl",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionEyebrow, {
                                    children: "How it works"
                                }, void 0, false, {
                                    fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                    lineNumber: 647,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    id: "how-heading",
                                    className: "font-display mt-4 text-4xl font-semibold tracking-tight sm:text-[2.75rem]",
                                    children: "From first petal to final pixel"
                                }, void 0, false, {
                                    fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                    lineNumber: 648,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-4 text-[15.5px] leading-relaxed text-[#57504A]",
                                    children: "Three steps. Twelve seconds. No onboarding emails, no “verify your workspace”. Iris gets out of the way so the making can start."
                                }, void 0, false, {
                                    fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                    lineNumber: 651,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                            lineNumber: 646,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-12 grid gap-5 md:grid-cols-3",
                            children: STEPS.map((s, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Reveal, {
                                    delay: i * 0.1,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                        className: "group h-full rounded-2xl border border-[#E7DFD2] bg-white p-5 transition-all hover:-translate-y-1 hover:border-[#8B5CF6]/40 hover:shadow-[0_24px_48px_-24px_rgba(27,23,18,0.25)]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StepVisual, {
                                                step: i + 1
                                            }, void 0, false, {
                                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                                lineNumber: 661,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-5 flex items-baseline gap-3",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-display text-[13px] font-semibold text-[#8B5CF6]",
                                                        children: s.n
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                                        lineNumber: 663,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        className: "text-[16px] font-semibold",
                                                        children: s.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                                        lineNumber: 664,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                                lineNumber: 662,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-2 text-[13.5px] leading-relaxed text-[#57504A]",
                                                children: s.copy
                                            }, void 0, false, {
                                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                                lineNumber: 666,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                        lineNumber: 660,
                                        columnNumber: 17
                                    }, this)
                                }, s.n, false, {
                                    fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                    lineNumber: 659,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                            lineNumber: 657,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                    lineNumber: 645,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                lineNumber: 644,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "product",
                className: "scroll-mt-20 border-y border-[#E7DFD2] bg-white/60",
                "aria-labelledby": "features-heading",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-24",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Reveal, {
                            className: "mx-auto max-w-2xl text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionEyebrow, {
                                    children: "The toolkit"
                                }, void 0, false, {
                                    fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                    lineNumber: 678,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    id: "features-heading",
                                    className: "font-display mt-4 text-4xl font-semibold tracking-tight sm:text-[2.75rem]",
                                    children: "A studio-grade toolkit, handcrafted"
                                }, void 0, false, {
                                    fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                    lineNumber: 679,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-4 text-[15.5px] leading-relaxed text-[#57504A]",
                                    children: "Every Figma behaviour you muscle-memory — selection, snapping, groups, undo — rebuilt cleanly from scratch and tuned for the browser."
                                }, void 0, false, {
                                    fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                    lineNumber: 682,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                            lineNumber: 677,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3",
                            children: FEATURES.map((f, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Reveal, {
                                    delay: i % 3 * 0.08,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                        className: "group h-full rounded-2xl border border-[#E7DFD2] bg-[#FAF7F2] p-6 transition-all hover:-translate-y-1 hover:border-[#8B5CF6]/40 hover:bg-white hover:shadow-[0_24px_48px_-24px_rgba(27,23,18,0.25)]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "flex size-11 items-center justify-center rounded-xl bg-[#F1EBFC] text-[#6D28D9] transition-colors group-hover:bg-[#8B5CF6] group-hover:text-white",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(f.icon, {
                                                            className: "size-5",
                                                            "aria-hidden": "true"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                                            lineNumber: 694,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                                        lineNumber: 693,
                                                        columnNumber: 21
                                                    }, this),
                                                    f.kbd && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("kbd", {
                                                        className: "rounded-md border border-[#E7DFD2] bg-white px-2 py-0.5 font-mono text-[11px] text-[#57504A]",
                                                        children: f.kbd
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                                        lineNumber: 697,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                                lineNumber: 692,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "mt-4 text-[15.5px] font-semibold",
                                                children: f.title
                                            }, void 0, false, {
                                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                                lineNumber: 702,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "mt-2 text-[13.5px] leading-relaxed text-[#57504A]",
                                                children: f.copy
                                            }, void 0, false, {
                                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                                lineNumber: 703,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                        lineNumber: 691,
                                        columnNumber: 17
                                    }, this)
                                }, f.title, false, {
                                    fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                    lineNumber: 690,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                            lineNumber: 688,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                    lineNumber: 676,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                lineNumber: 675,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                id: "craft",
                className: "scroll-mt-20",
                "aria-labelledby": "craft-heading",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.15fr] lg:gap-16 lg:py-28",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "lg:sticky lg:top-28 lg:self-start",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Reveal, {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionEyebrow, {
                                        children: "Our craft"
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                        lineNumber: 716,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        id: "craft-heading",
                                        className: "font-display mt-4 text-4xl font-semibold tracking-tight sm:text-[2.75rem]",
                                        children: [
                                            "Paper petals,",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                                lineNumber: 719,
                                                columnNumber: 17
                                            }, this),
                                            "pixel petals."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                        lineNumber: 717,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-5 text-[15.5px] leading-relaxed text-[#57504A]",
                                        children: "Iris is named after the flower, and built like one — layer upon layer of carefully creased code. We are a small studio of makers who fold paper flowers in the evening and shape vectors by day."
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                        lineNumber: 722,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-4 text-[15.5px] leading-relaxed text-[#57504A]",
                                        children: "We believe software should feel handmade: warm, precise, and a little bit playful. That is why every pixel in Iris is crafted in the open, and why our walls are always in bloom."
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                        lineNumber: 727,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: repo,
                                        target: "_blank",
                                        rel: "noopener noreferrer",
                                        className: "group mt-7 inline-flex items-center gap-2 text-[14px] font-medium text-[#6D28D9] transition-colors hover:text-[#8B5CF6]",
                                        children: [
                                            "See how we build",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                className: "size-4 transition-transform group-hover:translate-x-1",
                                                "aria-hidden": "true"
                                            }, void 0, false, {
                                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                                lineNumber: 739,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                        lineNumber: 732,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mt-8 border-t border-[#E7DFD2] pt-4 text-[11.5px] leading-relaxed text-[#57504A]/80",
                                        children: "Imagery: handmade paper flowers by independent craft studios. Used with appreciation, made with crepe paper."
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                        lineNumber: 741,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                lineNumber: 715,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                            lineNumber: 714,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "columns-1 gap-5 sm:columns-2 [&>*]:mb-5",
                            children: GALLERY.map((g, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Polaroid, {
                                    src: g.src,
                                    alt: g.alt,
                                    caption: g.caption,
                                    rotate: g.rotate,
                                    floatDelay: i * 0.5,
                                    className: "break-inside-avoid"
                                }, g.src, false, {
                                    fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                    lineNumber: 750,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                            lineNumber: 748,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                    lineNumber: 713,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                lineNumber: 712,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "relative overflow-hidden bg-[#1B1712] text-white",
                "aria-labelledby": "manifesto-heading",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        "aria-hidden": "true",
                        className: "pointer-events-none absolute inset-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute -left-24 top-0 size-72 rounded-full bg-[#8B5CF6]/25 blur-3xl"
                            }, void 0, false, {
                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                lineNumber: 767,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute -right-24 bottom-0 size-72 rounded-full bg-[#E8A0B0]/15 blur-3xl"
                            }, void 0, false, {
                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                lineNumber: 768,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                        lineNumber: 766,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:py-32",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Reveal, {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$marketing$2f$IrisLogo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IrisMark"], {
                                    size: 34,
                                    className: "mx-auto"
                                }, void 0, false, {
                                    fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                    lineNumber: 772,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    id: "manifesto-heading",
                                    className: "font-display mt-8 text-[2rem] font-medium italic leading-snug tracking-tight sm:text-[2.6rem]",
                                    children: [
                                        "“Tools should disappear.",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                            fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                            lineNumber: 775,
                                            columnNumber: 15
                                        }, this),
                                        "Craft should remain.”"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                    lineNumber: 773,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-6 text-[12px] font-medium uppercase tracking-[0.22em] text-white/50",
                                    children: "The Iris manifesto"
                                }, void 0, false, {
                                    fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                    lineNumber: 778,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-10 flex flex-wrap items-center justify-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: repo,
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "inline-flex h-11 items-center gap-2 rounded-full border border-white/20 px-5 text-[13.5px] font-medium text-white transition-colors hover:border-white/60",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$github$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Github$3e$__["Github"], {
                                                    className: "size-4",
                                                    "aria-hidden": "true"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                                    lineNumber: 788,
                                                    columnNumber: 17
                                                }, this),
                                                " Read the source"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                            lineNumber: 782,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "inline-flex items-center gap-1.5 rounded-full border border-white/10 px-4 py-2.5 text-[12.5px] text-white/60",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$cloud$2d$off$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CloudOff$3e$__["CloudOff"], {
                                                    className: "size-3.5",
                                                    "aria-hidden": "true"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                                    lineNumber: 791,
                                                    columnNumber: 17
                                                }, this),
                                                " No cloud required"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                            lineNumber: 790,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                    lineNumber: 781,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                            lineNumber: 771,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                        lineNumber: 770,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                lineNumber: 765,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                "aria-labelledby": "cta-heading",
                className: "px-4 py-20 sm:px-6 lg:py-24",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Reveal, {
                    className: "mx-auto max-w-6xl",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#8B5CF6] via-[#7C4DF3] to-[#6D28D9] px-6 py-16 text-center text-white sm:px-12 lg:py-20",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                "aria-hidden": "true",
                                className: "pointer-events-none absolute inset-0",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute -left-16 -top-16 size-56 rounded-full bg-white/10 blur-2xl"
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                        lineNumber: 803,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute -bottom-20 -right-10 size-64 rounded-full bg-[#E8A0B0]/25 blur-3xl"
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                        lineNumber: 804,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "absolute right-10 top-8 size-16 text-white/15",
                                        viewBox: "0 0 16 16",
                                        "aria-hidden": "true",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                            fill: "currentColor",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                                                    cx: "8",
                                                    cy: "4.6",
                                                    rx: "2.7",
                                                    ry: "4.5"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                                    lineNumber: 807,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                                                    cx: "8",
                                                    cy: "4.6",
                                                    rx: "2.7",
                                                    ry: "4.5",
                                                    transform: "rotate(120 8 8)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                                    lineNumber: 808,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                                                    cx: "8",
                                                    cy: "4.6",
                                                    rx: "2.7",
                                                    ry: "4.5",
                                                    transform: "rotate(240 8 8)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                                    lineNumber: 809,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                            lineNumber: 806,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                        lineNumber: 805,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        className: "absolute bottom-10 left-12 size-10 text-white/15",
                                        viewBox: "0 0 16 16",
                                        "aria-hidden": "true",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                                            fill: "currentColor",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                                                    cx: "8",
                                                    cy: "4.6",
                                                    rx: "2.7",
                                                    ry: "4.5"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                                    lineNumber: 814,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                                                    cx: "8",
                                                    cy: "4.6",
                                                    rx: "2.7",
                                                    ry: "4.5",
                                                    transform: "rotate(120 8 8)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                                    lineNumber: 815,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ellipse", {
                                                    cx: "8",
                                                    cy: "4.6",
                                                    rx: "2.7",
                                                    ry: "4.5",
                                                    transform: "rotate(240 8 8)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                                    lineNumber: 816,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                            lineNumber: 813,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                        lineNumber: 812,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                lineNumber: 802,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        id: "cta-heading",
                                        className: "font-display mx-auto max-w-xl text-4xl font-semibold tracking-tight sm:text-[2.8rem]",
                                        children: "Ready to make something beautiful?"
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                        lineNumber: 821,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-white/85",
                                        children: "Open the studio and start your first document — it takes twelve seconds, and it's free forever."
                                    }, void 0, false, {
                                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                        lineNumber: 824,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "mt-9 flex flex-wrap items-center justify-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: onEnter,
                                                className: "inline-flex h-12 items-center gap-2 rounded-full bg-white px-7 text-[15px] font-semibold text-[#6D28D9] shadow-xl transition-transform hover:scale-[1.03]",
                                                children: [
                                                    "Start creating — free ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                        className: "size-4",
                                                        "aria-hidden": "true"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                                        lineNumber: 834,
                                                        columnNumber: 41
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                                lineNumber: 829,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: repo,
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                className: "inline-flex h-12 items-center gap-2 rounded-full border border-white/35 px-6 text-[14px] font-medium text-white transition-colors hover:border-white/80",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$star$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Star$3e$__["Star"], {
                                                        className: "size-4",
                                                        "aria-hidden": "true"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                                        lineNumber: 842,
                                                        columnNumber: 19
                                                    }, this),
                                                    " Star on GitHub"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                                lineNumber: 836,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                        lineNumber: 828,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                lineNumber: 820,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                        lineNumber: 801,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                    lineNumber: 800,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                lineNumber: 799,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: "mt-auto border-t border-[#E7DFD2] bg-[#F3EDE3]",
                "aria-label": "Footer",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mx-auto max-w-6xl px-4 py-14 sm:px-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$marketing$2f$IrisLogo$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["IrisLogo"], {}, void 0, false, {
                                            fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                            lineNumber: 855,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-4 max-w-xs text-[13px] leading-relaxed text-[#57504A]",
                                            children: [
                                                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$iris$2f$marketing$2f$brand$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BRAND"].tagline,
                                                ". Vector design that lives on your machine — open source and free forever."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                            lineNumber: 856,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: repo,
                                            target: "_blank",
                                            rel: "noopener noreferrer",
                                            className: "mt-5 inline-flex h-9 items-center gap-2 rounded-full border border-[#1B1712]/15 bg-white px-4 text-[12.5px] font-medium text-[#1B1712] transition-colors hover:border-[#1B1712]/50",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$github$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Github$3e$__["Github"], {
                                                    className: "size-3.5",
                                                    "aria-hidden": "true"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                                    lineNumber: 866,
                                                    columnNumber: 17
                                                }, this),
                                                " thebluedogcorp/iris"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                            lineNumber: 860,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                    lineNumber: 854,
                                    columnNumber: 13
                                }, this),
                                [
                                    {
                                        h: 'Product',
                                        links: [
                                            {
                                                label: 'Features',
                                                href: '#product'
                                            },
                                            {
                                                label: 'How it works',
                                                href: '#how'
                                            },
                                            {
                                                label: 'Our craft',
                                                href: '#craft'
                                            },
                                            {
                                                label: 'Open the Studio',
                                                href: '#top'
                                            }
                                        ]
                                    },
                                    {
                                        h: 'Resources',
                                        links: [
                                            {
                                                label: 'README & docs',
                                                href: `${repo}#readme`,
                                                external: true
                                            },
                                            {
                                                label: 'Keyboard shortcuts',
                                                href: `${repo}#keyboard-shortcuts`,
                                                external: true
                                            },
                                            {
                                                label: '.iris file format',
                                                href: `${repo}#iris-document-format`,
                                                external: true
                                            },
                                            {
                                                label: 'Releases',
                                                href: `${repo}/releases`,
                                                external: true
                                            }
                                        ]
                                    },
                                    {
                                        h: 'Community',
                                        links: [
                                            {
                                                label: 'GitHub',
                                                href: repo,
                                                external: true
                                            },
                                            {
                                                label: 'Report an issue',
                                                href: `${repo}/issues/new/choose`,
                                                external: true
                                            },
                                            {
                                                label: 'Discussions',
                                                href: `${repo}/discussions`,
                                                external: true
                                            },
                                            {
                                                label: 'MIT License',
                                                href: `${repo}/blob/main/LICENSE`,
                                                external: true
                                            }
                                        ]
                                    }
                                ].map((col)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                        "aria-label": col.h,
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-[12px] font-semibold uppercase tracking-[0.14em] text-[#1B1712]",
                                                children: col.h
                                            }, void 0, false, {
                                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                                lineNumber: 900,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                className: "mt-4 flex flex-col gap-2.5",
                                                children: col.links.map((l)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                            href: l.href,
                                                            ...'external' in l && l.external ? {
                                                                target: '_blank',
                                                                rel: 'noopener noreferrer'
                                                            } : {},
                                                            className: "text-[13.5px] text-[#57504A] transition-colors hover:text-[#1B1712]",
                                                            children: l.label
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                                            lineNumber: 904,
                                                            columnNumber: 23
                                                        }, this)
                                                    }, l.label, false, {
                                                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                                        lineNumber: 903,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                                lineNumber: 901,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, col.h, true, {
                                        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                        lineNumber: 899,
                                        columnNumber: 15
                                    }, this))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                            lineNumber: 853,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-12 flex flex-col items-center justify-between gap-3 border-t border-[#E7DFD2] pt-6 sm:flex-row",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[12.5px] text-[#57504A]",
                                    children: "© 2025 Iris Studio · Crafted with paper petals & pixels."
                                }, void 0, false, {
                                    fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                    lineNumber: 919,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "inline-flex items-center gap-1.5 text-[12.5px] text-[#57504A]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flower$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Flower2$3e$__["Flower2"], {
                                            className: "size-3.5 text-[#8B5CF6]",
                                            "aria-hidden": "true"
                                        }, void 0, false, {
                                            fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                            lineNumber: 923,
                                            columnNumber: 15
                                        }, this),
                                        "Local-first. Always."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                                    lineNumber: 922,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                            lineNumber: 918,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                    lineNumber: 852,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/iris/marketing/LandingPage.tsx",
                lineNumber: 851,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/iris/marketing/LandingPage.tsx",
        lineNumber: 418,
        columnNumber: 5
    }, this);
}
_s(LandingPage, "K77eQVFAaxZgbvGoNWFAiCE7OTY=");
_c5 = LandingPage;
var _c, _c1, _c2, _c3, _c4, _c5;
__turbopack_context__.k.register(_c, "Reveal");
__turbopack_context__.k.register(_c1, "SectionEyebrow");
__turbopack_context__.k.register(_c2, "Polaroid");
__turbopack_context__.k.register(_c3, "StudioMock");
__turbopack_context__.k.register(_c4, "StepVisual");
__turbopack_context__.k.register(_c5, "LandingPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_iris_marketing_e2a3a264._.js.map