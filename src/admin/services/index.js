import { ensureSeed } from "./localDb";
import { createLocalCrudService, createLocalSingletonService } from "./localCrud";

export const STORAGE_KEYS = {
  notices: "uni_notices",
  magazines: "uni_magazines",
  projects: "uni_projects",
  contacts: "uni_contactMessages",

  home: "uni_home",
  about: "uni_about",
  campus: "uni_campusInfo",
};

ensureSeed(STORAGE_KEYS.notices, []);
ensureSeed(STORAGE_KEYS.magazines, []);
ensureSeed(STORAGE_KEYS.projects, []);
ensureSeed(STORAGE_KEYS.contacts, []);

ensureSeed(STORAGE_KEYS.home, {
  hero: { title: "Welcome to UCP", subtitle: "Shape your future", ctaText: "Apply Now", ctaLink: "/contact", imageDataUrl: "" },
  description: "University description here...",
  announcements: [],
  featured: [],
});

ensureSeed(STORAGE_KEYS.about, {
  universityInfo: "",
  mission: "",
  vision: "",
  history: "",
});

ensureSeed(STORAGE_KEYS.campus, {
  campusDetails: { address: "", phone: "", email: "", mapEmbedUrl: "" },
  departments: [],
  feeStructures: [],
});

export const noticesService = createLocalCrudService({ key: STORAGE_KEYS.notices, defaults: [] });
export const magazinesService = createLocalCrudService({ key: STORAGE_KEYS.magazines, defaults: [] });
export const projectsService = createLocalCrudService({ key: STORAGE_KEYS.projects, defaults: [] });
export const contactsService = createLocalCrudService({ key: STORAGE_KEYS.contacts, defaults: [] });

export const homeService = createLocalSingletonService({ key: STORAGE_KEYS.home });
export const aboutService = createLocalSingletonService({ key: STORAGE_KEYS.about });
export const campusService = createLocalSingletonService({ key: STORAGE_KEYS.campus });