import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import CronScheduler from "../CronSchedule";

describe("CronScheduler Component", () => {
  it("renders CronScheduler component correctly", () => {
    render(<CronScheduler />);

    expect(screen.getByText("Cron")).toBeDefined();
    expect(screen.getByText("Nazwa")).toBeDefined();
    expect(screen.getByText("Komenda")).toBeDefined();
    expect(screen.getByText("Zapisz")).toBeDefined();
    expect(screen.getByText("Zamknij")).toBeDefined();
    expect(screen.getByText("Ustaw harmonogram")).toBeDefined();
  });

  it("updates the schedule field when CronDialog submits form", async () => {
    render(<CronScheduler />);

    expect(screen.getByPlaceholderText("Harmonogram")).toHaveValue("");

    const button = screen.getByRole("button", { name: /ustaw harmonogram/i });
    await userEvent.click(button);

    const submitButton = screen.getByRole("button", { name: /ustaw/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByPlaceholderText("Harmonogram")).toHaveValue(
        "* * * * *",
      );
    });
  });

  it("displays validation error when invalid schedule is entered", async () => {
    render(<CronScheduler />);

    const scheduleInput = screen.getByPlaceholderText("Harmonogram");

    await userEvent.clear(scheduleInput);
    await userEvent.type(scheduleInput, "INVALID_CRON_STRING");

    const saveButton = screen.getByRole("button", { name: /zapisz/i });
    await userEvent.click(saveButton);

    await waitFor(() => {
      expect(screen.getByText("Nieprawidłowy format")).toBeInTheDocument();
      expect(screen.getAllByText("Pole nie może być puste")).toHaveLength(2);
    });
  });

  it("should make a valid cron schedule", async () => {
    render(<CronScheduler />);

    const scheduleInput = screen.getByPlaceholderText("Harmonogram");
    const nameInput = screen.getByPlaceholderText("Nazwa");
    const commandInput = screen.getByPlaceholderText("Komenda");

    await userEvent.type(nameInput, "Test Name");
    await userEvent.type(commandInput, "Test Command");
    await userEvent.type(scheduleInput, "* * * * *");

    const saveButton = screen.getByRole("button", { name: /zapisz/i });
    await userEvent.click(saveButton);

    await waitFor(() => {
      expect(
        screen.queryByText("Pole nie może być puste"),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("Nieprawidłowy format"),
      ).not.toBeInTheDocument();
    });
  });
});
