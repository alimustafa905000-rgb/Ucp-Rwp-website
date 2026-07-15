import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useScrollEffects } from '../hooks/useScrollEffects';

export default function Layout() {
  const { progress, scrolled, showBackToTop } = useScrollEffects();
  const location = useLocation();

  // Drives a short fade + slide-up transition every time the route changes,
  // so navigating between pages never feels like an abrupt hard cut.
  const [transitionStage, setTransitionStage] = useState('page-enter');

  // Scroll to top on every route change, just like navigating between pages
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    setTransitionStage('page-enter');
    const timer = requestAnimationFrame(() => setTransitionStage('page-enter page-enter-active'));
    return () => cancelAnimationFrame(timer);
  }, [location.pathname]);

  return (
    <>
      <div id="scroll-progress" style={{ width: `${progress}%` }} />

      <button
        id="back-to-top"
        aria-label="Back to top"
        className={showBackToTop ? 'visible' : ''}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <i className="fas fa-arrow-up"></i>
      </button>

      <Navbar scrolled={scrolled} />

      <main key={location.pathname} className={transitionStage}>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}
