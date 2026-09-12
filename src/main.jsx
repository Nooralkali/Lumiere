import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

import './styles/fonts.css';
import './styles/classical.css';
import './styles/site.css';
import './styles/pricing.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* BASE_URL is "/" locally and "/Lumiere/" in the Pages build. */}
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
