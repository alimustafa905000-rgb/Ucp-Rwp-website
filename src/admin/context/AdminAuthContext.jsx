import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";

const AdminAuthContext = createContext(null);
const LS_KEY = "uni_admin_session";

/**
 * Local demo auth:
 * email: admin@ucp.com
 * pass:  admin123
 *
 * Later replace login() with axios POST /api/auth/login and store real JWT.
 */
export default function AdminAuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(null); // fake token for now
  const [loading, setLoading] = useState(true);
  const timerRef = useRef(null);

  const clearTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const logout = (expired = false) => {
    clearTimer();
    setAdmin(null);
    setToken(null);
    localStorage.removeItem(LS_KEY);
    if (expired) toast.error("Session expired. Please login again.");
  };

  const scheduleAutoLogout = (expiresAtMs) => {
    clearTimer();
    const msLeft = expiresAtMs - Date.now();
    if (msLeft <= 0) return logout(true);
    timerRef.current = setTimeout(() => logout(true), msLeft);
  };

  const login = async ({ email, password, remember }) => {
    if (email !== "admin@ucp.com" || password !== "admin123") {
      throw new Error("Invalid credentials (use admin@ucp.com / admin123)");
    }

    // Fake JWT-like token + expiry (2 hours)
    const fakeToken = `local.${btoa(email)}.${Date.now()}`;
    const expiresAtMs = Date.now() + 2 * 60 * 60 * 1000;

    const adminObj = { name: "University Admin", email, role: "admin" };

    setAdmin(adminObj);
    setToken(fakeToken);
    scheduleAutoLogout(expiresAtMs);

    if (remember) {
      localStorage.setItem(LS_KEY, JSON.stringify({ admin: adminObj, token: fakeToken, expiresAtMs }));
    }
  };

  useEffect(() => {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return setLoading(false);

    try {
      const saved = JSON.parse(raw);
      if (saved.expiresAtMs <= Date.now()) {
        localStorage.removeItem(LS_KEY);
        setLoading(false);
        return;
      }
      setAdmin(saved.admin);
      setToken(saved.token);
      scheduleAutoLogout(saved.expiresAtMs);
    } catch {
      localStorage.removeItem(LS_KEY);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(
    () => ({ admin, token, loading, isAuthed: !!token, login, logout }),
    [admin, token, loading]
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export const useAdminAuth = () => useContext(AdminAuthContext);