import CronScheduler from "@/components/modules/CronSchedule/CronSchedule";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cron")({
  component: () => <CronScheduler />,
});
