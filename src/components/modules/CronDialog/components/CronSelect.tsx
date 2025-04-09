import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OptionList } from "../services/getFormOptions";
import { memo } from "react";
import { twMerge } from "tailwind-merge";
import { FormControl, FormItem } from "@/components/ui/form";

type CronSelectProps = {
  placeholder?: string;
  onChange: (value: string) => void;
  values: OptionList;
  disabled?: boolean;
  defaultValue?: string;
};

export const CronSelect = memo(
  ({
    placeholder = "1",
    onChange,
    values,
    disabled,
    defaultValue,
  }: CronSelectProps) => {
    return (
      <FormItem>
        <FormControl>
          <Select
            disabled={disabled}
            onValueChange={onChange}
            defaultValue={defaultValue}
          >
            <SelectTrigger
              className={twMerge(
                "h-9 w-32 rounded-md border border-gray-200 px-3 py-1 text-sm",
                disabled && " bg-gray-50",
              )}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {values.map(({ label, value }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </FormControl>
      </FormItem>
    );
  },
);
