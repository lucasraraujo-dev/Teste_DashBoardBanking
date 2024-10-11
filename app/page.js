"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Page() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Painel Bancário</h1>
      <p className="mt-4">
        Bem-vindo ao painel bancário! Aqui você pode gerenciar suas contas e
        visualizar informações importantes.
      </p>
      <div className="mt-8 space-y-4">
        <Link
          href="/contas"
          className="block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
        >
          Visualizar e Criar Contas
        </Link>
        <Link
          href="/extrato"
          className="block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
        >
          Visualizar Extrato
        </Link>
        <Link
          href="/resumo"
          className="block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
        >
          Resumo de Contas
        </Link>
        <Link
          href="/saldo"
          className="block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
        >
          Saldo Total
        </Link>
      </div>
    </div>
  );
}
