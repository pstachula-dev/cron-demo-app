import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => {
    return (
      <div>
        <h1>Home route!</h1>
        <Outlet />
      </div>
    );
  },
});
