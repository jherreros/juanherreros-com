
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { fileURLToPath, URL } from 'node:url';
import path from 'path';
import { plugin as markdown, Mode } from 'vite-plugin-markdown';
import { componentTagger } from 'lovable-tagger';
import content from '@originjs/vite-plugin-content';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    markdown({ mode: [Mode.REACT] }),
    content(),  // The content plugin is correctly imported and used here
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  assetsInclude: ['**/*.md'],
  server: {
    host: "::",
    port: 8080
  }
}));
