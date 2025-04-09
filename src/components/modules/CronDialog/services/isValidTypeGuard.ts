import { CronOptionSchema, TimeTypes } from "./schema";

export const isValidTypeGuard = (
  value: string,
): value is CronOptionSchema["type"] => {
  return Object.values(TimeTypes).includes(value as TimeTypes);
};
