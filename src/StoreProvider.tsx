import React, { useState } from "react";
import { Provider } from "react-redux";

import Hydrate from "./Hydrate";

import { initStore } from "./store";

import { Store } from "redux";

interface StoreProviderProps {
  children: React.ReactNode;
  state: any;
  store: Store;
}

const StoreProvider: React.FunctionComponent<StoreProviderProps> = ({ children, state, store }) => {
  const [redux] = useState(initStore(store));

  return (
    <Provider store={redux}>
      <Hydrate store={redux} state={state}>
        {children}
      </Hydrate>
    </Provider>
  );
};

export default StoreProvider;
