import React, {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.jsx';
import './index.css';

window.addEventListener('error', (event) => {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    rootElement.innerHTML = `<div style="background: black; color: red; padding: 20px; font-family: monospace;">
      <h3>CRITICAL_RUNTIME_ERROR</h3>
      <pre>${event.message}</pre>
      <p>Source: ${event.filename}:${event.lineno}</p>
    </div>`;
  }
});

const rootElement = document.getElementById('root');
if (rootElement) {
  try {
    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  } catch (error) {
    rootElement.innerHTML = `<div style="background: black; color: red; padding: 20px; font-family: monospace;">
      <h3>MOUNT_ERROR</h3>
      <pre>${error.message}</pre>
    </div>`;
  }
} else {
  console.error("No root element found");
}
