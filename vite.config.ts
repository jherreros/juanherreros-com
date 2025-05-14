
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { fileURLToPath, URL } from 'node:url';
import path from 'path';
import { plugin as markdown, Mode } from 'vite-plugin-markdown';
import { componentTagger } from 'lovable-tagger';
// Import the content plugin
import contentPluginModule from '@originjs/vite-plugin-content';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    markdown({ mode: [Mode.REACT] }),
    // The plugin might be a factory or directly usable
    // Try both approaches by checking its type
    typeof contentPluginModule === 'function' 
      ? contentPluginModule() 
      : contentPluginModule,
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
