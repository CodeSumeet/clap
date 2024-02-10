import axios from "axios";

async function makeRequest(url: string, method: string, data?: any) {
  const token = sessionStorage.getItem("accessToken");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer  ${token}`;
  }

  try {
    const reponse = await axios({ method, url, data, headers });
    return reponse.data;
  } catch (error) {
    throw error;
  }
}

export { makeRequest };
