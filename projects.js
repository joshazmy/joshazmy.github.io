export const HONESTY =
  "I can walk every PR here. I did not write OpenJarvis, whisper.cpp, or the original Limusic player.";

export const EDUCATION = [
  { name: "Orange County Virtual School (OCVS)", detail: "Diploma Spring 2027" },
  { name: "Google AI Essentials", detail: "Prompting · workplace AI tools · responsible use" },
  { name: "Anthropic Claude courses", detail: "Writing briefs · reviewing model output" },
  { name: "Harvard CS50P", detail: "Python · control flow · libraries" },
  { name: "The Odin Project — JavaScript", detail: "HTML/CSS · JavaScript" },
];

export const EXPERIENCE = {
  name: "McDonald’s — Crew Member",
  dates: "Jul 2025 – Jul 2026",
  note: "High-volume store. Orders, food-safety and cash procedures, stayed on schedule as part of a shift team.",
};

export const ALSO = [
  { label: "Outlet — Linux browser, in development", href: "" },
  { label: "platformio-core #5470", href: "https://github.com/platformio/platformio-core/pull/5470" },
  { label: "claude-powerline #95 / #96", href: "https://github.com/Owloops/claude-powerline/pull/95" },
];

export const SKILLS = [
  { name: "Ship", detail: "Git / GitHub · Linux · Chrome extensions (MV3) · automated tests · release packaging · Chrome Web Store · GitHub Pages" },
  { name: "Build", detail: "Python · JavaScript · whisper.cpp · Ollama · GTK · Linux desktop E2E" },
  { name: "Edit", detail: "DaVinci Resolve · Photoshop · Illustrator · YouTube production" },
];

export const PROJECTS = [
  {
    id: "openjarvis",
    n: "01",
    title: "OpenJarvis — vision for jarvis ask",
    kind: "Merged upstream PR",
    bullets: [
      "Built image and screen input for jarvis ask (--image, --screen) so it can send a photo or a screenshot to a local vision model. Merged as PR #486 (upstream ~9.5k stars).",
      "Shipped the privacy path with the feature: warn before a non-local engine; keep images through sanitization; tests and Vision Input docs.",
    ],
    honesty: "Did not write OpenJarvis. I can walk PR 486.",
    links: [{ label: "github.com/open-jarvis/OpenJarvis/pull/486", href: "https://github.com/open-jarvis/OpenJarvis/pull/486" }],
  },
  {
    id: "freeflow",
    n: "02",
    title: "Freeflow",
    kind: "Local Linux dictation",
    bullets: [
      "Built a local Linux dictation app: hold a key, talk, and cleaned text lands at the cursor. Audio stays on the machine — no cloud, no account, no telemetry.",
      "Filler/stutter collapse, punctuation, verbal backtrack, personal dictionary, per-app tone, hands-free mode, GPU transcription, GTK settings, installer. 280 tests.",
    ],
    links: [
      { label: "github.com/joshazmy/freeflow", href: "https://github.com/joshazmy/freeflow" },
      { label: "joshazmy.github.io/freeflow", href: "https://joshazmy.github.io/freeflow" },
    ],
  },
  {
    id: "stockylift",
    n: "03",
    title: "StockyLift",
    kind: "Chrome extension",
    bullets: [
      "Built a Chrome extension that exports Shopify Stocky suppliers as CSV/JSON. Stocky had no built-in supplier export and shut down 31 Aug 2026.",
      "Keys and supplier data stay in the browser. Automated tests, release packaging, Chrome Web Store listing, and public site.",
    ],
    links: [
      { label: "github.com/joshazmy/stockylift", href: "https://github.com/joshazmy/stockylift" },
      { label: "joshazmy.github.io/stockylift", href: "https://joshazmy.github.io/stockylift" },
    ],
  },
  {
    id: "limusic",
    n: "04",
    title: "Limusic — Linux YouTube Music client",
    kind: "Local desktop app",
    bullets: [
      "Built native Linux end-to-end tests and the dark desk UI for a local YouTube Music desktop client: cold restore, search, queue, lyrics, settings, zoom, CSP, restart persistence.",
      "Fork. Not original player authorship.",
    ],
    honesty: "Fork. Not original player authorship.",
    links: [],
  },
];
