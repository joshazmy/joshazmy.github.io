export const EDUCATION = [
  { name: "Orange County Virtual School (OCVS)", detail: "Diploma Spring 2027" },
  { name: "Harvard CS50P — Introduction to Programming with Python", detail: "Completed · Python" },
  { name: "The Odin Project — JavaScript", detail: "HTML/CSS · JavaScript" },
];

export const EXPERIENCE = {
  name: "McDonald’s — Crew Member",
  dates: "Jul 2025 – Jul 2026",
  note: "High-volume store. Orders, food-safety and cash procedures, stayed on schedule as part of a shift team.",
};

export const ALSO = [
  { label: "Outlet, a customized BrowserOS setup" },
  { label: "reel-engine, a content pipeline" },
  { label: "claude-usage-gauge, firmware and a simulator", href: "https://github.com/joshazmy/claude-usage-gauge" },
  { label: "a home lab on Linux that took a long time to set up and that I keep running" },
];

export const OSS = [
  { label: "platformio/platformio-core #5470", href: "https://github.com/platformio/platformio-core/pull/5470" },
  { label: "Owloops/claude-powerline #95 / #96", href: "https://github.com/Owloops/claude-powerline/pull/95" },
];

export const SKILLS = [
  { name: "Ship", detail: "Git / GitHub · Linux · Chrome extensions (MV3) · Chrome Web Store" },
  { name: "Build", detail: "Python · JavaScript" },
  { name: "Edit", detail: "DaVinci Resolve · Photoshop · Illustrator" },
];

export const PROJECTS = [
  {
    id: "openjarvis",
    n: "01",
    title: "OpenJarvis — vision for jarvis ask",
    kind: "Merged upstream PR",
    bullets: [
      "Built image and screen input for jarvis ask (--image, --screen) so it can send a photo or a screenshot to a local vision model. Merged as PR #486 in OpenJarvis (upstream ~9.5k stars).",
      "Shipped the privacy path with the feature: warn before a non-local engine; keep images through sanitization; tests and Vision Input docs.",
    ],
    links: [{ label: "github.com/open-jarvis/OpenJarvis/pull/486", href: "https://github.com/open-jarvis/OpenJarvis/pull/486" }],
  },
  {
    id: "freeflow",
    n: "02",
    title: "Freeflow",
    kind: "Local Linux dictation",
    bullets: [
      "Built a local Linux dictation app: hold a key, talk, and cleaned text lands at the cursor. Audio stays on the machine — no cloud, no account, no telemetry.",
      "Filler/stutter collapse, punctuation, verbal backtrack, personal dictionary, per-app tone, hands-free mode, GPU transcription, settings window, installer. 280 tests.",
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
      "Built a Chrome extension that exports Shopify Stocky suppliers as CSV/JSON, helping over 50 Shopify stores export their suppliers. Stocky had no built-in supplier export and shut down 31 Aug 2026.",
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
    ],
    links: [{ label: "github.com/joshazmy/cider-ytm", href: "https://github.com/joshazmy/cider-ytm" }],
  },
  {
    id: "youtube",
    n: "05",
    title: "YouTube — The Alpha Life",
    kind: "Channel since 13–14",
    bullets: [
      "Started the channel at 13–14. Videos on stocks, NFTs, and memecoins.",
      "3.25K subscribers, 181 videos. Edit in DaVinci Resolve; thumbnails and graphics in Photoshop and Illustrator.",
    ],
    links: [{ label: "youtube.com/@AlphaLife11", href: "https://youtube.com/@AlphaLife11" }],
  },
];
