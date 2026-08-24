"use client";

import { useMemo, useState } from "react";
import {
  aggregateByYear,
  simulateCompoundInterest,
} from "@/lib/compound-interest";

const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

type PeriodUnit = "years" | "months";

interface FieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  prefix?: string;
  suffix?: string;
  step?: string;
  min?: string;
  hint?: string;
}

function Field({
  id,
  label,
  value,
  onChange,
  prefix,
  suffix,
  step,
  min,
  hint,
}: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      <div className="flex items-center rounded-xl border border-white/10 bg-white/5 focus-within:border-emerald-400/60 focus-within:ring-2 focus-within:ring-emerald-400/20">
        {prefix ? (
          <span className="pl-3 text-sm text-slate-400">{prefix}</span>
        ) : null}
        <input
          id={id}
          type="number"
          inputMode="decimal"
          value={value}
          min={min}
          step={step}
          onChange={(e) => onChange(e.target.value)}
          className="w-full [appearance:textfield] bg-transparent px-3 py-3 outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        {suffix ? (
          <span className="pr-3 text-sm text-slate-400">{suffix}</span>
        ) : null}
      </div>
      {hint ? <p className="mt-1.5 text-xs text-slate-500">{hint}</p> : null}
    </div>
  );
}

function ResultCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <p className="text-xs tracking-wide text-slate-400 uppercase">{label}</p>
      <p className={`mt-1 text-xl font-semibold tabular-nums ${accent}`}>
        {value}
      </p>
    </div>
  );
}

function parseNumber(raw: string): number {
  const parsed = Number(raw.replace(",", "."));
  if (!Number.isFinite(parsed)) return 0;
  return Math.max(parsed, 0);
}

export default function CompoundInterestCalculator() {
  const [initialDeposit, setInitialDeposit] = useState("1000");
  const [monthlyContribution, setMonthlyContribution] = useState("200");
  const [annualRate, setAnnualRate] = useState("10");
  const [period, setPeriod] = useState("10");
  const [unit, setUnit] = useState<PeriodUnit>("years");
  const [viewPreference, setViewPreference] = useState<"yearly" | "monthly">(
    "yearly",
  );

  const totalMonths = useMemo(() => {
    return unit === "years"
      ? Math.round(parseNumber(period) * 12)
      : Math.round(parseNumber(period));
  }, [period, unit]);

  const yearlyAvailable = totalMonths >= 12;

  const result = useMemo(() => {
    if (totalMonths <= 0) return null;

    return simulateCompoundInterest({
      initialDeposit: parseNumber(initialDeposit),
      monthlyContribution: parseNumber(monthlyContribution),
      annualRate: parseNumber(annualRate) / 100,
      months: totalMonths,
    });
  }, [initialDeposit, monthlyContribution, annualRate, totalMonths]);

  const view = yearlyAvailable ? viewPreference : "monthly";

  const chartData = useMemo(() => {
    if (!result) return [];
    if (view === "yearly") {
      return aggregateByYear(result.series).map((p) => ({
        label: p.year,
        invested: p.invested,
        interest: p.interest,
        balance: p.balance,
      }));
    }
    return result.series.map((p) => ({
      label: p.month,
      invested: p.invested,
      interest: p.interest,
      balance: p.balance,
    }));
  }, [result, view]);

  const chartMax = useMemo(
    () => chartData.reduce((max, point) => Math.max(max, point.balance), 0),
    [chartData],
  );

  const interestShare =
    result && result.finalBalance > 0
      ? (result.totalInterest / result.finalBalance) * 100
      : 0;

  return (
    <section className="grid gap-6 lg:grid-cols-[380px_1fr]">
      <form
        className="h-fit rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur"
        onSubmit={(e) => e.preventDefault()}
      >
        <h2 className="mb-5 text-lg font-semibold">Simulação</h2>
        <div className="space-y-5">
          <Field
            id="initial-deposit"
            label="Depósito inicial"
            prefix="R$"
            value={initialDeposit}
            onChange={setInitialDeposit}
            step="0.01"
            min="0"
          />
          <Field
            id="monthly-contribution"
            label="Aporte mensal"
            prefix="R$"
            value={monthlyContribution}
            onChange={setMonthlyContribution}
            step="0.01"
            min="0"
          />
          <Field
            id="annual-rate"
            label="Taxa de juros"
            suffix="% a.a."
            value={annualRate}
            onChange={setAnnualRate}
            step="0.01"
            min="0"
            hint="Juros compostos com capitalização mensal."
          />

          <div>
            <Field
              id="period"
              label="Período"
              suffix={unit === "years" ? "anos" : "meses"}
              value={period}
              onChange={setPeriod}
              step="1"
              min="0"
            />
            <div className="mt-2 grid grid-cols-2 gap-1 rounded-xl border border-white/10 bg-white/5 p-1">
              {(["years", "months"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setUnit(option)}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                    unit === option
                      ? "bg-emerald-500 text-slate-950"
                      : "text-slate-300 hover:bg-white/5"
                  }`}
                >
                  {option === "years" ? "Anos" : "Meses"}
                </button>
              ))}
            </div>
          </div>
        </div>
      </form>

      <div className="space-y-6">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-500/15 via-slate-900/60 to-slate-900/60 p-6 backdrop-blur">
          <p className="text-xs tracking-wide text-slate-400 uppercase">
            Montante final
          </p>
          <p
            data-testid="final-balance"
            className="mt-1 text-4xl font-bold tracking-tight text-emerald-400 tabular-nums"
          >
            {result ? brl.format(result.finalBalance) : "—"}
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <ResultCard
              label="Total investido"
              value={result ? brl.format(result.totalInvested) : "—"}
              accent="text-sky-300"
            />
            <ResultCard
              label="Total em juros"
              value={result ? brl.format(result.totalInterest) : "—"}
              accent="text-emerald-300"
            />
            <ResultCard
              label="Juros sobre o montante"
              value={`${interestShare.toFixed(1)}%`}
              accent="text-amber-300"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="text-lg font-semibold">Evolução</h2>
            <div className="grid grid-cols-2 gap-1 rounded-xl border border-white/10 bg-white/5 p-1">
              {(
                [
                  ["yearly", "Anual"],
                  ["monthly", "Mensal"],
                ] as const
              ).map(([key, label]) => {
                const disabled = key === "yearly" && !yearlyAvailable;
                return (
                  <button
                    key={key}
                    type="button"
                    disabled={disabled}
                    title={
                      disabled ? "Disponível a partir de 12 meses" : undefined
                    }
                    onClick={() => setViewPreference(key)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                      view === key
                        ? "bg-emerald-500 text-slate-950"
                        : disabled
                          ? "cursor-not-allowed text-slate-600"
                          : "text-slate-300 hover:bg-white/5"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {result && chartMax > 0 ? (
            <>
              <div className="flex h-48 items-end gap-[3px] overflow-hidden rounded-xl bg-white/[0.03] p-3">
                {chartData.map((point) => (
                  <div
                    key={point.label}
                    title={`${brl.format(point.balance)} · juros ${brl.format(point.interest)}`}
                    className="group relative flex h-full flex-1 flex-col justify-end"
                  >
                    <div
                      className="w-full rounded-t-sm bg-emerald-400/80 transition group-hover:bg-emerald-300"
                      style={{
                        height: `${(point.interest / chartMax) * 100}%`,
                      }}
                    />
                    <div
                      className="w-full bg-sky-500/70 transition group-hover:bg-sky-400"
                      style={{
                        height: `${(point.invested / chartMax) * 100}%`,
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-5 text-xs text-slate-400">
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-sm bg-sky-500" />
                  Investido
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-sm bg-emerald-400" />
                  Juros
                </span>
              </div>
            </>
          ) : (
            <p className="py-8 text-center text-sm text-slate-500">
              Informe um período maior que zero para ver a evolução.
            </p>
          )}

          {result ? (
            <div className="mt-6 max-h-72 overflow-auto rounded-xl border border-white/10">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-slate-800/95 text-left text-xs tracking-wide text-slate-400 uppercase backdrop-blur">
                  <tr>
                    <th className="px-4 py-3 font-medium">
                      {view === "yearly" ? "Ano" : "Mês"}
                    </th>
                    <th className="px-4 py-3 text-right font-medium">
                      Investido
                    </th>
                    <th className="px-4 py-3 text-right font-medium">Juros</th>
                    <th className="px-4 py-3 text-right font-medium">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 tabular-nums">
                  {chartData.map((point) => (
                    <tr key={point.label} className="hover:bg-white/5">
                      <td className="px-4 py-2.5 text-slate-300">
                        {point.label}
                      </td>
                      <td className="px-4 py-2.5 text-right text-sky-300">
                        {brl.format(point.invested)}
                      </td>
                      <td className="px-4 py-2.5 text-right text-emerald-300">
                        {brl.format(point.interest)}
                      </td>
                      <td className="px-4 py-2.5 text-right font-medium text-slate-100">
                        {brl.format(point.balance)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
