import { expect, describe, it, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CronDialog } from "../CronDialog";

describe("CronDialog component", () => {
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it("opens dialog when button is clicked", async () => {
    render(<CronDialog onSubmit={mockOnSubmit} />);

    const button = screen.getByRole("button", { name: /ustaw harmonogram/i });
    await userEvent.click(button);

    expect(screen.getByText("Minuta")).toBeInTheDocument();
    expect(screen.getByText("Godzina")).toBeInTheDocument();
    expect(screen.getByText("Dzień miesiąca")).toBeInTheDocument();
    expect(screen.getByText("Miesiąca roku")).toBeInTheDocument();
    expect(screen.getByText("Dzień tygodnia")).toBeInTheDocument();
  });

  it("calls onSubmit with correct default cron parameters when form is submitted", async () => {
    render(<CronDialog onSubmit={mockOnSubmit} />);

    const button = screen.getByRole("button", { name: /ustaw harmonogram/i });
    await userEvent.click(button);

    const submitButton = screen.getByRole("button", { name: /ustaw/i });
    await userEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith(["*", "*", "*", "*", "*"]);
  });

  it("displays the current cron expression and updates when selecting radio options", async () => {
    render(<CronDialog onSubmit={mockOnSubmit} />);
    const user = userEvent.setup();

    const button = screen.getByRole("button", { name: /ustaw harmonogram/i });
    await user.click(button);

    expect(screen.getByText("* * * * *")).toBeInTheDocument();

    await user.click(screen.getByText(/co minutę między/i));
    await user.click(screen.getByText(/co godzinę między/i));
    await user.click(screen.getByText(/Określony dzień miesiąca/i));

    const cronParameters = ["1-1", "1-1", "*", "1", "*"];

    expect(screen.getByText(cronParameters.join(" "))).toBeInTheDocument();

    const submitButton = screen.getByRole("button", { name: /ustaw/i });
    await user.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith(cronParameters);
  });

  it("closes the dialog when Close button is clicked", async () => {
    render(<CronDialog onSubmit={mockOnSubmit} />);

    const button = screen.getByRole("button", { name: /ustaw harmonogram/i });
    await userEvent.click(button);

    const closeButton = screen.getByRole("button", { name: /zamknij/i });
    await userEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByText("Harmonogram")).not.toBeInTheDocument();
    });
  });
});
