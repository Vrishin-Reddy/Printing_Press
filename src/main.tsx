import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
// Mobile viewport height CSS var for Safari/Firefox address bar behavior
function setVH() {
  document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
}
setVH();
addEventListener("resize", setVH);
addEventListener("orientationchange", setVH);
import './index.css'
import { Analytics } from '@vercel/analytics/react'

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
    <Analytics />
  </React.StrictMode>
);
