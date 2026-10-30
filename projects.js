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
  dates: "Jul 2025 – Present",
  note: "High-volume store. Orders, food-safety and cash procedures, stayed on schedule as part of a shift team. Rehired Sep 2026 after a short break.",
};

export const ALSO = [
  { label: "Outlet — Linux browser, in development", href: "" },
  { label: "reel-engine — private content pipeline", href: "" },
  { label: "claude-usage-gauge — firmware + simulator", href: "" },
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
    id: "tavuno",
    n: "01",
    title: "Tavuno — AI assistant for small businesses",
    kind: "Founder",
    bullets: [
      "Built an AI workspace for small businesses. First workflow: an AI phone receptionist (ElevenLabs + Twilio voice) that discloses it’s an AI, collects caller details, and books appointments, confirming only after the calendar API returns success.",
      "Python/Django owner app: approved-facts profile, review queue, call activity, scheduled exports. Deployment target: Cloudflare Workers + D1 (SQLite) + R2.",
    ],
    links: [{ label: "tavuno.tech", href: "https://tavuno.tech" }],
  },
  {
    id: "antidupe",
    n: "02",
    title: "Anti-dupe system — game server",
    kind: "Exploit detection",
    bullets: [
      "Built an automated detector for duplication-glitch exploits: ingests item-creation events from server telemetry, flags inventory deltas no legitimate source can explain (trading, crafting, admin grants), and scores each flag through a rule-based filter to suppress false positives.",
      "Confirmed offenders route into a staff ban queue; malicious-player bans rose over 200% against the prior 30-day baseline (5,000+ bans) without flagging legitimate players.",
    ],
    links: [],
  },
  {
    id: "openjarvis",
    n: "03",
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
    n: "04",
    title: "Freeflow",
    kind: "Local Linux dictation",
    bullets: [
      "Built a local Linux dictation app: evdev captures the hotkey at kernel level, whisper.cpp transcribes on-device (CUDA/Vulkan), and a local Ollama model strips filler and fixes punctuation and self-corrections before the text is injected at the cursor.",
      "Engineered to a latency budget: persistent whisper-server fast path, a 4-second cleanup timeout that falls back to raw text rather than blocking, and graceful degradation, so dictation still works with the model server down. Plus Wayland text injection, per-app tone, forced-spelling dictionary, GTK4 settings app, tray daemon, installer.",
    ],
    links: [
      { label: "github.com/joshazmy/freeflow", href: "https://github.com/joshazmy/freeflow" },
      { label: "joshazmy.github.io/freeflow", href: "https://joshazmy.github.io/freeflow" },
    ],
  },
  {
    id: "stockylift",
    n: "05",
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
    n: "06",
    title: "Limusic — Linux YouTube Music client",
    kind: "Local desktop app",
    bullets: [
      "Built native Linux end-to-end tests and the dark desk UI for a local YouTube Music desktop client: cold restore, search, queue, lyrics, settings, zoom, CSP, restart persistence.",
      "Fork. Not original player authorship.",
    ],
    honesty: "Fork. Not original player authorship.",
    links: [],
  },
  {
    id: "youtube",
    n: "07",
    title: "YouTube — The Alpha Life",
    kind: "Channel since 13–14",
    bullets: [
      "Started the channel at 13–14. Videos on stocks, NFTs, and memecoins.",
      "3.25K subscribers, 181 videos. Edit in DaVinci Resolve; thumbnails and graphics in Photoshop and Illustrator.",
    ],
    links: [{ label: "youtube.com/@AlphaLife11", href: "https://youtube.com/@AlphaLife11" }],
  },
];
