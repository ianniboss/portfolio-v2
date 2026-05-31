// Bilingual content for Ian's portfolio. Source: CV extraction.
export const PROFILE = {
  name: "Ian Bin Syahrul Azlan",
  shortName: "Ian S. Azlan",
  initials: "I.S.A",
  email: "ianhafiz9999@gmail.com",
  phone: "+33 7 44 43 99 59",
  location: "Toulouse, France",
  github: "https://github.com/ianniboss",
  githubLabel: "ianniboss",
  linkedin: "https://www.linkedin.com/in/ian-bin-syahrul-azlan",
  cv: "/assets/Ian_Bin_Syahrul_Azlan_CV.pdf",
  portrait: "/assets/ian-portrait.jpg",
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

// Projects (from Ian's previous portfolio)
const GH = "https://github.com/ianniboss";

export const PROJECTS = [
  {
    id: "parking",
    titleEn: "Parking Management Application",
    titleFr: "Application de gestion de parking",
    year: "2025",
    typeEn: "Academic — full-stack",
    typeFr: "Projet académique — full-stack",
    coverHue: 36,
    accent: "amber",
    image: "/assets/projects/parking.png",
    descEn:
      "Full-stack parking system with real-time slot booking, automated fee calculation and role-based access. Solves overbooking and lost-revenue issues in manual parking. My role: database design, Java GUI with WindowBuilder, stored procedures, and SCRUM coordination.",
    descFr:
      "Système de parking full-stack : réservation de places en temps réel, calcul automatisé des frais et accès par rôles. Résout la sur-réservation et la perte de revenus du parking manuel. Mon rôle : conception BDD, IHM Java avec WindowBuilder, procédures stockées, coordination SCRUM.",
    stack: ["Java", "PL/SQL", "SQL Developer", "Eclipse", "SCRUM"],
  },
  {
    id: "apache-ssl",
    titleEn: "Apache2 / SSL Server Administration",
    titleFr: "Administration serveur Apache2 / SSL",
    year: "2025",
    typeEn: "System administration",
    typeFr: "Administration système",
    coverHue: 170,
    accent: "teal",
    image: "/assets/projects/apache_ssl.png",
    descEn:
      "Deployed and hardened an Apache2 server with SSL/TLS on Linux: virtual hosts, certificate setup and renewal, cipher-suite tuning, iptables firewall rules, SSH hardening and fail2ban.",
    descFr:
      "Déploiement et durcissement d'un serveur Apache2 avec SSL/TLS sous Linux : hôtes virtuels, certificats, renouvellement, suites cryptographiques, règles iptables, SSH durci et fail2ban.",
    stack: ["Linux", "Apache2", "SSL/TLS", "iptables", "fail2ban"],
  },
  {
    id: "web-doc",
    titleEn: "Interactive Web Documentary",
    titleFr: "Web-documentaire interactif",
    year: "2025",
    typeEn: "Web design — multimedia",
    typeFr: "Web design — multimédia",
    coverHue: 280,
    accent: "purple",
    image: "/assets/projects/web_doc.png",
    descEn:
      "Interactive multimedia documentary combining video, audio, responsive layouts and clickable storytelling. Explores how interactivity makes documentary content more engaging.",
    descFr:
      "Web-documentaire interactif mêlant vidéo, audio, mises en page responsive et narration cliquable. Explore comment l'interactivité rend le documentaire plus engageant.",
    stack: ["HTML", "CSS", "JavaScript", "Web Design"],
    demoUrl: "https://viewer.pandasuite.com/2kTY2xBI",
  },
  {
    id: "tomato",
    titleEn: "Tomato Sales Application",
    titleFr: "Application de vente de tomates",
    year: "2025",
    typeEn: "Academic — desktop app · 1.5 months",
    typeFr: "Projet académique — desktop · 1,5 mois",
    coverHue: 12,
    accent: "amber",
    image: "/assets/projects/tomato.png",
    descEn:
      "Desktop application to manage agricultural inventory and sales: UML architecture, Java Swing HMI, schema design, CRUD operations and responsive UI under heavy database reads.",
    descFr:
      "Application desktop de gestion de stock et de ventes agricoles : architecture UML, IHM Java Swing, schéma BDD, opérations CRUD et UI fluide même sous lecture intensive.",
    stack: ["Java", "Swing", "Modelio", "UML", "SQL"],
    sourceUrl: `${GH}/S201_TOMATES`,
  },
  {
    id: "lol-stats",
    titleEn: "League of Legends Statistics Dashboard",
    titleFr: "Tableau de bord stats League of Legends",
    year: "2024",
    typeEn: "Academic — web app · 1 month",
    typeFr: "Projet académique — web · 1 mois",
    coverHue: 200,
    accent: "teal",
    image: "/assets/projects/lol_stats.png",
    descEn:
      "Pulled Riot API match data into an Oracle APEX dashboard: API ingestion, schema design, complex SQL, rate-limit handling, JSON parsing, caching and correlation analysis on win factors.",
    descFr:
      "Ingestion des matchs via Riot API dans un dashboard Oracle APEX : conception du schéma, SQL complexe, gestion du rate-limit, parsing JSON, cache et analyse des facteurs de victoire.",
    stack: ["Oracle APEX", "SQL", "Riot API", "JSON"],
  },
  {
    id: "graphs",
    titleEn: "Algorithmic Exploration & Graph Theory",
    titleFr: "Exploration algorithmique & théorie des graphes",
    year: "2024",
    typeEn: "R&D · 9 weeks",
    typeFr: "R&D · 9 semaines",
    coverHue: 278,
    accent: "purple",
    image: "/assets/projects/graphs.png",
    descEn:
      "Benchmarked and visualised pathfinding (Dijkstra, A*, Bellman-Ford) on large graphs. Implementations from scratch, matplotlib visualisations, memory-optimised adjacency lists and negative-cycle edge cases.",
    descFr:
      "Benchmark et visualisation de pathfinding (Dijkstra, A*, Bellman-Ford) sur de grands graphes. Implémentations from scratch, visualisation matplotlib, listes d'adjacence optimisées mémoire, gestion des cycles négatifs.",
    stack: ["Python", "Algorithms", "Graph Theory", "matplotlib"],
  },
  {
    id: "mh-students",
    titleEn: "Malaysian Student Resource Hub",
    titleFr: "Hub étudiants malaisiens en France",
    year: "2025 · Ongoing",
    typeEn: "Personal — full-stack",
    typeFr: "Personnel — full-stack",
    coverHue: 36,
    accent: "amber",
    image: "/assets/projects/mh_students.png",
    descEn:
      "Connects 500+ Malaysian students in France with events, admin guides, location services and real-time updates. React frontend, Firebase / Firestore backend, Google Maps integration and live sync.",
    descFr:
      "Connecte plus de 500 étudiants malaisiens en France via événements, guides administratifs, géolocalisation et mises à jour en temps réel. Front React, backend Firebase / Firestore, Google Maps et synchronisation live.",
    stack: ["React", "Firebase", "Firestore", "Google Maps API"],
    sourceUrl: `${GH}/malaysian-students-resource-hub`,
    ongoing: true,
  },
  {
    id: "trilingual",
    titleEn: "Trilingual Translator",
    titleFr: "Traducteur trilingue",
    year: "2025",
    typeEn: "AI — 2 weeks",
    typeFr: "IA — 2 semaines",
    coverHue: 170,
    accent: "teal",
    image: "/assets/projects/trilingual.png",
    descEn:
      "Real-time translator between Malay, English and French with simultaneous output. UI/UX, Gemini API integration, 300 ms debouncing, parallel calls, prompt engineering and rate-limiting.",
    descFr:
      "Traducteur temps réel entre malais, anglais et français avec sortie simultanée. UI/UX, intégration Gemini API, debouncing 300 ms, appels parallèles, prompt engineering et limitation de débit.",
    stack: ["React", "Gemini API", "Tailwind CSS", "AI"],
    sourceUrl: `${GH}/trilingue-translator`,
  },
  {
    id: "captions",
    titleEn: "Multi-language Caption Generator",
    titleFr: "Générateur de légendes multilingue",
    year: "2025",
    typeEn: "AI — 1 week",
    typeFr: "IA — 1 semaine",
    coverHue: 280,
    accent: "purple",
    image: "/assets/projects/captions.png",
    descEn:
      "Generates social-media captions in Malay, English and French. Culturally-aware prompt design, platform-specific formatting and tonal nuance — built around the Gemini API.",
    descFr:
      "Génère des légendes pour réseaux sociaux en malais, anglais et français. Prompts culturellement adaptés, formatage par plateforme et nuance de ton — autour de l'API Gemini.",
    stack: ["React", "Gemini API", "AI", "Content Gen"],
    demoUrl: "https://ian-hosts.infinityfreeapp.com",
    sourceUrl: `${GH}/Social-Media-Caption-Generator`,
  },
  {
    id: "weather-app",
    titleEn: "Weather Application",
    titleFr: "Application météo",
    year: "2025",
    typeEn: "Web app — 1 week",
    typeFr: "Application web — 1 semaine",
    coverHue: 200,
    accent: "teal",
    image: "/assets/projects/weather.png",
    descEn:
      "Real-time weather and 5-day forecasts for any city. Mobile-first UI, dynamic icon mapping from condition codes and optimised payload handling.",
    descFr:
      "Météo en temps réel et prévisions 5 jours pour n'importe quelle ville. UI mobile-first, mapping dynamique des icônes selon les codes, payloads optimisés.",
    stack: ["React", "OpenWeatherMap API", "Web Design"],
    demoUrl: "https://weather-app-ian.vercel.app",
    sourceUrl: `${GH}/weather-app`,
  },
  {
    id: "ftm",
    titleEn: "Football Team Manager",
    titleFr: "Gestionnaire d'équipe de football",
    year: "2025 · Ongoing",
    typeEn: "Web application",
    typeFr: "Application web",
    coverHue: 12,
    accent: "amber",
    image: "/assets/projects/football.png",
    descEn:
      "Helps coaches manage players, matches, stats and performance trends. PHP MVC backend, MySQL schema with proper normalisation, indexed queries and a responsive stats dashboard.",
    descFr:
      "Aide les coachs à gérer joueurs, matchs, stats et tendances de performance. Backend PHP MVC, schéma MySQL normalisé, requêtes indexées et dashboard statistique responsive.",
    stack: ["PHP", "MySQL", "CSS", "MVC"],
    demoUrl: "http://ftm.wuaze.com",
    sourceUrl: `${GH}/football-team-manager`,
    ongoing: true,
  },
  {
    id: "sonic",
    titleEn: "Sonic Media Converter",
    titleFr: "Sonic Media Converter",
    year: "2025",
    typeEn: "Media utility — 1 week",
    typeFr: "Utilitaire média — 1 semaine",
    coverHue: 36,
    accent: "amber",
    image: "/assets/projects/sonic.png",
    descEn:
      "Fast media format converter with a Sonic-themed interface, queue management, conversion progress updates and a Node.js backend pipeline deployed on Vercel.",
    descFr:
      "Convertisseur média rapide à l'interface thème Sonic : gestion de file, progression en direct et pipeline backend Node.js déployé sur Vercel.",
    stack: ["React", "Node.js", "Vercel"],
    demoUrl: "https://sonic-mp3-converter.vercel.app",
    sourceUrl: `${GH}/sonic-mp3-converter`,
  },
  {
    id: "mario-notion",
    titleEn: "Mario Notion Dashboard",
    titleFr: "Tableau de bord Notion façon Mario",
    year: "2025",
    typeEn: "Productivity — 2 weeks",
    typeFr: "Productivité — 2 semaines",
    coverHue: 280,
    accent: "purple",
    image: "/assets/projects/mario.png",
    descEn:
      "Notion-powered productivity dashboard with a Mario-themed UI: tasks, goals and daily planning. Notion API sync, gamification and balance between retro visuals and usability.",
    descFr:
      "Dashboard de productivité branché sur Notion avec UI thème Mario : tâches, objectifs, planning quotidien. Synchronisation Notion API, gamification et équilibre entre visuels rétro et ergonomie.",
    stack: ["React", "Notion API", "Tailwind CSS"],
    demoUrl: "https://mario-notion.vercel.app",
    sourceUrl: `${GH}/mario-notion`,
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
