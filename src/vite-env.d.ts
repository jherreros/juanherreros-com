
/// <reference types="vite/client" />

declare module '*.md' {
  import type { BlogPost } from '@/lib/types';
  const content: BlogPost;
  export default content;
}

// Add declaration for content plugin
declare module '@originjs/vite-plugin-content' {
  const contentPlugin: any;
  export default contentPlugin;
}
