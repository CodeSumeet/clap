import axios from "axios";

async function loginUser(email: string, password: string) {
  try {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const response = await axios.post("/api/v1/users/auth/login", formData);

    sessionStorage.setItem("accessToken", response.data.accessToken);
    sessionStorage.setItem("refreshToken", response.data.refreshToken);

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

    const response = await axios.post("/api/v1/users/auth/register", formData);

    sessionStorage.setItem("accessToken", response.data.accessToken);
    sessionStorage.setItem("refreshToken", response.data.refreshToken);

    console.log(response);
    return response;
  } catch (error) {
    console.error("ERROR LOGGING IN!: ", error);
  }
}

export { loginUser, registerUser };
