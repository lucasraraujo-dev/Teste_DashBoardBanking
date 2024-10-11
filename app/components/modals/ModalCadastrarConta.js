import { useState } from "react";

export default function ModalCadastroConta({ onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [accountType, setAccountType] = useState("PERSONAL"); // Valor padrão
  const [document, setDocument] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validação simples (adapte conforme necessário)
    if (!name || !document) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const accountData = {
      accountType,
      name,
      document,
    };

    // Chama a função onSubmit passada como prop
    onSubmit(accountData);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white text-black rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Cadastrar Nova Conta</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Nome do Titular</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Nome completo"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Tipo de Conta</label>
            <select
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="PERSONAL">Pessoal</option>
              <option value="BUSINESS">Empresarial</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Documento</label>
            <input
              type="text"
              value={document}
              onChange={(e) => setDocument(e.target.value)}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Número do documento"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 font-bold py-2 px-4 rounded mr-2"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
