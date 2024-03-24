import axios from "axios";

enum Method {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

async function makeRequest(url: string, method: Method, data?: any) {
  const token = sessionStorage.getItem("accessToken");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await axios({ method, url, data, headers });
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function fetchUserDetails() {
  try {
    const response = await makeRequest("/api/v1/user/me", Method.GET);

    console.log(response);
    return response;
  } catch (error) {
    throw new Error("FAILED TO FETCH USER DETAILS!");
  }
}

export { makeRequest, Method, fetchUserDetails };
