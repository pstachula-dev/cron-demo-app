import { RadioGroup } from "@/components/ui/radio-group";
import { CronOptionSchema, TimeTypes } from "../services/schema";
import { OptionList } from "../services/getFormOptions";
import { CronSelect } from "./CronSelect";
import { isValidTypeGuard } from "../services/isValidTypeGuard";
import { CronSectionTitle } from "./CronSectionTitle";

type CronSectionProps = {
  title: string;
  betweenTitle?: string;
  everyTitle?: string;
  everySecondTitle?: string;
  selectedTitle?: string;
  values: OptionList;
  onChange: (event: CronOptionSchema) => void;
  option: CronOptionSchema;
};

export const CronSection = ({
  title,
  betweenTitle,
  everyTitle,
  selectedTitle,
  everySecondTitle,
  values,
  onChange,
  option,
}: CronSectionProps) => {
  return (
    <div>
      <RadioGroup
        onValueChange={(type: string) => {
          if (isValidTypeGuard(type)) {
            onChange({ ...option, type });
          } else {
            throw new Error(`Invalid type value: ${type}`);
          }
        }}
        defaultValue={option.type}
      >
        <h3 className="mb-4 text-base font-medium text-gray-800">{title}</h3>
        <div className="space-y-4">
          {everyTitle && (
            <CronSectionTitle title={everyTitle} type={TimeTypes.every} />
          )}

          {betweenTitle && (
            <CronSectionTitle title={betweenTitle} type={TimeTypes.between} />
          )}

          {betweenTitle && (
            <div className="mt-2 flex items-center space-x-2 ml-6">
              <CronSelect
                values={values}
                defaultValue={option.between?.from}
                disabled={option.type !== "between"}
                onChange={(value) => {
                  onChange({
                    ...option,
                    between: { ...option.between, from: value },
                  });
                }}
              />
              <span className="px-2 text-gray-500">-</span>
              <CronSelect
                values={values}
                defaultValue={option.between?.to}
                disabled={option.type !== "between"}
                onChange={(value) => {
                  onChange({
                    ...option,
                    between: { ...option.between, to: value },
                  });
                }}
              />
            </div>
          )}
        </div>

        <div>
          {everySecondTitle && (
            <CronSectionTitle
              title={everySecondTitle}
              type={TimeTypes.everyX}
            />
          )}

          {everySecondTitle && (
            <div className="mt-2 ml-6">
              <CronSelect
                values={values}
                defaultValue={option.everyX}
                disabled={option.type !== "everyX"}
                onChange={(everyX) => {
                  onChange({ ...option, everyX });
                }}
              />
            </div>
          )}
        </div>

        <div>
          {selectedTitle && (
            <CronSectionTitle title={selectedTitle} type={TimeTypes.selected} />
          )}

          {selectedTitle && (
            <div className="mt-2 ml-6">
              <CronSelect
                values={values}
                defaultValue={option.selected}
                disabled={option.type !== "selected"}
                onChange={(selected) => {
                  onChange({ ...option, selected });
                }}
              />
            </div>
          )}
        </div>
      </RadioGroup>
    </div>
  );
};
