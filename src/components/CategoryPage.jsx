import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/**
 * Shared category landing page (e.g. "Sorting Algorithms").
 *
 * props:
 *   icon       — lucide icon component for the hero badge
 *   title      — full page title (first word stays plain, rest is gradient)
 *   subtitle   — short tagline
 *   description — supporting line (smaller)
 *   eyebrow    — small uppercase label above the title
 *   items      — Array<{ to, title, desc, Icon, badge?, badgeTone? }>
 */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.05, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const CategoryPage = ({
  icon: HeroIcon,
  title,
  subtitle,
  description,
  eyebrow,
  items = [],
}) => {
  const [first, ...rest] = title.split(" ");

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6">
      {/* HERO */}
      <section className="relative max-w-5xl mx-auto text-center pb-12">
        <div className="absolute inset-x-0 -top-6 h-72 rounded-full opacity-15 blur-3xl pointer-events-none mx-auto w-[60%]"
             style={{ background: "hsl(var(--accent))" }} />

        <motion.div
          initial="hidden" animate="visible" variants={fadeUp} custom={0}
          className="relative"
        >
          {eyebrow && <div className="header-badge mb-5 inline-flex">{eyebrow}</div>}

          <div className="flex justify-center mb-5">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center glow"
              style={{ background: "hsl(var(--accent))" }}
            >
              {HeroIcon && (
                <HeroIcon size={24} strokeWidth={2.2} className="text-[hsl(var(--bg))]" />
              )}
            </div>
          </div>

          <h1 className="display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            <span className="text-[hsl(var(--text))]">{first} </span>
            <span className="gradient-text">{rest.join(" ")}</span>
          </h1>

          {subtitle && (
            <p className="text-base sm:text-lg mt-4 text-[hsl(var(--text-2))]">{subtitle}</p>
          )}
          {description && (
            <p className="text-sm mt-2 text-[hsl(var(--text-3))] font-mono">{description}</p>
          )}
        </motion.div>
      </section>

      {/* CARDS */}
      <section className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {items.map((it, i) => {
            const ItemIcon = it.Icon;
            const tone = it.badgeTone === "secondary" ? "var(--accent-2)" : "var(--accent)";
            return (
              <motion.div
                key={it.to}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i}
              >
                <Link
                  to={it.to}
                  className="card card-hover p-5 h-full flex flex-col group"
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        background: "hsl(var(--accent) / 0.1)",
                        border: "1px solid hsl(var(--accent) / 0.25)",
                      }}
                    >
                      {ItemIcon && (
                        <ItemIcon size={20} className="text-[hsl(var(--accent))]" />
                      )}
                    </div>
                    {it.badge && (
                      <span
                        className="text-[10px] font-mono font-bold px-2 py-1 rounded-md uppercase tracking-wider"
                        style={{
                          color: `hsl(${tone})`,
                          background: `hsl(${tone} / 0.1)`,
                          border: `1px solid hsl(${tone} / 0.25)`,
                        }}
                      >
                        {it.badge}
                      </span>
                    )}
                  </div>

                  <h2 className="display text-lg font-bold text-[hsl(var(--text))] mb-2 group-hover:text-[hsl(var(--accent))] transition-colors">
                    {it.title}
                  </h2>
                  <p className="text-sm text-[hsl(var(--text-2))] leading-relaxed flex-1">
                    {it.desc}
                  </p>

                  <div className="mt-5 text-xs font-mono text-[hsl(var(--text-3))] flex items-center gap-1.5 group-hover:text-[hsl(var(--accent))] transition-colors">
                    Visualize <ArrowRight size={12} />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;
