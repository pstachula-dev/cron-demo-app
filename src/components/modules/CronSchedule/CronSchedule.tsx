import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Plus, X } from "lucide-react";
import { useCronScheduleForm } from "./hooks/useCronScheduleForm";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CronDialog } from "../CronDialog/CronDialog";

export default function CronScheduler() {
  const { form, onSubmit } = useCronScheduleForm();

  return (
    <div className="bg-white p-6">
      <div className="flex items-center gap-2">
        <h1 className="text-3xl font-bold text-gray-900">Cron</h1>
      </div>

      <div className="mt-6 rounded-xl border border-gray-200 bg-white">
        <Form {...form}>
          <form
            data-testid="cron-form"
            onSubmit={form.handleSubmit((data) => {
              // TODO: change console.log with business logic
              console.log("Main form onSubmit:", data);
            })}
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Harmonogram
                  </h2>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="gap-2 rounded-lg">
                    <X size={18} />
                    <span>Zamknij</span>
                  </Button>
                  <Button className="gap-2 rounded-lg bg-blue-500 hover:bg-blue-600">
                    <Plus size={18} />
                    <span>Zapisz</span>
                  </Button>
                </div>
              </div>
            </div>

            <Separator />

            <div className="p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nazwa</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Nazwa"
                              className="mt-1 block w-full rounded-md border border-gray-20"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="col-span-6">
                    <FormField
                      control={form.control}
                      name="command"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Komenda</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Komenda"
                              className="mt-1 block w-full rounded-md border border-gray-200"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="col-span-12">
                    <FormField
                      control={form.control}
                      name="schedule"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Harmonogram</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Harmonogram"
                              className="mt-1 block w-full rounded-md border border-gray-200"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Form>

        <Separator />

        <div className="col-span-12">
          <div className="p-6">
            <CronDialog onSubmit={onSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}
