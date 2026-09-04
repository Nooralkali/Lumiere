import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import BackToTop from './components/BackToTop.jsx';
import Home from './pages/Home.jsx';
import Pricing from './pages/Pricing.jsx';
import NotFound from './pages/NotFound.jsx';

/* React Router leaves scroll position alone, so the anchors in the nav — which
   now cross pages — are honoured here: a hash scrolls to its section, a bare
   path returns to the top. */
function ScrollManager() {
  const { pathname, hash, key } = useLocation();

  useEffect(() => {
    if (hash) {
      // The target may mount a tick after the route does.
      const id = hash.slice(1);
      const jump = () => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ block: 'start' });
      };
      jump();
      const t = setTimeout(jump, 60);
      return () => clearTimeout(t);
    }

    window.scrollTo(0, 0);
    return undefined;
  }, [pathname, hash, key]);

  return null;
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
