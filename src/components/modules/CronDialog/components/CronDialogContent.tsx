import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { CronSection } from "./CronSection";
import {
  dayOfMonthOptions,
  dayOfWeekOptions,
  daysOptions,
  minutesOptions,
} from "../services/getFormOptions";
import { useCronForm } from "../hooks/useCronForm";
import { useCronParser } from "../hooks/useCronParser";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { useMemo } from "react";

export const CronDialogContent = ({
  onSubmit,
  setOpen,
}: {
  onSubmit: (data: string[]) => void;
  setOpen: (open: boolean) => void;
}) => {
  const { form } = useCronForm();
  const { parseCronString } = useCronParser();
  const formValues = form.watch();

  const cronTitle = useMemo(
    () => parseCronString(formValues),
    [formValues, parseCronString],
  );

  return (
    <div className="flex items-center justify-center bg-white">
      <div className="w-full max-w-4xl rounded-lg bg-white p-6">
        <div className="mb-2">
          <div className="text-lg font-medium my-2 flex gap-2">
            {cronTitle.join(" ")}
          </div>
        </div>

        <Separator className="my-4" />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => {
              onSubmit(parseCronString(data));
              // We need to make manual close due to validation
              setOpen(false);
            })}
          >
            <div className="grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="minute"
                render={({ field }) => (
                  <CronSection
                    title="Minuta"
                    betweenTitle="Co minutę między"
                    everyTitle="Każda minuta"
                    everySecondTitle="Co */X minut"
                    selectedTitle="Określona minuta (wybierz jedną lub więcej)"
                    values={minutesOptions}
                    onChange={field.onChange}
                    option={field.value}
                  />
                )}
              />

              <FormField
                control={form.control}
                name="hour"
                render={({ field }) => (
                  <FormControl>
                    <CronSection
                      title="Godzina"
                      everyTitle="Każda godzina"
                      betweenTitle="Co godzinę między"
                      everySecondTitle="Co *X godzin"
                      selectedTitle="Określona godzina (wybierz jedną lub więcej)"
                      values={minutesOptions}
                      onChange={field.onChange}
                      option={field.value}
                    />
                  </FormControl>
                )}
              />
            </div>

            <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-3">
              <FormField
                control={form.control}
                name="day"
                render={({ field }) => (
                  <FormControl>
                    <CronSection
                      title="Dzień miesiąca"
                      everyTitle="Każdy dzień miesiąca"
                      selectedTitle="Określony miesiąc roku"
                      values={daysOptions}
                      onChange={field.onChange}
                      option={field.value}
                    />
                  </FormControl>
                )}
              />

              <FormField
                control={form.control}
                name="month"
                render={({ field }) => (
                  <FormControl>
                    <CronSection
                      title="Miesiąca roku"
                      everyTitle="
                      Każdy miesiąc roku"
                      selectedTitle="Określony dzień miesiąca"
                      values={dayOfMonthOptions}
                      onChange={field.onChange}
                      option={field.value}
                    />
                  </FormControl>
                )}
              />

              <FormField
                control={form.control}
                name="week"
                render={({ field }) => (
                  <FormControl>
                    <CronSection
                      title="Dzień tygodnia"
                      everyTitle="Każdy dzień tygodnia"
                      selectedTitle="Określony dzień tygodnia"
                      values={dayOfWeekOptions}
                      onChange={field.onChange}
                      option={field.value}
                    />
                  </FormControl>
                )}
              />
            </div>

            <Separator className="my-4" />

            <DialogFooter className="my-4 flex justify-end gap-4">
              <DialogClose asChild>
                <Button variant="secondary">Zamknij</Button>
              </DialogClose>
              <Button type="submit">Ustaw</Button>
            </DialogFooter>
          </form>
        </Form>
      </div>
    </div>
  );
};
