// Bilingual content for Ian's portfolio. Source: CV extraction.
export const PROFILE = {
  name: "Ian Bin Syahrul Azlan",
  shortName: "Ian S. Azlan",
  initials: "I.S.A",
  email: "ianhafiz9999@gmail.com",
  phone: "+33 7 44 43 99 59",
  location: "Toulouse, France",
  github: "https://github.com/ianhafiz",
  linkedin: "https://www.linkedin.com/in/ian-bin-syahrul-azlan",
};

export const COPY = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      projects: "Projects",
      contact: "Contact",
      resume: "Resume",
    },
    hero: {
      eyebrow: "Junior Developer — Toulouse, France",
      titleParts: ["Building", "between two worlds."],
      subtitle:
        "Java, web and DevOps. Born in Malaysia, trained in France. Seeking an alternance from September 2026 (1 month company / 1 month school).",
      cta_primary: "View projects",
      cta_secondary: "Get in touch",
      scroll: "Scroll to explore",
    },
    about: {
      eyebrow: "About",
      title: "A developer shaped by two cultures.",
      paragraphs: [
        "I'm a second-year BUT Informatique student at IUT Paul Sabatier (Université Toulouse III), specialised in application development — Java, web stacks and relational databases.",
        "Originally from Malaysia, I joined the Malaysia–France cooperation programme at IUT de Tours before moving to Toulouse. That dual background shapes how I work: precise, methodical, and curious about how systems hold together.",
        "I'm currently a Web Developer intern at ISFinder, migrating a legacy application to PHP 8.4 — fixing compatibility issues, validating on a real production code base, and learning the realities of long-lived software.",
      ],
      facts: [
        { k: "Languages", v: "Malay · English (C2) · French (B2)" },
        { k: "Studying", v: "BUT Informatique · IUT Toulouse III" },
        { k: "Looking for", v: "Alternance, Sept. 2026" },
        { k: "Based in", v: "Toulouse, FR" },
      ],
    },
    skills: {
      eyebrow: "Skills",
      title: "The tools I reach for.",
      subtitle:
        "Hover an orb to inspect it. Sized by how often I actually use it — not by ambition.",
      groups: ["Languages", "Web", "Data", "DevOps"],
    },
    projects: {
      eyebrow: "Selected work",
      title: "Things I've built.",
      subtitle: "Academic, personal and internship projects. Hover a card to flip.",
      empty_links: "Code on request",
    },
    experience: {
      eyebrow: "Experience",
      title: "Where I've worked & studied.",
    },
    contact: {
      eyebrow: "Contact",
      title: "Let's talk.",
      subtitle:
        "Looking for a frontend / fullstack / DevOps alternance from September 2026. Drop a message — I usually reply within a day.",
      name: "Your name",
      email: "Your email",
      message: "Your message",
      send: "Send message",
      sending: "Sending…",
      success: "Message sent. I'll get back to you shortly.",
      error: "Something went wrong. Please try again or email me directly.",
      or: "Or reach me directly",
    },
    footer: {
      built: "Designed & built by Ian — React, Three.js, FastAPI.",
      year: "© " + new Date().getFullYear(),
    },
  },
  fr: {
    nav: {
      home: "Accueil",
      about: "À propos",
      skills: "Compétences",
      projects: "Projets",
      contact: "Contact",
      resume: "CV",
    },
    hero: {
      eyebrow: "Développeur junior — Toulouse",
      titleParts: ["Construire", "entre deux mondes."],
      subtitle:
        "Java, web et DevOps. Né en Malaisie, formé en France. À la recherche d'une alternance dès septembre 2026 (rythme 1 mois entreprise / 1 mois école).",
      cta_primary: "Voir les projets",
      cta_secondary: "Me contacter",
      scroll: "Faire défiler",
    },
    about: {
      eyebrow: "À propos",
      title: "Un développeur façonné par deux cultures.",
      paragraphs: [
        "Je suis étudiant en 2ᵉ année de BUT Informatique à l'IUT Paul Sabatier (Université Toulouse III), parcours Réalisation d'Applications — Java, technologies web et bases de données relationnelles.",
        "Originaire de Malaisie, j'ai rejoint le programme de coopération Malaisie–France à l'IUT de Tours avant de m'installer à Toulouse. Cette double culture façonne ma façon de travailler : précise, méthodique, et curieuse de la manière dont les systèmes tiennent debout.",
        "Je suis actuellement stagiaire développeur web chez ISFinder, où je migre une application legacy vers PHP 8.4 — correction de problèmes de compatibilité, validation sur une base de code en production, et apprentissage des réalités du logiciel qui dure.",
      ],
      facts: [
        { k: "Langues", v: "Malais · Anglais (C2) · Français (B2)" },
        { k: "Études", v: "BUT Informatique · IUT Toulouse III" },
        { k: "Recherche", v: "Alternance, sept. 2026" },
        { k: "Basé à", v: "Toulouse, FR" },
      ],
    },
    skills: {
      eyebrow: "Compétences",
      title: "Mes outils du quotidien.",
      subtitle:
        "Survolez une sphère pour l'inspecter. La taille reflète mon usage réel — pas l'ambition.",
      groups: ["Langages", "Web", "Données", "DevOps"],
    },
    projects: {
      eyebrow: "Sélection",
      title: "Ce que j'ai construit.",
      subtitle: "Projets académiques, personnels et de stage. Survolez une carte pour la retourner.",
      empty_links: "Code sur demande",
    },
    experience: {
      eyebrow: "Expérience",
      title: "Où j'ai travaillé et étudié.",
    },
    contact: {
      eyebrow: "Contact",
      title: "Discutons.",
      subtitle:
        "Je cherche une alternance frontend / fullstack / DevOps dès septembre 2026. Laissez-moi un mot — je réponds en général dans la journée.",
      name: "Votre nom",
      email: "Votre email",
      message: "Votre message",
      send: "Envoyer",
      sending: "Envoi…",
      success: "Message envoyé. Je reviens vers vous très vite.",
      error: "Une erreur est survenue. Réessayez ou écrivez-moi directement.",
      or: "Ou contactez-moi directement",
    },
    footer: {
      built: "Conçu et développé par Ian — React, Three.js, FastAPI.",
      year: "© " + new Date().getFullYear(),
    },
  },
};

// Skill groups: amber=languages, teal=web, purple=data, slate=devops
export const SKILLS = [
  // Languages
  { name: "Java", group: "lang", level: 0.9 },
  { name: "Python", group: "lang", level: 0.7 },
  { name: "C", group: "lang", level: 0.6 },
  { name: "JavaScript", group: "lang", level: 0.75 },
  // Web
  { name: "React", group: "web", level: 0.7 },
  { name: "HTML", group: "web", level: 0.85 },
  { name: "CSS", group: "web", level: 0.8 },
  { name: "REST APIs", group: "web", level: 0.7 },
  // Data
  { name: "SQL", group: "data", level: 0.85 },
  { name: "PL/SQL", group: "data", level: 0.75 },
  { name: "Oracle APEX", group: "data", level: 0.65 },
  // DevOps / tools
  { name: "Linux", group: "ops", level: 0.7 },
  { name: "Git", group: "ops", level: 0.85 },
  { name: "Docker", group: "ops", level: 0.75 },
  { name: "SCRUM", group: "ops", level: 0.7 },
  { name: "UML", group: "ops", level: 0.7 },
];

export const SKILL_GROUP_COLORS = {
  lang: "#C8903A", // amber
  web: "#2A8B7A", // teal
  data: "#8C6BB6", // muted purple
  ops: "#9A9490", // slate
};

// Projects from CV
export const PROJECTS = [
  {
    id: "parking",
    titleEn: "Parking Management System",
    titleFr: "Application de gestion de parking",
    year: "2025",
    typeEn: "Academic — team project",
    typeFr: "Projet académique en équipe",
    coverHue: 36, // amber
    descEn:
      "Designed a PL/SQL relational database and a Java desktop interface built with Eclipse WindowBuilder. Worked in SCRUM with a four-person team across a six-week sprint plan.",
    descFr:
      "Conception d'une base de données relationnelle PL/SQL et d'une interface Java avec Eclipse WindowBuilder. Collaboration en équipe de 4 selon la méthodologie SCRUM sur 6 semaines.",
    stack: ["PL/SQL", "Java", "Eclipse", "WindowBuilder", "SCRUM"],
    accent: "amber",
  },
  {
    id: "agri-sales",
    titleEn: "Agricultural Sales Manager",
    titleFr: "Gestion des ventes — produits agricoles",
    year: "2025",
    typeEn: "Academic project",
    typeFr: "Projet académique",
    coverHue: 170,
    descEn:
      "Java application managing stock and sales of agricultural products. Modelled the system architecture with UML diagrams in Modelio, then implemented the business logic and Swing-based UI.",
    descFr:
      "Application Java de gestion des stocks et des ventes de produits agricoles. Modélisation UML avec Modelio, puis implémentation de la logique métier et de l'IHM.",
    stack: ["Java", "UML", "Modelio", "Swing"],
    accent: "teal",
  },
  {
    id: "lol-stats",
    titleEn: "League of Legends Stats Dashboard",
    titleFr: "Tableau de bord stats League of Legends",
    year: "2025",
    typeEn: "Academic project",
    typeFr: "Projet académique",
    coverHue: 278,
    descEn:
      "Analytics dashboard built on Oracle APEX. Analysed structured match datasets, designed views and charts, and shipped a usable, low-code data product.",
    descFr:
      "Dashboard d'analyse construit sur Oracle APEX. Analyse de datasets structurés, conception de vues et de graphiques, livraison d'un produit data low-code utilisable.",
    stack: ["Oracle APEX", "SQL", "Data viz"],
    accent: "purple",
  },
  {
    id: "weather-app",
    titleEn: "Responsive Weather App",
    titleFr: "Application météo responsive",
    year: "2025",
    typeEn: "Personal project",
    typeFr: "Projet personnel",
    coverHue: 200,
    descEn:
      "Mobile-first React app consuming external weather APIs. Focus on perceived performance, caching, and a clean component-driven UI.",
    descFr:
      "Application React mobile-first consommant des APIs météo externes. Focus sur la performance perçue, le cache et une UI propre orientée composants.",
    stack: ["React", "REST APIs", "Mobile-first"],
    accent: "teal",
  },
  {
    id: "isfinder",
    titleEn: "Legacy → PHP 8.4 Migration (Internship)",
    titleFr: "Migration legacy → PHP 8.4 (Stage)",
    year: "2026",
    typeEn: "Internship — ISFinder, Toulouse",
    typeFr: "Stage — ISFinder, Toulouse",
    coverHue: 36,
    descEn:
      "Migrating a production web application to PHP 8.4. Analysing compatibility issues, fixing breakages, and validating functionality on a real, long-lived code base.",
    descFr:
      "Migration d'une application web en production vers PHP 8.4. Analyse des problèmes de compatibilité, corrections, validation des fonctionnalités sur une base de code réelle et ancienne.",
    stack: ["PHP 8.4", "Legacy migration", "Production"],
    accent: "amber",
  },
];

export const TIMELINE = [
  {
    period: "Apr 2026 — Jun 2026",
    titleEn: "Web Developer Intern",
    titleFr: "Stagiaire développeur web",
    org: "ISFinder · Toulouse",
    descEn: "Legacy → PHP 8.4 migration on a production code base.",
    descFr: "Migration legacy → PHP 8.4 sur une base de code en production.",
    kind: "work",
  },
  {
    period: "2023 — 2026",
    titleEn: "BUT Informatique (2nd year)",
    titleFr: "BUT Informatique (2ᵉ année)",
    org: "IUT Paul Sabatier, Université Toulouse III",
    descEn: "Parcours RAPP — application development, web & databases.",
    descFr: "Parcours RAPP — développement d'applications, web & bases de données.",
    kind: "edu",
  },
  {
    period: "2022 — 2023",
    titleEn: "Malaysia–France pre-university programme",
    titleFr: "Programme pré-universitaire Malaisie–France",
    org: "Université de Tours (IUT de Tours)",
    descEn: "French level B2 validated.",
    descFr: "Niveau de français B2 validé.",
    kind: "edu",
  },
  {
    period: "2017 — 2022",
    titleEn: "Sijil Pelajaran Malaysia (SPM) — 9A+",
    titleFr: "SPM (équivalent Bac) — 9A+",
    org: "Tuanku Munawir Science School, Malaysia",
    descEn: "Malaysian national secondary diploma.",
    descFr: "Diplôme national malaisien de fin d'études secondaires.",
    kind: "edu",
  },
];
