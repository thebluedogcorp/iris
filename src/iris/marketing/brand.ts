/**
 * Shared brand constants for the Iris marketing site: palette, product
 * links, imagery and copy. Handmade paper flowers are the visual metaphor —
 * Iris is crafted, warm and creative, not another cold enterprise tool.
 *
 * Imagery is sourced from public web searches (craft studios / paper-flower
 * makers) and re-hosted on a CDN for stable embedding. Keep this file the
 * single source of truth for the marketing visual identity.
 */

export const BRAND = {
  name: 'Iris',
  tagline: 'The open-source, local-first design studio',
  repoUrl: 'https://github.com/thebluedogcorp/iris',
  version: 'v1.0.0',
} as const;

/**
 * Verified (no watermark) paper-flower photography. Width/height kept next
 * to each URL so layout containers can pick the right aspect ratios.
 */
export const IMAGES = {
  /** Hero polaroid — crepe-paper bouquet (poppies, anemones). Portrait. */
  bouquet: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/6bcad252a12e.jpg',
  /** Hero polaroid — pastel paper rose wall fading pink → cream. Square. */
  pastelWall: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/86e0064bb0c1.jpg',
  /** Hero polaroid — orange crepe roses in a white vase. Portrait. */
  orangeRoses: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/fa8f18b9e18d.jpg',
  /** Auth side panel — macro lilac paper flowers on charcoal. Landscape. */
  lilacMacro: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/da4070d18b12.jpg',
  /** Craft gallery — maker holding giant paper roses. Portrait. */
  giantRoses: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/9b2304600e78.jpeg',
  /** Craft gallery — purple paper hyacinths with paint palette. Portrait. */
  hyacinth: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/adbafef4bc07.jpg',
  /** Craft gallery — purple statice close-up. Square. */
  statice: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/5827a318626b.webp',
  /** Craft gallery — DIY paper flower wall in a home. Portrait. */
  diyWall: 'https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/1f8fd29dcf11.jpg',
} as const;

/** Warm-paper palette used across the marketing pages. */
export const PALETTE = {
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
  line: '#E7DFD2',
} as const;
