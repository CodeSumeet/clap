import { Method, makeRequest } from "./api";

async function loginUser(email: string, password: string) {
  try {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const response = await makeRequest(
      "/api/v1/auth/login",
      Method.POST,
      formData
    );

    sessionStorage.setItem("accessToken", response.accessToken);
    sessionStorage.setItem("refreshToken", response.refreshToken);

    console.log(response);
    return response;
  } catch (error) {
    console.error("ERROR LOGGING IN!: ", error);
  }
}

async function registerUser(
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  avatar: File | undefined
) {
  try {
    const formData = new FormData();
    formData.append("firstName", firstname);
    formData.append("lastName", lastname);
    formData.append("avatar", avatar || "");
    formData.append("email", email);
    formData.append("password", password);

    const response = await makeRequest(
      "/api/v1/auth/register",
      Method.POST,
      formData
    );

    sessionStorage.setItem("accessToken", response.accessToken);
    sessionStorage.setItem("refreshToken", response.refreshToken);

    console.log(response);
    return response;
  } catch (error) {
    console.error("ERROR LOGGING IN!: ", error);
  }
}

export { loginUser, registerUser };
