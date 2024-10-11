const BASE_URL = "https://mock-ica.aquarela.win";

async function getStoredCredentials() {
  const clientId = localStorage.getItem("clientId");
  const clientSecret = localStorage.getItem("clientSecret");

  if (clientId && clientSecret) {
    return { clientId, clientSecret };
  }

  const response = await fetch(`${BASE_URL}/tenant`, {
    method: "POST",
    headers: {
      "X-Mock": "true",
      accept: "*/*",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to create tenant");
  }

  const tenantData = await response.json();
  localStorage.setItem("clientId", tenantData.clientId);
  localStorage.setItem("clientSecret", tenantData.clientSecret);

  return {
    clientId: tenantData.clientId,
    clientSecret: tenantData.clientSecret,
  };
}

async function getToken() {
  const { clientId, clientSecret } = await getStoredCredentials();

  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "*/*",
    },
    body: JSON.stringify({
      clientId,
      clientSecret,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to authenticate");
  }

  const authData = await response.json();
  localStorage.setItem("accessToken", authData.access_token);

  return authData.access_token;
}

async function getValidToken() {
  const storedToken = localStorage.getItem("accessToken");

  if (storedToken) {
    return storedToken;
  }

  return await getToken();
}

export async function fetchAccount(id) {
  const token = await getValidToken();

  const response = await fetch(`${BASE_URL}/account/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch accounts");
  }

  return await response.json();
}

export async function createAccount(accountData) {
  const token = await getValidToken();

  const response = await fetch(`${BASE_URL}/account`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(accountData),
  });

  if (!response.ok) {
    const errorDetails = await response.json();
    throw new Error(`Error: ${response.status} - ${errorDetails.message}`);
  }

  return await response.json();
}

export async function getStatement(id) {
  const token = await getValidToken();

  const response = await fetch(`${BASE_URL}/account/${id}/statement`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch statement");
  }

  return await response.json();
}

export const getExtratos = async (accountId) => {
  const token = await getValidToken(); // Obtém o token válido

  const response = await fetch(`${BASE_URL}/account/${accountId}/statement`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Autorização com o token
    },
  });

  if (!response.ok) {
    throw new Error(`Erro ao buscar extrato: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};

export const getAccountsData = async (accountIds) => {
  const data = await Promise.all(
    accountIds.map(async (accountId) => {
      try {
        const response = await fetchAccount(accountId);
        return response;
      } catch (error) {
        console.error(error);
      }
    })
  );

  return data;
};
