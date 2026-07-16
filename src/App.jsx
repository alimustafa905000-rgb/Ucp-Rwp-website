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

export default function App() {
  return (
    <BrowserRouter>
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

        
      </Routes>
    </BrowserRouter>
  );
}
