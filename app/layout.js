import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <header className="px-10 py-4 bg-gray-800 text-white">
          <nav className="space-x-4">
            <Link className="font-bold text-xl pr-4" href="/">
              Home
            </Link>
            <Link href="/contas">Contas</Link>
            <Link href="/extrato">Extrato</Link>
            <Link href="/resumo">Resumo de Contas</Link>
            <Link href="/saldo">Saldo Total</Link>
          </nav>
        </header>
        <main className="p-4">{children}</main>
      </body>
    </html>
  );
}
