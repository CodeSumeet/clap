import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

interface LoginProps {}

const Login: FC<LoginProps> = ({}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    if (auth?.token) {
      navigate("/chats");
    }
  }, []);

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
    <div className="w-screen h-screen flex items-center justify-center bg-primary">
      <form
        action=""
        className="w-full h-4/5 sm:h-3/5 sm:w-10/12 md:w-3/5 lg:w-2/5 bg-secondary flex flex-col gap-2 px-8 py-4 rounded-xl text-lg text-white"
        onSubmit={handleSignin}
      >
        <h1 className="font-semibold text-center text-3xl ">Login</h1>

        <div className="flex flex-col gap-4 my-8">
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Email: </label>
            <input
              id="email"
              type="email"
              className="px-4 py-2 rounded outline outline-1 text-secondary"
              value={email}
              placeholder="john@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password: </label>
            <input
              id="password"
              type="password"
              className="px-4 py-2 rounded outline outline-1 text-secondary"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Link
            to="/auth/register"
            className="underline text-base text-cyan-500"
          >
            Don&apos;t have an account? Sign Up!
          </Link>
        </div>
        <button
          type="submit"
          className="py-2 outline outline-1 outline-primary rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
