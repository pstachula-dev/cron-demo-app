import { z } from "zod";

export enum TimeTypes {
  every = "every",
  everyX = "everyX",
  between = "between",
  selected = "selected",
}

export const cronOptionSchema = z.object({
  between: z
    .object({
      from: z.string(),
      to: z.string(),
    })
    .refine(
      (data) => {
        const fromValue = parseInt(data.from, 10);
        const toValue = parseInt(data.to, 10);
        return !isNaN(fromValue) && !isNaN(toValue) && fromValue <= toValue;
      },
      {
        message: "Wartość początkowa nie może być większa od wartości końcowej",
        path: ["from"], // Dodaje błąd do pola 'from'
      },
    ),
  every: z.string(),
  everyX: z.string(),
  selected: z.string(),
  type: z.nativeEnum(TimeTypes),
});

export type CronOptionSchema = z.infer<typeof cronOptionSchema>;

export const formSchema = z.object({
  minute: cronOptionSchema,
  hour: cronOptionSchema,
  day: cronOptionSchema,
  month: cronOptionSchema,
  week: cronOptionSchema,
});

export type FormSchema = z.infer<typeof formSchema>;
