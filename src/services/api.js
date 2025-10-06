import {getAccessToken, getRefreshToken, setAccessToken, clearTokens, logout} from "./auth";

const API_URL = process.env.REACT_APP_URL_BACKEND;

async function refreshToken() {
  const refresh = getRefreshToken();
  if (!refresh) {
    console.warn("Nenhum refresh token encontrado.");
    logout();
    throw new Error("Sessão expirada.");
  }

  const response = await fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken: refresh }),
  });

  if (!response.ok) {
    console.error("Falha ao atualizar token.");
    logout();
    throw new Error("Refresh token inválido.");
  }

  const data = await response.json();
  setAccessToken(data.accessToken);
  return data.accessToken;
}

export async function apiRequest(endpoint, method = "GET", body = null, isFile = false) {
  const url = `${API_URL}${endpoint}`;

  const makeRequest = async (token) => {
    const headers = {};
    if (!isFile) headers["Content-Type"] = "application/json";
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const options = { method, headers };
    if (body) options.body = isFile ? body : JSON.stringify(body);

    const response = await fetch(url, options);
    return response;
  };

  let accessToken = getAccessToken();
  let response = await makeRequest(accessToken);

  if (response.status === 401 || response.status === 403) {
    try {
      const newToken = await refreshToken();
      response = await makeRequest(newToken);
    } catch (err) {
      console.error("Erro ao renovar token:", err);
      clearTokens();
      window.location.href = "/login";
      throw err;
    }
  }

  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.status}`);
  }

  if (response.status === 204) return null;

  if (endpoint.includes("/foto") && method === "GET") return await response.blob();
  if (endpoint.includes("/foto")) return;

  const contentLength = response.headers.get("content-length");
  if (contentLength && parseInt(contentLength) === 0) return null;

  return await response.json();
}
