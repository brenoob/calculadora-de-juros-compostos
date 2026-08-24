import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import CompoundInterestCalculator from "./compound-interest-calculator";

describe("CompoundInterestCalculator", () => {
  it("renderiza o resumo com valores calculados por padrão", () => {
    render(<CompoundInterestCalculator />);

    expect(screen.getByText("Montante final")).toBeInTheDocument();
    expect(screen.getByText("Total investido")).toBeInTheDocument();
    expect(screen.getByText("Total em juros")).toBeInTheDocument();

    const montante = screen.getByTestId("final-balance");
    expect(montante).not.toHaveTextContent("—");
  });

  it("exibe evolução anual quando o período é de anos", () => {
    render(<CompoundInterestCalculator />);

    expect(
      screen.getByRole("columnheader", { name: "Ano" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Anual" })).toBeEnabled();
  });

  it("força visão mensal e desabilita 'Anual' com menos de 12 meses", async () => {
    const user = userEvent.setup();
    render(<CompoundInterestCalculator />);

    await user.click(screen.getByRole("button", { name: "Meses" }));
    const periodo = screen.getByLabelText("Período");
    await user.clear(periodo);
    await user.type(periodo, "1");

    expect(
      screen.getByRole("columnheader", { name: "Mês" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Anual" })).toBeDisabled();
    expect(screen.getByRole("row", { name: /1 R/ })).toBeInTheDocument();
  });

  it("permite voltar para a visão anual com 24 meses", async () => {
    const user = userEvent.setup();
    render(<CompoundInterestCalculator />);

    await user.click(screen.getByRole("button", { name: "Meses" }));
    const periodo = screen.getByLabelText("Período");
    await user.clear(periodo);
    await user.type(periodo, "24");

    const anual = screen.getByRole("button", { name: "Anual" });
    expect(anual).toBeEnabled();
    await user.click(anual);

    expect(
      screen.getByRole("columnheader", { name: "Ano" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("row", { name: /^2 / })).toBeInTheDocument();
  });

  it("mostra estado vazio quando o período é zero", async () => {
    const user = userEvent.setup();
    render(<CompoundInterestCalculator />);

    const montante = screen.getByTestId("final-balance");
    await user.clear(screen.getByLabelText("Período"));
    await user.type(screen.getByLabelText("Período"), "0");

    expect(montante).toHaveTextContent("—");
    expect(
      screen.getByText(/Informe um período maior que zero/),
    ).toBeInTheDocument();
  });
});
