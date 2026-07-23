import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Menu,
  X,
  ArrowRight,
  ArrowUpRight,
  Play,
  Search,
  Star,
  Flame,
  Zap,
  Target,
  Activity,
  Dumbbell,
  MapPin,
  Timer,
  TrendingUp,
  ClipboardList,
  Repeat,
  Calendar,
  Award,
  Users,
  BookOpen,
  Check,
  AlertTriangle,
  Sparkles,
  Instagram,
  Mail,
  ChevronDown,
  Bookmark,
  Loader2,
  Waves,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";
import { cn } from "@/lib/utils";
import { PhoneMockup } from "@/components/roxpath/PhoneMockup";
import logo from "@/assets/logo.png";
import mockupHome from "@/assets/mockup-home.png";
import mockupLibrary from "@/assets/mockup-library.png";
import mockupTechnique from "@/assets/mockup-technique.png";
import mockupSkills from "@/assets/mockup-skills.png";
import mockupPlan from "@/assets/mockup-plan.png";
import mockupProgress from "@/assets/mockup-progress.png";
import mockupLog from "@/assets/mockup-log.png";
import mockupSim from "@/assets/mockup-simulation.png";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "RoxPath — HYROX Technique, Training and Progress" },
      {
        name: "description",
        content:
          "Master HYROX movements, learn smarter race pacing, log your workouts, and track your progress with RoxPath.",
      },
    ],
  }),
});

/* ---------------- Data ---------------- */

const NAV_LINKS = [
  { label: "Techniques", href: "#techniques" },
  { label: "How it works", href: "#how" },
  { label: "Progress", href: "#progress" },
  { label: "For coaches", href: "#coaches" },
  { label: "FAQ", href: "#faq" },
];

const BENEFITS = [
  {
    icon: MapPin,
    title: "Train anywhere",
    body: "Learn substitutions for sleds, SkiErgs, rowers, and other specialist equipment.",
    accent: "text-primary-light",
  },
  {
    icon: Target,
    title: "Move correctly",
    body: "Understand form, competition standards, coaching cues, and common mistakes.",
    accent: "text-mint",
  },
  {
    icon: Timer,
    title: "Pace intelligently",
    body: "Learn how to balance running effort and station intensity.",
    accent: "text-orange",
  },
  {
    icon: TrendingUp,
    title: "See your progress",
    body: "Track sessions, streaks, personal bests, weights, distances, and times.",
    accent: "text-blue",
  },
];

const MOVEMENTS = [
  { name: "SkiErg", level: "Beginner", tag: "Machine", icon: Waves },
  { name: "Sled Push", level: "Intermediate", tag: "Sled", icon: Dumbbell },
  { name: "Sled Pull", level: "Intermediate", tag: "Sled + rope", icon: Dumbbell },
  { name: "Burpee Broad Jumps", level: "All levels", tag: "No equipment", icon: Zap },
  { name: "Rowing", level: "Beginner", tag: "Rower", icon: Activity },
  { name: "Farmer's Carry", level: "Beginner", tag: "Heavy DB / KB", icon: Dumbbell },
  { name: "Sandbag Lunges", level: "Intermediate", tag: "Sandbag", icon: Flame },
  { name: "Wall Balls", level: "All levels", tag: "Wall ball", icon: Target },
];

const FILTERS = ["All movements", "No equipment", "Standard gym", "Race equipment", "Beginner"];

const SUBSTITUTIONS = [
  {
    original: "Sled Push",
    swap: "Heavy treadmill push",
    trains: "Horizontal drive, quad & calf endurance under load.",
    color: "text-orange",
  },
  {
    original: "Sled Pull",
    swap: "Cable pull or rope drag",
    trains: "Hip-hinge pulling power and grip stamina.",
    color: "text-primary-light",
  },
  {
    original: "SkiErg",
    swap: "Resistance-band ski pulls",
    trains: "Lat drive, hip snap, controlled fatigue.",
    color: "text-blue",
  },
  {
    original: "Sandbag Lunges",
    swap: "Dumbbell front-rack lunges",
    trains: "Loaded single-leg endurance and posture.",
    color: "text-mint",
  },
  {
    original: "Farmer's Carry",
    swap: "Heavy dumbbell carry",
    trains: "Grip, trunk stiffness, and gait under fatigue.",
    color: "text-purple",
  },
];

const RACE_PLAN = [
  { seg: "Run 1", target: "5:20/km", effort: "Controlled", split: "4:16" },
  { seg: "SkiErg 1000m", target: "1:50 /500m", effort: "Steady", split: "3:40" },
  { seg: "Run 2", target: "5:22/km", effort: "Controlled", split: "4:18" },
  { seg: "Sled Push 50m", target: "Sub-2:30", effort: "Hard, paced", split: "2:20" },
  { seg: "Run 3", target: "5:25/km", effort: "Steady", split: "4:20" },
  { seg: "Sled Pull 50m", target: "Sub-2:40", effort: "Hard, paced", split: "2:30" },
  { seg: "Run 4", target: "5:28/km", effort: "Steady", split: "4:22" },
  { seg: "Burpee BJ 80m", target: "Rhythm", effort: "Sustainable", split: "3:50" },
  { seg: "Run 5", target: "5:30/km", effort: "Steady", split: "4:24" },
  { seg: "Row 1000m", target: "1:55 /500m", effort: "Threshold", split: "3:50" },
  { seg: "Run 6", target: "5:32/km", effort: "Grind", split: "4:26" },
  { seg: "Farmer's Carry 200m", target: "Unbroken 2×", effort: "Grip smart", split: "1:55" },
  { seg: "Run 7", target: "5:34/km", effort: "Grind", split: "4:28" },
  { seg: "Sandbag Lunges 100m", target: "Micro-breaks", effort: "Legs saved", split: "3:15" },
  { seg: "Run 8", target: "5:20/km", effort: "Empty tank", split: "4:16" },
  { seg: "100 Wall Balls", target: "10s × 10", effort: "Break smart", split: "3:40" },
];

const LOG_ENTRIES = [
  { title: "4 × 500 m row", meta: "1:55 avg /500m • RPE 8", color: "bg-primary/20 text-primary-light" },
  { title: "5 × 20 wall balls", meta: "6kg • unbroken", color: "bg-mint/15 text-mint" },
  { title: "4 × 20m heavy farmer's carry", meta: "2 × 32kg", color: "bg-orange/15 text-orange" },
  { title: "6 km threshold run", meta: "5:25/km avg", color: "bg-blue/15 text-blue" },
];

const PACE_TREND = [
  { w: "W1", pace: 5.9 },
  { w: "W2", pace: 5.75 },
  { w: "W3", pace: 5.62 },
  { w: "W4", pace: 5.55 },
  { w: "W5", pace: 5.4 },
  { w: "W6", pace: 5.32 },
  { w: "W7", pace: 5.25 },
  { w: "W8", pace: 5.18 },
];

const STATION_DATA = [
  { s: "SkiErg", t: 240 },
  { s: "Sled Push", t: 155 },
  { s: "Sled Pull", t: 168 },
  { s: "Burpee BJ", t: 230 },
  { s: "Row", t: 235 },
  { s: "Farmer's", t: 118 },
  { s: "Lunges", t: 205 },
  { s: "Wall Balls", t: 220 },
];

const HOW_STEPS = [
  {
    n: "01",
    title: "Choose a movement",
    body: "Search the technique library or select a HYROX station.",
    icon: Search,
  },
  {
    n: "02",
    title: "Learn the standard",
    body: "Watch the demonstration and review execution cues.",
    icon: BookOpen,
  },
  {
    n: "03",
    title: "Complete your training",
    body: "Follow the technique in your gym, at home, or with race equipment.",
    icon: Dumbbell,
  },
  {
    n: "04",
    title: "Log and improve",
    body: "Record your performance and see progress over time.",
    icon: TrendingUp,
  },
];

const COACH_BENEFITS = [
  {
    title: "Consistent technique guidance",
    body: "Every athlete you coach references the same standards, cues, and mistake corrections.",
    icon: Target,
  },
  {
    title: "Athlete-friendly exercise references",
    body: "Send clean movement pages instead of piecing together YouTube links.",
    icon: BookOpen,
  },
  {
    title: "Easier progress conversations",
    body: "Review logged sessions and PBs so every check-in starts with real data.",
    icon: TrendingUp,
  },
];

const FUTURE = [
  { title: "AI technique analysis", icon: Sparkles },
  { title: "Coach-created workout plans", icon: ClipboardList },
  { title: "Community challenges", icon: Users },
  { title: "Apple Health integration", icon: Activity },
  { title: "Garmin integration", icon: Activity },
  { title: "Official race result tracking", icon: Award },
  { title: "Personalized workout recommendations", icon: Sparkles },
];

const TESTIMONIALS = [
  {
    quote:
      "Walking into my first HYROX I actually knew what a legal wall ball looked like. That alone saved me minutes.",
    name: "Priya M.",
    role: "First-time racer • Beta user",
  },
  {
    quote:
      "My gym has no sled. The substitutions gave me a real plan instead of guessing with a loaded barbell on a mat.",
    name: "Tom R.",
    role: "Home gym athlete • Beta user",
  },
  {
    quote:
      "I stopped detonating on Run 3. The pacing section made me respect the opening kilometre.",
    name: "Alina K.",
    role: "Intermediate athlete • Beta user",
  },
  {
    quote:
      "Logging every session in one place made progress obvious. I could see the work compound week to week.",
    name: "Marcus D.",
    role: "Returning athlete • Beta user",
  },
];

const FAQS = [
  {
    q: "Is RoxPath only for advanced HYROX athletes?",
    a: "No. RoxPath is built primarily for beginners and intermediate athletes preparing for their first few races. Advanced athletes can still use it as a reference and a logging tool.",
  },
  {
    q: "Do I need access to HYROX equipment?",
    a: "No. Every station includes substitutions you can perform in a standard gym or at home, along with guidance on when to try the real movement before race day.",
  },
  {
    q: "Does RoxPath provide complete workout plans?",
    a: "RoxPath focuses on technique, pacing, logging, and progress. Structured multi-week plans are on the roadmap and are clearly labelled as a future feature.",
  },
  {
    q: "Can I log running and strength sessions?",
    a: "Yes. Log runs, rows, strength blocks, station work, and race simulations with sets, reps, weight, distance, time, pace, RPE, and notes.",
  },
  {
    q: "Can coaches use RoxPath with their athletes?",
    a: "Yes. Coaches can use it as a shared technique reference and progress tracker between sessions. A dedicated coach dashboard is on the roadmap.",
  },
  {
    q: "Is RoxPath affiliated with HYROX?",
    a: "RoxPath is an independent training companion and is not affiliated with or endorsed by HYROX. HYROX is a trademark of its respective owner.",
  },
  {
    q: "When will the app be available?",
    a: "We are actively building toward launch. Join the waitlist for launch updates and early-access invitations.",
  },
  {
    q: "Will Android and iOS both be supported?",
    a: "Platform availability will be shared before launch. Join the waitlist for launch updates.",
  },
];

/* ---------------- Page ---------------- */

function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <AnnouncementBar />
      <Navbar />
      <Hero />
      <BenefitStrip />
      <TechniqueLibrary />
      <SubstitutionSection />
      <PacingSection />
      <LoggingSection />
      <ProgressSection />
      <HowItWorks />
      <AthleteProfile />
      <CoachSection />
      <FutureFeatures />
      <Testimonials />
      <FAQSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}

/* ---------------- Sections ---------------- */

function AnnouncementBar() {
  return (
    <div className="relative z-40 border-b border-white/10 bg-black">
      <div className="container-x flex items-center justify-center py-2.5 text-center text-[13px] text-white/70">
        <span>
          Preparing for your first HYROX?{" "}
          <a href="#waitlist" className="font-semibold text-white underline-offset-4 hover:underline">
            Join the RoxPath early-access list →
          </a>
        </span>
      </div>
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "border-b border-white/5 bg-background/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-x flex h-16 items-center justify-between md:h-20">
        <a href="#top" className="flex items-center gap-2.5">
          <img src={logo} alt="RoxPath" className="h-9 w-9 rounded-[10px]" />
          <span className="text-[17px] font-bold tracking-tight">RoxPath</span>
        </a>
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs font-semibold uppercase tracking-wider text-white/65 transition hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="#waitlist"
            className="hidden text-xs font-semibold uppercase tracking-wider text-white/65 transition hover:text-white lg:inline-flex"
          >
            Sign in
          </a>
          <a href="#waitlist" className="btn-primary hidden md:inline-flex">
            Join the waitlist <ArrowRight className="h-4 w-4" />
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {/* mobile menu */}
      <div
        className={cn(
          "grid overflow-hidden border-t border-white/5 bg-background/95 backdrop-blur-xl transition-all duration-300 lg:hidden",
          open ? "max-h-[420px]" : "max-h-0",
        )}
      >
        <div className="container-x flex flex-col gap-1 py-4">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-sm font-semibold uppercase tracking-wide text-white/85 hover:bg-white/5"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#waitlist"
            onClick={() => setOpen(false)}
            className="btn-primary mt-3 justify-center"
          >
            Join the waitlist <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  );
}

const HERO_STATS = [
  { icon: Flame, value: "12-day", label: "Training streak" },
  { icon: Award, value: "7:42", label: "2km row PB" },
  { icon: Timer, value: "5:20/km", label: "Race pace target" },
];

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-14 md:pt-20 lg:pb-28">
      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          <div className="text-center lg:text-left">
            <div className="eyebrow mb-5">Early access · Building for HYROX athletes</div>
            <h1 className="h-display text-balance">
              MASTER EVERY
              <br />
              <span className="text-primary-light">STATION.</span> RACE WITH
              <br />
              CONFIDENCE.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-white/65 lg:mx-0">
              RoxPath teaches you how to perform every HYROX movement, adapt it to the equipment you
              have, pace your race, and track every session.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <a href="#waitlist" className="btn-primary">
                Join the waitlist <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#techniques" className="btn-outline">
                Explore techniques
              </a>
            </div>

            <div className="mt-10 flex items-center justify-center gap-6 border-t border-white/10 pt-6 lg:justify-start">
              {HERO_STATS.map((s, i) => (
                <div key={s.label} className={cn("flex items-center gap-2.5", i > 0 && "border-l border-white/10 pl-6")}>
                  <s.icon className="h-4 w-4 shrink-0 text-primary-light" strokeWidth={1.75} />
                  <div className="text-left">
                    <div className="text-mono text-sm font-bold leading-none">{s.value}</div>
                    <div className="mt-1 text-[11px] font-medium uppercase tracking-wide text-white/40">
                      {s.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <PhoneMockup src={mockupHome} alt="RoxPath home screen" className="max-w-[300px] lg:max-w-[340px]" />
        </div>
      </div>
    </section>
  );
}

function BenefitStrip() {
  return (
    <section className="border-y border-white/10 bg-surface">
      <div className="container-x grid gap-px overflow-hidden rounded-none py-0 sm:grid-cols-2 lg:grid-cols-4">
        {BENEFITS.map((b, i) => (
          <div
            key={b.title}
            className={cn(
              "relative flex flex-col gap-3 py-10",
              i > 0 && "sm:border-l sm:border-white/5",
              i === 2 && "lg:border-l lg:border-white/5",
              i >= 2 && "sm:border-t sm:border-white/5 lg:border-t-0",
              "px-6 lg:px-8",
            )}
          >
            <b.icon className={cn("h-6 w-6", b.accent)} strokeWidth={1.6} />
            <div className="h-card">{b.title}</div>
            <p className="text-[14.5px] leading-relaxed text-white/55">{b.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  body,
  align = "left",
}: {
  eyebrow: string;
  title: React.ReactNode;
  body?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <div className="eyebrow mb-4">{eyebrow}</div>
      <h2 className="h-section text-balance">{title}</h2>
      {body && <p className="mt-5 text-lg leading-relaxed text-white/60">{body}</p>}
    </div>
  );
}

function TechniqueLibrary() {
  const [active, setActive] = useState("All movements");
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState(false);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MOVEMENTS.filter((m) => !q || m.name.toLowerCase().includes(q)).filter((m) => {
      if (active === "All movements") return true;
      if (active === "No equipment")
        return ["Burpee Broad Jumps", "Wall Balls"].includes(m.name);
      if (active === "Standard gym")
        return ["Rowing", "Farmer's Carry", "Wall Balls", "Sandbag Lunges"].includes(m.name);
      if (active === "Race equipment")
        return ["Sled Push", "Sled Pull", "SkiErg"].includes(m.name);
      if (active === "Beginner") return m.level.includes("Beginner") || m.level.includes("All");
      return true;
    });
  }, [active, query]);

  return (
    <section id="techniques" className="relative py-24 md:py-36">
      <div className="container-x">
        <SectionHeader
          eyebrow="The HYROX Technique Library"
          title={
            <>
              Know exactly how every
              <br className="hidden md:block" /> movement should feel.
            </>
          }
          body="Watch clear demonstrations, follow step-by-step instructions, understand race standards, and correct mistakes before they become habits."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Library panel */}
          <div className="card-surface overflow-hidden p-5 md:p-7">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-[220px]">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search movements…"
                  aria-label="Search movements"
                  className="w-full rounded-xl border border-white/10 bg-black/40 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/35 focus:border-primary/60 focus:outline-none"
                />
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-xs transition",
                    active === f
                      ? "border-primary/60 bg-primary/15 text-white"
                      : "border-white/10 text-white/60 hover:border-white/20 hover:text-white",
                  )}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {filtered.map((m) => (
                <div
                  key={m.name}
                  className="hover-lift group flex items-center gap-3 rounded-2xl border border-white/8 bg-black/30 p-4"
                >
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/[0.04] text-primary-light">
                    <m.icon className="h-5 w-5" strokeWidth={1.6} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[15px] font-semibold">{m.name}</div>
                    <div className="mt-0.5 text-[11px] font-medium uppercase tracking-wide text-white/40">
                      {m.level} · {m.tag}
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-white/30 transition group-hover:text-white" />
                </div>
              ))}
              {filtered.length === 0 && (
                <div className="col-span-full rounded-xl border border-dashed border-white/10 p-8 text-center text-sm text-white/50">
                  No movements match that filter.
                </div>
              )}
            </div>
          </div>

          {/* Detail panel — Wall Balls */}
          <div className="sheet-surface overflow-hidden">
            <div className="relative aspect-[16/10] overflow-hidden border-b border-white/5 bg-black">
              <img
                src={mockupTechnique}
                alt="Wall Balls technique preview"
                className="h-full w-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <button
                aria-label="Play demonstration"
                className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-black shadow-2xl transition hover:scale-105"
              >
                <Play className="h-5 w-5 fill-black" />
              </button>
              <div className="absolute left-4 top-4 flex gap-2">
                <span className="rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-white/80 backdrop-blur">
                  Demo · 4:40
                </span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest">
                  <span className="rounded-full bg-primary/20 px-2 py-1 text-primary-light">
                    Strength
                  </span>
                  <span className="rounded-full bg-white/5 px-2 py-1 text-white/60">Wall ball</span>
                </div>
                <button
                  onClick={() => setSaved((s) => !s)}
                  aria-pressed={saved}
                  aria-label="Save technique"
                  className={cn(
                    "grid h-9 w-9 place-items-center rounded-full border transition",
                    saved
                      ? "border-primary/50 bg-primary/15 text-primary-light"
                      : "border-white/10 text-white/70 hover:text-white",
                  )}
                >
                  <Bookmark className={cn("h-4 w-4", saved && "fill-current")} />
                </button>
              </div>
              <h3 className="mt-3 text-2xl font-bold">Wall Balls</h3>
              <p className="mt-2 text-sm text-white/60">
                100 squat-to-target throws on legs already wrecked. Breathing and breaking smart wins.
              </p>

              <div className="mt-5 grid grid-cols-3 gap-2">
                <MetricPill label="Reps" value="100" tone="primary" />
                <MetricPill label="Men" value="6 / 3.0kg·m" tone="muted" />
                <MetricPill label="Women" value="4 / 2.7kg·m" tone="muted" />
              </div>

              <div className="mt-6 space-y-4">
                <DetailBlock title="Competition standard" icon={Check}>
                  Hip crease below knee at bottom; ball must strike above the target line before
                  returning. Missed target = no-rep.
                </DetailBlock>
                <DetailBlock title="Step-by-step execution" icon={ClipboardList}>
                  Ball at chest, elbows tucked, feet shoulder-width. Squat to depth, drive vertically,
                  release at eye level, receive and re-load in one motion.
                </DetailBlock>
                <DetailBlock title="Common mistakes" icon={AlertTriangle} tone="warn">
                  Cutting depth under fatigue, holding breath through the throw, and starting sets
                  too large to complete.
                </DetailBlock>
                <DetailBlock title="Coaching cues" icon={Zap}>
                  “Chest tall, elbows in.” “Drive the ball, don't push it.” “Breathe on the catch.”
                </DetailBlock>
                <DetailBlock title="Equipment alternatives" icon={Repeat}>
                  Med-ball squat throws · Dumbbell thruster to target · Bodyweight squat-to-reach.
                </DetailBlock>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricPill({
  label,
  value,
  tone = "muted",
}: {
  label: string;
  value: string;
  tone?: "primary" | "muted";
}) {
  return (
    <div
      className={cn(
        "rounded-xl border p-3",
        tone === "primary"
          ? "border-primary/40 bg-primary/10"
          : "border-white/8 bg-white/[0.02]",
      )}
    >
      <div className="text-[10px] uppercase tracking-widest text-white/45">{label}</div>
      <div
        className={cn(
          "text-mono mt-1 text-lg font-bold",
          tone === "primary" ? "text-primary-light" : "text-white",
        )}
      >
        {value}
      </div>
    </div>
  );
}

function DetailBlock({
  title,
  icon: Icon,
  children,
  tone,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  tone?: "warn";
}) {
  return (
    <div>
      <div className="flex items-center gap-2 text-[13px] font-semibold uppercase tracking-wider">
        <Icon
          className={cn(
            "h-3.5 w-3.5",
            tone === "warn" ? "text-orange" : "text-primary-light",
          )}
        />
        {title}
      </div>
      <p className="mt-1.5 text-sm leading-relaxed text-white/60">{children}</p>
    </div>
  );
}

function SubstitutionSection() {
  return (
    <section className="relative border-t border-white/10 bg-surface py-24 md:py-36">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <SectionHeader
            eyebrow="No sled? No problem."
            title={
              <>
                Build race-ready skills with the equipment you already have.
              </>
            }
          />
          <p className="max-w-md text-[15px] leading-relaxed text-white/55">
            Every substitution explains what the original station trains, how to recreate the
            stimulus, and when to use the real movement before race day.
          </p>
        </div>

        <div className="mt-12 -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-6 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-3">
          {SUBSTITUTIONS.map((s) => (
            <div
              key={s.original}
              className="hover-lift card-surface flex w-[86vw] shrink-0 snap-start flex-col justify-between p-6 md:w-auto"
            >
              <div>
                <div className="eyebrow text-white/40">Original station</div>
                <div className="mt-1 text-2xl font-bold">{s.original}</div>
                <div className="my-5 flex items-center gap-3 text-sm text-white/40">
                  <div className="divider-thin flex-1" />
                  <ArrowRight className="h-4 w-4" />
                  <div className="divider-thin flex-1" />
                </div>
                <div className="eyebrow text-white/40">Swap it for</div>
                <div className={cn("mt-1 text-xl font-semibold", s.color)}>{s.swap}</div>
              </div>
              <p className="mt-6 text-sm leading-relaxed text-white/55">
                <span className="text-white/75">Trains:</span> {s.trains}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PacingSection() {
  return (
    <section id="how" className="relative py-24 md:py-36">
      <div className="container-x">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionHeader
              eyebrow="Smarter race pacing"
              title={
                <>
                  Stop winning the first
                  <br /> kilometre and surviving the rest.
                </>
              }
              body="RoxPath helps athletes understand sustainable running pace, station intensity, transitions, and effort distribution across the complete HYROX race."
            />
            <div className="mt-8 flex items-start gap-3 rounded-2xl border border-orange/30 bg-orange/[0.06] p-4">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-orange" />
              <div>
                <div className="text-sm font-semibold text-orange">Pace warning</div>
                <p className="mt-1 text-sm text-white/70">
                  Your opening pace is <span className="text-mono text-white">18s/km</span> faster
                  than your sustainable target. Start controlled to protect your wall-ball
                  performance.
                </p>
              </div>
            </div>
            <p className="mt-6 text-xs text-white/40">
              Educational pacing guidance, not medical advice.
            </p>
          </div>

          <div className="card-surface overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 p-5">
              <div>
                <div className="eyebrow">Race simulation</div>
                <div className="mt-1 font-semibold">First-timer · 1:25 target</div>
              </div>
              <div className="rounded-full border border-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white/70">
                16 segments
              </div>
            </div>
            <div className="max-h-[520px] divide-y divide-white/5 overflow-y-auto">
              {RACE_PLAN.map((r, i) => (
                <div
                  key={r.seg + i}
                  className="grid grid-cols-[auto_1fr_auto] items-center gap-4 px-5 py-3.5"
                >
                  <div className="text-mono grid h-8 w-8 place-items-center rounded-lg bg-white/[0.04] text-[11px] text-white/50">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold">{r.seg}</div>
                    <div className="text-mono mt-0.5 text-[11px] uppercase tracking-widest text-white/40">
                      {r.target} · {r.effort}
                    </div>
                  </div>
                  <div className="text-mono text-right text-sm text-white/80">{r.split}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LoggingSection() {
  const [completed, setCompleted] = useState(false);
  return (
    <section className="relative border-y border-white/10 bg-surface py-24 md:py-36">
      <div className="container-x grid gap-16 lg:grid-cols-2 lg:items-center">
        <div className="order-2 lg:order-1">
          <PhoneMockup src={mockupLog} alt="RoxPath workout logging" tilt="left" />
        </div>
        <div className="order-1 lg:order-2">
          <SectionHeader
            eyebrow="Log the work."
            title={<>Every session becomes part of your race plan.</>}
            body="Record exercise, sets, repetitions, weight, distance, time, pace, RPE, and notes — with sensible defaults so it stays fast between sets."
          />

          <div className="mt-8 space-y-3">
            {LOG_ENTRIES.map((e) => (
              <div
                key={e.title}
                className="flex items-center justify-between rounded-2xl border border-white/8 bg-black/30 p-4"
              >
                <div className="flex items-center gap-3">
                  <div className={cn("grid h-10 w-10 place-items-center rounded-xl", e.color)}>
                    <Dumbbell className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{e.title}</div>
                    <div className="text-mono text-[11px] uppercase tracking-widest text-white/40">
                      {e.meta}
                    </div>
                  </div>
                </div>
                <Check className="h-4 w-4 text-mint" />
              </div>
            ))}
          </div>

          <button
            onClick={() => setCompleted((c) => !c)}
            className={cn(
              "mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-xs font-bold uppercase tracking-wide transition",
              completed
                ? "bg-mint/15 text-mint"
                : "bg-white text-black hover:bg-white/90",
            )}
          >
            {completed ? (
              <>
                <Check className="h-4 w-4" /> Session complete
              </>
            ) : (
              <>Complete session</>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}

function ProgressSection() {
  return (
    <section id="progress" className="relative py-24 md:py-36">
      <div className="container-x">
        <SectionHeader
          eyebrow="Progress you can see"
          title={<>Turn consistent training into measurable confidence.</>}
        />

        <div className="mt-14 grid gap-4 md:grid-cols-4">
          {[
            { k: "Streak", v: "18", u: "sessions", accent: "text-orange", icon: Flame },
            { k: "Workouts", v: "32", u: "completed", accent: "text-primary-light", icon: ClipboardList },
            { k: "Best 2km row", v: "7:42", u: "min", accent: "text-blue", icon: Waves },
            { k: "Threshold pace", v: "5:18", u: "/km", accent: "text-mint", icon: TrendingUp },
          ].map((s) => (
            <div key={s.k} className="card-surface p-5">
              <div className="flex items-center justify-between">
                <div className="text-[11px] font-semibold uppercase tracking-wide text-white/40">
                  {s.k}
                </div>
                <s.icon className={cn("h-4 w-4", s.accent)} />
              </div>
              <div className="mt-3 flex items-end gap-1.5">
                <div className={cn("text-mono text-4xl font-bold", s.accent)}>{s.v}</div>
                <div className="mb-1.5 text-xs text-white/45">{s.u}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <div className="card-surface p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="eyebrow">Running pace trend</div>
                <div className="mt-1 text-lg font-semibold">Threshold pace · last 8 weeks</div>
              </div>
              <div className="text-mono rounded-full border border-mint/30 bg-mint/10 px-3 py-1 text-xs text-mint">
                ▼ 42s/km
              </div>
            </div>
            <div className="mt-6 h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={PACE_TREND} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="paceStroke" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#a5b4fc" />
                      <stop offset="100%" stopColor="#4f46e5" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis
                    dataKey="w"
                    stroke="rgba(255,255,255,0.35)"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 11 }}
                  />
                  <YAxis
                    stroke="rgba(255,255,255,0.35)"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 11 }}
                    domain={[5, 6]}
                    tickFormatter={(v) => `${Math.floor(v)}:${String(Math.round((v % 1) * 60)).padStart(2, "0")}`}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: 12,
                      fontSize: 12,
                    }}
                    labelStyle={{ color: "rgba(255,255,255,0.6)" }}
                    formatter={(v: number) =>
                      `${Math.floor(v)}:${String(Math.round((v % 1) * 60)).padStart(2, "0")} /km`
                    }
                  />
                  <Line
                    type="monotone"
                    dataKey="pace"
                    stroke="url(#paceStroke)"
                    strokeWidth={3}
                    dot={{ fill: "#a5b4fc", r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card-surface p-6">
            <div className="eyebrow">Station performance</div>
            <div className="mt-1 text-lg font-semibold">Average split · last simulation</div>
            <div className="mt-6 h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={STATION_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis
                    dataKey="s"
                    stroke="rgba(255,255,255,0.35)"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 10 }}
                    interval={0}
                  />
                  <YAxis
                    stroke="rgba(255,255,255,0.35)"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 11 }}
                    tickFormatter={(v) => `${Math.floor(v / 60)}m`}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(255,255,255,0.04)" }}
                    contentStyle={{
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderRadius: 12,
                      fontSize: 12,
                    }}
                    formatter={(v: number) =>
                      `${Math.floor(v / 60)}:${String(v % 60).padStart(2, "0")}`
                    }
                  />
                  <Bar dataKey="t" fill="#4f46e5" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="card-surface p-6">
            <div className="eyebrow">Weekly activity</div>
            <div className="mt-4 grid grid-cols-7 gap-2">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <div key={i} className="text-center">
                  <div className="text-[10px] uppercase text-white/40">{d}</div>
                  <div
                    className={cn(
                      "mt-2 h-14 rounded-lg border",
                      [0, 2, 4, 6].includes(i)
                        ? "border-primary/40 bg-primary/25"
                        : "border-white/8 bg-white/[0.02]",
                    )}
                  />
                </div>
              ))}
            </div>
            <div className="mt-4 text-mono text-xs text-white/45">4 sessions · 3h 42m total</div>
          </div>

          <div className="card-surface p-6">
            <div className="eyebrow">Recently improved</div>
            <div className="mt-4 space-y-3">
              {[
                { n: "Wall Balls", d: "100 unbroken", c: "text-mint" },
                { n: "Sled Push", d: "+15kg load", c: "text-orange" },
                { n: "2km Row", d: "−12s", c: "text-blue" },
              ].map((m) => (
                <div key={m.n} className="flex items-center justify-between">
                  <div className="text-sm">{m.n}</div>
                  <div className={cn("text-mono text-xs", m.c)}>{m.d}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-surface flex flex-col justify-between p-6">
            <div>
              <div className="eyebrow">Wall-ball volume</div>
              <div className="text-mono mt-3 text-4xl font-bold text-primary-light">1,240</div>
              <div className="text-xs text-white/45">reps this month</div>
            </div>
            <div className="mt-6 flex h-3 items-center overflow-hidden rounded-full bg-white/5">
              <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-primary to-primary-light" />
            </div>
            <div className="mt-2 text-mono text-xs text-white/45">72% of monthly target</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="relative border-t border-white/10 bg-surface py-24 md:py-36">
      <div className="container-x">
        <SectionHeader
          eyebrow="How it works"
          title={<>Four steps from movement to measurable progress.</>}
          align="center"
        />
        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {HOW_STEPS.map((s, i) => (
            <div
              key={s.n}
              className="hover-lift card-surface relative flex flex-col gap-4 p-6"
            >
              <div className="flex items-center justify-between">
                <div className="text-mono text-3xl font-bold text-primary-light/80">{s.n}</div>
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary-light">
                  <s.icon className="h-4 w-4" />
                </div>
              </div>
              <div className="h-card">{s.title}</div>
              <p className="text-sm leading-relaxed text-white/55">{s.body}</p>
              {i < HOW_STEPS.length - 1 && (
                <div className="pointer-events-none absolute right-[-14px] top-1/2 hidden h-px w-7 -translate-y-1/2 bg-gradient-to-r from-white/30 to-transparent lg:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AthleteProfile() {
  return (
    <section className="relative py-24 md:py-36">
      <div className="container-x grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <PhoneMockup src={mockupPlan} alt="Athlete plan overview" tilt="right" />
        <div>
          <SectionHeader
            eyebrow="Your athlete profile"
            title={<>Every session, race, and record — in one place.</>}
            body="Your profile keeps your race target, division, saved techniques, and weekly training in view so every session moves the plan forward."
          />

          <div className="mt-8 card-surface p-6">
            <div className="flex items-center gap-4 border-b border-white/5 pb-5">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary to-primary-light text-lg font-bold text-white">
                HK
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate font-semibold">Hayato K.</div>
                <div className="text-[11px] font-semibold uppercase tracking-wide text-white/45">
                  Beginner · Men's Open
                </div>
              </div>
              <span className="rounded-full border border-mint/30 bg-mint/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-mint">
                Week 2 of 8
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 py-5 md:grid-cols-4">
              {[
                { k: "Race", v: "HYROX Zurich" },
                { k: "Goal", v: "Sub-1:25" },
                { k: "Division", v: "Men's Open" },
                { k: "Weekly", v: "4 sessions" },
              ].map((s) => (
                <div key={s.k}>
                  <div className="text-[10px] font-semibold uppercase tracking-wide text-white/40">
                    {s.k}
                  </div>
                  <div className="mt-1 text-sm font-semibold">{s.v}</div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/5 pt-5">
              <div className="eyebrow mb-3">Saved techniques</div>
              <div className="flex flex-wrap gap-2">
                {["Wall Balls", "SkiErg", "Sled Push", "Farmer's Carry", "Burpee BJ"].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/75"
                  >
                    <Star className="mr-1 inline h-3 w-3 text-primary-light" />
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CoachSection() {
  return (
    <section id="coaches" className="relative border-y border-white/10 bg-surface py-24 md:py-36">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <SectionHeader
            eyebrow="For coaches"
            title={<>A clearer way to teach HYROX fundamentals.</>}
            body="Use RoxPath as a shared technique reference for athletes, recommend movement substitutions, and help clients track the work completed between coaching sessions."
          />
          <a href="#waitlist" className="btn-primary shrink-0">
            Join as a coach <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {COACH_BENEFITS.map((b) => (
            <div key={b.title} className="hover-lift card-surface p-6">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-primary-light">
                <b.icon className="h-5 w-5" strokeWidth={1.6} />
              </div>
              <div className="mt-5 h-card">{b.title}</div>
              <p className="mt-2 text-sm leading-relaxed text-white/55">{b.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-xs text-white/40">Dedicated coach dashboard — coming soon.</p>
      </div>
    </section>
  );
}

function FutureFeatures() {
  return (
    <section className="relative py-24 md:py-36">
      <div className="container-x">
        <SectionHeader
          eyebrow="What's next"
          title={<>On the roadmap — not available yet.</>}
        />
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {FUTURE.map((f) => (
            <div
              key={f.title}
              className="flex items-center justify-between rounded-2xl border border-dashed border-white/10 bg-white/[0.015] p-5 text-white/70"
            >
              <div className="flex items-center gap-3">
                <f.icon className="h-4 w-4 text-white/40" strokeWidth={1.6} />
                <span className="text-sm">{f.title}</span>
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-wide text-white/35">
                Planned
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="relative border-t border-white/10 bg-surface py-24 md:py-36">
      <div className="container-x">
        <SectionHeader
          eyebrow="Early voices"
          title={<>What beta athletes are telling us.</>}
        />
        <p className="mt-3 text-xs text-white/40">
          Illustrative beta-user quotes shown until public launch.
        </p>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((t) => (
            <figure
              key={t.name}
              className="hover-lift card-surface flex h-full flex-col justify-between p-6"
            >
              <blockquote className="text-[15px] leading-relaxed text-white/85">
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 border-t border-white/5 pt-4">
                <div className="text-sm font-semibold">{t.name}</div>
                <div className="mt-0.5 text-[11px] font-semibold uppercase tracking-wide text-white/40">
                  {t.role}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section id="faq" className="relative py-24 md:py-36">
      <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeader
            eyebrow="FAQ"
            title={<>Common questions.</>}
            body="If it's not here, reach out and we'll answer directly."
          />
          <a
            href="mailto:hello@roxpath.app"
            className="mt-6 inline-flex items-center gap-2 text-sm text-primary-light hover:underline"
          >
            <Mail className="h-4 w-4" /> hello@roxpath.app
          </a>
        </div>
        <Accordion type="single" collapsible className="w-full space-y-2">
          {FAQS.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="overflow-hidden rounded-2xl border border-white/8 bg-white/[0.015] px-5"
            >
              <AccordionTrigger className="text-left text-[15px] font-semibold hover:no-underline [&[data-state=open]>svg]:rotate-180">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-white/60">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

type FormState = "idle" | "loading" | "success" | "error" | "duplicate";

function FinalCTA() {
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("Athlete");
  const [consent, setConsent] = useState(true);
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) {
      setError("Enter a valid email address.");
      setState("error");
      return;
    }
    setState("loading");
    await new Promise((r) => setTimeout(r, 900));
    // No backend configured — mock submission without persisting.
    const seen = typeof window !== "undefined" ? sessionStorage.getItem(`rp:${email}`) : null;
    if (seen) {
      setState("duplicate");
      return;
    }
    if (typeof window !== "undefined") sessionStorage.setItem(`rp:${email}`, "1");
    setState("success");
  }

  return (
    <section id="waitlist" className="paper-section relative overflow-hidden py-28 md:py-40">
      <div className="container-x relative grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center">
        <div>
          <div className="mb-4 text-[0.72rem] font-bold uppercase tracking-[0.16em] text-primary">
            Early access
          </div>
          <h2 className="h-display">
            YOUR NEXT RACE STARTS
            <br />
            <span className="text-primary">BEFORE RACE DAY.</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg text-paper-ink/60">
            Learn the movements. Train with purpose. Track what improves.
          </p>

          <div className="mt-10 hidden max-w-sm lg:block">
            <img
              src={mockupSim}
              alt="RoxPath race simulation screen"
              className="w-full rounded-2xl border border-black/10"
            />
          </div>
        </div>

        <form
          onSubmit={submit}
          className="rounded-2xl border border-black/10 bg-white p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.25)] md:p-8"
          noValidate
          aria-live="polite"
        >
          {state === "success" ? (
            <div className="flex items-center gap-4 py-6">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-mint/20 text-mint">
                <Check className="h-6 w-6" />
              </div>
              <div>
                <div className="text-lg font-bold text-paper-ink">You're on the list.</div>
                <p className="mt-1 text-sm text-paper-ink/60">
                  We'll email <span className="text-paper-ink">{email}</span> when RoxPath opens
                  for early access.
                </p>
              </div>
            </div>
          ) : state === "duplicate" ? (
            <div className="flex items-center gap-4 py-6">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <div className="text-lg font-bold text-paper-ink">You're already in.</div>
                <p className="mt-1 text-sm text-paper-ink/60">
                  <span className="text-paper-ink">{email}</span> is on the RoxPath waitlist.
                  We'll be in touch soon.
                </p>
              </div>
            </div>
          ) : (
            <>
              <label
                htmlFor="email"
                className="text-[11px] font-semibold uppercase tracking-wide text-paper-ink/45"
              >
                Email address
              </label>
              <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 rounded-full border border-black/15 bg-black/[0.02] px-5 py-3.5 text-[15px] text-paper-ink placeholder:text-paper-ink/35 focus:border-primary/60 focus:outline-none"
                  aria-invalid={state === "error"}
                  aria-describedby={error ? "email-error" : undefined}
                />
                <button
                  type="submit"
                  disabled={state === "loading"}
                  className="btn-dark shrink-0 disabled:opacity-70"
                >
                  {state === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Joining…
                    </>
                  ) : (
                    <>
                      Join the waitlist <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="mt-5">
                <div className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-paper-ink/45">
                  I am a…
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Athlete", "Coach", "Personal trainer", "Fitness enthusiast"].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setUserType(t)}
                      className={cn(
                        "rounded-full border px-3.5 py-1.5 text-xs font-medium transition",
                        userType === t
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-black/15 text-paper-ink/60 hover:border-black/30 hover:text-paper-ink",
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <label className="mt-5 flex items-start gap-3 text-xs text-paper-ink/55">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-black/25 bg-transparent"
                />
                <span>
                  Send me RoxPath launch updates and training resources. Unsubscribe anytime.
                </span>
              </label>

              {error && (
                <p id="email-error" className="mt-3 text-sm text-coral" role="alert">
                  {error}
                </p>
              )}
            </>
          )}
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-background pb-10 pt-20">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <img src={logo} alt="RoxPath" className="h-10 w-10 rounded-[10px]" />
              <span className="text-lg font-bold">RoxPath</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
              Master every station. Race with confidence. RoxPath is a mobile training companion for
              first-time and developing HYROX athletes.
            </p>
            <a href="#waitlist" className="btn-primary mt-6">
              Join the waitlist <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <FooterCol
            title="Product"
            links={[
              { label: "Techniques", href: "#techniques" },
              { label: "Features", href: "#how" },
              { label: "Progress", href: "#progress" },
              { label: "For coaches", href: "#coaches" },
            ]}
          />
          <FooterCol
            title="Company"
            links={[
              { label: "FAQ", href: "#faq" },
              { label: "Privacy", href: "#" },
              { label: "Terms", href: "#" },
              { label: "Contact", href: "mailto:hello@roxpath.app" },
            ]}
          />
          <FooterCol
            title="Social"
            links={[
              { label: "Instagram", href: "#", icon: Instagram },
              { label: "TikTok", href: "#" },
              { label: "Email", href: "mailto:hello@roxpath.app", icon: Mail },
            ]}
          />
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-8 text-xs text-white/40 md:flex-row md:items-center">
          <p className="max-w-2xl">
            RoxPath is an independent training application and is not affiliated with or endorsed by
            HYROX. HYROX is a trademark of its respective owner.
          </p>
          <p>© {new Date().getFullYear()} RoxPath. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string; icon?: React.ElementType }[];
}) {
  return (
    <div>
      <div className="mb-4 text-[11px] font-semibold uppercase tracking-wide text-white/40">
        {title}
      </div>
      <ul className="space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href} className="inline-flex items-center gap-2 text-sm text-white/75 hover:text-white">
              {l.icon && <l.icon className="h-3.5 w-3.5" />}
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
