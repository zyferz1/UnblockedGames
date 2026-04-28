import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './SimpleApp.jsx';
import './index.css';

console.log("main.jsx: loading SimpleApp");
const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
