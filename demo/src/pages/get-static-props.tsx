import { GetStaticProps, NextPage } from "next";
import { createStore } from "@fifi98/next-redux";

import { store, useAppSelector } from "../store";
import { setFact } from "../store/facts";

const Home: NextPage = () => {
  const fact = useAppSelector((state) => state.facts.fact);

  return (
    <div>
      <h3>getStaticProps</h3>
      <hr />
      <h1>{fact}</h1>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { getState, dispatch } = createStore(store);

  const data = await fetch("https://catfact.ninja/fact").then((r) => r.json());
  dispatch(setFact(data.fact));

  return {
    props: {
      store: getState(),
    },
  };
};

export default Home;
