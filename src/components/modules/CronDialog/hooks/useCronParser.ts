import { FormSchema } from "../services/schema";

const parseCronOption = (val: {
  every: string;
  between: {
    from: string;
    to: string;
  };
  everyX: string;
  selected: string;
  type: "every" | "between" | "everyX" | "selected";
}) => {
  switch (val.type) {
    case "between":
      return `${val.between.from}-${val.between.to}`;
    case "everyX":
      return `*/${val.everyX}`;
    case "selected":
      return val.selected;
    default:
      return "*";
  }
};

const parseCronString = (options: FormSchema) => {
  return [
    parseCronOption(options.minute),
    parseCronOption(options.hour),
    parseCronOption(options.day),
    parseCronOption(options.month),
    parseCronOption(options.week),
  ];
};

export const useCronParser = () => {
  return { parseCronString };
};
