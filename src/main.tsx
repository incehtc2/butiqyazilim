import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const root = document.getElementById('root')!;
createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

const splash = document.getElementById('splash');
if (splash) {
  splash.style.opacity = '0';
  setTimeout(() => splash.remove(), 300);
}
