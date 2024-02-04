import { FC } from "react";
import Cookies from "js-cookie";

interface HomeProps {}

const Home: FC<HomeProps> = ({}) => {
  console.log(Cookies.get("accessToken"));

  return <div>Home</div>;
};

export default Home;
