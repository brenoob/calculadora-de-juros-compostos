import CompoundInterestCalculator from "./components/compound-interest-calculator";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12 sm:px-6 lg:py-16">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Calculadora de{" "}
          <span className="text-emerald-400">juros compostos</span>
        </h1>
        <p className="mt-3 max-w-xl text-slate-400">
          Simule o crescimento do seu dinheiro ao longo do tempo: depósito
          inicial, aportes mensais e taxa de juros anual.
        </p>
      </header>
      <CompoundInterestCalculator />
      <footer className="mt-10 text-xs text-slate-500">
        Valores estimados apenas para fins educacionais; não consideram
        inflação, impostos ou taxas.
      </footer>
    </main>
  );
}
