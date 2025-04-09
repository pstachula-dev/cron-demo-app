import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  cronScheduleSchema,
  CronScheduleSchema,
} from "../services/cronScheduleSchema";
import { useCallback } from "react";

export const useCronScheduleForm = () => {
  const form = useForm<CronScheduleSchema>({
    resolver: zodResolver(cronScheduleSchema),
    defaultValues: {
      command: "",
      name: "",
      schedule: "",
    },
  });

  const onSubmit = useCallback(
    (data: string[]) => {
      form.setValue("schedule", data.join(" "));
      form.trigger();
    },
    [form],
  );

  return { form, onSubmit };
};
