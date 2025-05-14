
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add global type declaration for markdown imports
declare module '*.md' {
  const content: string;
  export default content;
}

createRoot(document.getElementById("root")!).render(<App />);
