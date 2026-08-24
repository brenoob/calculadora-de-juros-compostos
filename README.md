# Calculadora de Juros Compostos

Simulador de investimentos com juros compostos: depósito inicial, aportes mensais, taxa de juros anual e período em anos ou meses. Inclui gráfico de evolução, tabela mensal/anual e resumo do montante.

## Stack

- [Next.js 16](https://nextjs.org) (App Router) + React 19 + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- ESLint 9 (flat config) + Prettier (+ `prettier-plugin-tailwindcss`)
- Vitest + Testing Library (testes unitários e de componente)
- Husky + lint-staged + commitlint (Conventional Commits)
- GitHub Actions (CI)

## Requisitos

- Node.js >= 20.9 (o arquivo `.node-version` fixa a versão; com [fnm](https://github.com/Schniz/fnm): `fnm use`)

## Como rodar

```bash
npm install
npm run dev
```

Abra <http://localhost:3000>.

## Scripts

| Comando                 | Descrição                                |
| ----------------------- | ---------------------------------------- |
| `npm run dev`           | Servidor de desenvolvimento              |
| `npm run build`         | Build de produção                        |
| `npm run start`         | Serve o build de produção                |
| `npm run lint`          | ESLint                                   |
| `npm run format`        | Formata o projeto com Prettier           |
| `npm run format:check`  | Verifica formatação sem alterar arquivos |
| `npm run test`          | Roda os testes (Vitest)                  |
| `npm run test:watch`    | Testes em modo watch                     |
| `npm run test:coverage` | Testes com relatório de cobertura        |

## Estrutura

```
app/
  components/            # Componentes client (calculadora)
  layout.tsx             # Layout raiz e metadados
  page.tsx               # Página principal
lib/
  compound-interest.ts   # Lógica pura de juros compostos
```

## Qualidade e automação

- **Pre-commit** (`husky` + `lint-staged`): formata os arquivos staged com Prettier e corrige/aplica ESLint.
- **Commit-msg** (`commitlint`): valida o padrão [Conventional Commits](https://www.conventionalcommits.org/pt-br/) — ex.: `feat: adiciona gráfico`, `fix: corrige cálculo`.
- **CI** (GitHub Actions): roda lint, checagem de formatação, testes com cobertura e build em push/PR para `main`.

## Subir para o GitHub

```bash
git add .
git commit -m "feat: calculadora de juros compostos"
git remote add origin git@github.com:<usuario>/<repo>.git
git push -u origin main
```
