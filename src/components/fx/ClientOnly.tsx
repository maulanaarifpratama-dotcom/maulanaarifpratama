import { useEffect, useState, type ReactNode } from "react";

export function ClientOnly({ children }: { children: ReactNode }) {
  const [m, setM] = useState(false);
  useEffect(() => setM(true), []);
  if (!m) return null;
  return <>{children}</>;
}
