"use client";

import ModalCadastroConta from "../components/modals/ModalCadastrarConta";
import { createAccount, fetchAccount, getAccountsData } from "@/lib/api";
import { useEffect, useState } from "react";

export default function ContasPage() {
  const [contas, setContas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar o modal

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const accountIds = JSON.parse(localStorage.getItem("accountIds"));
        if (accountIds) {
          const data = await getAccountsData(accountIds);
          setContas(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateSavedAccounts = async (accountIds) => {
    localStorage.setItem("accountIds", JSON.stringify(accountIds));
    getAccountsData(accountIds);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateAccount = async (accountData) => {
    try {
      const response = await createAccount(accountData);
      setContas([...contas, response]);
      updateSavedAccounts([...contas.map((conta) => conta.id), response.id]);
    } catch (error) {
      console.error(error);
    }

    handleCloseModal();
  };

  // Função para gerar um resumo de contas abertas
  const generateSummary = () => {
    const totalContas = contas.length;
    const totalPorTipo = contas.reduce((acc, conta) => {
      if (conta && conta.accountType) {  // Verifica se 'conta' e 'accountType' existem
        acc[conta.accountType] = (acc[conta.accountType] || 0) + 1;
      }
      return acc;
    }, {});
    e

    return { totalContas, totalPorTipo };
  };

  const { totalContas, totalPorTipo } = generateSummary();

  return (
    <div className="flex flex-col p-4 gap-4">
      <h1 className="text-xl font-bold">Contas</h1>
      
      {/* Exibindo o resumo das contas */}
      {!loading && contas.length > 0 && (
        <div className="mb-4">
          <p><strong>Total de Contas:</strong> {totalContas}</p>
          <p><strong>Contas por Tipo:</strong></p>
          <ul>
            {Object.keys(totalPorTipo).map((tipo) => (
              <li key={tipo}>
                {tipo}: {totalPorTipo[tipo]}
              </li>
            ))}
          </ul>
        </div>
      )}

      {loading || !contas ? (
        <p>Carregando...</p>
      ) : contas?.length === 0 ? (
        <div className="mt-4">
          <p>Nenhuma conta encontrada.</p>
        </div>
      ) : (
        <ul>
          {contas?.map((conta) => (
            <li key={conta?.id}>
              {conta?.name} - {conta?.accountType}
            </li>
          ))}
        </ul>
      )}

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleOpenModal}
      >
        Cadastrar Conta
      </button>

      {/* Modal de Cadastro de Conta */}
      {isModalOpen && (
        <ModalCadastroConta
          onClose={handleCloseModal}
          onSubmit={handleCreateAccount}
        />
      )}
    </div>
  );
}
