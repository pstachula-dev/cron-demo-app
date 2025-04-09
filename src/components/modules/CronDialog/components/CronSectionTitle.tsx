import { Label } from "@/components/ui/label";
import { TimeTypes } from "../services/schema";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { FormControl, FormItem, FormMessage } from "@/components/ui/form";

export const CronSectionTitle = ({
  title,
  type,
}: {
  title: string;
  type: TimeTypes;
}) => {
  return (
    <FormItem className="flex items-center space-x-2">
      <FormControl>
        <RadioGroupItem value={type} id={title} />
      </FormControl>
      <Label htmlFor={title}>{title}</Label>
      <FormMessage />
    </FormItem>
  );
};
