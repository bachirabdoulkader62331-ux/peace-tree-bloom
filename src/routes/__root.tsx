import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-7xl text-forest">404</h1>
        <h2 className="mt-4 text-xl font-medium text-forest">Cette page s'est envolée avec le vent.</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          La page recherchée n'existe pas ou a été déplacée.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-forest px-5 py-2.5 text-sm font-medium text-kraft transition-colors hover:bg-moss"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-serif text-2xl text-forest">Une branche a cassé.</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Une erreur s'est produite. Essayez de rafraîchir la page.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-forest px-5 py-2.5 text-sm font-medium text-kraft transition-colors hover:bg-moss"
          >
            Réessayer
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-input bg-background px-5 py-2.5 text-sm font-medium text-forest transition-colors hover:bg-accent/40"
          >
            Accueil
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "L'Arbre de la Paix — Faites grandir la paix au Niger" },
      {
        name: "description",
        content:
          "Une plateforme citoyenne nigérienne où chaque engagement pour la paix, le civisme et la solidarité fait grandir un arbre commun en temps réel.",
      },
      { name: "author", content: "Association des Innovateurs pour la Paix" },
      { property: "og:title", content: "L'Arbre de la Paix — Faites grandir la paix au Niger" },
      {
        property: "og:description",
        content:
          "Une plateforme citoyenne nigérienne où chaque engagement pour la paix, le civisme et la solidarité fait grandir un arbre commun en temps réel.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "fr_FR" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "L'Arbre de la Paix — Faites grandir la paix au Niger" },
      {
        name: "twitter:description",
        content: "Une plateforme citoyenne nigérienne où chaque engagement pour la paix, le civisme et la solidarité fait grandir un arbre commun en temps réel.",
      },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/86abd42c-675e-4856-b407-b001464e3bc4/id-preview-398ed280--b42ae7cb-e744-4792-8b3d-5caf241390ca.lovable.app-1784045665470.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/86abd42c-675e-4856-b407-b001464e3bc4/id-preview-398ed280--b42ae7cb-e744-4792-8b3d-5caf241390ca.lovable.app-1784045665470.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Fira+Sans:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
