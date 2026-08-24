export interface SimulationInput {
  initialDeposit: number;
  monthlyContribution: number;
  annualRate: number;
  months: number;
}

export interface MonthlyPoint {
  month: number;
  invested: number;
  interest: number;
  balance: number;
}

export interface SimulationResult {
  finalBalance: number;
  totalInvested: number;
  totalInterest: number;
  series: MonthlyPoint[];
}

export function monthlyRateFromAnnual(annualRate: number): number {
  return Math.pow(1 + annualRate, 1 / 12) - 1;
}

export function simulateCompoundInterest(
  input: SimulationInput,
): SimulationResult {
  const { initialDeposit, monthlyContribution, annualRate, months } = input;

  const rate = monthlyRateFromAnnual(annualRate);
  const series: MonthlyPoint[] = [];

  let balance = initialDeposit;

  for (let month = 1; month <= months; month++) {
    const interest = balance * rate;
    balance += interest + monthlyContribution;

    series.push({
      month,
      invested: initialDeposit + monthlyContribution * month,
      interest: balance - (initialDeposit + monthlyContribution * month),
      balance,
    });
  }

  const last = series.at(-1);

  return {
    finalBalance: last?.balance ?? initialDeposit,
    totalInvested: last?.invested ?? initialDeposit,
    totalInterest: last?.interest ?? 0,
    series,
  };
}

export function aggregateByYear(
  series: MonthlyPoint[],
): { year: number; invested: number; interest: number; balance: number }[] {
  const years: ReturnType<typeof aggregateByYear> = [];

  for (let i = 11; i < series.length; i += 12) {
    const point = series[i];
    years.push({
      year: Math.floor(i / 12) + 1,
      invested: point.invested,
      interest: point.interest,
      balance: point.balance,
    });
  }

  if (series.length % 12 !== 0 && series.length > 12) {
    const point = series.at(-1);
    if (point) {
      years.push({
        year: Math.ceil(series.length / 12),
        invested: point.invested,
        interest: point.interest,
        balance: point.balance,
      });
    }
  }

  return years;
}
