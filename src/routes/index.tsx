import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import {
  Menu,
  X,
  Target,
  Dumbbell,
  MapPin,
  Timer,
  TrendingUp,
  ClipboardList,
  BookOpen,
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
import mockupTechnique2 from '@/assets/mockup-technique-2.png';
import mockupSkills from '@/assets/mockup-skills.png';
import mockupPlan from '@/assets/mockup-plan.png';
import mockupProgress from '@/assets/mockup-progress.png';
import mockupLog from '@/assets/mockup-log.png';
import mockupSim from '@/assets/mockup-simulation.png';
import heroPhoto from '@/assets/hyrox.jpg';

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
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'FAQ', href: '#faq' },
];

const PLAN_TAGS = [
  { icon: MapPin, label: 'Any gym. Any equipment.' },
  { icon: TrendingUp, label: 'Beginner to advanced.' },
  { icon: ClipboardList, label: 'Step-by-step weekly plans.' },
  { icon: Timer, label: 'Pacing built in.' },
];

const BENEFITS = [
  {
    icon: ClipboardList,
    title: 'Personalized plan',
    body: 'A week-by-week plan built around your gym, equipment, and level.',
    accent: 'text-orange',
  },
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
    icon: TrendingUp,
    title: 'See your progress',
    body: 'Track sessions, streaks, personal bests, weights, distances, and times.',
    accent: 'text-blue',
  },
];

const HOW_STEPS = [
  {
    n: '01',
    title: 'Plan weeks',
    body: 'Get a personalized week-by-week plan built around your gym and level.',
    icon: ClipboardList,
  },
  {
    n: '02',
    title: 'Learn technique',
    body: 'Watch the demonstration and review technique standards and cues.',
    icon: BookOpen,
  },
  {
    n: '03',
    title: 'Complete sessions',
    body: 'Follow your training in the gym, at home, or with race equipment.',
    icon: Dumbbell,
  },
  {
    n: '04',
    title: 'Log progress',
    body: 'Record your performance and watch your progress add up.',
    icon: TrendingUp,
  },
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
    <main className="relative min-h-screen bg-background text-foreground">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <BenefitStrip />
      <PlanSection />
      <TechniqueLibrary />
      <PacingSection />
      <LoggingSection />
      <ProgressSection />
      <HowItWorks />
      <Testimonials />
      <FAQSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}

/* ---------------- Sections ---------------- */

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-gradient-to-r from-primary via-primary-light to-purple"
    />
  );
}

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
        'sticky top-0 z-40 w-full border-b backdrop-blur-xl transition-all duration-300',
        scrolled ? 'border-white/5 bg-background/70' : 'border-white/5 bg-background/25'
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
              className="group relative text-xs font-semibold uppercase tracking-wider text-white/65 transition hover:text-white"
            >
              {l.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-primary-light to-transparent transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <AppStoreLink href={APP_STORE_URL} className="hidden h-9 md:inline-block" radius={6} />
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
          <AppStoreLink href={APP_STORE_URL} className="mx-auto mt-3 h-11" radius={6} />
        </div>
      </div>
    </motion.header>
  );
}

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
    <section id="top" className="relative z-0 overflow-hidden pb-16 pt-14 md:pt-20 lg:pb-28">
      <div className="absolute inset-0 -z-10">
        <img
          src={heroPhoto}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
        <div className="glow-blob -left-24 top-16 h-[420px] w-[420px] bg-primary/25" />
        <div
          className="glow-blob -right-20 bottom-0 h-[380px] w-[380px] bg-purple/15"
          style={{ animationDelay: '-6s' }}
        />
        <div className="bg-grid-faint absolute inset-0" />
      </div>
      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          <motion.div
            initial="hidden"
            animate="show"
            variants={heroContainer}
            className="text-center lg:text-left"
          >
            <motion.h1
              variants={heroItem}
              className="h-display text-balance"
              style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', lineHeight: 1.15 }}
            >
              PERSONALIZED
              <br />
              <span className="whitespace-nowrap">PLANS &amp; TECHNIQUES</span>
              <br />
              FOR <span className="text-gradient-primary">EVERY LEVEL.</span>
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
              <AppStoreLink href={APP_STORE_URL} className="h-14" />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
            className="relative z-0 mx-auto w-full max-w-[280px] -translate-x-3 sm:max-w-[360px] sm:translate-x-0 lg:max-w-[420px]"
          >
            <div className="animate-float-slow">
              <PhoneMockup
                src={mockupLibrary}
                alt="Station library with a technique card for every HYROX movement"
                className="absolute -right-8 top-4 max-w-[150px] -z-10 opacity-90 sm:-right-16 sm:top-6 sm:max-w-[190px] md:-right-24 md:top-8 md:max-w-[220px] lg:-right-36 lg:max-w-[240px]"
                tilt="right"
              />
            </div>
            <div className="animate-float">
              <PhoneMockup
                src={mockupHome}
                alt="RoxPath home screen"
                className="relative max-w-[220px] sm:max-w-[260px] md:max-w-[300px] lg:max-w-[340px]"
                glow
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function BenefitStrip() {
  return (
    <section id="features" className="border-y border-white/10 bg-surface">
      <div className="container-x grid gap-px overflow-hidden rounded-none py-0 sm:grid-cols-2 lg:grid-cols-4">
        {BENEFITS.map((b, i) => (
          <Reveal
            key={b.title}
            delay={i * 0.08}
            className={cn(
              'group relative flex flex-col gap-3 py-10 transition-colors duration-300 hover:bg-white/[0.03]',
              i > 0 && 'sm:border-l sm:border-white/5',
              i === 2 && 'lg:border-l lg:border-white/5',
              i >= 2 && 'sm:border-t sm:border-white/5 lg:border-t-0',
              'px-6 lg:px-8'
            )}
          >
            <span className="pointer-events-none absolute inset-x-6 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-primary-light/60 to-transparent transition-transform duration-500 group-hover:scale-x-100 lg:inset-x-8" />
            <b.icon
              className={cn('h-6 w-6 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110', b.accent)}
              strokeWidth={1.6}
            />
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
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="glow-blob left-1/2 top-24 h-[460px] w-[620px] -translate-x-1/2 bg-primary/12" />
        <div className="bg-grid-faint absolute inset-0" />
      </div>
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
                className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.02] px-4 py-2 text-sm font-medium text-white/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-light/50 hover:bg-primary/10 hover:text-white hover:shadow-[0_8px_24px_-8px_rgba(79,70,229,0.5)]"
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
    <section id="techniques" className="paper-section relative overflow-hidden py-24 md:py-36">
      <div className="bg-dots-ink pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="container-x relative">
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
              src={mockupTechnique2}
              alt="Technique detail with equipment, setup, and coaching tips"
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
    <section id="pacing" className="paper-section relative py-24 md:py-36">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <SectionHeader
            eyebrow="Smarter race pacing"
            title={<>Stop sprinting kilometre one.</>}
            body="Know your target pace for every run and every station before the race starts, so you finish strong instead of fading in the back half."
          />
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
      <div className="container-x grid gap-16 lg:grid-cols-2 lg:items-start">
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
    <section id="progress" className="relative border-t border-white/10 bg-surface py-24 md:py-36">
      <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-start">
        <SectionHeader
          eyebrow="Progress you can see"
          title={<>Consistency becomes confidence.</>}
        />
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
    <section
      id="how-it-works"
      className="relative overflow-hidden border-t border-white/10 bg-surface py-24 md:py-36"
    >
      <div className="glow-blob left-1/2 top-0 -z-0 h-[380px] w-[560px] -translate-x-1/2 bg-primary/10" />
      <div className="container-x relative">
        <SectionHeader eyebrow="How it works" title={<>Four simple steps.</>} align="center" />
        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {HOW_STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.08}>
              <div className="hover-lift card-surface group relative flex h-full flex-col gap-4 p-6">
                <div className="flex items-center justify-between">
                  <div className="text-mono text-gradient-primary text-3xl font-bold">{s.n}</div>
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary-light transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/25 group-hover:shadow-[0_0_20px_rgba(79,70,229,0.4)]">
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
    <section id="faq" className="relative overflow-hidden py-24 md:py-36">
      <div className="glow-blob -right-32 top-1/3 h-[400px] w-[400px] bg-purple/10" />
      <div className="container-x relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHeader
            eyebrow="FAQ"
            title={<>Common questions.</>}
            body="If it's not here, reach out and we'll answer directly."
          />
          <a
            href="mailto:contact@demind-inc.com"
            className="mt-6 inline-flex items-center gap-2 text-sm text-primary-light hover:underline"
          >
            <Mail className="h-4 w-4" /> contact@demind-inc.com
          </a>
        </div>
        <Accordion type="single" collapsible className="w-full space-y-2">
          {FAQS.map((f, i) => (
            <Reveal key={i} delay={Math.min(i * 0.05, 0.3)}>
              <AccordionItem
                value={`item-${i}`}
                className="overflow-hidden rounded-2xl border border-white/8 bg-white/[0.015] px-5 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.03] data-[state=open]:border-primary/40 data-[state=open]:bg-primary/[0.06] data-[state=open]:shadow-[0_0_30px_-10px_rgba(79,70,229,0.35)]"
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
      <div className="bg-dots-ink pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="container-x relative grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-start">
        <Reveal>
          <h2 className="h-display">
            YOUR NEXT RACE STARTS
            <br />
            <span className="text-gradient-ink">BEFORE RACE DAY.</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg text-paper-ink/60">
            Learn the movements. Train with purpose. Track what improves. RoxPath is free to
            download on the App Store.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <AppStoreLink href={APP_STORE_URL} className="h-14" />
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
            <AppStoreLink href={APP_STORE_URL} className="mt-6 h-12" />
          </div>

          <FooterCol
            title="Product"
            links={[
              { label: 'Features', href: '#features' },
              { label: 'Techniques', href: '#techniques' },
              { label: 'How it works', href: '#how-it-works' },
              { label: 'Progress', href: '#progress' },
            ]}
          />
          <FooterCol
            title="Company"
            links={[
              { label: 'FAQ', href: '#faq' },
              { label: 'Privacy', href: 'https://app.notion.com/p/demind-inc/RoxPath-Privacy-Policy-3a47c97113e680ba9b3fce86e4567a01?source=copy_link' },
              { label: 'Terms', href: '#' },
              { label: 'Contact', href: 'mailto:contact@demind-inc.com' },
            ]}
          />
          <FooterCol
            title="Social"
            links={[
              { label: 'Instagram', href: '#', icon: Instagram },
              { label: 'TikTok', href: '#' },
              { label: 'Email', href: 'mailto:contact@demind-inc.com', icon: Mail },
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
