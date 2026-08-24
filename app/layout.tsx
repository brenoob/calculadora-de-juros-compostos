import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://calculadora-de-juros-compostos-kappa-inky.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Calculadora de Juros Compostos",
  description:
    "Simule o crescimento de investimentos com juros compostos, aportes mensais e taxa anual.",
  openGraph: {
    title: "Calculadora de Juros Compostos",
    description:
      "Simule depósito inicial, aportes mensais e taxa anual. Veja a evolução mês a mês do seu investimento.",
    url: "/",
    siteName: "Calculadora de Juros Compostos",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calculadora de Juros Compostos",
    description:
      "Simule depósito inicial, aportes mensais e taxa anual do seu investimento.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-slate-950 text-slate-100">
        {children}
      </body>
    </html>
  );
}
