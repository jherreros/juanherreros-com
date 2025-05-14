
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Enable debug logging
console.log("Starting application");

// Add global error handler to catch issues with markdown imports
window.addEventListener('error', (event) => {
  console.error("Global error caught:", event.error);
});

createRoot(document.getElementById("root")!).render(<App />);
