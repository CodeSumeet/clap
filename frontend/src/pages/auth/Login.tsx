import axios from "axios";
import { FC, useState } from "react";

interface LoginProps {}

const Login: FC<LoginProps> = ({}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const userInfo = {
        email,
        password,
      };
      const response = await axios.post("/api/v1/users/auth/login", userInfo);

      console.log(response);
    } catch (error) {
      console.error("ERROR LOGGING IN!: ", error);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <form
        action=""
        className="flex flex-col gap-2"
        onSubmit={handleSignin}
      >
        <label htmlFor="email">Email: </label>
        <input
          id="email"
          type="email"
          className="outline outline-1"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password: </label>
        <input
          id="password"
          type="password"
          className="outline outline-1"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
