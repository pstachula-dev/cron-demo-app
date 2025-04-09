import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  formSchema,
  TimeTypes,
  FormSchema,
  CronOptionSchema,
} from "../services/schema";

const defaultTimes = (): CronOptionSchema => ({
  type: TimeTypes.every,
  selected: "1",
  every: "1",
  everyX: "1",
  between: {
    from: "1",
    to: "1",
  },
});

export const useCronForm = () => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      minute: defaultTimes(),
      hour: defaultTimes(),
      day: defaultTimes(),
      month: defaultTimes(),
      week: defaultTimes(),
    },
  });

  return { form };
};
