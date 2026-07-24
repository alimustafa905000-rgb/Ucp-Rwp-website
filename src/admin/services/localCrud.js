import { localDb } from "./localDb";
import { uid } from "../utils/id";

export function createLocalCrudService({ key, defaults = [] }) {
  const readAll = () => localDb.read(key, defaults);
  const writeAll = (items) => localDb.write(key, items);

  return {
    list({ page = 1, limit = 10, search = "", searchFields = [], sortBy = "createdAt", sortDir = "desc", filters = {} } = {}) {
      let items = [...readAll()];

      // filters
      Object.entries(filters).forEach(([k, v]) => {
        if (v === undefined || v === "" || v === null) return;
        items = items.filter((it) => String(it[k]) === String(v));
      });

      // search
      const q = search.trim().toLowerCase();
      if (q && searchFields.length) {
        items = items.filter((it) =>
          searchFields.some((f) => String(it[f] ?? "").toLowerCase().includes(q))
        );
      }

      // sort
      items.sort((a, b) => {
        const av = a[sortBy];
        const bv = b[sortBy];
        const cmp = av > bv ? 1 : av < bv ? -1 : 0;
        return sortDir === "asc" ? cmp : -cmp;
      });

      const total = items.length;
      const pages = Math.max(1, Math.ceil(total / limit));
      const safePage = Math.min(Math.max(page, 1), pages);
      const start = (safePage - 1) * limit;
      const paged = items.slice(start, start + limit);

      return { items: paged, total, page: safePage, pages, limit };
    },

    get(id) {
      return readAll().find((x) => x.id === id) || null;
    },

    create(payload) {
      const item = { id: uid(), createdAt: Date.now(), ...payload };
      const all = readAll();
      writeAll([item, ...all]);
      return item;
    },

    update(id, payload) {
      const all = readAll();
      const next = all.map((x) => (x.id === id ? { ...x, ...payload, updatedAt: Date.now() } : x));
      writeAll(next);
      return next.find((x) => x.id === id) || null;
    },

    remove(id) {
      const all = readAll();
      writeAll(all.filter((x) => x.id !== id));
      return true;
    },

    patch(id, partial) {
      return this.update(id, partial);
    },

    all() {
      return readAll();
    },
  };
}

export function createLocalSingletonService({ key, defaults }) {
  const read = () => localDb.read(key, defaults);
  const write = (v) => localDb.write(key, v);

  return {
    get() {
      return read();
    },
    update(next) {
      const merged = { ...read(), ...next, updatedAt: Date.now() };
      write(merged);
      return merged;
    },
  };
}