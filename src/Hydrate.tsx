import React, { useEffect, useMemo, useRef } from "react";

import { hydrate, isServer } from "./store";

import { Store } from "redux";

interface HydrateProps {
  children: React.ReactNode;
  state: any;
  store: Store;
}

export const Hydrate: React.FunctionComponent<HydrateProps> = ({ children, store, state }) => {
  const firstRender = useRef<boolean>(true);

  useEffect(() => {
    firstRender.current = false;
  }, []);

  useMemo(() => {
    if (isServer() || firstRender.current) {
      hydrate(store, state);
    }
  }, []);

  useEffect(() => {
    hydrate(store, state);
  }, [store, state]);

  return <>{children}</>;
};

export default Hydrate;
