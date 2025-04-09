export type OptionList = { label: string | number; value: string }[];

const createNumberOptions = (length: number): OptionList => {
  return Array.from({ length }, (_, idx) => ({
    label: idx,
    value: String(idx),
  }));
};

const dayOfWeek = ["Pn", "Wt", "Sr", "Cz", "Pt", "Sb", "Nd"];

const dayOfMonth = [
  "Styczeń",
  "Luty",
  "Marzec",
  "Kwiecień",
  "Maj",
  "Czerwiec",
  "Lipiec",
  "Sierpień",
  "Wrzesień",
  "Październik",
  "Listopad",
  "Grudzień",
];

const dayOfMonthOptions = dayOfMonth.map((day, index) => ({
  label: day,
  value: String(index + 1),
}));

const dayOfWeekOptions = dayOfWeek.map((day, index) => ({
  label: day,
  value: String(index + 1),
}));

const minutesOptions = createNumberOptions(61);

const daysOptions = createNumberOptions(32);

export { dayOfMonthOptions, dayOfWeekOptions, minutesOptions, daysOptions };
