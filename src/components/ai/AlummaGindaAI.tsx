import { Suspense, lazy, useState } from "react";

import { FloatingAIButton } from "./FloatingAIButton";

// Chargement différé : aucun coût de bundle avant la première ouverture.
const AIChatWindow = lazy(() =>
  import("./AIChatWindow").then((m) => ({ default: m.AIChatWindow })),
);

export function AlummaGindaAI() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  return (
    <>
      {mounted && (
        <div className={open ? undefined : "hidden"}>
          <Suspense fallback={null}>
            <AIChatWindow onMinimize={() => setOpen(false)} onClose={() => setOpen(false)} />
          </Suspense>
        </div>
      )}
      {!open && (
        <FloatingAIButton
          open={open}
          onClick={() => {
            setMounted(true);
            setOpen(true);
          }}
        />
      )}
    </>
  );
}
