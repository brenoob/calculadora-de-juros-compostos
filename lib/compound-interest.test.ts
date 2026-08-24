import { describe, expect, it } from "vitest";

import {
  aggregateByYear,
  monthlyRateFromAnnual,
  simulateCompoundInterest,
} from "./compound-interest";

describe("monthlyRateFromAnnual", () => {
  it("converte taxa anual em taxa mensal equivalente", () => {
    const monthly = monthlyRateFromAnnual(0.1);
    const backToAnnual = Math.pow(1 + monthly, 12) - 1;
    expect(backToAnnual).toBeCloseTo(0.1, 10);
  });

  it("retorna 0 quando a taxa anual é 0", () => {
    expect(monthlyRateFromAnnual(0)).toBe(0);
  });
});

describe("simulateCompoundInterest", () => {
  it("calcula o cenário conhecido de 12 meses", () => {
    const result = simulateCompoundInterest({
      initialDeposit: 1000,
      monthlyContribution: 200,
      annualRate: 0.1,
      months: 12,
    });

    expect(result.finalBalance).toBeCloseTo(3608.11, 1);
    expect(result.totalInvested).toBeCloseTo(3400, 10);
    expect(result.totalInterest).toBeCloseTo(208.11, 1);
    expect(result.series).toHaveLength(12);
  });

  it("retorna série vazia e saldo inicial quando o período é 0", () => {
    const result = simulateCompoundInterest({
      initialDeposit: 500,
      monthlyContribution: 100,
      annualRate: 0.1,
      months: 0,
    });

    expect(result.finalBalance).toBeCloseTo(500, 10);
    expect(result.totalInvested).toBeCloseTo(500, 10);
    expect(result.totalInterest).toBeCloseTo(0, 10);
    expect(result.series).toHaveLength(0);
  });

  it("mantém o saldo constante com taxa 0 e sem aportes", () => {
    const result = simulateCompoundInterest({
      initialDeposit: 1000,
      monthlyContribution: 0,
      annualRate: 0,
      months: 24,
    });

    for (const point of result.series) {
      expect(point.balance).toBeCloseTo(1000, 10);
      expect(point.invested).toBeCloseTo(1000, 10);
      expect(point.interest).toBeCloseTo(0, 10);
    }
  });

  it("acumula juros sobre juros ao longo dos meses", () => {
    const result = simulateCompoundInterest({
      initialDeposit: 1000,
      monthlyContribution: 0,
      annualRate: 0.12,
      months: 2,
    });

    const [first, second] = result.series;

    expect(first.balance).toBeCloseTo(
      1000 * Math.pow(1 + monthlyRateFromAnnual(0.12), 1),
      10,
    );
    expect(second.balance).toBeCloseTo(
      first.balance * (1 + monthlyRateFromAnnual(0.12)),
      10,
    );
    expect(second.interest).toBeGreaterThan(first.interest);
  });
});

describe("aggregateByYear", () => {
  it("agrega períodos completos de 12 em 12 meses", () => {
    const { series } = simulateCompoundInterest({
      initialDeposit: 1000,
      monthlyContribution: 200,
      annualRate: 0.1,
      months: 24,
    });

    const years = aggregateByYear(series);

    expect(years).toHaveLength(2);
    expect(years[0].year).toBe(1);
    expect(years[1].year).toBe(2);
    expect(years[1].balance).toBeCloseTo(
      simulateCompoundInterest({
        initialDeposit: 1000,
        monthlyContribution: 200,
        annualRate: 0.1,
        months: 24,
      }).finalBalance,
      6,
    );
  });

  it("inclui ano parcial no final do período", () => {
    const simulation = simulateCompoundInterest({
      initialDeposit: 1000,
      monthlyContribution: 200,
      annualRate: 0.1,
      months: 18,
    });

    const years = aggregateByYear(simulation.series);

    expect(years).toHaveLength(2);
    expect(years[1].year).toBe(2);
    expect(years[1].balance).toBeCloseTo(simulation.finalBalance, 6);
  });

  it("retorna vazio para períodos menores que 12 meses", () => {
    const { series } = simulateCompoundInterest({
      initialDeposit: 1000,
      monthlyContribution: 200,
      annualRate: 0.1,
      months: 11,
    });

    expect(aggregateByYear(series)).toHaveLength(0);
  });
});
