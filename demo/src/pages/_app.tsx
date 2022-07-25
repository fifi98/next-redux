import { AppInitialProps, AppProps } from "next/app";
import { createStore, StoreProvider } from "@fifi98/next-redux";

import Navigation from "../components/Navigation";

import { setFact } from "../store/facts";
import { store } from "../store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider store={store} state={pageProps.state}>
      <Component {...pageProps} />
      <Navigation />
    </StoreProvider>
  );
}

MyApp.getInitialProps = async (): Promise<AppInitialProps> => {
  const { getState, dispatch } = createStore(store);

  const data = await fetch("https://catfact.ninja/fact").then((r) => r.json());
  dispatch(setFact(data.fact));

  return {
    pageProps: {
      state: getState(),
    },
  };
};

export default MyApp;
