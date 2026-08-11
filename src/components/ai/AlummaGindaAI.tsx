import { useState } from "react";

import { FloatingAIButton } from "./FloatingAIButton";
import { AIChatWindow } from "./AIChatWindow";

export function AlummaGindaAI() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  return (
    <>
      {mounted && (
        <div className={open ? undefined : "hidden"}>
          <AIChatWindow onMinimize={() => setOpen(false)} onClose={() => setOpen(false)} />
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
