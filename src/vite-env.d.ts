
/// <reference types="vite/client" />

declare module '*.md' {
  import type { BlogPost } from '@/lib/types';
  const content: BlogPost;
  export default content;
}
