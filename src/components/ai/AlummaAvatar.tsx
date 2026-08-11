import logoAlumma from "@/assets/logo-alumma-ginda.png.asset.json";
import { cn } from "@/lib/utils";

/**
 * Avatar officiel de l'assistant.
 * Le logo Al'umma Ginda est la seule source visuelle — pour le remplacer,
 * il suffit de mettre à jour l'asset `logo-alumma-ginda.png`.
 */
export function AlummaAvatar({
  className,
  size = 32,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-sky/30",
        className,
      )}
      style={{ width: size, height: size }}
    >
      <img
        src={logoAlumma.url}
        alt="Al'umma Ginda"
        width={size}
        height={size}
        loading="lazy"
        className="size-full object-contain p-0.5"
      />
    </span>
  );
}
