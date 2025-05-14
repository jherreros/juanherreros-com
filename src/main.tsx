
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Enable debug logging for markdown imports
console.log("Starting application");

createRoot(document.getElementById("root")!).render(<App />);
