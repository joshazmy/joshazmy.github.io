import { PROJECTS, EDUCATION, EXPERIENCE, ALSO, OSS, SKILLS } from "./projects.js";

const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
const plates = [...document.querySelectorAll("#stage [data-plate]")];
const morphVid = document.querySelector('[data-plate="morph"]');
const morphCanvas = document.getElementById("morph-seq");
const MORPH_N = 121;
const morphFrames = Array.from({ length: MORPH_N }, () => new Image());
let morphReady = 0;
morphFrames.forEach((img, i) => {
  img.onload = () => { morphReady += 1; };
  img.src = `./media/world/morph-seq/${String(i + 1).padStart(3, "0")}.jpg`;
  if (img.complete && img.naturalWidth) morphReady += 1;
});
const homeVid = document.querySelector('[data-plate="home"]');
const aboutVid = document.querySelector('[data-plate="about"]');
const cue = document.getElementById("cue");
const world = document.getElementById("world");
const hud = {
  about: document.getElementById("hud-about"),
  work: document.getElementById("hud-work"),
  more: document.getElementById("hud-more"),
};

const PROJECT_START = 2;
const BEATS = [
  { id: "home", p: 0, dwell: 280, hash: "#/", transit: 0 },
  { id: "about", p: 0.4, dwell: 520, hash: "#/about", transit: 0 },
  ...PROJECTS.map((proj, i) => ({
    id: proj.id,
    p: 0.48 + i * (0.32 / Math.max(PROJECTS.length - 1, 1)),
    dwell: 480,
    hash: "#/work",
    transit: 450,
  })),
  { id: "edu", p: 0.92, dwell: 240, hash: "#/edu", transit: 450 },
];

document.getElementById("edu-list").innerHTML = EDUCATION.map(
  (e) => `<li><strong>${e.name}</strong><span>${e.detail}</span></li>`
).join("");
document.getElementById("edu-job").innerHTML =
  `<strong>${EXPERIENCE.name}</strong><span>${EXPERIENCE.dates}</span><p>${EXPERIENCE.note}</p>`;
document.getElementById("skill-list").innerHTML = SKILLS.map(
  (s) => `<li><strong>${s.name}</strong><span>${s.detail}</span></li>`
).join("");
const linkList = (items) =>
  items
    .map((a) =>
      a.href ? `<a href="${a.href}" target="_blank" rel="noreferrer">${a.label}</a>` : a.label
    )
    .join(" · ");
document.getElementById("edu-also").innerHTML = linkList(ALSO);
document.getElementById("edu-oss").innerHTML = linkList(OSS);

const dotsEl = document.getElementById("dots");
dotsEl.innerHTML = PROJECTS.map((p, i) => `<button type="button" data-dot="${i}" aria-label="${p.title}"></button>`).join("");

const reduceOn = () => reduce.matches;
const caseEl = document.getElementById("case");
let shownCase = -1;
let caseTimer = 0;

function paintCase(i) {
  const p = PROJECTS[i] || PROJECTS[0];
  document.getElementById("case-kicker").textContent = `${p.n} / ${String(PROJECTS.length).padStart(2, "0")}  ·  WORK`;
  document.getElementById("case-title").textContent = p.title;
  document.getElementById("case-kind").textContent = p.kind;
  const hon = document.getElementById("honesty");
  if (hon) {
    hon.textContent = p.honesty || "";
    hon.style.display = p.honesty ? "" : "none";
  }
  document.getElementById("case-bullets").innerHTML = p.bullets.map((b) => `<li>${b}</li>`).join("");
  document.getElementById("case-links").innerHTML = (p.links || [])
    .map((l) => `<a href="${l.href}" target="_blank" rel="noreferrer">${l.label}</a>`)
    .join("");
  [...dotsEl.querySelectorAll("button")].forEach((b, n) => b.classList.toggle("on", n === i));
}

function showCase(i, dir) {
  if (i === shownCase) return;
  const instant = reduceOn();
  const enter = () => {
    paintCase(i);
    shownCase = i;
    caseEl.classList.remove("leave-next", "leave-prev");
    caseEl.classList.add("enter");
    caseEl.dataset.dir = dir >= 0 ? "next" : "prev";
  };
  clearTimeout(caseTimer);
  if (instant) {
    enter();
    return;
  }
  caseEl.classList.remove("enter");
  caseEl.classList.add(dir >= 0 ? "leave-next" : "leave-prev");
  caseTimer = setTimeout(enter, 220);
}

let beat = 0;
let progress = 0;
let landedAt = performance.now();
let intent = 0;
let transiting = false;
let transFrom = 0;
let transTo = 0;
let transStart = 0;
let transDur = 720;
let mx = 0;
let my = 0;
let px = 0;
let py = 0;
let morphAim = 0;
let morphPos = 0;
let hudAbout = 0;
let hudWork = 0;
let hudMore = 0;
let hoopPark = 0;

function clamp(v, a, b) {
  return Math.min(b, Math.max(a, v));
}
function lerp(a, b, t) {
  return a + (b - a) * t;
}
function remap(p, a, b) {
  if (b === a) return p >= b ? 1 : 0;
  return clamp((p - a) / (b - a), 0, 1);
}
function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function morphU() {
  return morphPos;
}

function inMorphScroll() {
  return beat <= 1 && morphPos > 0.004 && morphPos < 0.996;
}

// Match CSS object-fit:cover + object-position 50% 48% (home/about/#stage).
const COVER_OX = 0.5;
const COVER_OY = 0.48;

function coverDraw(ctx, img, w, h) {
  if (!img || !img.naturalWidth) return;
  const ir = img.naturalWidth / img.naturalHeight;
  const cr = w / h;
  let dw;
  let dh;
  if (ir > cr) {
    dh = h;
    dw = h * ir;
  } else {
    dw = w;
    dh = w / ir;
  }
  const dx = (w - dw) * COVER_OX;
  const dy = (h - dh) * COVER_OY;
  ctx.drawImage(img, dx, dy, dw, dh);
}

function drawMorph(u, opacity) {
  if (!morphCanvas) return;
  morphCanvas.style.opacity = String(opacity);
  morphCanvas.style.visibility = opacity > 0.01 ? "visible" : "hidden";
  const n = morphFrames.length;
  const x = clamp(u, 0, 1) * (n - 1);
  const i = Math.min(n - 1, Math.floor(x));
  const f = x - i;
  const a = morphFrames[i];
  const b = morphFrames[Math.min(i + 1, n - 1)];
  if (opacity < 0.01 || !a || !a.naturalWidth || (f > 0.002 && b && !b.naturalWidth)) return;
  const w = innerWidth;
  const h = innerHeight;
  if (morphCanvas.width !== w) morphCanvas.width = w;
  if (morphCanvas.height !== h) morphCanvas.height = h;
  const ctx = morphCanvas.getContext("2d");
  ctx.clearRect(0, 0, w, h);
  ctx.globalAlpha = 1;
  coverDraw(ctx, morphFrames[i], w, h);
  if (f > 0.002 && i + 1 < n) {
    ctx.globalAlpha = f;
    coverDraw(ctx, morphFrames[i + 1], w, h);
  }
  ctx.globalAlpha = 1;
}

function plateOps(u) {
  if (u <= 0) return { home: 1, morph: 0, about: 0 };
  if (u < 0.12) return { home: 1 - u / 0.12, morph: u / 0.12, about: 0 };
  if (u < 0.86) return { home: 0, morph: 1, about: 0 };
  const t = remap(u, 0.86, 1);
  return { home: 0, morph: 1 - t, about: t };
}

function playPlates(ops, u) {
  plates.forEach((el) => {
    const op = ops[el.dataset.plate] || 0;
    if (el === morphVid) {
      el.pause();
      el.style.opacity = morphReady >= 2 ? "0" : String(op);
      el.style.visibility = morphReady >= 2 || op < 0.01 ? "hidden" : "visible";
      return;
    }
    el.style.opacity = String(op);
    el.style.visibility = op > 0.01 ? "visible" : "hidden";
    if (el.tagName !== "VIDEO") return;
    if (el === homeVid && morphAim > 0.001) {
      el.pause();
      if (el.currentTime > 0.05) el.currentTime = 0;
    }
    const want = !reduceOn() && op > 0.04 && !(el === homeVid && morphAim > 0.001);
    if (want) {
      const play = el.play();
      if (play && play.catch) play.catch(() => {});
    } else {
      el.pause();
    }
  });
  drawMorph(u, reduceOn() ? 0 : ops.morph || 0);
}

function apply() {
  const p = progress;
  let section = "home";
  if (BEATS[beat].id === "edu") section = "edu";
  else if (BEATS[beat].id === "about") section = "about";
  else if (beat >= PROJECT_START) section = "work";
  document.body.dataset.section = section;

  const u = morphU();
  const ops = reduceOn()
    ? { home: section === "home" ? 1 : 0, morph: 0, about: section === "home" ? 0 : 1 }
    : plateOps(u);
  playPlates(ops, u);

  cue.style.opacity = u > 0.1 ? "0" : String(1 - remap(u, 0, 0.1));

  hud.about.classList.toggle("on", hudAbout > 0.08);
  hud.about.style.opacity = String(hudAbout);
  hud.work.classList.toggle("on", hudWork > 0.08);
  hud.work.style.opacity = String(hudWork);
  hud.more.classList.toggle("on", hudMore > 0.08);
  hud.more.style.opacity = String(hudMore);

  if (aboutVid) {
    aboutVid.style.objectPosition = `${50 + hoopPark * 38}% 48%`;
    aboutVid.style.filter = `brightness(${1 - hoopPark * 0.28})`;
  }

  const hash = BEATS[beat]?.hash || "#/";
  if (location.hash !== hash) history.replaceState(null, "", hash);
}

function goBeat(i, dur) {
  i = clamp(i, 0, BEATS.length - 1);
  const skip = dur === 0;
  if (i === beat && !transiting && !skip) return;
  const from = beat;
  beat = i;
  transiting = !skip && !reduceOn();
  transFrom = progress;
  transTo = BEATS[i].p;
  transStart = performance.now();
  if (reduceOn() || skip) transDur = 0;
  else if (dur != null) transDur = dur;
  else transDur = BEATS[i].transit || 450;
  intent = 0;
  if (i === 0) {
    morphAim = 0;
    if (transDur === 0) morphPos = 0;
  } else {
    morphAim = 1;
    if (transDur === 0 || i >= PROJECT_START) morphPos = 1;
  }
  if (i >= PROJECT_START && i < PROJECT_START + PROJECTS.length) {
    showCase(i - PROJECT_START, i >= from ? 1 : -1);
  }
  if (skip) {
    progress = transTo;
    transiting = false;
  }
}

let lastTick = performance.now();
function tick(now) {
  const dt = Math.min(0.05, (now - lastTick) / 1000);
  lastTick = now;
  const k = reduceOn() ? 1 : 1 - Math.exp(-3.1 * dt);
  morphPos += (morphAim - morphPos) * k;
  if (Math.abs(morphAim - morphPos) < 0.002) morphPos = morphAim;
  const hk = reduceOn() ? 1 : 1 - Math.exp(-6.2 * dt);
  const wantAbout = beat <= 1 ? remap(morphPos, 0.78, 1) : 0;
  const wantWork = beat >= PROJECT_START && beat < PROJECT_START + PROJECTS.length ? 1 : 0;
  const wantMore = BEATS[beat].id === "edu" ? 1 : 0;
  // Park only after morph↔about crossfade finishes so the hoop stays put
  // while home/morph/about plates share the same cover anchor.
  const wantPark =
    wantWork || wantMore || (beat <= 1 && morphPos >= 0.995) ? 1 : 0;
  hudAbout += (wantAbout - hudAbout) * hk;
  hudWork += (wantWork - hudWork) * hk;
  hudMore += (wantMore - hudMore) * hk;
  hoopPark += (wantPark - hoopPark) * hk;
  if (transiting) {
    const t = transDur <= 0 ? 1 : clamp((now - transStart) / transDur, 0, 1);
    progress = lerp(transFrom, transTo, easeInOut(t));
    if (t >= 1) {
      transiting = false;
      progress = transTo;
      landedAt = now;
    }
  } else if (beat <= 1) {
    progress = morphPos * 0.4;
    if (morphPos >= 0.995 && morphAim >= 1) {
      beat = 1;
      progress = 0.4;
    } else if (morphPos <= 0.005 && morphAim <= 0) {
      beat = 0;
      progress = 0;
    }
  }
  apply();
  if (!reduceOn() && morphPos < 0.28) {
    px += (mx - px) * 0.1;
    py += (my - py) * 0.1;
    const fall = 1 - morphPos / 0.28;
    world.style.transform = `translate(${px * 8 * fall}px, ${py * 5 * fall}px)`;
  } else {
    world.style.transform = "none";
  }
  requestAnimationFrame(tick);
}

function sectionHomeish() {
  return progress < 0.12;
}

function dwellMs() {
  if (reduceOn()) return 0;
  return BEATS[beat].dwell;
}

function onWheel(dy, now, touch) {
  const morphing = beat <= 1 && (inMorphScroll() || (beat === 0 && dy > 0) || (beat === 1 && dy < 0));
  if (morphing && !reduceOn()) {
    if (beat <= 1) transiting = false;
    const gain = touch ? 0.0022 : 0.00055;
    morphAim = clamp(morphAim + clamp(dy * gain, -0.03, 0.03), 0, 1);
    if (morphAim >= 1 && morphPos >= 0.98) landedAt = now;
    return;
  }
  if (dy < 0) {
    if (beat <= 1) return;
    goBeat(beat - 1, reduceOn() ? 0 : 160);
    return;
  }
  if (transiting) return;
  if (now - landedAt < dwellMs()) return;
  intent += dy;
  if (intent >= 100) {
    intent = 0;
    goBeat(beat + 1);
  }
}

addEventListener(
  "wheel",
  (e) => {
    e.preventDefault();
    onWheel(e.deltaY, performance.now(), false);
  },
  { passive: false }
);

let touchY = 0;
addEventListener("touchstart", (e) => { touchY = e.touches[0].clientY; }, { passive: true });
addEventListener(
  "touchmove",
  (e) => {
    const y = e.touches[0].clientY;
    onWheel(touchY - y, performance.now(), true);
    touchY = y;
    e.preventDefault();
  },
  { passive: false }
);

addEventListener("mousemove", (e) => {
  mx = e.clientX / innerWidth - 0.5;
  my = e.clientY / innerHeight - 0.5;
});

addEventListener("keydown", (e) => {
  const now = performance.now();
  if (e.key === "ArrowDown" || e.key === "PageDown") {
    if (beat === 0 || inMorphScroll() || (beat === 1 && progress < 0.4)) {
      onWheel(160, now);
      return;
    }
    if (e.repeat) return;
    goBeat(beat + 1);
  }
  if (e.key === "ArrowUp" || e.key === "PageUp") {
    if (beat === 1 && progress <= 0.4) {
      onWheel(-160, now);
      return;
    }
    goBeat(beat - 1, reduceOn() ? 0 : 160);
  }
  if (e.key === "Escape") goBeat(0, 0);
});
addEventListener("touchend", () => {
  if (beat > 1) return;
  if (morphAim > 0.92) morphAim = 1;
  if (morphAim < 0.08) morphAim = 0;
}, { passive: true });

function jumpHash() {
  const h = (location.hash || "#/").replace(/^#/, "") || "/";
  if (h.startsWith("/edu") || h.startsWith("/find")) goBeat(BEATS.length - 1, 0);
  else if (h.startsWith("/work")) goBeat(PROJECT_START, 0);
  else if (h.startsWith("/about")) goBeat(1, 0);
  else goBeat(0, 0);
  progress = BEATS[beat].p;
  transiting = false;
  landedAt = performance.now();
  apply();
}

document.getElementById("nav-work").addEventListener("click", (e) => {
  e.preventDefault();
  goBeat(PROJECT_START, 0);
});
document.getElementById("nav-edu").addEventListener("click", (e) => {
  e.preventDefault();
  goBeat(BEATS.length - 1, 0);
});
addEventListener("hashchange", jumpHash);

dotsEl.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-dot]");
  if (!btn) return;
  goBeat(PROJECT_START + Number(btn.dataset.dot), reduceOn() ? 0 : 360);
});

const canvas = document.getElementById("dust");
const ctx = canvas.getContext("2d");
const bits = Array.from({ length: 140 }, () => ({
  x: 0.5 + (Math.random() - 0.5) * 0.55,
  y: 0.45 + Math.random() * 0.55,
  z: 0.2 + Math.random() * 0.8,
  vx: (Math.random() - 0.5) * 0.0002,
}));
let dustW = 0;
let dustH = 0;
function dust() {
  if (canvas.width !== innerWidth || canvas.height !== innerHeight) {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    dustW = innerWidth;
    dustH = innerHeight;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const dens = !reduceOn() && morphPos < 0.08 ? 1 - morphPos / 0.08 : 0;
  bits.forEach((b) => {
    b.y -= 0.00032 * b.z;
    b.x += b.vx;
    if (b.y < 0.35) b.y = 1;
    if (b.x < 0.2) b.x = 0.8;
    if (b.x > 0.8) b.x = 0.2;
    ctx.fillStyle = `rgba(220,190,80,${(0.16 + b.z * 0.32) * dens})`;
    ctx.beginPath();
    ctx.arc(b.x * canvas.width, b.y * canvas.height, 1 + b.z * 1.6, 0, Math.PI * 2);
    ctx.fill();
  });
  requestAnimationFrame(dust);
}

reduce.addEventListener("change", () => apply());
jumpHash();
requestAnimationFrame(tick);
if (!reduceOn()) dust();
const rawShot = new URLSearchParams(location.search).get("s");
if (rawShot != null && rawShot !== "") {
  const shot = Number(rawShot);
  if (Number.isFinite(shot)) {
    let nearest = 0;
    let best = 99;
    BEATS.forEach((b, i) => {
      const d = Math.abs(b.p - shot);
      if (d < best) {
        best = d;
        nearest = i;
      }
    });
    beat = nearest;
    progress = shot;
    transiting = false;
    apply();
  }
}
