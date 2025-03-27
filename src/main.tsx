
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './styles/mobile.css'

// Set viewport meta tag for mobile responsiveness
const setViewportMeta = () => {
  const viewport = document.querySelector('meta[name="viewport"]');
  if (viewport) {
    viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
  } else {
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no';
    document.head.appendChild(meta);
  }
  
  // Add theme color for mobile browsers
  const themeColor = document.createElement('meta');
  themeColor.name = 'theme-color';
  themeColor.content = '#F9F5EB'; // book-paper color
  document.head.appendChild(themeColor);
};

setViewportMeta();
createRoot(document.getElementById("root")!).render(<App />);
