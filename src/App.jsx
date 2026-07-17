import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Societies from './pages/Societies/Societies';
import CampusInfo from './pages/CampusInfo/CampusInfo';
import NoticeBoard from './pages/NoticeBoard/NoticeBoard';
import EMagazine from './pages/EMagazine/EMagazine';
import Projects from './pages/Projects/Projects';
import Contact from './pages/Contact/Contact';
import AdminDashboard from './pages/Admin/AdminDashboard';

// 👇 Import the scroll hook
import { useScrollEffects } from './hooks/useScrollEffects';

// Optional: You can move this component to a separate file later
function BackToTopButton() {
  const { showBackToTop } = useScrollEffects();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      ↑
    </button>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      {/* Back‑to‑Top button – visible on all pages */}
      <BackToTopButton />

      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/societies" element={<Societies />} />
          <Route path="/campus-info" element={<CampusInfo />} />
          <Route path="/notice-board" element={<NoticeBoard />} />
          <Route path="/e-magazine" element={<EMagazine />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        {/* You can add admin route here if needed */}
      </Routes>
    </BrowserRouter>
  );
}