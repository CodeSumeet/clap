import axios from "axios";
import { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface SignupProps {}

const Signup: FC<SignupProps> = ({}) => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [avatar, setAvatar] = useState<File>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (auth?.token) {
      navigate("/chats");
    }
  }, []);

  const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("firstName", firstname);
      formData.append("lastName", lastname);
      formData.append("avatar", avatar || ""); // Handle avatar if provided
      formData.append("email", email);
      formData.append("password", password);
      const response = await axios.post(
        "/api/v1/users/auth/register",
        formData
      );

      console.log(response);
    } catch (error) {
      console.error("ERROR LOGGING IN!: ", error);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAvatar(e.target.files[0]);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-primary">
      <form
        action=""
        className="w-full sm:w-10/12 md:w-3/5 lg:w-2/5 bg-secondary flex flex-col gap-2 px-8 py-4 rounded-xl text-lg text-white"
        onSubmit={handleSignin}
      >
        <h1 className="font-semibold text-center text-3xl ">Sign up</h1>

        <div className="flex flex-col gap-4 my-8">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <div>
                <label htmlFor="firstname">Firstname: </label>
                <input
                  id="firstname"
                  type="text"
                  className="w-full px-4 py-2 rounded outline outline-1 text-secondary"
                  value={firstname}
                  placeholder="John"
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="lastname">Lastname: </label>
                <input
                  id="lastname"
                  type="text"
                  className="w-full px-4 py-2 rounded outline outline-1 text-secondary"
                  value={lastname}
                  placeholder="Doe"
                  onChange={(e) => setLastname(e.target.value)}
                />
              </div>
            </div>

            <label htmlFor="avatar">Select an avatar: </label>
            <input
              type="file"
              name="avatar"
              id="avatar"
              className="text-sm text-stone-500
              file:mr-5 file:py-1 file:px-3 file:border-[1px]
              file:text-xs file:font-medium
              file:bg-stone-50 file:text-stone-700
              hover:file:cursor-pointer hover:file:bg-blue-50
              hover:file:text-blue-700"
              onChange={handleAvatarChange}
            />

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
            to="/auth/login"
            className="underline text-base text-cyan-500"
          >
            Already a user? Sign in here!
          </Link>
        </div>
        <button
          type="submit"
          className="py-2 outline outline-1 outline-primary rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
