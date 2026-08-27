import { Outlet, createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/blog")({
  component: BlogLayout,
});

function BlogLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Outlet />
      <Footer />
    </div>
  );
}
