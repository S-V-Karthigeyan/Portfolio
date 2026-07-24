import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Portfolio from "@/components/Portfolio";
import ErrorBoundary from "@/components/ErrorBoundary";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "S.V Karthigeyan — Portfolio" },
      { name: "description", content: "Portfolio of S.V Karthigeyan — projects, experience, and contact." },
      { property: "og:title", content: "S.V Karthigeyan — Portfolio" },
      { property: "og:description", content: "Portfolio of S.V Karthigeyan — projects, experience, and contact." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <ErrorBoundary>
      <Portfolio />
    </ErrorBoundary>
  );
}
