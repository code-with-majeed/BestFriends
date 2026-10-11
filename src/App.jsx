import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDown,
  Camera,
  Coffee,
  Flower2,
  Gift,
  Heart,
  Mail,
  Music,
  Pencil,
  RotateCcw,
  Smile,
  Sparkles,
  Star,
  Sun,
  Users,
} from "lucide-react";

/**
 * BestieCards  ·  A personalised friendship gift
 * React + Tailwind CSS (v3.1+) + lucide-react.   npm i lucide-react
 *
 * The SENDER is always Maleeha. The visitor types their own name and the whole
 * experience becomes a gift from Maleeha to them. The name lives in React state.
 *
 * Usage:
 *   import BestieCards from "./BestieCards";
 *   export default function App() { return <BestieCards />; }
 *
 *   // optional: <BestieCards sender="Maleeha" />
 *
 * To edit any message, change buildContent() below.
 */

/* ───────────────────────────── NAME HELPERS ───────────────────────────── */

const MAX_NAME_LENGTH = 30;
// letters (any language), combining marks, spaces, apostrophes, dots, hyphens
const NAME_PATTERN = /^[\p{L}\p{M}][\p{L}\p{M}\s.'’-]*$/u;

/** Trim, collapse repeated spaces, capitalise the first letter of each word. */
function formatName(raw) {
  return raw
    .trim()
    .replace(/\s+/g, " ")
    .split(" ")
    .map((w) => (w ? w.charAt(0).toLocaleUpperCase() + w.slice(1) : w))
    .join(" ");
}

function validateName(raw) {
  const name = formatName(raw);
  if (!name) return { ok: false, error: "Please enter your name to open your gift 💗" };
  if (name.length > MAX_NAME_LENGTH)
    return { ok: false, error: `Names can be up to ${MAX_NAME_LENGTH} characters long.` };
  if (!NAME_PATTERN.test(name))
    return { ok: false, error: "Please use letters only (spaces, - and ' are fine)." };
  return { ok: true, name };
}

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ───────────────────────────── CONTENT ───────────────────────────── */

const NAV_LINKS = [
  { id: "cards", label: "Cards" },
  { id: "surprise", label: "Surprise" },
  { id: "timeline", label: "Our Story" },
  { id: "letter", label: "Letter" },
];

function buildContent(name, sender) {
  return {
    welcomeLine: `${name}, this little gift is from ${sender}, with love 💗`,
    happinessLine: `Hey ${name}, you deserve all the happiness in the world!`,

    cards: [
      {
        id: "favorite",
        title: `You’re My Favorite Person, ${name}`,
        icon: Heart,
        front: "from-rose-300 via-pink-300 to-fuchsia-300",
        back: "border-rose-200",
        message: `Out of everyone in the world, you’re the one I’d call first, ${name}. You make ordinary days feel a little more special.`,
      },
      {
        id: "friendship",
        title: `Our Beautiful Friendship, ${name}`,
        icon: Users,
        front: "from-violet-300 via-purple-300 to-pink-300",
        back: "border-violet-200",
        message: `Ours isn’t loud or perfect. It’s steady, honest, and real. Thank you, ${name}, for staying, for understanding, and for being exactly who you are.`,
      },
      {
        id: "reasons",
        title: `Reasons You’re Special, ${name}`,
        icon: Star,
        front: "from-amber-200 via-rose-200 to-pink-300",
        back: "border-amber-200",
        reasons: [
          "You listen without judging",
          "Your laugh fixes bad days",
          "You’re loyal in every season",
          "You make people feel seen",
          `You’re simply, wonderfully ${name}`,
        ],
      },
      {
        id: "surprise",
        title: `A Little Surprise for You, ${name}`,
        icon: Sparkles,
        front: "from-fuchsia-300 via-rose-300 to-orange-200",
        back: "border-fuchsia-200",
        message: `Surprise, ${name}! This card is a hug in disguise. Scroll down, there’s a gift box waiting with something I wrote just for you.`,
      },
      {
        id: "forever",
        title: `You’ll Always Be Special to ${sender}, ${name}`,
        icon: Flower2,
        front: "from-[#d9a7a0] via-[#e8b4b8] to-[#f3d1c8]",
        back: "border-[#e8b4b8]",
        message: `Distance, busy weeks, changing seasons: none of it can shrink what we have. You’ll always be special to me, ${name}.`,
      },
      {
        id: "smile",
        title: `Open When You Need a Smile, ${name}`,
        icon: Smile,
        front: "from-indigo-200 via-violet-200 to-pink-200",
        back: "border-indigo-200",
        messages: [
          `Take a slow breath, ${name}. You are doing better than you think.`,
          `Remember our silliest moment. Yes, that one. You’re smiling now, aren’t you, ${name}?`,
          `You are loved far more than your worst day will ever let you believe.`,
          `Drink some water, stretch, and then text me, ${name}. I’ll be here.`,
        ],
      },
    ],

    gift: {
      title: `Dear ${name},`,
      message: `If you’re reading this, the gift box opened, and so did my heart. You are laughter, comfort and calm to me. I may not say it enough, but I’m endlessly grateful that life led me to you, ${name}. Never forget how special you are.`,
      signoff: `With lots of love, ${sender} 💖`,
    },

    timeline: [
      { when: "Day One", title: "The Day We Met", icon: Sun, text: "Neither of us knew it yet, but this was the start of something beautiful." },
      { when: "Soon After", title: "Inside Jokes Begin", icon: Smile, text: "The first joke only we understood. There have been a thousand since." },
      { when: "Hard Times", title: "You Stayed", icon: Heart, text: "When things got heavy, you showed up. That’s when I knew you were forever." },
      { when: "Today", title: `Still Us, ${name}`, icon: Sparkles, text: "Older, wiser, and still laughing at the same things." },
    ],

    moments: [
      { title: "Late-Night Talks", caption: "Hours that felt like minutes.", icon: Coffee, photo: "" },
      { title: "Laughing Until We Cried", caption: "Our best medicine.", icon: Smile, photo: "" },
      { title: "Our Song", caption: "Still plays in my head.", icon: Music, photo: "" },
      { title: "Little Adventures", caption: `Anywhere is fun with you, ${name}.`, icon: Camera, photo: "" },
    ],

    letter: {
      title: `Dear ${name},`,
      paragraphs: [
        `I made this little gift because words in a chat never felt big enough. You matter to me, ${name}, more than a few cards can say.`,
        "Thank you for the laughs, the honesty, and the quiet moments when you simply understood. Every one of them stayed with me.",
        `Whenever life feels heavy, I hope you come back here and remember that someone is cheering for you, always. You deserve every good thing, ${name}.`,
      ],
      signoff: `With lots of love, ${sender} 💖`,
    },

    finalLead: "No matter what,",
    finalTitle: `You’ll Always Be Special to ${sender}, ${name}`,
    finalSign: `With love, ${sender} 💕`,
  };
}

/* ───────────────────────────── STYLES ───────────────────────────── */

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=Playfair+Display:wght@500;600;700&family=Quicksand:wght@400;500;600&display=swap');
html { scroll-behavior: smooth; }
.bc-serif { font-family: 'Playfair Display', Georgia, serif; }
.bc-script { font-family: 'Dancing Script', cursive; }
.bc-sans { font-family: 'Quicksand', system-ui, sans-serif; }
@keyframes bc-rise { 0% { transform: translateY(0) scale(.8); opacity: 0 } 15% { opacity: .5 } 100% { transform: translateY(-110vh) scale(1.15); opacity: 0 } }
@keyframes bc-twinkle { 0%,100% { opacity: .15; transform: scale(.7) } 50% { opacity: 1; transform: scale(1.1) } }
@keyframes bc-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-8px) } }
@keyframes bc-beat { 0%,100% { transform: scale(1) } 30% { transform: scale(1.25) } 60% { transform: scale(1.08) } }
@keyframes bc-fade { from { opacity: 0; transform: translateY(14px) } to { opacity: 1; transform: translateY(0) } }
@keyframes bc-zoom { from { opacity: 0; transform: scale(.95) translateY(12px) } to { opacity: 1; transform: scale(1) translateY(0) } }
@keyframes bc-burst { 0% { transform: translate(0,0) scale(.4); opacity: 0 } 15% { opacity: 1 } 100% { transform: translate(var(--x), var(--y)) scale(1.2); opacity: 0 } }
@keyframes bc-shimmer { 0% { transform: translateX(-130%) skewX(-20deg) } 100% { transform: translateX(300%) skewX(-20deg) } }
@keyframes bc-letter { 0% { opacity: 0; transform: translateY(20px) scale(.6) rotate(-6deg) } 70% { transform: translateY(-3px) scale(1.06) rotate(1deg) } 100% { opacity: 1; transform: translateY(0) scale(1) rotate(0) } }
@keyframes bc-wiggle { 0%,100% { transform: rotate(0) } 20% { transform: rotate(-9deg) } 40% { transform: rotate(8deg) } 60% { transform: rotate(-5deg) } 80% { transform: rotate(4deg) } }
@keyframes bc-glow { 0%,100% { box-shadow: 0 0 0 0 rgba(244,114,182,.35) } 50% { box-shadow: 0 0 0 12px rgba(244,114,182,0) } }
@keyframes bc-shake { 0%,100% { transform: translateX(0) } 20% { transform: translateX(-8px) } 40% { transform: translateX(7px) } 60% { transform: translateX(-5px) } 80% { transform: translateX(3px) } }
@keyframes bc-orbit { from { transform: rotate(0) } to { transform: rotate(360deg) } }
@keyframes bc-gradient { 0%,100% { background-position: 0% 50% } 50% { background-position: 100% 50% } }
.bc-rise { animation: bc-rise linear infinite }
.bc-twinkle { animation: bc-twinkle ease-in-out infinite }
.bc-float { animation: bc-float 5s ease-in-out infinite }
.bc-beat { animation: bc-beat 1.8s ease-in-out infinite }
.bc-fade { animation: bc-fade .8s ease-out both }
.bc-zoom { animation: bc-zoom .8s cubic-bezier(.2,.8,.2,1) both }
.bc-burst { animation: bc-burst 2s ease-out both }
.bc-shimmer { animation: bc-shimmer 5s ease-in-out infinite }
.bc-letter { animation: bc-letter .7s cubic-bezier(.2,.9,.3,1.2) both }
.bc-wiggle { animation: bc-wiggle 2.6s ease-in-out infinite }
.bc-glow { animation: bc-glow 2.4s ease-out infinite }
.bc-shake { animation: bc-shake .45s ease-in-out }
.bc-orbit { animation: bc-orbit 14s linear infinite }
.bc-gradient { background-size: 200% 200%; animation: bc-gradient 6s ease-in-out infinite }
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .bc-rise,.bc-twinkle,.bc-float,.bc-beat,.bc-fade,.bc-zoom,.bc-burst,.bc-shimmer,.bc-letter,.bc-wiggle,.bc-glow,.bc-shake,.bc-orbit,.bc-gradient { animation: none !important }
}
`;

/* ───────────────────────────── SMALL PIECES ───────────────────────────── */

const FLOATING_HEARTS = [
  { left: "6%", delay: "0s", dur: "14s", size: 14 },
  { left: "18%", delay: "3s", dur: "17s", size: 20 },
  { left: "33%", delay: "6s", dur: "15s", size: 12 },
  { left: "48%", delay: "1.5s", dur: "18s", size: 18 },
  { left: "62%", delay: "8s", dur: "16s", size: 14 },
  { left: "76%", delay: "4s", dur: "19s", size: 22 },
  { left: "90%", delay: "10s", dur: "15s", size: 16 },
];

const SPARKLES = [
  { top: "12%", left: "10%", delay: "0s", size: 16 },
  { top: "22%", left: "86%", delay: "1.2s", size: 20 },
  { top: "48%", left: "5%", delay: "2.4s", size: 14 },
  { top: "62%", left: "92%", delay: "0.6s", size: 16 },
  { top: "82%", left: "20%", delay: "1.8s", size: 18 },
  { top: "90%", left: "78%", delay: "3s", size: 14 },
];

function Backdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {FLOATING_HEARTS.map((h, i) => (
        <Heart
          key={i}
          size={h.size}
          fill="currentColor"
          className="bc-rise absolute -bottom-10 text-rose-300/70"
          style={{ left: h.left, animationDelay: h.delay, animationDuration: h.dur }}
        />
      ))}
      {SPARKLES.map((s, i) => (
        <Sparkles
          key={i}
          size={s.size}
          className="bc-twinkle absolute text-[#c98b94]"
          style={{ top: s.top, left: s.left, animationDelay: s.delay, animationDuration: "3.6s" }}
        />
      ))}
    </div>
  );
}

/** One-time celebration when the gift opens. Radiates from the screen centre. */
const CONFETTI = Array.from({ length: 18 }, (_, i) => {
  const angle = (i / 18) * Math.PI * 2;
  const dist = 20 + (i % 3) * 9; // vmin, so it never leaves small screens
  return {
    x: `${(Math.cos(angle) * dist).toFixed(1)}vmin`,
    y: `${(Math.sin(angle) * dist).toFixed(1)}vmin`,
    size: 14 + (i % 4) * 4,
    sparkle: i % 3 === 0,
    delay: `${(i % 6) * 50}ms`,
  };
});

function CelebrationBurst() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 2800);
    return () => clearTimeout(t);
  }, []);
  if (!show) return null;
  return (
    <div className="pointer-events-none fixed left-1/2 top-1/2 z-40" aria-hidden="true">
      {CONFETTI.map((c, i) => {
        const Icon = c.sparkle ? Sparkles : Heart;
        return (
          <Icon
            key={i}
            size={c.size}
            fill={c.sparkle ? "none" : "currentColor"}
            className={`bc-burst absolute ${c.sparkle ? "text-amber-400" : "text-rose-400"}`}
            style={{ "--x": c.x, "--y": c.y, animationDelay: c.delay }}
          />
        );
      })}
    </div>
  );
}

/** Thin reading-progress bar at the very top of the gift page. */
function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return (
    <div className="fixed inset-x-0 top-0 z-40 h-0.5" aria-hidden="true">
      <div
        className="h-full origin-left bg-gradient-to-r from-[#c98b94] via-rose-400 to-fuchsia-400"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}

/** Fades + lifts its children in when scrolled into view. */
function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out motion-reduce:!translate-y-0 motion-reduce:!opacity-100 motion-reduce:transition-none ${
        visible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <Reveal className="mx-auto mb-8 max-w-2xl text-center sm:mb-10">
      <p className="bc-sans text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[#b76e79]">
        {eyebrow}
      </p>
      <h2 className="bc-serif mt-2 text-2xl font-semibold text-stone-800 [overflow-wrap:anywhere] sm:text-3xl">
        {title}
      </h2>
      <div className="mx-auto mt-3 flex items-center justify-center gap-3" aria-hidden="true">
        <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#b76e79]" />
        <Heart size={12} fill="currentColor" className="bc-beat text-[#b76e79]" />
        <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#b76e79]" />
      </div>
      {subtitle && <p className="bc-sans mt-3 text-sm text-stone-600 sm:text-base">{subtitle}</p>}
    </Reveal>
  );
}

/** The recipient's name, popping in letter by letter. Wraps cleanly on small screens. */
function AnimatedName({ text, className = "" }) {
  let n = 0;
  return (
    <span className={className} aria-label={text}>
      {text.split(" ").map((word, wi, words) => (
        <span key={wi} aria-hidden="true">
          <span className="inline-block whitespace-nowrap">
            {[...word].map((ch) => {
              const delay = 350 + n++ * 70;
              return (
                <span key={n} className="bc-letter inline-block" style={{ animationDelay: `${delay}ms` }}>
                  {ch}
                </span>
              );
            })}
          </span>
          {wi < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}

const nameSize = (len) =>
  len > 18
    ? "text-3xl sm:text-5xl"
    : len > 11
    ? "text-4xl sm:text-6xl"
    : "text-5xl sm:text-6xl lg:text-7xl";

/* ───────────────────────────── NAME GATE ───────────────────────────── */

function NameGate({ sender, initialValue, autoFocus, leaving, onSubmit }) {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");
  const [shakeKey, setShakeKey] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (leaving) return;
    const result = validateName(value);
    if (!result.ok) {
      setError(result.error);
      setShakeKey((k) => k + 1);
      inputRef.current?.focus();
      return;
    }
    setError("");
    onSubmit(result.name);
  };

  return (
    <section
      aria-labelledby="bc-gate-title"
      className={`relative flex min-h-[100svh] items-center justify-center px-4 py-4 transition-all duration-500 ease-in motion-reduce:transition-none sm:px-6 ${
        leaving ? "pointer-events-none -translate-y-4 scale-95 opacity-0 blur-sm" : ""
      }`}
    >
      <div className="bc-zoom w-full max-w-md rounded-3xl bg-gradient-to-br from-[#d9a7a0] via-[#f0cfc6] to-[#c98b94] p-px shadow-2xl shadow-rose-300/40">
        <div className="relative overflow-hidden rounded-[1.4rem] bg-gradient-to-br from-[#fffaf3]/95 via-[#fff1f4]/95 to-[#f3ecfb]/95 px-5 py-7 text-center backdrop-blur-xl sm:px-9 sm:py-9 [@media(max-height:640px)]:py-5">
          <span className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <span className="bc-shimmer absolute -left-1/2 top-0 block h-full w-1/4 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          </span>

          {/* gift emblem with orbiting sparkles */}
          <div
            className="relative mx-auto flex h-[4.5rem] w-[4.5rem] items-center justify-center [@media(max-height:560px)]:hidden"
            aria-hidden="true"
          >
            <span className="bc-orbit absolute inset-0">
              <Sparkles size={13} className="absolute -top-1 left-1/2 -translate-x-1/2 text-[#c98b94]" />
              <Sparkles size={10} className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-amber-400" />
              <Heart size={10} fill="currentColor" className="absolute left-0 top-1/2 -translate-y-1/2 text-rose-300" />
            </span>
            <span className="bc-glow flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-rose-300 via-pink-300 to-fuchsia-300 text-white shadow-lg shadow-rose-300/50">
              <Gift size={26} strokeWidth={1.7} className="bc-wiggle" />
            </span>
          </div>

          <p className="bc-sans mt-3 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#b76e79] [@media(max-height:560px)]:hidden">
            You’ve received a gift
          </p>

          <h1 id="bc-gate-title" className="mt-2 leading-tight">
            <span className="bc-serif block text-xl font-medium text-stone-700 sm:text-2xl">
              A Little Gift from
            </span>
            <span className="block">
              <span className="bc-script bc-gradient bg-gradient-to-r from-[#b76e79] via-rose-500 to-fuchsia-500 bg-clip-text text-5xl font-bold text-transparent sm:text-6xl">
                {sender}
              </span>{" "}
              <span className="bc-beat inline-block align-middle text-3xl sm:text-4xl">💖</span>
            </span>
          </h1>

          <p className="bc-sans mx-auto mt-2 max-w-xs text-sm leading-relaxed text-stone-600 sm:text-base">
            This little surprise is made with love, just for you!
          </p>

          <form onSubmit={handleSubmit} noValidate className="mt-5">
            <label htmlFor="bc-name" className="sr-only">
              Your name
            </label>
            <div key={shakeKey} className={shakeKey ? "bc-shake" : ""}>
              <input
                ref={inputRef}
                id="bc-name"
                name="name"
                type="text"
                value={value}
                maxLength={MAX_NAME_LENGTH}
                autoComplete="given-name"
                enterKeyHint="go"
                placeholder="Enter your name here..."
                aria-invalid={error ? "true" : "false"}
                aria-describedby={error ? "bc-name-error" : undefined}
                onChange={(e) => {
                  setValue(e.target.value);
                  if (error) setError("");
                }}
                className={`bc-sans w-full rounded-full border bg-white/90 px-5 py-3 text-center text-base text-stone-800 shadow-inner shadow-rose-100 outline-none transition duration-300 placeholder:text-stone-400 focus:bg-white focus:ring-4 ${
                  error
                    ? "border-rose-400 focus:ring-rose-300/50"
                    : "border-rose-200 focus:border-[#c98b94] focus:ring-[#c98b94]/30"
                }`}
              />
            </div>

            <p
              id="bc-name-error"
              role="alert"
              className="bc-sans mt-1.5 min-h-[1.25rem] text-sm font-medium text-rose-500"
            >
              {error}
            </p>

            <button
              type="submit"
              disabled={leaving}
              className="bc-sans mt-1 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#c98b94] via-rose-400 to-fuchsia-400 px-8 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white shadow-lg shadow-rose-300/50 outline-none transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-rose-400/50 focus-visible:ring-4 focus-visible:ring-[#b76e79]/50 active:translate-y-0 disabled:cursor-wait disabled:opacity-80 sm:w-auto sm:px-10"
            >
              Open My Gift ✨
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────── FLIP CARD ───────────────────────────── */

function FlipCard({ card, name, sender, index }) {
  const [flipped, setFlipped] = useState(false);
  const [opens, setOpens] = useState(0); // used by the rotating "smile" card
  const Icon = card.icon;

  const toggle = () => {
    if (!flipped) setOpens((n) => n + 1);
    setFlipped((f) => !f);
  };

  const body = card.messages
    ? card.messages[(opens - 1 + card.messages.length) % card.messages.length]
    : card.message;

  return (
    <Reveal delay={(index % 3) * 100}>
      <button
        type="button"
        onClick={toggle}
        aria-pressed={flipped}
        aria-label={`${card.title}. ${flipped ? "Press to flip back" : "Press to open"}`}
        className="group relative block h-[22.5rem] w-full rounded-2xl text-left outline-none transition-transform duration-300 hover:-translate-y-1 focus-visible:ring-4 focus-visible:ring-[#b76e79]/50 motion-reduce:transform-none sm:h-[23.5rem]"
        style={{ perspective: "1200px" }}
      >
        <span
          className="relative block h-full w-full transition-transform duration-700 ease-in-out [transform-style:preserve-3d] motion-reduce:duration-0"
          style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
        >
          {/* FRONT */}
          <span
            className={`absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br ${card.front} p-5 text-center shadow-lg shadow-rose-300/30 ring-1 ring-white/60 transition-shadow duration-300 [backface-visibility:hidden] group-hover:shadow-xl group-hover:shadow-rose-300/50`}
          >
            <span className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
              <span className="bc-shimmer absolute -left-1/2 top-0 block h-full w-1/4 bg-gradient-to-r from-transparent via-white/35 to-transparent" />
            </span>
            <span className="absolute inset-2.5 rounded-xl border border-white/55" aria-hidden="true" />
            <Sparkles size={16} className="bc-twinkle absolute left-5 top-5 text-white/90" style={{ animationDuration: "3s" }} aria-hidden="true" />
            <Sparkles size={13} className="bc-twinkle absolute bottom-6 right-6 text-white/90" style={{ animationDuration: "4s", animationDelay: "1s" }} aria-hidden="true" />
            <Heart size={13} fill="currentColor" className="absolute right-6 top-5 text-white/80" aria-hidden="true" />

            <span className="relative flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-white/85 shadow-md shadow-rose-400/20 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110 sm:h-20 sm:w-20">
              <Icon size={34} strokeWidth={1.6} className="text-[#b76e79]" aria-hidden="true" />
            </span>
            <span className="bc-serif relative mt-4 block px-1 text-lg font-semibold leading-snug text-white drop-shadow-sm [overflow-wrap:anywhere] sm:text-xl">
              {card.title}
            </span>
            <span className="bc-sans relative mt-4 inline-flex items-center gap-2 rounded-full bg-white/30 px-3.5 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur">
              <Mail size={13} aria-hidden="true" /> Tap to open
            </span>
          </span>

          {/* BACK */}
          <span
            className={`absolute inset-0 flex flex-col items-center justify-center overflow-hidden rounded-2xl border-2 ${card.back} bg-gradient-to-b from-[#fffaf3] to-[#fdeef0] p-5 text-center shadow-lg shadow-rose-300/30 [backface-visibility:hidden]`}
            style={{ transform: "rotateY(180deg)" }}
          >
            <Heart size={18} fill="currentColor" className="bc-beat text-rose-400" aria-hidden="true" />
            <span className="bc-script mt-1 block text-2xl font-bold text-[#b76e79] [overflow-wrap:anywhere]">
              Dear {name},
            </span>

            {card.reasons ? (
              <span className="bc-sans mt-2 block max-h-56 space-y-1.5 overflow-y-auto text-left text-sm text-stone-700">
                {card.reasons.map((r) => (
                  <span key={r} className="flex items-start gap-2">
                    <Heart size={13} fill="currentColor" className="mt-1 shrink-0 text-rose-400" aria-hidden="true" />
                    <span className="[overflow-wrap:anywhere]">{r}</span>
                  </span>
                ))}
              </span>
            ) : (
              <span className="bc-sans mt-2 block max-h-52 overflow-y-auto text-sm leading-relaxed text-stone-700 [overflow-wrap:anywhere] sm:text-[0.95rem]">
                {body}
              </span>
            )}

            <span className="bc-script mt-2 block text-xl font-bold text-[#b76e79]">— {sender} 💕</span>
            <span className="bc-sans mt-2 inline-flex items-center gap-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-stone-400">
              <RotateCcw size={11} aria-hidden="true" />
              {card.messages ? "Flip back, then reopen for another" : "Tap to flip back"}
            </span>
          </span>
        </span>
      </button>
    </Reveal>
  );
}

/* ───────────────────────────── GIFT BOX ───────────────────────────── */

const BURST = [
  { x: "-110px", y: "-150px" }, { x: "-60px", y: "-200px" }, { x: "0px", y: "-230px" },
  { x: "60px", y: "-200px" }, { x: "110px", y: "-150px" }, { x: "-150px", y: "-80px" },
  { x: "150px", y: "-80px" }, { x: "30px", y: "-170px" },
];

function GiftBox({ gift, sender }) {
  const [open, setOpen] = useState(false);
  const [burstKey, setBurstKey] = useState(0);

  const toggle = () => {
    setOpen((o) => {
      if (!o) setBurstKey((k) => k + 1);
      return !o;
    });
  };

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center">
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-controls="bc-gift-message"
        aria-label={open ? "Close the gift box" : `Open the gift box from ${sender}`}
        className="group relative h-56 w-52 rounded-3xl outline-none focus-visible:ring-4 focus-visible:ring-[#b76e79]/50"
      >
        <span className={`relative block h-full w-full ${open ? "" : "bc-float"}`}>
          <span className="absolute inset-x-4 bottom-0 h-6 rounded-full bg-rose-300/40 blur-xl" aria-hidden="true" />

          {open && (
            <span key={burstKey} className="pointer-events-none absolute left-1/2 top-20" aria-hidden="true">
              {BURST.map((b, i) => (
                <Heart
                  key={i}
                  size={16 + (i % 3) * 4}
                  fill="currentColor"
                  className="bc-burst absolute text-rose-400"
                  style={{ "--x": b.x, "--y": b.y, animationDelay: `${i * 60}ms` }}
                />
              ))}
            </span>
          )}

          {/* body */}
          <span className="absolute bottom-0 left-3 right-3 block h-32 overflow-hidden rounded-b-2xl bg-gradient-to-b from-rose-300 to-rose-400 shadow-xl shadow-rose-400/30">
            <span className="absolute inset-y-0 left-1/2 block w-8 -translate-x-1/2 bg-gradient-to-r from-amber-100 via-[#f6dcc6] to-amber-100" />
            <span className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent" />
          </span>

          {/* lid */}
          <span
            className={`absolute bottom-[7.5rem] left-0 right-0 block h-12 origin-bottom-left rounded-xl bg-gradient-to-b from-rose-200 to-rose-300 shadow-lg transition-transform duration-700 ease-out motion-reduce:duration-0 ${
              open ? "-translate-y-5 translate-x-8 -rotate-[24deg]" : "group-hover:-translate-y-1"
            }`}
          >
            <span className="absolute inset-y-0 left-1/2 block w-8 -translate-x-1/2 bg-gradient-to-r from-amber-100 via-[#f6dcc6] to-amber-100" />
            <span className="absolute -top-5 left-1/2 flex -translate-x-1/2 items-end">
              <Heart size={30} fill="currentColor" className="-mr-2 -rotate-[25deg] text-[#e9b8a6]" aria-hidden="true" />
              <Heart size={30} fill="currentColor" className="rotate-[25deg] text-[#e9b8a6]" aria-hidden="true" />
            </span>
          </span>
        </span>
      </button>

      <p className="bc-sans mt-3 text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#b76e79] sm:text-sm">
        {open ? "Tap the box to close it" : `Tap the box to open ${sender}’s gift`}
      </p>

      <div
        id="bc-gift-message"
        aria-live="polite"
        className={`grid w-full transition-all duration-700 ease-out motion-reduce:transition-none ${
          open ? "mt-6 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="rounded-2xl bg-gradient-to-br from-rose-300 via-fuchsia-300 to-violet-300 p-px shadow-xl shadow-rose-300/30">
            <div className="rounded-[0.95rem] bg-[#fffaf3] px-5 py-6 text-center sm:px-9">
              <Mail size={26} className="bc-beat mx-auto text-[#b76e79]" aria-hidden="true" />
              <h3 className="bc-script mt-2 text-3xl font-bold text-[#b76e79] [overflow-wrap:anywhere]">{gift.title}</h3>
              <p className="bc-sans mt-3 text-sm leading-relaxed text-stone-700 [overflow-wrap:anywhere] sm:text-base">
                {gift.message}
              </p>
              <p className="bc-script mt-4 text-2xl font-bold text-[#b76e79] sm:text-3xl">{gift.signoff}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────────── TIMELINE, MOMENTS, LETTER ───────────────────────────── */

function Timeline({ items }) {
  return (
    <ol className="relative mx-auto max-w-4xl">
      <span
        className="absolute bottom-0 left-4 top-0 w-px bg-gradient-to-b from-transparent via-[#c98b94] to-transparent md:left-1/2"
        aria-hidden="true"
      />
      {items.map((item, i) => {
        const Icon = item.icon;
        const right = i % 2 === 1;
        return (
          <li key={item.title} className="relative pb-5 pl-11 last:pb-0 md:grid md:grid-cols-2 md:gap-12 md:pl-0">
            <span className="absolute left-4 top-5 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-rose-300 to-[#c98b94] text-white shadow-md shadow-rose-300/50 ring-4 ring-[#fff3ee] md:left-1/2">
              <Icon size={14} aria-hidden="true" />
            </span>
            <Reveal className={right ? "md:col-start-2" : "md:text-right"} delay={60}>
              <div className="rounded-xl border border-rose-100 bg-white/80 p-4 shadow-md shadow-rose-200/30 backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-rose-200/50">
                <p className="bc-sans text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-[#b76e79]">{item.when}</p>
                <h3 className="bc-serif mt-0.5 text-lg font-semibold text-stone-800 [overflow-wrap:anywhere]">{item.title}</h3>
                <p className="bc-sans mt-1.5 text-sm leading-relaxed text-stone-600">{item.text}</p>
              </div>
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}

function Moments({ items }) {
  const tilts = ["-rotate-2", "rotate-1", "rotate-2", "-rotate-1"];
  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 min-[480px]:grid-cols-2 lg:grid-cols-4">
      {items.map((m, i) => {
        const Icon = m.icon;
        return (
          <Reveal key={m.title} delay={i * 90}>
            <figure
              className={`${tilts[i % tilts.length]} rounded-xl bg-white p-2.5 pb-4 shadow-md shadow-rose-200/40 transition duration-300 hover:-translate-y-1.5 hover:rotate-0 hover:shadow-xl hover:shadow-rose-300/50 motion-reduce:transform-none`}
            >
              <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-rose-100 via-fuchsia-100 to-violet-100 min-[480px]:aspect-square">
                {m.photo ? (
                  <img src={m.photo} alt={m.title} className="h-full w-full object-cover" loading="lazy" />
                ) : (
                  <Icon size={40} strokeWidth={1.4} className="text-[#b76e79]/80" aria-hidden="true" />
                )}
              </div>
              <figcaption className="mt-3 px-1 text-center">
                <p className="bc-script text-xl font-bold text-[#b76e79]">{m.title}</p>
                <p className="bc-sans mt-0.5 text-xs text-stone-500 [overflow-wrap:anywhere] sm:text-sm">{m.caption}</p>
              </figcaption>
            </figure>
          </Reveal>
        );
      })}
    </div>
  );
}

function LetterCard({ letter }) {
  return (
    <Reveal>
      <article
        aria-label="A letter for you"
        className="relative mx-auto mt-5 max-w-2xl rounded-2xl border border-[#ecd5cf] bg-[#fffaf3] px-5 pb-8 pt-10 shadow-xl shadow-rose-300/40 sm:px-10 sm:pb-10 sm:pt-12"
        style={{
          backgroundImage:
            "repeating-linear-gradient(transparent, transparent 29px, rgba(201,139,148,.16) 30px)",
        }}
      >
        <span className="absolute -top-6 left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-gradient-to-br from-rose-400 to-[#b76e79] text-white shadow-lg shadow-rose-400/50 ring-4 ring-[#fff3ee]">
          <Heart size={20} fill="currentColor" className="bc-beat" aria-hidden="true" />
        </span>

        <h3 className="bc-script text-3xl font-bold text-[#b76e79] [overflow-wrap:anywhere] sm:text-4xl">
          {letter.title}
        </h3>
        <div className="bc-sans mt-4 space-y-4 text-[0.95rem] leading-[1.9rem] text-stone-700 [overflow-wrap:anywhere] sm:text-base sm:leading-[1.9rem]">
          {letter.paragraphs.map((p, i) => (
            <Reveal key={i} delay={i * 150}>
              <p>{p}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={450}>
          <p className="bc-script mt-6 text-right text-2xl font-bold text-[#b76e79] sm:text-3xl">
            {letter.signoff}
          </p>
        </Reveal>
      </article>
    </Reveal>
  );
}

/* ───────────────────────────── PERSONALISED EXPERIENCE ───────────────────────────── */

function ActionButton({ icon: Icon, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bc-sans inline-flex items-center justify-center gap-2 rounded-full border border-[#c98b94]/70 bg-white/75 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#b76e79] outline-none backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-lg focus-visible:ring-4 focus-visible:ring-[#b76e79]/50"
    >
      <Icon size={14} aria-hidden="true" /> {children}
    </button>
  );
}

function GiftExperience({ name, sender, onChangeName, onRestart }) {
  const data = useMemo(() => buildContent(name, sender), [name, sender]);
  const headingRef = useRef(null);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <div className="bc-fade">
      <CelebrationBurst />
      <ScrollProgress />

      {/* top bar */}
      <header className="fixed inset-x-0 top-0 z-30 border-b border-rose-100/80 bg-[#fff6f4]/80 backdrop-blur-md">
        <div className="mx-auto flex h-12 max-w-6xl items-center justify-between gap-3 px-3 sm:px-6">
          <a
            href="#top"
            className="bc-sans flex min-w-0 items-center gap-2 rounded-full text-xs font-semibold uppercase tracking-[0.16em] text-[#b76e79] outline-none focus-visible:ring-4 focus-visible:ring-[#b76e79]/50 sm:text-[0.8rem]"
          >
            <Heart size={14} fill="currentColor" className="bc-beat shrink-0" aria-hidden="true" />
            <span className="truncate">For {name}</span>
          </a>

          <nav aria-label="Sections" className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className="bc-sans rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-stone-500 outline-none transition hover:bg-white hover:text-[#b76e79] focus-visible:ring-4 focus-visible:ring-[#b76e79]/50"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 gap-2" role="group" aria-label="Gift options">
            <button
              type="button"
              onClick={onChangeName}
              aria-label="Change the recipient’s name"
              className="bc-sans inline-flex items-center gap-1.5 rounded-full border border-[#c98b94]/60 bg-white/80 px-3 py-1.5 text-xs font-semibold text-[#b76e79] outline-none transition hover:bg-white hover:shadow focus-visible:ring-4 focus-visible:ring-[#b76e79]/50"
            >
              <Pencil size={13} aria-hidden="true" />
              <span className="hidden min-[420px]:inline">Change name</span>
            </button>
            <button
              type="button"
              onClick={onRestart}
              aria-label="Restart the gift experience"
              className="bc-sans inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#c98b94] to-rose-400 px-3 py-1.5 text-xs font-semibold text-white outline-none transition hover:shadow-lg hover:shadow-rose-300/50 focus-visible:ring-4 focus-visible:ring-[#b76e79]/50"
            >
              <RotateCcw size={13} aria-hidden="true" />
              <span className="hidden min-[420px]:inline">Restart</span>
            </button>
          </div>
        </div>
      </header>

      {/* ───── WELCOME CARD ───── */}
      <section id="top" className="flex min-h-[100svh] items-center justify-center px-4 pb-6 pt-16 sm:px-6">
        <div className="bc-zoom w-full max-w-2xl rounded-3xl bg-gradient-to-br from-[#d9a7a0] via-[#f0cfc6] to-[#c98b94] p-px shadow-2xl shadow-rose-300/40 [animation-delay:.2s]">
          <div className="relative overflow-hidden rounded-[1.4rem] bg-gradient-to-br from-[#fffaf3]/95 via-[#fff1f4]/95 to-[#f3ecfb]/95 px-5 py-8 text-center backdrop-blur-xl sm:px-10 sm:py-10">
            <span className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
              <span className="bc-shimmer absolute -left-1/2 top-0 block h-full w-1/4 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            </span>
            <Sparkles size={20} className="bc-twinkle absolute left-5 top-5 text-[#c98b94]" style={{ animationDuration: "3s" }} aria-hidden="true" />
            <Sparkles size={16} className="bc-twinkle absolute bottom-5 right-5 text-[#c98b94]" style={{ animationDuration: "4s", animationDelay: "1s" }} aria-hidden="true" />

            <span className="bc-sans inline-flex items-center gap-2 rounded-full border border-[#e8b4b8] bg-white/70 px-3.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-[#b76e79] sm:text-xs">
              <Gift size={13} aria-hidden="true" /> A gift from {sender}
            </span>

            <h1 ref={headingRef} tabIndex={-1} className="mt-5 outline-none">
              <span className="bc-serif block text-xl font-medium text-stone-700 sm:text-3xl">
                A Special Friendship Gift for
              </span>
              <AnimatedName
                text={name}
                className={`bc-script mt-1 block font-bold leading-tight text-[#b76e79] [overflow-wrap:anywhere] [text-shadow:0_4px_24px_rgba(244,114,182,.35)] ${nameSize(name.length)}`}
              />
            </h1>

            <p className="bc-sans bc-fade mx-auto mt-5 max-w-xl text-base font-medium leading-relaxed text-stone-700 [animation-delay:1.2s] [overflow-wrap:anywhere] sm:text-lg">
              {data.welcomeLine}
            </p>
            <p className="bc-sans bc-fade mx-auto mt-2 max-w-xl text-sm leading-relaxed text-stone-600 [animation-delay:1.5s] [overflow-wrap:anywhere] sm:text-base">
              {data.happinessLine}
            </p>

            <a
              href="#cards"
              className="bc-sans bc-fade mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#c98b94] via-rose-400 to-fuchsia-400 px-7 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white shadow-lg shadow-rose-300/50 outline-none transition duration-300 [animation-delay:1.8s] hover:-translate-y-0.5 hover:shadow-xl hover:shadow-rose-400/50 focus-visible:ring-4 focus-visible:ring-[#b76e79]/50"
            >
              Open Your Cards <ArrowDown size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* ───── CARDS ───── */}
      <section id="cards" className="mx-auto max-w-6xl scroll-mt-14 px-4 py-12 sm:px-6 sm:py-14">
        <SectionTitle
          eyebrow={`Six little cards from ${sender}`}
          title={`Cards Made Just for You, ${name}`}
          subtitle="Tap each one to open it. Every card says something I mean."
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.cards.map((card, i) => (
            <FlipCard key={card.id} card={card} name={name} sender={sender} index={i} />
          ))}
        </div>
      </section>

      {/* ───── SURPRISE ───── */}
      <section id="surprise" className="scroll-mt-14 px-4 py-12 sm:px-6 sm:py-14">
        <SectionTitle
          eyebrow="One more thing"
          title={`A Special Surprise for ${name}`}
          subtitle={`${sender} left a gift box just for you. Go on, open it.`}
        />
        <Reveal>
          <GiftBox gift={data.gift} sender={sender} />
        </Reveal>
      </section>

      {/* ───── TIMELINE ───── */}
      <section id="timeline" className="scroll-mt-14 px-4 py-12 sm:px-6 sm:py-14">
        <SectionTitle
          eyebrow="Our story"
          title="Our Friendship Timeline"
          subtitle="A few chapters of the best story I know."
        />
        <Timeline items={data.timeline} />
      </section>

      {/* ───── MOMENTS ───── */}
      <section id="moments" className="scroll-mt-14 px-4 py-12 sm:px-6 sm:py-14">
        <SectionTitle
          eyebrow="Keepsakes"
          title="Memorable Moments"
          subtitle="Tiny pieces of time I’ll keep forever."
        />
        <Moments items={data.moments} />
      </section>

      {/* ───── LETTER ───── */}
      <section id="letter" className="scroll-mt-14 px-4 py-12 sm:px-6 sm:py-14">
        <SectionTitle
          eyebrow="Straight from the heart"
          title={`A Letter for ${name}`}
          subtitle={`Written by ${sender}, just for you.`}
        />
        <LetterCard letter={data.letter} />
      </section>

      {/* ───── FINAL CARD ───── */}
      <section id="forever" className="scroll-mt-14 px-4 pb-10 pt-12 sm:px-6 sm:pt-14">
        <Reveal>
          <div className="mx-auto max-w-2xl rounded-3xl bg-gradient-to-br from-[#d9a7a0] via-[#f0cfc6] to-[#c98b94] p-0.5 shadow-2xl shadow-rose-300/40">
            <div className="relative overflow-hidden rounded-[1.4rem] bg-gradient-to-br from-[#fffaf3] via-[#fff1f1] to-[#f6ecfb] px-5 py-10 text-center sm:px-12 sm:py-12">
              <span className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
                <span className="bc-shimmer absolute -left-1/2 top-0 block h-full w-1/4 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
              </span>
              <Sparkles size={20} className="bc-twinkle absolute left-5 top-5 text-[#c98b94]" style={{ animationDuration: "3s" }} aria-hidden="true" />
              <Sparkles size={16} className="bc-twinkle absolute bottom-5 right-5 text-[#c98b94]" style={{ animationDuration: "4s", animationDelay: "1s" }} aria-hidden="true" />

              <Heart size={34} fill="currentColor" className="bc-beat relative mx-auto text-rose-400" aria-hidden="true" />
              <h2 className="relative mt-4">
                <span className="bc-serif block text-xl font-semibold text-stone-800 sm:text-3xl">
                  {data.finalLead}
                </span>
                <span className="bc-script bc-gradient mt-1 block bg-gradient-to-r from-[#b76e79] via-rose-500 to-fuchsia-500 bg-clip-text text-3xl font-bold leading-tight text-transparent [overflow-wrap:anywhere] sm:text-5xl">
                  {data.finalTitle}
                </span>
              </h2>
              <p className="bc-script relative mt-5 text-2xl font-bold text-[#b76e79] sm:text-3xl">
                {data.finalSign}
              </p>

              <div className="relative mt-7 flex flex-col items-stretch justify-center gap-3 min-[480px]:flex-row min-[480px]:items-center">
                <a
                  href="#top"
                  className="bc-sans inline-flex items-center justify-center gap-2 rounded-full border border-[#c98b94]/70 bg-white/75 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#b76e79] outline-none backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-lg focus-visible:ring-4 focus-visible:ring-[#b76e79]/50"
                >
                  <ArrowDown size={14} className="rotate-180" aria-hidden="true" /> Back to the start
                </a>
                <ActionButton icon={Pencil} onClick={onChangeName}>Change name</ActionButton>
                <ActionButton icon={RotateCcw} onClick={onRestart}>Restart gift</ActionButton>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="relative z-10 border-t border-rose-100/70 px-4 py-5 text-center text-[0.65rem] uppercase tracking-[0.25em] text-stone-400">
        Made with <Heart size={10} fill="currentColor" className="mx-1 inline text-rose-400" aria-hidden="true" /> by {sender} for {name}
      </footer>
    </div>
  );
}

/* ───────────────────────────── MAIN COMPONENT ───────────────────────────── */

export default function BestieCards({ sender = "Maleeha" }) {
  const [phase, setPhase] = useState("gate"); // "gate" | "leaving" | "gift"
  const [recipient, setRecipient] = useState(""); // the visitor's name (state only)
  const [pending, setPending] = useState("");
  const [giftKey, setGiftKey] = useState(0); // remounts the gift to reset every card
  const [refocusInput, setRefocusInput] = useState(false);

  // gate -> (fade out) -> personalised gift
  useEffect(() => {
    if (phase !== "leaving") return;
    const t = setTimeout(
      () => {
        setRecipient(pending);
        setGiftKey((k) => k + 1);
        setPhase("gift");
        window.scrollTo({ top: 0, behavior: "auto" });
      },
      prefersReducedMotion() ? 0 : 550
    );
    return () => clearTimeout(t);
  }, [phase, pending]);

  const handleSubmit = (name) => {
    setPending(name);
    setPhase("leaving");
  };

  const handleChangeName = () => {
    setRefocusInput(true);
    setPhase("gate"); // keeps the current name pre-filled
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const handleRestart = () => {
    setRecipient("");
    setPending("");
    setRefocusInput(true);
    setPhase("gate");
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <div className="bc-sans relative min-h-screen w-full overflow-x-hidden bg-gradient-to-b from-[#fff3f1] via-[#fbeef7] to-[#efeafb] text-stone-800">
      <style>{STYLES}</style>
      <Backdrop />

      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-pink-200/50 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 top-[36rem] h-80 w-80 rounded-full bg-violet-200/50 blur-3xl" aria-hidden="true" />

      <main className="relative z-10">
        {phase !== "gift" ? (
          <NameGate
            sender={sender}
            initialValue={recipient || pending}
            autoFocus={refocusInput}
            leaving={phase === "leaving"}
            onSubmit={handleSubmit}
          />
        ) : (
          <GiftExperience
            key={giftKey}
            name={recipient}
            sender={sender}
            onChangeName={handleChangeName}
            onRestart={handleRestart}
          />
        )}
      </main>
    </div>
  );
}