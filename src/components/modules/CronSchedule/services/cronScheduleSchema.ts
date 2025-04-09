import { z } from "zod";

export const cronScheduleSchema = z.object({
  name: z.string().nonempty({ message: "Pole nie może być puste" }),
  command: z.string().nonempty({ message: "Pole nie może być puste" }),
  schedule: z
    .string()
    .regex(/^\s*((\*\/\d+|\d+-\d+|\*|\d+)\s+){4}(\*\/\d+|\d+-\d+|\*|\d+)\s*$/, {
      message: "Nieprawidłowy format",
    })
    .nonempty({ message: "Pole nie może być puste" }),
});

export type CronScheduleSchema = z.infer<typeof cronScheduleSchema>;
