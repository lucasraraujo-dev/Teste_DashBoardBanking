"use client";

import { useEffect, useState } from "react";
import { getAccountsData, getExtratos } from "@/lib/api";

export default function ExtratoPage() {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [statement, setStatement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalBalance, setTotalBalance] = useState(0); // Estado para o saldo total

  // Fetch all accounts on mount
  useEffect(() => {
    const fetchAllAccounts = async () => {
      setLoading(true);
      try {
        const accountIds = JSON.parse(localStorage.getItem("accountIds"));
        const accountData = await getAccountsData(accountIds);
        setAccounts(accountData);
        if (accountData.length > 0) {
          // Select the first account by default
          setSelectedAccount(accountData[0].id);
          // Fetch the statement for the first account by default
          const extratoData = await getExtratos(accountData[0].id);
          setStatement(extratoData);
        }

        // Calcular o saldo total de todas as contas
        const total = await Promise.all(accountData.map(async (account) => {
          const extrato = await getExtratos(account.id);
          return extrato.balance; // Supondo que 'balance' exista no extrato
        }));

        setTotalBalance(total.reduce((acc, balance) => acc + balance, 0)); // Soma todos os saldos
      } catch (err) {
        setError("Erro ao carregar as contas.");
        console.error("Erro ao buscar contas:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllAccounts();
  }, []);

  // Fetch statement for the selected account
  const handleAccountChange = async (event) => {
    const accountId = event.target.value;
    setSelectedAccount(accountId);
    setLoading(true);
    try {
      const extratoData = await getExtratos(accountId);
      setStatement(extratoData);
    } catch (err) {
      setError("Erro ao carregar o extrato.");
      console.error("Erro ao buscar extrato:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Extrato</h1>
      <p>Visualize o extrato das suas contas.</p>

      {/* Exibe o saldo total de todas as contas */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold">
          Saldo Total: R${totalBalance.toFixed(2)}
        </h2>
      </div>

      {/* Dropdown para selecionar a conta */}
      {accounts.length > 0 && (
        <div className="mb-4">
          <label htmlFor="accountSelect" className="block font-semibold mb-2">
            Selecione a conta:
          </label>
          <select
            id="accountSelect"
            value={selectedAccount}
            onChange={handleAccountChange}
            className="p-2 border rounded-md"
          >
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name} - {account.accountType}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Exibe o saldo da conta selecionada */}
      {statement && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">
            Saldo: R${statement.balance.toFixed(2)}
          </h2>
        </div>
      )}

      {/* Lista de transações */}
      {statement && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Transações</h2>
          {statement.transactions.length > 0 ? (
            <ul className="mt-2">
              {statement.transactions.map((transaction, index) => (
                <li key={index} className="mb-4 border-b pb-4">
                  <p>
                    <strong>Valor:</strong> R${transaction.amount.toFixed(2)}
                  </p>
                  <p>
                    <strong>Nome do destinatário:</strong>{" "}
                    {transaction.recipientName}
                  </p>
                  <p>
                    <strong>Documento do destinatário:</strong>{" "}
                    {transaction.recipientDocument}
                  </p>
                  <p>
                    <strong>Banco do destinatário:</strong>{" "}
                    {transaction.recipientBank}
                  </p>
                  <p>
                    <strong>Agência do destinatário:</strong>{" "}
                    {transaction.recipientBranch}
                  </p>
                  <p>
                    <strong>Conta do destinatário:</strong>{" "}
                    {transaction.recipientAccount}
                  </p>
                  <p>
                    <strong>Descrição:</strong> {transaction.description}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhuma transação encontrada.</p>
          )}
        </div>
      )}
    </div>
  );
}
