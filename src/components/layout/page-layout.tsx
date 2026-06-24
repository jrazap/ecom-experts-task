import type { ReactNode } from "react";

import { Footer } from "./footer";

interface PageLayoutProps {
  children: ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
