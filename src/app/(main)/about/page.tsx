"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Activity,
  Brain,
  ChevronLeft,
  Heart,
  Leaf,
  Sparkles,
  Target,
  Eye,
} from "lucide-react";
import AnimatedSection from "@/components/premium/AnimatedSection";
import SiteFooter from "@/components/premium/SiteFooter";
import { DesktopFooter } from "@/desktop-ui/home/DesktopHomeSections";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import styles from "./about.module.css";

const STORY_CHIPS = ["The way we think", "The way we move", "The way we nourish"] as const;

const VALUES = [
  {
    title: "Simplicity",
    text: "The best wellness routines are the ones we can sustain. We believe healthy living should feel clear, practical and achievable.",
    accent: "mint",
  },
  {
    title: "Balance",
    text: "True wellbeing comes from nurturing the mind, moving the body and fuelling it well. Every part matters, and each strengthens the other.",
    accent: "aqua",
  },
  {
    title: "Quality",
    text: "Whether it's a product, an ingredient or a piece of educational content, we create with care, intention and uncompromising standards.",
    accent: "sky",
  },
  {
    title: "Growth",
    text: "Wellness is a lifelong journey. We celebrate progress, curiosity and the small improvements that lead to meaningful change.",
    accent: "lavender",
  },
  {
    title: "Community",
    text: "Wellness is more rewarding when it's shared. We're building a community that encourages, supports and inspires one another.",
    accent: "gradient",
    featured: true,
  },
] as const;

const METHOD_PILLARS = [
  {
    icon: Brain,
    title: "Mind",
    tag: "Foundation",
    text: "Every healthy habit begins with the way we think. The choices we make, the routines we build and the mindset we nurture influence every aspect of our wellbeing. A healthy mind creates the foundation for lasting change.",
    accent: "mind",
  },
  {
    icon: Activity,
    title: "Move",
    tag: "Energy",
    text: "Movement is one of life's greatest gifts. Whether it's a strength workout, a morning walk, stretching between meetings or practising yoga, every movement contributes to feeling stronger, more energised and more connected to our bodies.",
    accent: "move",
  },
  {
    icon: Leaf,
    title: "Fuel",
    tag: "Vitality",
    text: "The food we eat is more than nourishment—it's information for our body. Choosing wholesome, functional nutrition gives us the energy to perform, recover and enjoy life with vitality.",
    accent: "fuel",
  },
] as const;

const PILLARS = [
  {
    icon: Target,
    label: "Our Mission",
    num: "04",
    text: "We exist to help people become the kind who naturally prioritise their wellbeing. Someone who moves with intention. Nourishes themself thoughtfully. Makes time for recovery. And understands that small daily choices create extraordinary lives.",
  },
  {
    icon: Eye,
    label: "Our Vision",
    num: "05",
    text: "We envision a future where wellness feels natural, enjoyable and accessible to everyone. Our ambition is to become the Middle East's most trusted holistic wellness brand, inspiring individuals and communities to embrace healthier lifestyles through an integrated approach to wellbeing.",
  },
  {
    icon: Heart,
    label: "Our Purpose",
    num: "06",
    text: "We created DEEPFIT with one purpose: to help people feel their best—not just for a season, but for life. Everything we design, develop and share is intended to make healthy living simpler, more enjoyable and easier to maintain. Because when wellness fits naturally into everyday life, consistency follows. And consistency is where lasting transformation begins.",
  },
] as const;

const FIT_TRAITS = ["Strong", "Capable", "Confident", "Energised", "Balanced"] as const;

export default function AboutPage() {
  const router = useRouter();
  const { isDesktop, isHydrated } = useBreakpoint();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button
          type="button"
          className={styles.backBtn}
          onClick={() => router.back()}
          aria-label="Go back"
        >
          <ChevronLeft size={22} />
        </button>
        <h1 className={styles.headerTitle}>About Us</h1>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroBg} aria-hidden />
        <div className={styles.heroMesh} aria-hidden />
        <div className={styles.heroGrid} aria-hidden />

        <div className={styles.heroInner}>
          <motion.div
            className={styles.heroBadge}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <span className={styles.heroBadgeDot} />
            About DeepFit
          </motion.div>

          <motion.h1
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
          >
            Wellness
            <span className={styles.heroTitleAccent}>Inside Out</span>
          </motion.h1>

          <motion.p
            className={styles.heroLead}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.16 }}
          >
            A deeper, more meaningful approach to wellbeing—built on the small
            choices we make every day.
          </motion.p>

          <motion.div
            className={styles.heroChips}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.24 }}
          >
            {STORY_CHIPS.map((chip) => (
              <span key={chip} className={styles.heroChip}>
                {chip}
              </span>
            ))}
          </motion.div>
        </div>

        <div className={styles.heroScroll} aria-hidden>
          <span />
        </div>
      </section>

      <div className={styles.content}>
        <AnimatedSection className={styles.storyBlock}>
          <div className={styles.storyAside}>
            <span className={styles.sectionNum}>01</span>
            <span className={styles.sectionLabel}>Our Story</span>
            <h2 className={styles.storyHeading}>
              Wellness is created through daily choices
            </h2>
          </div>

          <div className={styles.storyBody}>
            <p className={styles.leadPara}>
              At <strong>DEEPFIT</strong>, we believe wellness is created through
              the small choices we make every day.
            </p>
            <p>
              No single choice defines our health, but together, they shape how we
              feel, how we perform and how we experience life. That&apos;s the
              philosophy behind everything we create.
            </p>

            <figure className={styles.quoteCard}>
              <blockquote>
                DEEPFIT didn&apos;t begin with a product. It began with a question:
                <em> What if wellness could feel simpler?</em>
              </blockquote>
            </figure>

            <p>
              Our journey started in nutrition, helping people make better food
              choices. Along the way, we realised something important—nutrition is
              only one part of feeling well. Lasting wellbeing comes from the way
              we think, the way we move and the way we fuel ourselves.
            </p>
            <p>
              That realisation became the foundation for DEEPFIT. We didn&apos;t
              want to create another fitness brand. We wanted to build a wellness
              ecosystem.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection className={styles.founderBlock} delay={40}>
          <div className={styles.storyAside}>
            <span className={styles.sectionNum}>02</span>
            <span className={styles.sectionLabel}>Founder</span>
            <h2 className={styles.storyHeading}>Meet Deepa</h2>
          </div>

          <div className={styles.storyBody}>
            <p className={styles.leadPara}>
              I&apos;m <strong>Deepa</strong>, founder of <strong>DEEPFIT</strong>.
            </p>
            <p>
              Like many people, I spent years believing wellness had to be intense
              to be effective—long workouts, strict routines, and the constant
              pressure to do more.
            </p>
            <p>
              Over time, I realised that lasting health is built differently.
            </p>
            <p>
              It&apos;s created through consistent movement, nourishing food, a
              resilient mindset, and habits that fit into everyday life.
            </p>
            <p>
              That belief became DEEPFIT.
            </p>
            <p>
              Every product, every idea, and every conversation is designed around
              one purpose: to make holistic wellness simpler, more practical, and
              sustainable for real life.
            </p>
            <p>
              Because wellness shouldn&apos;t feel overwhelming. It should feel
              like something you can come back to, every single day.
            </p>
            <p>
              Welcome to DEEPFIT.
            </p>

            <figure className={styles.quoteCard}>
              <blockquote>
                <span className={styles.founderSignature}>Wellness. Inside Out.</span>
              </blockquote>
            </figure>
          </div>
        </AnimatedSection>

        <AnimatedSection className={styles.methodBand} delay={80}>
          <div className={styles.methodHead}>
            <div className={styles.methodHeadLeft}>
              <span className={styles.sectionNumDark}>03</span>
              <span className={styles.sectionLabelLight}>The DeepFit Method</span>
              <h2 className={styles.methodTitle}>
                <span className={styles.methodWordMind}>Mind</span>
                <span className={styles.methodDot} aria-hidden>·</span>
                <span className={styles.methodWordMove}>Move</span>
                <span className={styles.methodDot} aria-hidden>·</span>
                <span className={styles.methodWordFuel}>Fuel</span>
              </h2>
            </div>
            <p className={styles.methodIntro}>
              Everything we create is guided by one simple belief: wellness works
              best when it&apos;s connected. We&apos;ve called this The DEEPFIT
              Method—our integrated approach to helping people build healthier,
              more sustainable lives.
            </p>
          </div>

          <div className={styles.methodBody}>
            <div className={styles.methodDiagram} aria-hidden>
              <svg
                className={styles.diagramSvg}
                viewBox="0 0 360 320"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="lineMind" x1="180" y1="160" x2="180" y2="52">
                    <stop stopColor="#a78bfa" stopOpacity="0.8" />
                    <stop offset="1" stopColor="#a78bfa" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="lineMove" x1="180" y1="160" x2="68" y2="252">
                    <stop stopColor="#6ee7b7" stopOpacity="0.8" />
                    <stop offset="1" stopColor="#6ee7b7" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="lineFuel" x1="180" y1="160" x2="292" y2="252">
                    <stop stopColor="#6faef7" stopOpacity="0.8" />
                    <stop offset="1" stopColor="#6faef7" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <circle cx="180" cy="160" r="108" stroke="rgba(15,23,42,0.08)" strokeWidth="1" strokeDasharray="6 8" />
                <line x1="180" y1="160" x2="180" y2="68" stroke="url(#lineMind)" strokeWidth="2" strokeLinecap="round" />
                <line x1="180" y1="160" x2="76" y2="244" stroke="url(#lineMove)" strokeWidth="2" strokeLinecap="round" />
                <line x1="180" y1="160" x2="284" y2="244" stroke="url(#lineFuel)" strokeWidth="2" strokeLinecap="round" />
              </svg>

              <div className={styles.diagramCenter}>
                <span className={styles.diagramCenterGlow} />
                <span className={styles.diagramCenterText}>Better Life</span>
              </div>

              {METHOD_PILLARS.map((pillar, i) => {
                const Icon = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className={`${styles.diagramNode} ${styles[pillar.accent]}`}
                    data-position={i + 1}
                  >
                    <span className={styles.diagramNodeIcon}>
                      <Icon size={16} strokeWidth={2.2} />
                    </span>
                    <span>{pillar.title}</span>
                  </div>
                );
              })}
            </div>

            <div className={styles.methodCards}>
              {METHOD_PILLARS.map((pillar, i) => {
                const Icon = pillar.icon;
                return (
                  <article
                    key={pillar.title}
                    className={`${styles.methodCard} ${styles[pillar.accent]}`}
                  >
                    <div className={styles.methodCardGlow} aria-hidden />
                    <div className={styles.methodCardInner}>
                      <div className={styles.methodCardTop}>
                        <span className={styles.methodCardIcon}>
                          <Icon size={20} strokeWidth={2.2} />
                        </span>
                        <span className={styles.methodCardMeta}>
                          <span className={styles.methodCardNum}>
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className={styles.methodCardTag}>{pillar.tag}</span>
                        </span>
                      </div>
                      <h3>{pillar.title}</h3>
                      <p>{pillar.text}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <p className={styles.methodClosing}>
            <span className={styles.methodClosingIcon} aria-hidden>✦</span>
            Together, these three elements create a balanced approach to wellness
            that&apos;s practical, sustainable and designed for real life.
          </p>
        </AnimatedSection>

        <div className={styles.pillarStack}>
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <AnimatedSection
                key={pillar.label}
                className={`${styles.pillarRow} ${i % 2 === 1 ? styles.pillarRowReverse : ""}`}
                delay={i * 60}
              >
                <div className={styles.pillarMeta}>
                  <span className={styles.sectionNum}>{pillar.num}</span>
                  <span className={styles.pillarIconWrap}>
                    <Icon size={22} />
                  </span>
                  <span className={styles.sectionLabel}>{pillar.label}</span>
                </div>
                <p className={styles.pillarText}>{pillar.text}</p>
              </AnimatedSection>
            );
          })}
        </div>

        <AnimatedSection className={styles.valuesSection} delay={40}>
          <div className={styles.valuesHead}>
            <span className={styles.sectionNum}>07</span>
            <span className={styles.sectionLabel}>Our Values</span>
            <h2 className={styles.valuesTitle}>What guides everything we do</h2>
          </div>

          <div className={styles.valuesBento}>
            {VALUES.map((value, i) => (
              <article
                key={value.title}
                className={`${styles.valueTile} ${"featured" in value && value.featured ? styles.valueFeatured : ""} ${styles[`value${value.accent.charAt(0).toUpperCase()}${value.accent.slice(1)}`]}`}
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                <span className={styles.valueIndex}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </article>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection className={styles.brandDuo} delay={60}>
          <article className={styles.brandPanel}>
            <span className={styles.sectionNum}>08</span>
            <span className={styles.sectionLabel}>
              Why the name &ldquo;DEEPFIT&rdquo;?
            </span>
            <p className={styles.brandLead}>
              Every great brand begins with a meaningful idea. For us, that idea
              is reflected in our name.
            </p>

            <div className={styles.nameBreakdown}>
              <div className={styles.namePart}>
                <span className={styles.nameKey}>DEEP</span>
                <p>
                  Lasting wellness starts beneath the surface—built through
                  intention, knowledge and habits that strengthen us from within.
                </p>
              </div>
              <div className={styles.nameDivider} aria-hidden />
              <div className={styles.namePart}>
                <span className={styles.nameKey}>FIT</span>
                <div className={styles.traitList}>
                  {FIT_TRAITS.map((trait) => (
                    <span key={trait} className={styles.traitPill}>
                      {trait}
                    </span>
                  ))}
                </div>
                <p>
                  How we want people to feel—not by someone else&apos;s definition,
                  but by discovering their own.
                </p>
              </div>
            </div>
          </article>

          <article className={styles.promisePanel}>
            <Sparkles size={28} className={styles.promiseIcon} />
            <span className={styles.sectionLabelLight}>
              Why &ldquo;Wellness Inside Out&rdquo;?
            </span>
            <h3 className={styles.promiseTitle}>Our daily promise</h3>
            <p>
              Real wellness begins within. It starts with the choices we make, the
              food we eat, the way we move and the mindset we cultivate.
            </p>
            <p>
              When these elements work together, wellbeing naturally becomes
              visible in our energy, confidence and the way we experience life.
            </p>
            <p className={styles.promiseEmphasis}>
              It&apos;s the philosophy behind every product, every conversation,
              and every decision we make.
            </p>
          </article>
        </AnimatedSection>
      </div>

      {isHydrated && isDesktop ? <DesktopFooter /> : <SiteFooter />}
    </div>
  );
}
