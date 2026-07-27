import { Navigate, Route, Routes } from "react-router-dom";
import { useAdminAuth } from "../admin/context/AdminAuthContext";

import Layout from "../components/Layout"; 
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
 

import AdminLogin from "../admin/pages/AdminLogin";
import AdminShell from "../admin/components/AdminShell";
import Dashboard from "../admin/pages/Dashboard";
import HomeEditor from "../admin/pages/HomeEditor";
import AboutEditor from "../admin/pages/AboutEditor";
import Notices from "../admin/pages/Notices";
import Magazines from "../admin/pages/Magazines";
import Projects from "../admin/pages/Projects";
import CampusInfo from "../admin/pages/CampusInfo";
import ContactMessages from "../admin/pages/ContactMessages";
import SocietyManager from "../admin/pages/SocietyManager";

function Protected({ children }) {
  const { isAuthed, loading } = useAdminAuth();
  if (loading) return <div className="p-6 text-slate-600">Loading...</div>;
  return isAuthed ? children : <Navigate to="/admin/login" replace />;
}

export default function AppRoutes() {
  return (
    <Routes>
      
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {/* add other existing routes */}
      </Route>

      
      <Route path="/admin/login" element={<AdminLogin />} />

      <Route
        path="/admin"
        element={
          <Protected>
            <AdminShell />
          </Protected>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="home" element={<HomeEditor />} />
        <Route path="about" element={<AboutEditor />} />
        <Route path="notices" element={<Notices />} />
        <Route path="magazines" element={<Magazines />} />
        <Route path="projects" element={<Projects />} />
        <Route path="campus-info" element={<CampusInfo />} />
        <Route path="contact-messages" element={<ContactMessages />} />
        <Route path="societies/:societyKey" element={<SocietyManager />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}