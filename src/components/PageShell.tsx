import type { ReactNode } from "react";
import { SiteNav } from "@/components/SiteNav";
import { SiteFooter } from "@/components/SiteFooter";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-kraft">
      <div className="texture-kraft pointer-events-none fixed inset-0 z-50" />
      <SiteNav />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  text,
  image,
  imageAlt,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="relative border-b border-black/5 bg-leaf/5">
      {image && (
        <img
          src={image}
          alt={imageAlt ?? ""}
          width={1600}
          height={900}
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
      )}
      <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
        {eyebrow && (
          <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.22em] text-leaf">
            {eyebrow}
          </span>
        )}
        <h1 className="max-w-[24ch] font-serif text-4xl leading-tight text-balance text-forest md:text-6xl">
          {title}
        </h1>
        {text && (
          <p className="mt-6 max-w-[62ch] text-pretty text-lg leading-relaxed text-moss/90">
            {text}
          </p>
        )}
      </div>
    </section>
  );
}

export function Section({
  id,
  title,
  text,
  children,
  tone = "kraft",
}: {
  id?: string;
  title?: string;
  text?: string;
  children?: ReactNode;
  tone?: "kraft" | "muted" | "forest";
}) {
  const bg =
    tone === "forest" ? "bg-forest" : tone === "muted" ? "bg-kraft/50" : "bg-transparent";
  const titleColor = tone === "forest" ? "text-kraft" : "text-forest";
  const textColor = tone === "forest" ? "text-sprout/80" : "text-moss/80";

  return (
    <section id={id} className={`${bg} py-20 md:py-24`}>
      <div className="mx-auto max-w-7xl px-6">
        {(title || text) && (
          <div className="mb-12 max-w-[62ch]">
            {title && <h2 className={`mb-4 font-serif text-3xl md:text-4xl ${titleColor}`}>{title}</h2>}
            {text && <p className={`leading-relaxed ${textColor}`}>{text}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
