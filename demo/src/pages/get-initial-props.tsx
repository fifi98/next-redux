import { NextPage } from "next";
import { useAppSelector } from "../store";

const Home: NextPage = () => {
  const fact = useAppSelector((state) => state.facts.fact);

  return (
    <div>
      <h3>getInitialProps</h3>
      <hr />
      <h1>{fact}</h1>
    </div>
  );
};

export default Home;
