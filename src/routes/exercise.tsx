import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/exercise")({
  component: ExerciseLayout,
});

function ExerciseLayout() {
  return <Outlet />;
}
