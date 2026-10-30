import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { DefaultCatchBoundary } from "@/components/DefaultCatchBoundary";
import { NotFound } from "@/components/NotFound";

export function getRouter() {
  const router = createRouter({
    routeTree,
    basepath: import.meta.env.SSR
      ? "/"
      : import.meta.env.BASE_URL.replace(/\/$/, "") || "/",
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: DefaultCatchBoundary,
    defaultNotFoundComponent: () => <NotFound />,
    scrollRestoration: true,
  });
  return router;
}
