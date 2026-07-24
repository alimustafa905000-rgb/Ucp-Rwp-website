export const localDb = {
  read(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  },
  write(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
};

export function ensureSeed(key, fallbackValue) {
  if (!localStorage.getItem(key)) localDb.write(key, fallbackValue);
}