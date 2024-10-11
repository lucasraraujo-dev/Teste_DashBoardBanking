import { BASE_URL } from "./constants";

export async function getTenantId() {
  // check if id is in local storage
  const id = window.localStorage.getItem("tenantId");
  if (id) {
    return id;
  }
  // if not, get it from server
  const response = await fetch(`${BASE_URL}/tenant`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "X-Mock": true,
    }),
  });
  const data = await response.json();
  localStorage.setItem("tenantId", data.tenantId);
  return data.tenantId;
}
