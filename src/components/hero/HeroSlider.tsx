import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { heroSlides, heroContent, HERO_INTERVAL_MS } from "./heroSlides";

export function HeroSlider() {
  const { lang } = useI18n();
  const t = heroContent[lang];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % heroSlides.length),
      HERO_INTERVAL_MS,
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className="relative isolate flex h-[100svh] min-h-[560px] w-full items-center overflow-hidden bg-forest">
      {/* Slides */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, i) => (
          <div
            key={slide.id}
            aria-hidden={i !== index}
            className={cn(
              "absolute inset-0 transition-opacity duration-[1600ms] ease-in-out",
              i === index ? "opacity-100" : "opacity-0",
            )}
          >
            <img
              src={slide.src}
              alt={i === index ? slide.alt[lang] : ""}
              width={1920}
              height={1088}
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "low"}
              decoding="async"
              className={cn(
                "h-full w-full object-cover will-change-transform",
                i === index && "animate-ken-burns",
              )}
            />
          </div>
        ))}
      </div>

      {/* Overlays for legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/65 via-ink/45 to-ink/75" />
      <div className="absolute inset-0 bg-sky-deep/25 mix-blend-multiply" />

      {/* Content */}
      <div className="relative mx-auto w-full max-w-7xl px-6 py-24 sm:px-8">
        <div key={index} className="max-w-3xl">
          <span className="animate-hero-in inline-flex items-center gap-2 rounded-full border border-sky/40 bg-sky/15 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-soft backdrop-blur-sm [animation-delay:0ms]">
            <span className="flex size-1.5 rounded-full bg-sky" />
            {t.eyebrow}
          </span>
          <h1 className="animate-hero-in mt-6 font-serif text-4xl leading-[1.05] text-balance text-white drop-shadow-sm sm:text-5xl lg:text-7xl [animation-delay:120ms]">
            {t.title}
          </h1>
          <p className="animate-hero-in mt-6 max-w-[56ch] text-pretty text-base leading-relaxed text-white/85 sm:text-lg lg:text-xl [animation-delay:240ms]">
            {t.subtitle}
          </p>
          <div className="animate-hero-in mt-10 flex flex-col gap-4 sm:flex-row sm:items-center [animation-delay:360ms]">
            <Link
              to={t.primary.to}
              className="inline-flex items-center justify-center rounded-full bg-sky px-7 py-3.5 text-sm font-semibold text-sky-ink shadow-lg shadow-sky-deep/30 transition-transform duration-200 hover:scale-[1.03] hover:bg-sky-soft"
            >
              {t.primary.label}
            </Link>
            <Link
              to={t.secondary.to}
              className="inline-flex items-center justify-center rounded-full border border-white/50 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-sky hover:bg-white/20"
            >
              {t.secondary.label} →
            </Link>
          </div>
        </div>
      </div>

      {/* Indicators */}
      <div className="absolute inset-x-0 bottom-8 flex items-center justify-center gap-3">
        {heroSlides.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={t.slideLabel(i + 1)}
            aria-current={i === index}
            className={cn(
              "h-1.5 rounded-full transition-all duration-500",
              i === index ? "w-10 bg-sky" : "w-4 bg-white/45 hover:bg-white/70",
            )}
          />
        ))}
      </div>
    </section>
  );
}
