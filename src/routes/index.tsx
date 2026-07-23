import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  Menu,
  X,
  Search,
  Star,
  Flame,
  Target,
  Activity,
  Dumbbell,
  MapPin,
  Timer,
  TrendingUp,
  ClipboardList,
  Award,
  Users,
  BookOpen,
  Sparkles,
  Instagram,
  Mail,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { PhoneMockup } from '@/components/roxpath/PhoneMockup';
import { Reveal } from '@/components/roxpath/Reveal';
import { AppStoreLink } from '@/components/roxpath/AppStoreLink';
import logo from '@/assets/logo.png';
import mockupHome from '@/assets/mockup-home.png';
import mockupLibrary from '@/assets/mockup-library.png';
import mockupTechnique from '@/assets/mockup-technique.png';
import mockupSkills from '@/assets/mockup-skills.png';
import mockupPlan from '@/assets/mockup-plan.png';
import mockupProgress from '@/assets/mockup-progress.png';
import mockupLog from '@/assets/mockup-log.png';
import mockupSim from '@/assets/mockup-simulation.png';

export const Route = createFileRoute('/')({
  component: Home,
  head: () => ({
    meta: [
      { title: 'RoxPath — HYROX Technique, Training and Progress | Download on the App Store' },
      {
        name: 'description',
        content:
          'RoxPath is now available on the App Store. Master every HYROX movement, learn smarter race pacing, log your workouts, and track your progress — download free for iOS.',
      },
    ],
  }),
});

/* ---------------- Data ---------------- */

const APP_STORE_URL = 'https://apps.apple.com/app/id6790429330';

const NAV_LINKS = [
  { label: 'Your Plan', href: '#plan' },
  { label: 'Techniques', href: '#techniques' },
  { label: 'How it works', href: '#how' },
  { label: 'Progress', href: '#progress' },
  { label: 'For coaches', href: '#coaches' },
  { label: 'FAQ', href: '#faq' },
];

const PLAN_TAGS = [
  { icon: MapPin, label: 'Any gym. Any equipment.' },
  { icon: Target, label: 'Correct form, every rep.' },
  { icon: Timer, label: 'Pacing built in.' },
];

const BENEFITS = [
  {
    icon: MapPin,
    title: 'Train anywhere',
    body: 'Learn substitutions for sleds, SkiErgs, rowers, and other specialist equipment.',
    accent: 'text-primary-light',
  },
  {
    icon: Target,
    title: 'Move correctly',
    body: 'Understand form, competition standards, coaching cues, and common mistakes.',
    accent: 'text-mint',
  },
  {
    icon: Timer,
    title: 'Pace intelligently',
    body: 'Learn how to balance running effort and station intensity.',
    accent: 'text-orange',
  },
  {
    icon: TrendingUp,
    title: 'See your progress',
    body: 'Track sessions, streaks, personal bests, weights, distances, and times.',
    accent: 'text-blue',
  },
];

const HOW_STEPS = [
  {
    n: '01',
    title: 'Choose a movement',
    body: 'Search by name or select a HYROX station.',
    icon: Search,
  },
  {
    n: '02',
    title: 'Learn the standard',
    body: 'Watch the demonstration and review execution cues.',
    icon: BookOpen,
  },
  {
    n: '03',
    title: 'Complete your training',
    body: 'Follow the technique in your gym, at home, or with race equipment.',
    icon: Dumbbell,
  },
  {
    n: '04',
    title: 'Log and improve',
    body: 'Record your performance and see progress over time.',
    icon: TrendingUp,
  },
];

const COACH_BENEFITS = [
  {
    title: 'Consistent technique guidance',
    body: 'Every athlete you coach references the same standards, cues, and mistake corrections.',
    icon: Target,
  },
  {
    title: 'Athlete-friendly exercise references',
    body: 'Send clean movement pages instead of piecing together YouTube links.',
    icon: BookOpen,
  },
  {
    title: 'Easier progress conversations',
    body: 'Review logged sessions and PBs so every check-in starts with real data.',
    icon: TrendingUp,
  },
];

const FUTURE = [
  { title: 'AI technique analysis', icon: Sparkles },
  { title: 'Coach-created workout plans', icon: ClipboardList },
  { title: 'Community challenges', icon: Users },
  { title: 'Apple Health integration', icon: Activity },
  { title: 'Garmin integration', icon: Activity },
  { title: 'Official race result tracking', icon: Award },
  { title: 'Personalized workout recommendations', icon: Sparkles },
];

const TESTIMONIALS = [
  {
    quote:
      'Walking into my first HYROX I actually knew what a legal wall ball looked like. That alone saved me minutes.',
    name: 'Priya M.',
    role: 'First-time racer • Early user',
  },
  {
    quote:
      'My gym has no sled. The substitutions gave me a real plan instead of guessing with a loaded barbell on a mat.',
    name: 'Tom R.',
    role: 'Home gym athlete • Early user',
  },
  {
    quote:
      'I stopped detonating on Run 3. The pacing section made me respect the opening kilometre.',
    name: 'Alina K.',
    role: 'Intermediate athlete • Early user',
  },
  {
    quote:
      'Logging every session in one place made progress obvious. I could see the work compound week to week.',
    name: 'Marcus D.',
    role: 'Returning athlete • Early user',
  },
];

const FAQS = [
  {
    q: 'Is RoxPath only for advanced HYROX athletes?',
    a: 'No. RoxPath is built primarily for beginners and intermediate athletes preparing for their first few races. Advanced athletes can still use it as a reference and a logging tool.',
  },
  {
    q: 'Do I need access to HYROX equipment?',
    a: 'No. Every station includes substitutions you can perform in a standard gym or at home, along with guidance on when to try the real movement before race day.',
  },
  {
    q: 'Does RoxPath provide complete workout plans?',
    a: 'RoxPath focuses on technique, pacing, logging, and progress. Structured multi-week plans are on the roadmap and are clearly labelled as a future feature.',
  },
  {
    q: 'Can I log running and strength sessions?',
    a: 'Yes. Log runs, rows, strength blocks, station work, and race simulations with sets, reps, weight, distance, time, pace, RPE, and notes.',
  },
  {
    q: 'Can coaches use RoxPath with their athletes?',
    a: 'Yes. Coaches can use it as a shared technique reference and progress tracker between sessions. A dedicated coach dashboard is on the roadmap.',
  },
  {
    q: 'Is RoxPath affiliated with HYROX?',
    a: 'RoxPath is an independent training companion and is not affiliated with or endorsed by HYROX. HYROX is a trademark of its respective owner.',
  },
  {
    q: 'Is RoxPath available now?',
    a: 'Yes. RoxPath is live on the App Store today — download it free and start training right away.',
  },
  {
    q: 'Will Android be supported?',
    a: 'RoxPath is currently iOS-only. Android support is on the roadmap — follow along for updates on when it lands.',
  },
];

/* ---------------- Page ---------------- */

function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <Navbar />
      <Hero />
      <BenefitStrip />
      <PlanSection />
      <TechniqueLibrary />
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

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'sticky top-0 z-40 w-full transition-all duration-300',
        scrolled
          ? 'border-b border-white/5 bg-background/70 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
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
          <AppStoreLink href={APP_STORE_URL} className="btn-primary hidden md:inline-flex">
            Get the App
          </AppStoreLink>
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
          'grid overflow-hidden border-t border-white/5 bg-background/95 backdrop-blur-xl transition-all duration-300 lg:hidden',
          open ? 'max-h-[420px]' : 'max-h-0'
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
          <AppStoreLink href={APP_STORE_URL} className="btn-primary mt-3 justify-center">
            Get the App
          </AppStoreLink>
        </div>
      </div>
    </motion.header>
  );
}

const HERO_STATS = [
  { icon: Flame, value: '12-day', label: 'Training streak' },
  { icon: Award, value: '7:42', label: '2km row PB' },
  { icon: Timer, value: '5:20/km', label: 'Race pace target' },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const heroContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const heroItem = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-14 md:pt-20 lg:pb-28">
      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          <motion.div
            initial="hidden"
            animate="show"
            variants={heroContainer}
            className="text-center lg:text-left"
          >
            <motion.div variants={heroItem}>
              <span className="eyebrow-pill mb-5">Available now · Built for HYROX athletes</span>
            </motion.div>
            <motion.h1 variants={heroItem} className="h-display text-balance">
              MASTER EVERY
              <br />
              <span className="text-primary-light">STATION.</span> RACE WITH
              <br />
              CONFIDENCE.
            </motion.h1>
            <motion.p
              variants={heroItem}
              className="mx-auto mt-6 max-w-xl text-[17px] leading-relaxed text-white/65 lg:mx-0"
            >
              Technique, training plans, and race pacing — all in one app.
            </motion.p>
            <motion.div
              variants={heroItem}
              className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            >
              <AppStoreLink href={APP_STORE_URL} className="btn-primary">
                Download on the App Store
              </AppStoreLink>
              <a href="#techniques" className="btn-outline">
                Explore techniques
              </a>
            </motion.div>

            <motion.div
              variants={heroItem}
              className="mt-10 flex items-center justify-center gap-6 border-t border-white/10 pt-6 lg:justify-start"
            >
              {HERO_STATS.map((s, i) => (
                <div
                  key={s.label}
                  className={cn(
                    'flex items-center gap-2.5',
                    i > 0 && 'border-l border-white/10 pl-6'
                  )}
                >
                  <s.icon className="h-4 w-4 shrink-0 text-primary-light" strokeWidth={1.75} />
                  <div className="text-left">
                    <div className="text-mono text-sm font-bold leading-none">{s.value}</div>
                    <div className="mt-1 text-[11px] font-medium uppercase tracking-wide text-white/40">
                      {s.label}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          >
            <PhoneMockup
              src={mockupHome}
              alt="RoxPath home screen"
              className="max-w-[300px] lg:max-w-[340px]"
            />
          </motion.div>
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
          <Reveal
            key={b.title}
            delay={i * 0.08}
            className={cn(
              'relative flex flex-col gap-3 py-10',
              i > 0 && 'sm:border-l sm:border-white/5',
              i === 2 && 'lg:border-l lg:border-white/5',
              i >= 2 && 'sm:border-t sm:border-white/5 lg:border-t-0',
              'px-6 lg:px-8'
            )}
          >
            <b.icon className={cn('h-6 w-6', b.accent)} strokeWidth={1.6} />
            <div className="h-card">{b.title}</div>
            <p className="text-[14.5px] leading-relaxed text-white/55">{b.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function PlanSection() {
  return (
    <section id="plan" className="relative overflow-hidden py-24 md:py-36">
      <div className="container-x">
        <SectionHeader
          eyebrow="Personalized plan"
          title={<>Matched to your equipment, level, and goals.</>}
          align="center"
        />

        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {PLAN_TAGS.map((t) => (
              <span
                key={t.label}
                className="inline-flex items-center gap-2 rounded-full border border-white/12 px-4 py-2 text-sm font-medium text-white/80"
              >
                <t.icon className="h-3.5 w-3.5 text-primary-light" strokeWidth={1.75} />
                {t.label}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="mt-16 flex flex-wrap items-end justify-center gap-6 md:gap-10">
          <Reveal delay={0.15}>
            <PhoneMockup
              src={mockupPlan}
              alt="8-week HYROX plan, adapted to your gym and level"
              className="max-w-[250px] sm:max-w-[290px]"
              tilt="left"
            />
          </Reveal>
          <Reveal delay={0.3} className="md:mb-12">
            <PhoneMockup
              src={mockupSkills}
              alt="Session detail with technique standards and cues"
              className="max-w-[250px] sm:max-w-[290px]"
              tilt="right"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  body,
  align = 'left',
}: {
  eyebrow: string;
  title: React.ReactNode;
  body?: string;
  align?: 'left' | 'center';
}) {
  return (
    <Reveal className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center')}>
      <span className="eyebrow-pill mb-4">{eyebrow}</span>
      <h2 className="h-section text-balance">{title}</h2>
      {body && <p className="mt-5 text-lg leading-relaxed opacity-60">{body}</p>}
    </Reveal>
  );
}

function TechniqueLibrary() {
  return (
    <section id="techniques" className="relative py-24 md:py-36">
      <div className="container-x">
        <SectionHeader
          eyebrow="The HYROX Technique Library"
          title={<>Learn every movement, correctly.</>}
          align="center"
        />

        <div className="mt-16 flex flex-wrap items-end justify-center gap-6 md:gap-10">
          <Reveal delay={0.1}>
            <PhoneMockup
              src={mockupLibrary}
              alt="Station library with a technique card for every HYROX movement"
              className="max-w-[230px]"
              tilt="left"
            />
          </Reveal>
          <Reveal delay={0.2} className="md:mb-10">
            <PhoneMockup
              src={mockupTechnique}
              alt="Technique detail with standards, mistakes, and gym substitutions"
              className="max-w-[230px]"
            />
          </Reveal>
          <Reveal delay={0.3}>
            <PhoneMockup
              src={mockupSkills}
              alt="Session detail with technique standards and cues"
              className="max-w-[230px]"
              tilt="right"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function PacingSection() {
  return (
    <section id="how" className="relative border-t border-white/10 py-24 md:py-36">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <SectionHeader eyebrow="Smarter race pacing" title={<>Stop sprinting kilometre one.</>} />
          <Reveal delay={0.15} className="flex justify-center lg:justify-end">
            <PhoneMockup
              src={mockupSim}
              alt="Race simulation with live pacing guidance"
              className="max-w-[260px]"
              tilt="left"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function LoggingSection() {
  return (
    <section className="paper-section relative py-24 md:py-36">
      <div className="container-x grid gap-16 lg:grid-cols-2 lg:items-center">
        <Reveal className="order-2 flex justify-center lg:order-1">
          <PhoneMockup
            src={mockupLog}
            alt="RoxPath workout logging"
            className="max-w-[280px]"
            tilt="left"
          />
        </Reveal>
        <div className="order-1 lg:order-2">
          <SectionHeader
            eyebrow="Log the work."
            title={<>Every session moves you forward.</>}
            body="Record exercise, sets, repetitions, weight, distance, time, pace, RPE, and notes — with sensible defaults so it stays fast between sets."
          />
        </div>
      </div>
    </section>
  );
}

function ProgressSection() {
  return (
    <section id="progress" className="paper-section relative py-24 md:py-36">
      <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center">
        <SectionHeader eyebrow="Progress you can see" title={<>Consistency becomes confidence.</>} />
        <Reveal delay={0.15} className="flex justify-center lg:justify-end">
          <PhoneMockup
            src={mockupProgress}
            alt="RoxPath progress dashboard"
            className="max-w-[280px]"
            tilt="right"
          />
        </Reveal>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="relative border-t border-white/10 bg-surface py-24 md:py-36">
      <div className="container-x">
        <SectionHeader eyebrow="How it works" title={<>Four simple steps.</>} align="center" />
        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {HOW_STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="hover-lift card-surface relative flex h-full flex-col gap-4 p-6">
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
            </Reveal>
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
        <Reveal>
          <PhoneMockup
            src={mockupProgress}
            alt="Athlete profile and progress overview"
            tilt="right"
          />
        </Reveal>
        <div>
          <SectionHeader eyebrow="Your athlete profile" title={<>Everything, in one place.</>} />

          <Reveal delay={0.15} className="mt-8 card-surface p-6">
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
                { k: 'Race', v: 'HYROX Zurich' },
                { k: 'Goal', v: 'Sub-1:25' },
                { k: 'Division', v: "Men's Open" },
                { k: 'Weekly', v: '4 sessions' },
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
                {['Wall Balls', 'SkiErg', 'Sled Push', "Farmer's Carry", 'Burpee BJ'].map((t) => (
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
          </Reveal>
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
            title={<>Teach HYROX fundamentals, clearly.</>}
            body="Use RoxPath as a shared technique reference for athletes, recommend movement substitutions, and help clients track the work completed between coaching sessions."
          />
          <AppStoreLink href={APP_STORE_URL} className="btn-primary shrink-0">
            Get RoxPath for your athletes
          </AppStoreLink>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {COACH_BENEFITS.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.08}>
              <div className="hover-lift card-surface h-full p-6">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-primary-light">
                  <b.icon className="h-5 w-5" strokeWidth={1.6} />
                </div>
                <div className="mt-5 h-card">{b.title}</div>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{b.body}</p>
              </div>
            </Reveal>
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
        <SectionHeader eyebrow="What's next" title={<>On the roadmap.</>} />
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {FUTURE.map((f, i) => (
            <Reveal
              key={f.title}
              delay={i * 0.05}
              className="flex items-center justify-between rounded-2xl border border-dashed border-white/10 bg-white/[0.015] p-5 text-white/70"
            >
              <div className="flex items-center gap-3">
                <f.icon className="h-4 w-4 text-white/40" strokeWidth={1.6} />
                <span className="text-sm">{f.title}</span>
              </div>
              <span className="text-[10px] font-semibold uppercase tracking-wide text-white/35">
                Planned
              </span>
            </Reveal>
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
        <SectionHeader eyebrow="Early voices" title={<>What early users are saying.</>} />
        <p className="mt-3 text-xs text-white/40">Illustrative early-user quotes.</p>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.07}>
              <figure className="hover-lift card-surface flex h-full flex-col justify-between p-6">
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
            </Reveal>
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
            <Reveal key={i} delay={Math.min(i * 0.05, 0.3)}>
              <AccordionItem
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
            </Reveal>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="download" className="paper-section relative overflow-hidden py-28 md:py-40">
      <div className="container-x relative grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-center">
        <Reveal>
          <span className="eyebrow-pill mb-4">Available now</span>
          <h2 className="h-display">
            YOUR NEXT RACE STARTS
            <br />
            <span className="text-primary">BEFORE RACE DAY.</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg text-paper-ink/60">
            Learn the movements. Train with purpose. Track what improves. RoxPath is free to
            download on the App Store.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <AppStoreLink href={APP_STORE_URL} className="btn-dark">
              Download on the App Store
            </AppStoreLink>
            <span className="text-sm text-paper-ink/45">Free · Requires iOS</span>
          </div>
        </Reveal>

        <Reveal
          delay={0.15}
          className="flex flex-wrap items-end justify-center gap-6 lg:justify-end"
        >
          <PhoneMockup src={mockupHome} alt="RoxPath app on iPhone" className="max-w-[240px]" />
          <PhoneMockup
            src={mockupProgress}
            alt="RoxPath progress tracking on iPhone"
            className="mb-8 hidden max-w-[240px] sm:block"
            tilt="right"
          />
        </Reveal>
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
            <AppStoreLink href={APP_STORE_URL} className="btn-primary mt-6">
              Download on the App Store
            </AppStoreLink>
          </div>

          <FooterCol
            title="Product"
            links={[
              { label: 'Techniques', href: '#techniques' },
              { label: 'Features', href: '#how' },
              { label: 'Progress', href: '#progress' },
              { label: 'For coaches', href: '#coaches' },
            ]}
          />
          <FooterCol
            title="Company"
            links={[
              { label: 'FAQ', href: '#faq' },
              { label: 'Privacy', href: '#' },
              { label: 'Terms', href: '#' },
              { label: 'Contact', href: 'mailto:hello@roxpath.app' },
            ]}
          />
          <FooterCol
            title="Social"
            links={[
              { label: 'Instagram', href: '#', icon: Instagram },
              { label: 'TikTok', href: '#' },
              { label: 'Email', href: 'mailto:hello@roxpath.app', icon: Mail },
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
            <a
              href={l.href}
              className="inline-flex items-center gap-2 text-sm text-white/75 hover:text-white"
            >
              {l.icon && <l.icon className="h-3.5 w-3.5" />}
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
