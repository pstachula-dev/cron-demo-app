import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { CronDialogContent } from "./components/CronDialogContent";
import { useState } from "react";

export const CronDialog = ({
  onSubmit,
}: {
  onSubmit: (data: string[]) => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Ustaw harmonogram</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[1300px]">
        <DialogTitle>Harmonogram</DialogTitle>
        <DialogDescription></DialogDescription>
        <CronDialogContent setOpen={setOpen} onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};
