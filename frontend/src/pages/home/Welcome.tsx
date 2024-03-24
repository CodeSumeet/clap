import { FC } from "react";

interface welcomeProps {}

const Welcome: FC<welcomeProps> = ({}) => {
  return (
    <div className="bg-primary flex items-center justify-center h-screen">
      <div className="max-w-md p-8 bg-secondary rounded-custom shadow-lg text-center text-white">
        <h1 className="text-3xl font-bold mb-4">Welcome to Clap</h1>
        <p className="text-lg">Start chatting with your friends!</p>

        <div className="mt-8 space-x-4">
          <a
            href="/auth/login"
            className="bg-primary text-secondary px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-opacity-80 transition-colors duration-300"
          >
            Sign up
          </a>
          <a
            href="/auth/logout"
            className="bg-secondary text-primary px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-opacity-80 transition-colors duration-300"
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
