
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { fileURLToPath, URL } from 'node:url';
import path from 'path';
import { plugin as markdown, Mode } from 'vite-plugin-markdown';
import { componentTagger } from 'lovable-tagger';
// Import the content plugin with type assertion to avoid TypeScript errors
// @ts-ignore - Using type declaration from src/types.d.ts
import contentPlugin from '@originjs/vite-plugin-content';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    markdown({ mode: [Mode.REACT] }),
    // Use the plugin directly - TypeScript should now recognize it
    contentPlugin,
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
    port: 8080,
    proxy: {
      '/api/speakerdeck': {
        target: 'https://speakerdeck.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/speakerdeck/, ''),
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request to the Target:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
          });
        }
      }
    }
  }
}));
