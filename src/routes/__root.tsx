import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="container mx-auto">
        <div className="flex gap-3 my-6 text-lg">
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>
          <Link to="/cron" className="[&.active]:font-bold">
            Cron
          </Link>
        </div>
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  ),
});
